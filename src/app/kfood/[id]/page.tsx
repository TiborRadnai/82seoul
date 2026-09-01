import { notFound } from 'next/navigation';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface KFoodPageProps {
  params: Promise<{ id: string }>;
}

export default async function KFoodDetailPage({ params }: KFoodPageProps) {
  const { id } = await params;

  // Itt majd lekérjük az adatot, ha megvan az adatbázis séma
  const item = null; 

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0c] text-white select-none">
      <Navbar />
      <div className="py-24 text-center text-neutral-400">Részletes nézet hamarosan...</div>
      <Footer />
    </main>
  );
}