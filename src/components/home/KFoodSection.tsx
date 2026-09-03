'use client';

import Link from "next/link";
import { Utensils, ArrowUpRight, Clock } from "lucide-react";

interface KFoodItem {
  _id: string;
  title: string;
  koreanTitle?: string;
  id: string | { current: string };
  subCategory: string;
  tagline: string;
  prepTime?: string;
  image: any;
  featured?: boolean;
  spiceLevel?: '1' | '2' | '3';
}

interface KFoodSectionProps {
  items: KFoodItem[];
}

export default function KFoodSection({ items = [] }: KFoodSectionProps) {
  const featuredItem = items.find((item) => item.subCategory === "Főételek" && item.featured) || items.find((item) => item.subCategory === "Főételek") || items[0];
  
  const streetFoodItem = items.find((item) => item.subCategory === "Street Food" && item._id !== featuredItem?._id) || items.find((item) => item.subCategory === "Street Food");
  
  const soupItem = items.find((item) => item.subCategory === "Levesek & Egytálételek" && item._id !== featuredItem?._id) || items.find((item) => item.subCategory === "Levesek & Egytálételek");
  
  const dessertItem = items.find((item) => item.subCategory === "Desszertek & Sütemények" && item._id !== featuredItem?._id) || items.find((item) => item.subCategory === "Desszertek & Sütemények");

  const mediumItem = streetFoodItem || items[1];
  const smallItems = [soupItem, dessertItem].filter(Boolean) as KFoodItem[];

  if (!featuredItem) return null;

  // Biztosíték az ID kinyerésére, függetlenül a Sanity formátumától
  const getItemId = (item: KFoodItem) => {
    if (!item?.id) return '';
    if (typeof item.id === 'string') return item.id;
    if (typeof item.id === 'object' && 'current' in item.id) return item.id.current;
    return '';
  };

  // Segédfüggvény a csípősség jelölés megjelenítéséhez
  const renderSpiceBadge = (level?: '1' | '2' | '3') => {
    if (!level) return null;
    const count = Number(level);
    return (
      <div className="flex items-center gap-0.5 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-xs text-xs">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i}>🌶️</span>
        ))}
      </div>
    );
  };

  return (
    <section className="w-full py-24 md:py-36 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-800/60">
      
      <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-slate-50 via-neutral-950/80 to-neutral-950 pointer-events-none z-1 opacity-20" />

      <div className="absolute top-1/4 -right-32 w-125 h-125 bg-linear-to-br from-orange-950/20 via-amber-950/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-112.5 h-112.5 bg-linear-to-tl from-rose-950/20 via-orange-950/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* FEJLÉC */}
      <div className="max-w-3xl mx-auto px-6 text-center z-10 relative mb-14 md:mb-20 space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/60 text-amber-400 text-xs font-bold tracking-widest uppercase shadow-md">
          <Utensils className="w-3.5 h-3.5 stroke-[1.75] text-amber-500" />
          <span>K-FOOD & GASTRONOMIE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.15]">
          Die Kunst der{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-300 to-amber-200">
            koreanischen Küche.
          </span>
        </h2>

        <p className="text-neutral-300 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
          Von dampfenden Street-Food-Klassikern bis hin zu traditionell fermentierten Gerichten. Aromen, hinter denen jahrhundertelange Geschichte und Kultur stehen.
        </p>
      </div>

      {/* BENTO GRID */}
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 1. KIEMELT FŐKÁRTYA (LARGE HERO BENTO) */}
          <Link
            href={`/kfood/${getItemId(featuredItem)}`}
            className="lg:col-span-7 group relative h-120 md:h-135 rounded-3xl overflow-hidden bg-black border border-neutral-800 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(234,88,12,0.25)] hover:border-amber-500/50 block cursor-pointer"
          >
            <img
              src={featuredItem.image || ""}
              alt={featuredItem.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 via-50% to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                {featuredItem.subCategory}
              </span>

              <div className="flex items-center gap-2">
                {renderSpiceBadge(featuredItem.spiceLevel)}
                <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:text-black">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-8 space-y-3 z-10 text-white">
              {featuredItem.prepTime && (
                <div className="flex items-center gap-3 text-xs text-neutral-300 font-medium">
                  <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-xs border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {featuredItem.prepTime}
                  </span>
                </div>
              )}

              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                {featuredItem.title}
              </h3>

              <p className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed max-w-xl drop-shadow-xs">
                {featuredItem.tagline}
              </p>
            </div>
          </Link>

          {/* 2. JOBB OLDALI HASÁB */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Közepes Kártya */}
            {mediumItem && (
              <Link
                href={`/kfood/${getItemId(mediumItem)}`}
                className="group relative h-60 md:h-64 rounded-3xl overflow-hidden bg-black border border-neutral-800 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(234,88,12,0.2)] hover:border-amber-500/40 block cursor-pointer"
              >
                <img
                  src={mediumItem.image || ""}
                  alt={mediumItem.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-wider uppercase">
                    {mediumItem.subCategory}
                  </span>

                  <div className="flex items-center gap-2">
                    {renderSpiceBadge(mediumItem.spiceLevel)}
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:text-black">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 space-y-1.5 z-10 text-white">
                  <h3 className="text-2xl font-bold tracking-tight text-white">{mediumItem.title}</h3>
                  <p className="text-xs text-neutral-300 line-clamp-1 font-normal">{mediumItem.tagline}</p>
                </div>
              </Link>
            )}

            {/* Alsó Dupla Kiskártya Sor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {smallItems.map((item, index) => (
                <Link
                  key={`${item._id || 'item'}-${index}`}
                  href={`/kfood/${getItemId(item)}`}
                  className="group relative h-56 md:h-64 rounded-3xl overflow-hidden bg-black border border-neutral-800 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(234,88,12,0.2)] hover:border-amber-500/40 block cursor-pointer"
                >
                  <img
                    src={item.image || ""}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold tracking-wider uppercase">
                      {item.subCategory}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {renderSpiceBadge(item.spiceLevel)}
                      <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:text-black">
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5 space-y-1 z-10 text-white">
                    <h3 className="text-lg font-bold tracking-tight text-white leading-snug">{item.title}</h3>
                    <p className="text-[11px] text-neutral-300 line-clamp-2 font-normal leading-relaxed">{item.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* CTA GOMB */}
      <div className="mt-16 text-center z-10 relative">
        <Link
          href="/kfood"
          className="inline-flex items-center gap-3 px-9 py-4 bg-linear-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs md:text-sm tracking-wider uppercase rounded-full shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_15px_35px_rgba(234,88,12,0.45)] border border-orange-400/40 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <span>REZEPTE & K-FOOD RATGEBER ENTDECKEN</span>
          <span className="text-base text-orange-200 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">➔</span>
        </Link>
      </div>

    </section>
  );
}