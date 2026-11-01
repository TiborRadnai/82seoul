import { client } from "../../../../sanity/lib/client";
import { getAllTravelArticlesByCategoryQuery } from "../../../../sanity/queries";
import GuideHeader from "@/components/subpages/ktravel/guide/GuideHeader";
import GuideTickerDivider from "@/components/subpages/ktravel/guide/GuideTickerDivider";
import GuideArticleGrid from "@/components/subpages/ktravel/guide/GuideArticleGrid";
import Footer from "@/components/core/Footer";

export default async function GuideCategoryPage() {
  const articles = await client.fetch(getAllTravelArticlesByCategoryQuery, { category: "guide" });

  return (
    <main className="min-h-screen bg-white text-neutral-900 selection:bg-neutral-200">
      <GuideHeader />
      <GuideTickerDivider />
      <GuideArticleGrid articles={articles} /> 
      <Footer />
    </main>
  );
}