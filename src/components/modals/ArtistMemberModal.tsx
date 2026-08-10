'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

interface Member {
  name: string;
  fullName?: string;
  koreanName?: string;
  role?: string;
  birthDate?: string;
  zodiac?: string;
  height?: string;
  bloodType?: string;
  birthPlace?: string;
  signatureTrack?: string;
  brandAmbassador?: string;
  instagram?: string;
  quote?: string;
  shortBio?: string;
  image?: string;
}

interface ArtistMemberModalProps {
  member: Member | null;
  isOpen: boolean;
  onClose: () => void;
  themeColor?: string; // <-- Új prop a dinamikus egyedi színhez
}

export default function ArtistMemberModal({ member, isOpen, onClose, themeColor = '#ec4899' }: ArtistMemberModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Sötétített háttér */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/90 transition-opacity duration-300"
      />

      {/* Hatalmas, prémium magazin modal konténer */}
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0b0b0e] border border-white/10 shadow-[0_25px_100px_rgba(0,0,0,0.9)] z-10 flex flex-col no-scrollbar">
        
        {/* Felső elegáns sáv */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#121216]">
          <div className="flex items-center gap-3">
            <span 
              className="w-2.5 h-2.5 rounded-full animate-pulse" 
              style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }} 
            />
            <span className="text-xs uppercase tracking-[0.4em] text-zinc-400 font-extrabold">
              82Seoul // Exkluzív Adatbázis & Magazin
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-zinc-300 transition-all cursor-pointer flex items-center gap-2 hover:text-white"
            style={{ '--hover-bg': themeColor } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = themeColor;
              e.currentTarget.style.borderColor = themeColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <span>Bezárás</span>
            <span className="text-sm">✕</span>
          </button>
        </div>

        {/* Tartalom grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-10 gap-8 items-start">
          
          {/* Bal oldal: Kép és Instagram logós sáv */}
          <div className="relative lg:col-span-6 h-100 sm:h-125 lg:h-150 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group flex flex-col justify-end">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">Nincs kép</div>
            )}
            <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0e] via-transparent to-transparent opacity-60" />
            
            {/* Instagram gomb SVG logóval */}
            {member.instagram && (
              <a 
                href={`https://instagram.com/${member.instagram.replace('@', '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative z-10 m-4 p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-between transition-all group/insta hover:border-white/40"
              >
                <div className="flex items-center gap-3">
                  <svg 
                    className="w-5 h-5 group-hover/insta:scale-110 transition-transform" 
                    style={{ color: themeColor }} 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-xs font-bold text-white tracking-wide">Hivatalos Instagram</span>
                </div>
                <span className="text-xs font-semibold group-hover/insta:translate-x-0.5 transition-transform" style={{ color: themeColor }}>
                  {member.instagram} ↗
                </span>
              </a>
            )}
          </div>

          {/* Jobb oldal: Részletes infók */}
          <div className="lg:col-span-6 flex flex-col justify-between text-left space-y-5">
            
            <div>
              {/* Pozíció & Koreai név */}
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs uppercase tracking-[0.3em] font-extrabold" style={{ color: themeColor }}>
                  {member.role || 'Tag'}
                </span>
                {member.koreanName && (
                  <span className="text-lg font-bold text-zinc-400 tracking-widest bg-white/5 px-3 py-1 rounded-lg border border-white/10">
                    {member.koreanName}
                  </span>
                )}
              </div>

              {/* Név & Teljes név */}
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter mb-1">
                {member.name}
              </h2>
              {member.fullName && (
                <p className="text-sm font-semibold text-zinc-400 mb-4 tracking-wide">
                  {member.fullName}
                </p>
              )}

              {/* Fő leírás */}
              {member.shortBio && (
                <div className="mb-5 p-4 rounded-2xl bg-[#141419] border border-white/10">
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {member.shortBio}
                  </p>
                </div>
              )}

              {/* Alap kis kártyák */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                {member.birthDate && (
                  <div className="p-3 rounded-2xl bg-[#141419] border border-white/10">
                    <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">Születési idő</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{member.birthDate}</span>
                  </div>
                )}
                {member.zodiac && (
                  <div className="p-3 rounded-2xl bg-[#141419] border border-white/10">
                    <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">Csillagjegy</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{member.zodiac}</span>
                  </div>
                )}
                {member.height && (
                  <div className="p-3 rounded-2xl bg-[#141419] border border-white/10">
                    <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">Magasság</span>
                    <span className="text-xs sm:text-sm font-bold text-white">{member.height}</span>
                  </div>
                )}
              </div>

              {/* Aszimmetrikus / Párosított elrendezés */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-3">
                <div className="sm:col-span-7 flex flex-col gap-3">
                  {member.brandAmbassador && (
                    <div className="p-3.5 rounded-2xl bg-[#141419] border border-white/10 flex-1">
                      <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">Márkanagykövet</span>
                      <span className="text-sm font-bold" style={{ color: themeColor }}>{member.brandAmbassador}</span>
                    </div>
                  )}
                  {member.birthPlace && (
                    <div className="p-3.5 rounded-2xl bg-[#141419] border border-white/10 flex-1">
                      <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">Születési hely</span>
                      <span className="text-sm font-semibold text-white">{member.birthPlace}</span>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-5 flex flex-col gap-3">
                  {member.bloodType && (
                    <div className="p-3.5 rounded-2xl bg-[#141419] border border-white/10">
                      <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">Vércsoport</span>
                      <span className="text-sm font-bold text-white">{member.bloodType}</span>
                    </div>
                  )}
                  {member.signatureTrack && (
                    <div className="p-3.5 rounded-2xl bg-[#141419] border border-white/10">
                      <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">Signature Track</span>
                      <span className="text-sm font-bold" style={{ color: themeColor }}>{member.signatureTrack}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Híres idézet */}
              {member.quote && (
                <div 
                  className="p-4 rounded-2xl border relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(to right, ${themeColor}15, rgba(168,85,247,0.15))`,
                    borderColor: `${themeColor}40`
                  }}
                >
                  <div className="absolute top-2 right-4 text-4xl font-serif select-none opacity-20" style={{ color: themeColor }}>“</div>
                  <span className="block text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color: themeColor }}>Híres idézet</span>
                  <p className="text-xs sm:text-sm text-white font-medium italic relative z-10">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}