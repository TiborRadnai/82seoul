'use client';

import React from 'react';
import Image from 'next/image';

const LOGOS = [
  { name: 'aespa', src: '/images/logos/aespa.png' },
  { name: 'Stray Kids', src: '/images/logos/straykids.png' },
  { name: 'ENHYPEN', src: '/images/logos/enhypen.png' },
  { name: 'BTS', src: '/images/logos/bts.png' },
  { name: 'LE SSERAFIM', src: '/images/logos/lesserafim.png' },
  { name: 'BLACKPINK', src: '/images/logos/blackpink.png' },
  { name: 'BABYMONSTER', src: '/images/logos/babymonster.png' },
];

export default function LogoMarquee() {
  return (
    <div className="w-full border-y border-zinc-300/80 bg-white/60 backdrop-blur-md py-10 sm:py-14 mb-28 sm:mb-36 overflow-hidden relative">
      <div className="flex w-max animate-marquee items-center">
        
        {/* 1. Szett */}
        <div className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
          {LOGOS.map((logo, idx) => (
            <div 
              key={`a-${idx}`} 
              className="w-32 sm:w-40 h-12 sm:h-16 flex items-center justify-center shrink-0 opacity-90 transition-all duration-300 hover:grayscale hover:opacity-50"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={160}
                height={64}
                className="max-h-full max-w-full w-auto h-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* 2. Szett (Végtelenítéshez) */}
        <div className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
          {LOGOS.map((logo, idx) => (
            <div 
              key={`b-${idx}`} 
              className="w-32 sm:w-40 h-12 sm:h-16 flex items-center justify-center shrink-0 opacity-90 transition-all duration-300 hover:grayscale hover:opacity-50"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={160}
                height={64}
                className="max-h-full max-w-full w-auto h-auto object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}