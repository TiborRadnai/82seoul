'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Ellenőrizzük, hogy van-e már mentett döntés a böngészőben
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-300">
        
        {/* Szöveges rész */}
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-white font-bold text-base sm:text-lg flex items-center justify-center md:justify-start gap-2">
            <span>🍪</span> Wir respektieren Ihre Privatsphäre
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl">
            Wir verwenden Cookies, um die Kernfunktionen unseres Shops zu gewährleisten und Ihr Erlebnis zu verbessern. 
            Weitere Details finden Sie in unserer{' '}
            <Link href="/cookies" className="text-amber-400 underline hover:text-white transition-colors">
              Cookie-Richtlinie
            </Link>.
          </p>
        </div>

        {/* Gombok */}
        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <button
            onClick={handleAcceptEssential}
            className="px-5 py-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs uppercase tracking-wider border border-neutral-700 transition-all cursor-pointer"
          >
            Nur Notwendige
          </button>
          
          <button
            onClick={handleAcceptAll}
            className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Alle akzeptieren
          </button>
        </div>

      </div>
    </div>
  );
}