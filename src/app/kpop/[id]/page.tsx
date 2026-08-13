import { notFound } from 'next/navigation';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Sanity importok
import { client } from '../../../../sanity/lib/client';
import { getArtistByIdQuery } from '../../../../sanity/queries';

import ArtistHero from '@/components/subpages/kpop/artist-detail/ArtistHero';
import ArtistStats from '@/components/subpages/kpop/artist-detail/ArtistStats';
import ArtistMembers from '@/components/subpages/kpop/artist-detail/ArtistMembers';
import ArtistOverview from '@/components/subpages/kpop/artist-detail/ArtistOverview';
import ArtistDiscography from '@/components/subpages/kpop/artist-detail/ArtistDiscography';
import ArtistDetailClientWrapper from '@/components/subpages/kpop/artist-detail/ArtistDetailClientWrapper';

interface ArtistPageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtistDetailPage({ params }: ArtistPageProps) {
  const { id } = await params;
  
  // Lekérjük az adatot a Sanity-ből az ID alapján
  const artist = await client.fetch(getArtistByIdQuery, { id });

  if (!artist) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0c] text-white select-none">
      <Navbar />

      <ArtistHero artist={artist} />
      <ArtistStats 
        agency={artist.agency} 
        members={artist.members} 
        category={artist.category} 
        themeColor={artist.themeColor} 
      />
      
      <ArtistOverview 
        artistName={artist.name} 
        description={artist.description} 
        fandom={artist.fandom} 
        tagline={artist.tagline} 
        extendedHistory={artist.extendedHistory}
        agency={artist.agency}
        imageUrl={artist.image}
        themeColor={artist.themeColor}
      />

      {/* 
         Mivel az ArtistMembers és a Modal interaktív (useState-et használ), 
         ezeket kiszervezhetjük egy "Client Wrapper" komponensbe, 
         hogy a fő oldal továbbra is Server Component maradhasson.
      */}
      <ArtistDetailClientWrapper artist={artist} />

      <ArtistDiscography 
        albums={artist.albums} 
        themeColor={artist.themeColor} 
      />

      <Footer />
    </main>
  );
}