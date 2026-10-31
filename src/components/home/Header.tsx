'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface TopArtist {
  _id?: string;
  title?: string;
  name?: string;
  artistName?: string;
  groupName?: string;
  rank?: number;
  description?: string;
  image: string;
  slug?: any;
  [key: string]: any;
}

interface HeaderProps {
  topArtists: TopArtist[];
}

export default function Header({ topArtists = [] }: HeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // 1. ELŐSZÖR DEFINIÁLJUK A CURRENT ARTIST-ET, HOGY MINDENFÉLEKÉPPEN LÉTEZZEN
  const currentArtist = topArtists[currentIndex] || {
    title: "Wird geladen...",
    rank: 1,
    image: "",
    slug: "#",
  };

  // 2. BIZTONSÁGOS SLUG KINYERÉS (kezelve a Sanity objektum és string formátumot is)
  const getArtistSlug = (slugField: any) => {
    if (!slugField) return null;
    if (typeof slugField === 'string') return slugField;
    if (typeof slugField === 'object' && slugField.current) return slugField.current;
    return null;
  };

  const artistId = currentArtist.id || "#";
  const artistProfileUrl = artistId !== "#" ? `/kpop/${artistId}` : `/kpop`;

  const artistName = currentArtist.title || currentArtist.name || currentArtist.artistName || currentArtist.groupName || "K-Pop Artist";

  // Időzítő a kiemelt előadók forgatására (8 másodperces, elegáns tempó)
  useEffect(() => {
    if (topArtists.length <= 1) return;

    const interval = setInterval(() => {
      setIsFading(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topArtists.length);
        setIsFading(false);
      }, 700);

    }, 8000);

    return () => clearInterval(interval);
  }, [topArtists.length]);

  const scrollToKDrama = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("kdrama");
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    
    const duration = 1200; 
    let startTime: number | null = null;

    const easeOutCubic = (t: number) => (--t) * t * t + 1;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    <header className="relative w-full h-screen overflow-hidden bg-neutral-950 font-sans">
      
      {/* 1. HÁTTÉRKÉP */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/main-page-hero-bg.webp')`,
        }}
      />

      {/* 2. SÖTÉTÍTÉS */}
      <div className="absolute inset-0 bg-linear-to-r from-neutral-950/80 via-neutral-950/30 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-linear-to-b from-neutral-950/60 via-transparent to-neutral-950/90 pointer-events-none z-0" />

      {/* Hero Tartalom Tartó */}
      <div className="relative z-10 max-w-[1600px] mx-auto h-full px-5 md:px-12 flex flex-col justify-between pt-20 md:pt-28 pb-5 md:pb-10">
        
        {/* FELSŐ RÉSZ */}
        <div className="space-y-3 md:space-y-5 max-w-2xl text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start">
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            Entdecke die wahre <br />
            Strahlkraft Koreas.
          </h1>

          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/70 backdrop-blur-xl border border-white/20 text-white shadow-2xl transition-transform hover:scale-105 duration-300">
            <span className="text-base md:text-lg font-black text-amber-300 tracking-widest drop-shadow">서울</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-white uppercase drop-shadow-sm">
              82.SEOUL • ORIGINAL K-CULTURE
            </span>
          </div>

        </div>

        {/* ALSÓ RÉSZ */}
        <div className="space-y-4 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            
            {/* BAL OLDAL: Karcsúsított szöveges kártya az animált nyíllal */}
            <div className="hidden lg:block lg:col-span-4 bg-black/35 hover:bg-black/45 backdrop-blur-2xl p-6 rounded-3xl space-y-4 text-white shadow-2xl border border-white/25 hover:border-amber-400/40 transition-all duration-300 text-center">
              
              <style jsx>{`
                @keyframes smoothFloatClean {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(8px); }
                }
                .animate-smooth-float-clean {
                  animation: smoothFloatClean 3s ease-in-out infinite;
                }
              `}</style>

              <h3 className="text-xs font-bold tracking-widest uppercase text-white leading-snug drop-shadow-sm">
                DEIN TOR ZUR KOREANISCHEN KULTUR.
              </h3>
              <p className="text-[11px] text-slate-200 tracking-wide leading-relaxed font-light uppercase drop-shadow-sm">
                ERLEBE K-POP, K-DRAMA & DIE FASZINATION KOREAS.
              </p>

              <div className="pt-2 flex flex-col items-center justify-center space-y-3">
                <a 
                  href="#kdrama" 
                  onClick={scrollToKDrama}
                  className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-300 hover:text-white transition-colors duration-300 cursor-pointer drop-shadow-sm"
                >
                  Jetzt entdecken
                </a>
                
                <div className="animate-smooth-float-clean">
                  <a
                    href="#kdrama"
                    onClick={scrollToKDrama}
                    className="flex items-center justify-center text-white/80 hover:text-amber-300 transition-colors duration-300 cursor-pointer p-1"
                    title="Jetzt entdecken"
                  >
                    <svg className="w-5 h-5 stroke-2 transition-transform duration-300 hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* KÖZÉPSŐ TÉR */}
            <div className="hidden lg:block lg:col-span-3" />

            {/* JOBB OLDAL: K-Pop Top 3 Forgó Kártya */}
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className={`relative bg-black/40 backdrop-blur-xl p-5 md:p-6 rounded-3xl flex items-center gap-5 w-full sm:max-w-md shadow-2xl border border-white/20 transition-all duration-700 ease-in-out ${isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
                
                {/* #1 / #2 / #3 Jelvény a kártya jobb felső sarkában */}
                <span className="absolute top-4 right-4 bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full z-20 shadow-lg tracking-wider">
                  #{currentArtist.rank || (currentIndex + 1)}
                </span>

                {/* Előadó kép */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-slate-900 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center border border-white/10 shadow-md">
                  {currentArtist.image && (
                    <img
                      src={currentArtist.image}
                      alt="Artist"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

              {/* Előadó adatok: Melon Top 10 jelöléssel és névvel */}
                <div className="space-y-2 text-white flex-1 min-w-0 pr-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-amber-300 font-extrabold block mb-0.5 drop-shadow-sm">
                      Melon Top 10 Chart
                    </span>
                    <h4 className="text-base sm:text-xl font-extrabold tracking-tight truncate drop-shadow">
                      {artistName}
                    </h4>
                  </div>
                  <div className="pt-2">
                    <Link
                      href={currentArtist.id ? `/kpop/${currentArtist.id}` : `/kpop`}
                      className="inline-block px-4 py-2 bg-slate-100 hover:bg-white text-slate-900 rounded-full font-bold text-[10px] sm:text-xs tracking-wider uppercase transition-colors duration-300 shadow-md cursor-pointer text-center"
                    >
                      ZUM PROFIL →
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* BAL ALSÓ MINŐSÉGI GARANCIA */}
          <div className="flex flex-col gap-0.5 text-white pt-1">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-xs">★ ★ ★ ★ ★</span>
              <span className="text-[10px] md:text-[11px] font-semibold text-slate-100 drop-shadow">100% Premium Quality</span>
            </div>
            <span className="text-[8px] md:text-[10px] tracking-widest uppercase text-slate-200 font-medium drop-shadow-sm">
              Authentische Koreanische Kultur & Lifestyle
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}