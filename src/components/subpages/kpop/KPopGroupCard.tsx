'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion, Variants } from 'framer-motion';

interface KPopGroupCardProps {
  band: any;
  index: number;
  showRank?: boolean;
}

const getRankBadgeStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        label: 'TOP 1',
        icon: '👑',
        bg: 'bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-zinc-950 border-amber-200/80 shadow-lg shadow-amber-500/10 font-black',
      };
    case 2:
      return {
        label: 'TOP 2',
        icon: '🥈',
        bg: 'bg-gradient-to-r from-slate-100 via-zinc-200 to-slate-300 text-zinc-950 border-white/80 shadow-lg shadow-zinc-400/10 font-black',
      };
    case 3:
      return {
        label: 'TOP 3',
        icon: '🥉',
        bg: 'bg-gradient-to-r from-amber-700 via-orange-800 to-amber-900 text-amber-100 border-amber-600/50 shadow-lg shadow-amber-900/10 font-bold',
      };
    default:
      return {
        label: `#${rank || 1}`,
        icon: null,
        bg: 'bg-zinc-900/80 backdrop-blur-md text-zinc-200 border-zinc-700/60 font-semibold',
      };
  }
};

export default function KPopGroupCard({ band, index, showRank = true }: KPopGroupCardProps) {
  const searchParams = useSearchParams();
  const queryStr = searchParams.toString();
  const detailHref = `/kpop/${band.id}${queryStr ? `?${queryStr}` : ''}`;

  const isEven = index % 2 === 0;
  const rankBadge = getRankBadgeStyle(band.rank);

  const textUnrollVariant: Variants = {
    hidden: { 
      opacity: 0,
      x: isEven ? -60 : 60 
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const imageUnrollVariant: Variants = {
    hidden: { 
      opacity: 0,
      x: isEven ? 60 : -60,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 } 
    },
  };

  const lineVariant: Variants = {
    hidden: { scaleX: 0, originX: isEven ? 0 : 1 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 0.8, ease: 'easeInOut', delay: 0.7 } 
    }
  };

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
    <div className="relative py-6 transform-gpu backface-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* --- SZÖVEGES BLOKK --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={textUnrollVariant}
          className={`relative flex flex-col justify-center lg:col-span-6 transform-gpu will-change-[clip-path,transform] ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <span className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-2 z-10">
            {band.filterAgency || band.agency} • {band.members}
          </span>

          <div className="relative flex items-center justify-between w-full mb-4 min-h-20 sm:min-h-27.5 overflow-hidden">
            <h2 
              className={`font-serif font-normal text-zinc-900 tracking-tight leading-none z-10 break-normal ${
                band.name?.length > 10 
                  ? 'text-3xl sm:text-5xl lg:text-6xl xl:text-7xl' 
                  : 'text-4xl sm:text-6xl lg:text-7xl xl:text-8xl' 
              }`}
            >
              {band.name}
            </h2>

            {showRank && (
              <span className="pointer-events-none select-none text-6xl sm:text-8xl lg:text-[110px] font-serif font-normal text-zinc-900/8 leading-none shrink-0 ml-2 z-0">
                {band.rank && band.rank < 10 ? `0${band.rank}` : band.rank || '01'}
              </span>
            )}
          </div>

          <div className="relative w-full h-12 flex items-center my-2 z-20">
            <motion.div 
              variants={lineVariant}
              className="w-full h-px bg-zinc-400 transform-gpu" 
            />
            
            <div className={`absolute top-1/2 -translate-y-1/2 z-30 ${
              isEven ? 'right-4 sm:right-8' : 'left-4 sm:left-8'
            }`}>
              <motion.div variants={buttonVariant} className="transform-gpu">
                <Link
                  href={detailHref}
                  className="group relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-zinc-900 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase transition-all duration-500 ease-out hover:scale-110 border border-zinc-200/80 shadow-md hover:shadow-[0_10px_35px_rgba(0,0,0,0.18)] shrink-0"
                >
                  <div className="absolute inset-0 rounded-full bg-zinc-900/15 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-125" />
                  <span className="text-center px-2 font-semibold tracking-wider transition-colors duration-300 group-hover:text-zinc-950">
                    ISMERD MEG!
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>

          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal mt-6 sm:mt-8 z-10">
            {band.description || band.tagline}
          </p>
        </motion.div>

        {/* --- KÉP BLOKK --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={imageUnrollVariant}
          className={`lg:col-span-6 transform-gpu will-change-[clip-path,transform] ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <Link href={detailHref} className="block group">
            <div className="relative w-full aspect-21/9 rounded-none border-none shadow-2xl overflow-hidden bg-zinc-300 transform-gpu">
              
              {showRank && (
                <div className="absolute top-4 right-4 z-20 pointer-events-none">
                  <div 
                    className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] tracking-widest uppercase border flex items-center gap-1.5 ${rankBadge.bg}`}
                  >
                    {rankBadge.icon && <span className="text-xs">{rankBadge.icon}</span>}
                    <span>{rankBadge.label}</span>
                  </div>
                </div>
              )}

              {(band.wideImage || band.image) ? (
                <Image
                  src={band.wideImage || band.image}
                  alt={band.name || 'K-Pop Group'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out transform-gpu"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs font-medium">
                  Nincs elérhető kép
                </div>
              )}
            </div>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}