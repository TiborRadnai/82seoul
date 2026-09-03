import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';

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

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
  currentCategory?: string;
}

export default function KBeautyRelatedProducts({ products = [], currentProductId, currentCategory }: RelatedProductsProps) {
  // 1. Először próbáljuk meg az azonos kategóriájúakat kiszűrni (kizárva az aktuális terméket)
  let related = products.filter(
    (p) => p._id !== currentProductId && currentCategory && p.category === currentCategory
  );

  // 2. Ha éppen nincs elég azonos kategóriájú termék, vegyünk barmilyen másikat, hogy ne maradjon üresen
  if (related.length === 0) {
    related = products.filter((p) => p._id !== currentProductId);
  }

  // Max 3 darabra vágjuk
  related = related.slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="w-full bg-[#eee8e2] text-slate-900 px-6 md:px-12 lg:px-20 py-24 border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-end justify-between mb-12 pb-6 border-b border-stone-300/60">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-rose-700 uppercase block mb-1">
              Das könnte dir auch gefallen
            </span>
            <h2 className="text-3xl font-light tracking-tight text-slate-950">
              Ähnliche Produkte.
            </h2>
          </div>
        </div>

        {/* Hasonló termékek 3 oszlopos rácsa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {related.map((product) => {
            const firstVariant = product.variants?.[0];
            const price = firstVariant?.onSale && firstVariant?.salePrice 
              ? firstVariant.salePrice 
              : firstVariant?.price || '0.00';

            return (
              <div key={product._id} className="flex flex-col justify-between group bg-[#f7f3ef] p-6 rounded-2xl border border-stone-200/80 shadow-xs">
                <Link
                  href={`/kbeauty/${product.slug || product._id}`}
                  className="relative w-full aspect-4/4 flex items-center justify-center overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-2 border border-stone-900/0 group-hover:border-stone-900/15 transition-all duration-500 pointer-events-none rounded-xl" />
                </Link>

                {/* Stabil, flex-shrinking mentes ár elrendezés */}
                <div className="mt-4 pt-3 border-t border-stone-200 flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-light text-slate-950 group-hover:text-rose-700 transition-colors line-clamp-1">
                      {product.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-light line-clamp-1 mt-0.5">
                      {product.tagline}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-900 pt-0.5 whitespace-nowrap shrink-0">
                    €{price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}