import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImpressumPage() {
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
            Impressum
          </h1>
          <p className="text-xs tracking-[0.2em] text-slate-400 uppercase">
            Angaben gemäß § 5 TMG
          </p>
        </div>

        {/* Tartalom */}
        <div className="space-y-8 text-sm md:text-base leading-relaxed text-slate-300">
          
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">Angaben zum Unternehmen</h2>
            <p>
              <strong>82.SEOUL</strong><br />
              [Dein Name / Firmenname, z.B. Tibor Radnai]<br />
              [Deine Anschrift in Oberstaufen, z.B. Musterstraße 1]<br />
              87534 Oberstaufen<br />
              Deutschland
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">Kontakt</h2>
            <p>
              E-Mail: <span className="text-amber-300">[Deine E-Mail-Adresse]</span><br />
              Telefon: <span className="text-amber-300">[Deine Telefonnummer - optional]</span>
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              <span className="text-slate-400">[Wird nachgereicht / Kleinunternehmer nach § 19 UStG]</span>
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-amber-300 underline ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}