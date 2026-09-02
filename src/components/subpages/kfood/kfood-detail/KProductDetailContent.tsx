'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Tag, Flame } from 'lucide-react';

interface KProductDetailContentProps {
  item: {
    title?: string;
    koreanTitle?: string;
    description?: string;
    location?: string;
    price?: string;
    spiceLevel?: '1' | '2' | '3';
    image?: string;
    subCategory?: string;
  };
}

export default function KProductDetailContent({ item }: KProductDetailContentProps) {
  const getSpiceText = (level?: '1' | '2' | '3') => {
    if (level === '1') return 'Enyhén csípős';
    if (level === '2') return 'Közepesen csípős';
    if (level === '3') return 'Extrém erős (Tüzes)';
    return null;
  };

  const spiceLabel = getSpiceText(item.spiceLevel);

  return (
    <section className="relative w-full pt-32 pb-24 px-6 md:px-12 lg:px-20 bg-linear-to-b from-[#0a0a0c] via-[#16161a] to-[#f8f9fa] text-white min-h-screen overflow-hidden">
      
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Vissza gomb */}
        <Link
          href={`/kfood?tab=products&category=${encodeURIComponent(item.subCategory || 'Minden')}`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Vissza a Bolti Termékekhez</span>
        </Link>

        {/* Aszimmetrikus rács */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Bal oldal: Fekvő kép */}
          {item.image && (
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
              <img
                src={item.image}
                alt={item.title || 'Termék'}
                className="w-full h-auto object-cover aspect-16/10"
              />
            </div>
          )}

          {/* Jobb oldal: Erősen sötétített, nagy fedésű háttér-pára a garantált olvashatóságért */}
          <div className={`${item.image ? 'lg:col-span-5' : 'lg:col-span-12 max-w-4xl mx-auto'} relative space-y-8 py-8 px-6 md:px-8`}>
            
            {/* Drasztikusan sötétebb és vastagabb réteg, ami teljesen blokkolja az oldal háttérátmenetét */}
            <div className="absolute inset-0 bg-neutral-950/90 mask-[radial-gradient(ellipse_at_center,black_65%,transparent_95%)] blur-2xl pointer-events-none -z-10" />

            {/* Fejléc rész */}
            <div className="space-y-3">
              {item.subCategory && (
                <span className="inline-block px-4 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold tracking-widest uppercase">
                  {item.subCategory}
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white leading-tight">
                {item.title}
              </h1>

              {item.koreanTitle && (
                <div className="text-amber-400/95 text-lg font-medium tracking-wide">
                  {item.koreanTitle}
                </div>
              )}
            </div>

            {/* Információs sáv */}
            <div className="flex flex-wrap gap-4 items-center pt-2">
              {item.price && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Ár</span>
                    <span className="text-base font-bold text-white">{item.price}</span>
                  </div>
                </div>
              )}

              {item.location && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Hol kapható</span>
                    <span className="text-sm font-bold text-white leading-snug">{item.location}</span>
                  </div>
                </div>
              )}

              {spiceLabel && (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Karakter</span>
                    <span className="text-sm font-bold text-rose-300">{spiceLabel}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Részletes leírás */}
            {item.description && (
              <div className="space-y-3 pt-4 border-t border-neutral-800/60">
                <h3 className="text-lg font-light tracking-tight text-white">
                  Részletes termékismertető
                </h3>
                <div className="text-neutral-100 leading-relaxed text-sm md:text-base font-light space-y-3 whitespace-pre-line">
                  {item.description}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}