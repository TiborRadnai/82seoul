// components/core/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User as UserIcon } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
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

          {/* ASZTALI MENÜ ÉS FIÓK IKON */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-10 text-xs font-semibold tracking-widest uppercase text-slate-300">
              
              {/* Aktív kulturális menüpontok */}
              <Link href="/kpop" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
                K-Pop
              </Link>
              <Link href="/kdrama" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
                K-Movies
              </Link>
              <Link href="/kfood" className="hover:text-white transition-colors duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all">
                K-Food
              </Link>

              {/* INAKTÍV / HAMAROSAN ÉRKEZŐ: Webshop */}
              <div className="relative group/tooltip cursor-not-allowed">
                <span className="text-slate-500 hover:text-slate-500 select-none py-1 flex items-center gap-1">
                  Webshop <span className="text-[9px] text-amber-400 font-normal">SOON</span>
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-black/90 border border-white/10 text-white text-[10px] tracking-wider uppercase rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl z-50">
                  Demnächst verfügbar
                </div>
              </div>

              {/* INAKTÍV / HAMAROSAN ÉRKEZŐ: K-Travel */}
              <div className="relative group/tooltip cursor-not-allowed">
                <span className="text-slate-500 hover:text-slate-500 select-none py-1 flex items-center gap-1">
                  K-Travel <span className="text-[9px] text-amber-400 font-normal">SOON</span>
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-black/90 border border-white/10 text-white text-[10px] tracking-wider uppercase rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl z-50">
                  Demnächst verfügbar
                </div>
              </div>

            </div>

            {/* Fiók Ikon (Asztali) */}
            <div className="flex items-center">
              <Link
                href={user ? "/account" : "/auth"}
                className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Fiók"
              >
                <UserIcon className="w-4 h-4 text-slate-300" />
                {user && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
                )}
              </Link>
            </div>
          </div>

          {/* MOBIL JOBB OLDALI GOMBOK (User + Hamburger) */}
          <div className="flex items-center gap-2 md:hidden z-50">
            <Link
              href={user ? "/account" : "/auth"}
              className="relative p-2 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer"
              aria-label="Fiók"
            >
              <UserIcon className="w-4 h-4 text-slate-300" />
              {user && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-slate-950" />
              )}
            </Link>

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
          <Link href="/kpop" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            K-Pop
          </Link>
          <Link href="/kdrama" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            K-Movies
          </Link>
          <Link href="/kfood" onClick={() => setMobileMenuOpen(false)} className="text-lg font-semibold tracking-[0.25em] uppercase text-slate-200 hover:text-white transition-all">
            K-Food
          </Link>
        </div>
      )}
    </>
  );
}