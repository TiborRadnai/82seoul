"use client";

import Link from "next/link";
import { 
  Sparkles, 
  Send, 
  Music2, 
  Heart,
  Globe,
  ArrowUpRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-950 text-slate-400 relative overflow-hidden border-t border-neutral-800/80">
      
      {/* Háttér dekoratív effektek */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-slate-700 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12 relative z-10">
        
        {/* FELSŐ RÉSZ: Brand & Hírlevél */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800/60">
          
          {/* Brand Info (5 oszlop) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-slate-900 to-slate-800 border border-slate-700/80 flex items-center justify-center text-white shadow-md group-hover:border-sky-400/50 transition-colors">
                <span className="font-black tracking-tighter text-sm">82</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                  82SEOUL
                </span>
                <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-bold">
                  K-Culture & Travel
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 font-normal leading-relaxed max-w-sm">
              A te közvetlen átjáród Dél-Koreába. A legforróbb K-Pop hírek, K-Drama ajánlók, autentikus Glass Skin bőrápolási tippek és felejthetetlen utazási élmények – mind egy helyen.
            </p>

{/* Social ikonok */}
<div className="flex items-center gap-3 pt-2">
  {/* Instagram */}
  <a
    href="#"
    aria-label="Instagram"
    className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-slate-400 hover:text-white hover:bg-neutral-800 hover:border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-105"
  >
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  </a>

  {/* YouTube */}
  <a
    href="#"
    aria-label="YouTube"
    className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-slate-400 hover:text-white hover:bg-neutral-800 hover:border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-105"
  >
    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  </a>

  {/* TikTok (Music2) */}
  <a
    href="#"
    aria-label="TikTok"
    className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 text-slate-400 hover:text-white hover:bg-neutral-800 hover:border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-105"
  >
    <Music2 className="w-4 h-4 stroke-[1.75]" />
  </a>
</div>
          </div>

          {/* Hírlevél Kártya (7 oszlop) */}
          <div className="lg:col-span-7 bg-linear-to-br from-neutral-900/90 via-neutral-900/40 to-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-bold tracking-widest uppercase">
                <Sparkles className="w-3 h-3" />
                <span>82SEOUL VIP HÍRLEVÉL</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Ne maradj le a legújabb koreai trendekről!
              </h3>
              <p className="text-xs md:text-sm text-slate-400">
                Iratkozz fel heti hírlevelünkre, és kapd meg a legfrissebb K-Beauty akciókat és exkluzív utazási tippeket közvetlenül a fiókodba!
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-3 z-10">
              <input
                type="email"
                placeholder="Add meg az e-mail címed..."
                className="grow px-5 py-3.5 rounded-full bg-neutral-950/80 border border-neutral-800 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-200 text-neutral-950 font-bold text-xs tracking-wider uppercase rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              >
                <span>Feliratkozás</span>
                <Send className="w-3.5 h-3.5 text-neutral-950" />
              </button>
            </form>
          </div>

        </div>

        {/* KÖZÉPSŐ RÉSZ: Navigációs Linkek (Grid) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-neutral-800/60">
          
          {/* 1. K-POP & MUSIC */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              K-Pop & Zene
            </h4>
            <ul className="space-y-2.5 text-sm">
              {["BTS & ARMY Hub", "BLACKPINK & Blink", "Új Generációs Csapatok", "K-Pop Comeback Naptár"].map((item, i) => (
                <li key={i}>
                  <Link href="#kpop" className="hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-sky-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. K-DRAMA & MOVIES */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              Sorozatok & Mozi
            </h4>
            <ul className="space-y-2.5 text-sm">
              {["Top K-Drámák 2026", "Netflix Koreai Filmek", "Színészek & Profilok", "Forgatási Helyszínek"].map((item, i) => (
                <li key={i}>
                  <Link href="#kdrama" className="hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-rose-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. K-BEAUTY SHOP */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              K-Beauty Shop
            </h4>
            <ul className="space-y-2.5 text-sm">
              {["Glass Skin Rutin", "Bestseller Kozmetikumok", "Eredetiség Garancia", "Szállítási Infók"].map((item, i) => (
                <li key={i}>
                  <Link href="#kbeauty" className="hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. KOREA TRAVEL */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white uppercase">
              Utazás & Kultúra
            </h4>
            <ul className="space-y-2.5 text-sm">
              {["Szöul Útikalauz", "Jeju-sziget Látnivalók", "Tradicionális Hanok", "Gasztronómia & K-Food"].map((item, i) => (
                <li key={i}>
                  <Link href="#korea-travel" className="hover:text-white transition-colors flex items-center gap-1 group">
                    <span>{item}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ALSÓ RÉSZ: Copyright & Jogi infók */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {currentYear} 82SEOUL. minden jog fenntartva.</span>
            <span className="hidden md:inline">•</span>
            <span className="inline-flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for K-Culture Fans
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Adatvédelmi Nyilatkozat
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Felhasználási Feltételek
            </Link>
            <div className="flex items-center gap-1 text-slate-400 font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>HU</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}