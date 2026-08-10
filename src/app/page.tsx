import Navbar from "@/components/core/Navbar";
import Header from "@/components/home/Header";
import StatsDivider from "@/components/home/StatsDivider";
import KDramaSection from "@/components/home/KDramaSection";
import KPopSection from "@/components/home/KPopSection";
import KBeautySection from "@/components/home/KBeautySection";
import KFoodSection from "@/components/home/KFoodSection";
import KoreaSection from "@/components/home/KoreaSection";
import Footer from "@/components/core/Footer";

// Sanity importok
import { client } from "../../sanity/lib/client";
import { getArtistsQuery } from "../../sanity/queries";

export default async function Home() {
  // Lekérjük a bandákat a Sanityből
  const artists = await client.fetch(getArtistsQuery);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* 1. Képernyő: Navigáció + Hero */}
      <Navbar />
      <Header />

      {/* 2. Képernyő: A divider és a K-Drama szekció pontosan 1 teljes kijelzőmagasságot tölt ki együtt */}
      <div className="min-h-screen flex flex-col justify-between">
        <StatsDivider />
        <KBeautySection />
        <KDramaSection />
      </div>

      {/* Átadjuk a Sanityből kapott adatokat a KPop szekciónak */}
      <KPopSection groups={artists} />

      <KFoodSection />
      <KoreaSection />
      <Footer />
    </main>
  );
}