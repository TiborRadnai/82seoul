import Image from "next/image";

export default function NatureHeader() {
  return (
    <div className="relative w-full h-[85vh] min-h-150 flex flex-col justify-center overflow-hidden bg-black text-white">
      {/* Háttérkép lassan pulzáló zoom effekttel */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/NatureHeaderBackground.webp"
          alt="Natur & Jeju - Vulkane, Küsten und grüne Oasen"
          fill
          className="object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] transition-transform duration-1000"
          priority
        />
      </div>

      {/* Többrétegű, prémium magazin sötétítés */}
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-black/70" />

      {/* Monumentális Hero Tartalom – Zöldes természet akcentusokkal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center my-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#34d399] uppercase mb-4 bg-black/60 backdrop-blur-md px-4 py-1.5 border border-white/15 shadow-lg">
          <span>KAPITEL 03 // NATUR & JEJU</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[1.05] drop-shadow-2xl">
          Natur <span className="text-[#34d399] font-extralight">&</span> Jeju
        </h1>

        <p className="text-base sm:text-xl text-neutral-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Vulkanische Krater, unberührte Küstenlinien und die mystische Schönheit der Vulkaninsel Jeju. Durchatmen in Koreas grüner Oase.
        </p>
      </div>
    </div>
  );
}