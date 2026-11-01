import Link from "next/link";
import { Train, MapPin, ShieldCheck, Compass } from "lucide-react";

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  category?: string;
}

interface GuideArticleGridProps {
  articles: Article[];
}

export default function GuideArticleGrid({ articles }: GuideArticleGridProps) {
  const fallbackGuides = [
    {
      _id: "1",
      title: "KTX & T-Money",
      slug: { current: "ktx-t-money" },
      excerpt: "Bereise das Land in unter 3 Stunden mit dem KTX-Hochgeschwindigkeitszug. Die T-Money Card ist dein unverzichtbarer Begleiter im städtischen ÖPNV.",
      category: "Mobilität",
      icon: Train,
    },
    {
      _id: "2",
      title: "Naver & Kakao Map",
      slug: { current: "naver-kakao-map" },
      excerpt: "Da internationale Kartendienste in Korea eingeschränkt sind, garantieren Naver Map und KakaoMap die präziseste Fußgänger- und ÖPNV-Führung.",
      category: "Navigation",
      icon: MapPin,
    },
    {
      _id: "3",
      title: "Kulturelles Know-how",
      slug: { current: "kulturelles-know-how" },
      excerpt: "Kein Trinkgeld, das Ausziehen der Schuhe in traditionellen Unterkünften und tiefer Respekt gegenüber Älteren bestimmen den respektvollen Alltag.",
      category: "Etikette",
      icon: ShieldCheck,
    },
  ];

  const displayItems = articles && articles.length > 0 ? articles : fallbackGuides;

  return (
    <section className="w-full bg-linear-to-b from-[#0d0d0f] via-[#dce7f0] to-[#eaf2fb] text-neutral-900 pt-16 pb-36 px-6 lg:px-20">
      {/* Teljes szélességű, grandiózus konténer */}
      <div className="max-w-350 mx-auto">
        
        {/* Szekció címke – CSAK EZ A SÁV világos (mert itt még sötétebb a háttér) */}
        <div className="flex items-center justify-between border-b border-neutral-400 pb-6 mb-12">
          <div className="text-xs font-mono tracking-[0.35em] text-neutral-200 uppercase font-bold drop-shadow-md">
            // WICHTIGE REISE-INFOS & ARCHIV
          </div>
          <div className="text-xs font-mono text-neutral-200 uppercase tracking-widest font-bold drop-shadow-md">
            KAPITEL 04 / HANDBUCH
          </div>
        </div>

        {/* Teljes szélességű sávok */}
        <div className="divide-y divide-neutral-400/80 border-b border-neutral-400/80">
          {displayItems.map((item, index) => {
            const IconComponent = (item as any).icon || Compass;

            return (
              <Link
                key={item._id || index}
                href={`/ktravel/guide/${item.slug?.current || ""}`}
                className="group py-14 lg:py-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all duration-500 hover:bg-white/60 px-8 lg:px-12 -mx-6 lg:-mx-12"
              >
                {/* Bal oldal: Sorszám és kategória a már világosodó háttérhez igazodva sötét marad */}
                <div className="flex items-start lg:items-center gap-8 lg:gap-14 max-w-3xl">
                  {/* Sorszám sötét tónusban */}
                  <span className="text-xs font-mono text-neutral-900 tracking-widest pt-1 lg:pt-0 font-bold">
                    // 0{index + 1}
                  </span>

                  <div className="p-4 bg-neutral-900/10 text-neutral-950 border border-neutral-400 group-hover:bg-neutral-900 group-hover:text-white transition-colors duration-500 shrink-0 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="space-y-2.5">
                    {/* Kategória sötét tónusban a világos háttérhez */}
                    <div className="text-[11px] font-mono tracking-[0.3em] text-neutral-900 uppercase font-bold">
                      {item.category || "Guide"}
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-950 group-hover:text-neutral-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Jobb oldal: Kivonat és nyíl */}
                <div className="flex items-center gap-12 justify-between lg:justify-end w-full lg:w-auto">
                  {item.excerpt && (
                    <p className="text-sm sm:text-base text-neutral-800 font-medium max-w-md line-clamp-2 leading-relaxed hidden xl:block">
                      {item.excerpt}
                    </p>
                  )}

                  <div className="inline-flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-neutral-950 group-hover:text-neutral-900 shrink-0 font-bold">
                    <span className="hidden sm:inline">LESEN</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2 text-neutral-950 text-sm">↗</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}