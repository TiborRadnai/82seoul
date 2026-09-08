import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@sanity/client';
import { generateInvoicePDF } from '@/lib/invoice/generator';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia' as any,
});

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8jbqa5wg',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Hiányzik a Stripe aláírás.' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error(`Webhook aláírás hiba: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // 1. Termékek lekérdezése
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      const items = lineItems.data.map((item, index) => {
        const product = item.price?.product as Stripe.Product;
        return {
          _key: `item_${Date.now()}_${index}`,
          name: product?.name || item.description || 'Termék',
          price: item.amount_total ? item.amount_total / 100 / (item.quantity || 1) : 0,
          quantity: item.quantity || 1,
        };
      });

      const createdAt = new Date().toISOString();
      const tempIdForInvoice = session.id.slice(-6).toUpperCase();
      const invoiceNumber = `RE-${tempIdForInvoice}`;
      const orderDate = new Date(createdAt).toLocaleDateString('de-DE');
      const totalAmount = session.amount_total ? session.amount_total / 100 : 0;
      const customerEmail = session.customer_email || session.customer_details?.email || 'N/A';
      const userId = session.metadata?.userId || 'guest';

      // Ügyfél nevének lekérdezése a Sanityből a számlához
      const customer = await writeClient.fetch(
        `*[_type == "customer" && userId == $userId][0]{ firstName, lastName }`,
        { userId }
      );
      const customerName = customer ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim() : 'Geschätzter Kunde';

      // 2. PDF generálása a fix vásárlási adatokkal
      const pdfBuffer = await generateInvoicePDF({
        invoiceNumber,
        orderDate,
        customerName,
        customerEmail,
        shippingAddress: {
          street: session.metadata?.street || '',
          postalCode: session.metadata?.postalCode || '',
          city: session.metadata?.city || '',
          country: session.metadata?.country || 'Deutschland',
        },
        items,
        totalAmount,
      });

      // 3. PDF feltöltése a Sanity Asset tárhelyére
      const pdfAsset = await writeClient.assets.upload('file', pdfBuffer, {
        filename: `${invoiceNumber}.pdf`,
        contentType: 'application/pdf',
      });

      // 4. Rendelés mentése a Sanitybe a generált fájl referenciájával
      await writeClient.create({
        _type: 'order',
        stripeSessionId: session.id,
        invoiceNumber,
        invoiceFile: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: pdfAsset._id,
          },
        },
        customerEmail,
        userId,
        amountTotal: totalAmount,
        currency: session.currency || 'eur',
        paymentStatus: session.payment_status,
        items,
        shippingDetails: {
          street: session.metadata?.street || '',
          city: session.metadata?.city || '',
          postalCode: session.metadata?.postalCode || '',
          country: session.metadata?.country || 'Deutschland',
        },
        createdAt,
      });

      // 5. RAKTÁRKÉSZLET CSÖKKENTÉSE A SANITYBEN
      for (const item of lineItems.data) {
        const product = item.price?.product as Stripe.Product;
        const boughtQty = item.quantity || 1;
        const productName = product?.name;

        if (productName) {
          // Megkeressük a terméket a Sanityben a neve alapján
          const sanityProduct = await writeClient.fetch(
            `*[_type == "shopProduct" && title == $title][0]{ _id, variants }`,
            { title: productName }
          );

          if (sanityProduct && sanityProduct.variants) {
            // Megkeressük azt a variációt, ami egyezik (vagy ha nincs méret, az elsőt)
            // A kosár mentésnél / Stripe item description-ben benne szokott lenni a méret is (pl. "Termék név (30 ml)")
            const matchingVariant = sanityProduct.variants.find((v: any) => 
              item.description?.includes(v.size) || product?.name?.includes(v.size)
            ) || sanityProduct.variants[0];

            if (matchingVariant && matchingVariant._key) {
              await writeClient
                .patch(sanityProduct._id)
                .dec({ [`variants[_key == "${matchingVariant._key}"].stock`]: boughtQty })
                .commit();
            }
          }
        }
      }

      console.log(`Sikeres rendelés, fix számla (${invoiceNumber}) generálva, mentve és raktárkészlet frissítve.`);
    } catch (sanityErr) {
      console.error('Hiba a rendelés Sanitybe mentésekor, PDF generáláskor vagy készletcsökkentéskor:', sanityErr);
      return NextResponse.json({ error: 'Sanity mentési / PDF / Készlet hiba' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}