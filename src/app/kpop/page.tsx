import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import KPopHero from '@/components/subpages/kpop/KPopHero';
import LogoMarquee from '@/components/subpages/kpop/LogoMarquee';
import KPopGroupList from '@/components/subpages/kpop/KPopGroupList';
import KPopGlossaryBubbles from '@/components/subpages/kpop/KPopGlossaryBubbles';
import GraffitiItem from '@/components/subpages/kpop/GraffitiItem';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'K-Pop Künstler, Gruppen & Musik | 82seoul K-Pop',
  description: 'Entdecke alle K-Pop-Gruppen, Künstler, Alben und Charts aus Südkorea auf 82seoul.',
  alternates: {
    canonical: 'https://www.82seoul.de/kpop',
  },
  openGraph: {
    title: 'K-Pop Künstler & Gruppen | 82seoul K-Pop',
    description: 'Entdecke alle K-Pop-Gruppen, Künstler und Alben aus Südkorea.',
    url: 'https://www.82seoul.de/kpop',
  },
};

import { client } from '../../../sanity/lib/client';
import { getArtistsQuery } from '../../../sanity/queries';

export default async function KPopPage() {
  // Lekérjük az összes bandát a Sanityből egyszer
  const artists = await client.fetch(getArtistsQuery);

  // Kiválogatjuk a Top 3-at a Hero-hoz már itt a szerveren!
  const topThreeHeroes = artists
    ?.filter((artist: any) => typeof artist.rank === 'number')
    ?.sort((a: any, b: any) => a.rank - b.rank)
    ?.slice(0, 3) || [];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white text-zinc-900">
      <Navbar />

      {/* Átadjuk a kész Top 3 adatot a Hero-nak */}
      <KPopHero initialArtists={topThreeHeroes} />

      <LogoMarquee />

      <KPopGroupList initialArtists={artists} />

      <GraffitiItem />

      <KPopGlossaryBubbles />

      <Footer />
    </main>
  );
}