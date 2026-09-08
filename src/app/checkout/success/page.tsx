// app/checkout/success/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../../../context/CartContext';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    // Ha már lefutott egyszer, vagy nincs session ID, ne fusson le újra!
    let isMounted = true;

    async function verifyPayment() {
      if (!sessionId) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const data = await res.json();

        if (res.ok && data.success && isMounted) {
          setVerified(true);
          clearCart(); // Kiürítjük a kosarat sikeres vásárlás után!
        }
      } catch (err) {
        console.error('Hiba a fizetés érvényesítésekor:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    verifyPayment();

    return () => {
      isMounted = false;
    };
  }, [sessionId]); // <--- ITT TÖRLÖTTÜK A clearCart-ot, így csak egyszer fut le!

  if (loading) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-5 flex items-center justify-center bg-[#0d0d12] text-neutral-300">
        <p className="animate-pulse tracking-[0.25em] uppercase text-xs font-semibold">Rendelés feldolgozása...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 pb-20 px-5 md:px-12 bg-[#0d0d12] text-neutral-100 relative overflow-hidden flex items-center justify-center">
      
      <div className="absolute top-20 right-10 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#17171d]/95 backdrop-blur-3xl border border-white/15 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center relative z-10 space-y-6">
        
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-emerald-400 font-bold mb-1.5 block">
            Sikeres tranzakció
          </span>
          <h1 className="text-2xl font-extrabold tracking-wider uppercase text-white">
            Köszönjük a rendelést!
          </h1>
          <p className="text-xs text-neutral-300 tracking-wide mt-2 font-medium">
            A fizetés sikeresen megtörtént. A rendelésed feldolgozés alatt áll, és hamarosan küldjük a részleteket e-mailben.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-3">
          <Link
            href="/"
            className="w-full py-4 rounded-2xl bg-white text-black font-extrabold tracking-widest uppercase text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Vissza a főoldalra</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0d12]" />}>
      <SuccessContent />
    </Suspense>
  );
}