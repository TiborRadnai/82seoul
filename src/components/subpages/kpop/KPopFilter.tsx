'use client';

import React from 'react';

export type GenderCategory = 'top10' | 'all' | 'bg' | 'gg' | 'solo';
export type AgencyCategory = 'all' | 'HYBE' | 'SM' | 'YG' | 'JYP' | 'OTHER';

interface KPopFilterProps {
  selectedGender: GenderCategory;
  onSelectGender: (cat: GenderCategory) => void;
  selectedAgency: AgencyCategory;
  onSelectAgency: (agency: AgencyCategory) => void;
  totalCount: number;
}

const GENDER_OPTIONS: { id: GenderCategory; label: string }[] = [
  { id: 'top10', label: 'Top 10 Kiemelt' },
  { id: 'all', label: 'Összes Előadó' },
  { id: 'gg', label: 'Lánycsapatok' },
  { id: 'bg', label: 'Fiúcsapatok' },
  { id: 'solo', label: 'Szóló Előadók' },
];

const AGENCIES: { id: AgencyCategory; label: string }[] = [
  { id: 'all', label: 'Minden Kiadó' },
  { id: 'HYBE', label: 'HYBE' },
  { id: 'SM', label: 'SM Entertainment' },
  { id: 'YG', label: 'YG Entertainment' },
  { id: 'JYP', label: 'JYP Entertainment' },
  { id: 'OTHER', label: 'Egyéb Kiadók' },
];

export default function KPopFilter({
  selectedGender,
  onSelectGender,
  selectedAgency,
  onSelectAgency,
  totalCount,
}: KPopFilterProps) {
  return (
    <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 mb-12 sm:mb-16">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-zinc-300/80">
        
        {/* BAL OLDAL: KAPSZULA GOMBOK (A Header gomb stílusára hangolva) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {GENDER_OPTIONS.map((opt) => {
            const isActive = selectedGender === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectGender(opt.id)}
                className={`px-6 py-2.5 rounded-full text-[11px] font-extrabold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-lg scale-102'
                    : 'bg-zinc-300/40 text-zinc-700 hover:bg-zinc-900 hover:text-white border border-transparent'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* JOBB OLDAL: KIADÓ DROPDOWN ÉS KIS BADGE */}
        <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
          
          {/* Kiadó Dropdown */}
          <div className="relative">
            <select
              value={selectedAgency}
              onChange={(e) => onSelectAgency(e.target.value as AgencyCategory)}
              className="appearance-none bg-transparent text-zinc-900 border border-zinc-400/80 hover:border-zinc-900 font-sans text-[11px] font-extrabold tracking-widest uppercase rounded-full px-6 py-2.5 pr-10 focus:outline-none transition-all cursor-pointer"
            >
              {AGENCIES.map((agency) => (
                <option key={agency.id} value={agency.id} className="bg-white text-zinc-900 font-sans uppercase">
                  {agency.label}
                </option>
              ))}
            </select>
            {/* Nyíl ikon */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-800">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>

          {/* Találat számláló */}
          <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-600 bg-zinc-300/30 px-4 py-2 rounded-full border border-zinc-300/60">
            {totalCount} TALÁLAT
          </span>

        </div>

      </div>
    </div>
  );
}