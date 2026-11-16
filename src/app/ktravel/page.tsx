import dynamic from "next/dynamic";
import TravelHero from "@/components/subpages/ktravel/TravelHero";
import Footer from "@/components/core/Footer";
import type { Metadata } from 'next';

// Sanity imports az aliasok használatával (pont úgy, mint a többi működő oldalon)
import { client } from "@sanity/lib/client";
import { getTravelGuideItemsQuery } from "@sanity/queries";

// --- DINAMIKUS KOMPONENSEK ---
const MetropolisSection = dynamic(() => import("@/components/subpages/ktravel/MetropolisSection"));
const CultureSection = dynamic(() => import("@/components/subpages/ktravel/CultureSection"));
const NatureSection = dynamic(() => import("@/components/subpages/ktravel/NatureSection"));
const TravelGuideSection = dynamic(() => import("@/components/subpages/ktravel/TravelGuideSection"));

export const metadata: Metadata = {
  title: 'Südkorea Reiseführer, Städte & Natur | 82seoul K-Travel',
  description: 'Entdecke die faszinierendsten Städte, Kultur, Natur und praktische Reise-Guides für Südkorea auf 82seoul.',
  alternates: {
    canonical: 'https://www.82seoul.de/ktravel',
  },
  openGraph: {
    title: 'Südkorea Reiseführer & Tipps | 82seoul K-Travel',
    description: 'Entdecke Städte, Kultur, Natur und praktische Reise-Guides für Südkorea.',
    url: 'https://www.82seoul.de/ktravel',
  },
};

export default async function KoreaTravelPage() {
  try {
    // Aszinkron adatlekérdezés biztonságos kezeléssel
    const guideItems = await client.fetch(getTravelGuideItemsQuery);

    return (
      <main className="min-h-screen bg-neutral-950 text-white font-sans antialiased">
        <TravelHero />
        <MetropolisSection />
        <CultureSection />
        <NatureSection />
        <TravelGuideSection initialGuideItems={guideItems || []} />
        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Sanity fetch error on Travel page:", error);
    // Ha elszáll a Sanity, ne dobjon teljes 404-et a szerver, hanem rendereljen egy tartalékot vagy üres listát
    return (
      <main className="min-h-screen bg-neutral-950 text-white font-sans antialiased">
        <TravelHero />
        <MetropolisSection />
        <CultureSection />
        <NatureSection />
        <TravelGuideSection initialGuideItems={[]} />
        <Footer />
      </main>
    );
  }
}