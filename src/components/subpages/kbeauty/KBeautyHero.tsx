'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ShoppingBag, ArrowRight, ArrowUpRight } from 'lucide-react';

interface KBeautyHeroProps {
  products?: any[];
}

export default function KBeautyHero({ products = [] }: KBeautyHeroProps) {
  const featuredProducts = products.slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (featuredProducts.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredProducts.length, isHovered]);

  const getItemId = (product: any) => {
    if (!product?.id) return product?._id || '';
    if (typeof product.id === 'string') return product.id;
    if (typeof product.id === 'object' && 'current' in product.id) return product.id.current;
    return product._id || '';
  };

  const currentProduct = featuredProducts[currentIndex] || products[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center bg-linear-to-b from-[#eee8e2] via-[#f7f3ef] to-[#eee8e2] text-slate-900 overflow-hidden border-b border-stone-200/80 pt-32 pb-16">
      
      {/* Határozottabb felső sáv sötétítés a navigációhoz */}
      <div className="absolute top-0 left-0 right-0 h-44 bg-linear-to-b from-stone-950/45 via-stone-950/20 to-transparent pointer-events-none z-20" />

      <style jsx global>{`
        @keyframes luxuryScaleFade {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(1.04);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        .animate-luxury-transition {
          animation: luxuryScaleFade 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Teljes körű, finom élek alatti elmosás / kifuttatás a háttérbe */
        .image-blend-mask {
          mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%),
                      linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          mask-composite: intersect;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%),
                              linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-composite: source-in;
        }
      `}</style>

      {/* Finom luxus fények */}
      <div className="absolute top-1/4 left-1/4 w-175 h-175 bg-rose-200/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full px-6 md:px-16 lg:px-24 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* BAL OLDAL: Tipográfia */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-200 text-rose-800 text-xs font-bold tracking-widest uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>82.SEOUL • K-BEAUTY SHOP</span>
            </div>

            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-light tracking-tight text-slate-950 leading-[1.05]">
              Individuelle <br />
              Pflege für <br />
              <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-rose-700 via-pink-600 to-amber-700">
                natürliche Schönheit.
              </span>
            </h1>

            <p className="text-stone-600 text-lg md:text-xl leading-relaxed max-w-xl font-light">
              Handverlesene Original-Klimakosmetika direkt aus Seoul. Entdecke hochwirksame Seren und Pflegeformeln, die deine Haut zum Strahlen bringen.
            </p>

            <div className="pt-4">
              <a
                href="#catalog"
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs md:text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-rose-400" />
                <span>Jetzt entdecken</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </a>
            </div>

          </div>

          {/* JOBB OLDAL: Teljes kerületén maszkolt, háttérbe olvadó kép */}
          <div 
            className="lg:col-span-6 relative w-full h-150 md:h-187.5 flex items-center justify-center group/container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            
            {/* Bal oldali tompaszögű háromszög nyíl */}
            {featuredProducts.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-20 bg-white/20 hover:bg-white/50 backdrop-blur-sm text-slate-800 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/container:opacity-100 cursor-pointer shadow-sm"
                style={{ clipPath: 'polygon(100% 0%, 30% 50%, 100% 100%, 70% 100%, 0% 50%, 70% 0%)' }}
                aria-label="Vorheriges Produkt"
              >
                <span className="sr-only">Vorheriges</span>
              </button>
            )}

            {/* Jobb oldali tompaszögű háromszög nyíl */}
            {featuredProducts.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-20 bg-white/20 hover:bg-white/50 backdrop-blur-sm text-slate-800 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/container:opacity-100 cursor-pointer shadow-sm"
                style={{ clipPath: 'polygon(0% 0%, 70% 50%, 0% 100%, 30% 100%, 100% 50%, 30% 0%)' }}
                aria-label="Nächstes Produkt"
              >
                <span className="sr-only">Nächstes</span>
              </button>
            )}

            {currentProduct ? (
              <Link
                key={currentProduct._id}
                href={`/kbeauty/${getItemId(currentProduct)}`}
                className="relative z-10 group w-full h-full flex items-center justify-center cursor-pointer overflow-hidden animate-luxury-transition"
              >
                {/* A kétirányú lineáris maszk most már minden oldalon kifuttatja a széleket */}
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className="w-full h-full object-contain image-blend-mask transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Hoverre becsúszó elmosódott overlay */}
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-center p-8">
                  <span className="text-xs font-bold tracking-widest text-rose-300 uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {currentProduct.badge || `Highlight 0${currentIndex + 1}`}
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-light text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {currentProduct.title}
                  </h3>

                  <p className="text-sm text-slate-200 font-light max-w-md line-clamp-2 mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {currentProduct.tagline}
                  </p>

                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 font-bold text-xs tracking-wider uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150 shadow-lg">
                    <span>Ansehen</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-400">
                Lade Highlights...
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}