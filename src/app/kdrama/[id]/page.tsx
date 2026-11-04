import { notFound } from 'next/navigation';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { client } from '../../../../sanity/lib/client';
import { getDramaByIdQuery } from '../../../../sanity/queries';
import DramaDetailContent from '@/components/subpages/kdrama/drama-detail/DramaDetailContent';
import type { Metadata } from 'next';

interface DramaPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DramaPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const drama = await client.fetch(getDramaByIdQuery, { id });

    if (!drama) {
      return {
        title: 'Drama nicht gefunden | 82seoul',
        description: 'Das gesuchte K-Drama wurde in der Datenbank nicht gefunden.',
      };
    }

    return {
      title: `${drama.title} | 82seoul K-Drama`,
      description: drama.description || 'Entdecke fesselnde K-Dramen und Hintergrundinformationen auf 82seoul.',
      openGraph: {
        title: drama.title,
        description: drama.description,
        images: drama.image ? [drama.image] : [],
      },
    };
  } catch (error) {
    console.error("METADATA FEHLER (KDRAMA):", error);
    return {
      title: '82seoul | K-Drama',
    };
  }
}

export default async function DramaDetailPage({ params }: DramaPageProps) {
  const { id } = await params;

  const drama = await client.fetch(getDramaByIdQuery, { id });

  if (!drama) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0c] text-white select-none">
      <Navbar />
      <DramaDetailContent drama={drama} />
      <Footer />
    </main>
  );
}