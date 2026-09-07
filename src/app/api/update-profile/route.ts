// app/api/update-profile/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

export async function POST(request: Request) {
  try {
    const { userId, firstName, lastName, phone, shippingAddress } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'Hiányzó felhasználói azonosító' }, { status: 400 });
    }

    const writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8jbqa5wg',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2023-05-03',
      token: process.env.SANITY_WRITE_TOKEN,
      useCdn: false,
    });

    // Megkeressük az alapadatot (akár draft, akár published formában)
    const existingCustomer = await writeClient.fetch(
      `*[_type == "customer" && userId == $userId][0]{_id}`,
      { userId }
    );

    if (!existingCustomer?._id) {
      return NextResponse.json({ error: 'A felhasználó nem található az adatbázisban' }, { status: 404 });
    }

    // Meghatározzuk a tiszta ID-t (levágjuk a "drafts." előtagot, ha van)
    const baseId = existingCustomer._id.replace(/^drafts\./, '');
    const publishedId = baseId;
    const draftId = `drafts.${baseId}`;

    const updatedFields = {
      firstName,
      lastName,
      phone,
      shippingAddress,
    };

    // Tranzakcióval egyszerre frissítjük a published és a draft dokumentumot is, 
    // vagy ha csak a published-et frissítjük és töröljük a draftot, akkor azonnal élesedik.
    // A legtisztább: frissítjük a published-et és töröljük a régi draftot, hogy ne legyen ütközés.
    await writeClient.transaction()
      .patch(publishedId, (patch) => patch.set(updatedFields))
      .delete(draftId) // Töröljük a lógó draftot, hogy a friss published látszódjon a Stúdióban
      .commit();

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('API hiba profil frissítéskor:', err);
    return NextResponse.json({ error: err.message || 'Szerver hiba' }, { status: 500 });
  }
}