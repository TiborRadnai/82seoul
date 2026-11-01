import Image from "next/image";

export default function GuideHeader() {
  return (
    <div className="relative w-full h-[85vh] min-h-150 flex flex-col justify-center overflow-hidden bg-black text-white">
      {/* Háttérkép lassan pulzáló zoom effekttel */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/GuideHeaderBackground.webp"
          alt="Praktische Hinweise - Travel Guide & Essentials"
          fill
          className="object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite] transition-transform duration-1000"
          priority
        />
      </div>

      {/* Többrétegű, prémium magazin sötétítés */}
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-black/70" />

      {/* Monumentális Hero Tartalom – Elegáns platinaszürke akcentusokkal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center my-auto">
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-neutral-300 uppercase mb-4 bg-black/60 backdrop-blur-md px-4 py-1.5 border border-white/20 shadow-lg">
          <span>KAPITEL 04 // TRAVEL GUIDE & ESSENTIALS</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white mb-6 leading-[1.05] drop-shadow-2xl">
          Travel <span className="text-neutral-400 font-extralight italic">Guide</span>
        </h1>

        <p className="text-base sm:text-xl text-neutral-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Von High-Speed-Zügen (KTX) über digitale Navigation bis hin zu kulturellen Etiketten. Alles, was du für deine Korea-Reise wissen musst.
        </p>
      </div>
    </div>
  );
}