import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GuideTickerDivider() {
  const guideItems = [
    "KTX & TRANSPORT",
    "NAVER MAP",
    "KAKAOTALK",
    "ETIKETTE",
    "WIFI & ESIM",
    "BEZAHLUNG",
    "NOTRUF",
    "SUDOCOOK",
    "ESSENTIALS",
  ];

  return (
    <div className="w-full bg-[#0a0a0c] border-y border-white/10 py-4 px-6 lg:px-16 flex items-center justify-between overflow-hidden text-white relative shadow-inner">
      
      {/* Bal oldali fix gomb / visszanyíl – Monokróm / szürke akcentussal */}
      <div className="shrink-0 z-20 pr-6 bg-[#0a0a0c]">
        <Link
          href="/ktravel"
          className="inline-flex items-center gap-2.5 text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400 hover:text-white transition-colors group"
        >
          <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center bg-black/40 group-hover:border-white/50 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 text-neutral-300" />
          </div>
          <span className="hidden sm:inline">Übersicht</span>
        </Link>
      </div>

      {/* Futó sáv szürke elválasztókkal */}
      <div className="grow overflow-hidden whitespace-nowrap relative">
        <div className="absolute left-0 inset-y-0 w-12 bg-linear-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-12 bg-linear-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-8 text-xs font-mono tracking-[0.3em] text-neutral-400 uppercase animate-[marquee_25s_linear_infinite]">
          {guideItems.concat(guideItems).map((item, idx) => (
            <span key={idx} className="flex items-center gap-8 shrink-0 hover:text-white transition-colors cursor-default">
              <span>{item}</span>
              <span className="text-neutral-500">//</span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}