import { notFound } from 'next/navigation';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import { client } from '../../../../sanity/lib/client';
import { getShopProductBySlugQuery, getShopProductsQuery } from '../../../../sanity/queries';
import KBeautyDetailContent from '@/components/subpages/kbeauty/kbeauty-detail/KBeautyDetailContent';
import KBeautyRelatedProducts from '@/components/subpages/kbeauty/kbeauty-detail/KBeautyRelatedProducts';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface KBeautyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: KBeautyPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const item = await client.fetch(getShopProductBySlugQuery, { slug: id });

    if (!item) {
      return {
        title: 'Produkt nicht gefunden | 82seoul',
        description: 'Das gesuchte K-Beauty-Produkt wurde auf 82seoul nicht gefunden.',
      };
    }

    return {
      title: `${item.title} | 82seoul K-Beauty`,
      description: item.description || 'Entdecke die besten K-Beauty-Produkte und Pflegeroutinen bei 82seoul.',
      openGraph: {
        title: item.title,
        description: item.description,
        images: item.image ? [item.image] : [],
      },
    };
  } catch (error) {
    console.error("METADATA FEHLER (KBEAUTY):", error);
    return {
      title: '82seoul | K-Beauty',
    };
  }
}

export default async function KBeautyDetailPage({ params }: KBeautyPageProps) {
  const { id } = await params;

  let item = null;
  let allProducts = [];

  try {
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
      <KBeautyDetailContent product={item} />
      <KBeautyRelatedProducts products={allProducts} currentProductId={item._id} />
      <Footer />
    </main>
  );
}