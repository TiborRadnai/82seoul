"use client";

import { useState } from "react";
import { Sparkles, ShoppingBag, Star, ArrowUpRight } from "lucide-react";
import { FEATURED_PRODUCTS, Product } from "../../data/kbeautyData";
import KBeautyDetailModal from "@/components/modals/KBeautyDetailModal";

export default function KBeautySection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Közvetlen kosárba helyezés funkció
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Megakadályozza, hogy a kártyára kattintás (modal megnyitása) is lefusson
    console.log("Kosárba téve:", product.name);
  };

  return (
    <section className="w-full py-24 md:py-36 bg-linear-to-b from-neutral-950 via-slate-100 to-slate-50 text-neutral-900 relative overflow-hidden border-t border-neutral-800/60">
      
      {/* 1. SEYLEM-ÁTMENET KÖD: Feketéből észrevétlenül simul bele a világos háttérbe */}
      <div className="absolute top-0 inset-x-0 h-64 bg-linear-to-b from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none z-0" />

      {/* Finom rózsaszínes-ezüstös háttérfények a prémium összhatáshoz */}
      <div className="absolute top-1/3 right-10 w-125 h-125 bg-linear-to-br from-rose-200/20 via-slate-200/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-112.5 h-112.5 bg-linear-to-tl from-amber-200/20 via-rose-200/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Tágas, 1600px-es konténer */}
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 relative z-10 pt-6">
        
        {/* FEJLÉC - RAGYOGÓ VILÁGOS SZÖVEGEKKEL A SÖTÉT KÖDBEN */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            
            {/* Rose-Gold / Ezüst Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-rose-500/30 text-rose-200 text-xs font-bold tracking-widest uppercase shadow-md">
              <Sparkles className="w-3.5 h-3.5 stroke-[1.75] text-rose-400" />
              <span>82SEOUL BEAUTY SHOP</span>
            </div>

            {/* Hófehér főcím rose-gold / champagner átmenettel */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-white drop-shadow-md">
              A koreai szépségápolás <br className="hidden sm:block" />
              <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-rose-200 via-pink-200 to-amber-200">
                új dimenziója.
              </span>
            </h2>

            {/* Tisztán olvasható világos leíró szöveg */}
            <p className="text-slate-300 text-base md:text-lg font-normal leading-relaxed drop-shadow-sm">
              Készülj fel a legnépszerűbb eredeti K-Beauty kozmetikumokra! Közvetlenül Szöulból hozzuk el neked a legforróbb Glass Skin bőrápolási trendeket.
            </p>
          </div>

          {/* FŐ EZÜST GOMB A WEBSHOPBA */}
          <div className="flex justify-center md:justify-end">
            <a 
              href="#webshop"
              className="inline-flex items-center gap-3 px-9 py-4 bg-linear-to-b from-slate-900 via-slate-800 to-black hover:from-black hover:to-slate-900 text-white font-bold text-xs md:text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-2xl border border-slate-700/50 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
              <span>WEBSHOP MEGTEKINTÉSE</span>
              <span className="text-base text-slate-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">➔</span>
            </a>
          </div>
        </div>

        {/* TERMÉK KÁRTYÁK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product: Product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group relative bg-white border border-slate-200/90 rounded-[36px] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-slate-400 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] flex flex-col justify-between cursor-pointer"
            >
              
              {/* Kártya Teteje: Tag & Értékelés & Lebegő ikon */}
              <div className="flex items-center justify-between relative z-20">
                {product.tag ? (
                  <span className="px-3.5 py-1 rounded-full bg-linear-to-r from-slate-100 to-slate-200/80 text-slate-800 border border-slate-300/80 text-[10px] font-extrabold uppercase tracking-widest shadow-2xs">
                    {product.tag}
                  </span>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-600 text-xs font-bold bg-amber-50/80 px-3 py-1 rounded-full border border-amber-200 shadow-2xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>

                  {/* Ezüst nyilacska kör */}
                  <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-slate-900 border border-slate-200 text-slate-700 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>

              {/* LEBEGŐ TERMÉK KÉP TERÜLET */}
              <div className="relative my-8 h-52 w-full flex items-center justify-center">
                
                {/* Lágy ezüstös-szürke árnyék a lebegéshez */}
                <div className="absolute bottom-1 w-32 h-5 bg-slate-400/25 rounded-full blur-md transition-all duration-500 group-hover:w-40 group-hover:bg-slate-500/35 group-hover:blur-lg" />

                {/* Termék Kép */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 max-h-48 object-contain transition-all duration-500 group-hover:scale-108 group-hover:-translate-y-2 drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600";
                  }}
                />
              </div>

              {/* Termék Infók */}
              <div className="space-y-3 pt-4 border-t border-slate-100 relative z-20">
                <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  {product.brand} • {product.category}
                </div>

                <h3 className="text-lg font-bold text-slate-950 group-hover:text-slate-700 transition-colors line-clamp-1">
                  {product.name}
                </h3>

                {/* Megerősített kontraszt a kártyákon is */}
                <p className="text-xs text-slate-600 font-normal line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Árak & Ezüst Kosár Gomb */}
                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-slate-950">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-normal">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Kis Ezüst Kerek Kosár Gomb - Azonnali kosárba helyezés */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    title="Kosárba"
                    className="w-10 h-10 rounded-full bg-linear-to-b from-slate-100 via-slate-200 to-slate-300 hover:from-slate-900 hover:to-black text-slate-800 hover:text-white flex items-center justify-center transition-all duration-300 border border-slate-300/80 shadow-2xs hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* K-BEAUTY GYORSNÉZET MODAL */}
      <KBeautyDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </section>
  );
}