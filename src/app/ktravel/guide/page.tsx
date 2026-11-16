import { client } from "../../../../sanity/lib/client";
import { getTravelGuideItemsQuery } from "../../../../sanity/queries"; // Használjuk a fix, működő query-t!
import GuideHeader from "@/components/subpages/ktravel/guide/GuideHeader";
import GuideTickerDivider from "@/components/subpages/ktravel/guide/GuideTickerDivider";
import GuideArticleGrid from "@/components/subpages/ktravel/guide/GuideArticleGrid";
import Footer from "@/components/core/Footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Praktische Reise-Guides & Tipps | 82seoul K-Travel',
  description: 'Entdecke nützliche Tipps, App-Empfehlungen wie Naver & Papago und alles, was du für deine Südkorea-Reise wissen musst.',
  alternates: {
    canonical: 'https://www.82seoul.de/ktravel/guide',
  },
  openGraph: {
    title: 'Reise-Guides & Tipps | 82seoul K-Travel',
    description: 'Nützliche Tipps und App-Empfehlungen für deine Südkorea-Reise.',
    url: 'https://www.82seoul.de/ktravel/guide',
  },
};

export default async function GuideCategoryPage() {
  // Lekérdjük közvetlenül a travelGuideItem típusú elemeket
  const articles = await client.fetch(getTravelGuideItemsQuery);

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-200">
      <GuideHeader />
      <GuideTickerDivider />
      <GuideArticleGrid articles={articles} /> 
      <Footer />
    </main>
  );
}