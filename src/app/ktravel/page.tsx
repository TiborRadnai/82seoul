import TravelHero from "@/components/subpages/ktravel/TravelHero";
import MetropolisSection from "@/components/subpages/ktravel/MetropolisSection";
import CultureSection from "@/components/subpages/ktravel/CultureSection";
import NatureSection from "@/components/subpages/ktravel/NatureSection";
import TravelGuideSection from "@/components/subpages/ktravel/TravelGuideSection";
import Footer from "@/components/core/Footer";

export default function KoreaTravelPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans antialiased">
      {/* Grandiózus Hero */}
      <TravelHero />
      
      {/* 1. Kategória Szekció: Metropolisz */}
      <MetropolisSection />
      <CultureSection />
      <NatureSection />
      <TravelGuideSection />

      {/* Ide jönnek majd sorban a többi szekciók (Kultúra, Természet, Tippek) */}
      
      <Footer />
    </main>
  );
}