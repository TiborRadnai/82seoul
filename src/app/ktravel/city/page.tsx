import { client } from "../../../../sanity/lib/client";
import { getAllTravelArticlesByCategoryQuery } from "../../../../sanity/queries";
import CityHeader from "@/components/subpages/ktravel/city/CityHeader";
import CityTickerDivider from "@/components/subpages/ktravel/city/CityTickerDivider";
import CityArticleGrid from "@/components/subpages/ktravel/city/CityArticleGrid";
import Footer from "@/components/core/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stadt & Metropole Reiseführer | 82seoul K-Travel',
  description: 'Entdecke die faszinierendsten Städte und Metropolen Südkoreas auf 82seoul.',
  alternates: {
    canonical: 'https://www.82seoul.de/ktravel/city',
  },
  openGraph: {
    title: 'Stadt & Metropole | 82seoul K-Travel',
    description: 'Entdecke die faszinierendsten Städte und Metropolen Südkoreas.',
    url: 'https://www.82seoul.de/ktravel/city',
  },
};

export default async function CityCategoryPage() {
  const articles = await client.fetch(getAllTravelArticlesByCategoryQuery, { category: "city" });

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-200">
      <CityHeader />
      <CityTickerDivider />
      <CityArticleGrid articles={articles} /> 
      <Footer />
    </main>
  );
}