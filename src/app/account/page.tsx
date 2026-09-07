// app/account/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { client } from '../../../sanity/lib/client';
import { getCustomerByUserIdQuery } from '../../../sanity/queries';
import Link from 'next/link';

export default function AccountPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [customerData, setCustomerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Szerkesztési állapotok
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
      return;
    }

    async function fetchCustomerProfile() {
      if (user?.userId) {
        try {
          const data = await client.fetch(getCustomerByUserIdQuery, { userId: user.userId });
          setCustomerData(data);
          if (data) {
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setPhone(data.phone || '');
            setStreet(data.shippingAddress?.street || '');
            setCity(data.shippingAddress?.city || '');
            setPostalCode(data.shippingAddress?.postalCode || '');
            setCountry(data.shippingAddress?.country || 'Németország');
          }
        } catch (err) {
          console.error('Hiba a felhasználói adatok lekérdezésekor:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    if (user) {
      fetchCustomerProfile();
    }
  }, [user, authLoading, router]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Hiba kijelentkezéskor:', err);
    }
  };

const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setSaving(true);

    try {
      if (!user?.userId) {
        setError('Nincs bejelentkezett felhasználó azonosító.');
        setSaving(false);
        return;
      }

      const updatedFields = {
        userId: user.userId,
        firstName,
        lastName,
        phone,
        shippingAddress: {
          street,
          city,
          postalCode,
          country,
        },
      };

      // Meghívjuk a saját biztonságos API route-unkat
      const res = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Hiba történt a mentés során.');
      }

      // Helyi state frissítése
      setCustomerData((prev: any) => ({
        ...prev,
        ...updatedFields,
      }));

      setIsEditing(false);
      setSuccessMessage('Az adataid sikeresen frissültek!');
    } catch (err: any) {
      console.error('Mentési hiba:', err);
      setError(err.message || 'Nem sikerült menteni a módosításokat.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Biztosan archiválni szeretnéd a fiókodat?')) {
      return;
    }

    setError('');
    setLoading(true);

    try {
      if (!customerData?._id) return;

      await client
        .patch(customerData._id)
        .set({
          status: 'archived',
          phone: '[TÖRÖLVE]',
          shippingAddress: {
            street: '[TÖRÖLVE]',
            city: '[TÖRÖLVE]',
            postalCode: '[TÖRÖLVE]',
            country: '[TÖRÖLVE]',
          },
        })
        .commit();

      await logout();
    } catch (err: any) {
      console.error('Fiók archiválási hiba:', err);
      setError('Nem sikerült archiválni a fiókot. Kérlek próbáld újra később.');
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-5 flex items-center justify-center bg-[#0d0d12] text-neutral-300">
        <p className="animate-pulse tracking-[0.25em] uppercase text-xs font-semibold">Profil betöltése...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 pb-20 px-5 md:px-12 bg-[#0d0d12] text-neutral-100 relative overflow-hidden">
      
      <div className="absolute top-20 right-10 w-137.5 h-137.5 bg-rose-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs text-center font-semibold">
            {successMessage}
          </div>
        )}

        {/* Felső header rész */}
        <div className="bg-[#17171d]/95 backdrop-blur-3xl border border-white/15 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-rose-400 font-bold mb-1.5 block">
              Ügyfélportál
            </span>
            <h1 className="text-3xl font-extrabold tracking-wider uppercase text-white">
              Fiókom
            </h1>
            <p className="text-xs text-neutral-300 tracking-wide mt-1 font-medium">
              Üdv újra, <span className="text-white font-bold">{customerData?.firstName || 'Felhasználó'}</span>!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-5 py-3 rounded-2xl bg-white text-black hover:bg-neutral-200 text-xs font-extrabold tracking-widest uppercase transition-all cursor-pointer shadow-md"
            >
              {isEditing ? 'Mégsem' : 'Adatok szerkesztése'}
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-3 rounded-2xl bg-[#202028] border border-white/20 text-neutral-200 hover:bg-[#282832] text-xs font-bold tracking-widest uppercase transition-all cursor-pointer shadow-md"
            >
              Kijelentkezés
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-5 py-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 hover:bg-rose-500/30 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer shadow-md"
            >
              Fiók törlése
            </button>
          </div>
        </div>

        {/* Ha szerkesztési módban vagyunk, egy űrlap jelenik meg */}
        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="bg-[#17171d]/95 backdrop-blur-3xl border border-white/15 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] mb-8 space-y-6">
            <h2 className="text-lg font-bold tracking-wider uppercase text-white border-b border-white/15 pb-4">
              Adatok Módosítása
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-300 mb-1.5">Vezetéknév</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#202028] border border-white/20 text-white text-sm focus:outline-none focus:border-rose-400"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-300 mb-1.5">Keresztnév</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#202028] border border-white/20 text-white text-sm focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-300 mb-1.5">Telefonszám</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#202028] border border-white/20 text-white text-sm focus:outline-none focus:border-rose-400"
              />
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-[11px] uppercase tracking-widest text-rose-400 font-bold mb-3">Szállítási cím</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-300 mb-1.5">Utca, Házszám</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#202028] border border-white/20 text-white text-sm focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-300 mb-1.5">Város</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#202028] border border-white/20 text-white text-sm focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-300 mb-1.5">Irányítószám</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#202028] border border-white/20 text-white text-sm focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-300 mb-1.5">Ország</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#202028] border border-white/20 text-white text-sm focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3.5 rounded-2xl bg-white text-black font-extrabold tracking-widest uppercase text-xs hover:bg-neutral-200 transition-all cursor-pointer disabled:opacity-50 shadow-lg"
            >
              {saving ? 'Mentés folyamatban...' : 'Módosítások mentése'}
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Személyes adatok kártya */}
            <div className="bg-[#17171d]/95 backdrop-blur-3xl border border-white/15 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-400 mb-6 border-b border-white/15 pb-3">
                Személyes Adatok
              </h2>

              <div className="space-y-5 text-sm">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Teljes Név</span>
                  <span className="font-bold text-white text-base">{customerData?.lastName} {customerData?.firstName}</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#202028] border border-white/15 flex items-center justify-between shadow-inner">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-rose-400 mb-1">Koreai Neved (Hangeul)</span>
                    <span className="text-3xl font-extrabold tracking-wider text-white">{customerData?.koreanName || 'N/A'}</span>
                  </div>
                  <span className="text-3xl">🇰🇷</span>
                </div>

                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">E-mail Cím</span>
                  <span className="text-neutral-200 font-semibold">{customerData?.email || user?.email}</span>
                </div>

                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Telefonszám</span>
                  <span className="text-neutral-200 font-semibold">{customerData?.phone || 'Nincs megadva'}</span>
                </div>
              </div>
            </div>

            {/* Szállítási cím kártya */}
            <div className="bg-[#17171d]/95 backdrop-blur-3xl border border-white/15 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-400 mb-6 border-b border-white/15 pb-3">
                Alapértelmezett Szállítási Cím
              </h2>

              {customerData?.shippingAddress ? (
                <div className="space-y-5 text-sm">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Utca, Házszám</span>
                    <span className="font-bold text-white text-base">{customerData.shippingAddress.street}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Város</span>
                      <span className="font-bold text-white text-base">{customerData.shippingAddress.city}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Irányítószám</span>
                      <span className="font-bold text-white text-base">{customerData.shippingAddress.postalCode}</span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Ország</span>
                    <span className="font-bold text-white text-base">{customerData.shippingAddress.country}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-neutral-400 italic py-8 text-center font-semibold">Még nincs rögzítve szállítási cím.</p>
              )}
            </div>
          </div>
        )}

        {/* Rendelések szekció */}
        <div className="mt-8 bg-[#17171d]/95 backdrop-blur-3xl border border-white/15 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-400 mb-4 border-b border-white/15 pb-3">
            Korábbi Rendelések
          </h2>
          <p className="text-xs text-neutral-400 py-6 text-center font-semibold">
            Még nincsenek leadott rendeléseid. Mikor elkezded a vásárlást, itt fogod látni az állapotukat!
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 hover:text-white transition-colors font-bold">
            ← Vissza a főoldalra
          </Link>
        </div>

      </div>
    </div>
  );
}