'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, Check, X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Opcionális sütik állapotai
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Ellenőrizzük, hogy a felhasználó döntött-e már
    const consent = localStorage.getItem('82seoul_cookie_consent');
    if (!consent) {
      // Kis késleltetés a simább megjelenésért
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('82seoul_cookie_consent', JSON.stringify({ necessary: true, analytics: true, marketing: true }));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('82seoul_cookie_consent', JSON.stringify({ necessary: true, analytics, marketing }));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('82seoul_cookie_consent', JSON.stringify({ necessary: true, analytics: false, marketing: false }));
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none flex justify-center">
      <div className="pointer-events-auto w-full max-w-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-3xl p-6 md:p-8 text-slate-900 transition-all duration-500 animate-in fade-in slide-in-from-bottom-6">
        
        {!showPreferences ? (
          /* Alap nézet */
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 text-rose-600">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Wir schätzen Ihre Privatsphäre
                </h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  Wir verwenden Cookies und ähnliche Technologien, umweltfreundliche Analysen durchzuführen und Ihnen ein optimales Web-Erlebnis auf <span className="font-semibold text-slate-900">82.SEOUL</span> zu bieten. Sie können Ihre Einwilligung jederzeit widerrufen. Weitere Details finden Sie in unserer{' '}
                  <Link href="/privacy" className="text-rose-600 font-medium hover:underline underline-offset-2">
                    Datenschutzerklärung
                  </Link>.
                </p>
              </div>
            </div>

            {/* Gombok */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handleRejectNonEssential}
                className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
              >
                Nur Notwendige
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase border border-slate-300 hover:border-slate-400 text-slate-800 transition-all cursor-pointer"
              >
                Einstellungen
              </button>
              <button
                onClick={handleAcceptAll}
                className="w-full sm:flex-1 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-900 hover:bg-rose-600 text-white transition-all shadow-md shadow-slate-900/10 hover:shadow-rose-500/20 cursor-pointer"
              >
                Alle Akzeptieren
              </button>
            </div>
          </div>
        ) : (
          /* Részletes beállítások nézet */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rose-500" />
                Cookie-Einstellungen anpassen
              </h3>
              <button 
                onClick={() => setShowPreferences(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              {/* Szükséges */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 text-xs tracking-wide uppercase">Notwendige Cookies</span>
                  <p className="text-xs text-slate-600">
                    Erforderlich für die grundlegende Funktionalität der Website (z. B. Warenkorb, Sitzung). Ohne diese kann die Seite nicht richtig funktionieren.
                  </p>
                </div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full shrink-0 border border-emerald-500/20">
                  Immer aktiv
                </div>
              </div>

              {/* Analitika */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 text-xs tracking-wide uppercase">Analyse & Statistik</span>
                  <p className="text-xs text-slate-600">
                    Helfen uns zu verstehen, wie Besucher mit der Website interagieren, um das Angebot zu verbessern.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input 
                    type="checkbox" 
                    checked={analytics} 
                    onChange={(e) => setAnalytics(e.target.checked)} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 text-xs tracking-wide uppercase">Marketing & Social Media</span>
                  <p className="text-xs text-slate-600">
                    Werdend verwendet, um personalisierte Inhalte oder relevante Werbung anzuzeigen.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input 
                    type="checkbox" 
                    checked={marketing} 
                    onChange={(e) => setMarketing(e.target.checked)} 
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>
            </div>

            {/* Mentés gomb */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleAcceptSelected}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-900 hover:bg-rose-600 text-white transition-all shadow-md shadow-slate-900/10 cursor-pointer"
              >
                Auswahl Speichern
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}