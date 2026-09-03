'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ShoppingBag, ShieldCheck, Truck, RefreshCw, Plus, Minus, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { useCart } from '../../../../../context/CartContext';
interface Variant {
  size: string;
  price: string;
  onSale?: boolean;
  salePrice?: string;
}

interface Product {
  _id: string;
  title: string;
  koreanTitle?: string;
  slug: string;
  image: string;
  gallery?: string[];
  badge?: string;
  tagline?: string;
  description?: string;
  ingredients?: string;
  howToUse?: string;
  variants: Variant[];
  stock?: number;
  category?: string;
  rating?: number;
}

interface KBeautyDetailContentProps {
  product: Product;
}

export default function KBeautyDetailContent({ product }: KBeautyDetailContentProps) {
  const { addToCart } = useCart();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  // Összegyűjtjük az összes képet: a fő kép a 0. indexű, utána jönnek a galéria képek
  const allImages = [product.image, ...(product.gallery || [])].filter(Boolean);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Teljes képernyős Lightbox / Modal állapota
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const currentVariant = product.variants?.[selectedVariantIndex] || product.variants?.[0];

  const rawUnitPrice = parseFloat(
    currentVariant?.onSale && currentVariant?.salePrice 
      ? currentVariant.salePrice 
      : currentVariant?.price || '0'
  );

  const totalPrice = (rawUnitPrice * quantity).toFixed(2);
  const maxStock = product.stock !== undefined ? product.stock : 0;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const newQty = prev + delta;
      if (newQty < 1) return 1;
      if (newQty > maxStock) return maxStock;
      return newQty;
    });
  };

