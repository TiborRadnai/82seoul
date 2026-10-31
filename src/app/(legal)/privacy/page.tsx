'use client';

import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, ShieldCheck, Database, Server, UserCheck, Lock } from "lucide-react";

export default function DatenschutzPage() {
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
            <span>Datenschutz • DSGVO Konform</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Datenschutzerklärung
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Transparenz und Schutz deiner personenbezogenen Daten nach den Vorgaben der Datenschutz-Grundverordnung (DSGVO).
          </p>
        </div>

        {/* Tartalmi kártyák */}
        <div className="space-y-8">
          
          {/* 1. Szekció */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-4 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              1. Datenschutz auf einen Blick
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du unsere Website <strong>82.SEOUL</strong> besuchst. Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst.
            </p>
          </section>

          {/* 2. Szekció */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-4 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              2. Hosting & Content Delivery (Vercel & Sanity)
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Wir hosten die Inhalte unserer Website bei externen Anbietern (z. B. Vercel). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten handeln. Zudem nutzen wir Sanity CMS zur Verwaltung unserer redaktionellen Inhalte.
            </p>
          </section>

          {/* 3. Szekció: Verantwortung */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-4 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              3. Verantwortliche Stelle
            </h2>
            <div className="text-slate-700 text-sm md:text-base leading-relaxed space-y-1">
              <p className="font-bold text-slate-900">82.SEOUL (über Madevix)</p>
              <p>Tibor Radnai</p>
              <p>Am Schwedenkreuz 5.</p>
              <p>87534 Oberstaufen (Steibis)</p>
              <p>E-Mail: <a href="mailto:info@82seoul.de" className="text-rose-600 font-medium hover:underline">info@82seoul.de</a></p>
            </div>
          </section>

          {/* 4. Szekció: Regisztráció és törlési logika (Kiemelten fontos nálad!) */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-6 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              4. Registrierung & Benutzerkonten (Löschlogik)
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Wenn du dich auf unserer Plattform registrierst, erheben wir Bestandsdaten. Für die Aufbewahrung und Löschung gilt eine strenge, DSGVO-konforme Regelung:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
                <h3 className="text-slate-900 font-bold text-sm tracking-wide uppercase text-emerald-600">Ohne Käufe (Löschung)</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    Löscht ein Nutzer sein Konto und hat bisher keine kostenpflichtigen Transaktionen getätigt, werden sämtliche personenbezogenen Daten <strong>vollständig und unwiderruflich gelöscht</strong>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
                <h3 className="text-slate-900 font-bold text-sm tracking-wide uppercase text-rose-600">Mit Käufen (Aufbewahrung)</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  Wurden Käufe getätigt, sind wir aufgrund gesetzlicher handels- und steuerrechtlicher Aufbewahrungspflichten (z. B. 10 Jahre für Rechnungen) verpflichtet, die Rechnungsdaten zu speichern.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Szekció: Analytics */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-4 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              5. Analyse-Tools & Consent Management
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Diese Website verwendet Analysetools (wie Google Analytics) und Cookies ausschließlich im Einklang mit den DSGVO-Vorgaben. Die Datenerfassung und das Tracking erfolgen erst nach deiner ausdrücklichen Einwilligung über unser Cookie-Consent-Management.
            </p>
          </section>

        </div>

      </div>
    </main>
  );
}