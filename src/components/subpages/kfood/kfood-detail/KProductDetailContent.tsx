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
  'Italok': 'Getränke & Erfrischungen',
  'Italok & Frissítők': 'Getränke & Erfrischungen',
  'Nassolnivalók & Snackek': 'Snacks & Knabbereien',
  'Alapanyagok': 'Zutaten & Grundnahrungsmittel',
  'Würzsaucen, Gewürze & Nudeln': 'Ramen & Instant-Gerichte',
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
    <section className="relative w-full pt-32 pb-24 px-6 md:px-12 lg:px-20 bg-linear-to-b from-[#0a0a0c] via-[#16161a] to-[#0a0a0c] text-white min-h-screen overflow-hidden">
      
      {/* Háttér hangulatfény */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Vissza gomb */}
        <Link
          href={`/kfood?tab=products&category=${encodeURIComponent(item.subCategory || 'Minden')}`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Zurück zu Supermarkt-Produkten</span>
        </Link>

        {/* Aszimmetrikus, prémium rács */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Bal oldal: Prémium galéria-keret finom átmenetes háttérrel */}
          {item.image && (
            <div className="lg:col-span-6 relative group">
              {/* Finom háttér ragyogás a kép mögött */}
              <div className="absolute -inset-1 bg-linear-to-r from-amber-500/20 to-orange-500/0 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500 pointer-events-none" />
              
              <div className="relative rounded-3xl overflow-hidden border border-neutral-800/80 bg-linear-to-b from-neutral-900/90 via-neutral-900/60 to-neutral-950/90 backdrop-blur-xl shadow-2xl p-8 flex items-center justify-center min-h-[420px] lg:min-h-[500px]">
                <img
                  src={item.image}
                  alt={item.title || 'Produkt'}
                  className="w-full h-auto max-h-[460px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          )}

          {/* Jobb oldal: Információk és leírás */}
          <div className={`${item.image ? 'lg:col-span-6' : 'lg:col-span-12 max-w-4xl mx-auto'} space-y-8`}>
            
            {/* Fejléc rész */}
            <div className="space-y-3">
              {item.subCategory && (
                <span className="inline-block px-4 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-amber-400 text-xs font-bold tracking-widest uppercase shadow-inner">
                  {formatCategory(item.subCategory)}
                </span>
              )}

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                {item.title}
              </h1>

              {item.koreanTitle && (
                <div className="text-amber-400/90 text-xl font-medium tracking-wide">
                  {item.koreanTitle}
                </div>
              )}
            </div>

            {/* Információs kártyák sávja */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {item.price && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Preis</span>
                    <span className="text-base font-bold text-white">{item.price}</span>
                  </div>
                </div>
              )}

              {item.location && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Erhältlich bei</span>
                    <span className="text-sm font-bold text-white leading-snug">{item.location}</span>
                  </div>
                </div>
              )}

              {spiceLabel && (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm sm:col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Schärfegrad</span>
                    <span className="text-sm font-bold text-rose-300">{spiceLabel}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Részletes leírás */}
            {item.description && (
              <div className="space-y-3 pt-6 border-t border-neutral-800/80">
                <h3 className="text-sm font-bold tracking-widest text-neutral-400 uppercase">
                  Detaillierte Produktbeschreibung
                </h3>
                <div className="text-neutral-300 leading-relaxed text-base font-normal space-y-3 whitespace-pre-line">
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