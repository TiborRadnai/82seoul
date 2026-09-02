'use client';

import React, { useState } from 'react';
import { Info, ShoppingBag, Check, Tag, MapPin } from 'lucide-react';

interface KFoodDetailContentProps {
  item: {
    title?: string;
    koreanTitle?: string; // <-- Koreai név támogatása
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
    <section className="relative w-full py-16 px-6 md:px-12 lg:px-20 bg-linear-to-b from-[#0a0a0c] via-[#16161a] to-[#f8f9fa] text-white min-h-125">
      
      <div className="w-full max-w-350 mx-auto space-y-12">

        {/* HA VAN KOREAI NÉV (Hangsúlyosabb megjelenítés) */}
        {item.koreanTitle && (
          <div className="text-center -mt-6">
            <span className="inline-block px-5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-amber-400 text-lg md:text-xl font-medium tracking-wide shadow-inner">
              {item.koreanTitle}
            </span>
          </div>
        )}

        {/* CSÍPŐSSÉGI JELÖLÉS (Ha ki van töltve) */}
        {item.spiceLevel && (
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 bg-[#141418]/90 border border-neutral-700/60 px-6 py-3 rounded-2xl shadow-xl">
              <span className="text-sm font-medium text-neutral-400 uppercase tracking-wider">Csípősségi szint:</span>
              <div className="flex items-center gap-1 text-base">
                {Array.from({ length: Number(item.spiceLevel) }).map((_, i) => (
                  <span key={i}>🌶️</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HA TERMÉK: ÁR ÉS BESZERZÉSI HELY KÁRTYÁK (Nagykereskedelmi zsargon nélkül) */}
        {isProduct && (item.price || item.storeLocation) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {item.price && (
              <div className="flex items-center gap-5 p-6 rounded-3xl bg-[#141418]/90 border border-neutral-700/60 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Tag className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Becsült ár / kiszerelés</span>
                  <div className="text-2xl font-bold text-white mt-0.5">{item.price}</div>
                </div>
              </div>
            )}

            {item.storeLocation && (
              <div className="flex items-center gap-5 p-6 rounded-3xl bg-[#141418]/90 border border-neutral-700/60 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Hol kapható</span>
                  <div className="text-base font-bold text-white mt-0.5">{item.storeLocation}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 1. HOZZÁVALÓK / BEVÁSÁRLÓLISTA (Receptekhez) */}
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="w-full max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-700/50 pb-4">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
                <span>Hozzávalók bevásárlólistája</span>
              </h2>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Kattints a pipáláshoz
              </span>
            </div>
            
            <div className="flex flex-col gap-2.5">
              {item.ingredients.map((ingredient, index) => {
                const isChecked = !!checkedIngredients[index];
                return (
                  <div
                    key={index}
                    onClick={() => toggleIngredient(index)}
                    className={`group flex items-center justify-between gap-4 px-6 py-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none shadow-lg ${
                      isChecked
                        ? 'bg-neutral-900/30 border-emerald-500/30 text-neutral-500 line-through'
                        : 'bg-[#141418]/90 border-neutral-700/60 text-neutral-200 hover:border-amber-500/40 hover:bg-[#18181d]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`w-2 h-2 rounded-full transition-colors ${isChecked ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                      <span className="text-sm md:text-base font-medium">{ingredient}</span>
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

        {/* 2. RÉSZLETES ELKÉSZÍTÉS LÉPÉSRŐL LÉPÉSRE (Receptekhez) */}
        {item.instructions && item.instructions.length > 0 && (
          <div className="space-y-6 pt-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-3 border-b border-neutral-700/50 pb-4">
              <span className="w-3 h-3 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50" />
              <span>Elkészítés lépésről lépésre</span>
            </h2>

            <div className="space-y-4">
              {item.instructions.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-5 p-6 rounded-3xl bg-[#141418]/90 border border-neutral-700/60 shadow-xl transition-all hover:border-neutral-600"
                >
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center font-bold text-base shrink-0 shadow-inner">
                    {index + 1}
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-neutral-200 text-base leading-relaxed font-normal">
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
          <div className={`p-8 md:p-10 rounded-3xl bg-[#141418]/90 border border-neutral-700/60 shadow-2xl space-y-6 ${isProduct ? 'max-w-4xl mx-auto' : ''}`}>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-amber-400 flex items-center gap-3 border-b border-neutral-700/40 pb-4">
              <Info className="w-6 h-6 text-amber-400" />
              <span>{isProduct ? 'Részletes Termékismertető & Kultúra' : 'Elkészítés'}</span>
            </h2>
            
            <div className="text-neutral-200 leading-relaxed text-base md:text-lg font-light space-y-4 whitespace-pre-line">
              {item.description}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}