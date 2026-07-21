"use client";

import { useState, useEffect } from "react";
import { Film, ChevronLeft, ChevronRight, Star, ArrowUpRight } from "lucide-react";

const DRAMA_SLIDES = [
  {
    id: 1,
    title: "Can This Love Be Translated?",
    rating: "4.9",
    category: "NETFLIX DRAMA",
    description:
      "Egy több nyelven beszélő tolmács és egy feltörekvő színésznő szellemes, mégis mély félreértésekkel teli szerelmi története.",
    image: "/images/kdrama/can-this-love-be-translated.webp",
  },
  {
    id: 2,
    title: "Alchemy of Souls",
    rating: "5.0",
    category: "NETFLIX FANTASY",
    description:
      "Varázslat, lélekeltolódás és végzetes szerelem Daeho fiktív birodalmában – a modern K-Fantasy csúcsa.",
    image: "/images/kdrama/alchemy-of-souls.webp",
  },
  {
    id: 3,
    title: "Love Next Door",
    rating: "4.8",
    category: "NETFLIX ROM-COM",
    description:
      "A gyerekkori barátokból lett felnőttek káosza és újraegymásra találása – édes, vicces és nagyon szerethető.",
    image: "/images/kdrama/love-next-door.webp",
  },
  {
    id: 4,
    title: "Resident Playbook",
    rating: "4.9",
    category: "NETFLIX MEDICAL",
    description:
      "A Hospital Playlist univerzum legújabb gyöngyszeme: fiatal szülész-nőgyógyász rezidensek kendőzetlen hétköznapjai.",
    image: "/images/kdrama/resident-playbook.webp",
  },
  {
    id: 5,
    title: "Snowdrop",
    rating: "4.8",
    category: "DISNEY+ DRAMA",
    description:
      "Feszült politikai intrikák és tragikus szerelem az 1987-es Szöul szívében, Jisoo és Jung Hae-in főszereplésével.",
    image: "/images/kdrama/snowdrop.webp",
  },
  {
    id: 6,
    title: "Boyfriend on Demand",
    rating: "4.7",
    category: "K-DRAMA HIGHLIGHT",
    description:
      "Amikor a tökéletes társ csak egy kattintásra van: izgalmas, modern romantikus utazás a virtuális vágyak világában.",
    image: "/images/kdrama/boyfriend-on-demand.webp",
  },
];

export default function KDramaSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatikus lapozás 5 másodpercenként
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DRAMA_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DRAMA_SLIDES.length) % DRAMA_SLIDES.length);
  };

  const handleCardClick = (dramaId: number) => {
    console.log("Modal megnyitása ehhez a sorozathoz:", dramaId);
  };

  return (
    <section className="w-full py-24 md:py-36 bg-white text-neutral-900 relative overflow-hidden border-t border-neutral-200">
      
      {/* Tágas, 1600px-es konténer */}
      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* BAL OLDAL: Címsor, Leírás & CTA */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-bold tracking-widest uppercase shadow-xs">
              <Film className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>KOREAN SERIES & DRAMA</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-black">
              Történetek, amik <br className="hidden sm:block" />
              <span className="font-semibold text-black">
                magukkal ragadnak.
              </span>
            </h2>

            <p className="text-neutral-600 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              A szívmelengető romantikus vígjátékoktól a feszült és izgalmas
              thrillerekig – nálunk megtalálod a legújabb dél-koreai
              sikersorozatok kritikáit, kibeszélőit és a legfrissebb streaming híreket.
            </p>

            <div className="pt-2">
              <a
                href="#kdrama"
                className="inline-flex items-center gap-3 px-10 py-4 bg-black hover:bg-neutral-800 text-white font-bold text-xs md:text-sm tracking-wider uppercase rounded-full shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>SOROZATOK FELFEDEZÉSE</span>
                <span className="text-base">➔</span>
              </a>
            </div>
          </div>

          {/* JOBB OLDAL: Nagy méretű (1000x1000-es képre szabott) Luxus Poszter Kártya */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="relative group w-full max-w-2xl">
              
              {/* KÁRTYA KONTÉNER - Extra nagy Radius (40px), dupla border és mély árnyék */}
              <div 
                onClick={() => handleCardClick(DRAMA_SLIDES[currentIndex].id)}
                className="relative rounded-[36px] md:rounded-[44px] overflow-hidden border border-black/10 bg-black shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.35)] hover:-translate-y-2 h-135 sm:h-150 md:h-160 cursor-pointer ring-1 ring-black/5"
              >
                
                {/* Diaképek áttűnéssel (Cross-fade) */}
                {DRAMA_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    {/* 1000x1000-es éles kép */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    {/* Finom, több lépcsős sötétítés az olvashatóságért */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 via-55% to-black/20" />

                    {/* Lebegő Glassmorphic Fejléc ELEMEK */}
                    <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 z-20 flex items-center justify-between">
                      <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{slide.category}</span>
                      </div>

                      <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black shadow-md">
                        <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    {/* Kártya alsó tartalom */}
                    <div className="absolute bottom-0 inset-x-0 p-8 sm:p-10 md:p-12 space-y-3.5 text-white z-20">
                      <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{slide.rating}</span>
                        <span className="text-neutral-300 text-xs font-normal opacity-80">(K-Drama Edit)</span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
                        {slide.title}
                      </h3>

                      <p className="text-sm md:text-base text-neutral-200 font-light line-clamp-2 leading-relaxed drop-shadow-xs max-w-lg">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Léptető nyilak (Glass effect) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Előző borítókép"
                  className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-white hover:text-black backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Következő borítókép"
                  className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-white hover:text-black backdrop-blur-xl border border-white/20 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Indikátor Pöttyök */}
                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-xl px-3.5 py-2 rounded-full border border-white/15 shadow-md">
                  {DRAMA_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(idx);
                      }}
                      aria-label={`Ugrás a(z) ${idx + 1}. borítóképhez`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "w-7 bg-white" : "w-2 bg-white/30 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}