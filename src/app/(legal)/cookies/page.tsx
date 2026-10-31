'use client';

import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, Cookie, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function CookiesPage() {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetConsent = () => {
    localStorage.removeItem("cookie_consent");
    setSuccessMsg("Cookie-Einstellungen wurden zurückgesetzt. Die Seite wird neu geladen...");
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  const acceptAll = () => {
    localStorage.setItem("cookie_consent", "all");
    setSuccessMsg("Alle Cookies wurden erfolgreich akzeptiert.");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

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

        {/* Értesítési sáv (ha gombra kattintanak) */}
        {successMsg && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs md:text-sm font-semibold flex items-center gap-2 animate-fade-in shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Fejléc / Kategória badge */}
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-rose-500" />
            <span>Datenschutz & Cookies • 82.SEOUL</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Cookie-Richtlinie & Einstellungen
          </h1>
          <p className="text-slate-600 text-base md:text-lg">
            Transparenz über die Verwendung von Cookies auf 82.SEOUL und Verwaltung deiner Präferenzen.
          </p>
        </div>

        {/* Tartalmi kártyák */}
        <div className="space-y-8">
          
          {/* 1. Szekció */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-4 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              1. Was sind Cookies?
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Cookies sind kleine Textdateien, die beim Besuch einer Website auf deinem Endgerät gespeichert werden. Sie helfen dabei, die Website funktionsfähig zu machen, die Sicherheit zu gewährleisten und das Nutzererlebnis zu verbessern.
            </p>
          </section>

          {/* 2. Szekció: Típusok */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-6 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              2. Welche Cookies verwenden wir?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Notwendige Cookies</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Immer aktiv</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Diese sind für den Grundbetrieb des Portals unerlässlich (z. B. Speicherung der Cookie-Präferenz oder Login-Sitzung).
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Marketing & Analyse</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Optional</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Helfen uns zu verstehen, wie Besucher mit der Website interagieren (Google Analytics, nur nach deiner aktiven Einwilligung).
                </p>
              </div>
            </div>
          </section>

          {/* 3. Szekció: Beállítások kezelése (Interaktív) */}
          <section className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-10 relative overflow-hidden space-y-6 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              3. Deine Einstellungen verwalten
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Du kannst deine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen oder anpassen.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={resetConsent}
                className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-all cursor-pointer shadow-xs"
              >
                Cookie-Einstellungen zurücksetzen
              </button>
              
              <button
                onClick={acceptAll}
                className="px-6 py-3 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                Alle Cookies akzeptieren
              </button>
            </div>
          </section>

        </div>

      </div>
    </main>
  );
}