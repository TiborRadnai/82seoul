'use client';

import React, { useState, useEffect } from 'react';

export type GenderCategory = 'top10' | 'all' | 'bg' | 'gg' | 'solo';
export type AgencyCategory = 'all' | 'HYBE' | 'SM' | 'YG' | 'JYP' | 'OTHER';
export type GenerationCategory = string;

export interface ArtistIndexItem {
  id: string;
  name: string;
  category: 'bg' | 'gg' | 'solo';
  themeColor?: string;
  filterAgency: AgencyCategory;
  generation?: string;
}

interface KPopFilterProps {
  selectedGender: GenderCategory;
  onSelectGender: (cat: GenderCategory) => void;
  selectedAgency: AgencyCategory;
  onSelectAgency: (agency: AgencyCategory) => void;
  selectedGeneration: GenerationCategory;
  onSelectGeneration: (gen: GenerationCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  artists: ArtistIndexItem[];
  onSelectArtist: (id: string) => void;
}

const GENDER_OPTIONS: { id: GenderCategory; label: string }[] = [
  { id: 'top10', label: 'Top 10 kiemelt' },
  { id: 'all', label: 'Összes előadó' },
  { id: 'gg', label: 'Lánycsapatok' },
  { id: 'bg', label: 'Fiúcsapatok' },
  { id: 'solo', label: 'Szóló előadók' },
];

const AGENCIES: { id: AgencyCategory; label: string }[] = [
  { id: 'all', label: 'Minden kiadó' },
  { id: 'HYBE', label: 'HYBE' },
  { id: 'SM', label: 'SM Entertainment' },
  { id: 'YG', label: 'YG Entertainment' },
  { id: 'JYP', label: 'JYP Entertainment' },
  { id: 'OTHER', label: 'Egyéb kiadók' },
];

export default function KPopFilter({
  selectedGender,
  onSelectGender,
  selectedAgency,
  onSelectAgency,
  selectedGeneration,
  onSelectGeneration,
  searchQuery,
  onSearchChange,
  totalCount,
  artists,
  onSelectArtist,
}: KPopFilterProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState('');

  // Itt, a komponensen belül már látja az `artists` propot!
  const uniqueGenerations = Array.from(new Set(artists.map(a => a.generation).filter(Boolean)))
    .sort() as string[];

  const generationOptions = [
    { id: 'all', label: 'Minden Gen' },
    ...uniqueGenerations.map(gen => ({ id: gen, label: `${gen}. Generáció` }))
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isDrawerOpen]);

  const filteredArtists = artists.filter((artist) => {
    const searchLower = drawerSearch.toLowerCase();
    return (
      artist.name.toLowerCase().includes(searchLower) ||
      (artist.generation && artist.generation.toLowerCase().includes(searchLower))
    );
  });

  return (
    <>
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 mb-10">
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 shrink-0">
            {GENDER_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onSelectGender(opt.id)}
                className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer shrink-0 ${
                  selectedGender === opt.id
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'bg-zinc-200/50 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
            <div className="hidden sm:block h-4 w-px bg-zinc-300 mx-1 shrink-0" />
            
            {/* Kiadó Dropdown */}
            <div className="relative shrink-0">
              <select
                value={selectedAgency}
                onChange={(e) => onSelectAgency(e.target.value as AgencyCategory)}
                className="appearance-none bg-zinc-200/50 hover:bg-zinc-200 text-zinc-700 text-xs font-medium rounded-full pl-4 pr-8 py-2 focus:outline-none transition-all cursor-pointer border-none"
              >
                {AGENCIES.map((agency) => (
                  <option key={agency.id} value={agency.id} className="bg-white text-zinc-800">
                    {agency.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Generáció Dropdown (Automatikus) */}
            <div className="relative shrink-0">
              <select
                value={selectedGeneration}
                onChange={(e) => onSelectGeneration(e.target.value as GenerationCategory)}
                className="appearance-none bg-zinc-200/50 hover:bg-zinc-200 text-zinc-700 text-xs font-medium rounded-full pl-4 pr-8 py-2 focus:outline-none transition-all cursor-pointer border-none"
              >
                {generationOptions.map((gen) => (
                  <option key={gen.id} value={gen.id} className="bg-white text-zinc-800">
                    {gen.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end flex-wrap sm:flex-nowrap">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>Gyorsindex ({artists.length})</span>
            </button>

            <div className="relative w-full sm:w-56">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Keresés..."
                className="w-full bg-zinc-100 text-zinc-800 text-xs font-normal rounded-full pl-9 pr-8 py-2 border border-zinc-200 focus:border-zinc-400 focus:bg-white focus:outline-none transition-all"
              />
            </div>
            <span className="text-[11px] font-medium text-zinc-500 whitespace-nowrap px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/60 shrink-0">
              {totalCount} találat
            </span>
          </div>
        </div>
      </div>

      {isDrawerOpen && (
        <div onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity" />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0e] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] z-50 transform transition-transform duration-300 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111116]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-pink-500 font-extrabold block">Gyorsnavigáció</span>
            <h3 className="text-xl font-black text-white">Teljes Előadói Lista</h3>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer">✕</button>
        </div>

        <div className="p-4 border-b border-white/5 bg-[#0d0d12]">
          <input
            type="text"
            placeholder="Keresés név vagy generáció (pl. 4th) alapján..."
            value={drawerSearch}
            onChange={(e) => setDrawerSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/50 transition-all"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <button
                key={artist.id}
                onClick={() => { onSelectArtist(artist.id); setIsDrawerOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-xl bg-white/2 hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full transition-transform group-hover:scale-150" style={{ backgroundColor: artist.themeColor || '#ec4899' }} />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-bold text-zinc-200 group-hover:text-white tracking-wide">{artist.name}</span>
                    {artist.generation && (
                      <span className="text-[9px] font-bold text-pink-500/80 uppercase">{artist.generation} Gen</span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400">
                  {artist.category === 'gg' ? 'GG' : artist.category === 'bg' ? 'BG' : 'Solo'}
                </span>
              </button>
            ))
          ) : (
            <div className="text-center py-10 text-zinc-500 text-sm">Nincs találat.</div>
          )}
        </div>
      </div>
    </>
  );
}