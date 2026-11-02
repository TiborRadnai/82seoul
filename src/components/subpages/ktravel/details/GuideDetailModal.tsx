"use client";

import React from "react";
import { PortableText } from "@portabletext/react";
import { ExternalLink, Compass } from "lucide-react";

interface AppLink {
  platformType: string;
  buttonText?: string;
  url: string;
}

interface GuideDetailModalProps {
  item: any | null;
  onClose: () => void;
}

export default function GuideDetailModal({ item, onClose }: GuideDetailModalProps) {
  if (!item) return null;

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

        {/* Hivatalos letöltő jelvények és webes linkek */}
        {item.appLinks && item.appLinks.length > 0 && (
          <div className="pt-8 border-t border-neutral-400/80 space-y-4 max-w-4xl">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-neutral-900 font-bold">
              // Relevante Links & Downloads
            </h4>
            <div className="flex flex-wrap gap-4 items-center">
              {item.appLinks.map((link: AppLink, idx: number) => {
                const type = (link.platformType || "").toLowerCase();

                // Ha Google Play jelvény
                if (type === "playstore" || type.includes("play")) {
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform duration-300 hover:scale-105 inline-block shadow-md hover:shadow-xl overflow-hidden"
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                        alt="Get it on Google Play" 
                        className="h-12 w-auto object-contain"
                      />
                    </a>
                  );
                }

                // Ha App Store jelvény
                if (type === "appstore" || type.includes("app store")) {
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform duration-300 hover:scale-105 inline-block shadow-md hover:shadow-xl overflow-hidden"
                    >
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                        alt="Download on the App Store" 
                        className="h-12 w-auto object-contain"
                      />
                    </a>
                  );
                }

                // Alapértelmezett webes gomb (ha sima weboldal link)
                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3.5  bg-neutral-900 text-white hover:bg-neutral-800 text-sm font-mono tracking-wider transition-all shadow-md border border-neutral-700"
                  >
                    <ExternalLink className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>{link.buttonText || "Website öffnen"}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}