'use client';

import React from 'react';

export type GenderCategory = 'top10' | 'all' | 'bg' | 'gg' | 'solo';
export type AgencyCategory = 'all' | 'HYBE' | 'SM' | 'YG' | 'JYP' | 'OTHER';

interface KPopFilterProps {
  selectedGender: GenderCategory;
  onSelectGender: (cat: GenderCategory) => void;
  selectedAgency: AgencyCategory;
  onSelectAgency: (agency: AgencyCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
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
}: KPopFilterProps) {
  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 mb-10">
      
      {/* ELRENDEZÉS: Mobilon függőlegesen szeparált, Desktopon egy soros */}
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 pb-6 border-b border-zinc-200/80">
        
        {/* BAL OLDAL: KATEGÓRIÁK ÉS KIADÓ DROPDOWN (Mobilon görgethető sáv) */}
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

          {/* Kis elválasztó vonal (Desktopon látható) */}
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

        {/* JOBB OLDAL: KERESŐINPUT ÉS TALÁLATI SZÁMLÁLÓ */}
        <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end">
          
          {/* Keresőmező */}
          <div className="relative w-full sm:w-64">
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
  );
}