'use client';

import React, { useState, useEffect } from 'react';
import { Utensils, Flame, Sparkles } from 'lucide-react';

const BACKGROUND_IMAGES = [
  "/images/kfood/KimchiJjigae.webp",
  "/images/kfood/KoreanBBQ.webp",
  "/images/kfood/Bibimbap.webp",
];

export default function KFoodHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-137.5 lg:min-h-162.5 flex items-center justify-center py-28 lg:py-36 px-6 md:px-12 lg:px-16 text-center overflow-hidden bg-neutral-950 text-white border-b border-neutral-800/60">
      
{/* HÁTTÉR SLIDER & HÁTTÉRFÉNYEK */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {BACKGROUND_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-55' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Külön belső div a sima, megakadásmentes lusta zoomhoz */}
            <div 
              className={`absolute inset-0 w-full h-full transition-transform duration-7000 ease-out ${
                index === currentImageIndex ? 'scale-105' : 'scale-100'
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
        ))}
        {/* Lágyabb, rétegzett sötétítések */}
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950/70 via-neutral-950/40 to-neutral-950/90 z-10" />
        <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/40 to-neutral-950/90 z-10" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 border border-neutral-700/60 text-amber-400 text-xs font-bold tracking-widest uppercase shadow-xl backdrop-blur-md mx-auto">
          <Utensils className="w-3.5 h-3.5 stroke-[1.75] text-amber-500" />
          <span>K-FOOD & GASZTRONÓMIA KISOKOS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1] drop-shadow-lg">
          A Koreai Konyha{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-300 to-amber-200">
            Művészete.
          </span>
        </h1>

        <p className="text-neutral-200 text-base md:text-xl font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          A gőzölgő utcai ételektől a tradicionális fermentált fogásokig. Ízek, amelyek mögött évszázados történetek és kultúra rejlik.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-200 font-medium">
          <div className="flex items-center gap-2 bg-neutral-900/80 border border-neutral-700/60 px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Autentikus receptek & street food</span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-900/80 border border-neutral-700/60 px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Lépésről lépésre útmutatók</span>
          </div>
        </div>

      </div>
    </section>
  );
}