import Link from "next/link";
import { Compass, ArrowUpRight, Plane, MapPin, Sparkles } from "lucide-react";
import { client } from "../../../sanity/lib/client";
import { getTravelArticlesByCategoryQuery } from "../../../sanity/queries";

export default async function KoreaSection() {
  // Lekérdjük a kiemelt cikkeket a különböző kategóriákból a Sanity-ből
  const cityArticles = await client.fetch(getTravelArticlesByCategoryQuery, { category: 'city' });
  const cultureArticles = await client.fetch(getTravelArticlesByCategoryQuery, { category: 'culture' });
  const natureArticles = await client.fetch(getTravelArticlesByCategoryQuery, { category: 'nature' });

  // Biztonsági adatok az 1., 2. és 3. kártyához
  const city = cityArticles[0] || {};
  const culture = cultureArticles[0] || {};
  const nature = natureArticles[0] || {};

  return (
    <section className="w-screen relative left-1/2 -translate-x-1/2 py-24 md:py-36 bg-linear-to-b from-neutral-950 via-slate-100 to-slate-50 text-neutral-900 overflow-hidden border-t border-neutral-800/60">
      
      {/* SEIDEN-ÜBERGANG NEBEL */}
      <div className="absolute top-0 inset-x-0 h-64 bg-linear-to-b from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none z-0" />

      {/* Hintergrundbeleuchtung */}
      <div className="absolute top-1/3 -right-32 w-125 h-125 bg-linear-to-br from-sky-400/20 via-slate-200/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-112.5 h-112.5 bg-linear-to-tl from-indigo-300/20 via-slate-200/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* HEADER */}
      <div className="max-w-4xl mx-auto px-6 text-center z-10 relative mb-16 md:mb-24 space-y-6 pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-sky-500/40 text-sky-300 text-xs font-bold tracking-widest uppercase shadow-md">
          <Compass className="w-3.5 h-3.5 stroke-[1.75] text-sky-400" />
          <span>SÜDKOREA ENTDECKEN</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-tight text-white leading-[1.1] drop-shadow-md">
          Wo Vergangenheit und Zukunft{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-sky-300 via-sky-200 to-indigo-200">
            Hand in Hand gehen.
          </span>
        </h2>

        <p className="text-slate-300 text-base md:text-xl font-normal leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
          Antike Paläste im Schatten neonbeleuchteter Wolkenkratzer, friedliche buddhistische Klöster und die fortschrittlichsten Metropolen der Welt. Bereite dich auf das Abenteuer deines Lebens vor!
        </p>
      </div>

      {/* BENTO GRID REISEKARTEN */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
      {/* 1. KARTE: Metropolen & City Life */}
          <Link
            href={city.slug ? `/ktravel/${city.slug}` : '#'}
            className="lg:col-span-7 group relative h-120 md:h-140 rounded-3xl overflow-hidden bg-neutral-900 border border-slate-200/70 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(14,165,233,0.25)] hover:border-sky-300 block cursor-pointer"
          >
            {city.image && (
              <img
                src={city.image}
                alt={city.title || "Seoul Skyline"}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/40 via-50% to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                <MapPin className="w-3 h-3 text-sky-400" />
                METROPOLEN & CITY LIFE
              </span>

              <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:text-white">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-8 md:p-10 space-y-3 z-10 text-white">
              <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Stadtreise & Modernes Design</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                {city.title || "Seoul und die modernen Zentren"}
              </h3>

              <p className="text-sm md:text-base text-neutral-200 font-normal leading-relaxed max-w-xl drop-shadow-xs">
                {city.description || "Das pulsierende Leben von Gangnam, die futuristische Architektur des DDP in Dongdaemun und das niemals schlafende koreanische Nachtleben."}
              </p>
            </div>
          </Link>

          {/* 2. KARTE: Kultur & Tradition */}
          <Link
            href={culture.slug ? `/ktravel/${culture.slug}` : '#'}
            className="lg:col-span-5 group relative h-120 md:h-140 rounded-3xl overflow-hidden bg-neutral-900 border border-slate-200/70 shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(14,165,233,0.25)] hover:border-sky-300 block cursor-pointer"
          >
            {culture.image && (
              <img
                src={culture.image}
                alt={culture.title || "Traditionelles koreanisches Hanok"}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/40 via-50% to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                KULTUR & TRADITION
              </span>

              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:text-white">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-8 md:p-10 space-y-3 z-10 text-white">
              <span className="text-xs text-sky-300 font-mono uppercase tracking-wider">{culture.tag || "Paläste & Hanok Dörfer"}</span>
              <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white">{culture.title || "Königliche Paläste & Erbe"}</h3>
              <p className="text-sm text-neutral-200 font-normal leading-relaxed line-clamp-3">
                {culture.description || "Der Gyeongbokgung-Palast, traditionelle Holz-Hanok-Viertel und der Geist vergangener Jahrhunderte mitten im modernen Stadtbild."}
              </p>
            </div>
          </Link>

          {/* 3. KARTE: Natur & Inseln */}
          <Link
            href={nature.slug ? `/ktravel/${nature.slug}` : '#'}
            className="lg:col-span-6 group relative h-80 md:h-96 rounded-3xl overflow-hidden bg-neutral-900 border border-slate-200/70 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.2)] hover:border-sky-300 block cursor-pointer"
          >
            {nature.image && (
              <img
                src={nature.image}
                alt={nature.title || "Jeju Vulkan Küste"}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase">
                NATUR & INSELN
              </span>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-8 space-y-2 z-10 text-white">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{nature.title || "Jeju-Insel & Magische Natur"}</h3>
              <p className="text-sm text-neutral-200 font-normal line-clamp-2">{nature.description || "Vulkanische Krater, atemberaubende Küstenlinien, Nationalparks und die Insel des Friedens in Korea."}</p>
            </div>
          </Link>

          {/* 4. KARTE: Travel Guide & Essentials */}
          <Link
            href="/ktravel/guide"
            className="lg:col-span-6 group relative h-80 md:h-96 rounded-3xl overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/80 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.2)] hover:border-sky-400/60 cursor-pointer p-8 md:p-10 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[11px] font-bold tracking-wider uppercase">
                <Plane className="w-3.5 h-3.5 text-sky-400" />
                <span>TRAVEL GUIDE & ESSENTIALS</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center group-hover:bg-sky-500 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-3 z-10">
              <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
                Reiseführer & Nützliche Tipps
              </h3>
              <p className="text-sm md:text-base text-slate-300 font-normal leading-relaxed">
                T-Money-Karten, Naver-Map-Navigation, WOWPASS-Zahlungstipps und alles, was du für eine erfolgreiche Südkorea-Reise brauchst.
              </p>
            </div>

            <Plane className="absolute -bottom-6 -right-6 w-56 h-56 text-white/5 pointer-events-none -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:text-white/10" />
          </Link>

        </div>
      </div>

      {/* CTA BUTTON */}
      <div className="mt-16 text-center z-10 relative">
        <Link
          href="/ktravel"
          className="inline-flex items-center gap-3 px-9 py-4 bg-linear-to-b from-slate-950 via-slate-900 to-black hover:from-sky-900 hover:to-slate-900 text-white font-bold text-xs md:text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-2xl border border-sky-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <Plane className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          <span>VOLLSTÄNDIGES KOREA-REISEHANDBUCH ÖFFNEN</span>
          <span className="text-base text-slate-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">➔</span>
        </Link>
      </div>

    </section>
  );
}