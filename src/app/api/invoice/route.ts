// app/api/invoice/route.ts
import { NextResponse } from 'next/server';
import { generateInvoicePDF } from '@/lib/invoice/generator';
import { client } from '../../../../sanity/lib/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json({ error: 'Hiányzik a rendelés azonosító.' }, { status: 400 });
  }

  try {
    // Lekérjük a rendelést a Sanityből
    const order = await client.fetch(
      `*[_type == "order" && _id == $orderId][0]{
        _id,
        _createdAt,
        amountTotal,
        totalAmount,
        customerEmail,
        items,
        shippingDetails,
        userId
      }`,
      { orderId }
    );

    if (!order) {
      return NextResponse.json({ error: 'A rendelés nem található.' }, { status: 404 });
    }

    // Lekérjük az ügyfél nevét a customer dokumentumból, ha létezik
    const customer = await client.fetch(
      `*[_type == "customer" && userId == $userId][0]{ firstName, lastName }`,
      { userId: order.userId || '' }
    );

    const customerName = customer 
      ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim() 
      : 'Geschätzter Kunde';

    // Formázott adatok a PDF-hez
    const invoiceNumber = `RE-${order._id.slice(-6).toUpperCase()}`;
    const orderDate = new Date(order._createdAt).toLocaleDateString('de-DE');
    const totalAmount = order.amountTotal ?? order.totalAmount ?? 0;

    const pdfBuffer = await generateInvoicePDF({
      invoiceNumber,
      orderDate,
      customerName,
      customerEmail: order.customerEmail || 'N/A',
      shippingAddress: {
        street: order.shippingDetails?.street || '',
        postalCode: order.shippingDetails?.postalCode || '',
        city: order.shippingDetails?.city || '',
        country: order.shippingDetails?.country || 'Deutschland',
      },
      items: order.items || [],
      totalAmount,
    });

// Visszaadjuk a PDF-et letölthető fájlként
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${invoiceNumber}.pdf"`,
      },
    });

  } catch (err: any) {
    console.error('Hiba a számla generálásakor:', err);
    return NextResponse.json({ error: 'Nem sikerült generálni a számlát.' }, { status: 500 });
  }
}