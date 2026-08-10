"use client";

import { useState } from "react";
import { Music2, ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import KPopDetailModal from "@/components/modals/KPopDetailModal";

// Itt fogadjuk a prop-ot (típusnak megfelelően vagy any-ként, ha nincs külön típus fájlod)
export default function KPopSection({ groups }: { groups: any[] }) {
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);

  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      skipSnaps: true,
      duration: 25,
    },
    [
      AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        startDelay: 0,
      }),
    ]
  );

  const handleCardClick = (group: any) => {
    setSelectedGroup(group);
  };

  // Ha még üres a Sanity, ne szálljon el a karusszel
  if (!groups || groups.length === 0) {
    return null; 
  }

  const displayGroups = [...groups, ...groups];

  return (
    <section className="w-full py-24 md:py-36 bg-linear-to-b from-neutral-950 via-slate-100 to-slate-50 text-neutral-900 relative overflow-hidden border-t border-neutral-800/40"> 
      
      <div className="absolute top-0 inset-x-0 h-64 bg-linear-to-b from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none z-0" />

      <div className="absolute top-1/3 -left-32 w-125 h-125 bg-linear-to-br from-slate-300/30 via-gray-200/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-112.5 h-112.5 bg-linear-to-tl from-slate-300/30 via-gray-200/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center z-10 relative mb-14 md:mb-20 space-y-5 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/85 backdrop-blur-md border border-slate-700/80 text-slate-200 text-xs font-bold tracking-widest uppercase shadow-md">
          <Music2 className="w-3.5 h-3.5 stroke-[1.75] text-sky-400" />
          <span>K-POP GLOBAL HUB</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.15] drop-shadow-md">
          A K-Pop{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-400">
            Globális Forradalma.
          </span>
        </h2>

        <p className="text-slate-300 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
          Ismerd meg a csapatokat, akik átírták a zeneipar szabályait és meghódították a világ legnagyobb színpadait. A legfrissebb hírek és a legnagyobb fandomok történetei – közvetlenül Szöulból.
        </p>
      </div>

      <div className="w-full overflow-hidden py-8 -my-8 cursor-grab active:cursor-grabbing select-none z-10 relative" ref={emblaRef}>
        <div className="flex gap-6 md:gap-8 px-6">
          {displayGroups.map((group, index) => (
            <div
              key={`${group.id || group.name}-${index}`}
              onClick={() => handleCardClick(group)}
              className="w-75 sm:w-95 md:w-105 shrink-0 group relative h-120 md:h-125 rounded-3xl overflow-hidden cursor-pointer bg-neutral-900 border border-slate-200/60 shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:border-slate-300"
            >
              <img
                src={group.image}
                alt={group.name}
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 via-45% to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                  {group.filterAgency || group.agency}
                </span>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black shadow-xs">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-7 space-y-2 z-10 text-white">
                <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-300 uppercase drop-shadow-xs">
                  {group.members}
                </span>

                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                  {group.name}
                </h3>

                <p className="text-sm text-neutral-200 font-normal leading-relaxed line-clamp-2 drop-shadow-xs">
                  {group.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center z-10 relative">
        <a
          href="#kpop-hub"
          className="inline-flex items-center gap-3 px-9 py-4 bg-linear-to-b from-slate-900 via-slate-800 to-black hover:from-black hover:to-slate-900 text-white font-bold text-xs md:text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-2xl border border-slate-700/50 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <span>ÖSSZES K-POP CSAPAT FELFEDEZÉSE</span>
          <span className="text-base text-slate-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">➔</span>
        </a>
      </div>

      <KPopDetailModal
        group={selectedGroup}
        onClose={() => setSelectedGroup(null)}
      />

    </section>
  );
}