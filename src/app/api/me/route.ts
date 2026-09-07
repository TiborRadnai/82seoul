// app/api/me/route.ts
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'titkos-alap-kulcs-csereld-le-majd'
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Ellenőrizzük és dekódoljuk a sütiben lévő JWT tokent a jose-val
    const { payload } = await jwtVerify(token, JWT_SECRET);

    return NextResponse.json({
      user: {
        userId: payload.userId,
        email: payload.email,
      },
    }, { status: 200 });

  } catch (error) {
    // Ha a token lejárt vagy hamisított, tiszta lappal jelezzük, hogy nincs bejelentkezett user
    return NextResponse.json({ user: null }, { status: 200 });
  }
}