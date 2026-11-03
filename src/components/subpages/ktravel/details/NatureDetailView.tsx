"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Compass, Sparkles, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  url: string;
  caption?: string;
}

interface QuickFactItem {
  label: string;
  value: string;
}

interface DetailViewProps {
  article: {
    title: string;
    slug: { current: string } | string;
    tag?: string;
    description: string;
    image?: any;
    gallery?: GalleryItem[];
    body?: any;
    quickFacts?: QuickFactItem[]; // <-- Új mező a sémához igazítva
  };
}

export default function NatureDetailView({ article }: DetailViewProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const gallery = article.gallery || [];
  const quickFacts = article.quickFacts || [];

  console.log("TELJES ARTICLE OBJEKTUM:", article);
  console.log("QUICK FACTS TÖMB:", quickFacts);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gallery.length === 0) return;
    setCurrentIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : 0));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gallery.length === 0) return;
    setCurrentIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : gallery.length - 1));
  };

  const activeImage = currentIndex !== null ? gallery[currentIndex] : null;

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-[#0d0d0f] via-[#e2ede8] to-[#edf4f0] text-neutral-900 selection:bg-emerald-500/30 pt-28 pb-32 px-6 lg:px-16 relative">
      <article className="max-w-7xl mx-auto space-y-16">
        
        {/* Navigáció & Kategória Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-300/80 pb-6">
          <Link
            href="/ktravel/nature"
            className="text-xs font-mono tracking-widest uppercase text-neutral-400 hover:text-emerald-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zu Natur & Jeju</span>
          </Link>
          <span className="text-xs font-mono tracking-[0.3em] uppercase px-3.5 py-1 rounded-full bg-emerald-600/10 text-emerald-700 border border-emerald-600/30 w-fit flex items-center gap-2">
            <Compass className="w-3.5 h-3.5" />
            {article.tag || "NATUR & JEJU"}
          </span>
        </div>

        {/* Cím és Rövid leírás (Description) */}
        <div className="space-y-6 max-w-5xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.1]">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-4xl border-l-2 border-emerald-600 pl-6 py-1">
              {article.description}
            </p>
          )}
        </div>

        {/* Kiemelt Kép (Borító) */}
        {article.image && (
          <div className="relative w-full h-110 sm:h-140 rounded-2xl overflow-hidden border border-neutral-300/80 shadow-2xl bg-neutral-900">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Részletes szerkesztőségi tartalom (Body - Portable Text) */}
        <div className="max-w-5xl prose prose-lg md:prose-xl font-light leading-relaxed space-y-8 text-neutral-800 
          prose-headings:text-neutral-950 prose-headings:font-light prose-h2:text-3xl prose-h3:text-2xl 
          prose-a:text-emerald-700 prose-strong:text-neutral-950 prose-strong:font-normal pt-4">
          {article.body && <PortableText value={article.body} />}
        </div>

        {/* Képgaléria (Gallery) + Lightbox Trigger */}
        {gallery.length > 0 && (
          <div className="space-y-8 pt-12 border-t border-neutral-300/80">
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-emerald-700">
              <Sparkles className="w-4 h-4" />
              <span>Fotogalerie</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {gallery.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div 
                    onClick={() => setCurrentIndex(index)}
                    className="relative h-80 rounded-2xl overflow-hidden border border-neutral-300/80 bg-neutral-900 shadow-xl group cursor-pointer"
                  >
                    <Image
                      src={item.url}
                      alt={item.caption || `${article.title} gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-mono flex items-center gap-2 border border-white/20">
                        <ZoomIn className="w-4 h-4 text-emerald-400" /> Vergrößern
                      </span>
                    </div>
                  </div>

                  {item.caption && (
                    <p className="text-xs font-mono text-neutral-600 tracking-wide px-1">
                      // {item.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dinamikus Quick Facts Doboz (Teljes szélességű & Reszponzív 3 oszlopos rács) */}
        {quickFacts.length > 0 && (
          <div className="w-full mt-16 p-8 md:p-10 rounded-3xl bg-white/70 border border-neutral-300/80 backdrop-blur-md space-y-6 shadow-xl">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-emerald-700">
              // Quick Facts & Essentials
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-neutral-800 font-light">
              {quickFacts.map((fact, index) => (
                <li key={index} className="flex items-start gap-3 bg-white/80 p-5 rounded-xl border border-neutral-200 shadow-sm h-full">
                  <span className="text-emerald-700 font-bold mt-0.5">▪</span>
                  <div className="space-y-1">
                    <strong className="text-neutral-950 block">{fact.label}</strong>
                    <span className="text-neutral-700 leading-relaxed">{fact.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

      </article>

      {/* --- VÉGTELENÍTETT LAPOZHATÓ LIGHTBOX --- */}
      {activeImage && (
        <div 
          onClick={() => setCurrentIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-12 animate-fade-in select-none"
        >
          <button 
            onClick={() => setCurrentIndex(null)}
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors border border-white/20 cursor-pointer z-50"
            aria-label="Schließen"
          >
            <X className="w-6 h-6" />
          </button>

          <button 
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 sm:p-4 rounded-full transition-colors border border-white/20 cursor-pointer z-50"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button 
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 sm:p-4 rounded-full transition-colors border border-white/20 cursor-pointer z-50"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-5xl w-full h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-950 flex items-center justify-center"
          >
            <Image
              src={activeImage.url}
              alt={activeImage.caption || "Detailansicht"}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="mt-6 max-w-3xl text-center px-4 space-y-2"
          >
            <div className="inline-block text-xs font-mono text-neutral-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              {currentIndex !== null ? currentIndex + 1 : 1} / {gallery.length}
            </div>
            {activeImage.caption && (
              <p className="text-sm sm:text-base font-mono text-emerald-300 tracking-wide bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                // {activeImage.caption}
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}