import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import KFoodHero from '@/components/subpages/kfood/KFoodHero';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function KFoodMainPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0c] text-white">
      <Navbar />
      
      <KFoodHero />
      
      {/* Ide jönnek majd a további K-Food subpage komponensek */}

      <Footer />
    </main>
  );
}