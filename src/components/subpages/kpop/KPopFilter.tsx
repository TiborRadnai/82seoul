'use client';

import React, { useState, useEffect } from 'react';

export type GenderCategory = 'top10' | 'all' | 'bg' | 'gg' | 'solo';
export type AgencyCategory = 'all' | 'HYBE' | 'SM' | 'YG' | 'JYP' | 'OTHER';

export interface ArtistIndexItem {
  id: string;
  name: string;
  category: 'bg' | 'gg' | 'solo';
  themeColor?: string;
}

interface KPopFilterProps {
  selectedGender: GenderCategory;
  onSelectGender: (cat: GenderCategory) => void;
  selectedAgency: AgencyCategory;
  onSelectAgency: (agency: AgencyCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  artists: ArtistIndexItem[]; // <-- Új prop a teljes listához
  onSelectArtist: (id: string) => void; // <-- Ugrás az adott előadóra
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
  searchQuery,
  onSearchChange,
  totalCount,
  artists,
  onSelectArtist,
}: KPopFilterProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState('');

  // ESC gombra bezáródik a drawer
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

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(drawerSearch.toLowerCase())
  );

  return (
    <>
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 mb-10">
        
        {/* ELRENDEZÉS: Mobilon függőlegesen szeparált, Desktopon egy soros */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80">
          
          {/* BAL OLDAL: KATEGÓRIÁK ÉS KIADÓ DROPDOWN */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar sm:flex-wrap -mx-4 px-4 sm:mx-0 sm:px-0 shrink-0">
            
            {/* Kapszula gombok */}
            {GENDER_OPTIONS.map((opt) => {
              const isActive = selectedGender === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onSelectGender(opt.id)}
                  className={`px-5 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'bg-zinc-200/50 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}

            {/* Kis elválasztó vonal */}
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

          </div>

          {/* JOBB OLDAL: KERESŐINPUT, INDEX GOMB ÉS TALÁLATI SZÁMLÁLÓ */}
          <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end flex-wrap sm:flex-nowrap">
            
            {/* Teljes Lista / Index Gomb */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>Gyorsindex ({artists.length})</span>
            </button>

            {/* Keresőmező */}
            <div className="relative w-full sm:w-56">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Keresés..."
                className="w-full bg-zinc-100 text-zinc-800 placeholder:text-zinc-400 text-xs font-normal rounded-full pl-9 pr-8 py-2 border border-zinc-200 focus:border-zinc-400 focus:bg-white focus:outline-none transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M10 2a8 8 0 105.293 14.043l4.83 4.829 1.414-1.414-4.829-4.83A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-400 hover:text-zinc-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                  </svg>
                </button>
              )}
            </div>

            {/* Találat számláló */}
            <span className="text-[11px] font-medium text-zinc-500 whitespace-nowrap px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/60 shrink-0">
              {totalCount} találat
            </span>

          </div>

        </div>
      </div>

      {/* --- BEÉPÍTETT INDEX / GYORSVÁLASZTÓ SIDEBAR (DRAWER) --- */}
      {isDrawerOpen && (
        <div 
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0e] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] z-50 transform transition-transform duration-300 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Felső sáv */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111116]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-pink-500 font-extrabold block">Gyorsnavigáció</span>
            <h3 className="text-xl font-black text-white">Teljes Előadói Lista</h3>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Kereső a sávon belül */}
        <div className="p-4 border-b border-white/5 bg-[#0d0d12]">
          <input
            type="text"
            placeholder="Keresés az indexben..."
            value={drawerSearch}
            onChange={(e) => setDrawerSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/50 transition-all"
          />
        </div>

        {/* Lista elemek */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <button
                key={artist.id}
                onClick={() => {
                  onSelectArtist(artist.id);
                  setIsDrawerOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl bg-white/2 hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="w-2 h-2 rounded-full transition-transform group-hover:scale-150"
                    style={{ backgroundColor: artist.themeColor || '#ec4899' }}
                  />
                  <span className="text-sm font-bold text-zinc-200 group-hover:text-white tracking-wide">
                    {artist.name}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400">
                  {artist.category === 'gg' ? 'Lánycsapat' : artist.category === 'bg' ? 'Fiúcsapat' : 'Szóló'}
                </span>
              </button>
            ))
          ) : (
            <div className="text-center py-10 text-zinc-500 text-sm">Nincs találat a megadott névre.</div>
          )}
        </div>

        {/* Alsó infó sáv */}
        <div className="p-4 border-t border-white/10 text-center text-xs text-zinc-600 uppercase tracking-widest">
          Összesen {artists.length} előadó az adatbázisban
        </div>

      </div>
    </>
  );
}