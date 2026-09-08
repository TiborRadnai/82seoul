// app/api/verify-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@sanity/client';

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Hiányzó session ID' }, { status: 400 });
    }

    // 1. BIZTONSÁGI ELLENŐRZÉS: Feldolgoztuk-e már ezt a sessiont korábban?
    const existingOrder = await writeClient.fetch(
      `*[_type == "order" && stripeSessionId == $sessionId][0]{_id}`,
      { sessionId }
    );

    if (existingOrder) {
      return NextResponse.json({ success: true, message: 'Ez a tranzakció már feldolgozásra került.' });
    }

    // 2. Lekérdezzük a Stripe-tól a sessiont (beleértve a vásárló adatait és a címet is)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    });

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'A fizetés még nem fejeződött be.' }, { status: 400 });
    }

    const lineItems = session.line_items?.data || [];
    const userId = session.metadata?.userId || 'guest';

// Formázzuk a tételeket a Sanity order sémájához (egyedi _key-jel ellátva!)
    const formattedItems: any[] = [];

    for (const item of lineItems) {
      const description = item.description || ''; 
      const quantityPurchased = item.quantity || 1;
      const unitPrice = item.price?.unit_amount ? item.price.unit_amount / 100 : 0;

      // Egyedi kulcs generálása a Sanity tömbhöz, hogy ne legyen "Missing keys" hiba
      const itemKey = Math.random().toString(36).substring(2, 9);

      if (!description.includes('Versandkosten')) {
        const match = description.match(/^(.*?)\s*\((.*?)\)$/);
        let productName = description;
        let variantSize = '';

        if (match) {
          productName = match[1].trim();
          variantSize = match[2].trim();
        }

        formattedItems.push({
          _key: itemKey, // <-- ITT A FONTOS _KEY
          name: description,
          price: unitPrice,
          quantity: quantityPurchased,
        });

        // Készlet csökkentés a Sanityben... (marad a régi logikád)
        const product = await writeClient.fetch(
          `*[_type == "shopProduct" && title == $name][0]{_id, variants}`,
          { name: productName }
        );

        if (product && product._id && product.variants) {
          const updatedVariants = product.variants.map((v: any) => {
            if (v.size === variantSize) {
              const currentStock = typeof v.stock === 'number' ? v.stock : 20;
              return {
                ...v,
                stock: Math.max(0, currentStock - quantityPurchased),
              };
            }
            return v;
          });

          await writeClient
            .patch(product._id)
            .set({ variants: updatedVariants })
            .commit();
        }
      } else {
        formattedItems.push({
          _key: itemKey,
          name: description,
          price: unitPrice,
          quantity: quantityPurchased,
        });
      }
    }

// Kiolvassuk a címet a Stripe session metadata-jából (vagy a Stripe adataiból fallback-kel)
    const metadata = session.metadata || {};
    const rawShipping = (session as any).shipping_details || session.customer_details;

    await writeClient.create({
      _type: 'order',
      stripeSessionId: sessionId,
      userId: userId,
      customerEmail: session.customer_email || session.customer_details?.email || 'guest',
      createdAt: new Date().toISOString(),
      amountTotal: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency,
      items: formattedItems,
      shippingDetails: {
        street: metadata.street || rawShipping?.address?.line1 || '',
        city: metadata.city || rawShipping?.address?.city || '',
        postalCode: metadata.postalCode || rawShipping?.address?.postal_code || '',
        country: metadata.country || rawShipping?.address?.country || 'Deutschland',
      },
    });
    return NextResponse.json({ 
      success: true, 
      customerEmail: session.customer_email || session.customer_details?.email 
    });

  } catch (err: any) {
    console.error('Hiba a session ellenőrzésekor:', err);
    return NextResponse.json({ error: err.message || 'Szerver hiba' }, { status: 500 });
  }
}