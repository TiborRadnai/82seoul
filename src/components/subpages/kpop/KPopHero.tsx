'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_GLOW_COLORS = [
  'from-purple-600/30 via-indigo-500/10 to-transparent',
  'from-pink-600/30 via-rose-500/10 to-transparent',
  'from-cyan-600/30 via-blue-500/10 to-transparent',
];

const FALLBACK_TAGS = ['🎵 FEATURED GROUP', '🔥 TRENDING NOW', '⚡ NEXT-GEN ICON'];

interface KPopHeroProps {
  initialArtists?: any[];
}

export default function KPopHero({ initialArtists = [] }: KPopHeroProps) {
  // Ha kaptunk külső adatot, azonnal feldolgozzuk, nincs szükség useEffect-es felesleges fetch-re!
  const formattedSlides = initialArtists.map((group: any, index: number) => ({
    id: group.id,
    groupName: group.name,
    image: group.wideImage || group.image || '/images/kpop/default.jpg',
    title: group.tagline || `${group.name} an der K-Pop-Spitze`,
    subtitle: group.description || 'Erlebe diese faszinierende Gruppe und ihre größten Hits hautnah.',
    tag: FALLBACK_TAGS[index] || '⭐ FEATURED',
    glowColor: group.themeColor 
      ? `from-[${group.themeColor}]/30 via-zinc-500/10 to-transparent` 
      : FALLBACK_GLOW_COLORS[index % FALLBACK_GLOW_COLORS.length],
  }));

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (formattedSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % formattedSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [formattedSlides.length]);

  if (formattedSlides.length === 0) return null;

  const slide = formattedSlides[current];

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
          className={`absolute -top-24 -left-24 w-[600px] h-[600px] bg-linear-to-br ${slide.glowColor} blur-[140px] rounded-full pointer-events-none z-0`}
        />
      </AnimatePresence>

      {/* TARTALOM KORLÁTOZÁSA A BELSŐ IGAZÍTÁSHOZ */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-16 sm:pt-20 lg:pt-28 pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* BAL OLDAL: SZÖVEG & INFÓK */}
          <div className="lg:col-span-6 flex flex-col justify-center h-[380px] sm:h-[420px] overflow-hidden">
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

                {/* ALCÍM */}
                <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl font-normal mb-8 line-clamp-3">
                  {slide.subtitle}
                </p>

                {/* GOMB */}
                <div className="flex items-center gap-4 pt-1">
                  <Link
                    href={`/kpop/${slide.id}`}
                    className="inline-block px-8 py-4 rounded-full bg-white text-zinc-950 font-bold text-xs tracking-widest uppercase hover:bg-zinc-200 transition-all shadow-lg hover:shadow-xl active:scale-95"
                  >
                    Profil von {slide.groupName} →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* JOBB OLDAL: KÉP ÉS CONTROLS */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-800">
              {/* Nincs AnimatePresence a kezdeti renderen, sima div, ami nem blokkolja a fő szálat! */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.groupName}
                  fill
                  priority={current === 0}
                  loading={current === 0 ? "eager" : "lazy"}
                  fetchPriority={current === 0 ? "high" : "auto"}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 text-white font-serif text-3xl sm:text-4xl tracking-wide font-light">
                  {slide.groupName}
                </div>
              </div>
            </div>

            {/* PONT (SLIDER) NAVIGÁCIÓ */}
            <div className="flex items-center justify-end gap-3 mt-4">
              {formattedSlides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(idx)}
                  className={`relative h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === current ? 'w-10 bg-white' : 'w-3 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Zu Slide ${idx + 1} wechseln`}
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