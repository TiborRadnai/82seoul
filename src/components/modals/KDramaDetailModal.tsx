"use client";

import { useEffect } from "react";
import { X, Star, Calendar, Tv, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import PlatformLogo from "@/components/PlatformLogo";

export interface ActorItem {
  name: string;
  id?: string;
  image?: string;
  role?: string;
}

export interface KDramaItem {
  _id?: string;
  id?: string;
  slug?: { current: string };
  title: string;
  koreanTitle?: string;
  type?: 'series' | 'movie';
  tagline?: string;
  description?: string;
  platform?: string;
  releaseYear?: string | number;
  episodes?: string | number;
  image: string;
  wideImage?: string;
  rating?: string | number;
  featured?: boolean;
  cast?: (ActorItem | any)[];
}

interface KDramaDetailModalProps {
  drama: KDramaItem | null;
  onClose: () => void;
}

export default function KDramaDetailModal({ drama, onClose }: KDramaDetailModalProps) {
  // Schließen bei ESC-Taste
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (drama) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drama, onClose]);

  if (!drama) return null;

  // Unterseiten-Link generieren
  const detailUrl = drama.id ? `/kdrama/${drama.id}` : drama.slug?.current ? `/kdrama/${drama.slug.current}` : '#';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      
      {/* Abgedunkelter Hintergrund */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity"
      />

      {/* Dunkles Glassmorphismus-Modal-Fenster - Kisebb rádiusszal */}
      <div className="relative w-full max-w-4xl bg-neutral-900/95 text-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row border border-white/15 backdrop-blur-2xl">
        
        {/* Schließen-Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-lg bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/25 cursor-pointer shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Linke Seite: Reines PORTRAIT-Posterbild */}
        <div className="md:w-[40%] relative min-h-87.5 md:min-h-125 bg-neutral-950 overflow-hidden shrink-0 flex items-center justify-center">
          <img
            src={drama.image}
            alt={drama.title}
            className="w-full h-full object-cover object-center absolute inset-0"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-neutral-900/80" />
          
          {/* URSPRÜNGLICHES PLATFORMLOGO EINGEBUNDEN */}
          {drama.platform && (
            <div className="absolute top-4 left-4 z-20">
              <PlatformLogo platform={drama.platform} />
            </div>
          )}
        </div>

        {/* Rechte Seite: Details */}
        <div className="md:w-[60%] p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            
            {/* Titel und koreanischer Titel */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {drama.title}
              </h2>
              {drama.koreanTitle && (
                <p className="text-neutral-400 text-sm font-medium mt-1">
                  {drama.koreanTitle}
                </p>
              )}
              {drama.tagline && (
                <p className="text-rose-400/90 text-xs font-medium italic mt-1">
                  {drama.tagline}
                </p>
              )}
            </div>

            {/* Meta-Daten */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold text-neutral-300">
              {drama.rating && (
                <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{drama.rating}</span>
                </div>
              )}
              {drama.releaseYear && (
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-neutral-300">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{drama.releaseYear}</span>
                </div>
              )}
              {drama.episodes && (
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-neutral-300">
                  <Tv className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{drama.episodes} Episoden</span>
                </div>
              )}
            </div>

            {/* Handlung / Beschreibung */}
            {drama.description && (
              <div className="pt-1">
                <p className="text-neutral-300 text-sm leading-relaxed font-light line-clamp-3">
                  {drama.description}
                </p>
              </div>
            )}

            {/* Schauspieler */}
            {drama.cast && drama.cast.length > 0 && (
              <div className="pt-1">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Hauptbesetzung
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {drama.cast.map((actor, idx: number) => (
                    <div key={idx} className="relative group">
                      <span className="inline-block px-3 py-1 rounded-lg bg-white/10 hover:bg-rose-600 hover:text-white text-neutral-200 text-xs font-medium cursor-pointer transition-all duration-300 border border-white/10 shadow-xs">
                        {actor.name}
                      </span>

                      {actor.image && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform group-hover:-translate-y-1 z-30 w-44 bg-black/95 text-white rounded-xl p-2.5 shadow-2xl border border-white/20 backdrop-blur-xl text-center">
                          {/* Álló képarány (h-32 helyett h-48) és object-top, hogy a fejek ne lógjanak ki */}
                          <div className="w-full h-48 rounded-lg overflow-hidden mb-2 bg-neutral-800">
                            <img
                              src={actor.image}
                              alt={actor.name}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <p className="font-bold text-xs leading-snug">{actor.name}</p>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/95" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Untere Leiste: Schließen + Weiter-Button zur Unterseite */}
          <div className="pt-4 border-t border-white/15 flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs tracking-wider uppercase rounded-lg transition-all duration-300 border border-white/10 cursor-pointer"
            >
              Schließen
            </button>

            <Link
              href={detailUrl}
              onClick={onClose}
              className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wider uppercase rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Details ansehen</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}