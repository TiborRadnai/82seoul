"use client";

import Link from "next/link";
import { ArrowLeft, Cookie, ShieldCheck } from "lucide-react";

export default function CookiesPage() {
  const resetConsent = () => {
    // Itt majd töröljük a mentett sütit/hozzájárulást, hogy újra megjelenjen a banner
    localStorage.removeItem("cookie_consent");
    alert("Ihre Cookie-Einstellungen wurden zurückgesetzt. Die Seite wird neu geladen.");
    window.location.reload();
  };

  const acceptAll = () => {
    localStorage.setItem("cookie_consent", "all");
    alert("Alle Cookies wurden akzeptiert.");
  };

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase">
            <Cookie className="w-3.5 h-3.5" />
            <span>Datenschutz & Cookies</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Cookie-Richtlinie & Einstellungen
          </h1>
          <p className="text-xs tracking-[0.2em] text-slate-400 uppercase">
            Transparenz über die Verwendung von Cookies auf 82.SEOUL
          </p>
        </div>

        {/* Tartalom */}
        <div className="space-y-8 text-sm md:text-base leading-relaxed text-slate-300">
          
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">1. Was sind Cookies?</h2>
            <p>
              Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Endgerät gespeichert werden. Sie helfen dabei, die Website funktionsfähig zu machen und das Nutzererlebnis zu verbessern.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white tracking-wide">2. Welche Cookies verwenden wir?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Notwendige Cookies</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">Immer aktiv</span>
                </div>
                <p className="text-xs text-slate-400">
                  Diese sind für den Betrieb des Shops unerlässlich (z.B. Speicherung des Warenkorbs oder der Cookie-Präferenz).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">Marketing & Analyse</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">Optional</span>
                </div>
                <p className="text-xs text-slate-400">
                  Helfen uns zu verstehen, wie Besucher mit der Website interagieren (wird aktuell nur bei Bedarf aktiviert).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <h2 className="text-lg font-bold text-white tracking-wide">Ihre Einstellungen verwalten</h2>
            <p className="text-xs text-slate-400">
              Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen oder anpassen.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={resetConsent}
                className="px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider border border-neutral-700 transition-all cursor-pointer"
              >
                Cookie-Einstellungen zurücksetzen
              </button>
              
              <button
                onClick={acceptAll}
                className="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow"
              >
                Alle Cookies akzeptieren
              </button>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}