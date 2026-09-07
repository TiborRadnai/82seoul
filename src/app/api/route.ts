// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import bcrypt from 'bcryptjs';

// Dedikált szerver oldali író kliens
const writeClient = createClient({
  projectId: '8jbqa5wg',
  dataset: 'production',
  apiVersion: '2024-03-16',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, koreanName, phone, address } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Az e-mail és a jelszó megadása kötelező!' }, { status: 400 });
    }

    // 1. Jelszó hashelése a bcryptjs-szel (semmiképpen nem mentjük tisztán!)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 2. Egyedi userId generálása (mivel nincs már Firebase UID)
    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 3. Dokumentum létrehozása a Sanityben
    const result = await writeClient.create({
      _type: 'customer',
      userId,
      email,
      passwordHash, // Itt tároljuk a biztonságos hashet
      firstName,
      lastName,
      koreanName,
      phone,
      shippingAddress: address,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: { userId: result.userId, email: result.email } });
  } catch (error: any) {
    console.error('Sanity regisztrációs hiba:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Ismeretlen hiba történt a regisztráció során.' },
      { status: 500 }
    );
  }
}