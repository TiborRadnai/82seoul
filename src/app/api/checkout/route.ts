// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@sanity/client';
import bcrypt from 'bcryptjs';

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
  try {
    const { items, customerEmail, userId, shippingDetails, registerNewAccount, password } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'A kosár üres.' }, { status: 400 });
    }

    let finalUserId = userId;

    if (registerNewAccount && password && customerEmail) {
      try {
        const existingCustomer = await writeClient.fetch(
          `*[_type == "customer" && email == $email][0]{_id, userId}`,
          { email: customerEmail }
        );

        if (existingCustomer) {
          finalUserId = existingCustomer.userId;
        } else {
          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(password, salt);
          const newUserId = `cust_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
          finalUserId = newUserId;

          await writeClient.create({
            _type: 'customer',
            userId: newUserId,
            email: customerEmail,
            passwordHash: passwordHash,
            firstName: shippingDetails?.firstName || '',
            lastName: shippingDetails?.lastName || '',
            phone: shippingDetails?.phone || '',
            shippingAddress: {
              street: shippingDetails?.street || '',
              city: shippingDetails?.city || '',
              postalCode: shippingDetails?.postalCode || '',
              country: shippingDetails?.country || 'Deutschland',
            },
            status: 'active',
            createdAt: new Date().toISOString(),
          });
        }
      } catch (regErr) {
        console.error('Hiba a vendég fiók létrehozásakor checkout alatt:', regErr);
      }
    }

    // Átalakítjuk a kosár elemeit, belepakolva a Sanity termék ID-t és a méretet a metadata-ba
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${item.title} (${item.size})`,
          images: item.image ? [item.image] : [],
          metadata: {
            sanityProductId: item.id, // ITT ADJUK ÁT A SANITY TERMÉK _ID-JÉT!
            size: item.size,         // ITT ADJUK ÁT A MÉRETET!
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const isNewRegistration = registerNewAccount && password && customerEmail ? 'true' : 'false';
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      invoice_creation: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}&registered=${isNewRegistration}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cart`,
      customer_email: customerEmail || undefined,
      metadata: {
        userId: finalUserId || 'guest',
        street: shippingDetails?.street || '',
        city: shippingDetails?.city || '',
        postalCode: shippingDetails?.postalCode || '',
        country: shippingDetails?.country || 'Deutschland',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe hiba checkout közben:', err);
    return NextResponse.json({ error: err.message || 'Hiba történt a fizetés előkészítése során.' }, { status: 500 });
  }
}