const handleAddToCart = () => {
    // Globális kosárba tétel
    addToCart({
      id: product._id,
      title: product.title,
      image: allImages[0],
      size: currentVariant?.size || 'Standard',
      price: rawUnitPrice,
      quantity: quantity,
    });

    const message = `${quantity}x ${product.title} (${currentVariant?.size}) wurde in den Warenkorb gelegt — €${totalPrice}`;
    
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#f7f3ef] text-slate-900 pt-36 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      
      {/* Sötétítő felső sáv a navigációhoz */}
      <div className="absolute top-0 left-0 right-0 h-44 bg-linear-to-b from-stone-950/45 via-stone-950/20 to-transparent pointer-events-none z-20" />
      <div className="absolute top-1/4 right-1/4 w-150 h-150 bg-rose-200/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Vissza a katalógusba gomb */}
        <div className="mb-8">
          <Link
            href="/kbeauty"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-stone-600 hover:text-slate-950 transition-colors group cursor-pointer"
          >
            <span className="w-6 h-6 rounded-full bg-stone-200/80 group-hover:bg-slate-950 group-hover:text-white flex items-center justify-center transition-colors">
              ←
            </span>
            <span>Zurück zur Kollektion</span>
          </Link>
        </div>
        
        {/* Fő Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* BAL OLDAL: Fő kép + Galéria sáv */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Aktuális Nagy Kép */}
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full aspect-square flex items-center justify-center bg-transparent overflow-hidden border border-stone-200/60 rounded-2xl shadow-xs cursor-zoom-in group"
            >
              {product.badge && (
                <span className="absolute top-6 left-6 z-10 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-rose-200 text-rose-800 text-[10px] font-bold tracking-widest uppercase shadow-xs">
                  {product.badge}
                </span>
              )}
              
              <button className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-stone-200 flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                <Maximize2 className="w-4 h-4" />
              </button>

              <img
                src={allImages[activeImageIndex]}
                alt={product.title}
                className="w-full h-full object-contain p-10 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Lapozó nyilak a fő képen is, ha van több kép */}
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-stone-200 flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs hover:bg-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-stone-200 flex items-center justify-center text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs hover:bg-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Kis képekből álló galéria sáv (Thumbnails) */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer bg-white/50 ${
                      activeImageIndex === idx 
                        ? 'border-rose-700 ring-2 ring-rose-700/20 shadow-xs scale-98' 
                        : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`${product.title} ${idx}`} className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* JOBB OLDAL: Adatok, Variációk, Mennyiség és Kosárba gomb */}
          <div className="lg:col-span-5 space-y-8 sticky top-32">
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-bold tracking-widest text-rose-700 uppercase">
                  {product.category || 'K-Beauty Care'}
                </span>
                {product.koreanTitle && (
                  <span className="text-xs text-stone-400 font-medium">
                    ({product.koreanTitle})
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-slate-950 mb-3">
                {product.title}
              </h1>

              {product.tagline && (
                <p className="text-stone-600 text-sm md:text-base font-light leading-relaxed">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Egységár és Készlet */}
            <div className="flex items-baseline justify-between py-4 border-y border-stone-300/60">
              <div>
                <span className="text-3xl font-mono font-medium text-slate-950">
                  €{rawUnitPrice.toFixed(2)}
                </span>
                <span className="text-xs text-stone-500 ml-2">/ Stück</span>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                maxStock > 0 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {maxStock > 0 ? `Auf Lager (${maxStock} Stk.)` : 'Ausverkauft'}
              </span>
            </div>

            {/* Kiszerelések / Változatok */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs font-bold tracking-widest text-slate-700 uppercase block">
                  Größe / Variante wählen:
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, idx) => {
                    const vPrice = variant.onSale && variant.salePrice ? variant.salePrice : variant.price;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-medium tracking-wider transition-all cursor-pointer border ${
                          selectedVariantIndex === idx
                            ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                            : 'bg-white/80 text-slate-700 border-stone-300 hover:border-slate-900'
                        }`}
                      >
                        {variant.size} — €{vPrice}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mennyiség választó */}
            <div className="space-y-3">
              <label className="text-xs font-bold tracking-widest text-slate-700 uppercase block">
                Menge:
              </label>
              <div className="inline-flex items-center bg-white/90 border border-stone-300 rounded-xl p-1 shadow-2xs">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 hover:bg-stone-100 disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-mono text-sm font-semibold text-slate-950">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= maxStock}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 hover:bg-stone-100 disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-[10px] text-stone-400 pl-3 pr-2">
                  (Max. {maxStock})
                </span>
              </div>
            </div>

            {/* Kosárba gomb */}
            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                disabled={maxStock === 0}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl shadow-lg transition-all duration-300 ${
                  maxStock === 0
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
                    : 'bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs tracking-widest uppercase cursor-pointer active:scale-98 shadow-xl hover:shadow-xl'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className={`w-4 h-4 ${maxStock === 0 ? 'text-stone-400' : 'text-rose-400'}`} />
                  <span>{maxStock === 0 ? 'Ausverkauft' : 'In den Warenkorb'}</span>
                </div>
                {maxStock > 0 && (
                  <span className="font-mono text-sm tracking-normal text-rose-300">
                    €{totalPrice}
                  </span>
                )}
              </button>
            </div>

            {/* Garanciák */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-300/60 text-center">
              <div className="flex flex-col items-center space-y-1.5">
                <Truck className="w-4 h-4 text-rose-700" />
                <span className="text-[10px] text-stone-600 font-medium">Kostenfreier Versand ab 50€</span>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-700" />
                <span className="text-[10px] text-stone-600 font-medium">100% Original aus Seoul</span>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <RefreshCw className="w-4 h-4 text-rose-700" />
                <span className="text-[10px] text-stone-600 font-medium">30 Tage Rückgaberecht</span>
              </div>
            </div>

          </div>

        </div>

        {/* Részletes leírás, összetevők és használat */}
        <div className="mt-28 grid grid-cols-1 lg:grid-cols-3 gap-12 pt-16 border-t border-stone-300/60">
          {product.description && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold tracking-widest text-rose-700 uppercase">
                Produktbeschreibung
              </h3>
              <p className="text-stone-600 font-light text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {product.ingredients && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold tracking-widest text-rose-700 uppercase">
                Hauptinhaltsstoffe
              </h3>
              <p className="text-stone-600 font-light text-sm leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          )}

          {product.howToUse && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold tracking-widest text-rose-700 uppercase">
                Anwendung
              </h3>
              <p className="text-stone-600 font-light text-sm leading-relaxed">
                {product.howToUse}
              </p>
            </div>
          )}
        </div>

      </div>

      {/* --- TELJES KÉPERNYŐS LIGHTBOX MODAL (Kattintásra nagyban, háttérhomályosítással) --- */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-fadeIn"
        >
          {/* Bezáró gomb */}
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 z-55 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Bal nyíl */}
          {allImages.length > 1 && (
            <button 
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-55 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Jobb nyíl */}
          {allImages.length > 1 && (
            <button 
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-55 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Nagy kép konténer */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center"
          >
            <img 
              src={allImages[activeImageIndex]} 
              alt="Fullscreen preview" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
            
            {/* Képszámláló alul */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/70 font-mono text-xs tracking-widest">
              {activeImageIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Elegáns, webshop-stílusú Toast Értesítés */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-slate-950 text-white px-6 py-4 rounded-2xl shadow-2xl border border-stone-800 flex items-center gap-4 animate-bounce-once">
          <div className="w-8 h-8 rounded-full bg-rose-900/40 border border-rose-700/50 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-rose-400 font-bold">Warenkorb aktualisiert</p>
            <p className="text-xs font-light text-stone-200 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

    </section>
  );
}