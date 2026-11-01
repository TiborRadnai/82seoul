'use client';

import { useState } from "react";
import Header from "@/components/home/Header";
import StatsDivider from "@/components/home/StatsDivider";
import KDramaSection from "@/components/home/KDramaSection";
import KPopSection from "@/components/home/KPopSection";
import KFoodSection from "@/components/home/KFoodSection";
import KBeautyDetailModal from "@/components/modals/KBeautyDetailModal";

interface HomeContentProps {
  readonly topArtists: any[];        
  readonly artists: any[];           
  readonly recipes: any[];           
}

export default function HomeContent({ 
  topArtists, 
  artists, 
  recipes 
}: HomeContentProps) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Header 
        topArtists={topArtists} 
      />

      <div className="min-h-screen flex flex-col justify-between">
        <StatsDivider />
        <KPopSection groups={artists} />
      </div>

      <KDramaSection />
      <KFoodSection items={recipes} />

      <KBeautyDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}