'use client';

import React from 'react';

interface GraffitiItem {
  name: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  weight: 'light' | 'normal' | 'bold' | 'black';
  opacity: string;
  rotation?: string;
}

const GRAFFITI_NAMES: GraffitiItem[] = [
  { name: 'ILLIT', size: 'md', weight: 'bold', opacity: 'opacity-75', rotation: 'rotate-1' },
  { name: 'STAYC', size: '2xl', weight: 'black', opacity: 'opacity-100', rotation: '-rotate-1' },
  { name: 'BTS', size: '2xl', weight: 'black', opacity: 'opacity-100', rotation: '-rotate-2' },
  { name: 'Secret Number', size: 'sm', weight: 'normal', opacity: 'opacity-70' },
  { name: 'aespa', size: 'xl', weight: 'black', opacity: 'opacity-95', rotation: 'rotate-3' },
  { name: 'Jungkook', size: 'lg', weight: 'bold', opacity: 'opacity-90', rotation: '-rotate-1' },
  { name: 'LE SSERAFIM', size: '2xl', weight: 'black', opacity: 'opacity-100', rotation: 'rotate-2' },
  { name: 'TIOT', size: 'xs', weight: 'light', opacity: 'opacity-50', rotation: 'rotate-3' },
  { name: 'BLACKPINK', size: '2xl', weight: 'black', opacity: 'opacity-100', rotation: 'rotate-1' },
  { name: 'SEVENTEEN', size: '2xl', weight: 'black', opacity: 'opacity-100', rotation: '-rotate-2' },
  { name: 'Lapillus', size: 'sm', weight: 'normal', opacity: 'opacity-60' },
  { name: 'Stray Kids', size: '2xl', weight: 'black', opacity: 'opacity-100', rotation: '-rotate-1' },
  { name: 'Jennie', size: 'lg', weight: 'bold', opacity: 'opacity-90', rotation: 'rotate-1' },
  { name: 'TREASURE', size: 'lg', weight: 'bold', opacity: 'opacity-85', rotation: '-rotate-2' },
  { name: 'Cortis', size: 'xs', weight: 'light', opacity: 'opacity-50' },
  { name: 'TWICE', size: 'xl', weight: 'black', opacity: 'opacity-95', rotation: 'rotate-2' },
  { name: 'ITZY', size: 'xl', weight: 'black', opacity: 'opacity-95', rotation: '-rotate-1' },
  { name: 'NewJeans', size: '2xl', weight: 'black', opacity: 'opacity-100', rotation: '-rotate-2' },
  { name: 'Jisoo', size: 'lg', weight: 'bold', opacity: 'opacity-90', rotation: 'rotate-1' },
  { name: 'ENHYPEN', size: 'lg', weight: 'bold', opacity: 'opacity-85', rotation: '-rotate-1' },
  { name: 'XG', size: '2xl', weight: 'black', opacity: 'opacity-100', rotation: '-rotate-3' },
  { name: 'IVE', size: 'xl', weight: 'black', opacity: 'opacity-95', rotation: '-rotate-1' },
  { name: 'Jin', size: 'md', weight: 'bold', opacity: 'opacity-80', rotation: 'rotate-3' },
  { name: '(G)I-DLE', size: 'xl', weight: 'bold', opacity: 'opacity-90', rotation: '-rotate-3' },
  { name: 'Baby DONT Cry', size: 'sm', weight: 'normal', opacity: 'opacity-65', rotation: 'rotate-2' },
  { name: 'BABYMONSTER', size: 'lg', weight: 'bold', opacity: 'opacity-85', rotation: 'rotate-2' },
  { name: 'Red Velvet', size: 'lg', weight: 'bold', opacity: 'opacity-90', rotation: 'rotate-2' },
  { name: 'ATEEZ', size: 'xl', weight: 'black', opacity: 'opacity-95', rotation: '-rotate-2' },
  { name: 'n.SSign', size: 'sm', weight: 'normal', opacity: 'opacity-60' },
  { name: 'BOYNEXTDOOR', size: 'md', weight: 'bold', opacity: 'opacity-80', rotation: 'rotate-2' },
  { name: 'MEOVV', size: 'sm', weight: 'normal', opacity: 'opacity-70', rotation: '-rotate-1' },
  { name: 'TOMORROW X TOGETHER', size: 'xl', weight: 'black', opacity: 'opacity-95', rotation: 'rotate-1' },
  { name: 'RIIZE', size: '2xl', weight: 'black', opacity: 'opacity-100', rotation: 'rotate-2' },
  { name: 'ZEROBASEONE', size: 'lg', weight: 'bold', opacity: 'opacity-85', rotation: '-rotate-3' },
  { name: 'KISS OF LIFE', size: 'xl', weight: 'black', opacity: 'opacity-95', rotation: 'rotate-1' },
  { name: 'NMIXX', size: 'lg', weight: 'bold', opacity: 'opacity-85', rotation: '-rotate-2' },
  { name: 'Rosé', size: 'lg', weight: 'bold', opacity: 'opacity-90', rotation: 'rotate-2' },
  { name: 'Jimin', size: 'md', weight: 'bold', opacity: 'opacity-80', rotation: '-rotate-2' },
  { name: 'Lisa', size: 'lg', weight: 'bold', opacity: 'opacity-90', rotation: '-rotate-1' },
  { name: 'j-hope', size: 'md', weight: 'bold', opacity: 'opacity-75', rotation: 'rotate-2' },
  { name: 'Suga (Agust D)', size: 'lg', weight: 'bold', opacity: 'opacity-85', rotation: '-rotate-2' },
  { name: 'AKMU', size: 'lg', weight: 'black', opacity: 'opacity-90', rotation: '-rotate-2' },
  { name: 'Yuqi', size: 'md', weight: 'bold', opacity: 'opacity-80', rotation: 'rotate-1' },
  { name: 'MCND', size: 'md', weight: 'bold', opacity: 'opacity-75', rotation: '-rotate-3' },
  { name: 'XDinary Heroes', size: 'xl', weight: 'black', opacity: 'opacity-95', rotation: 'rotate-2' },
  { name: 'P1Harmony', size: 'lg', weight: 'bold', opacity: 'opacity-90', rotation: 'rotate-3' },
  { name: 'Winner', size: 'md', weight: 'bold', opacity: 'opacity-80', rotation: '-rotate-2' },
  { name: 'NCT Wish', size: 'lg', weight: 'bold', opacity: 'opacity-85', rotation: '-rotate-1' },
  { name: 'xikers', size: 'md', weight: 'bold', opacity: 'opacity-75', rotation: 'rotate-2' },
  { name: 'Everglow', size: 'lg', weight: 'bold', opacity: 'opacity-85', rotation: 'rotate-1' },
  { name: 'TWS', size: 'xl', weight: 'black', opacity: 'opacity-95', rotation: '-rotate-2' },
  { name: 'The Boyz Special Unit', size: 'md', weight: 'normal', opacity: 'opacity-70', rotation: '-rotate-1' },
  { name: 'KINGDOM', size: 'lg', weight: 'bold', opacity: 'opacity-85', rotation: 'rotate-3' },
  { name: 'BTOB', size: 'xl', weight: 'black', opacity: 'opacity-90', rotation: '-rotate-2' },
];

export default function KPopGraffitiWall() {
  const sizeClasses = {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-xl',
    lg: 'text-xl sm:text-3xl',
    xl: 'text-2xl sm:text-4xl',
    '2xl': 'text-4xl sm:text-6xl',
  };

  const weightClasses = {
    light: 'font-light tracking-wide',
    normal: 'font-normal tracking-normal',
    bold: 'font-bold tracking-tight',
    black: 'font-black tracking-tighter',
  };

  return (
    <section className="relative w-full bg-zinc-950 text-white overflow-hidden py-12 sm:py-16 px-6 sm:px-12 flex flex-col justify-center items-center select-none">
      
      {/* Finom háttér textúra */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.06)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      {/* Kompakt, teljes szélességű Grafiti Fal */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-10 leading-none max-w-[1700px] mx-auto">
        {GRAFFITI_NAMES.map((item, index) => (
          <div
            key={index}
            className={`transition-transform duration-300 hover:scale-110 hover:text-pink-400 hover:rotate-0 cursor-default ${item.opacity} ${item.rotation || ''}`}
          >
            <span
              className={`inline-block text-zinc-300 hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] transition-all ${
                sizeClasses[item.size]
              } ${weightClasses[item.weight]}`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}