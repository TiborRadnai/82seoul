'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
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
          
          {/* LOGÓ - Mobilon h-10/12, Asztalin h-20 */}
          <a href="/" className="flex items-center gap-3 group z-50">
            <span className="text-lg md:text-2xl font-bold tracking-widest uppercase text-white">
              82<span className="font-light text-slate-300">.SEOUL</span>
            </span>
          </a>

          {/* ASZTALI MENÜ */}
          <div className="hidden md:flex items-center space-x-10 text-xs font-semibold tracking-widest uppercase text-slate-300">
            {/* Külső horgonyokhoz (ha egy oldalon belül vannak) maradhat #, de a K-pop-ot átirányítjuk */}
            <Link href="/#k-beauty" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
              K-Beauty
            </Link>
            <Link href="/kpop" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
              K-Pop
            </Link>
            <Link href="/kdrama" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
              K-Movies
            </Link>
            <Link href="/#shop" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
              Webshop
            </Link>
          </div>

          {/* MOBIL HAMBURGER GOMB */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 focus:outline-none z-50"
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
      </nav>

      {/* MOBIL MENÜ OVERLAY (Teljes képernyős, csodás blur-üveg felület) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/85 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center space-y-8 animate-fadeIn px-6">
          <Link href="/#k-beauty" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            K-Beauty
          </Link>
          <Link href="/kpop" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            K-Pop
          </Link>
          <Link href="/kdrama" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            K-Movies
          </Link>
          <Link href="/#shop" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            Webshop
          </Link>
        </div>
      )}
    </>
  );
}