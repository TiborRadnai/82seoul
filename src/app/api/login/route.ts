// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

// Szerver oldali olvasó kliens a felhasználó lekéréséhez
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
      return NextResponse.json({ success: false, error: 'Add meg az e-mail címet és a jelszót!' }, { status: 400 });
    }

    // 1. Megkeressük a felhasználót a Sanity-ben az e-mail címe alapján
    const query = `*[_type == "customer" && email == $email][0]`;
    const customer = await readClient.fetch(query, { email });

    if (!customer || !customer.passwordHash) {
      return NextResponse.json({ success: false, error: 'Hibás e-mail cím vagy jelszó.' }, { status: 401 });
    }

    // 2. Ellenőrizzük a jelszót a bcryptjs-szel
    const isPasswordValid = await bcrypt.compare(password, customer.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: 'Hibás e-mail cím vagy jelszó.' }, { status: 401 });
    }

    // 3. Generálunk egy biztonságos JWT tokent a jose-val
    const token = await new SignJWT({ userId: customer.userId, email: customer.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d') // 7 napig érvényes sütik
      .sign(JWT_SECRET);

    // 4. Beállítjuk a tokent egy HttpOnly sütiként (a kliens JS nem tudja ellopni)
    const response = NextResponse.json({ success: true, message: 'Sikeres bejelentkezés' });
    response.cookies.set({
      name: 'session_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 nap
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Bejelentkezési hiba:', error);
    return NextResponse.json({ success: false, error: 'Ismeretlen szerveroldali hiba' }, { status: 500 });
  }
}