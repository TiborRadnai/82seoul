'use client';

import Image from 'next/image';
import { useState } from 'react';
import DramaDetailHero from './DramaDetailHero';
import ActorModal from '@/components/modals/ActorModal';
import PlatformLogo from '@/components/PlatformLogo';

interface DramaDetailContentProps {
  drama: any;
}

export default function DramaDetailContent({ drama }: DramaDetailContentProps) {
  const [hoveredActor, setHoveredActor] = useState<any>(null);
  const [selectedActor, setSelectedActor] = useState<any>(null);

  if (!drama) return null;

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-[#0a0a0c] via-[#16161a] to-[#f8f9fa] text-neutral-900 select-none pb-28 relative">
      
      {/* 1. Impozáns Hero szekció */}
      <DramaDetailHero drama={drama} />

      {/* 2. Fő tartalom szekció */}
      <div className="max-w-375 mx-auto px-6 md:px-12 lg:px-16 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Bal oszlop: Álló poszter */}
          <div className="lg:col-span-4 sticky top-28">
            {drama.image ? (
              <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl border border-neutral-700/60 shadow-2xl bg-neutral-900">
                <Image 
                  src={drama.image} 
                  alt={drama.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-center"
                />
              </div>
            ) : (
              <div className="w-full aspect-2/3 rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 text-sm">
                Kein Poster
              </div>
            )}
          </div>

          {/* Jobb oszlop: Történet és Főszereplők */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Történet / Leírás */}
            {drama.description && (
              <div className="bg-neutral-900/75 backdrop-blur-xl rounded-2xl p-8 border border-neutral-700/60 shadow-2xl text-white">
                <h2 className="text-2xl font-bold mb-6 text-white tracking-wide border-b border-neutral-800 pb-3 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                  <span>Handlung</span>
                </h2>
                <div className="max-h-125 overflow-y-auto pr-3 custom-scrollbar">
                  <p className="text-neutral-300 leading-relaxed font-light text-base md:text-lg whitespace-pre-line">
                    {drama.description}
                  </p>
                </div>
              </div>
            )}

            {/* Főszereplők (Cast) */}
            {drama.cast && drama.cast.length > 0 && (
              <div className="relative">
                <h2 className="text-2xl font-bold mb-6 text-white tracking-wide flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                  <span>Besetzung</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {drama.cast.map((actor: any) => (
                    <div 
                      key={actor.id || actor.name} 
                      onMouseEnter={() => setHoveredActor(actor)}
                      onMouseLeave={() => setHoveredActor(null)}
                      onClick={() => setSelectedActor(actor)}
                      className="flex items-center gap-3.5 bg-neutral-900/75 backdrop-blur-md p-4 rounded-xl border border-neutral-700/60 hover:border-amber-400 hover:bg-neutral-900 transition-all cursor-pointer group shadow-lg"
                    >
                      {/* Avatar */}
                      {actor.image ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-neutral-950 border border-neutral-700 group-hover:border-amber-400 transition-colors">
                          <Image 
                            src={actor.image} 
                            alt={actor.name}
                            fill
                            sizes="48px"
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-neutral-950 flex items-center justify-center text-xs text-neutral-500 shrink-0 border border-neutral-700">
                          Kein
                        </div>
                      )}

                      {/* Név és szöveg */}
                      <div className="overflow-hidden">
                        <span className="font-semibold text-sm text-neutral-100 group-hover:text-amber-300 transition-colors block line-clamp-1">
                          {actor.name}
                        </span>
                        <span className="text-xs text-neutral-400 group-hover:text-amber-400 transition-colors block line-clamp-1 font-medium">
                          Mehr erfahren
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lebegő nagy portré panel (Hoverre) */}
                {hoveredActor && hoveredActor.image && (
                  <div className="absolute z-45 bottom-full left-1/2 -translate-x-1/2 mb-6 w-72 bg-neutral-900/95 backdrop-blur-2xl border border-neutral-700 rounded-2xl p-5 shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                    <div className="relative w-full h-80 rounded-xl overflow-hidden bg-neutral-950 mb-4 border border-neutral-700 shadow-inner">
                      <Image 
                        src={hoveredActor.image} 
                        alt={hoveredActor.name}
                        fill
                        sizes="288px"
                        className="object-cover object-center"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white text-center tracking-wide">
                      {hoveredActor.name}
                    </h3>
                    {hoveredActor.role && (
                      <p className="text-xs text-amber-400 text-center mt-1 font-medium tracking-wide">
                        {hoveredActor.role}
                      </p>
                    )}
                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      </div>

      {/* 3. Itt volt a hiányzó elem: Színész Részletek Modal bekötése */}
      <ActorModal actor={selectedActor} onClose={() => setSelectedActor(null)} />

    </div>
  );
}