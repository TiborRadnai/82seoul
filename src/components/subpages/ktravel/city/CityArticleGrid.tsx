import Image from "next/image";
import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  slug: string; // <--- Javítva stringre a { current: string } helyett!
  image?: string;
  excerpt?: string;
  publishedAt?: string;
}

interface CityArticleGridProps {
  articles: Article[];
}

export default function CityArticleGrid({ articles }: CityArticleGridProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="w-full bg-linear-to-b from-[#0d0d0f] via-[#dce7f0] to-[#eaf2fb] px-6 py-28 text-center text-neutral-500 font-mono text-xs uppercase tracking-widest">
        Keine Artikel in diesem Kapitel gefunden.
      </div>
    );
  }

  return (
    <section className="w-full bg-linear-to-b from-[#0d0d0f] via-[#dce7f0] to-[#eaf2fb] text-neutral-900 pt-16 pb-32 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Szekció címke – Letisztult, prémium elválasztás */}
        <div className="flex items-center justify-between border-b border-neutral-300 pb-6 mb-16">
          <div className="text-xs font-mono tracking-[0.35em] text-[#0284c7] uppercase">
            // AUSGEWÄHLTE BEITRÄGE
          </div>
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            Kapitel 01 / Archiv
          </div>
        </div>

        {/* Cikkek rácsa – Aszimmetrikus, magazin-szintű elrendezés */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20">
          {articles.map((article, index) => (
          <Link
            key={article._id || index}
            href={`/ktravel/${article.slug || ""}`} // <--- article.slug.current helyett article.slug
            className="group block"
          >
              {/* Kép konténer finom kerettel és árnyékolással */}
              <div className="relative w-full h-110 sm:h-125 bg-neutral-900 overflow-hidden mb-6 border border-neutral-300 transition-all duration-700 group-hover:border-[#0284c7]/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-neutral-400 font-mono text-xs">
                    Kein Bild
                  </div>
                )}
                {/* Kép alatti finom sötétítés, hogy a sorszám olvasható maradjon */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {/* Stílusos sorszám a kártyán */}
                <div className="absolute top-5 left-5 text-xs font-mono text-white tracking-widest bg-black/60 backdrop-blur-md px-3.5 py-1.5 border border-white/20">
                  // 0{index + 1}
                </div>
              </div>

              {/* Cikk szöveges adatai – Tökéletes tipográfiai ritmus */}
              <div className="space-y-3.5 px-1">
                <div className="text-[10px] font-mono tracking-[0.3em] text-[#0284c7] uppercase">
                  Metropolis & City Life
                </div>
                <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-neutral-900 group-hover:text-[#0284c7] transition-colors duration-300 leading-[1.15]">
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="text-sm sm:text-base text-neutral-600 font-light line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                )}
                <div className="pt-3 flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-neutral-700 group-hover:text-neutral-900 transition-colors">
                  <span>Artikel lesen</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5 text-[#0284c7]">↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}