import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import DramaHero from '@/components/subpages/kdrama/DramaHero';
import DramaShowcase from '@/components/subpages/kdrama/DramaShowcase';
// Ide jönnek majd sorban az új komponensek, ahogy elkészülnek:
// import DramaGrid from '@/components/subpages/kdrama/DramaGrid';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Sanity import a gyökérből
import { client } from '../../../sanity/lib/client';
import { getDramasQuery } from '../../../sanity/queries';

export default async function KDramaMainPage() {
  // Lekérjük a drámákat a Sanity-ből
  const dramas = await client.fetch(getDramasQuery);

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0c] text-white">
      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. HERO SZEKCIÓ (itt jelenik meg a kiemelt dráma / címlap) */}
      <DramaHero dramas={dramas} />
      <DramaShowcase dramas={dramas} />

      {/* 3. MAjd ide jönnek a többi komponensek sorban */}
      {/* <DramaGrid dramas={dramas} /> */}

      {/* 4. FOOTER */}
      <Footer />
    </main>
  );
}