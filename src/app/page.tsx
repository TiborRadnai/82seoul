import Header from "@/components/home/Header";
import StatsDivider from "@/components/home/StatsDivider";
import KDramaSection from "@/components/home/KDramaSection";
import KPopSection from "@/components/home/KPopSection";
import KBeautySection from "@/components/home/KBeautySection";
import KFoodSection from "@/components/home/KFoodSection";
import KoreaSection from "@/components/home/KoreaSection";
import Footer from "@/components/core/Footer";

// Sanity importok
import { client } from "../../sanity/lib/client";
import { getArtistsQuery, getRecipesQuery, getShopProductsQuery } from "../../sanity/queries";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Biztonságos, hibatűrő lekérdezések, hogy egyetlen Sanity hiba se borítsa fel a szervert
  let artists = [];
  let recipes = [];
  let featuredProductsRaw = [];
  let shopProducts = [];

  try {
    const results = await Promise.allSettled([
      client.fetch(getArtistsQuery),
      client.fetch(getRecipesQuery),
      client.fetch(`*[_type == "shopProduct" && featured == true][0...4]{
        title,
        "slug": id.current,
        "price": coalesce(variants[0].salePrice, variants[0].price),
        "description": tagline,
        "image": image.asset->url
      }`),
      client.fetch(getShopProductsQuery),
    ]);

    if (results[0].status === 'fulfilled') artists = results[0].value || [];
    if (results[1].status === 'fulfilled') recipes = results[1].value || [];
    if (results[2].status === 'fulfilled') featuredProductsRaw = results[2].value || [];
    if (results[3].status === 'fulfilled') shopProducts = results[3].value || [];
  } catch (err) {
    console.error("Hiba a főoldali adatok lekérdezésekor:", err);
  }

  const featuredProducts = featuredProductsRaw.map((item: any) => ({
    title: item.title || '',
    price: item.price ? `${item.price} €` : '',
    description: item.description || '',
    image: item.image || '',
    link: item.slug ? `/shop/${item.slug}` : '#',
  }));

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Header featuredProducts={featuredProducts} />

      <div className="min-h-screen flex flex-col justify-between">
        <StatsDivider />
        <KBeautySection products={shopProducts} />
        <KDramaSection />
      </div>

      <KPopSection groups={artists} />
      <KFoodSection items={recipes} />
      <KoreaSection />
      <Footer />
    </main>
  );
}