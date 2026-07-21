"use client";

import { useEffect } from "react";
import { X, Film, Star, Sparkles, ExternalLink } from "lucide-react";

export type KDramaSlideData = {
  id: number;
  title: string;
  rating: string;
  category: string;
  description: string;
  image: string;
};

interface KDramaDetailModalProps {
  drama: KDramaSlideData | null;
  onClose: () => void;
}

export default function KDramaDetailModal({ drama, onClose }: KDramaDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (drama) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drama, onClose]);

  if (!drama) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Sötétített glassmorphic háttér */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Ablak */}
      <div className="relative w-full max-w-3xl bg-neutral-900 text-white rounded-4xl md:rounded-[40px] overflow-hidden border border-white/15 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.7)] z-10 max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Bezáró gomb */}
        <button
          onClick={onClose}
          aria-label="Modal bezárása"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* BAL OLDAL: Borítókép */}
        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto relative shrink-0">
          <img
            src={drama.image}
            alt={drama.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-black/20 md:bg-linear-to-r md:from-transparent md:to-neutral-900" />
          
          <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>{drama.category}</span>
          </div>
        </div>

        {/* JOBB OLDAL: Tartalom */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Értékelés */}
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{drama.rating}</span>
              <span className="text-neutral-400 text-xs font-normal">(82Seoul Edit)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {drama.title}
            </h2>

            <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              {drama.description}
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                  Műfaj / Kategória
                </div>
                <div className="text-sm font-semibold text-white mt-0.5 line-clamp-1">
                  {drama.category}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                  Értékelés
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">
                  {drama.rating} / 5.0
                </div>
              </div>
            </div>
          </div>

          {/* Alsó Akció gombok */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <a
              href={`#drama-${drama.id}`}
              className="flex-1 py-3.5 px-6 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Kritika Elolvasása</span>
            </a>

            <button 
              aria-label="Megosztás"
              className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all duration-300 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}