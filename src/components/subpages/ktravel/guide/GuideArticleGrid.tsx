"use client";

import React, { useState } from "react";
import { Compass } from "lucide-react";
import GuideDetailModal from "../details/GuideDetailModal";

interface GuideArticleGridProps {
  articles: any[];
}

export default function GuideArticleGrid({ articles }: GuideArticleGridProps) {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const safeArticles = Array.isArray(articles) ? articles : [];

  return (
    <section className="w-full bg-linear-to-b from-[#0d0d0f] via-[#dce7f0] to-[#eaf2fb] text-neutral-900 pt-16 pb-36 px-4 sm:px-6 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Szekció címke */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-400 pb-6 mb-8 lg:mb-12">
          <div className="text-xs font-mono tracking-[0.2em] sm:tracking-[0.35em] text-neutral-900 uppercase font-bold drop-shadow-sm">
            // WICHTIGE REISE-INFOS & ARCHIV ({safeArticles.length} elem)
          </div>
          <div className="text-xs font-mono text-neutral-900 uppercase tracking-widest font-bold drop-shadow-sm">
            KAPITEL 04 / HANDBUCH
          </div>
        </div>

        {/* Ha üres a tömb */}
        {safeArticles.length === 0 ? (
          <div className="py-20 text-center text-neutral-700 font-mono text-sm">
            [DEBUG: Nincsenek megjeleníthető cikkek a Sanity-ből vagy töltés alatt van...]
          </div>
        ) : (
          /* Eltávolítva a felső keret, csak az alsó maradt meg a konténeren */
          <div className="border-b border-neutral-400/80">
            {safeArticles.map((item, index) => {
              const cardTitle = item?.title || "Névtelen elem";
              const cardDescription = item?.description || item?.excerpt || "";
              const cardTag = item?.tag || `0${index + 1} // Guide`;

              return (
                <div
                  key={item?._id || index}
                  onClick={() => setSelectedItem(item)}
                  className="group py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 transition-all duration-500 hover:bg-white/60 px-4 sm:px-8 lg:px-12 border-t first:border-t-0 border-neutral-400/80 cursor-pointer"
                >
                  {/* Bal oldal: Sorszám, Ikon, Cím */}
                  <div className="flex items-start sm:items-center gap-4 sm:gap-8 lg:gap-14 max-w-3xl">
                    <span className="text-xs font-mono text-neutral-900 tracking-widest pt-1 sm:pt-0 font-bold shrink-0">
                      // 0{index + 1}
                    </span>

                    <div className="p-3 sm:p-4 bg-neutral-900/10 text-neutral-950 border border-neutral-400 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-500 shrink-0 shadow-sm">
                      <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    <div className="space-y-1.5 sm:space-y-2.5">
                      <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] sm:tracking-[0.3em] text-neutral-900 uppercase font-bold">
                        {cardTag}
                      </div>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-neutral-950 group-hover:text-neutral-700 transition-colors duration-300 leading-snug">
                        {cardTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Jobb oldal: Leírás és Gomb */}
                  <div className="flex items-center gap-6 lg:gap-12 justify-between lg:justify-end w-full lg:w-auto mt-2 lg:mt-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-300/50">
                    {cardDescription && (
                      <p className="text-xs sm:text-sm md:text-base text-neutral-800 font-medium max-w-md line-clamp-2 leading-relaxed hidden md:block">
                        {cardDescription}
                      </p>
                    )}

                    <div className="inline-flex items-center gap-2 sm:gap-3 text-xs font-mono tracking-widest uppercase text-neutral-950 group-hover:text-neutral-900 shrink-0 font-bold ml-auto lg:ml-0">
                      <span className="inline">LESEN</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2 text-neutral-950 text-sm">↗</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <GuideDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}