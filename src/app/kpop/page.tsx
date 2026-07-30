import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import KPopHero from '@/components/subpages/kpop/KPopHero';
import LogoMarquee from '@/components/subpages/kpop/LogoMarquee';
import KPopGroupList from '@/components/subpages/kpop/KPopGroupList';
import KPopGlossaryBubbles from '@/components/subpages/kpop/KPopGlossaryBubbles';

export default function KPopPage() {
  return (
    // Ne tegyünk ide egyedi háttérszínt (pl. bg-[#e8e8e8]), mert az elrontja a szekciók saját átmeneteit!
    <main className="min-h-screen w-full overflow-x-hidden bg-white text-zinc-900">
      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. HERO SZEKCIÓ */}
      <KPopHero />

      {/* 3. LOGÓSÁV */}
      <LogoMarquee />

      {/* 4. BANDÁK LISTÁJA */}
      <KPopGroupList />

      {/* 5. SZÓTÁR BUBORÉKOK */}
      <KPopGlossaryBubbles />

      {/* 6. FOOTER */}
      <Footer />
    </main>
  );
}