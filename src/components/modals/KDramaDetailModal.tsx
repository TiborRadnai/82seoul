"use client";

import { useEffect } from "react";
import { X, Star, Calendar, Tv, User } from "lucide-react";
import { KDramaItem, CastMember } from "../../data/kdramaData";

interface KDramaDetailModalProps {
  drama: KDramaItem | null;
  onClose: () => void;
}

export default function KDramaDetailModal({ drama, onClose }: KDramaDetailModalProps) {
  // ESC billentyűre bezárás
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      
      {/* Sötétített háttér */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
      />

      {/* Sötét Üveghatású Modal Ablak */}
      <div className="relative w-full max-w-4xl bg-neutral-900/90 text-white rounded-4xl md:rounded-[40px] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row border border-white/15 backdrop-blur-2xl">
        
        {/* Bezáró gomb */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Bal oldal: Nagy poszter kép */}
        <div className="md:w-1/2 relative h-72 md:h-auto min-h-80">
          <img
            src={drama.image}
            alt={drama.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-neutral-900/90" />
          
          <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-white/20 shadow-lg">
            {drama.category}
          </div>
        </div>

        {/* Jobb oldal: Részletes infók */}
        <div className="md:w-1/2 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Cím és Eredeti Cím */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {drama.title}
              </h2>
              {drama.originalTitle && (
                <p className="text-neutral-400 text-sm font-medium mt-1">
                  {drama.originalTitle}
                </p>
              )}
            </div>

            {/* Meta adatok */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-neutral-300">
              <div className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{drama.rating}</span>
              </div>
              {drama.year && (
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-neutral-300">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{drama.year}</span>
                </div>
              )}
              {drama.episodes && (
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-neutral-300">
                  <Tv className="w-3.5 h-3.5" />
                  <span>{drama.episodes}</span>
                </div>
              )}
            </div>

            {/* Szinopszis */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
                Szinopszis
              </h3>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light">
                {drama.fullDescription || drama.description}
              </p>
            </div>

            {/* Színészek HOVER kártyával */}
            {drama.cast && drama.cast.length > 0 && (
              <div className="pt-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Főszereplők
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {drama.cast.map((actor: CastMember, idx: number) => (
                    <div key={idx} className="relative group">
                      
                      {/* Üveges Színész jelvény */}
                      <span className="inline-block px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white hover:text-black text-neutral-200 text-xs font-medium cursor-pointer transition-all duration-300 border border-white/10 shadow-xs">
                        {actor.name}
                      </span>

                      {/* HOVER POPUP KÁRTYA */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform group-hover:-translate-y-1 z-30 w-44 bg-black/95 text-white rounded-2xl p-2.5 shadow-2xl border border-white/20 backdrop-blur-xl text-center">
                        <div className="w-full h-32 rounded-xl overflow-hidden mb-2 bg-neutral-800">
                          <img
                            src={actor.image}
                            alt={actor.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300";
                            }}
                          />
                        </div>
                        <p className="font-bold text-xs leading-snug">{actor.name}</p>
                        {actor.role && (
                          <p className="text-[10px] text-neutral-400 font-light mt-0.5">
                            mint <span className="text-amber-400 font-medium">{actor.role}</span>
                          </p>
                        )}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/95" />
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bezárás gomb */}
          <div className="pt-4 border-t border-white/10">
            <button 
              onClick={onClose}
              className="w-full py-3.5 bg-white/10 hover:bg-white hover:text-black text-white font-bold text-xs tracking-wider uppercase rounded-2xl transition-all duration-300 border border-white/10"
            >
              Ablak bezárása
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}