'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface FeaturedProduct {
  _id?: string;
  title: string;
  price: string;
  description: string;
  image: string;
  link?: string;
  variants?: any[];
  [key: string]: any;
}

interface HeaderProps {
  featuredProducts: FeaturedProduct[];
  onOpenModal?: (product: FeaturedProduct) => void;
}

export default function Header({ featuredProducts = [], onOpenModal }: HeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Időzítő a kiemelt termékek forgatására (8 másodperces, elegáns tempó)
  useEffect(() => {
    if (featuredProducts.length <= 1) return;

    const interval = setInterval(() => {
      setIsFading(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
        setIsFading(false);
      }, 700);

    }, 8000);

    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const currentProduct = featuredProducts[currentIndex] || {
    title: "Wird geladen...",
    price: "",
    description: "Bitte gedulde dich...",
    image: "",
    link: "#",
  };

  // Biztonságos ár-kinyerés (ha a price üres, megnézi a variánsokat is)
  const rawPrice = currentProduct.price || currentProduct.variants?.[0]?.salePrice || currentProduct.variants?.[0]?.price;
  const displayPrice = rawPrice ? `${String(rawPrice).replace(/€/g, '').trim()} €` : '';

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
    <header className="relative w-full h-screen overflow-hidden bg-neutral-950 font-sans">
      
      {/* 1. EREDETI RAGYOGÓ HÁTTÉRKÉP */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/main-page-hero-bg.webp')`,
        }}
      />

      {/* 2. CÉLZOTT ÁTMENETES SÖTÉTÍTÉS */}
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
              82.SEOUL • ORIGINAL K-BEAUTY
            </span>
          </div>

        </div>

        {/* ALSÓ RÉSZ */}
        <div className="space-y-4 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            
{/* BAL OLDAL: Karcsúsított szöveges kártya - Elegáns, kör nélküli, finom nyíllal */}
<div className="hidden lg:block lg:col-span-4 bg-black/35 hover:bg-black/45 backdrop-blur-2xl p-6 rounded-3xl space-y-4 text-white shadow-2xl border border-white/20 hover:border-amber-400/40 transition-all duration-300 text-center">
  
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
    MEHR ALS NUR EIN WEBSHOP – DEIN TOR ZU KOREA.
  </h3>
  <p className="text-[11px] text-slate-200 tracking-wide leading-relaxed font-light uppercase drop-shadow-sm">
    ERLEBE K-BEAUTY & DIE ELEGANZ DER KOREANISCHEN KULTUR.
  </p>

  {/* Középre igazított szöveg és karika nélküli, kecses nyíl */}
  <div className="pt-2 flex flex-col items-center justify-center space-y-3">
    <a 
      href="#kbeauty" 
      onClick={scrollToKBeauty}
      className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-300 hover:text-white transition-colors duration-300 cursor-pointer drop-shadow-sm"
    >
      Jetzt entdecken
    </a>
    
    <div className="animate-smooth-float-clean">
      <a
        href="#kbeauty"
        onClick={scrollToKBeauty}
        className="flex items-center justify-center text-white/80 hover:text-amber-300 transition-colors duration-300 cursor-pointer p-1"
        title="Jetzt entdecken"
      >
        {/* Egyedi, vékonyabb, szépen megtervezett, méltóságteljes nyíl */}
        <svg className="w-5 h-5 stroke-2 transition-transform duration-300 hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </div>
  </div>
</div>

            {/* KÖZÉPSŐ TÉR */}
            <div className="hidden lg:block lg:col-span-3" />

            {/* JOBB OLDAL: Kiemelt termékkártya */}
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className={`bg-black/60 backdrop-blur-2xl p-4 md:p-5 rounded-3xl flex items-center gap-4 w-full sm:max-w-lg shadow-2xl border border-white/20 transition-all duration-700 ease-in-out ${isFading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
                
                {/* Termékkép & Ár a sarokban */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-slate-100/90 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center p-2">
                  {displayPrice && (
                    <span className="absolute top-1 left-1 bg-slate-900 text-white text-[9px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md z-10 shadow">
                      {displayPrice}
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
                    {currentProduct.description || currentProduct.tagline || currentProduct.variants?.[0]?.description || "Entdecke das Geheimnis strahlender Haut."}
                  </p>
                  <div className="pt-1">
                    <button
                      onClick={() => onOpenModal && onOpenModal(currentProduct)}
                      className="inline-block px-4 py-1.5 bg-slate-100 hover:bg-white text-slate-900 rounded-full font-bold text-[10px] sm:text-xs tracking-wider uppercase transition-colors duration-300 shadow-md cursor-pointer border-none"
                    >
                      DETAILS
                    </button>
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
              100% Originale Koreanische Kosmetik & Kultur
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}