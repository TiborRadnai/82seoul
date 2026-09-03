'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface FeaturedProduct {
  title: string;
  price: string;
  description: string;
  image: string;
  link: string;
}

interface HeaderProps {
  featuredProducts: FeaturedProduct[];
}

export default function Header({ featuredProducts = [] }: HeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Időzítő a kiemelt termékek forgatására (minden 5. másodpercben)
  useEffect(() => {
    if (featuredProducts.length <= 1) return;

    const interval = setInterval(() => {
      setIsFading(true); // Indítjuk a lágy elhalványulást
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
        setIsFading(false); // Visszahozzuk a fényt az új termékkel
      }, 700);

    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const currentProduct = featuredProducts[currentIndex] || {
    title: "Wird geladen...",
    price: "",
    description: "Bitte gedulde dich...",
    image: "",
    link: "#",
  };

  // Vajpuha, lassított, elegáns görgetés animáció
  const scrollToKBeauty = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("kbeauty");
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
    <header className="relative w-full h-screen overflow-hidden bg-slate-950 font-sans">
      {/* Háttérkép (Jung So-Min) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/somin-bg.webp')`,
        }}
      />

      {/* Hero Tartalom Tartó */}
      <div className="relative z-10 max-w-[1600px] mx-auto h-full px-5 md:px-12 flex flex-col justify-between pt-20 md:pt-28 pb-5 md:pb-10">
        
        {/* FELSŐ RÉSZ: Badge + Főcím + Márka Stempel */}
        <div className="space-y-3 md:space-y-5 max-w-2xl text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start">
          
        {/* FŐCÍM - Két soros, impozáns megjelenés */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white leading-tight drop-shadow-xl">
            Entdecke die wahre <br />
            Strahlkraft Koreas.
          </h1>

          {/* AUTENTIKUS K-BEAUTY STEMPEL */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white shadow-2xl transition-transform hover:scale-105 duration-300">
            <span className="text-base md:text-lg font-black text-amber-300 tracking-widest drop-shadow">서울</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-white uppercase drop-shadow-sm">
              82.SEOUL • ORIGINAL K-BEAUTY
            </span>
          </div>

        </div>

        {/* ALSÓ RÉSZ: Kártyák & Garancia */}
        <div className="space-y-4 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            
            {/* BAL OLDAL: Karcsúsított szöveges kártya (col-span-4) - Tömörebb, elegánsabb német szöveg */}
            <div className="hidden lg:block lg:col-span-4 bg-black/45 backdrop-blur-xl p-6 rounded-3xl space-y-4 text-white shadow-2xl border border-white/10 text-center">
              
              <style jsx>{`
                @keyframes smoothFloatInside {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(6px); }
                }
                .animate-smooth-float-inside {
                  animation: smoothFloatInside 2.5s ease-in-out infinite;
                }
              `}</style>

              <h3 className="text-xs font-bold tracking-widest uppercase text-slate-100 leading-snug">
                MEHR ALS NUR EIN WEBSHOP – DEIN TOR ZU KOREA.
              </h3>
              <p className="text-[11px] text-slate-200 tracking-wide leading-relaxed font-light uppercase">
                ERLEBE K-BEAUTY & DIE ELEGANZ DER KOREANISCHEN KULTUR.
              </p>

              {/* Középre igazított szöveg és lebegő nyíl */}
              <div className="pt-2 flex flex-col items-center justify-center space-y-2">
                <a 
                  href="#kbeauty" 
                  onClick={scrollToKBeauty}
                  className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/90 hover:text-white transition-colors cursor-pointer"
                >
                  Jetzt entdecken
                </a>
                
                <div className="animate-smooth-float-inside">
                  <a
                    href="#kbeauty"
                    onClick={scrollToKBeauty}
                    className="w-10 h-10 rounded-full bg-slate-900/95 hover:bg-slate-900 border-2 border-white/40 backdrop-blur-md flex items-center justify-center shadow-xl transition-transform hover:scale-110 group cursor-pointer"
                    title="Jetzt entdecken"
                  >
                    <svg className="w-4 h-4 text-amber-300 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* KÖZÉPSŐ TÉR */}
            <div className="hidden lg:block lg:col-span-3" />

            {/* JOBB OLDAL: Kiemelt, hangsúlyosabb termékkártya (col-span-5) */}
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className={`bg-black/50 backdrop-blur-2xl p-4 md:p-5 rounded-3xl flex items-center gap-4 w-full sm:max-w-lg shadow-2xl border border-white/20 transition-all duration-700 ease-in-out ${isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
                
                {/* Termékkép */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-slate-100/90 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center p-2">
                  {currentProduct.price && (
                    <span className="absolute top-1 left-1 bg-slate-900 text-white text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md z-10 shadow">
                      {currentProduct.price}
                    </span>
                  )}
                  {currentProduct.image && (
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.title}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>

                {/* Termékinfók */}
                <div className="space-y-1.5 text-white flex-1 min-w-0">
                  <h4 className="text-sm sm:text-lg font-bold tracking-tight truncate">{currentProduct.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-snug font-light">
                    {currentProduct.description}
                  </p>
                  <div className="pt-1">
                    <Link
                      href={currentProduct.link}
                      className="inline-block px-4 py-1.5 bg-slate-100 hover:bg-white text-slate-900 rounded-full font-bold text-[10px] sm:text-xs tracking-wider uppercase transition-all shadow"
                    >
                      DETAILS
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BAL ALSÓ MINŐSÉGI GARANCIA */}
          <div className="flex flex-col gap-0.5 text-white pt-1">
            <div className="flex items-center gap-2">
              <span className="text-slate-200 text-xs">★ ★ ★ ★ ★</span>
              <span className="text-[10px] md:text-[11px] font-semibold text-slate-100">100% Premium Quality</span>
            </div>
            <span className="text-[8px] md:text-[10px] tracking-widest uppercase text-slate-300 font-medium">
              100% Originale Koreanische Kosmetik & Kultur
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}