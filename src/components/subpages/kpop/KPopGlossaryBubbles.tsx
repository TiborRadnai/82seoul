'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KPopTerm {
  id: string;
  term: string;
  korean?: string;
  definition: string;
  example?: string;
  size: number;
  desktopPos: { top: string; left: string };
  animClass: string;
  glassGradient: string;
  glowColor: string;
}

const GLOSSARY_TERMS: KPopTerm[] = [
  {
    id: 'bias',
    term: 'Bias',
    korean: '최애 (Choeae)',
    definition: 'A személyes kedvenc tagod egy adott K-Pop csapatban, akit a legjobban imádsz.',
    example: '„Ki a biasod a Blackpinkből?”',
    size: 140,
    desktopPos: { top: '8%', left: '8%' },
    animClass: 'animate-float-slow',
    glassGradient: 'from-pink-300/40 via-rose-200/30 to-white/60',
    glowColor: 'rgba(244, 114, 182, 0.35)',
  },
  {
    id: 'comeback',
    term: 'Comeback',
    korean: '컴백',
    definition: 'Új album, kislemez vagy dal megjelenése – a K-Popban ez minden új zenei projektet jelent, függetlenül attól, mennyi telt el az előző óta.',
    example: '„A BTS jövő hónapban csinál comeback-et!”',
    size: 150,
    desktopPos: { top: '4%', left: '28%' },
    animClass: 'animate-float-medium',
    glassGradient: 'from-sky-300/40 via-blue-200/30 to-white/60',
    glowColor: 'rgba(56, 189, 248, 0.35)',
  },
  {
    id: 'lightstick',
    term: 'Lightstick',
    korean: '응원봉',
    definition: 'Hivatalos, világító rajongói bot, amit minden fandom egyedivé alakít, és a koncerteken hullámzanak vele.',
    example: '„Megérkezett a legújabb verziós lightstickem!”',
    size: 125,
    desktopPos: { top: '10%', left: '52%' },
    animClass: 'animate-float-fast',
    glassGradient: 'from-emerald-300/40 via-teal-200/30 to-white/60',
    glowColor: 'rgba(52, 211, 153, 0.35)',
  },
  {
    id: 'hiatus',
    term: 'Hiatus',
    korean: '휴식기',
    definition: 'Hivatalos szünet vagy pihenőidőszak – vonatkozhat egy egész csapatra, egy adott tagra (pl. katonaság vagy egészségügy miatt), vagy szólóprojektekre.',
    size: 135,
    desktopPos: { top: '6%', left: '76%' },
    animClass: 'animate-float-fast',
    glassGradient: 'from-purple-300/40 via-fuchsia-200/30 to-white/60',
    glowColor: 'rgba(192, 132, 252, 0.35)',
  },
  {
    id: 'multistan',
    term: 'Multi-Stan',
    korean: '멀티스팬',
    definition: 'Olyan rajongó, aki egyszerre több különböző K-Pop bandát is aktívan követ és imád.',
    example: '„Én teljes mértékben multi-stan vagyok, nem tudnék csak egy csapatot választani.”',
    size: 145,
    desktopPos: { top: '35%', left: '40%' },
    animClass: 'animate-float-slow',
    glassGradient: 'from-amber-300/40 via-yellow-200/30 to-white/60',
    glowColor: 'rgba(251, 191, 36, 0.35)',
  },
  {
    id: 'maknae',
    term: 'Maknae',
    korean: '막내',
    definition: 'A legfiatalabb tag egy K-Pop csapatban, akiért a rajongók (és gyakran a többi tag) rajongásig odavannak.',
    example: '„Jungkook a BTS arany maknae-ja.”',
    size: 130,
    desktopPos: { top: '45%', left: '12%' },
    animClass: 'animate-float-medium',
    glassGradient: 'from-emerald-300/40 via-teal-200/30 to-white/60',
    glowColor: 'rgba(45, 212, 191, 0.35)',
  },
  {
    id: 'unnie',
    term: 'Unnie',
    korean: '언니',
    definition: 'Kifejezés, amit egy nő/lány használ a nálánál idősebb női barátjára vagy női idolra.',
    size: 125,
    desktopPos: { top: '50%', left: '26%' },
    animClass: 'animate-float-fast',
    glassGradient: 'from-rose-300/40 via-pink-200/30 to-white/60',
    glowColor: 'rgba(251, 113, 133, 0.35)',
  },
  {
    id: 'allkill',
    term: 'All-Kill',
    korean: '올킬',
    definition: 'Amikor egy dal egyszerre vezeti az összes major koreai valós idejű slágerlistát (Melon, Genie, Bugs stb.).',
    size: 120,
    desktopPos: { top: '20%', left: '88%' },
    animClass: 'animate-float-slow',
    glassGradient: 'from-yellow-300/40 via-amber-200/30 to-white/60',
    glowColor: 'rgba(250, 204, 21, 0.35)',
  },
  {
    id: 'hyung',
    term: 'Hyung',
    korean: '형',
    definition: 'Kifejezés, amit egy fiú/férfi használ a nálánál idősebb férfi barátjára vagy férfi idolra.',
    size: 135,
    desktopPos: { top: '48%', left: '64%' },
    animClass: 'animate-float-slow',
    glassGradient: 'from-blue-300/40 via-indigo-200/30 to-white/60',
    glowColor: 'rgba(99, 102, 241, 0.35)',
  },
  {
    id: 'trainee',
    term: 'Trainee',
    korean: '연습생',
    definition: 'Gyakornok, aki egy szórakoztatóipari ügynökségnél keményen tanul és készül a hivatalos debütálására.',
    size: 130,
    desktopPos: { top: '38%', left: '84%' },
    animClass: 'animate-float-fast',
    glassGradient: 'from-rose-300/40 via-pink-200/30 to-white/60',
    glowColor: 'rgba(251, 113, 133, 0.35)',
  },
  {
    id: 'stan',
    term: 'Stan',
    korean: '스탠',
    definition: 'Hardcore, rendkívül elhivatott rajongó, aki minden zenei megjelenést, hírt és rezdülést követ.',
    size: 140,
    desktopPos: { top: '75%', left: '10%' },
    animClass: 'animate-float-fast',
    glassGradient: 'from-amber-300/40 via-orange-200/30 to-white/60',
    glowColor: 'rgba(251, 146, 60, 0.35)',
  },
  {
    id: 'fanchant',
    term: 'Fanchant',
    korean: '응원법',
    definition: 'A koncerteken és zenei show-kon skandált koreografált közös rigmusok a dalok ütemére (pl. a tagok nevének kiabálása).',
    size: 145,
    desktopPos: { top: '70%', left: '28%' },
    animClass: 'animate-float-slow',
    glassGradient: 'from-cyan-300/40 via-sky-200/30 to-white/60',
    glowColor: 'rgba(34, 211, 238, 0.35)',
  },
  {
    id: 'killingpart',
    term: 'Killing Part',
    korean: '킬링파트',
    definition: 'A dal leghúzósabb, legfülbemászóbb vagy legikonikusabb része, amit a rajongók azonnal megjegyeznek.',
    size: 140,
    desktopPos: { top: '68%', left: '55%' },
    animClass: 'animate-float-medium',
    glassGradient: 'from-indigo-300/40 via-violet-200/30 to-white/60',
    glowColor: 'rgba(129, 140, 248, 0.35)',
  },
  {
    id: 'bside',
    term: 'B-Side',
    korean: '수록곡',
    definition: 'Az albumon lévő dalok gyűjtőneve a főcímdalon (Title Track) kívül – a rajongók gyakran ezeket szeretik a legjobban.',
    size: 135,
    desktopPos: { top: '78%', left: '80%' },
    animClass: 'animate-float-fast',
    glassGradient: 'from-teal-300/40 via-emerald-200/30 to-white/60',
    glowColor: 'rgba(45, 212, 191, 0.35)',
  },
];

