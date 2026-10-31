import Link from "next/link";
import { ArrowUpRight, Scroll } from "lucide-react";
import { client } from "@sanity/lib/client";
import { getTravelArticlesByCategoryQuery } from "@sanity/queries";

export default async function CultureSection() {
  // Lekérdjük a 'culture' kategória kiemelt elemeit a Sanity-ből, sorrend szerint
  const articles = await client.fetch(getTravelArticlesByCategoryQuery, { category: 'culture' });

  // Biztonsági mentés a két elemre
  const palaces = articles[0] || {};
  const gyeongju = articles[1] || {};

  return (
    <section id="culture" className="w-full pb-16 md:pb-24 bg-slate-100 text-neutral-900 relative overflow-hidden border-t border-slate-200/60">
      
      {/* Finom meleg háttérfény a hagyományok hangulatához */}
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 z-10 relative space-y-24">
        
        {/* --- EDITORIAL FEJLÉC --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-amber-700 text-xs font-mono tracking-widest uppercase">
              <Scroll className="w-4 h-4 text-amber-600" />
              <span>Kapitel 02 // Kultur & Tradition</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-950 leading-none">
              Kultur <span className="font-serif italic font-normal text-amber-800">& Erbe</span>
            </h2>
          </div>
          <p className="text-neutral-600 text-base md:text-lg font-light leading-relaxed max-w-md">
            Jahrhundertealte Paläste, stille Tempel und das bewahrte Kunsthandwerk. Tauche in das historische Herz Koreas.
          </p>
        </div>

        {/* --- ASZIMMETRIKUS KULTÚRA GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* 1. SZTORI BLOKK: Paloták & Hanbok (vagy az 1. elem) */}
          <div className="lg:col-span-7 space-y-8">
            <Link
              href={`/korea-travel/${palaces.slug || 'culture-palaces'}`}
              className="block relative w-full h-[55vh] md:h-[65vh] overflow-hidden group cursor-pointer rounded-2xl shadow-xl"
            >
              {palaces.image && (
                <img
                  src={palaces.image}
                  alt={palaces.title || 'Gyeongbokgung Palast und Hanbok'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
              
              <div className="absolute top-6 left-6">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono tracking-widest text-neutral-900 uppercase shadow-md">
                  {palaces.tag || '01 // Paläste & Hanbok'}
                </span>
              </div>

              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                <h4 className="text-2xl md:text-4xl font-light tracking-tight">
                  {palaces.title || 'Königliche Eleganz in Seoul'}
                </h4>
                <p className="text-slate-300 text-sm md:text-base font-light line-clamp-2">
                  {palaces.description}
                </p>
              </div>
            </Link>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Fokus // Architektur & Zeremonie</span>
              <Link
                href={`/korea-travel/${palaces.slug || 'culture-palaces'}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-amber-700 transition-colors group"
              >
                <span>Kapitel lesen</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* 2. SZTORI BLOKK: Gyeongju & Tempel (vagy a 2. elem) */}
          <div className="lg:col-span-5 space-y-10 lg:pt-12">
            
            <div className="space-y-4">
              <span className="text-xs font-mono text-amber-700 tracking-widest uppercase">{gyeongju.tag || '02 // Gyeongju'}</span>
              <h3 className="text-3xl md:text-4xl font-light text-neutral-950 tracking-tight">
                {gyeongju.title || 'Das Museum ohne Grenzen'}
              </h3>
              <p className="text-neutral-600 text-base font-light leading-relaxed">
                {gyeongju.description}
              </p>
            </div>

            <Link
              href={`/korea-travel/${gyeongju.slug || 'culture-gyeongju'}`}
              className="block relative w-full h-[40vh] md:h-[45vh] overflow-hidden group cursor-pointer rounded-2xl shadow-xl"
            >
              {gyeongju.image && (
                <img
                  src={gyeongju.image}
                  alt={gyeongju.title || 'Bulguksa Tempel Gyeongju'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                />
              )}
              <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors duration-500" />
            </Link>

            <div className="pt-2">
              <Link
                href={`/korea-travel/${gyeongju.slug || 'culture-gyeongju'}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-amber-700 transition-colors group"
              >
                <span>Gyeongju erkunden</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

          </div>

        </div>

        {/* Lezáró link */}
        <div className="pt-8 text-center">
          <Link
            href="/korea-travel/culture-overview"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-neutral-900 hover:text-amber-700 transition-colors group cursor-pointer"
          >
            <span>Alle Kultur- & Traditionsthemen erkunden</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>

      {/* Szeparátor vonal alul */}
      <div className="max-w-7xl mx-auto px-6 pt-20">
        <div className="w-full h-px bg-neutral-300/80" />
      </div>

    </section>
  );
}