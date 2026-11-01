import { client } from "../../../../sanity/lib/client";
import { getAllTravelArticlesByCategoryQuery } from "../../../../sanity/queries";
import CultureHeader from "@/components/subpages/ktravel/culture/CultureHeader";
import CultureTickerDivider from "@/components/subpages/ktravel/culture/CultureTickerDivider";
import CultureArticleGrid from "@/components/subpages/ktravel/culture/CultureArticleGrid";
import Footer from "@/components/core/Footer";

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