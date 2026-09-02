import { notFound } from 'next/navigation';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import KFoodDetailHero from '@/components/subpages/kfood/kfood-detail/KFoodDetailHero';
import KFoodDetailContent from '@/components/subpages/kfood/kfood-detail/KFoodDetailContent';
import KProductDetailContent from '@/components/subpages/kfood/kfood-detail/KProductDetailContent'; // Termékekhez
import { client } from '../../../../sanity/lib/client';
import { getRecipeByIdQuery, getProductByIdQuery } from '../../../../sanity/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface KFoodPageProps {
  params: Promise<{ id: string }>;
}

export default async function KFoodDetailPage({ params }: KFoodPageProps) {
  const { id } = await params;
  console.log("Keresett ID az URL-ből:", id);

  let item = await client.fetch(getRecipeByIdQuery, { id });
  let itemType = 'recipe';

  if (!item) {
    item = await client.fetch(getProductByIdQuery, { id });
    itemType = 'product';
  }

  if (!item) {
    notFound();
  }

  const detailedItem = { ...item, type: itemType };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-linear-to-b from-[#0a0a0c] via-[#1a1a22] to-[#2e2e38] text-white select-none">
      <Navbar />

      {/* A Hero csak receptek esetén jelenik meg */}
      {itemType === 'recipe' && <KFoodDetailHero item={detailedItem} />}

      {/* Tartalom típus szerinti elágazás */}
      {itemType === 'recipe' ? (
        <KFoodDetailContent item={detailedItem} />
      ) : (
        <KProductDetailContent item={detailedItem} />
      )}

      <Footer />
    </main>
  );
}