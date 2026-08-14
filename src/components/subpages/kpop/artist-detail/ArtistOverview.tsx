'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface ArtistOverviewProps {
  artistName: string;
  tagline: string;
  description: string;
  extendedHistory?: string;
  fandom?: string;
  agency: string;
  imageUrl?: string;
  themeColor?: string; // <-- Új prop a dinamikus egyedi színhez (pl. "#991b1b")
}

export default function ArtistOverview({ 
  artistName, 
  tagline, 
  description, 
  extendedHistory, 
  fandom, 
  agency,
  imageUrl,
  themeColor = '#ec4899' // Alapértelmezett szín, ha esetleg hiányozna
}: ArtistOverviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const totalScroll = scrollHeight - clientHeight;
      const currentProgress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);
    }
  };

  return (
    <section className="w-full py-16 sm:py-28 px-4 sm:px-8 lg:px-16 text-left relative overflow-hidden bg-[#07070a]">
      
      {/* 1. Finom, világító elválasztó fénycsík a szekció tetején (Dinamikus színnel) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${themeColor}, transparent)`,
          boxShadow: `0 0 20px ${themeColor}`
        }}
      />

      {/* 2. Dinamikus LED háttérfény a blokk mögött */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-125 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: themeColor }}
      />
      <div className="absolute top-1/4 right-10 w-100 h-100 bg-purple-600/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        
        {/* Felső információs sáv */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span 
              className="w-3 h-3 rounded-full shadow-[0_0_12px]" 
              style={{ backgroundColor: themeColor, boxShadow: `0 0 12px ${themeColor}` }}
            />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold" style={{ color: themeColor }}>
              Portré & Háttértörténet // {artistName}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {fandom && (
              <span className="px-3 sm:px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] sm:text-xs font-bold text-zinc-300 tracking-wider uppercase">
                Fandom: <span style={{ color: themeColor }}>{fandom}</span>
              </span>
            )}
            <span 
              className="px-3 sm:px-4 py-1.5 rounded-xl border text-[11px] sm:text-xs font-bold tracking-wider uppercase"
              style={{ 
                backgroundColor: `${themeColor}15`, 
                borderColor: `${themeColor}40`, 
                color: themeColor 
              }}
            >
              {agency}
            </span>
          </div>
        </div>

        {/* Fő szlogen */}
        <div className="mb-10 sm:mb-14">
          <h3 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.1)]">
            &ldquo;{tagline}&rdquo;
          </h3>
        </div>

        {/* Fő elrendezés */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Bal oldal: Folytonos szöveg + Állapotjelzős görgető */}
          <div className="lg:col-span-7 flex flex-col order-2 lg:order-1">
            
            <div className="mb-6">
              <p 
                className="text-white text-base sm:text-xl font-medium leading-relaxed pl-4 py-1 border-l-4"
                style={{ 
                  borderColor: themeColor,
                  backgroundImage: `linear-gradient(to right, ${themeColor}15, transparent)`
                }}
              >
                {description}
              </p>
            </div>

            {/* Görgethető tartalom konténer */}
            <div className="relative">
              
              {/* Dinamikus állapotjelző sáv (csak desktopon) */}
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                <div 
                  className="w-full transition-all duration-150"
                  style={{ 
                    height: `${scrollProgress}%`,
                    backgroundColor: themeColor,
                    boxShadow: `0 0 10px ${themeColor}`
                  }}
                />
              </div>

              {/* Görgethető doboz */}
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="max-h-96 sm:max-h-130 overflow-y-auto pr-4 space-y-6 text-zinc-300 text-sm sm:text-lg leading-relaxed font-light custom-scrollbar rounded-xl sm:rounded-2xl p-4 bg-[#111116]/80 border border-white/10 backdrop-blur-md shadow-2xl"
              >
                {extendedHistory ? (
                  <div className="space-y-6 text-zinc-300 font-normal leading-relaxed whitespace-pre-line">
                    {extendedHistory}
                  </div>
                ) : (
                  <p className="text-zinc-500 italic">A részletes történet hamarosan feltöltésre kerül...</p>
                )}
              </div>

            </div>

          </div>

          {/* Jobb oldal: Kép (Mobilon korrigált magasság és lekerekítés) */}
          <div className="lg:col-span-5 lg:top-8 order-1 lg:order-2">
            <div 
              className="relative h-80 sm:h-137.5 lg:h-155 w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl group"
              style={{ boxShadow: `0 0 50px rgba(0,0,0,0.8), 0 0 25px ${themeColor}25` }}
            >
              {imageUrl ? (
                <Image 
                  src={imageUrl} 
                  alt={`${artistName} portrait`} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-500 text-sm tracking-widest uppercase">
                  [ Kép Helye ]
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-[#07070a] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </div>

        </div>

      </div>

      {/* 3. Finom világító elválasztó fénycsík a szekció alján is */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${themeColor}, transparent)`,
          boxShadow: `0 0 20px ${themeColor}`
        }}
      />

    </section>
  );
}