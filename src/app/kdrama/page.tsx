import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import DramaHero from '@/components/subpages/kdrama/DramaHero';
import DramaShowcase from '@/components/subpages/kdrama/DramaShowcase';
import ActorEditorial from '@/components/subpages/kdrama/ActorEditorial';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Sanity import a gyökérből
import { client } from '../../../sanity/lib/client';
import { getDramasQuery, getActorsQuery } from '../../../sanity/queries'; // Feltételezve, hogy van getActorsQuery is

export default async function KDramaMainPage() {
  // Lekérjük a drámákat ÉS a színészeket a Sanity-ből párhuzamosan
  const [dramas, actors] = await Promise.all([
    client.fetch(getDramasQuery),
    client.fetch(getActorsQuery) // Vagy amilyen query-t használsz a színészekre
  ]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0c] text-white">
      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. HERO ÉS FILM SZEKCIÓK */}
      <DramaHero dramas={dramas} />
      <DramaShowcase dramas={dramas} />
      
      {/* 3. SZÍNÉSZ SZEKCIÓK (Itt már a lekérdezett 'actors' tömböt adjuk át!) */}
      <ActorEditorial actors={actors} />

      {/* 4. FOOTER */}
      <Footer />
    </main>
  );
}