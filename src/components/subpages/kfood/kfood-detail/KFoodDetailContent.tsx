'use client';

import React, { useState } from 'react';
import { Info, ShoppingBag, Check, Tag, MapPin } from 'lucide-react';

interface KFoodDetailContentProps {
  item: {
    title?: string;
    koreanTitle?: string;
    description?: string;
    ingredients?: string[];
    instructions?: string[];
    storeLocation?: string;
    price?: string;
    type?: 'recipe' | 'product';
    spiceLevel?: '1' | '2' | '3';
  };
}

export default function KFoodDetailContent({ item }: KFoodDetailContentProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<{ [key: number]: boolean }>({});

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isProduct = item.type === 'product';

  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-linear-to-b from-[#0a0a0c] via-[#16161a] to-[#f8f9fa] text-white min-h-125">
      
      <div className="w-full max-w-300 mx-auto space-y-10 sm:space-y-12">

        {/* HA VAN KOREAI NÉV */}
        {item.koreanTitle && (
          <div className="text-center -mt-4 sm:-mt-6">
            <span className="inline-block px-4 sm:px-5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-amber-400 text-base sm:text-lg md:text-xl font-medium tracking-wide shadow-inner">
              {item.koreanTitle}
            </span>
          </div>
        )}

        {/* CSÍPŐSSÉGI JELÖLÉS */}
        {item.spiceLevel && (
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 bg-[#141418]/90 border border-neutral-700/60 px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl shadow-xl">
              <span className="text-xs sm:text-sm font-medium text-neutral-400 uppercase tracking-wider">Schärfegrad:</span>
              <div className="flex items-center gap-1 text-base">
                {Array.from({ length: Number(item.spiceLevel) }).map((_, i) => (
                  <span key={i}>🌶️</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HA TERMÉK: ÁR ÉS BESZERZÉSI HELY KÁRTYÁK */}
        {isProduct && (item.price || item.storeLocation) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {item.price && (
              <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#141418]/90 border border-neutral-700/60 shadow-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Tag className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs text-neutral-400 uppercase tracking-wider font-semibold">Geschätzter Preis / Verpackung</span>
                  <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">{item.price}</div>
                </div>
              </div>
            )}

            {item.storeLocation && (
              <div className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#141418]/90 border border-neutral-700/60 shadow-xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs text-neutral-400 uppercase tracking-wider font-semibold">Erhältlich bei</span>
                  <div className="text-sm sm:text-base font-bold text-white mt-0.5">{item.storeLocation}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 1. HOZZÁVALÓK / BEVÁSÁRLÓLISTA */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="w-full max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-700/50 pb-4">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50 shrink-0" />
                <span>Einkaufsliste für Zutaten</span>
              </h2>
              <span className="text-[11px] sm:text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Zum Abhaken anklicken
              </span>
            </div>
            
            <div className="flex flex-col gap-2.5">
              {item.ingredients.map((ingredient, index) => {
                const isChecked = !!checkedIngredients[index];
                return (
                  <div
                    key={index}
                    onClick={() => toggleIngredient(index)}
                    className={`group flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer select-none shadow-lg ${
                      isChecked
                        ? 'bg-neutral-900/30 border-emerald-500/30 text-neutral-500 line-through'
                        : 'bg-[#141418]/90 border-neutral-700/60 text-neutral-200 hover:border-amber-500/40 hover:bg-[#18181d]'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-3.5">
                      <span className={`w-2 h-2 rounded-full transition-colors shrink-0 ${isChecked ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                      <span className="text-xs sm:text-sm md:text-base font-medium">{ingredient}</span>
                    </div>

                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                      isChecked
                        ? 'bg-emerald-500 border-emerald-400 text-black shadow-sm'
                        : 'border-neutral-600 bg-neutral-800 text-transparent'
                    }`}>
                      <Check className="w-3 h-3 stroke-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. RÉSZLETES ELKÉSZÍTÉS LÉPÉSRŐL LÉPÉSRE */}
        {item.instructions && item.instructions.length > 0 && (
          <div className="space-y-4 sm:space-y-6 pt-2 sm:pt-4 max-w-3xl mx-auto w-full">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3 border-b border-neutral-700/50 pb-4">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50 shrink-0" />
              <span>Schritt-für-Schritt-Zubereitung</span>
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {item.instructions.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 sm:gap-5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#141418]/90 border border-neutral-700/60 shadow-xl transition-all hover:border-neutral-600"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center font-bold text-sm sm:text-base shrink-0 shadow-inner">
                    {index + 1}
                  </div>
                  <div className="space-y-1 pt-0.5 sm:pt-1 flex-1">
                    <p className="text-neutral-200 text-sm sm:text-base leading-relaxed font-normal text-justify md:text-left hyphens-auto">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. A RECEPTRŐL / TERMÉKLEÍRÁS */}
        {item.description && (
          <div className={`p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-[#141418]/90 border border-neutral-700/60 shadow-2xl space-y-4 sm:space-y-6 max-w-3xl mx-auto w-full ${isProduct ? 'max-w-4xl' : ''}`}>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-amber-400 flex items-center gap-3 border-b border-neutral-700/40 pb-4">
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 shrink-0" />
              <span>{isProduct ? 'Detaillierte Produktbeschreibung & Kultur' : 'Über das Rezept'}</span>
            </h2>
            
            <div className="text-neutral-200 leading-relaxed text-sm sm:text-base md:text-lg font-light space-y-4 whitespace-pre-line text-justify md:text-left hyphens-auto">
              {item.description}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}