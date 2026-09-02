import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import KFoodHero from '@/components/subpages/kfood/KFoodHero';
import KFoodCatalog from '@/components/subpages/kfood/KFoodCatalog';
import { client } from '../../../sanity/lib/client';
import { getRecipesQuery, getProductsQuery } from '../../../sanity/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface KFoodMainPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function KFoodMainPage({ searchParams }: KFoodMainPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialTab = (resolvedSearchParams.tab as string) === 'products' ? 'products' : 'recipes';
  const initialCategory = (resolvedSearchParams.category as string) || 'Minden';

  let recipes = [];
  let products = [];

  try {
    const results = await Promise.all([
      client.fetch(getRecipesQuery),
      client.fetch(getProductsQuery),
    ]);
    recipes = results[0] || [];
    products = results[1] || [];
  } catch (error) {
    console.error("SANITY LEKÉRDEZÉSI HIBA A K-FOOD FŐOLDALON:", error);
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-linear-to-b from-[#0a0a0c] via-[#1a1a22] to-[#2e2e38] text-white">
      <Navbar />
      
      <KFoodHero />
      <KFoodCatalog 
        recipes={recipes} 
        products={products} 
        initialTab={initialTab}
        initialCategory={initialCategory}
      />
      
      <Footer />
    </main>
  );
}