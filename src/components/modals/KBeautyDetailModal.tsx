"use client";

import { useState, useEffect } from "react";
import { X, Star, ShoppingBag, Check, Sparkles, ShieldCheck } from "lucide-react";
import { Product } from "@/data/kbeautyData";

interface KBeautyDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function KBeautyDetailModal({ product, onClose }: KBeautyDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Billentyűzet ESC gombra bezárás & scroll letiltás
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      
      {/* Sötétített üveg háttér (Backdrop) */}
      <div 
        className="fixed inset-0 bg-neutral-950/60 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modál Kártya Konténer */}
      <div className="relative w-full max-w-4xl bg-white border border-slate-200/90 rounded-4xl sm:rounded-[40px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.3)] overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        
        {/* Elkülönített, letisztult bezáró gomb - Soha nem takarja ki az értékelést */}
        <button
          onClick={onClose}
          aria-label="Bezárás"
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-white/80 hover:bg-slate-100 backdrop-blur-md border border-slate-200 text-slate-700 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95"
        >
          <X className="w-5 h-5 stroke-2" />
        </button>

        {/* BAL OLDAL: Termék Kép & Háttér Agyag/Ezüst Derengés */}
        <div className="w-full md:w-1/2 bg-linear-to-b from-slate-50 via-neutral-100/80 to-slate-100/50 p-8 sm:p-12 flex items-center justify-center relative min-h-70 md:min-h-120">
          
          <div className="absolute w-48 h-48 bg-slate-300/30 rounded-full blur-3xl pointer-events-none" />

          {/* Tag / Badge */}
          {product.tag && (
            <span className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-linear-to-r from-slate-100 to-slate-200/90 text-slate-800 border border-slate-300/80 text-[10px] font-extrabold uppercase tracking-widest shadow-2xs z-20">
              {product.tag}
            </span>
          )}

          {/* Termékkép & Árnyék */}
          <div className="relative z-10 flex flex-col items-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-56 sm:max-h-80 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600";
              }}
            />
            <div className="w-36 h-4 bg-slate-400/20 rounded-full blur-md mt-2" />
          </div>
        </div>

        {/* JOBB OLDAL: Részletes Infók & Vásárlási sáv */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 pt-12 md:pt-10 flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div className="space-y-4">
            
            {/* Brand, Category & Értékelés (Jobbra húzva, hogy a zárógomb alatt kényelmesen elférjen) */}
            <div className="flex items-center justify-between gap-4 pr-8 md:pr-0">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                {product.brand} • {product.category}
              </span>

              <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold bg-amber-50/80 border border-amber-200/60 px-3 py-1 rounded-full shadow-2xs shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>
            </div>

            {/* Cím */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {product.name}
            </h2>

            {/* Ár megjelenítés */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm sm:text-base text-slate-400 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* Leírás */}
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed border-t border-slate-100 pt-4">
              {product.description}
            </p>

            {/* K-Beauty Plusz Infók (Összetevők & Bőrtípus) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <Sparkles className="w-4 h-4 text-slate-500 shrink-0" />
                <span><strong>Fő összetevők:</strong> Hialuronsav, Niacinamid, C-Vitamin</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0" />
                <span><strong>Eredetiség:</strong> 100% eredeti koreai termék Szöulból</span>
              </div>
            </div>

          </div>

          {/* VÁSÁRLÁSI SÁV: Mennyiség + Kosárba gomb */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            
            <div className="flex items-center gap-4">
              
              {/* Mennyiség választó */}
              <div className="flex items-center bg-slate-100 border border-slate-300/80 rounded-full p-1 shadow-2xs">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition-colors cursor-pointer text-sm"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-slate-800 text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition-colors cursor-pointer text-sm"
                >
                  +
                </button>
              </div>

              {/* Kosárba gomb */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-full bg-linear-to-b from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all duration-300 active:scale-98 cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Kosárba Téve!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-slate-300" />
                    <span>Kosárba Kérem</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}