import { Sparkles, Radio, Film, Utensils, Compass } from "lucide-react";

const STATS = [
  { icon: Sparkles, value: "100%", label: "KOREAN BEAUTY" },
  { icon: Radio, value: "24/7", label: "K-POP VIBES" },
  { icon: Film, value: "CURATED", label: "KOREAN SERIES" },
  { icon: Utensils, value: "AUTHENTIC", label: "KOREAN FOOD" },
  { icon: Compass, value: "EXPLORE", label: "K-TRAVEL GUIDES" },
];

export default function StatsDivider() {
  return (
    <section className="w-full bg-black border-y border-white/10 py-8 md:py-12 relative z-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Mobilon grid (2 soros), laptopon/desktopon szigorúan 1 sor (lg:flex lg:flex-row) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-8">
          {STATS.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center text-center space-y-2 group cursor-default ${
                  idx === 4 ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 stroke-[1.75] transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
                  <span className="text-xl sm:text-2xl md:text-3xl font-light text-white tracking-tight font-sans">
                    {stat.value}
                  </span>
                </div>
                <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.25em] text-neutral-400 uppercase">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}