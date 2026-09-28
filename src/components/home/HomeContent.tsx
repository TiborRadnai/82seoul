'use client';

import { useState } from "react";
import Header from "@/components/home/Header";
import StatsDivider from "@/components/home/StatsDivider";
import KDramaSection from "@/components/home/KDramaSection";
import KPopSection from "@/components/home/KPopSection";
import KBeautySection from "@/components/home/KBeautySection";
import KFoodSection from "@/components/home/KFoodSection";
import KoreaSection from "@/components/home/KoreaSection";
import Footer from "@/components/core/Footer";
import KBeautyDetailModal from "@/components/modals/KBeautyDetailModal";

interface HomeContentProps {
  featuredProducts: any[];
  shopProducts: any[];
  artists: any[];
  recipes: any[];
}

export default function HomeContent({ featuredProducts, shopProducts, artists, recipes }: HomeContentProps) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Átadjuk a Headernek az onOpenModal függvényt */}
      <Header 
        featuredProducts={featuredProducts} 
        onOpenModal={(product) => setSelectedProduct(product)} 
      />

      <div className="min-h-screen flex flex-col justify-between">
        <StatsDivider />
        <KBeautySection products={shopProducts} />
        <KDramaSection />
      </div>

      <KPopSection groups={artists} />
      <KFoodSection items={recipes} />
      {/* <KoreaSection /> */}
      <Footer />

      {/* Globális K-Beauty Modális ablak a főoldal alján */}
      <KBeautyDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}