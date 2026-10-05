import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-slate-300 pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Vissza a főoldalra */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Startseite</span>
        </Link>

        {/* Címsor */}
        <div className="space-y-3 border-b border-neutral-800 pb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            AGB & Widerrufsbelehrung
          </h1>
          <p className="text-xs tracking-[0.2em] text-slate-400 uppercase">
            Allgemeine Geschäftsbedingungen für den Online-Shop
          </p>
        </div>

        {/* Tartalom */}
        <div className="space-y-8 text-sm md:text-base leading-relaxed text-slate-300">
          
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">§ 1 Geltungsbereich</h2>
            <p>
              Für alle Lieferungen von <strong>82.SEOUL</strong> ([Dein Name], Oberstaufen) an Verbraucher gelten diese Allgemeinen Geschäftsbedingungen (AGB).
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">§ 2 Vertragsschluss</h2>
            <p>
              Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Durch Anklicken des Bestellbuttons geben Sie ein verbindliches Angebot im Warenkorb enthaltener Waren ab.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">§ 3 Preise und Versandkosten</h2>
            <p>
              Die auf den Produktseiten genannten Preise enthalten die gesetzliche Mehrwertsteuer (bzw. Kleinunternehmerstatus nach § 19 UStG) und sonstige Preisbestandteile. Hinzu kommen eventuelle Versandkosten, die im Bestellprozess klar angezeigt werden.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">§ 4 Widerrufsbelehrung</h2>
            <h3 className="text-sm font-semibold text-white">Widerrufsrecht</h3>
            <p>
              Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter die Waren in Besitz genommen haben.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">§ 5 Streitbeilegung</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}