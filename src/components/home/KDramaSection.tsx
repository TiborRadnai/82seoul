"use client";

import { useState, useEffect } from "react";
import { Film, ChevronLeft, ChevronRight, Star, ArrowUpRight, Play, Sparkles } from "lucide-react";
import { DRAMA_SLIDES, KDramaItem } from "../../data/kdramaData";
import KDramaDetailModal from "../modals/KDramaDetailModal";

export default function KDramaSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedDrama, setSelectedDrama] = useState<KDramaItem | null>(null);

  // Automatikus lapozás 5 másodpercenként (ha nincs nyitva a modal)
  useEffect(() => {
    if (selectedDrama) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, selectedDrama]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DRAMA_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DRAMA_SLIDES.length) % DRAMA_SLIDES.length);
  };

  const handleCardClick = (drama: KDramaItem) => {
    setSelectedDrama(drama);
  };

  const currentSlide = DRAMA_SLIDES[currentIndex];

  return (
    <section className="w-full py-24 md:py-36 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-800/60">
      
      {/* Finom mozi-hangulatú háttérfények (Cinematic Glow) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-125 h-125 bg-linear-to-br from-rose-950/20 via-neutral-900/40 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-100 h-100 bg-linear-to-tl from-amber-950/15 via-slate-900/30 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Tágas, 1600px-es konténer */}
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* BAL OLDAL: Címsor, Leírás, CTA & Gyors nézet */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left flex flex-col justify-between h-full">
            
            <div className="space-y-6">
              {/* Sötét Mozi Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700/60 text-rose-400 text-xs font-bold tracking-widest uppercase shadow-md">
                <Film className="w-3.5 h-3.5 stroke-[1.75] text-rose-500" />
                <span>KOREAN SERIES & DRAMA</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-white">
                Történetek, amik <br className="hidden sm:block" />
                <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-rose-400 via-amber-200 to-rose-300">
                  magukkal ragadnak.
                </span>
              </h2>

              <p className="text-neutral-300 text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                A szívmelengető romantikus vígjátékoktól a feszült és izgalmas
                thrillerekig – nálunk megtalálod a legújabb dél-koreai
                sikersorozatok kritikáit, kibeszélőit és a legfrissebb streaming híreket.
              </p>

              {/* SÖTÉT MOZI CTA GOMB */}
              <div className="pt-2 flex justify-center lg:justify-start">
                <a
                  href="#kdrama"
                  className="inline-flex items-center gap-3 px-9 py-4 bg-linear-to-r from-rose-600 via-rose-700 to-rose-800 hover:from-rose-500 hover:to-rose-700 text-white font-bold text-xs md:text-sm tracking-wider uppercase rounded-full shadow-[0_10px_30px_rgba(225,29,72,0.3)] hover:shadow-[0_15px_35px_rgba(225,29,72,0.45)] border border-rose-500/40 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
                  <span>SOROZATOK FELFEDEZÉSE</span>
                  <span className="text-base text-rose-200 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">➔</span>
                </a>
              </div>
            </div>

            {/* AKTÍV DIA AKTUÁLIS INFÓ BLOKK (Kiterjeszti a bal oldalt, megszünteti a lyukat) */}
            <div className="hidden lg:block pt-8 border-t border-neutral-800/80 mt-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-medium uppercase tracking-wider mb-3">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Kiemelt Ajánló
                </span>
                <span>{currentIndex + 1} / {DRAMA_SLIDES.length}</span>
              </div>
              
              <div className="bg-neutral-900/60 backdrop-blur-md rounded-2xl p-4 border border-neutral-800 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white line-clamp-1">{currentSlide.title}</div>
                  <div className="text-xs text-neutral-400">{currentSlide.category}</div>
                </div>
                <button
                  onClick={() => handleCardClick(currentSlide)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-rose-300 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Részletek</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* JOBB OLDAL: Nagy Luxus Poszter Kártya + Mini Thumbnail Sorozat */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-end gap-6">
            
            {/* FŐ POSZTER KÁRTYA */}
            <div className="relative group w-full max-w-2xl">
              <div 
                onClick={() => handleCardClick(currentSlide)}
                className="relative rounded-[36px] md:rounded-[44px] overflow-hidden border border-neutral-700/50 bg-black shadow-[0_30px_90px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 hover:shadow-[0_40px_100px_-15px_rgba(225,29,72,0.2)] hover:border-neutral-500 hover:-translate-y-2 h-135 sm:h-150 md:h-160 cursor-pointer ring-1 ring-white/10"
              >
                
                {/* Diaképek áttűnéssel (Cross-fade) */}
                {DRAMA_SLIDES.map((slide: KDramaItem, idx: number) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    {/* Mélyített mozis sötétítés */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 via-60% to-black/30" />

                    {/* Lebegő Glassmorphic Fejléc ELEMEK */}
                    <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 z-20 flex items-center justify-between">
                      <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        <span>{slide.category}</span>
                      </div>

                      <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-rose-600 group-hover:border-rose-500 shadow-lg">
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    {/* Kártya alsó tartalom */}
                    <div className="absolute bottom-0 inset-x-0 p-8 sm:p-10 md:p-12 space-y-3.5 text-white z-20">
                      <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{slide.rating}</span>
                        <span className="text-neutral-400 text-xs font-normal opacity-90">(K-Drama Edit)</span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
                        {slide.title}
                      </h3>

                      <p className="text-sm md:text-base text-neutral-300 font-normal line-clamp-2 leading-relaxed drop-shadow-md max-w-lg">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Léptető nyilak */}
                <button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Előző borítókép"
                  className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-rose-600 hover:text-white backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Következő borítókép"
                  className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-rose-600 hover:text-white backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

              </div>
            </div>

            {/* INTERAKTÍV BÉLYEGKÉP SIKER-SOR (THUMBNAIL STRIP) - Ez tölti ki a teret alsó irányban! */}
            <div className="w-full max-w-2xl grid grid-cols-4 gap-3">
              {DRAMA_SLIDES.map((slide: KDramaItem, idx: number) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative rounded-2xl overflow-hidden h-20 md:h-24 transition-all duration-300 border text-left cursor-pointer group ${
                      isActive
                        ? "border-rose-500 ring-2 ring-rose-500/50 scale-102 shadow-lg"
                        : "border-neutral-800 opacity-50 hover:opacity-100 hover:border-neutral-600"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-2 flex flex-col justify-end">
                      <span className="text-[10px] font-bold text-white line-clamp-1 leading-tight">
                        {slide.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* K-DRAMA DETAIL MODAL */}
      <KDramaDetailModal
        drama={selectedDrama}
        onClose={() => setSelectedDrama(null)}
      />
    </section>
  );
}