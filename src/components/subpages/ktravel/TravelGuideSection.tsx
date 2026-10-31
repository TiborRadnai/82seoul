import Link from "next/link";
import { ArrowUpRight, Compass, Train, MapPin, ShieldCheck } from "lucide-react";
import { client } from "@sanity/lib/client";
import { getTravelGuideItemsQuery } from "@sanity/queries";

// Segéd-függvény az ikonok hozzárendeléséhez sorrend vagy slug alapján
function getGuideIcon(index: number) {
  switch (index) {
    case 0:
      return <Train className="w-5 h-5 text-indigo-400" />;
    case 1:
      return <MapPin className="w-5 h-5 text-indigo-400" />;
    case 2:
    default:
      return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
  }
}

export default async function TravelGuideSection() {
  // Lekérdjük a Travel Guide elemeket a Sanity-ből, sorrend szerint
  const guideItems = await client.fetch(getTravelGuideItemsQuery);

  return (
    <section id="guide" className="w-full py-24 md:py-36 bg-gradient-to-b from-slate-100 via-neutral-900 to-neutral-950 text-white relative overflow-hidden">
      
      {/* Finom, harmonizáló háttérfény az átmenethez */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 z-10 relative space-y-24">
        
        {/* --- EDITORIAL FEJLÉC --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-widest uppercase">
              <Compass className="w-4 h-4 text-indigo-300" />
              <span>Kapitel 04 // Travel Guide & Essentials</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-none">
              Praktische <span className="font-serif italic font-normal text-indigo-300">Hinweise</span>
            </h2>
          </div>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-md">
            Von High-Speed-Zügen (KTX) über digitale Navigation bis hin zu kulturellen Etiketten. Alles, was du für deine Korea-Reise wissen musst.
          </p>
        </div>

        {/* --- 3 LÉNYEGES GYAKORLATI KÁRTYA (Dinamikusan leképezve a Sanityből) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {guideItems.map((item: any, index: number) => (
            <div 
              key={item._id || index}
              className="p-8 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-6 flex flex-col justify-between group hover:border-indigo-500/50 transition-colors"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono text-indigo-400 tracking-widest uppercase">
                  {item.tag}
                </span>
                <h3 className="text-2xl font-light text-white tracking-tight flex items-center gap-3">
                  {getGuideIcon(index)}
                  <span>{item.title}</span>
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
              <Link
                href={`/korea-travel/${item.slug || 'guide-transport'}`}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-300 hover:text-white transition-colors group-hover:translate-x-1 duration-300"
              >
                <span>Mehr erfahren</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}

        </div>

        {/* Lezáró átfogó gomb */}
        <div className="pt-12 text-center border-t border-neutral-800/80">
          <Link
            href="/korea-travel/guide-overview"
            className="inline-flex items-center gap-3 text-sm font-mono tracking-widest uppercase text-white hover:text-indigo-300 transition-colors group cursor-pointer"
          >
            <span>Vollständiges Travel-Handbuch öffnen</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>

    </section>
  );
}