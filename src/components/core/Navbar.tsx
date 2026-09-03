'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../../context/CartContext'; // <--- 1. Importáljuk a kosár contextet

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart(); // <--- 2. Lekérjük a darabszámot és a nyitó függvényt
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 py-3 md:py-4 shadow-2xl'
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-5 md:px-12 flex items-center justify-between">
          
          {/* LOGÓ */}
          <Link href="/" className="flex items-center gap-3 group z-50">
            <span className="text-lg md:text-2xl font-bold tracking-widest uppercase text-white">
              82<span className="font-light text-slate-300">.SEOUL</span>
            </span>
          </Link>

          {/* ASZTALI MENÜ ÉS KOSÁR */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-10 text-xs font-semibold tracking-widest uppercase text-slate-300">
              <Link href="/kbeauty" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
                K-Beauty
              </Link>
              <Link href="/kpop" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
                K-Pop
              </Link>
              <Link href="/kdrama" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
                K-Movies
              </Link>
              <Link href="/kfood" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
                K-Food
              </Link>
              <Link href="/kbeauty" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
                Webshop
              </Link>
            </div>

            {/* Kosár Ikon Gomb (Asztali) */}
            <button
              onClick={() => setIsCartOpen(true)} // <--- 3. Kattintásra megnyitja a fiókot
              className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Warenkorb"
            >
              <ShoppingBag className="w-4 h-4 text-rose-300" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* MOBIL JOBB OLDALI GOMBOK (Kosár + Hamburger) */}
          <div className="flex items-center gap-3 md:hidden z-50">
            <button
              onClick={() => setIsCartOpen(true)} // <--- 4. Mobil verzió is nyitja
              className="relative p-2 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer"
              aria-label="Warenkorb"
            >
              <ShoppingBag className="w-4 h-4 text-rose-300" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 focus:outline-none"
              aria-label="Menü"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </nav>

      {/* MOBIL MENÜ OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/85 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center space-y-8 animate-fadeIn px-6">
          <Link href="/kbeauty" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            K-Beauty
          </Link>
          <Link href="/kpop" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            K-Pop
          </Link>
          <Link href="/kdrama" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            K-Movies
          </Link>
          <Link href="/kfood" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            K-Food
          </Link>
          <Link href="/kbeauty" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            Webshop
          </Link>
        </div>
      )}
    </>
  );
}