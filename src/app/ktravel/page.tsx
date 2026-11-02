import TravelHero from "@/components/subpages/ktravel/TravelHero";
import MetropolisSection from "@/components/subpages/ktravel/MetropolisSection";
import CultureSection from "@/components/subpages/ktravel/CultureSection";
import NatureSection from "@/components/subpages/ktravel/NatureSection";
import TravelGuideSection from "@/components/subpages/ktravel/TravelGuideSection";
import Footer from "@/components/core/Footer";
import { client } from "../../../sanity/lib/client";
import { getTravelGuideItemsQuery } from "../../../sanity/queries";

export default async function KoreaTravelPage() {
  // Lekérdjük a guide elemeket szerver oldalon
  const guideItems = await client.fetch(getTravelGuideItemsQuery);

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans antialiased">
      <TravelHero />
      <MetropolisSection />
      <CultureSection />
      <NatureSection />
      
      {/* Átadjuk az adatokat a kliens komponensnek */}
      <TravelGuideSection initialGuideItems={guideItems} />

      <Footer />
    </main>
  );
}