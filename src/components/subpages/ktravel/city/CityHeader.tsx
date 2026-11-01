import Image from "next/image";

export default function CityHeader() {
  return (
    <div className="relative w-full h-[85vh] min-h-150 flex flex-col justify-center overflow-hidden bg-black text-white">
      {/* A fenséges helyi háttérkép lassan pulzáló zoom effekttel */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/CityHeaderBackground.webp"
          alt="Metropolis & City Life - Seoul Heritage and Modernity"
          fill
          className="object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] transition-transform duration-1000"
          priority
        />
      </div>

      {/* Többrétegű, prémium magazin sötétítés */}
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-black/70" />

      {/* Központi, monumentális Hero Tartalom – Tiszta, szellős és grandiózus */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center my-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#38bdf8] uppercase mb-4 bg-black/60 backdrop-blur-md px-4 py-1.5 border border-white/15 shadow-lg">
          <span>KAPITEL 01 // METROPOLEN & CITY LIFE</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[1.05] drop-shadow-2xl">
          Metropolen <span className="text-[#38bdf8] font-extralight">&</span> City Life
        </h1>

        <p className="text-base sm:text-xl text-neutral-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Wo Spitzentechnologie auf pulsierendes Straßenleben trifft. Eine visuelle Reise durch die urbanen Zentren Koreas.
        </p>
      </div>
    </div>
  );
}