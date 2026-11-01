import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { getTravelArticlesByCategoryQuery } from "../../../../sanity/queries";
import { client } from "../../../../sanity/lib/client";

export default async function MetropolisSection() {
  // Lekérdjük a 'city' kategória elemeit a Sanity-ből, sorrend szerint
  const articles = await client.fetch(getTravelArticlesByCategoryQuery, { category: 'city' });

  // Biztonsági adatok az 1. és 2. elemhez (hardkódolt fallback nélkül)
  const firstCity = articles[0] || {};
  const secondCity = articles[1] || {};

  return (
    <section id="city" className="w-full pt-16 pb-16 md:pb-24 bg-linear-to-b from-neutral-950 via-slate-900 to-slate-100 text-neutral-900 relative overflow-hidden">
      
      {/* Finom, hangulatos háttérfény */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-200 h-125 bg-sky-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 z-10 relative space-y-24">
        
        {/* --- EDITORIAL FEJLÉC --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-sky-400 text-xs font-mono tracking-widest uppercase">
              <Compass className="w-4 h-4" />
              <span>Kapitel 01 // Metropolen & City Life</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-none">
              Metropolen <span className="font-serif italic font-normal text-sky-300">& City Life</span>
            </h2>
          </div>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-md">
            Wo Spitzentechnologie auf pulsierendes Straßenleben trifft. Eine visuelle Reise durch die urbanen Zentren Koreas.
          </p>
        </div>

        {/* --- 1. SZTORI BLOKK: ELSŐ ELEM --- */}
        {firstCity.title && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-sky-400 tracking-widest uppercase">{firstCity.tag || '01 // City'}</span>
                <h3 className="text-3xl md:text-5xl font-light text-white tracking-tight mt-1">
                  {firstCity.title}
                </h3>
              </div>
              <Link
                href={firstCity.slug ? `/ktravel/${firstCity.slug}` : '#'}
                className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 hover:text-white transition-colors group"
              >
                <span>Artikel lesen</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <Link
              href={firstCity.slug ? `/ktravel/${firstCity.slug}` : '#'}
              className="block relative w-full h-[60vh] md:h-[75vh] overflow-hidden group cursor-pointer rounded-2xl shadow-2xl bg-neutral-900"
            >
              {firstCity.image && (
                <img
                  src={firstCity.image}
                  alt={firstCity.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-xl">
                <p className="text-slate-200 text-base md:text-lg font-light leading-relaxed drop-shadow-md">
                  {firstCity.description}
                </p>
              </div>
            </Link>
          </div>
        )}

        {/* --- 2. SZTORI BLOKK: MÁSODIK ELEM --- */}
        {secondCity.title && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono text-sky-400 tracking-widest uppercase">{secondCity.tag || '02 // City'}</span>
              <h3 className="text-3xl md:text-5xl font-light text-white tracking-tight">
                {secondCity.title}
              </h3>
              <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
                {secondCity.description}
              </p>
              <div className="pt-2">
                <Link
                  href={secondCity.slug ? `/ktravel/${secondCity.slug}` : '#'}
                  className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 hover:text-white transition-colors group"
                >
                  <span>Artikel lesen</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Link
                href={secondCity.slug ? `/ktravel/${secondCity.slug}` : '#'}
                className="block relative w-full h-[50vh] md:h-[65vh] overflow-hidden group cursor-pointer rounded-2xl shadow-2xl bg-neutral-900"
              >
                {secondCity.image && (
                  <img
                    src={secondCity.image}
                    alt={secondCity.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                  />
                )}
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors duration-500" />
              </Link>
            </div>

          </div>
        )}

        {/* Lezáró link */}
        <div className="pt-8 text-center">
          <Link
            href="/ktravel/city"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-neutral-900 hover:text-sky-300 transition-colors group cursor-pointer"
          >
            <span>Alle Stadtziele im Überblick erkunden</span>
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