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

export default async function Home() {
  // Lekérjük a bandákat, recepteket, a kiemelt termékeket a Headernek ÉS az összes webshop terméket a K-Beauty szekciónak parallel módon
  const [artists, recipes, featuredProductsRaw, shopProducts] = await Promise.all([
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

  // Átalakítjuk a termékeket a Header által elvárt formátumra
  const featuredProducts = featuredProductsRaw.map((item: any) => ({
    title: item.title,
    price: item.price ? `${item.price} €` : '',
    description: item.description || '',
    image: item.image || '',
    link: `/shop/${item.slug}`,
  }));

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* 1. Képernyő: Navigáció + Hero a Sanity kiemelt termékeivel */}
      <Header featuredProducts={featuredProducts} />

      {/* 2. Képernyő: A divider, a K-Beauty (Sanity adatokkal) és a K-Drama szekció */}
      <div className="min-h-screen flex flex-col justify-between">
        <StatsDivider />
        <KBeautySection products={shopProducts} />
        <KDramaSection />
      </div>

      {/* Átadjuk a Sanityből kapott adatokat a KPop szekciónak */}
      <KPopSection groups={artists} />

      {/* Átadjuk a recepteket a K-Food szekciónak */}
      <KFoodSection items={recipes} />

      <KoreaSection />
      <Footer />
    </main>
  );
}