"use client";

import { useState, useEffect } from "react";
import { X, Star, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface KBeautyDetailModalProps {
  product: any | null;
  onClose: () => void;
}

export default function KBeautyDetailModal({ product, onClose }: KBeautyDetailModalProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Amikor a termék megváltozik, reseteljük a variációt
  useEffect(() => {
    if (product) {
      setSelectedVariantIndex(0);
    }
  }, [product]);

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

  const title = product.title || product.name;
  const description = product.description || product.tagline;
  const badge = product.badge || product.tag;
  const rating = product.rating || 5.0;
  const category = product.category || "K-Beauty";
  const image = product.image;
  const slug = product.slug || product._id;

  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIndex] || null;
  const rawPrice = currentVariant ? (currentVariant.onSale ? currentVariant.salePrice : currentVariant.price) : product.price;
  const rawOriginal = currentVariant?.onSale ? product.price : product.originalPrice;

  const cleanPrice = (price: any) => {
    if (!price) return 0;
    return typeof price === 'string' ? parseFloat(price.replace(/[^0-9.,]/g, '').replace(',', '.')) : price;
  };

  const cleanVariantPrice = (price: any) => {
    if (!price) return '';
    const cleanNum = cleanPrice(price);
    return `${cleanNum.toFixed(2).replace('.', ',')} €`;
  };

  const formatPrice = (price: any, fallback = 'Preis auf Anfrage') => {
    if (!price) return fallback;
    const cleanNum = cleanPrice(price);
    return `${cleanNum.toFixed(2).replace('.', ',')} €`;
  };

  const displayPrice = formatPrice(rawPrice);
  const displayOriginal = formatPrice(rawOriginal, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div 
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-lg transition-opacity duration-300" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-white border border-slate-200/90 rounded-3xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.4)] overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          aria-label="Schließen"
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-white/95 hover:bg-slate-100 backdrop-blur-md border border-slate-200 text-slate-700 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95"
        >
          <X className="w-5 h-5 stroke-2" />
        </button>

        {/* Bal oldal: Kép */}
        <div className="w-full md:w-1/2 bg-linear-to-b from-slate-50 via-neutral-100/80 to-slate-100/50 p-8 sm:p-12 flex items-center justify-center relative min-h-70 md:min-h-120">
          <div className="absolute w-48 h-48 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
          {badge && (
            <span className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-linear-to-r from-slate-100 to-slate-200/90 text-slate-800 border border-slate-300/80 text-[10px] font-extrabold uppercase tracking-widest shadow-2xs z-20">
              {badge}
            </span>
          )}
          <div className="relative z-10 flex flex-col items-center">
            <img
              src={image}
              alt={title}
              className="max-h-56 sm:max-h-80 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600";
              }}
            />
            <div className="w-36 h-4 bg-slate-400/20 rounded-full blur-md mt-4" />
          </div>
        </div>

        {/* Jobb oldal: Információk és Navigáció a termékoldalra */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 pt-12 md:pt-10 flex flex-col justify-between overflow-y-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 pr-8 md:pr-0">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                {product.brand || '82.SEOUL'} • {category}
              </span>
              <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold bg-amber-50/80 border border-amber-200/60 px-3 py-1 rounded-full shadow-2xs shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{rating}</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {title}
            </h2>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {displayPrice}
              </span>
              {displayOriginal && (
                <span className="text-sm sm:text-base text-slate-400 line-through">
                  {displayOriginal}
                </span>
              )}
            </div>

            {/* Kiszerelés választó (csak előnézetként) */}
            {variants.length > 1 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Verfügbare Größen:</span>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        selectedVariantIndex === index
                          ? "bg-slate-900 text-white border-slate-900 shadow-md"
                          : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {v.size || `Option ${index + 1}`} ({cleanVariantPrice(v.salePrice || v.price)})
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed border-t border-slate-100 pt-4">
              {description}
            </p>
          </div>

          {/* AKCIÓS SÁV: Tovább a teljes termékoldalra */}
          <div className="pt-6 border-t border-slate-100">
            <Link
              href={`/kbeauty/${slug}`}
              onClick={onClose}
              className="w-full py-4 px-6 rounded-full bg-linear-to-b from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-98 cursor-pointer group"
            >
              <span>Zum Detailprodukt & Varianten</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}