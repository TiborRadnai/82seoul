"use client";

import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, Globe } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-neutral-50 text-slate-900 font-sans antialiased selection:bg-rose-500/20 selection:text-slate-900 relative overflow-hidden">
      
      {/* FELSŐ SÖTÉT/ÁTMENETES SÁV: Biztosítja, hogy a Navbar elemei tökéletesen látszódjanak */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-neutral-900 via-neutral-950/40 to-transparent pointer-events-none" />

      {/* Finom dekoratív háttér effektek */}
      <div className="absolute top-32 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-64 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24 relative z-10">
        
        {/* Intelligens Vissza gomb (Oda visz, ahonnan jött) */}
        <div className="mb-12">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-4 py-2.5 rounded-full transition-all duration-300 hover:border-slate-300 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück</span>
          </button>
        </div>

        {/* Fejléc / Kategória badge */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-rose-500" />
            <span>Über uns • 82.SEOUL</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Über 82.SEOUL — Die Brücke nach Südkorea
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Deine kuratierte Plattform für authentische koreanische Kultur, Musik und Lifestyle direkt aus Seoul.
          </p>
        </div>

        {/* Tartalmi kártyák */}
        <div className="space-y-8">
          
          {/* 1. Szekció */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-4 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Unsere Geschichte: Mehr als nur eine Leidenschaft
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Manchmal beginnt alles mit einem Funken, der den Alltag auf den Kopf stellt. Bei uns fing es mit der Musik an – dem unverkennbaren, mitreißenden Beat des K-Pop. Was als neugieriges Reinschnuppern begann, wurde schnell zu einer tiefen Faszination, die unser gesamtes Zuhause erfasste. Aus den Lautsprechern drang bald nur noch Seoul, die Playlists füllten sich mit den angesagtesten Künstlern, und in unserer Küche wichen traditionelle Zutaten allmählich Kimchi, Gochujang und den obligatorischen Essstäbchen.
            </p>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Korea wurde für uns zu einem echten Lebensgefühl. Die einzigartige Ästhetik, die Dynamik und diese magische Mischung aus jahrhundertelanger Tradition und futuristischer Moderne haben uns komplett in ihren Bann gezogen.
            </p>
          </section>

          {/* 2. Szekció */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-6 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Warum 82.SEOUL?
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Der Name ist Programm und zugleich eine Liebeserklärung. <strong>+82</strong> ist die internationale Vorwahl Südkoreas – und Seoul das pulsierende Herz des Landes, in dem Trends geboren werden, die die Welt bewegen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
                <h3 className="text-slate-900 font-bold text-sm tracking-wide uppercase text-amber-600">Unsere Identität</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  Genauso wie die moderne Architektur Seouls setzen wir auf edle, reduzierte Betontöne, klare Linien und kompromisslose Ästhetik.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
                <h3 className="text-slate-900 font-bold text-sm tracking-wide uppercase text-rose-600">Unser Ziel</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  Wir möchten dieses faszinierende Lebensgefühl direkt zu dir nach Europa bringen und einen verlässlichen Anlaufpunkt schaffen.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Szekció */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-4 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Vom Kultur-Portal zum exklusiven Shop
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Wir glauben daran, dass echte Qualität ihre Zeit braucht. Bevor wir unsere Pforten für den Webshop öffnen, bauen wir mit <strong>82.SEOUL</strong> einen lebendigen Treffpunkt für alle K-Culture-Begeisterten auf. Ob die heißesten K-Pop Charts, unvergessliche K-Drama & Movie-Tipps oder authentische Einblicke in die koreanische Küche – wir leben und atmen diesen Lifestyle jeden Tag.
            </p>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Hinter den Kulissen arbeiten wir mit viel Herzblut, um dir bald eine handverlesene Auswahl an authentischen Produkten direkt aus Seoul anzubieten.
            </p>

            <div className="pt-6 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
              <span className="text-slate-900 font-semibold text-sm">Willkommen in unserer Welt. Willkommen in Seoul.</span>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>Made with Passion</span>
              </div>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}