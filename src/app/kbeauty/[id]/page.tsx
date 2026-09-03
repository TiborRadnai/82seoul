import { notFound } from 'next/navigation';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import { client } from '../../../../sanity/lib/client';
import { getShopProductBySlugQuery, getShopProductsQuery } from '../../../../sanity/queries';
import KBeautyDetailContent from '@/components/subpages/kbeauty/kbeauty-detail/KBeautyDetailContent';
import KBeautyRelatedProducts from '@/components/subpages/kbeauty/kbeauty-detail/KBeautyRelatedProducts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface KBeautyPageProps {
  params: Promise<{ id: string }>;
}

export default async function KBeautyDetailPage({ params }: KBeautyPageProps) {
  const { id } = await params;

  let item = null;
  let allProducts = [];

  try {
    // Lekérjük az aktuális terméket és az összes többit a hasonló termékekhez
    item = await client.fetch(getShopProductBySlugQuery, { slug: id });
    allProducts = await client.fetch(getShopProductsQuery);
  } catch (error) {
    console.error("SANITY FEHLER BEIM PRODUKT:", error);
  }

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f7f3ef] text-slate-900">
      <Navbar />

      {/* Részletes termék tartalom */}
      <KBeautyDetailContent product={item} />

      {/* Hasonló termékek sáv alul */}
      <KBeautyRelatedProducts products={allProducts} currentProductId={item._id} />

      <Footer />
    </main>
  );
}