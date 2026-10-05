import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8jbqa5wg',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_WRITE_TOKEN, // Szükséges lesz a szerver oldali íráshoz
  useCdn: false,
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
    }

    // Ellenőrizzük, hogy létezik-e már ez az e-mail a feliratkozók között
    const existing = await client.fetch(
      `*[_type == "newsletterSubscriber" && email == $email][0]`,
      { email }
    );

    if (existing) {
      return NextResponse.json({ success: true, message: 'Bereits registriert.' });
    }

    // Új dokumentum létrehozása a Sanity-ban
    await client.create({
      _type: 'newsletterSubscriber', // Ennek a séma nevének kell lennie a Sanityben
      email: email,
      subscribedAt: new Date().toISOString(),
      status: 'active',
    });

    return NextResponse.json({ success: true, message: 'Erfolgreich angemeldet.' });
  } catch (err: any) {
    console.error('Newsletter API Fehler:', err);
    return NextResponse.json({ error: 'Fehler beim Speichern.' }, { status: 500 });
  }
}