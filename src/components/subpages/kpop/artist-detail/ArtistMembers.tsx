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
}

export default function ArtistMembers({ membersList, onMemberClick }: ArtistMembersProps) {
  if (!membersList || membersList.length === 0) return null;

  // Az aktuálisan kiválasztott tag állapota (alapból az első)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeMember = membersList[selectedIndex];

  return (
    <section className="w-full py-28 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* Szekció cím */}
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-[0.4em] text-pink-500 font-extrabold block mb-3">
          Interaktív Magazin
        </span>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          A Csapat <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500">Arcai</span>
        </h2>
      </div>

      {/* Fő magazin-stílusú kiemelt kártya */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-linear-to-b from-white/8 to-white/2 border border-white/10 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 mb-10">
        
        {/* Bal oldal: Hatalmas, magazin stílusú fókusz kép (PC-n hover nagyítással, kattintásra modallal) */}
        <div 
          onClick={() => onMemberClick && onMemberClick(activeMember)}
          className="relative lg:col-span-7 h-100 sm:h-125 lg:h-150 overflow-hidden group cursor-pointer"
        >
          {activeMember.image && (
            <Image
              key={activeMember.name} // Biztosítja a sima váltási animációt
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
          <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-xs font-bold text-pink-400 tracking-wider uppercase shadow-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
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
            <span className="text-xs uppercase tracking-[0.3em] text-pink-400 font-bold">
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

          {/* Gyorsinfó badge-ek (Születésnap, Magasság) */}
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

          {/* Szaftos rövid leírás / Kulisszatitok */}
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-4">
            {activeMember.shortBio || 'Kattints a képre a részletes profil (születésnap, csillagjegy, becenevek és márkák) megnyitásához!'}
          </p>
        </div>
      </div>

      {/* Alatta lévő minimál váltó sáv (Miniatűrök / Nevek gombjai) */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {membersList.map((member, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`group relative px-6 py-3 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center gap-3 border ${
                isActive
                  ? 'bg-linear-to-r from-pink-500 to-purple-600 text-white border-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.4)] scale-105'
                  : 'bg-white/3 text-zinc-400 border-white/10 hover:bg-white/8 hover:text-white hover:border-white/20'
              }`}
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