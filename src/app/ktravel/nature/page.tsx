import { client } from "../../../../sanity/lib/client";
import { getAllTravelArticlesByCategoryQuery } from "../../../../sanity/queries";
import NatureHeader from "@/components/subpages/ktravel/nature/NatureHeader";
import NatureTickerDivider from "@/components/subpages/ktravel/nature/NatureTickerDivider";
import NatureArticleGrid from "@/components/subpages/ktravel/nature/NatureArticleGrid";
import Footer from "@/components/core/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Natur & Landschaften Reiseführer | 82seoul K-Travel',
  description: 'Entdecke die atemberaubende Natur Südkoreas – von der Insel Jeju bis zu beeindruckenden Nationalparks und Berggipfeln auf 82seoul.',
  alternates: {
    canonical: 'https://www.82seoul.de/ktravel/nature',
  },
  openGraph: {
    title: 'Natur & Landschaften | 82seoul K-Travel',
    description: 'Entdecke die atemberaubende Natur Südkoreas, Insel Jeju und Nationalparks.',
    url: 'https://www.82seoul.de/ktravel/nature',
  },
};

export default async function NatureCategoryPage() {
  const articles = await client.fetch(getAllTravelArticlesByCategoryQuery, { category: "nature" });

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-200">
      <NatureHeader />
      <NatureTickerDivider />
      <NatureArticleGrid articles={articles} /> 
      <Footer />
    </main>
  );
}