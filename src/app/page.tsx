import HomeContent from "@/components/home/HomeContent";

// Sanity importok
import { client } from "../../sanity/lib/client";
import { getArtistsQuery, getRecipesQuery, getShopProductsQuery } from "../../sanity/queries";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let artists = [];
  let recipes = [];
  let shopProducts = [];

  try {
    const results = await Promise.allSettled([
      client.fetch(getArtistsQuery),
      client.fetch(getRecipesQuery),
      client.fetch(getShopProductsQuery),
    ]);

    if (results[0].status === 'fulfilled') artists = results[0].value || [];
    if (results[1].status === 'fulfilled') recipes = results[1].value || [];
    if (results[2].status === 'fulfilled') shopProducts = results[2].value || [];
  } catch (err) {
    console.error("Hiba a főoldali adatok lekérdezésekor:", err);
  }

  // Kiemelt termékek kiválogatása a teljes shopProducts listából (így minden adat megmarad a modalhoz)
  const featuredProducts = shopProducts
    .filter((item: any) => item.featured === true)
    .slice(0, 4);

  return (
    <HomeContent 
      featuredProducts={featuredProducts}
      shopProducts={shopProducts}
      artists={artists}
      recipes={recipes}
    />
  );
}