'use client';

import { useState } from 'react';
import Image from 'next/image';
import ActorModal from '../../modals/ActorModal';

interface Actor {
  id: string;
  name: string;
  koreanName?: string;
  role?: string;
  image: string;
  knownFor?: string;
  bio?: string;
}

export default function ActorEditorial({ actors }: { actors: Actor[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedModalActor, setSelectedModalActor] = useState<Actor | null>(null);

  if (!actors || actors.length === 0) return null;

  const currentActor = actors[activeIndex] || actors[0];

  return (
    <section className="relative w-full bg-[#0a0a0e] text-white py-20 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-neutral-800/60">
      
      {/* Háttérportré: CSS alapú megoldás (Nincs több Image sizes hiba) */}
      <div className="absolute inset-0 z-0 opacity-42 pointer-events-none transition-all duration-1000 ease-in-out">
        {currentActor.image && (
          <div 
            className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url(${currentActor.image})` }}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0e] via-[#0a0a0e]/75 to-[#0a0a0e]/30" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0e] via-[#0a0a0e]/40 to-[#0a0a0e]" />
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto">
        
        {/* Szekció fejléc */}
        <div className="mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-neutral-200">
              82Seoul • Editorial Cast
            </span>
          </div>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-light tracking-tight">
            Die Gesichter hinter den{' '}
            <span className="font-bold bg-linear-to-r from-amber-400 via-rose-400 to-white bg-clip-text text-transparent">
              Geschichten
            </span>
          </h2>
        </div>

        {/* Fő elrendezés */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Jobb oldal: Kiemelt kártya */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div 
              onClick={() => setSelectedModalActor(currentActor)}
              className="relative w-full max-w-sm md:max-w-lg h-96 md:h-125 lg:h-140 rounded-2xl overflow-hidden bg-neutral-900 border border-white/15 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] group cursor-pointer"
            >
              {currentActor.image && (
                <Image
                  key={currentActor.id}
                  src={currentActor.image}
                  alt={currentActor.name}
                  fill
                  sizes="(max-width: 768px) 384px, (max-width: 1024px) 500px, 450px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                {currentActor.knownFor && (
                  <span className="inline-block px-3 py-1 rounded-md bg-white/20 backdrop-blur-md text-xs font-semibold text-white border border-white/20 mb-2 md:mb-3">
                    {currentActor.knownFor}
                  </span>
                )}
                <h4 className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center justify-between">
                  {currentActor.name}
                  <span className="text-xs font-normal tracking-widest text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:inline">
                    Öffnen →
                  </span>
                </h4>
                {currentActor.role && (
                  <p className="text-neutral-300 text-xs md:text-sm font-light">
                    {currentActor.role}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bal oldal: Névlista */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="max-h-64 md:max-h-96 lg:max-h-140 overflow-y-auto pr-4 md:pr-6 space-y-2 md:space-y-3 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
              {actors.map((actor, idx) => {
                const isActive = idx === activeIndex;
                
                return (
                  <div
                    key={actor.id}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      setActiveIndex(idx);
                      setSelectedModalActor(actor);
                    }}
                    className={`group cursor-pointer transition-all duration-300 py-2.5 md:py-3 border-b border-white/10 flex items-baseline justify-between ${
                      isActive 
                        ? 'opacity-100 pl-3 md:pl-4 border-amber-400' 
                        : 'opacity-40 hover:opacity-85 hover:pl-2'
                    }`}
                  >
                    <div>
                      <h3 className={`text-2xl md:text-4xl lg:text-5xl font-light tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-white font-normal' : 'text-neutral-300 group-hover:text-white'
                      }`}>
                        {actor.name}
                      </h3>
                      {actor.koreanName && (
                        <span className={`text-xs md:text-sm font-light tracking-widest mt-0.5 md:mt-1 block ${
                          isActive ? 'text-amber-400/90 font-medium' : 'text-neutral-500'
                        }`}>
                          {actor.koreanName}
                        </span>
                      )}
                    </div>
                    <span className="text-xs uppercase tracking-widest text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono hidden sm:inline-block">
                      Ansehen →
                    </span>
                  </div>
                );
              })}
            </div>
            
            <p className="text-xs text-neutral-500 mt-4 md:mt-5 font-mono tracking-wider pl-1">
              ↓ Für weitere Künstler scrollen ({actors.length} gesamt) • Für Details anklicken
            </p>
          </div>

        </div>

      </div>

      {/* ActorModal bekötése */}
      {selectedModalActor && (
        <ActorModal 
          actor={selectedModalActor} 
          onClose={() => setSelectedModalActor(null)} 
        />
      )}
    </section>
  );
}