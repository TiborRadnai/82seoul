'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Member {
  name: string;
}

interface ArtistHeroProps {
  artist: {
    name: string;
    tagline: string;
    description: string;
    image: string;
    wideImage: string;
    agency?: string;
    fandom?: string;
    generation?: string;
    membersList?: Member[];
    themeColor?: string;
  };
}

export default function ArtistHero({ artist }: ArtistHeroProps) {
  const themeColor = artist.themeColor || '#ec4899';
  const namesList = artist.membersList && artist.membersList.length > 0 
    ? artist.membersList.map(m => m.name)
    : [artist.name];

  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = 0;
    const speed = 1.8;

    const step = () => {
      if (marqueeRef.current) {
        currentX -= speed;
        const halfWidth = marqueeRef.current.scrollWidth / 2;
        if (Math.abs(currentX) >= halfWidth) {
          currentX = 0;
        }
        marqueeRef.current.style.transform = `translate3d(${currentX}px, 0, 0)`;
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[75vh] sm:min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/10 rounded-none sm:rounded-b-[40px]">
      
      {/* Háttérképek - JAVÍTVA: Optimalizált sizes beállítás a felbontásvesztés elkerülésére */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image 
          src={artist.image} 
          alt={artist.name} 
          fill 
          priority 
          sizes="100vw" 
          className="object-cover object-center brightness-75 sm:hidden" 
        />
        <Image 
          src={artist.wideImage} 
          alt={artist.name} 
          fill 
          priority 
          // JAVÍTÁS: Nemcsak 100vw, hanem device-pixel arányhoz igazított sávok, 
          // hogy a nagy monitorokon se kicsi/pixeles képet kérjen le a böngésző.
          sizes="(max-width: 768px) 100vw, (max-width: 1536px) 100vw, 1920px" 
          className="hidden sm:block object-cover object-[center_20%] brightness-80" 
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-[#07070a] z-10" />

      {/* Diszkrét, nem tolakodó futószöveg a háttérben */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-15 select-none">
        <div ref={marqueeRef} className="flex whitespace-nowrap font-black uppercase font-sans leading-none opacity-[0.07] text-white will-change-transform"
             style={{ fontSize: '65vh' }}
        >
          {[...namesList, ...namesList, ...namesList, ...namesList].map((name, idx) => (
            <span key={idx} className="inline-block px-16">
              {name}
            </span>
          ))}
        </div>
      </div>
      
      {/* CÍM, ÜGYNÖKSÉG, SZLOGEN ÉS GENERÁCIÓ */}
      <div className="relative z-20 max-w-4xl mx-auto px-6">
        {artist.agency && (
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md text-xs font-extrabold uppercase tracking-widest mb-6 shadow-lg"
            style={{ 
              backgroundColor: `${themeColor}15`, 
              borderColor: `${themeColor}40`, 
              color: themeColor 
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
            {artist.agency}
          </div>
        )}

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4 text-white uppercase leading-[0.95] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {artist.name}
        </h1>

        <p className="text-xl sm:text-2xl font-extrabold tracking-wider drop-shadow-md mb-4" style={{ color: themeColor }}>
          {artist.tagline}
        </p>

        {/* Generáció a szlogen alatt */}
        {artist.generation && (
          <div className="flex justify-center">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-zinc-400 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full backdrop-blur-md shadow-md">
              {artist.generation} Generation
            </span>
          </div>
        )}
      </div>
    </section>
  );
}