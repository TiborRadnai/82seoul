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
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });

      // 1. Tételek feldolgozása a rendelési séma (order.ts -> items) szerint: { name, price, quantity }
      const items = lineItems.data.map((item, index) => {
        const product = item.price?.product as Stripe.Product;
        const rawName = product?.name || item.description || 'Termék';
        
        // Ha a név tartalmazza a méretet zárójelben (pl. "Serum (30 ml)"), szétválasztjuk a tiszta névre és méretre
        const match = rawName.match(/^(.*?)\s*\((.*?)\)$/);
        const cleanName = match ? match[1].trim() : rawName;
        const variantSize = match ? match[2].trim() : 'Standard';

        return {
          _key: `item_${Date.now()}_${index}`,
          name: `${cleanName} (${variantSize})`, // A séma szerinti mezőbe mentjük
          price: item.amount_total ? item.amount_total / 100 / (item.quantity || 1) : 0,
          quantity: item.quantity || 1,
          // Segédmezők a belső készletcsökkentéshez (ezek nem zavarják a Sanity sémát, de itt fel tudjuk használni)
          _cleanName: cleanName,
          _variantSize: variantSize,
        };
      });

      const createdAt = new Date().toISOString();
      const tempIdForInvoice = session.id.slice(-6).toUpperCase();
      const invoiceNumber = `RE-${tempIdForInvoice}`;
      const orderDate = new Date(createdAt).toLocaleDateString('de-DE');
      const totalAmount = session.amount_total ? session.amount_total / 100 : 0;
      const customerEmail = session.customer_email || session.customer_details?.email || 'N/A';
      const userId = session.metadata?.userId || 'guest';

      const customer = await writeClient.fetch(
        `*[_type == "customer" && userId == $userId][0]{ firstName, lastName }`,
        { userId }
      );
      const customerName = customer ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim() : 'Geschätzter Kunde';

      // 2. PDF generálás
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
        items: items.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
        totalAmount,
      });

      // 3. PDF feltöltés
      const pdfAsset = await writeClient.assets.upload('file', pdfBuffer, {
        filename: `${invoiceNumber}.pdf`,
        contentType: 'application/pdf',
      });

      // 4. Rendelés mentése a pontos order sémával (kivéve a belső segédmezőket)
      const sanityOrderItems = items.map(i => ({
        _key: i._key,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      }));

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
        items: sanityOrderItems,
        shippingDetails: {
          street: session.metadata?.street || '',
          city: session.metadata?.city || '',
          postalCode: session.metadata?.postalCode || '',
          country: session.metadata?.country || 'Deutschland',
        },
        createdAt,
      });

      // 5. PONTOS KÉSZLETCSÖKKENTÉS A shopProduct -> title és variants -> size / stock alapján
      for (const item of items) {
        const boughtQty = item.quantity || 1;
        const targetTitle = item._cleanName;
        const targetSize = item._variantSize;

        if (targetTitle) {
          // Lekérdezzük a terméket a title alapján
          const sanityProduct = await writeClient.fetch(
            `*[_type == "shopProduct" && title == $title][0]{ _id, variants }`,
            { title: targetTitle }
          );

          if (sanityProduct && sanityProduct.variants) {
            // Megkeressük a megfelelő méretű variációt a variants tömbben
            const matchingVariant = sanityProduct.variants.find((v: any) => v.size === targetSize) || sanityProduct.variants[0];

            if (matchingVariant && matchingVariant._key) {
              // Csökkentjük a stock mezőt
              await writeClient
                .patch(sanityProduct._id)
                .dec({ [`variants[_key == "${matchingVariant._key}"].stock`]: boughtQty })
                .commit();
              
              console.log(`Készlet csökkentve: ${sanityProduct._id} (${targetSize}) - ${boughtQty} db`);
            }
          }
        }
      }

      console.log(`Sikeres rendelés, számla (${invoiceNumber}) generálva és raktárkészlet frissítve.`);
    } catch (sanityErr) {
      console.error('Hiba a webhook feldolgozásakor:', sanityErr);
      return NextResponse.json({ error: 'Webhook feldolgozási hiba' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}