import Link from "next/link";
import { ArrowUpRight, Compass, Train, MapPin, ShieldCheck } from "lucide-react";
import { client } from "@sanity/lib/client";
import { getTravelGuideItemsQuery } from "@sanity/queries";

// Segéd-függvény az ikonok hozzárendeléséhez sorrend vagy slug alapján
function getGuideIcon(index: number) {
  switch (index) {
    case 0:
      return <Train className="w-5 h-5 text-neutral-200" />;
    case 1:
      return <MapPin className="w-5 h-5 text-neutral-200" />;
    case 2:
    default:
      return <ShieldCheck className="w-5 h-5 text-neutral-200" />;
  }
}

export default async function TravelGuideSection() {
  // Lekérdjük a Travel Guide elemeket a Sanity-ből, sorrend szerint
  const guideItems = await client.fetch(getTravelGuideItemsQuery);

  return (
    <section id="guide" className="w-full py-24 md:py-36 bg-linear-to-b from-slate-100 via-neutral-900 to-neutral-950 text-white relative overflow-hidden">
      
      {/* Finom, semleges háttérfény az átmenethez */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-225 h-125 bg-neutral-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 z-10 relative space-y-24">
        
        {/* --- EDITORIAL FEJLÉC --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
          <div className="space-y-4 max-w-2xl">
            {/* JAVÍTVA: Jobban látható, világosabb monokróm tónus */}
            <div className="inline-flex items-center gap-2 text-neutral-200 text-xs font-mono tracking-widest uppercase bg-black/40 px-3 py-1 border border-white/10">
              <Compass className="w-4 h-4 text-neutral-300" />
              <span>Kapitel 04 // Travel Guide & Essentials</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-none">
              Praktische <span className="font-serif italic font-normal text-neutral-300">Hinweise</span>
            </h2>
          </div>
          {/* JAVÍTVA: Magasabb kontrasztú leírás */}
          <p className="text-neutral-200 text-base md:text-lg font-light leading-relaxed max-w-md">
            Von High-Speed-Zügen (KTX) über digitale Navigation bis hin zu kulturellen Etiketten. Alles, was du für deine Korea-Reise wissen musst.
          </p>
        </div>

        {/* --- 3 LÉNYEGES GYAKORLATI KÁRTYA (Dinamikusan leképezve a Sanityből) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {guideItems.map((item: any, index: number) => (
            <div 
              key={item._id || index}
              className="p-8 rounded-2xl bg-neutral-900/90 border border-neutral-700 space-y-6 flex flex-col justify-between group hover:border-neutral-400 transition-colors shadow-xl"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono text-neutral-300 tracking-widest uppercase">
                  {item.tag}
                </span>
                <h3 className="text-2xl font-light text-white tracking-tight flex items-center gap-3">
                  {getGuideIcon(index)}
                  <span>{item.title}</span>
                </h3>
                {/* JAVÍTVA: Olvashatóbb kártya-leírás */}
                <p className="text-neutral-300 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
              <Link
                href={`/korea-travel/${item.slug || 'guide-transport'}`}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-200 hover:text-white transition-colors group-hover:translate-x-1 duration-300"
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
            href="/ktravel/guide"
            className="inline-flex items-center gap-3 text-sm font-mono tracking-widest uppercase text-white hover:text-neutral-300 transition-colors group cursor-pointer"
          >
            <span>Vollständiges Travel-Handbuch öffnen</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>

    </section>
  );
}