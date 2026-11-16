import { client } from "../../../../sanity/lib/client";
import { getAllTravelArticlesByCategoryQuery } from "../../../../sanity/queries";
import CultureHeader from "@/components/subpages/ktravel/culture/CultureHeader";
import CultureTickerDivider from "@/components/subpages/ktravel/culture/CultureTickerDivider";
import CultureArticleGrid from "@/components/subpages/ktravel/culture/CultureArticleGrid";
import Footer from "@/components/core/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kultur & Tradition Reiseführer | 82seoul K-Travel',
  description: 'Entdecke die faszinierende Kultur, Geschichte und Traditionen Südkoreas auf 82seoul.',
  alternates: {
    canonical: 'https://www.82seoul.de/ktravel/culture',
  },
  openGraph: {
    title: 'Kultur & Tradition | 82seoul K-Travel',
    description: 'Entdecke die faszinierende Kultur, Geschichte und Traditionen Südkoreas.',
    url: 'https://www.82seoul.de/ktravel/culture',
  },
};

export default async function CultureCategoryPage() {
  const articles = await client.fetch(getAllTravelArticlesByCategoryQuery, { category: "culture" });

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-200">
      <CultureHeader />
      <CultureTickerDivider />
      <CultureArticleGrid articles={articles} /> 
      <Footer />
    </main>
  );
}