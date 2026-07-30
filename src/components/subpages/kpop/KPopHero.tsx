'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { KPOP_GROUPS } from '@/data/kpopData';

// Kiegészítő infók a Hero-hoz (címek, tag-ek, gow színek)
const HERO_EXTRA_DATA: Record<string, { title: string; subtitle: string; tag: string; glowColor: string }> = {
  bts: {
    title: 'A K-Pop Globális Forradalma.',
    subtitle: 'Ismerd meg a csapatokat, akik átírták a zeneipar szabályait és meghódították a világot.',
    tag: '🎵 FEATURED GROUP',
    glowColor: 'from-purple-600/30 via-indigo-500/10 to-transparent',
  },
  blackpink: {
    title: 'A Rekordok Új Királynői.',
    subtitle: 'Stílus, erő és ikonikus slágerek, amik feldúlták a globális toplistákat.',
    tag: '🔥 TRENDING NOW',
    glowColor: 'from-pink-600/30 via-rose-500/10 to-transparent',
  },
  aespa: {
    title: 'A Jövő Zenei Dimenziója.',
    subtitle: 'Ahol a virtuális valóság és a kőkemény K-Pop ritmusok találkoznak.',
    tag: '⚡ NEXT-GEN ICON',
    glowColor: 'from-cyan-600/30 via-blue-500/10 to-transparent',
  },
};

// Összefésüljük a kpopData-ban lévő bandákat a Hero speciális szövegeivel
const HERO_SLIDES = ['bts', 'blackpink', 'aespa'].map((id) => {
  const group = KPOP_GROUPS.find((g) => g.id === id);
  const extra = HERO_EXTRA_DATA[id];

  return {
    id,
    groupName: group?.name || id.toUpperCase(),
    // Itt használjuk a wideImage-t az adatbázisból, vagy tartalékként a sima image-et:
    image: group?.wideImage || group?.image || '/images/kpop/default.jpg',
    title: extra?.title || group?.name || '',
    subtitle: extra?.subtitle || group?.description || '',
    tag: extra?.tag || '⭐ FEATURED',
    glowColor: extra?.glowColor || 'from-purple-600/30 via-indigo-500/10 to-transparent',
  };
});

export default function KPopHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <div className="relative w-full bg-zinc-950 text-white overflow-hidden border-b border-zinc-800">
      
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

      {/* TARTALOM KORLÁTOZÁSA A BELSŐ IGAZÍTÁSHOZ */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* BAL OLDAL: SZÖVEG & INFÓK */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {/* TAG BADGE */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-semibold tracking-widest uppercase mb-6 text-zinc-300 shadow-inner">
                  {slide.tag}
                </div>

                {/* CÍM */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 leading-[1.1]">
                  {slide.title.split(' ')[0]} <span className="font-extrabold text-zinc-100">{slide.title.split(' ').slice(1).join(' ')}</span>
                </h1>

                {/* ALCÍM */}
                <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl font-normal mb-8">
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
                  sizes="(max-width: 1024px) 100vw, 50vw" // <-- EZT A SORT ADD HOZZÁ!
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
              {HERO_SLIDES.map((s, idx) => (
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
    </div>
  );
}