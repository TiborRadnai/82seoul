import { client } from "../../../../sanity/lib/client";
import { getAllTravelArticlesByCategoryQuery } from "../../../../sanity/queries";
import NatureHeader from "@/components/subpages/ktravel/nature/NatureHeader";
import NatureTickerDivider from "@/components/subpages/ktravel/nature/NatureTickerDivider";
import NatureArticleGrid from "@/components/subpages/ktravel/nature/NatureArticleGrid";
import Footer from "@/components/core/Footer";

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