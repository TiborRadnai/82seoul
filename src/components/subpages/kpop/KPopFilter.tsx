'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { SlidersHorizontal, Search, X } from 'lucide-react';

export type GenderCategory = 'top10' | 'all' | 'bg' | 'gg' | 'solo' | 'coed';
export type AgencyCategory = 'all' | 'HYBE' | 'SM' | 'YG' | 'JYP' | 'OTHER';
export type GenerationCategory = string;

export interface ArtistIndexItem {
  id: string;
  name: string;
  category: 'bg' | 'gg' | 'solo' | 'coed';
  themeColor?: string;
  filterAgency: AgencyCategory;
  generation?: string;
  imageUrl?: string; 
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
  allArtists?: ArtistIndexItem[];
  onSelectArtist: (id: string) => void;
}

const GENDER_OPTIONS: { id: GenderCategory; label: string }[] = [
  { id: 'top10', label: 'Spotify Korea Top 10' },
  { id: 'all', label: 'Alle Künstler' },
  { id: 'gg', label: 'Girlgroups' },
  { id: 'bg', label: 'Boygroups' },
  { id: 'coed', label: 'Duo & Co-ed' },
  { id: 'solo', label: 'Solokünstler' },
];

const AGENCIES: { id: AgencyCategory; label: string }[] = [
  { id: 'all', label: 'Alle Agenturen' },
  { id: 'HYBE', label: 'HYBE' },
  { id: 'SM', label: 'SM Entertainment' },
  { id: 'YG', label: 'YG Entertainment' },
  { id: 'JYP', label: 'JYP Entertainment' },
  { id: 'OTHER', label: 'Andere Agenturen' },
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
  allArtists,
  onSelectArtist,
}: KPopFilterProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState('');
  const drawerSourceArtists = allArtists || artists;

  // Mindig a teljes adatbázisból (drawerSourceArtists) szedjük ki a generációkat
  const uniqueGenerations = useMemo(() => {
    return Array.from(new Set(drawerSourceArtists.map(a => a.generation).filter(Boolean)))
      .sort() as string[];
  }, [drawerSourceArtists]);

  const generationOptions = [
    { id: 'all', label: 'Alle Generationen' },
    ...uniqueGenerations.map(gen => ({ id: gen, label: `${gen}. Gen` }))
  ];

  // A modalon belüli aktuális szűrők (Ügynökség + Generáció) szerinti valós globális találatszám
  const modalFilteredCount = useMemo(() => {
    return drawerSourceArtists.filter((artist) => {
      const matchesAgency =
        selectedAgency === 'all' ||
        artist.filterAgency?.toUpperCase() === selectedAgency.toUpperCase();

      let matchesGeneration = true;
      if (selectedGeneration !== 'all') {
        const dbGen = String(artist.generation || '').toLowerCase().trim();
        const filterGen = String(selectedGeneration).toLowerCase().trim();
        const dbNum = dbGen.replace(/\D/g, '');
        const filterNum = filterGen.replace(/\D/g, '');

        if (dbNum && filterNum) {
          matchesGeneration = dbNum === filterNum;
        } else {
          matchesGeneration = dbGen === filterGen;
        }
      }

      return matchesAgency && matchesGeneration;
    }).length;
  }, [drawerSourceArtists, selectedAgency, selectedGeneration]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
        setIsFilterModalOpen(false);
      }
    };
    if (isDrawerOpen || isFilterModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isDrawerOpen, isFilterModalOpen]);

  const filteredArtists = drawerSourceArtists.filter((artist) => {
    const searchLower = drawerSearch.toLowerCase();
    return (
      artist.name.toLowerCase().includes(searchLower) ||
      (artist.generation && artist.generation.toLowerCase().includes(searchLower))
    );
  });

  const hasActiveFilters = selectedAgency !== 'all' || selectedGeneration !== 'all';

  // Modal megnyitásakor azonnal 'all'-ra tesszük a kategóriát, hogy ne ragadjon benn pl. 'solo'-ban
  const handleOpenFilterModal = () => {
    if (selectedGender !== 'all') {
      onSelectGender('all');
    }
    setIsFilterModalOpen(true);
  };

  // Segédfüggvény a kategória rövidítéséhez a gyorslistában
  const getCategoryShortLabel = (category: ArtistIndexItem['category']) => {
    switch (category) {
      case 'gg':
        return 'GG';
      case 'bg':
        return 'BG';
      case 'coed':
        return 'Co-ed';
      default:
        return 'Solo';
    }
  };

  return (
    <>
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 mb-8">
        <div className="flex flex-col gap-3.5 pb-6 border-b border-zinc-200/80">
          
          {/* 1. SOR: Fő kategóriák */}
          <div className="w-full overflow-x-auto pb-1 no-scrollbar flex items-center gap-2">
            {GENDER_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onSelectGender(opt.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
                  selectedGender === opt.id
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-zinc-200/60 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* 2. SOR: Kereső, Filter gomb, Index gomb és Találati szám */}
          <div className="flex items-center justify-between gap-2.5 flex-wrap sm:flex-nowrap pt-1">
            
            {/* Keresőmező */}
            <div className="relative flex-1 min-w-40 sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Künstler suchen..."
                className="w-full bg-zinc-100 text-zinc-800 text-xs font-normal rounded-full pl-9 pr-8 py-2 border border-zinc-200 focus:border-zinc-400 focus:bg-white focus:outline-none transition-all"
              />
              {searchQuery && (
                <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Asztali nézet aktív szűrő info */}
            <div className="hidden md:flex items-center gap-4 text-xs text-zinc-500 font-medium">
              <span>Agentur: <strong className="text-zinc-800">{AGENCIES.find(a => a.id === selectedAgency)?.label}</strong></span>
              <span>Generation: <strong className="text-zinc-800">{selectedGeneration === 'all' ? 'Alle' : `${selectedGeneration}. Gen`}</strong></span>
            </div>

            {/* Jobb oldali akció gombok és találat */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleOpenFilterModal}
                className={`relative px-3.5 py-2 rounded-full border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  hasActiveFilters 
                    ? 'bg-amber-500 text-black border-amber-600 font-bold' 
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-700'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filter</span>
                {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-black animate-ping absolute -top-0.5 -right-0.5" />}
              </button>

              <button
                onClick={() => setIsDrawerOpen(true)}
                className="px-3.5 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                <span>Index ({drawerSourceArtists.length})</span>
              </button>

              <span className="text-[11px] font-medium text-zinc-500 whitespace-nowrap px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200/60 hidden xs:inline-block">
                {totalCount} Treffer
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* --- RÉSZLETES SZŰRŐ MODAL --- */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div onClick={() => setIsFilterModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />
          <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl z-10 border border-zinc-200 space-y-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <h3 className="text-base font-bold text-zinc-900">Erweiterte Filter</h3>
              <button onClick={() => setIsFilterModalOpen(false)} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">Agentur / Label</label>
              <div className="grid grid-cols-2 gap-2">
                {AGENCIES.map((agency) => (
                  <button
                    key={agency.id}
                    onClick={() => { onSelectAgency(agency.id); }}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all cursor-pointer border ${
                      selectedAgency === agency.id
                        ? 'bg-zinc-900 text-white border-zinc-900 font-bold shadow-sm'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {agency.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">Generation</label>
              <div className="flex flex-wrap gap-2">
                {generationOptions.map((gen) => (
                  <button
                    key={gen.id}
                    onClick={() => { onSelectGeneration(gen.id); }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                      selectedGeneration === gen.id
                        ? 'bg-zinc-900 text-white border-zinc-900 font-bold shadow-sm'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {gen.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <button
                onClick={() => {
                  onSelectAgency('all');
                  onSelectGeneration('all');
                  onSelectGender('all');
                }}
                className="text-xs text-zinc-500 hover:text-zinc-900 font-medium underline cursor-pointer"
              >
                Filter zurücksetzen
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 cursor-pointer shadow-md"
              >
                Anwenden ({modalFilteredCount} Treffer)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- SCHNELLINDEX DRAWER --- */}
      {isDrawerOpen && (
        <div onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 transition-opacity" />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0c0c10] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-50 transform transition-transform duration-300 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#121218]/50 backdrop-blur-md">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-pink-500 font-extrabold block">Schnellnavigation</span>
            <h3 className="text-xl font-black text-white">Komplette Künstlerliste</h3>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer">✕</button>
        </div>

        <div className="p-4 border-b border-white/5 bg-[#0e0e14]">
          <input
            type="text"
            placeholder="Suche nach Name oder Generation (z.B. 4th)..."
            value={drawerSearch}
            onChange={(e) => setDrawerSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500/50 transition-all"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => {
              const themeColor = artist.themeColor || '#ec4899';
              return (
                <button
                  key={artist.id}
                  onClick={() => { onSelectArtist(artist.id); setIsDrawerOpen(false); }}
                  style={
                    {
                      '--hover-bg': `${themeColor}0d`,
                      '--hover-border': `${themeColor}40`,
                    } as React.CSSProperties
                  }
                  className="w-full text-left px-3 py-2.5 rounded-xl bg-white/2 hover:bg-(--hover-bg) border border-white/5 hover:border-(--hover-border) transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-zinc-800 border border-white/10 shrink-0">
                      {artist.imageUrl ? (
                        <Image
                          src={artist.imageUrl}
                          alt={artist.name}
                          width={36}
                          height={36}
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-zinc-400">
                          {artist.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-start">
                      <span className="text-sm font-bold text-zinc-200 group-hover:text-white tracking-wide transition-colors">
                        {artist.name}
                      </span>
                      {artist.generation && (
                        <span className="text-[9px] font-bold text-zinc-500 group-hover:text-pink-400 transition-colors uppercase">
                          {artist.generation} Gen
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">
                    {getCategoryShortLabel(artist.category)}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="text-center py-10 text-zinc-500 text-sm">Keine Ergebnisse gefunden.</div>
          )}
        </div>
      </div>
    </>
  );
}