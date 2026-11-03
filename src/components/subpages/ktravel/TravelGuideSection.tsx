"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, Plane } from "lucide-react";
import GuideDetailModal from "@/components/subpages/ktravel/details/GuideDetailModal";

interface TravelGuideSectionProps {
  initialGuideItems: any[];
}

export default function TravelGuideSection({ initialGuideItems }: TravelGuideSectionProps) {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const safeItems = Array.isArray(initialGuideItems) ? initialGuideItems : [];
  
  const displayedItems = safeItems.slice(0, 3);
  const primaryItem = displayedItems[0];
  const secondaryItems = displayedItems.slice(1, 3);

  if (!primaryItem) return null;

  return (
    <section id="guide" className="w-full py-28 md:py-40 bg-linear-to-b from-slate-100 via-neutral-900 to-neutral-950 text-white relative overflow-hidden">
      
       {/* Világosabb, elegáns ezüstös-kékes háttérfény */}
       <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-175 h-100 bg-slate-300/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 z-10 relative space-y-20">
        
        {/* EDITORIAL FEJLÉC */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-slate-700/60">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-slate-200 text-xs font-mono tracking-[0.25em] uppercase bg-slate-800/80 px-4 py-1.5 border border-slate-500/40 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-slate-300" />
              <span>Kapitel 04 // Curated Essentials</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-none">
              Praktische <span className="font-serif italic font-normal text-slate-300">Hinweise</span>
            </h2>
          </div>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-md">
            Von High-Speed-Zügen über digitale Navigation bis hin zu unentbehrlichen Alltags-Hacks für deine Korea-Reise.
          </p>
        </div>

        {/* ASZIMMETRIKUS MAGAZIN GRID - VALÓDI EZÜSTÖS / FÉMES HATÁSÚ KÁRTYÁK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* FŐ KIEMELT KÁRTYA */}
          <div 
            onClick={() => setSelectedItem(primaryItem)}
            className="lg:col-span-7 group p-8 sm:p-12 rounded-3xl bg-linear-to-br from-slate-800/90 via-neutral-900/95 to-neutral-950 border border-slate-400/40 hover:border-slate-200 transition-all duration-500 flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            {/* Jól látható, elegáns háttérrepülő vízjel */}
            <div className="absolute -bottom-10 -right-10 text-slate-200/6 group-hover:text-slate-200/12 transition-colors duration-500 pointer-events-none select-none">
              <Plane className="w-96 h-96 -rotate-12" />
            </div>

            {/* Felső fényes becsillanás */}
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-300/40 to-transparent pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300 tracking-[0.3em] uppercase">
                  {primaryItem.tag || "01 // FOKUS"}
                </span>
                
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-400/50 flex items-center justify-center text-slate-100 group-hover:bg-white group-hover:text-neutral-950 group-hover:border-white transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.1] group-hover:text-slate-200 transition-colors">
                  {primaryItem.title}
                </h3>
                <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed line-clamp-3 pt-2 max-w-xl">
                  {primaryItem.description || primaryItem.excerpt}
                </p>
              </div>
            </div>

            <div className="pt-12 flex items-center justify-between relative z-10 border-t border-slate-700/60 mt-8">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-slate-300 group-hover:text-white transition-colors">
                Kapitel öffnen
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                // ANREISE
              </span>
            </div>
          </div>

          {/* JOBB OLDALI KÁRTYÁK */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryItems.map((item: any, index: number) => {
              const realIndex = index + 2;
              return (
                <div
                  key={item._id || index}
                  onClick={() => setSelectedItem(item)}
                  className="group p-6 sm:p-8 rounded-3xl bg-linear-to-br from-slate-800/90 via-neutral-900/95 to-neutral-950 border border-slate-400/40 hover:border-slate-200 transition-all duration-500 flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-xl backdrop-blur-xl"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-300/30 to-transparent pointer-events-none" />

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-300 tracking-[0.3em] uppercase">
                        {item.tag || `0${realIndex} // GUIDE`}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight leading-snug group-hover:text-slate-200 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-200 text-sm font-light leading-relaxed line-clamp-2">
                      {item.description || item.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 flex items-center justify-between relative z-10 border-t border-slate-700/60 mt-6">
                    <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-slate-300 group-hover:text-white transition-colors">
                      Lesen
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ALSÓ KERET NÉLKÜLI GOMB */}
        <div className="flex justify-center pt-6">
          <a
            href="/ktravel/guide"
            className="group inline-flex items-center gap-3 text-xs font-mono tracking-[0.35em] uppercase text-slate-300 hover:text-white transition-colors duration-300 py-2"
          >
            <span>Alle Reise-Infos erkunden</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 text-slate-200">↗</span>
          </a>
        </div>

      </div>

      {/* MODAL */}
      <GuideDetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

    </section>
  );
}