export default function KPopGlossaryBubbles() {
  const [selectedTerm, setSelectedTerm] = useState<KPopTerm | null>(null);

  return (
    <section className="relative w-full py-20 sm:py-24 overflow-hidden bg-linear-to-b from-zinc-950 via-zinc-100 to-zinc-200 text-zinc-900 select-none">
      
      {/* Opcionális felső átmenetes sáv, ami a fekete graffitiből finoman bevezeti a világos alapot */}
      <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-zinc-950 to-transparent pointer-events-none z-10" />

      {/* CÍMSOR */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-4 mb-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          82SEOUL • RAW K-POP DICTIONARY
        </div>

        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-900 mb-6 leading-tight">
          Szavak, amik nélkül{' '}
          <span className="bg-linear-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
            nem létezik
          </span>{' '}
          Fandom.
        </h2>

        <p className="text-zinc-600 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
          Pattintsd fel a buborékokat, és tudd meg pontosan, mit dealelnek a koreai zeneipar kulisszái mögött!
        </p>
      </div>

      {/* MOBIL / TABLET / KISEBB LAPTOP NÉZET (< 1280px): Változatlan, stabil rács */}
      <div className="xl:hidden w-full px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-w-5xl mx-auto">
        {GLOSSARY_TERMS.map((item) => (
          <div
            key={`mob-${item.id}`}
            onClick={() => setSelectedTerm(item)}
            className={`group cursor-pointer p-4 rounded-2xl bg-linear-to-br ${item.glassGradient} backdrop-blur-md border border-white/80 shadow-md transition-all duration-300 active:scale-[0.98] flex items-center justify-between`}
            style={{
              boxShadow: `0 10px 25px -5px ${item.glowColor}`,
            }}
          >
            <div>
              {item.korean && (
                <span className="text-[10px] font-black tracking-widest uppercase text-pink-600 block mb-0.5">
                  {item.korean}
                </span>
              )}
              <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">
                {item.term}
              </h3>
              <p className="text-xs text-zinc-700 font-medium line-clamp-1 mt-0.5">
                {item.definition}
              </p>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-white/70 border border-white flex items-center justify-center text-zinc-800 font-bold text-xs shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              →
            </div>
          </div>
        ))}
      </div>

      {/* NAGY DESKTOP NÉZET (>= 1280px): Teljes képernyős szélesség (max-w-[1600px]), szellős buborék-térkép */}
      <div className="hidden xl:block relative w-full h-155 max-w-[1600px] mx-auto px-6">
        {GLOSSARY_TERMS.map((item) => (
          <div
            key={`desk-${item.id}`}
            onClick={() => setSelectedTerm(item)}
            className={`group absolute cursor-pointer flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 active:scale-95 ${item.animClass}`}
            style={{
              width: `${item.size}px`,
              height: `${item.size}px`,
              top: item.desktopPos.top,
              left: item.desktopPos.left,
            }}
          >
            <div 
              className={`absolute inset-0 rounded-full bg-linear-to-br ${item.glassGradient} backdrop-blur-md border border-white/80 transition-all duration-300 group-hover:border-white group-hover:shadow-2xl`}
              style={{
                boxShadow: `
                  inset 0 4px 8px 0 rgba(255, 255, 255, 0.9), 
                  inset 0 -6px 12px 0 rgba(0, 0, 0, 0.05), 
                  0 20px 40px -8px ${item.glowColor}
                `,
              }}
            >
              <div className="absolute top-2 left-3 w-2/5 h-1/3 bg-linear-to-b from-white/90 to-transparent rounded-full blur-[1px] pointer-events-none" />
            </div>

            <span className="relative z-10 text-xs font-bold tracking-wider text-zinc-800 uppercase text-center px-2">
              {item.term}
            </span>
          </div>
        ))}
      </div>

      {/* NAGY BUBORÉK MODAL */}
      <AnimatePresence>
        {selectedTerm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTerm(null)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className={`relative z-10 w-80 h-80 sm:w-102.5 sm:h-102.5 rounded-full bg-linear-to-br ${selectedTerm.glassGradient} border-2 border-white/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 sm:p-10 text-center overflow-hidden text-zinc-900 select-none shadow-2xl`}
              style={{
                boxShadow: `
                  inset 0 6px 15px 0 rgba(255, 255, 255, 0.95), 
                  inset 0 -10px 25px 0 rgba(0, 0, 0, 0.08), 
                  0 30px 60px -10px ${selectedTerm.glowColor}
                `,
              }}
            >
              <div className="absolute top-4 left-12 w-2/5 h-1/4 bg-linear-to-b from-white/95 to-transparent rounded-full blur-[1px] pointer-events-none" />

              {selectedTerm.korean && (
                <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-pink-600 block mb-1 drop-shadow-sm">
                  {selectedTerm.korean}
                </span>
              )}
              
              <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 mb-2">
                {selectedTerm.term}
              </h3>

              <div className="w-10 h-1 rounded-full bg-pink-500/50 mb-3" />

              <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed mb-3 font-medium max-w-60 sm:max-w-65">
                {selectedTerm.definition}
              </p>

              {selectedTerm.example && (
                <div className="px-3 py-1.5 rounded-2xl bg-white/50 border border-white/70 text-[10px] sm:text-[11px] italic text-zinc-700 mb-4 max-w-60 sm:max-w-65 leading-snug shadow-sm">
                  {selectedTerm.example}
                </div>
              )}

              <button
                onClick={() => setSelectedTerm(null)}
                className="px-6 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-900 text-white font-bold text-[10px] tracking-widest uppercase transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                Bezárás
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}