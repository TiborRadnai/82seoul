'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { type KPopGroupData } from '@/data/kpopData';

interface KPopGroupCardProps {
  band: KPopGroupData;
  index: number;
}

export default function KPopGroupCard({ band, index }: KPopGroupCardProps) {
  const isEven = index % 2 === 0;

  // Szőnyeg-kigördülés maszk variációk (Explicit Variants típuskiírással)
  const textUnrollVariant: Variants = {
    hidden: { 
      clipPath: isEven ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
      opacity: 0,
      x: isEven ? -40 : 40 
    },
    visible: { 
      clipPath: 'inset(0 0% 0 0%)',
      opacity: 1,
      x: 0,
      transition: { duration: 1.1, ease: 'easeOut' } 
    },
  };

  const imageUnrollVariant: Variants = {
    hidden: { 
      clipPath: isEven ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
      scale: 1.08,
      opacity: 0
    },
    visible: { 
      clipPath: 'inset(0 0% 0 0%)',
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.15 } 
    },
  };

  // Vonal kinyúlási animáció
  const lineVariant: Variants = {
    hidden: { scaleX: 0, originX: isEven ? 0 : 1 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 0.8, ease: 'easeInOut', delay: 0.7 } 
    }
  };

  // Gomb laza, rugalmas belépése
  const buttonVariant: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay: 1.1 
      } 
    }
  };

  return (
    <div className="relative overflow-hidden py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* --- SZÖVEGES BLOKK --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={textUnrollVariant}
          className={`lg:col-span-6 flex flex-col justify-center ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {/* Kiadó & Tagok */}
          <span className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-2">
            {band.agency} • {band.members}
          </span>

          {/* Cím */}
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-normal text-zinc-900 tracking-tight leading-none mb-4">
            {band.name}
          </h2>

          {/* VONAL ÉS A GOMB TENGELYE */}
          <div className="relative w-full h-12 flex items-center my-2">
            
            {/* Animált vonal */}
            <motion.div 
              variants={lineVariant}
              className="w-full h-px bg-zinc-400" 
            />
            
            {/* Animált gomb */}
            <div className={`absolute z-20 top-1/2 -translate-y-1/2 ${
              isEven ? 'right-4 sm:right-8' : 'left-4 sm:left-8'
            }`}>
              <motion.div variants={buttonVariant}>
                <Link
                  href={`/kpop/${band.id}`}
                  className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-zinc-900 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase transition-all duration-300 hover:scale-110 hover:bg-zinc-950 hover:text-white shadow-xl shrink-0"
                >
                  <div className="absolute inset-0 rounded-full bg-zinc-950/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  <span className="text-center px-2 font-semibold tracking-wider">
                    ISMERD MEG!
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* LEÍRÁS */}
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal mt-6 sm:mt-8">
            {band.description}
          </p>
        </motion.div>

{/* --- KÉP BLOKK --- */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-100px' }}
  variants={imageUnrollVariant}
  className={`lg:col-span-6 ${
    isEven ? 'lg:order-2' : 'lg:order-1'
  }`}
>
  <Link href={`/kpop/${band.id}`} className="block group">
    {/* ITT A VÁLTOZTATÁS: aspect-[21/9] a szuper lapos, cinematic hatáshoz */}
    <div className="relative w-full aspect-21/9 rounded-none border-none shadow-2xl overflow-hidden bg-zinc-300">
      <Image
        src={band.wideImage || band.image}
        alt={band.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
    </div>
  </Link>
</motion.div>

      </div>
    </div>
  );
}