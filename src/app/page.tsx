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
import { getArtistsQuery, getRecipesQuery } from "../../sanity/queries";

export default async function Home() {
  // Lekérjük a bandákat és a recepteket a Sanityből parallel módon
  const [artists, recipes] = await Promise.all([
    client.fetch(getArtistsQuery),
    client.fetch(getRecipesQuery),
  ]);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* 1. Képernyő: Navigáció + Hero */}
      <Header />

      {/* 2. Képernyő: A divider és a K-Drama szekció pontosan 1 teljes kijelzőmagasságot tölt ki együtt */}
      <div className="min-h-screen flex flex-col justify-between">
        <StatsDivider />
        <KBeautySection />
        <KDramaSection />
      </div>

      {/* Átadjuk a Sanityből kapott adatokat a KPop szekciónak */}
      <KPopSection groups={artists} />

      {/* Átadjuk a recepteket a K-Food szekciónak */}
      <KFoodSection items={recipes} />

      <KoreaSection />
      <Footer />
    </main>
  );
}