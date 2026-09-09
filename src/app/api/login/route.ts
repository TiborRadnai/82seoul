// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

// Server-side reading client to fetch the user
const readClient = createClient({
  projectId: '8jbqa5wg',
  dataset: 'production',
  apiVersion: '2024-03-16',
  useCdn: false,
});

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'titkos-alap-kulcs-csereld-le-majd'
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Bitte geben Sie E-Mail-Adresse und Passwort ein!' }, { status: 400 });
    }

    // 1. Find the user in Sanity by email address
    const query = `*[_type == "customer" && email == $email][0]`;
    const customer = await readClient.fetch(query, { email });

    if (!customer || !customer.passwordHash) {
      return NextResponse.json({ success: false, error: 'Ungültige E-Mail-Adresse oder falsches Passwort.' }, { status: 401 });
    }

    // 2. Verify the password with bcryptjs
    const isPasswordValid = await bcrypt.compare(password, customer.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: 'Ungültige E-Mail-Adresse oder falsches Passwort.' }, { status: 401 });
    }

    // 3. Generate a secure JWT token using jose
    const token = await new SignJWT({ userId: customer.userId, email: customer.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d') // 7 days expiration
      .sign(JWT_SECRET);

    // 4. Set the token as a secure HttpOnly cookie
    const response = NextResponse.json({ success: true, message: 'Erfolgreicher Login' });
    response.cookies.set({
      name: 'session_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login-Fehler:', error);
    return NextResponse.json({ success: false, error: 'Unbekannter Serverfehler' }, { status: 500 });
  }
}