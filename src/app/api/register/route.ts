// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const writeClient = createClient({
  projectId: '8jbqa5wg',
  dataset: 'production',
  apiVersion: '2024-03-16',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'titkos-alap-kulcs-csereld-le-majd'
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, koreanName, phone, address } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Az e-mail és a jelszó megadása kötelező!' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  await writeClient.create({
        _type: 'customer',
        userId,
        email,
        passwordHash,
        firstName,
        lastName,
        koreanName, // Átmegy a koreai név is!
        phone,
        shippingAddress: address, // Itt rögzítjük a címet a helyes sémakulccsal
        createdAt: new Date().toISOString(),
      });

    // Azonnali JWT token generálás és süti beállítás regisztráció után
    const token = await new SignJWT({ userId, email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    const response = NextResponse.json({ success: true, data: { userId, email } });
    response.cookies.set({
      name: 'session_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Sanity regisztrációs hiba:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Ismeretlen hiba történt a regisztráció során.' },
      { status: 500 }
    );
  }
}