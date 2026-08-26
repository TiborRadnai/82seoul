import { notFound } from 'next/navigation';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Valós client és a lekérdezés útvonala
import { client } from '../../../../sanity/lib/client';
import { getDramaByIdQuery } from '../../../../sanity/queries';

// Importáljuk a különálló részletes tartalmat a drama-detail mappából
import DramaDetailContent from '@/components/subpages/kdrama/drama-detail/DramaDetailContent';

interface DramaPageProps {
  params: Promise<{ id: string }>;
}

export default async function DramaDetailPage({ params }: DramaPageProps) {
  const { id } = await params;

  // Lekérdezés a megírt query alapján
  const drama = await client.fetch(getDramaByIdQuery, { id });

  if (!drama) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0c] text-white select-none">
      <Navbar />

      {/* Átadjuk az egész drama objektumot a dedikált tartalom komponensnek */}
      <DramaDetailContent drama={drama} />

      <Footer />
    </main>
  );
}