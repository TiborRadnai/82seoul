import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

interface DetailViewProps {
  article: {
    title: string;
    slug: { current: string } | string;
    tag?: string;
    description: string; // A séma szerinti mezőnév!
    image?: any;          // A séma szerinti mezőnév!
    gallery?: any[];
    body?: any;           // A séma szerinti mezőnév!
  };
}

export default function CityDetailView({ article }: DetailViewProps) {
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-neutral-100 selection:bg-sky-500/30 pt-28 pb-24 px-6 lg:px-24">
      <article className="max-w-4xl mx-auto space-y-12">
        
        {/* Navigáció & Kategória Tag */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <Link
            href="/ktravel/city"
            className="text-xs font-mono tracking-widest uppercase text-neutral-400 hover:text-sky-400 transition-colors flex items-center gap-2"
          >
            <span>←</span> Zurück zu Metropolen & City Life
          </Link>
          <span className="text-xs font-mono tracking-[0.3em] uppercase px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
            {article.tag || "METROPOLIS & TRENDS"}
          </span>
        </div>

        {/* Cím és Rövid leírás (Description) */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[1.1]">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl border-l-2 border-sky-500 pl-4 py-1">
              {article.description}
            </p>
          )}
        </div>

        {/* Kiemelt Kép (Borító - 'image') */}
        {article.image && (
        <div className="relative w-full h-100 sm:h-130 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
            <Image
            src={article.image} // Ha a query-ben már a string URL érkezik
            alt={article.title}
            fill
            className="object-cover"
            priority
            />
        </div>
        )}

        {/* Részletes szerkesztőségi tartalom (Body - Portable Text) */}
        <div className="prose prose-invert prose-lg max-w-none pt-8 border-t border-neutral-800/80 font-light leading-relaxed space-y-8 text-neutral-300">
          {article.body && <PortableText value={article.body} />}
        </div>

        {/* Képgaléria (Gallery) */}
            {article.gallery && article.gallery.length > 0 && (
            <div className="space-y-6 pt-8 border-t border-neutral-800/80">
                <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-sky-400">
                Fotogalerie
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {article.gallery.map((imgUrl: string, index: number) => (
                    <div key={index} className="relative h-70 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-lg">
                    <Image
                        src={imgUrl} // Közvetlen string URL
                        alt={`${article.title} gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                    </div>
                ))}
                </div>
            </div>
            )}

        {/* Quick Facts Doboz */}
        <div className="mt-16 p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md space-y-4">
          <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-sky-400">
            Quick Facts & Essentials
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-neutral-300 font-light">
            <li className="flex items-start gap-2">
              <span className="text-sky-400">▪</span>
              <span><strong>Beste Reisezeit:</strong> Frühling und Herbst.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-400">▪</span>
              <span><strong>Navigation:</strong> Naver Map oder KakaoMap.</span>
            </li>
          </ul>
        </div>

      </article>
    </div>
  );
}