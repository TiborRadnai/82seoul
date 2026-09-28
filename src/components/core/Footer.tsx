"use client";

import Link from "next/link";
import { 
  Sparkles, 
  Send, 
  Music2, 
  Globe,
  ArrowUpRight,
  Heart
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-950 text-slate-400 relative overflow-hidden border-t border-neutral-800/80 font-sans">
      
      {/* Háttér dekoratív effektek */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-20 pb-12 relative z-10">
        
        {/* FELSŐ RÉSZ: Brand & Hírlevél */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800/60">
          
          {/* Brand Info (5 oszlop) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-slate-900 to-slate-800 border border-slate-700/80 flex items-center justify-center text-white shadow-md group-hover:border-amber-400/50 transition-colors">
                <span className="font-black tracking-tighter text-sm">82</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  82.SEOUL
                </span>
                <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-bold">
                  Original K-Beauty & Culture
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-sm">
              Dein direkter Weg nach Südkorea. Entdecke authentische Glass Skin Kosmetik, angesagte K-Beauty Trends und faszinierende K-Culture Highlights direkt aus Seoul.
            </p>

            {/* Social ikonok (Csak TikTok & Instagram) */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-slate-400 hover:text-white hover:bg-neutral-800 hover:border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-slate-400 hover:text-white hover:bg-neutral-800 hover:border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <Music2 className="w-4 h-4 stroke-[1.75]" />
              </a>
            </div>
          </div>

          {/* Hírlevél Kártya (7 oszlop) */}
          <div className="lg:col-span-7 bg-linear-to-br from-neutral-900/90 via-neutral-900/40 to-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3 h-3 text-rose-400" />
                <span>82SEOUL VIP NEWSLETTER</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Verpasse keine K-Beauty Trends mehr!
              </h3>
              <p className="text-xs md:text-sm text-slate-400">
                Abonniere unseren Newsletter und erhalte exklusive Rabatte, Neuheiten und die heißesten Glass Skin Tipps direkt in dein Postfach.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-3 z-10">
              <input
                type="email"
                placeholder="Deine E-Mail-Adresse..."
                className="grow px-5 py-3.5 rounded-full bg-neutral-950/80 border border-neutral-800 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-rose-400/50 transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-200 text-neutral-950 font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shrink-0 shadow"
              >
                <span>Anmelden</span>
                <Send className="w-3.5 h-3.5 text-neutral-950" />
              </button>
            </form>
          </div>

        </div>

        {/* KÖZÉPSŐ RÉSZ: Valós Navigációs Linkek (Grid - 3 oszlop a tisztább elrendezésért) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12 border-b border-neutral-800/60">
          
          {/* 1. K-BEAUTY SHOP */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              K-Beauty Shop
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Glass Skin Kollektion", href: "/kbeauty" },
                { name: "Skincare & Bestseller", href: "/kbeauty" },
                { name: "Originalitäts-Garantie", href: "/kbeauty" },
                { name: "Warenkorb & Bestellung", href: "/cart" }
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. K-CULTURE & ENTDECKEN */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              K-Culture
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "K-Pop Highlights", href: "/kpop" },
                { name: "K-Movies & Dramen", href: "/kdrama" },
                { name: "Über 82.SEOUL", href: "/about" }
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-rose-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. RECHTLICHES (Kötelező webshop elemek) */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              Rechtliches
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Impressum", href: "/impressum" },
                { name: "Datenschutz", href: "/privacy" },
                { name: "AGB & Widerruf", href: "/terms" },
                { name: "Cookie-Einstellungen", href: "/cookies" }
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ALSÓ RÉSZ: Copyright, Madevix & Nyelv */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>© {currentYear} 82.SEOUL. Alle Rechte vorbehalten.</span>
            <span className="hidden sm:inline">•</span>
            <span>
              Developed by{" "}
              <a 
                href="https://madevix.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors font-medium underline underline-offset-4"
              >
                Madevix
              </a>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>DE (Deutschland)</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}