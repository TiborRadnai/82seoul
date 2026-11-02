"use client";

import React from "react";
import { PortableText } from "@portabletext/react";
import { ExternalLink, Compass } from "lucide-react";

interface AppLink {
  platformName: string;
  url: string;
}

interface GuideDetailModalProps {
  item: any | null;
  onClose: () => void;
}

export default function GuideDetailModal({ item, onClose }: GuideDetailModalProps) {
  if (!item) return null;

  // Segédfüggvény a megfelelő logó / ikon kiválasztásához a platform neve alapján
  const renderStoreIcon = (platformName: string) => {
    const name = platformName.toLowerCase();
    
    // Apple / App Store logó
    if (name.includes("app store") || name.includes("apple") || name.includes("ios")) {
      return (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.67-.83 1.12-1.98.99-3.14-1.01.04-2.24.68-2.95 1.51-.62.72-1.16 1.9-1 3.04 1.13.09 2.29-.55 2.96-1.41z"/>
        </svg>
      );
    }
    
    // Google Play / Android logó
    if (name.includes("play") || name.includes("google") || name.includes("android")) {
      return (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 0 1-.61-1.21V3.024a1.5 1.5 0 0 1 .609-1.21zM15.208 13.416l2.102 2.102-11.446 6.618a1.5 1.5 0 0 1-1.498 0l10.842-8.72zm0-2.832L4.366 1.866a1.5 1.5 0 0 1 1.498 0l11.446 6.618-2.102 2.102zM17.31 15.518l2.584 1.492a1.25 1.25 0 0 1 0 2.18l-2.584 1.492-2.324-2.324 2.324-2.84z"/>
        </svg>
      );
    }

    // Alapértelmezett külső link ikon
    return <ExternalLink className="w-4 h-4 text-neutral-400 shrink-0" />;
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 md:p-12 animate-fade-in select-none overflow-y-auto"
    >
      {/* Nagyméretű, szellős editorial panel */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#eaf2fb] border border-neutral-400/80 rounded-2xl shadow-2xl p-8 sm:p-14 overflow-y-auto text-neutral-900 space-y-10"
      >
        {/* Felső sáv / Kategória Tag & Lapos Schließen Gomb */}
        <div className="flex items-center justify-between border-b border-neutral-400/80 pb-6 gap-4">
          <div className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-900 font-bold flex items-center gap-2">
            <Compass className="w-4 h-4 text-neutral-900" />
            {item.tag || item.category || "GUIDE & ESSENTIALS"}
          </div>

          <div className="flex items-center gap-6">
            <div className="text-xs font-mono tracking-widest text-neutral-600 uppercase hidden sm:block">
              // HANDBUCH DETAIL
            </div>
            <button 
              onClick={onClose}
              className="text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-lg bg-neutral-200/90 hover:bg-neutral-900 hover:text-white transition-all text-neutral-900 border border-neutral-400 cursor-pointer shadow-xs"
            >
              Schließen
            </button>
          </div>
        </div>

        {/* Cím és Rövid Bevezető */}
        <div className="space-y-4 max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-950 leading-[1.1]">
            {item.title}
          </h2>
          {(item.description || item.excerpt) && (
            <p className="text-lg sm:text-xl text-neutral-800 font-light leading-relaxed border-l-2 border-neutral-900 pl-6 py-1">
              {item.description || item.excerpt}
            </p>
          )}
        </div>

        {/* Részletes szerkesztőségi tartalom (Body - Portable Text) */}
        {item.body && (
          <div className="max-w-4xl prose prose-lg md:prose-xl font-light leading-relaxed space-y-8 text-neutral-800 
            prose-headings:text-neutral-950 prose-headings:font-light prose-h2:text-3xl prose-h3:text-2xl 
            prose-a:text-neutral-950 prose-a:underline prose-strong:text-neutral-950 prose-strong:font-normal pt-6 border-t border-neutral-400/80">
            <PortableText value={item.body} />
          </div>
        )}

        {/* Opcionális Alkalmazás / Letöltési Linkek Logókkal */}
        {item.appLinks && item.appLinks.length > 0 && (
          <div className="pt-8 border-t border-neutral-400/80 space-y-4 max-w-4xl">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-neutral-900 font-bold">
              // Relevante Links & Downloads
            </h4>
            <div className="flex flex-wrap gap-4">
              {item.appLinks.map((link: any, idx: number) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 text-sm font-mono tracking-wider transition-colors shadow-lg border border-neutral-700 group"
                >
                  {renderStoreIcon(link.platformName)}
                  <span>{link.platformName}</span>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}