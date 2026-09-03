'use client';

import React from 'react';
import { useCart } from '../../context/CartContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 50;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  return (
    <div className="fixed inset-0 z-100 overflow-hidden"> {/* <--- Itt emeltük z-100-ra */}
      {/* Sötétített háttér / backdrop blur */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#f7f3ef] text-slate-900 shadow-2xl flex flex-col border-l border-stone-300/60 animate-slideLeft">
          
          {/* FEJLÉC */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-stone-200 bg-white/9onta">
...
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-rose-700" />
              <h2 className="text-base font-bold tracking-widest uppercase text-slate-950">
                Warenkorb ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full bg-stone-200/80 hover:bg-slate-950 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Schließen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* INGYENES SZÁLLÍTÁSI SÁV */}
          <div className="bg-[#eee8e2] px-6 py-3 border-b border-stone-200/80">
            <div className="flex justify-between text-xs text-stone-700 mb-1.5 font-medium">
              {remainingForFreeShipping > 0 ? (
                <span>Noch <strong className="font-mono text-slate-950">€{remainingForFreeShipping.toFixed(2)}</strong> bis zum kostenfreien Versand!</span>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1">✨ Du hast kostenfreien Versand erreicht!</span>
              )}
            </div>
            <div className="w-full h-1.5 bg-stone-300 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-700 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* TERMÉKEK LISTÁJA */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-light">Dein Warenkorb ist derzeit leer.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Produkte entdecken
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs items-center"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-16 h-16 object-contain p-1 bg-stone-50 rounded-xl border border-stone-100 shrink-0" 
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-950 truncate">{item.title}</h4>
                    <p className="text-[11px] text-stone-500 font-mono mt-0.5">Größe: {item.size}</p>
                    <p className="text-xs font-mono font-medium text-slate-900 mt-1">€{item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-col items-end justify-between h-full gap-2">
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-stone-400 hover:text-rose-700 transition-colors cursor-pointer p-1"
                      title="Entfernen"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded-l-lg transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-semibold text-slate-950">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded-r-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* LÁBLÉC / ÖSSZEG & PÉNZTÁR */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Zwischensumme</span>
                  <span className="font-mono font-medium text-slate-900">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Versand</span>
                  <span className="font-mono font-medium text-slate-900">
                    {remainingForFreeShipping === 0 ? 'Kostenfrei' : '€4.90'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-950 pt-2 border-t border-stone-200">
                  <span>Gesamtsumme</span>
                  <span className="font-mono text-base text-rose-800">
                    €{(subtotal + (remainingForFreeShipping === 0 ? 0 : 4.90)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('A pénztár (Stripe checkout) a következő fázisban érkezik! 🎉');
                }}
                className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg transition-all duration-300 cursor-pointer active:scale-98"
              >
                <span>Zur Kasse gehen</span>
                <ArrowRight className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}