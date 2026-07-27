"use client";

import Link from "next/link";
import { Compass, ArrowUpRight, Plane, MapPin, Sparkles } from "lucide-react";

export default function KoreaSection() {
  return (
    <section className="w-full py-24 md:py-36 bg-linear-to-b from-neutral-950 via-slate-100 to-slate-50 text-neutral-900 relative overflow-hidden border-t border-neutral-800/60">
      
      {/* 1. SEYLEM-ÁTMENET KÖD: Feketéből észrevétlenül simul bele a világos háttérbe */}
      <div className="absolute top-0 inset-x-0 h-64 bg-linear-to-b from-neutral-950 via-neutral-950/60 to-transparent pointer-events-none z-0" />

      {/* Égszínkék és ezüstös utazási háttérfények */}
      <div className="absolute top-1/3 -right-32 w-125 h-125 bg-linear-to-br from-sky-400/20 via-slate-200/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-112.5 h-112.5 bg-linear-to-tl from-indigo-300/20 via-slate-200/20 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* 1. FEJLÉC - RAGYOGÓ VILÁGOS SZÖVEGEKKEL A SÖTÉT KÖDBEN */}
      <div className="max-w-3xl mx-auto px-6 text-center z-10 relative mb-14 md:mb-20 space-y-5 pt-6">
        
        {/* Égszínkék Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-sky-500/40 text-sky-300 text-xs font-bold tracking-widest uppercase shadow-md">
          <Compass className="w-3.5 h-3.5 stroke-[1.75] text-sky-400" />
          <span>FEDEZD FEL DÉL-KOREÁT</span>
        </div>

        {/* Hófehér főcím égszínkék csillogással */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.15] drop-shadow-md">
          Ahol a Múlt és a Jövő{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-sky-300 via-sky-200 to-indigo-200">
            Kéz a Kézben Jár.
          </span>
        </h2>

        {/* Ezüstös-fehér tisztán olvasható leírás */}
        <p className="text-slate-300 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
          Ősi paloták a neonszínekben úszó felhőkarcolók árnyékában, békés buddhista kolostorok és a világ legfejlettebb metropoliszai. Készülj fel az életed kalandjára!
        </p>
      </div>

      {/* 2. BENTO GRID UTAZÁSI KÁRTYÁK */}
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* FŐKÁRTYA: Szöul Metropolisz & N Seoul Tower */}
          <Link
            href="/korea-travel#seoul"
            className="lg:col-span-8 group relative h-120 md:h-135 rounded-3xl overflow-hidden bg-neutral-900 border border-slate-200/70 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(14,165,233,0.25)] hover:border-sky-300 block cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1200&auto=format&fit=crop"
              alt="Szöul éjszakai látképe"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/40 via-50% to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

            {/* Badge & Ikongomb */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                <MapPin className="w-3 h-3 text-sky-400" />
                SZÖUL & METROPOLISZ
              </span>

              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:text-white">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Tartalom */}
            <div className="absolute bottom-0 inset-x-0 p-8 space-y-3 z-10 text-white">
              <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Legnépszerűbb Úti Cél</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Szöul: A Soha Nem Alvó Főváros
              </h3>

              <p className="text-sm md:text-base text-neutral-200 font-normal leading-relaxed max-w-xl drop-shadow-xs">
                A Gangnam luxusnegyedétől a Myeongdong vibráló piacain át a Gyeongbokgung palotáig. Fedezd fel a metropoliszt, ami lenyűgözi a világot.
              </p>
            </div>
          </Link>

          {/* KISEBB KÁRTYA: Hagyomány & Hanok Falvak */}
          <Link
            href="/korea-travel#tradition"
            className="lg:col-span-4 group relative h-120 md:h-135 rounded-3xl overflow-hidden bg-neutral-900 border border-slate-200/70 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(14,165,233,0.25)] hover:border-sky-300 block cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=800&auto=format&fit=crop"
              alt="Hagyományos koreai hanok ház"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/40 via-50% to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />

            <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                KULTÚRA & TÖRTÉNELEM
              </span>

              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:text-white">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-7 space-y-2 z-10 text-white">
              <span className="text-xs text-sky-300 font-mono uppercase tracking-wider">Bukchon & Jeonju</span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Tradicionális Hanok Falvak</h3>
              <p className="text-xs md:text-sm text-neutral-200 font-normal leading-relaxed line-clamp-3">
                Lépj be az időgépbe! Tölts el egy éjszakát egy több száz éves fagerendás hanok házban és tapasztáld meg a tradicionális koreai vendégszeretetet.
              </p>
            </div>
          </Link>

          {/* ALSÓ SOR 1: Jeju-sziget & Természet */}
          <Link
            href="/korea-travel#jeju"
            className="lg:col-span-6 group relative h-72 md:h-80 rounded-3xl overflow-hidden bg-neutral-900 border border-slate-200/70 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.2)] hover:border-sky-300 block cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=800&auto=format&fit=crop"
              alt="Jeju sziget vulkanikus tengerpartja"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-wider uppercase">
                JEJU-SZIGET & TERMESZET
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 space-y-1.5 z-10 text-white">
              <h3 className="text-2xl font-bold tracking-tight text-white">Korea Hawaii-ja: Jeju Csodái</h3>
              <p className="text-xs text-neutral-200 font-normal line-clamp-2">Vízesések, vulkáni kráterek és Türkizkék tengerpart. Jeju-sziget a pihenés és a túrázás paradicsoma.</p>
            </div>
          </Link>

          {/* ALSÓ SOR 2: Utazási Kisokos & Tippek */}
          <Link
            href="/korea-travel#guide"
            className="lg:col-span-6 group relative h-72 md:h-80 rounded-3xl overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-indigo-950 border border-slate-700/80 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.2)] hover:border-sky-400/60 cursor-pointer p-8 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-[10px] font-bold tracking-wider uppercase">
                <Plane className="w-3 h-3 text-sky-400" />
                <span>PRAKTIKUS ÚTIKALAUZ</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center group-hover:bg-sky-500 transition-all duration-300">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-3 z-10">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Mielőtt Útnak Indulsz: A Legfontosabb Tippek
              </h3>
              <p className="text-xs md:text-sm text-slate-300 font-normal leading-relaxed">
                T-Money kártyák, Naver Map használata, WOWPASS fizetések és szezonális időjárási kalauz. Minden, amit tudnod kell az első koreai utazásod előtt!
              </p>
            </div>

            {/* Háttér dekoratív vízjegy */}
            <Plane className="absolute -bottom-6 -right-6 w-48 h-48 text-white/5 pointer-events-none -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:text-white/10" />
          </Link>

        </div>
      </div>

      {/* 3. CTA BESZÁLLÓKÁRTYA STÍLUSÚ GOMB */}
      <div className="mt-16 text-center z-10 relative">
        <Link
          href="/korea-travel"
          className="inline-flex items-center gap-3 px-9 py-4 bg-linear-to-b from-slate-950 via-slate-900 to-black hover:from-sky-900 hover:to-slate-900 text-white font-bold text-xs md:text-sm tracking-wider uppercase rounded-full shadow-lg hover:shadow-2xl border border-sky-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
        >
          <Plane className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          <span>TELJES KOREAI UTAZÁSI ÚTIKALAUZ FELFEDEZÉSE</span>
          <span className="text-base text-slate-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">➔</span>
        </Link>
      </div>

    </section>
  );
}