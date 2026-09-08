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

  // Ha a fizetés sikeresen megtörtént
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Lekérjük a Stripe által generált számla adatait (ha van invoice ID)
      let invoiceUrl = '';
      const invoiceId = session.invoice as string;
      
      if (invoiceId) {
        const invoice = await stripe.invoices.retrieve(invoiceId);
        invoiceUrl = invoice.hosted_invoice_url || invoice.invoice_pdf || '';
      }

      // Rendelés mentése a Sanitybe
      await writeClient.create({
        _type: 'order',
        stripeSessionId: session.id,
        customerEmail: session.customer_email || session.customer_details?.email || '',
        userId: session.metadata?.userId || 'guest',
        amountTotal: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency || 'eur',
        paymentStatus: session.payment_status,
        invoiceId: invoiceId || '',
        invoiceUrl: invoiceUrl,
        shippingDetails: {
          street: session.metadata?.street || '',
          city: session.metadata?.city || '',
          postalCode: session.metadata?.postalCode || '',
          country: session.metadata?.country || 'Deutschland',
        },
        createdAt: new Date().toISOString(),
      });

      console.log(`Sikeres rendelés és számla mentve a Sanitybe session ID: ${session.id}`);
    } catch (sanityErr) {
      console.error('Hiba a rendelés Sanitybe mentésekor:', sanityErr);
      return NextResponse.json({ error: 'Sanity mentési hiba' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}