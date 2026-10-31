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
  topArtists: any[];        // Új: A Header-nek küldött Top 3 előadó
  featuredProducts: any[];  // Megtartva a jövőbeli webshophoz
  shopProducts: any[];      // Megtartva a webshophoz
  artists: any[];           // Az összes előadó a KPopSectionnek
  recipes: any[];           // Receptek a KFoodSectionnek
}

export default function HomeContent({ topArtists, featuredProducts, shopProducts, artists, recipes }: HomeContentProps) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* Átadjuk a Headernek a topArtists-t a termékek helyett */}
      <Header 
        topArtists={topArtists} 
      />

      {/* A StatsDivider alatti konténer, amibe most a KPopSection került bele */}
      <div className="min-h-screen flex flex-col justify-between">
        <StatsDivider />
        {/* <KBeautySection products={shopProducts} /> */}
        <KPopSection groups={artists} />
      </div>

      {/* A KDramaSection pedig kikerült ide, a div elé/alá */}
      <KDramaSection />
      <KFoodSection items={recipes} />
      {/* <KoreaSection /> */}
      <Footer />

      {/* Globális K-Beauty Modális ablak a főoldal alján (megtartva a webshophoz) */}
      <KBeautyDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}