"use client";

import { useState } from "react";
import { Music2, ArrowUpRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import KPopDetailModal from "@/components/modals/KPopDetailModal";
import { X, ExternalLink } from "lucide-react";


// Adatok és típus importálása a külső adatfájlból
import { KPOP_GROUPS, KPopGroupData, KPopMember } from "../../data/kpopData";

interface KPopDetailModalProps {
  group: KPopGroupData | null;
  onClose: () => void;
}

export default function KPopSection() {
  const [selectedGroup, setSelectedGroup] = useState<KPopGroupData | null>(null);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [
      AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const handleCardClick = (group: KPopGroupData) => {
    setSelectedGroup(group);
  };

  return (
    <section className="w-full py-24 md:py-36 bg-neutral-100/70 text-neutral-900 relative overflow-hidden border-t border-neutral-200">
      
      {/* 1. KÖZÉPRE IGAZÍTOTT ELEGÁNS FEJLÉC */}
      <div className="max-w-3xl mx-auto px-6 text-center z-10 relative mb-14 md:mb-20 space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-800 text-xs font-bold tracking-widest uppercase shadow-xs">
          <Music2 className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>K-POP GLOBAL HUB</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-black leading-[1.15]">
          A K-Pop <span className="font-semibold">Globális Forradalma.</span>
        </h2>

        <p className="text-neutral-600 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Ismerd meg a csapatokat, akik átírták a zeneipar szabályait és meghódították a világ legnagyobb színpadait. A legfrissebb hírek és a legnagyobb fandomok történetei – közvetlenül Szöulból.
        </p>
      </div>

      {/* 2. FULL-WIDTH CAROUSEL */}
      <div className="w-full overflow-hidden py-6 -my-6 cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-6 md:gap-8 px-6">
          {KPOP_GROUPS.map((group) => (
            <div
              key={group.id}
              onClick={() => handleCardClick(group)}
              className="w-75 sm:w-95 md:w-105 shrink-0 select-none group relative h-120 md:h-125 rounded-3xl overflow-hidden cursor-pointer bg-black border border-neutral-200/80 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
            >
              {/* Háttérkép */}
              <img
                src={group.image}
                alt={group.name}
                draggable={false}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Sötét átmenet */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 via-40% to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

              {/* Felső badge & ikongomb */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                  {group.agency}
                </span>

                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Alsó tartalom */}
              <div className="absolute bottom-0 inset-x-0 p-7 space-y-2 z-10 text-white">
                <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-300 uppercase drop-shadow-xs">
                  {group.members}
                </span>

                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                  {group.name}
                </h3>

                <p className="text-sm text-neutral-200 font-light leading-relaxed line-clamp-2 drop-shadow-xs">
                  {group.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. KÖZÉPRE IGAZÍTOTT CTA GOMB */}
      <div className="mt-16 text-center z-10 relative">
        <a
          href="#kpop-hub"
          className="inline-flex items-center gap-3 px-10 py-4 bg-black hover:bg-neutral-800 text-white font-bold text-xs md:text-sm tracking-wider uppercase rounded-full shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span>ÖSSZES K-POP CSAPAT FELFEDEZÉSE</span>
          <span className="text-base">➔</span>
        </a>
      </div>

      {/* 4. A K-POP MODAL BEÉPÍTÉSE */}
      <KPopDetailModal
        group={selectedGroup}
        onClose={() => setSelectedGroup(null)}
      />

    </section>
  );
}