// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { client } from '../../sanity/lib/client';

// A te saját, valós Sanity lekérdezéseid importálása:
import { 
  getShopProductsQuery, 
  getDramasQuery, 
  getRecipesQuery, 
  getProductsQuery, 
  getArtistsQuery, 
  getAllTravelArticlesByCategoryQuery 
} from '../../sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://82seoul.de';

  // 1. Statikus oldalak (német nyelven)
  const staticPages = [
    '',
    '/kbeauty',
    '/kdrama',
    '/kfood',
    '/kpop',
    '/ktravel',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    // 2. Dinamikus adatok lekérése a Sanityből a pontos query-kkel
    const [shopProducts, dramas, recipes, foodProducts, artists, travelCity, travelCulture, travelNature] = await Promise.all([
      client.fetch(getShopProductsQuery).catch(() => []),
      client.fetch(getDramasQuery).catch(() => []),
      client.fetch(getRecipesQuery).catch(() => []),
      client.fetch(getProductsQuery).catch(() => []),
      client.fetch(getArtistsQuery).catch(() => []),
      client.fetch(getAllTravelArticlesByCategoryQuery, { category: 'city' }).catch(() => []),
      client.fetch(getAllTravelArticlesByCategoryQuery, { category: 'culture' }).catch(() => []),
      client.fetch(getAllTravelArticlesByCategoryQuery, { category: 'nature' }).catch(() => []),
    ]);

    // K-Beauty Shop termékek (slug-ot használ a query-d alapján)
    const productUrls = (shopProducts || []).map((item: any) => ({
      url: `${baseUrl}/kbeauty/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // K-Dramák (id-t használ a query-d alapján)
    const dramaUrls = (dramas || []).map((item: any) => ({
      url: `${baseUrl}/kdrama/${item.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // K-Food Receptek (id-t használ a query-d alapján)
    const recipeUrls = (recipes || []).map((item: any) => ({
      url: `${baseUrl}/kfood/${item.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // K-Food Termékek (id-t használ a query-d alapján)
    const foodProductUrls = (foodProducts || []).map((item: any) => ({
      url: `${baseUrl}/kfood/${item.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // K-Pop Artisták (id-t használ a query-d alapján)
    const artistUrls = (artists || []).map((item: any) => ({
      url: `${baseUrl}/kpop/${item.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // K-Travel cikkek (összegyűjtve a kategóriák szerint, slug-ot használva)
    const allTravelArticles = [...travelCity, ...travelCulture, ...travelNature];
    const travelUrls = allTravelArticles.map((item: any) => ({
      url: `${baseUrl}/ktravel/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Összefűzzük az egészet a sitemap tömbbe
    return [
      ...staticPages,
      ...productUrls,
      ...dramaUrls,
      ...recipeUrls,
      ...foodProductUrls,
      ...artistUrls,
      ...travelUrls,
    ];
  } catch (error) {
    console.error("SITEMAP FEHLER:", error);
    return staticPages;
  }
}