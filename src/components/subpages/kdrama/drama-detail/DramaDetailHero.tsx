'use client';

import Image from 'next/image';
import Link from 'next/link';
import PlatformLogo from '@/components/PlatformLogo';

interface DramaDetailHeroProps {
  drama: any;
}

export default function DramaDetailHero({ drama }: DramaDetailHeroProps) {
  const bgImage = drama.wideImage || drama.image;

  return (
    <div className="relative w-full h-[85vh] min-h-150 flex items-end overflow-hidden bg-neutral-950">
      
      {/* Háttérkép teljes méretben */}
      {bgImage && (
        <div className="absolute inset-0">
          <Image
            src={bgImage}
            alt={drama.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-55 scale-100"
          />
          {/* Sötétítő gradiensek, hogy a szöveg olvasható maradjon */}
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-black/30" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0c]/90 via-transparent to-transparent" />
        </div>
      )}

      {/* Tartalom a Hero alján */}
      <div className="relative z-10 w-full max-w-375 mx-auto px-6 md:px-12 lg:px-16 pb-16">
        
        {/* Vissza gomb */}
        <Link 
          href="/kdrama" 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all mb-8 shadow-lg"
        >
          ← Vissza a főoldalra
        </Link>

        {/* Badgek */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <PlatformLogo platform={drama.platform || "Sorozat"} />
          <span className="text-sm font-bold text-neutral-300">
            {drama.releaseYear}
          </span>
          {drama.episodes && (
            <span className="text-xs font-medium text-neutral-400 bg-neutral-900/80 px-2.5 py-0.5 rounded-md border border-neutral-800">
              {drama.episodes} rész
            </span>
          )}
          {drama.rating && (
            <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-md border border-amber-800/80">
              ★ {drama.rating}
            </span>
          )}
        </div>

        {/* Címek */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-3 drop-shadow-2xl">
          {drama.title}
        </h1>
        {drama.koreanTitle && (
          <p className="text-2xl md:text-3xl font-light text-neutral-300 tracking-wider mb-4">
            {drama.koreanTitle}
          </p>
        )}
        {drama.tagline && (
          <p className="text-neutral-300 text-lg md:text-xl font-light max-w-3xl line-clamp-2">
            {drama.tagline}
          </p>
        )}

      </div>
    </div>
  );
}