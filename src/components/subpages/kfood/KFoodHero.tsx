'use client';

import React from 'react';
import Image from 'next/image';

export default function KFoodHero() {
  return (
    <section className="relative w-full pt-20 pb-16 px-6 md:px-12 lg:px-16 text-center overflow-hidden bg-[#0a0a0c] text-white border-b border-white/10">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-radial from-amber-500/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-6 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          K-Food & Gastronomie
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 uppercase">
          A Koreai Konyha <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-rose-500 to-amber-200">Művészete</span>
        </h1>

        <p className="text-neutral-300 text-base sm:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          A gőzölgő utcai ételektől a tradicionális fermentált fogásokig. Ízek, amelyek mögött évszázadok történetei és kultúrája rejlenek.
        </p>
      </div>
    </section>
  );
}