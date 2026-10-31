'use client';

import { Compass, ArrowDown } from "lucide-react";

export default function TravelHero() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center text-white overflow-hidden border-b border-neutral-800">
      
      {/* 1. HÁTTÉRKÉP (A helyi webp kép a public/images mappából) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/ktravel-bg.webp" 
          alt="Gyeongbokgung Palast in Südkorea"
          className="w-full h-full object-cover scale-105"
        />
        {/* Többrétegű sötétítő gradiens a tökéletes olvashatóságért és prémium hatásért */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-black/50" />
      </div>

      {/* 2. HÁTTÉR FÉNYEK (Finom égszínkék ragyogás a hangulathoz) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[140px] pointer-events-none z-1" />

      {/* 3. TARTALOM */}
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8 pt-20">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-950/70 backdrop-blur-md border border-sky-500/40 text-sky-300 text-xs font-bold tracking-widest uppercase shadow-lg">
          <Compass className="w-3.5 h-3.5 text-sky-400" />
          <span>82.SEOUL // K-TRAVEL MAGAZIN</span>
        </div>

        {/* Lehengerlő Főcím */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.1] drop-shadow-md">
          Wo Vergangenheit und Zukunft{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-200 to-indigo-200">
            Hand in Hand gehen.
          </span>
        </h1>

        {/* Magával ragadó leírás */}
        <p className="text-slate-200 text-base md:text-xl font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
          Tauche ein in die faszinierendsten Landschaften Südkoreas. Metropolen, die niemals schlafen, und Traditionen, die seit Jahrhunderten den Frieden bewahren.
        </p>

        {/* Gyors navigációs gombok / kategória tagek a Heroban */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm">
          <a href="#city" className="px-4 py-2 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/80 text-white hover:border-sky-400 transition-all shadow-md">
            🏙️ Metropolen & City Life
          </a>
          <a href="#culture" className="px-4 py-2 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/80 text-white hover:border-sky-400 transition-all shadow-md">
            🏛️ Kultur & Tradition
          </a>
          <a href="#nature" className="px-4 py-2 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/80 text-white hover:border-sky-400 transition-all shadow-md">
            🌿 Natur & Jeju
          </a>
          <a href="#guide" className="px-4 py-2 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/80 text-white hover:border-sky-400 transition-all shadow-md">
            ✈️ Travel Guide
          </a>
        </div>

      </div>

      {/* Lefelé mutató finom ösztönzés */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce text-sky-400/80">
        <ArrowDown className="w-5 h-5" />
      </div>

    </section>
  );
}