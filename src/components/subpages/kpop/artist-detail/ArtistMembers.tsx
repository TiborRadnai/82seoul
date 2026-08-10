'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Member {
  name: string;
  fullName?: string;
  koreanName?: string;
  role?: string;
  birthDate?: string;
  height?: string;
  shortBio?: string;
  image?: string;
}

interface ArtistMembersProps {
  membersList?: Member[];
  onMemberClick?: (member: Member) => void;
  themeColor?: string; // <-- Új prop a dinamikus egyedi színhez
  category?: 'gg' | 'bg' | 'solo'; // <-- 1. Hozzáadjuk a kategóriát
}

export default function ArtistMembers({ membersList, onMemberClick, themeColor = '#ec4899', category }: ArtistMembersProps) {
  // 2. Ha szóló, vagy nincs taglista, azonnal kilépünk (láthatatlan lesz)
  if (category === 'solo' || !membersList || membersList.length === 0) return null;

  // Az aktuálisan kiválasztott tag állapota (alapból az első)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeMember = membersList[selectedIndex];

  return (
    <section className="w-full py-28 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* Szekció cím */}
      <div className="text-center mb-16">
        <span 
          className="text-xs uppercase tracking-[0.4em] font-extrabold block mb-3"
          style={{ color: themeColor }}
        >
          Interaktív Magazin
        </span>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          A Csapat <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #a855f7)` }}>Arcai</span>
        </h2>
      </div>

      {/* Fő magazin-stílusú kiemelt kártya */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-linear-to-b from-white/8 to-white/2 border border-white/10 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 mb-10">
        
        {/* Bal oldal: Hatalmas, magazin stílusú fókusz kép */}
        <div 
          onClick={() => onMemberClick && onMemberClick(activeMember)}
          className="relative lg:col-span-7 h-100 sm:h-125 lg:h-150 overflow-hidden group cursor-pointer"
        >
          {activeMember.image && (
            <Image
              key={activeMember.name} 
              src={activeMember.image}
              alt={activeMember.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center filter contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-transparent to-transparent opacity-80 lg:opacity-40" />
          
          {/* Interaktív "Kattints a részletekért" jelzés */}
          <div 
            className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-xs font-bold tracking-wider uppercase shadow-xl flex items-center gap-2"
            style={{ color: themeColor }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
            Kattints a részletekért
          </div>

          {/* Tag index a bal alsó sarokban */}
          <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-xs font-bold text-zinc-400 tracking-widest uppercase shadow-xl">
            0{selectedIndex + 1} / 0{membersList.length}
          </div>
        </div>

        {/* Jobb oldal: Valódi adatok és informatív leírás */}
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center text-left">
          
          {/* Fenti sáv: Pozíció és Koreai név */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <span 
              className="text-xs uppercase tracking-[0.3em] font-bold"
              style={{ color: themeColor }}
            >
              {activeMember.role || 'Tag'}
            </span>
            {activeMember.koreanName && (
              <span className="text-base font-bold text-zinc-400 tracking-wider">
                {activeMember.koreanName}
              </span>
            )}
          </div>
          
          {/* Művésznév */}
          <h3 className="text-4xl sm:text-5xl font-black text-white mb-1 tracking-tighter drop-shadow-lg">
            {activeMember.name}
          </h3>

          {/* Teljes név */}
          {activeMember.fullName && (
            <p className="text-xs sm:text-sm font-medium text-zinc-400 mb-4 tracking-wide">
              {activeMember.fullName}
            </p>
          )}

          {/* Gyorsinfó badge-ek */}
          {(activeMember.birthDate || activeMember.height) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeMember.birthDate && (
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
                  🎂 {activeMember.birthDate}
                </span>
              )}
              {activeMember.height && (
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
                  📏 {activeMember.height}
                </span>
              )}
            </div>
          )}

          {/* Szaftos rövid leírás */}
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-4">
            {activeMember.shortBio || 'Kattints a képre a részletes profil megnyitásához!'}
          </p>
        </div>
      </div>

      {/* Alatta lévő minimál váltó sáv */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {membersList.map((member, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`group relative px-6 py-3 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center gap-3 border ${
                isActive
                  ? 'text-white scale-105 shadow-xl'
                  : 'bg-white/3 text-zinc-400 border-white/10 hover:bg-white/8 hover:text-white hover:border-white/20'
              }`}
              style={
                isActive
                  ? {
                      backgroundColor: themeColor,
                      borderColor: themeColor,
                      boxShadow: `0 0 25px ${themeColor}66`
                    }
                  : {}
              }
            >
              {member.image && (
                <div className={`relative w-7 h-7 rounded-full overflow-hidden border ${isActive ? 'border-white' : 'border-white/20'}`}>
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
              )}
              <span>{member.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}