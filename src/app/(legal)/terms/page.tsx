'use client';

import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, FileText, Scale, ShoppingBag, RotateCcw } from "lucide-react";

export default function TermsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-neutral-50 text-slate-900 font-sans antialiased selection:bg-rose-500/20 selection:text-slate-900 relative overflow-hidden">
      
      {/* FELSŐ SÖTÉT/ÁTMENETES SÁV */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-neutral-900 via-neutral-950/40 to-transparent pointer-events-none" />

      {/* Dekoratív háttér effektek */}
      <div className="absolute top-32 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-64 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24 relative z-10">
        
        {/* Vissza gomb */}
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
            <span>Rechtliches • 82.SEOUL</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            AGB & Widerrufsbelehrung
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Allgemeine Geschäftsbedingungen und Verbraucherinformationen für den Online-Shop.
          </p>
        </div>

        {/* Tartalmi kártyák */}
        <div className="space-y-8">
          
          {/* § 1 Geltungsbereich */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-4 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              § 1 Geltungsbereich
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Für alle Lieferungen und Dienstleistungen von <strong>82.SEOUL</strong> (betrieben über Madevix, Tibor Radnai, Am Schwedenkreuz 5., 87534 Oberstaufen / Steibis) an Verbraucher gelten ausschließlich diese Allgemeinen Geschäftsbedingungen (AGB).
            </p>
          </section>

          {/* § 2 Vertragsschluss */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-4 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              § 2 Vertragsschluss
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Durch Anklicken des Bestellbuttons geben Sie ein verbindliches Angebot über die im Warenkorb enthaltenen Waren ab.
            </p>
          </section>

          {/* § 3 Preise und Versandkosten */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-4 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              § 3 Preise und Versandkosten
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Die auf den Produktseiten genannten Preise enthalten die gesetzliche Mehrwertsteuer und sonstige Preisbestandteile. Hinzu kommen eventuelle Versandkosten, die im Bestellprozess separat ausgewiesen und angezeigt werden.
            </p>
          </section>

          {/* § 4 Widerrufsbelehrung */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-6 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              § 4 Widerrufsbelehrung
            </h2>
            
            <div className="space-y-4 text-slate-700 text-sm md:text-base leading-relaxed">
              <h3 className="text-slate-900 font-bold text-base">Widerrufsrecht</h3>
              <p>
                Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
              </p>
              <p>
                Um Ihr Widerrufsrecht auszuüben, müssen Sie uns mittels einer eindeutigen Erklärung (z. B. per E-Mail an <a href="mailto:info@82seoul.de" className="text-rose-600 font-medium hover:underline">info@82seoul.de</a>) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
              </p>
            </div>
          </section>

          {/* § 5 Streitbeilegung */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-4 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              § 5 Streitbeilegung
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

        </div>

      </div>
    </main>
  );
}