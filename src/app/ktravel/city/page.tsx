import { client } from "../../../../sanity/lib/client";
import { getAllTravelArticlesByCategoryQuery } from "../../../../sanity/queries";
import CityHeader from "@/components/subpages/ktravel/city/CityHeader";
import CityTickerDivider from "@/components/subpages/ktravel/city/CityTickerDivider";
import CityArticleGrid from "@/components/subpages/ktravel/city/CityArticleGrid";
import Footer from "@/components/core/Footer";


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