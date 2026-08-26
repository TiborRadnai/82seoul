"use client";

import { useState, useEffect } from "react";
import { Film, ChevronLeft, ChevronRight, Star, ArrowUpRight, Play, Sparkles } from "lucide-react";
import KDramaDetailModal from "../modals/KDramaDetailModal";
import { client } from "../../../sanity/lib/client";

export interface KDramaItem {
  _id: string;
  id: string;
  title: string;
  originalTitle?: string;
  category: string;
  rating: number;
  image: string;       
  wideImage: string;   
  description: string;
  fullDescription?: string;
  platform?: string;
  releaseYear?: string;
  episodes?: number;
  cast?: string[];
  director?: string;
  writer?: string;
  reviewSummary?: string;
  slug?: { current: string };
}

export default function KDramaSection() {
  const [dramas, setDramas] = useState<KDramaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedDrama, setSelectedDrama] = useState<KDramaItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDramas = async () => {
      try {
        const query = `*[_type == "drama" && featured == true] | order(order asc) {
          _id,
          "id": id,
          title,
          "originalTitle": koreanTitle,
          "category": type,
          rating,
          "image": coalesce(poster.asset->url, image.asset->url),      
          "wideImage": coalesce(wideImage.asset->url, image.asset->url), 
          description,
          platform,
          "releaseYear": releaseYear,
          episodes,
          cast[]->{
            name,
            id,
            "image": image.asset->url
          }
        }`;
        
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setDramas(data);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der K-Drama Daten:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDramas();
  }, []);

  useEffect(() => {
    if (selectedDrama || dramas.length === 0) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, selectedDrama, dramas.length]);

  const handleNext = () => {
    if (dramas.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % dramas.length);
  };

  const handlePrev = () => {
    if (dramas.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + dramas.length) % dramas.length);
  };

  const handleCardClick = (drama: KDramaItem) => {
    setSelectedDrama(drama);
  };

  if (loading) {
    return (
      <section className="w-full py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-800/60 flex items-center justify-center min-h-125">
        <div className="text-neutral-500 text-sm animate-pulse">K-Drama Daten werden geladen...</div>
      </section>
    );
  }

  if (dramas.length === 0) {
    return (
      <section className="w-full py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-800/60 flex items-center justify-center min-h-125">
        <div className="text-center space-y-3">
          <Film className="w-8 h-8 text-rose-500 mx-auto animate-bounce" />
          <p className="text-neutral-400 text-sm">Noch keine K-Drama Daten in der Sanity-Datenbank vorhanden.</p>
        </div>
      </section>
    );
  }

  const currentSlide = dramas[currentIndex] || dramas[0];

  const truncateDescription = (text: string, maxLength: number = 130) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    const trimmed = text.substring(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(" ");
    return (lastSpace > 0 ? trimmed.substring(0, lastSpace) : trimmed) + "...";
  };

  return (
    <section className="w-full py-24 md:py-36 bg-neutral-950 text-white relative overflow-hidden border-t border-neutral-800/60">
      
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-125 h-125 bg-linear-to-br from-rose-950/20 via-neutral-900/40 to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-100 h-100 bg-linear-to-tl from-amber-950/15 via-slate-900/30 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LINKE SEITE */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-700/60 text-rose-400 text-xs font-bold tracking-widest uppercase shadow-md">
                <Film className="w-3.5 h-3.5 text-rose-500" />
                <span>KOREAN SERIES & DRAMA</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-white">
                Geschichten, die dich <br className="hidden sm:block" />
                <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-rose-400 via-amber-200 to-rose-300">
                  in ihren Bann ziehen.
                </span>
              </h2>

              <p className="text-neutral-300 text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Von herzerwärmenden Rom-Coms bis hin zu packenden Thrillern –
                entdecke die neuesten südkoreanischen Hit-Serien, Reviews,
                Diskussionen und Streaming-News.
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <a
                  href="#kdrama"
                  className="inline-flex items-center gap-3 px-7 py-3 bg-linear-to-r from-rose-600 via-rose-700 to-rose-800 hover:from-rose-500 hover:to-rose-700 text-white font-bold text-xs md:text-sm tracking-wider uppercase rounded-lg shadow-lg border border-rose-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-98 group cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
                  <span>SERIEN ENTDECKEN</span>
                  <span className="text-base text-rose-200 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">➔</span>
                </a>
              </div>
            </div>

            {/* AKTIVER SLIDE BLOCK */}
            <div className="hidden lg:block pt-8 border-t border-neutral-800/80 mt-4">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-medium uppercase tracking-wider mb-3">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  Empfehlung
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-[11px]">
                  {currentIndex + 1} / {dramas.length}
                </span>
              </div>
              
              <div 
                onClick={() => handleCardClick(currentSlide)}
                className="group/mini relative overflow-hidden bg-neutral-900/90 backdrop-blur-xl rounded-xl p-3.5 border border-rose-500/20 hover:border-rose-500/50 transition-all duration-300 shadow-md cursor-pointer text-left flex items-center gap-3.5"
              >
                <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0 border border-neutral-700/50">
                  {currentSlide?.wideImage ? (
                    <img 
                      src={currentSlide.wideImage} 
                      alt={currentSlide.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/mini:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                      <Film className="w-5 h-5 text-neutral-600" />
                    </div>
                  )}
                </div>

                <div className="space-y-1 grow min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-900/50">
                      {currentSlide?.category}
                    </span>
                    {currentSlide?.rating && (
                      <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                        ★ {currentSlide.rating}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-white tracking-wide truncate group-hover/mini:text-rose-200 transition-colors">
                    {currentSlide?.title}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-md bg-neutral-800 group-hover/mini:bg-rose-600 border border-neutral-700 text-neutral-300 group-hover/mini:text-white flex items-center justify-center transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* RECHTE SEITE: WIDE IMAGE SLIDER */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-end gap-6">
            <div className="relative group w-full max-w-2xl">
              {/* ITT LETT LEVÉVE A NAGY RÁDIUSZ: rounded-xl helyett a korábbi 44px */}
              <div 
                onClick={() => handleCardClick(currentSlide)}
                className="relative rounded-xl overflow-hidden border border-neutral-700/50 bg-black shadow-2xl transition-all duration-500 hover:border-neutral-500 hover:-translate-y-1 h-135 sm:h-150 md:h-160 cursor-pointer ring-1 ring-white/10"
              >
                {dramas.map((slide: KDramaItem, idx: number) => (
                  <div
                    key={slide.id || idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    {slide.wideImage ? (
                      <img
                        src={slide.wideImage}
                        alt={slide.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-600">Kein Bild</div>
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 via-60% to-black/30" />

                    <div className="absolute top-5 left-5 right-5 md:top-6 md:left-6 md:right-6 z-20 flex items-center justify-between">
                      <div className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-xl border border-white/20 text-white text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        <span>{slide.category}</span>
                      </div>

                      <div className="w-10 h-10 rounded-md bg-black/60 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-rose-600 group-hover:border-rose-500 shadow-lg">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 md:p-10 space-y-3 text-white z-20 text-left">
                      <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{slide.rating}</span>
                        <span className="text-neutral-400 text-xs font-normal opacity-90">(K-Drama Edit)</span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
                        {slide.title}
                      </h3>

                      <p className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed drop-shadow-md max-w-lg">
                        {truncateDescription(slide.description)}
                      </p>
                    </div>
                  </div>
                ))}

                <button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Vorheriges Bild"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-md bg-black/60 hover:bg-rose-600 hover:text-white backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Nächstes Bild"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-md bg-black/60 hover:bg-rose-600 hover:text-white backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* THUMBNAIL STRIP */}
            <div className="w-full max-w-2xl grid grid-cols-4 gap-2.5">
              {dramas.slice(0, 4).map((slide: KDramaItem, idx: number) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id || idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative rounded-lg overflow-hidden h-18 md:h-20 transition-all duration-300 border text-left cursor-pointer group ${
                      isActive
                        ? "border-rose-500 ring-2 ring-rose-500/50 shadow-lg"
                        : "border-neutral-800 opacity-50 hover:opacity-100 hover:border-neutral-600"
                    }`}
                  >
                    {slide.wideImage && (
                      <img
                        src={slide.wideImage}
                        alt={slide.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-1.5 flex flex-col justify-end">
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

      <KDramaDetailModal
        drama={selectedDrama}
        onClose={() => setSelectedDrama(null)}
      />
    </section>
  );
}