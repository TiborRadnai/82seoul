'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../../../../sanity/lib/client';
import { getArtistsQuery } from '../../../../sanity/queries';

const FALLBACK_GLOW_COLORS = [
  'from-purple-600/30 via-indigo-500/10 to-transparent',
  'from-pink-600/30 via-rose-500/10 to-transparent',
  'from-cyan-600/30 via-blue-500/10 to-transparent',
];

const FALLBACK_TAGS = ['🎵 FEATURED GROUP', '🔥 TRENDING NOW', '⚡ NEXT-GEN ICON'];

export default function KPopHero() {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const data = await client.fetch(getArtistsQuery);

        if (!data || data.length === 0) return;

        const topThree = data
          .filter((artist: any) => typeof artist.rank === 'number')
          .sort((a: any, b: any) => a.rank - b.rank)
          .slice(0, 3);

        const formattedSlides = topThree.map((group: any, index: number) => {
          return {
            id: group.id,
            groupName: group.name,
            image: group.wideImage || group.image || '/images/kpop/default.jpg',
            title: group.tagline || `${group.name} - A K-Pop élvonalában`,
            subtitle: group.description || 'Ismerd meg ezt a lenyűgöző csapatot és slágereiket.',
            tag: FALLBACK_TAGS[index] || '⭐ FEATURED',
            glowColor: group.themeColor 
              ? `from-[${group.themeColor}]/30 via-zinc-500/10 to-transparent` 
              : FALLBACK_GLOW_COLORS[index % FALLBACK_GLOW_COLORS.length],
          };
        });

        setSlides(formattedSlides);
      } catch (error) {
        console.error('Hiba a Hero adatok lekérdezésekor:', error);
      }
    }

    fetchHeroData();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <div className="relative w-full bg-zinc-950 text-white overflow-hidden">
      
      {/* DINAMIKUS AMBIENT GLOW A HÁTTÉRBEN */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`absolute -top-24 -left-24 w-150 h-150 bg-linear-to-br ${slide.glowColor} blur-[140px] rounded-full pointer-events-none z-0`}
        />
      </AnimatePresence>

{/* TARTALOM KORLÁTOZÁSA A BELSŐ IGAZÍTÁSHOZ (megnövelt paddinggel) */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-16 sm:pt-20 lg:pt-28 pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* BAL OLDAL: SZÖVEG & INFÓK (Fix magasság beállítása, hogy elkerüld a méretugrást) */}
          <div className="lg:col-span-6 flex flex-col justify-center h-95 sm:h-105 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col justify-center h-full"
              >
                {/* TAG BADGE */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-semibold tracking-widest uppercase mb-6 text-zinc-300 shadow-inner w-fit">
                  {slide.tag}
                </div>

                {/* CÍM */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4 leading-[1.1] line-clamp-2">
                  {slide.title.split(' ')[0]} <span className="font-extrabold text-zinc-100">{slide.title.split(' ').slice(1).join(' ')}</span>
                </h1>

                {/* ALCÍM (sorok korlátozása, hogy ne nőjön túl a kereten) */}
                <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl font-normal mb-8 line-clamp-3">
                  {slide.subtitle}
                </p>

                {/* GOMB */}
                <div className="flex items-center gap-4">
                  <Link
                    href={`/kpop/${slide.id}`}
                    className="px-8 py-4 rounded-full bg-white text-zinc-950 font-bold text-xs tracking-widest uppercase hover:bg-zinc-200 transition-all shadow-lg hover:scale-105 active:scale-95"
                  >
                    {slide.groupName} Profilja →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* JOBB OLDAL: KÉP ÉS CONTROLS */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-16/10 sm:aspect-video rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                <Image
                  src={slide.image}
                  alt={slide.groupName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 text-white font-serif text-3xl sm:text-4xl tracking-wide font-light">
                    {slide.groupName}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* PONT (SLIDER) NAVIGÁCIÓ */}
            <div className="flex items-center justify-end gap-3 mt-4">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(idx)}
                  className={`relative h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === current ? 'w-10 bg-white' : 'w-3 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* ALSÓ ÁTMENET A FEKETÉBŐL A FEHÉR LOGÓSÁVBA */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-b from-transparent to-white pointer-events-none z-20" />
    </div>
  );
}