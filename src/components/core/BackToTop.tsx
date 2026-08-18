'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          // Nincs háttérszín változás hover-kor, csak a keret élénkül és a neon fény (shadow) erősödik be
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-transparent border border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.15)] hover:border-blue-400 hover:text-blue-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all duration-300 group"
          aria-label="Vissza a tetejére"
        >
          <svg 
            // Még egy picivel nagyobb méret (w-7 h-7)
            className="w-7 h-7 transition-transform duration-300 group-hover:-translate-y-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}