"use client";

import React, { useState } from "react";
import { Train, MapPin, ShieldCheck, Compass } from "lucide-react";
import GuideDetailModal from "../details/GuideDetailModal";

interface GuideArticleGridProps {
  articles: any[];
}

export default function GuideArticleGrid({ articles }: GuideArticleGridProps) {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const safeArticles = Array.isArray(articles) ? articles : [];

  return (
    <section className="w-full bg-linear-to-b from-[#0d0d0f] via-[#dce7f0] to-[#eaf2fb] text-neutral-900 pt-16 pb-36 px-6 lg:px-20 relative">
      <div className="max-w-350 mx-auto">
        
        {/* Szekció címke */}
        <div className="flex items-center justify-between border-b border-neutral-400 pb-6 mb-12">
          <div className="text-xs font-mono tracking-[0.35em] text-neutral-200 uppercase font-bold drop-shadow-md">
            // WICHTIGE REISE-INFOS & ARCHIV ({safeArticles.length} elem)
          </div>
          <div className="text-xs font-mono text-neutral-200 uppercase tracking-widest font-bold drop-shadow-md">
            KAPITEL 04 / HANDBUCH
          </div>
        </div>

        {/* Ha üres a tömb, írjuk ki a képernyőre, hogy lássuk, megérkezett-e az adat */}
        {safeArticles.length === 0 ? (
          <div className="py-20 text-center text-neutral-700 font-mono text-sm">
            [DEBUG: Nincsenek megjeleníthető cikkek a Sanity-ből vagy töltés alatt van...]
          </div>
        ) : (
          <div className="divide-y divide-neutral-400/80 border-b border-neutral-400/80">
            {safeArticles.map((item, index) => {
              const cardTitle = item?.title || "Névtelen elem";
              const cardDescription = item?.description || item?.excerpt || "";
              const cardTag = item?.tag || `0${index + 1} // Guide`;

              return (
                <div
                  key={item?._id || index}
                  onClick={() => setSelectedItem(item)}
                  className="group py-14 lg:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all duration-500 hover:bg-white/60 px-8 lg:px-12 -mx-6 lg:-mx-12 cursor-pointer"
                >
                  <div className="flex items-start lg:items-center gap-8 lg:gap-14 max-w-3xl">
                    <span className="text-xs font-mono text-neutral-900 tracking-widest pt-1 lg:pt-0 font-bold">
                      // 0{index + 1}
                    </span>

                    <div className="p-4 bg-neutral-900/10 text-neutral-950 border border-neutral-400 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-500 shrink-0 shadow-sm">
                      <Compass className="w-6 h-6" />
                    </div>

                    <div className="space-y-2.5">
                      <div className="text-[11px] font-mono tracking-[0.3em] text-neutral-900 uppercase font-bold">
                        {cardTag}
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-950 group-hover:text-neutral-700 transition-colors duration-300">
                        {cardTitle}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-12 justify-between lg:justify-end w-full lg:w-auto">
                    {cardDescription && (
                      <p className="text-sm sm:text-base text-neutral-800 font-medium max-w-md line-clamp-2 leading-relaxed hidden xl:block">
                        {cardDescription}
                      </p>
                    )}

                    <div className="inline-flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-neutral-950 group-hover:text-neutral-900 shrink-0 font-bold">
                      <span className="hidden sm:inline">LESEN</span>
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