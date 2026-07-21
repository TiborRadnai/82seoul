const FEATURED_PRODUCT = {
  title: "HydraGlow Hidratáló Cream",
  price: "9.990 Ft",
  description: "Mélyhidratálás hialuronsavval.",
  image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=300&auto=format&fit=crop",
  link: "#product-details",
};

export default function Header() {
  return (
    <header className="relative w-full h-screen overflow-hidden bg-slate-950 font-sans">
      {/* Háttérkép (Jung So-Min) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/somin-bg.webp')`,
        }}
      />

      {/* Hero Tartalom Tartó */}
      <div className="relative z-10 max-w-[1600px] mx-auto h-full px-5 md:px-12 flex flex-col justify-between pt-20 md:pt-28 pb-5 md:pb-10">
        
        {/* FELSŐ RÉSZ: Badge + Főcím + Márka Stempel (Mobilon középre igazítva) */}
        <div className="space-y-3 md:space-y-5 max-w-2xl text-center md:text-left mx-auto md:mx-0 flex flex-col items-center md:items-start">
          
          {/* FŐCÍM */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-light tracking-tight text-white leading-tight drop-shadow-xl">
            Fedezd Fel Korea Ragyogását.
          </h1>

          {/* AUTENTIKUS K-BEAUTY STEMPEL (Középre igazítva, nagyobb, jól olvasható sötét-üveg háttérrel) */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white shadow-2xl transition-transform hover:scale-105 duration-300">
            <span className="text-base md:text-lg font-black text-amber-300 tracking-widest drop-shadow">서울</span>
            <span className="text-white/40 text-xs">•</span>
            <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-white uppercase drop-shadow-sm">
              82.SEOUL • ORIGINAL K-BEAUTY
            </span>
          </div>

        </div>

        {/* ALSÓ RÉSZ: Kártyák & Garancia */}
        <div className="space-y-4 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
            
            {/* BAL OLDAL: Csak asztalin látható nagykártya */}
            <div className="hidden lg:block lg:col-span-5 bg-black/45 backdrop-blur-xl p-8 rounded-3xl space-y-6 text-white shadow-2xl border border-white/10">
              <h3 className="text-sm font-bold tracking-widest uppercase text-slate-100 leading-snug">
                A 82.SEOUL NEM CSUPÁN WEBSHOP – EGY KAPU KOREA VILÁGÁBA.
              </h3>
              <p className="text-sm text-slate-200 tracking-wide leading-relaxed font-light uppercase">
                FEDEZD FEL A K-BEAUTY TITKAIT, A K-POP ENERGIÁJÁT ÉS A KOREAI KULTÚRA ELEGANCIAJÁT. MINDEN TERMÉKÜNK EGY DARABKA SEOUL.
              </p>
              <div className="pt-2">
                <a
                  href="#shop"
                  className="inline-flex items-center gap-3 px-7 py-3 bg-slate-100 hover:bg-white text-slate-900 rounded-full font-bold text-xs tracking-wider uppercase transition-all duration-300"
                >
                  <span>FEDEZD FEL MOST</span>
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">➔</span>
                </a>
              </div>
            </div>

            {/* KÖZÉPSŐ TÉR */}
            <div className="hidden lg:block lg:col-span-3" />

            {/* JOBB OLDAL / MOBILON A KÉPERNYŐ ALJÁN: Kiemelt Termék Kártya */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="bg-black/40 backdrop-blur-xl p-3 md:p-4 rounded-2xl md:rounded-3xl flex items-center gap-3 md:gap-4 w-full sm:max-w-md shadow-2xl border border-white/10">
                <div className="relative w-14 h-14 sm:w-20 sm:h-20 bg-slate-100/90 rounded-xl md:rounded-2xl overflow-hidden shrink-0 flex items-center justify-center p-1.5">
                  <span className="absolute top-1 left-1 bg-slate-900 text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {FEATURED_PRODUCT.price}
                  </span>
                  <img
                    src={FEATURED_PRODUCT.image}
                    alt={FEATURED_PRODUCT.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-1 text-white flex-1 min-w-0">
                  <h4 className="text-xs md:text-base font-semibold tracking-tight truncate">{FEATURED_PRODUCT.title}</h4>
                  <p className="text-[10px] md:text-[11px] text-slate-300 line-clamp-1 leading-tight font-light">
                    {FEATURED_PRODUCT.description}
                  </p>
                  <div className="pt-0.5">
                    <a
                      href={FEATURED_PRODUCT.link}
                      className="inline-block px-3 py-1 bg-slate-100 hover:bg-white text-slate-900 rounded-full font-bold text-[9px] md:text-[10px] tracking-wider uppercase transition-all"
                    >
                      RÉSZLETEK
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* BAL ALSÓ MINŐSÉGI GARANCIA */}
          <div className="flex flex-col gap-0.5 text-white pt-1">
            <div className="flex items-center gap-2">
              <span className="text-slate-200 text-xs">★ ★ ★ ★ ★</span>
              <span className="text-[10px] md:text-[11px] font-semibold text-slate-100">100% Premium Quality</span>
            </div>
            <span className="text-[8px] md:text-[10px] tracking-widest uppercase text-slate-300 font-medium">
              Garantáltan Eredeti Koreai Kozmetikumok & Kultúra
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}