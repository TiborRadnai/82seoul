'use client';

import Image from 'next/image';
import Link from 'next/link';
import PlatformLogo from '@/components/PlatformLogo';

interface DramaDetailHeroProps {
  drama: any;
}

// Sanity optimalizáló segédfüggvény
function urlForSanity(sourceUrl: string, width = 1200) {
  if (!sourceUrl) return "";
  const separator = sourceUrl.includes('?') ? '&' : '?';
  return `${sourceUrl}${separator}w=${width}&auto=format&q=75`;
}

export default function DramaDetailHero({ drama }: DramaDetailHeroProps) {
  // Mobilon az álló kép (image) kell, hogy a szereplők ne lógjanak ki!
  const rawMobile = drama.image || drama.wideImage;
  // Deszktopon a fekvő kép (wideImage), ha van, különben az álló
  const rawWide = drama.wideImage || drama.image;

  const mobileImg = urlForSanity(rawMobile, 500); // Mobilon kicsi, gyors álló kép
  const wideImg = urlForSanity(rawWide, 1400);   // Deszktopon széles kép

  return (
    <div className="relative w-full h-[85vh] min-h-137.5 flex items-end overflow-hidden bg-neutral-950">
      
      {/* Háttérképek - Külön mobil (álló) és deszktop (fekvő) ág */}
      <div className="absolute inset-0">
        
        {/* Deszktop háttér (Fekvő) - NINCS priority, hogy mobilon ne terhelje a sávszélességet! */}
        {wideImg && (
          <div className="hidden md:block absolute inset-0">
            <Image
              src={wideImg}
              alt={drama.title}
              fill
              sizes="100vw"
              className="object-cover object-top opacity-55"
            />
          </div>
        )}

        {/* Mobil háttér (Álló) - LCP elem priority-vel, eager töltéssel és fetchPriority="high"-val */}
        {mobileImg && (
          <div className="block md:hidden absolute inset-0">
            <Image
              src={mobileImg}
              alt={drama.title}
              fill
              priority
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-center opacity-60"
            />
          </div>
        )}

        {/* Sötétítő gradiensek */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-[#0a0a0c]/50 to-black/30" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0c]/90 via-transparent to-transparent" />
      </div>

      {/* Tartalom a Hero alján */}
      <div className="relative z-10 w-full max-w-375 mx-auto px-6 md:px-12 lg:px-16 pb-16">
        
        {/* Vissza gomb */}
        <Link 
          href="/kdrama" 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-neutral-900/80 backdrop-blur-md border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all mb-8 shadow-lg"
        >
          ← Zurück zur Übersicht
        </Link>

        {/* Badgek */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <PlatformLogo platform={drama.platform || "Serie"} />
          <span className="text-sm font-bold text-neutral-300">
            {drama.releaseYear}
          </span>
          {drama.episodes && (
            <span className="text-xs font-medium text-neutral-400 bg-neutral-900/80 px-2.5 py-0.5 rounded-md border border-neutral-800">
              {drama.episodes} Episoden
            </span>
          )}
          {drama.rating && (
            <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-md border border-amber-800">
              ★ {drama.rating}
            </span>
          )}
        </div>

        {/* Címek */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-3 drop-shadow-2xl">
          {drama.title}
        </h1>
        {drama.koreanTitle && (
          <p className="text-xl md:text-3xl font-light text-neutral-300 tracking-wider mb-4">
            {drama.koreanTitle}
          </p>
        )}
        {drama.tagline && (
          <p className="text-neutral-300 text-base md:text-xl font-light max-w-3xl line-clamp-2">
            {drama.tagline}
          </p>
        )}

      </div>
    </div>
  );
}