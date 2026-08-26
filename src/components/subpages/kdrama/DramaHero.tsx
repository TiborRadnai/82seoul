'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DramaHeroProps {
  title?: string;
  koreanTitle?: string; // <--- EZT ADD HOZZÁ
  tagline?: string;
  wideImage?: string;
  platform?: string;
  releaseYear?: number;
  rating?: string;
  episodes?: string;
  dramas?: any[];
}

export default function DramaHero({
  title,
  // koreanTitle, // <--- FOGADD DOLOGKÉNT IS
  tagline,
  wideImage,
  platform,
  releaseYear,
  rating,
  episodes,
  dramas,
}: DramaHeroProps) {
  const isDetailPage = Boolean(title);
  const [currentIndex, setCurrentIndex] = useState(0);
  const list = dramas && dramas.length > 0 ? dramas : [];

  // Smooth képváltás időzítője
  useEffect(() => {
    if (isDetailPage || list.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % list.length);
    }, 7000); // 7 másodperc, hogy nyugodtan lehessen nézni
    return () => clearInterval(interval);
  }, [isDetailPage, list.length]);

  const activeDrama = list[currentIndex];
  const bgImage = wideImage || activeDrama?.wideImage || activeDrama?.image;
  
  const displayTitle = title || "Filmek és Sorozatok";
  const displayTagline = tagline || "Fedezd fel a legkedveltebb dél-koreai drámákat, filmeket és a képernyők mögötti lenyűgöző világot egy helyen.";
  
  const activeDramaId = activeDrama?.id;
  const activeDramaTitle = activeDrama?.title;
  const activeDramaImage = activeDrama?.image || activeDrama?.wideImage;

  return (
    <div className="relative w-full h-[85vh] min-h-[650px] max-h-[950px] overflow-hidden bg-[#050507] flex flex-col justify-between">
      
      {/* Háttérkép - Gyönyörű, drámai cross-fade és lassan lüktető zoom animáció */}
      {list.length > 0 && !isDetailPage ? (
        <div className="absolute inset-0 z-0">
          {list.map((drama, idx) => {
            const imgUrl = drama.wideImage || drama.image;
            if (!imgUrl) return null;
            const isActive = idx === currentIndex;
            return (
              <div
                key={imgUrl}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-75 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={drama.title || "Dráma"}
                  fill
                  priority={idx === 0}
                  className={`object-cover object-center transform transition-transform duration-[7000ms] ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
              </div>
            );
          })}
          {/* Alapértelmezett statikus kép, ha nincs lista */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/30 to-black/20 z-20 pointer-events-none" />
        </div>
      ) : (
        bgImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={bgImage}
              alt={displayTitle}
              fill
              priority
              className="object-cover object-center opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/30 to-black/20 z-10" />
          </div>
        )
      )}

      {/* Sötétítő átmenet réteg a listás módhoz (hogy a szöveg mindig olvasható maradjon) */}
      {!isDetailPage && list.length > 0 && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/20 to-black/30 z-20 pointer-events-none" />
      )}

      {/* Felső rész: Márkajelzés */}
      <div className="relative z-30 px-6 md:px-16 pt-12 max-w-7xl w-full mx-auto flex justify-between items-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[11px] uppercase tracking-widest font-semibold text-white">
            Eightytwo.Seoul • Cinema & Series
          </span>
        </div>
      </div>

      {/* Alsó tartalomzóna */}
      <div className="relative z-30 px-6 md:px-16 pb-16 max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        
        {/* Bal oldal: Kategória cím és leírás */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
            {displayTitle}
          </h1>
          <p className="mt-3 text-base md:text-lg text-neutral-200 font-light max-w-xl leading-relaxed drop-shadow-md">
            {displayTagline}
          </p>

          {isDetailPage && (
            <div className="flex flex-wrap items-center gap-3 mt-6">
              {platform && (
                <span className="px-3 py-1 rounded bg-white/20 backdrop-blur-md text-xs font-semibold text-white border border-white/20">
                  {platform}
                </span>
              )}
              {releaseYear && <span className="text-sm text-neutral-200">{releaseYear}</span>}
              {episodes && <span className="text-sm text-neutral-200">• {episodes}</span>}
              {rating && <span className="px-2.5 py-0.5 rounded bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40">★ {rating}</span>}
            </div>
          )}
        </div>

        {/* Jobb oldal: Kiemelt kártya ("Szerkesztői ajánlat" szöveggel és smooth váltással) */}
        {!isDetailPage && activeDrama && activeDramaId && (
          <Link 
            href={`/kdrama/${activeDramaId}`}
            className="group relative flex items-center gap-4 p-4 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/20 hover:border-white/50 transition-all duration-300 shadow-2xl max-w-sm w-full hover:scale-[1.02]"
          >
            {activeDramaImage && (
              <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md">
                <Image
                  src={activeDramaImage}
                  alt={activeDramaTitle || "Dráma"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            )}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">
                  Szerkesztői ajánlat
                </span>
              </div>
              <h4 className="text-white font-bold text-base truncate group-hover:text-amber-200 transition-colors">
                {activeDramaTitle}
              </h4>
              <span className="inline-flex items-center gap-2 text-xs text-neutral-300 mt-2 font-medium group-hover:text-white">
                <span>Adatlap megtekintése</span>
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        )}

      </div>
    </div>
  );
}