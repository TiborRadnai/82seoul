'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Eye } from 'lucide-react';

interface Variant {
  size: string;
  price: string;
  onSale?: boolean;
  salePrice?: string;
}

interface Product {
  _id: string;
  title: string;
  slug: string;
  image: string;
  badge?: string;
  tagline?: string;
  variants: Variant[];
  category?: string;
}

interface KBeautyCatalogProps {
  products: Product[];
}

export default function KBeautyCatalog({ products = [] }: KBeautyCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter((p) => p.category === activeCategory);

  const getItemId = (product: Product) => {
    return product.slug || product._id;
  };

  return (
    <section id="catalog" className="w-full min-h-screen bg-[#f7f3ef] text-slate-900 px-6 md:px-12 lg:px-20 py-16 border-t border-stone-200/60">
      
      {/* Szekció fejléc és kategória-választó */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-stone-300/60 gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-widest text-rose-700 uppercase block mb-1.5">
            Handverlesene Auswahl
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-950">
            Die Kollektion.
          </h2>
        </div>

        {/* Minimalista szöveges kategória-sáv */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-light">
          {categories.map((cat) => {
            const categoryName = cat || 'All';
            return (
              <button
                key={categoryName}
                onClick={() => setActiveCategory(categoryName)}
                className={`relative pb-1 transition-colors cursor-pointer uppercase tracking-wider font-medium ${
                  activeCategory === categoryName 
                    ? 'text-slate-950 font-bold' 
                    : 'text-stone-500 hover:text-slate-900'
                }`}
              >
                {categoryName}
                {activeCategory === categoryName && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-rose-700" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Kompakt, átlátható 3 oszlopos rács */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
        {filteredProducts.map((product) => {
          const firstVariant = product.variants?.[0];
          const displayPrice = firstVariant?.onSale && firstVariant?.salePrice 
            ? firstVariant.salePrice 
            : firstVariant?.price || '0.00';

          return (
            <div key={product._id} className="flex flex-col group">
              
              {/* Kép konténer - Kattintásra a saját termékoldalra visz */}
              <Link
                href={`/kbeauty/${getItemId(product)}`}
                className="relative w-full aspect-4/4 flex items-center justify-center overflow-hidden cursor-pointer bg-transparent"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hajszálvékony ghost keret hoverre */}
                <div className="absolute inset-3 border border-stone-900/0 group-hover:border-stone-900/15 transition-all duration-500 pointer-events-none" />

                {/* Hover sáv: most már kosár helyett "Részletek megtekintése" finom jelzéssel */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-[#f7f3ef]/95 via-[#f7f3ef]/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-rose-700 uppercase block mb-0.5">
                      {product.badge || product.category || 'K-Beauty'}
                    </span>
                    <h3 className="text-sm font-normal text-slate-950 tracking-wide line-clamp-1">
                      {product.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 text-white text-[10px] tracking-wider uppercase shadow-md">
                    <span>Details</span>
                    <Eye className="w-3 h-3 text-rose-300" />
                  </div>
                </div>
              </Link>

              {/* Stabil, kompakt tipográfia a kép alatt */}
              <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex items-start justify-between px-1">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold tracking-widest text-rose-700 uppercase block">
                    {product.badge || product.category || 'K-Beauty'}
                  </span>
                  <h4 className="text-sm font-light text-slate-950 group-hover:text-rose-700 transition-colors line-clamp-1">
                    {product.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-light line-clamp-1">
                    {product.tagline}
                  </p>
                </div>
                <span className="text-xs font-mono font-medium text-slate-900 pt-0.5">
                  €{displayPrice}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Diszkrét márkamegszakítás */}
      <div className="mt-24 py-12 border-y border-stone-300/60 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-rose-200/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-xl mx-auto px-6 relative z-10 space-y-2.5">
          <Sparkles className="w-4 h-4 text-rose-600 mx-auto" />
          <p className="text-lg md:text-xl font-light text-slate-950 leading-relaxed tracking-wide">
            „Reinheit, botanische Perfektion und modernste Wirkstoffformeln direkt aus den Laboren von Seoul.“
          </p>
          <span className="text-[9px] font-bold tracking-widest text-stone-500 uppercase block pt-1">
            82.SEOUL PHILOSOPHIE
          </span>
        </div>
      </div>

    </section>
  );
}