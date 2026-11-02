import TravelHero from "@/components/subpages/ktravel/TravelHero";
import MetropolisSection from "@/components/subpages/ktravel/MetropolisSection";
import CultureSection from "@/components/subpages/ktravel/CultureSection";
import NatureSection from "@/components/subpages/ktravel/NatureSection";
import GuideArticleGrid from "@/components/subpages/ktravel/guide/GuideArticleGrid";
import Footer from "@/components/core/Footer";

// HASZNÁLJUK A BIZTOS @/ ALIAST A SANITY-HEZ IS:
import { client } from "../../../sanity/lib/client";
import { getTravelGuideItemsQuery } from "../../../sanity/queries";

export default async function KoreaTravelPage() {
  const guideItems = await client.fetch(getTravelGuideItemsQuery);
  
  // Ellenőrzésképpen kiírjuk a terminálba, hogy jön-e adat
  console.log("SANITY GUIDE ITEMS:", guideItems);

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans antialiased">
      <TravelHero />
      <MetropolisSection />
      <CultureSection />
      <NatureSection />
      
      {/* Itt kapja meg a sávos grid a Sanity-s adatokat */}
      <GuideArticleGrid articles={guideItems} />

      <Footer />
    </main>
  );
}