'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';

interface KFoodDetailHeroProps {
  item: {
    title: string;
    koreanTitle?: string;
    subCategory: string;
    tagline: string;
    prepTime?: string;
    servings?: string;
    difficulty?: string;
    image: string;
  };
}

export default function KFoodDetailHero({ item }: KFoodDetailHeroProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push('/kfood');
    }
  };

  return (
    <section className="relative w-full pt-32 pb-16 px-6 md:px-12 lg:px-16 overflow-hidden bg-neutral-950 text-white border-b border-neutral-800/80">
      
      {/* Háttér kép finom elmosással és sötétítéssel */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-25 scale-105 blur-xs"
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-950" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        
        {/* Intelligens Vissza gomb a receptekhez is */}
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer bg-transparent border-none p-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Vissza a katalógushoz</span>
        </button>

        {/* Alkategória badge */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-bold tracking-widest uppercase shadow-md">
            {item.subCategory}
          </span>
          {item.koreanTitle && (
            <span className="text-neutral-400 font-light text-sm tracking-wide">
              {item.koreanTitle}
            </span>
          )}
        </div>

        {/* Cím és tagline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
            {item.title}
          </h1>
          <p className="text-neutral-300 text-base md:text-xl font-normal max-w-3xl leading-relaxed">
            {item.tagline}
          </p>
        </div>

        {/* Meta adatok sávja (Idő, adagok, nehézség) */}
        <div className="flex flex-wrap items-center gap-4 pt-4 text-xs md:text-sm font-medium text-neutral-300">
          {item.prepTime && (
            <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 px-4 py-2 rounded-full shadow-xs">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Elkészítés: {item.prepTime}</span>
            </div>
          )}

          {item.servings && (
            <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 px-4 py-2 rounded-full shadow-xs">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Adag: {item.servings}</span>
            </div>
          )}

          {item.difficulty && (
            <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 px-4 py-2 rounded-full shadow-xs">
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>Szint: {item.difficulty}</span>
            </div>
          )}
        </div>

        {/* Fő kép nagy kiemelése */}
        <div className="pt-6">
          <div className="w-full h-87.5 sm:h-125 rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}