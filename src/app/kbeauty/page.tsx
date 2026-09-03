import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import KBeautyHero from '@/components/subpages/kbeauty/KBeautyHero';
import KBeautyCatalog from '@/components/subpages/kbeauty/KBeautyCatalog'; // Ezt a komponenst fogjuk most megalkotni
import { client } from '../../../sanity/lib/client';
import { getShopProductsQuery } from '../../../sanity/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function KBeautyMainPage() {
  let products = [];

  try {
    products = await client.fetch(getShopProductsQuery) || [];
  } catch (error) {
    console.error("SANITY FEHLER AUF DER K-BEAUTY SEITE:", error);
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-100 text-slate-900">
      <Navbar />
      
      {/* A Hero most már tiszta K-Beauty shop termékeket kap a shopProduct-ból */}
      <KBeautyHero products={products} />
      <KBeautyCatalog products={products} />
      <Footer />
    </main>
  );
}