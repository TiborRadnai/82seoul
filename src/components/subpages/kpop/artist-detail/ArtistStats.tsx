'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowDown } from 'lucide-react';

interface ArtistStatsProps {
  artistId: string;
  agency: string;
  members: string | number;
  category: 'gg' | 'bg' | 'solo';
  themeColor?: string;
}

export default function ArtistStats({ artistId, agency, members, category, themeColor = '#ec4899' }: ArtistStatsProps) {
  const searchParams = useSearchParams();
  const queryStr = searchParams.toString();
  
  // Ugyanaz a tökéletes URL horgonnyal, mint a ClientWrapperben!
  const backUrl = `/kpop${queryStr ? `?${queryStr}` : ''}#artist-${artistId}`;

  const scrollToDiscography = () => {
    const discographySection = document.getElementById('discography');
    if (discographySection) {
      discographySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#121216]/80 border-b border-white/10 py-6 px-6 backdrop-blur-xl shadow-2xl">
      
      {/* 1. BAL SZÉLEN: Vissza gomb Link-kel, pontosan mint fent */}
      <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 hidden md:block">
        <Link
          href={backUrl}
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-105 no-underline"
          title="Vissza a listához"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" style={{ color: themeColor }} />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
            Vissza
          </span>
        </Link>
      </div>

      {/* 2. JOBB SZÉLEN: Diszkográfia gomb */}
      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 hidden md:block">
        <button
          onClick={scrollToDiscography}
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
          title="Ugrás a diszkográfiához"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-200">
            Diszkográfia
          </span>
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1 animate-bounce" style={{ color: themeColor }} />
        </button>
      </div>

      {/* KÖZÉPEN: A statisztikai kártyák */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-4 rounded-xl bg-white/2 border border-white/5">
          <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1 font-semibold">Ügynökség</span>
          <span className="text-base sm:text-lg font-black text-zinc-100">{agency || 'N/A'}</span>
        </div>
        
        <div className="p-4 rounded-xl bg-white/2 border border-white/5">
          <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1 font-semibold">Tagok Száma</span>
          <span className="text-base sm:text-lg font-black text-zinc-100">
            {typeof members === 'number' ? `${members} fő` : members}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white/2 border border-white/5">
          <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1 font-semibold">Kategória</span>
          <span 
            className="text-base sm:text-lg font-black uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            {category === 'gg' && 'Lánycsapat'}
            {category === 'bg' && 'Fiúcsapat'}
            {category === 'solo' && 'Szóló előadó'}
          </span>
        </div>
      </div>
    </section>
  );
}