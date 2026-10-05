import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
            Datenschutz&shy;erklärung
          </h1>
          <p className="text-xs tracking-[0.2em] text-slate-400 uppercase">
            DSGVO-konforme Informationen zum Datenschutz
          </p>
        </div>

        {/* Tartalom */}
        <div className="space-y-8 text-sm md:text-base leading-relaxed text-slate-300">
          
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-sm font-semibold text-white">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, என்ன mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">2. Hosting und Content Delivery Networks (CDN)</h2>
            <p>
              Wir hosten die Inhalte unserer Website bei externen Anbietern (z.B. Vercel). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten handeln.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 className="text-sm font-semibold text-white">Verantwortliche Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
              <strong>82.SEOUL</strong><br />
              [Dein Name / Firmenname, z.B. Tibor Radnai]<br />
              [Deine Anschrift in Oberstaufen]<br />
              E-Mail: <span className="text-amber-300">[Deine E-Mail-Adresse]</span>
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">4. Datenerfassung auf unserer Website</h2>
            <h3 className="text-sm font-semibold text-white">Newsletter</h3>
            <p>
              Wenn Sie den auf der Website angebotenen Newsletter empfangen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, die uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">5. Analyse-Tools und Werbung</h2>
            <p>
              Diese Website verwendet derzeit keine datenschutzrechtlich problematischen Tracking-Tools ohne Einwilligung. Sobald Cookies oder Analysetools eingesetzt werden, erfolgt dies im Einklang mit den DSGVO-Vorgaben über unser Cookie-Consent-Management.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}