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
  themeColor?: string;
  category?: 'gg' | 'bg' | 'solo';
}

export default function ArtistMembers({ membersList, onMemberClick, themeColor = '#ec4899', category }: ArtistMembersProps) {
  if (category === 'solo' || !membersList || membersList.length === 0) return null;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeMember = membersList[selectedIndex];

  return (
    <section className="w-full py-16 sm:py-28 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto">
      {/* Szekció cím */}
      <div className="text-center mb-10 sm:mb-16">
        <span 
          className="text-[11px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold block mb-2 sm:mb-3"
          style={{ color: themeColor }}
        >
          Interaktív Magazin
        </span>
        <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-white">
          A Csapat <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #a855f7)` }}>Arcai</span>
        </h2>
      </div>

      {/* Fő magazin-stílusú kiemelt kártya (Mobilon rounded-2xl, desktopon rounded-3xl) */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-linear-to-b from-white/8 to-white/2 border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] sm:shadow-[0_30px_100px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 mb-8 sm:mb-10">
        
        {/* Bal oldal: Fókusz kép (Mobilon kisebb magasság, hogy ne lógjon szét) */}
        <div 
          onClick={() => onMemberClick && onMemberClick(activeMember)}
          className="relative lg:col-span-7 h-80 sm:h-125 lg:h-150 overflow-hidden group cursor-pointer"
        >
          {activeMember.image && (
            <Image
              key={activeMember.name} 
              src={activeMember.image}
              alt={activeMember.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top sm:object-center filter contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0c] via-transparent to-transparent opacity-80 lg:opacity-40" />
          
          {/* Interaktív "Kattints a részletekért" jelzés */}
          <div 
            className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xl flex items-center gap-2"
            style={{ color: themeColor }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
            Részletek
          </div>

          {/* Tag index a bal alsó sarokban */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 px-3 py-1.5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md text-[11px] sm:text-xs font-bold text-zinc-400 tracking-widest uppercase shadow-xl">
            0{selectedIndex + 1} / 0{membersList.length}
          </div>
        </div>

        {/* Jobb oldal: Adatok */}
        <div className="lg:col-span-5 p-6 sm:p-12 flex flex-col justify-center text-left">
          
          <div className="flex items-center justify-between gap-4 mb-2">
            <span 
              className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold"
              style={{ color: themeColor }}
            >
              {activeMember.role || 'Tag'}
            </span>
            {activeMember.koreanName && (
              <span className="text-sm sm:text-base font-bold text-zinc-400 tracking-wider">
                {activeMember.koreanName}
              </span>
            )}
          </div>
          
          <h3 className="text-3xl sm:text-5xl font-black text-white mb-1 tracking-tighter drop-shadow-lg">
            {activeMember.name}
          </h3>

          {activeMember.fullName && (
            <p className="text-xs sm:text-sm font-medium text-zinc-400 mb-3 sm:mb-4 tracking-wide">
              {activeMember.fullName}
            </p>
          )}

          {(activeMember.birthDate || activeMember.height) && (
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
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

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-3 sm:pt-4">
            {activeMember.shortBio || 'Kattints a képre a részletes profil megnyitásához!'}
          </p>
        </div>
      </div>

      {/* Alatta lévő minimál váltó sáv (Mobilon kompaktabb gombok) */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {membersList.map((member, index) => {
          const isActive = index === selectedIndex;
          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 sm:gap-3 border ${
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
                <div className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border ${isActive ? 'border-white' : 'border-white/20'}`}>
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