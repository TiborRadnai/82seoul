'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PlatformLogo from '@/components/PlatformLogo';

export default function DramaInteractiveShowcase({ dramas }: { dramas: any[] }) {
  const initialIndex = Math.floor((dramas?.length || 1) / 2);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  
  const dragStartX = useRef<number | null>(null);

  if (!dramas || dramas.length === 0) return null;

  const activeDrama = dramas[activeIndex] || dramas[0];
  const currentImage = activeDrama.wideImage || activeDrama.image;

  // Finomabb, lassabb és elegánsabb húzáskezelés
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    dragStartX.current = clientX;
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = dragStartX.current - clientX;

    // Nagyobb küszöb (75px), hogy lassabb, kimértebb és elegánsabb legyen a lapozás
    if (Math.abs(diff) > 75) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev < dramas.length - 1 ? prev + 1 : prev));
      } else {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
      }
      dragStartX.current = clientX;
    }
  };

  const handleDragEnd = () => {
    dragStartX.current = null;
  };

  return (
    <section className="relative w-full bg-linear-to-b from-[#e8e8ec] via-[#b8b8c2] to-[#0a0a0e] pt-20 pb-32 px-6 md:px-12 lg:px-16 overflow-hidden text-neutral-900">
      
      {/* Finom háttérfény */}
      {currentImage && (
        <div className="absolute inset-0 opacity-15 pointer-events-none transition-all duration-700 ease-in-out blur-3xl scale-110">
          <Image 
            src={currentImage} 
            alt="" 
            fill 
            sizes="100vw"
            className="object-cover" 
          />
        </div>
      )}

      <div className="relative z-10 w-full max-w-[1700px] mx-auto">
        
        {/* Szekció fejléc */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/15 backdrop-blur-md border border-neutral-900/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[11px] uppercase tracking-widest font-extrabold text-neutral-900">
                82Seoul • Complete Directory
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900">
              Entdecke deine{' '}
              <span className="font-bold bg-linear-to-r from-amber-600 via-sky-700 to-neutral-900 bg-clip-text text-transparent">
                Favoriten
              </span>
            </h2>
          </div>
        </div>

        {/* FŐ FÓKUSZ ZÓNA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Bal oldal: Adatok és gomb */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <PlatformLogo platform={activeDrama.platform || "Serie"} />
              <span className="text-sm font-bold text-neutral-700">
                {activeDrama.releaseYear || "2026"}
              </span>
              {activeDrama.rating && (
                <span className="text-xs font-extrabold text-amber-800 bg-amber-200/70 backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-amber-300">
                  ★ {activeDrama.rating}
                </span>
              )}
            </div>

            <div className="mb-3">
              <h3 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 transition-all duration-500">
                {activeDrama.title}
              </h3>
              {activeDrama.koreanTitle && (
                <p className="text-xl md:text-2xl font-light text-neutral-600 tracking-wider mt-1 transition-all duration-500">
                  {activeDrama.koreanTitle}
                </p>
              )}
            </div>

            <p className="text-base text-neutral-700 font-normal leading-relaxed mb-6 transition-all duration-500">
              {activeDrama.tagline || "Tauche ein in die Details und entdecke die spannendsten Momente."}
            </p>

            <Link
              href={`/kdrama/${activeDrama.id}`}
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-neutral-900 text-white font-bold text-sm tracking-wide hover:bg-neutral-800 transition-all duration-300 shadow-xl shadow-neutral-900/15 w-fit group"
            >
              <span>Details ansehen</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Jobb oldal: Széles banner kép */}
          <div className="lg:col-span-8 relative h-85 md:h-115 lg:h-130 rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-white/40 bg-neutral-900">
            {currentImage && (
              <Image
                key={activeDrama.id}
                src={currentImage}
                alt={activeDrama.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center animate-fadeIn transition-transform duration-700 hover:scale-105"
              />
            )}
          </div>

        </div>

        {/* KÁRTYAGALÉRIA */}
        <div className="pt-8 border-t border-neutral-400/25">
          <div 
            className="flex items-center justify-center py-10 relative min-h-85 cursor-grab active:cursor-grabbing select-none overflow-hidden"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div className="flex items-center justify-center relative w-full max-w-6xl h-72">
              {dramas.map((drama, index) => {
                const thumbnailImage = drama.image || drama.wideImage;
                const isSelected = index === activeIndex;
                const distance = index - activeIndex; 
                const absDistance = Math.abs(distance);

                if (absDistance > 5) return null;

                const translateX = distance * 130; 
                const scale = isSelected ? 1.12 : Math.max(0.75, 1 - absDistance * 0.05);
                const zIndex = 50 - absDistance;

                return (
                  <div
                    key={drama.id}
                    onClick={() => setActiveIndex(index)}
                    className="absolute transition-all duration-700 ease-out cursor-pointer"
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      zIndex: zIndex,
                    }}
                  >
                    <div className={`relative w-40 md:w-48 h-56 md:h-68 rounded-2xl overflow-hidden bg-neutral-950 transition-all duration-500 shadow-2xl ${
                      isSelected 
                        ? 'ring-2 ring-amber-500 shadow-2xl shadow-black/90' 
                        : 'border border-neutral-700/60 shadow-lg hover:border-neutral-500'
                    }`}>
                      {thumbnailImage && (
                        <Image
                          src={thumbnailImage}
                          alt={drama.title}
                          fill
                          sizes="(max-width: 768px) 160px, 192px"
                          className="object-cover object-center pointer-events-none"
                        />
                      )}
                      
                      <div className={`absolute inset-0 bg-black transition-opacity duration-300 pointer-events-none ${
                        isSelected ? 'opacity-10' : 'opacity-40'
                      }`} />

                      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                      <div className="absolute bottom-3.5 left-3.5 right-3.5 pointer-events-none">
                        <span className="block text-xs font-bold text-white leading-tight truncate drop-shadow-md">
                          {drama.title}
                        </span>
                        {drama.koreanTitle && (
                          <span className="block text-[10px] font-light text-neutral-300 truncate drop-shadow-md mt-0.5">
                            {drama.koreanTitle}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}