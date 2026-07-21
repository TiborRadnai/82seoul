import { Sparkles, Radio, Film, Utensils } from "lucide-react";

const STATS = [
  { icon: Sparkles, value: "100%", label: "KOREAN BEAUTY" },
  { icon: Radio, value: "24/7", label: "K-POP VIBES" },
  { icon: Film, value: "100+", label: "KOREAN SERIES" },
  { icon: Utensils, value: "50+", label: "KOREAN FOOD" },
];

export default function StatsDivider() {
  return (
    <section className="w-full bg-black border-y border-white/10 py-12 md:py-16 relative z-20">
      <div className="max-w-350 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-center">
          {STATS.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center space-y-2.5 group cursor-default"
              >
                <div className="flex items-center gap-3">
                  <IconComponent className="w-5 h-5 md:w-7 md:h-7 text-neutral-400 stroke-[1.5] transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
                  <span className="text-3xl md:text-5xl font-extralight text-white tracking-tight font-sans">
                    {stat.value}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-neutral-400 uppercase">
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