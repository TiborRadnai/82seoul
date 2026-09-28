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

// Kategóriák leképezése német feliratokra
const CATEGORY_MAP: Record<string, string> = {
  'Minden': 'Alle',
  'Főételek': 'Hauptgerichte',
  'Levesek & Egytálételek': 'Suppen & Eintöpfe',
  'Street Food': 'Street Food',
  'Desszertek & Sütemények': 'Desserts & Gebäck',
  'Italok & Soju': 'Getränke & Erfrischungen',
  'Italok & Frissítők': 'Getränke & Erfrischungen',
  'Nassolnivalók & Snackek': 'Snacks & Knabbereien',
  'Alapanyagok': 'Zutaten & Grundnahrungsmittel',
  'Szószok, Fűszerek & Tészták': 'Würzsaucen, Gewürze & Nudeln',
  'Édességek & Desszertek': 'Süßwaren & Desserts',
};

const formatCategory = (cat?: string) => {
  if (!cat) return 'Sonstiges';
  return CATEGORY_MAP[cat] || cat;
};

export default function KProductDetailContent({ item }: KProductDetailContentProps) {
  const getSpiceText = (level?: '1' | '2' | '3') => {
    if (level === '1') return 'Mild würzig';
    if (level === '2') return 'Mittelscharf';
    if (level === '3') return 'Extrem scharf (Feurig)';
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
          <span>Zurück zu Supermarkt-Produkten</span>
        </Link>

        {/* Aszimmetrikus rács */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Bal oldal: Fekvő kép */}
          {item.image && (
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 sticky top-32">
              <img
                src={item.image}
                alt={item.title || 'Produkt'}
                className="w-full h-auto object-cover aspect-16/10"
              />
            </div>
          )}

          {/* Jobb oldal: Az eredeti lebegő, pára-hátterű egyedi megoldás kibővített területtel */}
          <div className={`${item.image ? 'lg:col-span-5' : 'lg:col-span-12 max-w-4xl mx-auto'} relative space-y-8 pt-6 pb-16 px-6 md:px-8`}>
            
            {/* Finomított, lejjebb nyúló sötétítő pára-háttér, ami nem vágja el a szöveg alját */}
            <div className="absolute -inset-x-4 -inset-y-6 bg-neutral-950/95 mask-[radial-gradient(ellipse_at_center,black_75%,transparent_100%)] blur-2xl pointer-events-none -z-10" />

            {/* Fejléc rész */}
            <div className="space-y-3">
              {item.subCategory && (
                <span className="inline-block px-4 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-amber-400 text-xs font-bold tracking-widest uppercase">
                  {formatCategory(item.subCategory)}
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-white leading-tight drop-shadow-md">
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
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Preis</span>
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
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Erhältlich bei</span>
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
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Schärfegrad</span>
                    <span className="text-sm font-bold text-rose-300">{spiceLabel}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Részletes leírás tiszta kontraszttal és elegendő alsó helyiértékkel */}
            {item.description && (
              <div className="space-y-3 pt-6 border-t border-neutral-800/60">
                <h3 className="text-lg font-light tracking-tight text-white">
                  Detaillierte Produktbeschreibung
                </h3>
                <div className="text-neutral-200 leading-relaxed text-sm md:text-base font-normal space-y-3 whitespace-pre-line drop-shadow-sm pb-4">
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