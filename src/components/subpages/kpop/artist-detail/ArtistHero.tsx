import React from 'react';
import Image from 'next/image';

interface ArtistHeroProps {
  artist: {
    name: string;
    tagline: string;
    description: string;
    wideImage: string;
    fandom?: string;
  };
}

export default function ArtistHero({ artist }: ArtistHeroProps) {
  return (
    <section className="relative w-full min-h-137.5 py-36 sm:py-48 px-6 sm:px-12 flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/10">
      
      {/* Háttérkép */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <Image
          src={artist.wideImage}
          alt={artist.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.75] contrast-105 scale-100"
        />
      </div>

      {/* Sötétítő átmenet */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-[#0a0a0c] z-10" />

      {/* Színes fényfoltok */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-pink-600/20 blur-[140px] rounded-full pointer-events-none z-10" />
      
      {/* Szöveges tartalom */}
      <div className="relative z-20 max-w-4xl mx-auto">
        {artist.fandom && (
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_#ec4899]" />
            FANDOM: {artist.fandom}
          </div>
        )}

        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter mb-6 text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
          {artist.name}
        </h1>

        <p className="text-2xl sm:text-3xl font-extrabold tracking-wider mb-8 text-pink-400 drop-shadow-[0_5px_15px_rgba(236,72,153,0.4)]">
          {artist.tagline}
        </p>

        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
          {artist.description}
        </p>
      </div>
    </section>
  );
}