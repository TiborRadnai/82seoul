'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface FilmItem {
  mediaType?: 'series' | 'movie';
  year: string;
  title: string;
  role?: string;
}

interface ActorModalProps {
  actor: {
    name: string;
    originalName?: string;
    image?: string;
    birthDate?: string;
    birthPlace?: string;
    instagramUrl?: string;
    education?: string;
    debutYear?: string;
    bio?: string;
    filmography?: FilmItem[];
  } | null;
  onClose: () => void;
}

export default function ActorModal({ actor, onClose }: ActorModalProps) {
  const [activeTab, setActiveTab] = useState<'bio' | 'filmography'>('bio');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!actor) return null;

  const calculateAge = (dateString?: string) => {
    if (!dateString) return null;
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const age = calculateAge(actor.birthDate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-neutral-950/80 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Finomabb háttér kattintás */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Barátságosabb, prémium, melegebb tónusú doboz */}
      <div className="relative z-10 w-full max-w-5xl bg-linear-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-700/50 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.6)] overflow-hidden p-6 md:p-10 text-neutral-100 flex flex-col max-h-[90vh]">
        
        {/* Bezárás gomb */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 border border-neutral-700/70 flex items-center justify-center text-neutral-300 transition-all shadow-md group"
          title="Bezárás"
        >
          <span className="text-lg font-light group-hover:scale-110 transition-transform">✕</span>
        </button>

        {/* --- FEJLÉC RÉSZ --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-neutral-800 pb-6 mb-6 pr-12 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400/90">
                Színész Adatlap {actor.originalName && `• ${actor.originalName}`}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              {actor.name}
            </h2>
          </div>

          {/* Instagram gomb */}
          {actor.instagramUrl && (
            <a 
              href={actor.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2.5 py-2.5 px-5 rounded-xl bg-neutral-800/90 hover:bg-amber-400 hover:text-neutral-950 border border-neutral-700 text-xs font-bold tracking-wide uppercase text-neutral-200 transition-all shadow-sm group self-start md:self-auto"
            >
              <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>
          )}
        </div>

        {/* --- FŐ TARTALOM --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start overflow-y-auto pr-1 custom-scrollbar">
          
          {/* Bal oszlop: Kép */}
          <div className="md:col-span-4 flex flex-col items-center">
            {actor.image ? (
              <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-700 shadow-xl">
                <Image 
                  src={actor.image} 
                  alt={actor.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <div className="w-full aspect-3/4 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 text-sm">
                Nincs kép
              </div>
            )}
          </div>

          {/* Jobb oszlop: Adatok és Fülek */}
          <div className="md:col-span-8 flex flex-col space-y-5">
            
            {/* Meta Adatok Kártyák */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-neutral-800/40 border border-neutral-700/60 text-xs md:text-sm">
              {actor.birthDate && (
                <div className="space-y-0.5">
                  <span className="text-neutral-400 font-medium block text-[11px] uppercase tracking-wider">Születés / Kor</span>
                  <span className="text-neutral-100 font-semibold">
                    {actor.birthDate} <span className="text-amber-400 font-normal">{age !== null && `(${age} éves)`}</span>
                  </span>
                </div>
              )}
              {actor.birthPlace && (
                <div className="space-y-0.5">
                  <span className="text-neutral-400 font-medium block text-[11px] uppercase tracking-wider">Születési hely</span>
                  <span className="text-neutral-100 font-semibold">{actor.birthPlace}</span>
                </div>
              )}
              {actor.education && (
                <div className="space-y-0.5 col-span-2 pt-2 border-t border-neutral-700/50">
                  <span className="text-neutral-400 font-medium block text-[11px] uppercase tracking-wider">Iskola / Végzettség</span>
                  <span className="text-neutral-200 font-medium">{actor.education}</span>
                </div>
              )}
              {actor.debutYear && (
                <div className="space-y-0.5 col-span-2 pt-1">
                  <span className="text-neutral-400 font-medium block text-[11px] uppercase tracking-wider">Aktív évek</span>
                  <span className="text-neutral-200 font-medium">{actor.debutYear}</span>
                </div>
              )}
            </div>

            {/* Fül Választó */}
            <div className="flex border-b border-neutral-800 space-x-8 text-sm">
              <button
                onClick={() => setActiveTab('bio')}
                className={`pb-2.5 font-bold transition-all border-b-2 tracking-wide ${
                  activeTab === 'bio' 
                    ? 'border-amber-400 text-amber-400' 
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Életrajz
              </button>
              <button
                onClick={() => setActiveTab('filmography')}
                className={`pb-2.5 font-bold transition-all border-b-2 tracking-wide flex items-center space-x-2 ${
                  activeTab === 'filmography' 
                    ? 'border-amber-400 text-amber-400' 
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span>Filmográfia</span>
                {actor.filmography && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-800 text-amber-300 font-mono">
                    {actor.filmography.length}
                  </span>
                )}
              </button>
            </div>

            {/* Tartalom doboz */}
            <div className="min-h-45 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {activeTab === 'bio' ? (
                <div className="space-y-3">
                  {actor.bio ? (
                    <p className="text-neutral-300 font-light text-sm md:text-base leading-relaxed whitespace-pre-line">
                      {actor.bio}
                    </p>
                  ) : (
                    <p className="text-neutral-500 italic text-sm py-4">
                      Ehhez a színészhez jelenleg nincs részletes életrajz feltöltve.
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  {actor.filmography && actor.filmography.length > 0 ? (
                    <div className="divide-y divide-neutral-800/60">
                      {actor.filmography.map((item, index) => {
                        const isMovie = item.mediaType === 'movie';
                        
                        return (
                          /* Rácsos (Grid) elrendezés a tökéletes igazításhoz keretek nélkül */
                          <div 
                            key={index} 
                            className="py-2.5 grid grid-cols-[85px_1fr_auto] items-center gap-3 text-sm group hover:bg-neutral-800/40 px-2 rounded-xl transition-colors"
                          >
                            {/* 1. Oszlop: Évszám Badge (színezve típus szerint) */}
                            <div>
                              <span className={`inline-block text-center text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border ${
                                isMovie 
                                  ? 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20'     // Filmek (kékes)
                                  : 'text-amber-400 bg-amber-400/10 border-amber-400/20'   // Sorozatok (borostyán)
                              }`}>
                                {item.year}
                              </span>
                            </div>

                            {/* 2. Oszlop: Film / Sorozat címe */}
                            <div className="text-neutral-200 font-medium group-hover:text-white transition-colors truncate">
                              {item.title}
                            </div>

                            {/* 3. Oszlop: Karakter / Szerep */}
                            <div>
                              {item.role ? (
                                <span className="text-xs text-neutral-400 italic bg-neutral-950/60 px-2.5 py-1 rounded-lg border border-neutral-800 whitespace-nowrap">
                                  {item.role}
                                </span>
                              ) : (
                                <span />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-neutral-500 italic text-sm py-8 text-center">
                      Nincs rögzített filmográfia ehhez a művészhez.
                    </p>
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}