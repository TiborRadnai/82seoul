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
    <div className="w-full bg-white py-8 sm:py-10 overflow-hidden relative mask-[linear-gradient(to_bottom,transparent_0%,black_40%,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_75%,transparent_100%)]">
      <div className="flex w-max animate-marquee items-center">
        
        {/* 1. Szett */}
        <div className="flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
          {LOGOS.map((logo, idx) => (
            <div 
              key={`a-${idx}`} 
              className="relative w-32 sm:w-40 h-10 sm:h-14 flex items-center justify-center shrink-0 opacity-90 transition-all duration-300 hover:opacity-50"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="(max-width: 640px) 128px, 160px"
                className="object-contain p-1"
              />
            </div>
          ))}
        </div>

        {/* 2. Szett (Végtelenítéshez) */}
        <div className="flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
          {LOGOS.map((logo, idx) => (
            <div 
              key={`b-${idx}`} 
              className="relative w-32 sm:w-40 h-10 sm:h-14 flex items-center justify-center shrink-0 opacity-90 transition-all duration-300 hover:opacity-50"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="(max-width: 640px) 128px, 160px"
                className="object-contain p-1"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}