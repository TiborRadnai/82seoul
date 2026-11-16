import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Trees } from "lucide-react";
import { client } from "@sanity/lib/client";
import { getTravelArticlesByCategoryQuery } from "@sanity/queries";

// Sanity optimalizáló segédfüggvény a képek méretezéséhez
function urlForSanity(sourceUrl: string, width = 1200) {
  if (!sourceUrl) return "";
  const separator = sourceUrl.includes('?') ? '&' : '?';
  return `${sourceUrl}${separator}w=${width}&auto=format&q=80`;
}

export default async function NatureSection() {
  // Lekérdjük a 'nature' kategória kiemelt elemeit a Sanity-ből, sorrend szerint
  const articles = await client.fetch(getTravelArticlesByCategoryQuery, { category: 'nature' });

  // Biztonsági mentés a két elemre
  const jeju = articles[0] || {};
  const seoraksan = articles[1] || {};

  return (
    <section id="nature" className="w-full pb-16 md:pb-24 bg-slate-100 text-neutral-900 relative overflow-hidden border-t border-slate-200/60">
      
      {/* Finom természetes, zöldes háttérfény */}
      <div className="absolute top-1/3 right-10 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 z-10 relative space-y-24">
        
        {/* --- EDITORIAL FEJLÉC --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-mono tracking-widest uppercase">
              <Trees className="w-4 h-4 text-emerald-600" />
              <span>Kapitel 03 // Natur & Jeju</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-950 leading-none">
              Natur <span className="font-serif italic font-normal text-emerald-800">& Jeju</span>
            </h2>
          </div>
          <p className="text-neutral-600 text-base md:text-lg font-light leading-relaxed max-w-md">
            Vulkanische Krater, unberührte Küstenlinien und die mystische Schönheit der Vulkaninsel Jeju. Durchatmen in Koreas grüner Oase.
          </p>
        </div>

        {/* --- 1. SZTORI BLOKK: JEJU-ISLAND --- */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-700 tracking-widest uppercase">{jeju.tag || '01 // Jeju Island'}</span>
            </div>
            <Link
              href={`/ktravel/${typeof jeju.slug === 'string' ? jeju.slug : jeju.slug?.current || 'nature-jeju'}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-emerald-700 transition-colors group"
            >
              <span>Artikel lesen</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <Link
            href={`/ktravel/${typeof jeju.slug === 'string' ? jeju.slug : jeju.slug?.current || 'nature-jeju'}`}
            className="block relative w-full h-[60vh] md:h-[75vh] overflow-hidden group cursor-pointer rounded-2xl shadow-xl bg-neutral-900"
          >
            {jeju.image && (
              <Image
                src={urlForSanity(typeof jeju.image === 'string' ? jeju.image : jeju.image?.asset?.url || jeju.image, 1400)}
                alt={jeju.title || 'Jeju Natur und Küste'}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-80 z-10" />
            
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-xl text-white z-20">
              <h3 className="text-2xl md:text-4xl font-light tracking-tight mb-2">
                {jeju.title || 'Insel der Götter & Mandarinen'}
              </h3>
              <p className="text-slate-200 text-base md:text-lg font-light leading-relaxed">
                {jeju.description}
              </p>
            </div>
          </Link>
        </div>

        {/* --- 2. SZTORI BLOKK: SEORAKSAN --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-emerald-700 tracking-widest uppercase">{seoraksan.tag || '02 // Seoraksan'}</span>
            <h3 className="text-3xl md:text-5xl font-light text-neutral-950 tracking-tight">
              {seoraksan.title || 'Gipfel im Nebel'}
            </h3>
            <p className="text-neutral-600 text-base md:text-lg font-light leading-relaxed">
              {seoraksan.description}
            </p>
            <div className="pt-2">
              <Link
                href={`/ktravel/${typeof seoraksan.slug === 'string' ? seoraksan.slug : seoraksan.slug?.current || 'nature-seoraksan'}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-emerald-700 transition-colors group"
              >
                <span>Artikel lesen</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Link
              href={`/ktravel/${typeof seoraksan.slug === 'string' ? seoraksan.slug : seoraksan.slug?.current || 'nature-seoraksan'}`}
              className="block relative w-full h-[50vh] md:h-[65vh] overflow-hidden group cursor-pointer rounded-2xl shadow-xl bg-neutral-900"
            >
              {seoraksan.image && (
                <Image
                  src={urlForSanity(typeof seoraksan.image === 'string' ? seoraksan.image : seoraksan.image?.asset?.url || seoraksan.image, 1000)}
                  alt={seoraksan.title || 'Seoraksan Nationalpark'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                />
              )}
              <div className="absolute inset-0 bg-neutral-950/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
            </Link>
          </div>

        </div>

        {/* Lezáró link */}
        <div className="pt-8 text-center">
          <Link
            href="/ktravel/nature"
            className="inline-flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-neutral-900 hover:text-emerald-700 transition-colors group cursor-pointer"
          >
            <span>Alle Naturthemen erkunden</span>
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