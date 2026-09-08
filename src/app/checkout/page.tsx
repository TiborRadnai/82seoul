// src/app/checkout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { MapPin, User, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8jbqa5wg',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  // Vendég regisztrációs opció állapota
  const [wantToRegister, setWantToRegister] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '', // Külön mező
    lastName: '',  // Külön mező
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Deutschland',
    password: '',
    confirmPassword: '',
  });

  // Bejelentkezett felhasználó adatainak betöltése a Sanityből
  useEffect(() => {
    async function fetchCustomerData() {
      if (!user?.email) {
        setFetchingData(false);
        return;
      }

      try {
        const customer = await client.fetch(
          `*[_type == "customer" && email == $email][0]`,
          { email: user.email }
        );

        if (customer) {
          let rawStreet = customer.shippingAddress?.street || '';
          
          // Német szabványos utca formátum (pl. "5 Am Schwedenkreuz" -> "Am Schwedenkreuz 5")
          const streetMatch = rawStreet.match(/^(\d+[a-zA-Z]?)\s+(.+)$/);
          let formattedStreet = rawStreet;
          if (streetMatch) {
            const houseNumber = streetMatch[1];
            const streetName = streetMatch[2];
            formattedStreet = `${streetName} ${houseNumber}`;
          }

          setFormData({
            firstName: customer.firstName || '',
            lastName: customer.lastName || '',
            email: customer.email || user.email,
            phone: customer.phone || '',
            street: formattedStreet,
            city: customer.shippingAddress?.city || '',
            postalCode: customer.shippingAddress?.postalCode || '',
            country: customer.shippingAddress?.country || 'Deutschland',
            password: '',
            confirmPassword: '',
          });
        } else {
          setFormData((prev) => ({ ...prev, email: user.email }));
        }
      } catch (err) {
        console.error('Hiba a vásárlói adatok betöltésekor:', err);
      } finally {
        setFetchingData(false);
      }
    }

    fetchCustomerData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const freeShippingThreshold = 50;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 4.90;
  const grandTotal = subtotal + shippingCost;

  const handleSubmitCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    // Jelszó egyezés ellenőrzése vendég regisztrációnál
    if (!user && wantToRegister) {
      if (formData.password !== formData.confirmPassword) {
        alert('Die Passwörter stimmen nicht überein.');
        return;
      }
      if (formData.password.length < 6) {
        alert('Das Passwort muss mindestens 6 Zeichen lang sein.');
        return;
      }
    }

    setLoading(true);

    try {
      const itemsToSend = cart.map((item) => ({
        name: `${item.title} (${item.size})`,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      if (shippingCost > 0) {
        itemsToSend.push({
          name: 'Versandkosten (Standard)',
          price: shippingCost,
          quantity: 1,
          image: '',
        });
      }

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsToSend,
          customerEmail: formData.email,
          userId: user?.userId || 'guest',
          shippingDetails: formData, // Tartalmazza a firstName-t és lastName-t is külön!
          registerNewAccount: !user && wantToRegister,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Hiba történt a fizetés indításakor.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Checkout hiba:', err);
      alert('Nem sikerült csatlakozni a fizetési szerverhez.');
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-5 flex items-center justify-center bg-[#f7f3ef] text-slate-900">
        <p className="animate-pulse tracking-[0.2em] uppercase text-xs font-semibold">Lade Kundendaten...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 bg-[#f7f3ef] text-slate-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* BAL OLDAL: ŰRLAP */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-stone-200/80 shadow-xl space-y-8">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-rose-700 font-bold block mb-1">
              82Seoul Checkout
            </span>
            <h1 className="text-2xl font-extrabold tracking-wide uppercase text-slate-950">
              Liefer- und Rechnungsadresse
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Bitte überprüfen Sie Ihre Daten für den Versand.
            </p>
          </div>

          <form onSubmit={handleSubmitCheckout} className="space-y-6">
            
            {/* KAPCSOLAT ÉS NÉV */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                <User className="w-4 h-4 text-rose-700" /> Kontaktdaten
              </h3>
              
              {/* Külön Keresztnév és Vezetéknév */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Vorname (Keresztnév)</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Tibor"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Nachname (Vezetéknév)</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Radnai"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">E-Mail-Adresse</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="max@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Telefonnummer (für Paketdienst)</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+49 151 23456789"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* SZÁLLÍTÁSI CÍM */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2 border-b border-stone-100 pb-2">
                <MapPin className="w-4 h-4 text-rose-700" /> Lieferadresse
              </h3>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">Straße und Hausnummer</label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Am Schwedenkreuz 5"
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Postleitzahl (PLZ)</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="87534"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Stadt</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Steibis"
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">Land</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                >
                  <option value="Deutschland">Deutschland</option>
                  <option value="Österreich">Österreich</option>
                </select>
              </div>
            </div>

            {/* VENDÉG REGISZTRÁCIÓS OPCIÓ */}
            {!user && (
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="registerToggle"
                    checked={wantToRegister}
                    onChange={(e) => setWantToRegister(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-stone-300 text-slate-950 focus:ring-slate-950 cursor-pointer"
                  />
                  <label htmlFor="registerToggle" className="text-xs text-stone-700 cursor-pointer">
                    <span className="font-bold text-slate-950 block mb-0.5">Ein Kundenkonto erstellen</span>
                    Speichern Sie Ihre Adresse für zukünftige Bestellungen und exklusive 82Seoul Vorteile.
                  </label>
                </div>

                {wantToRegister && (
                  <div className="space-y-4 pt-2 animate-fadeIn">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">Passwort für Ihr neues Konto</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Mind. 6 Zeichen"
                          autoComplete="new-password"
                          required={wantToRegister}
                          className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors pr-16"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-[11px] font-medium cursor-pointer"
                        >
                          {showPassword ? 'Verbergen' : 'Anzeigen'}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">Passwort bestätigen</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Passwort wiederholen"
                        autoComplete="new-password"
                        required={wantToRegister}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FIZETÉSI GOMB */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Wird weitergeleitet...' : 'Weiter zur sicheren Zahlung'}</span>
              <ArrowRight className="w-4 h-4 text-rose-400" />
            </button>
          </form>
        </div>

        {/* JOBB OLDAL: ÖSSZESÍTŐ */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
              <ShoppingBag className="w-5 h-5 text-rose-700" />
              <h2 className="text-sm font-bold tracking-widest uppercase text-slate-950">
                Bestellübersicht ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </h2>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center gap-4 py-2 border-b border-stone-100/60">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-contain bg-stone-50 rounded-lg p-1 border border-stone-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                    <p className="text-[11px] text-stone-500 font-mono">Größe: {item.size} | Menge: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-900">€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Zwischensumme</span>
                <span className="font-mono font-medium text-slate-900">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Versand (Standard)</span>
                <span className="font-mono font-medium text-slate-900">
                  {shippingCost === 0 ? 'Kostenfrei' : `€${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-950 pt-3 border-t border-stone-200">
                <span>Gesamtsumme</span>
                <span className="font-mono text-base text-rose-800">€{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#eee8e2]/60 border border-stone-200/80 flex items-start gap-3 text-[11px] text-stone-700">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <p>
                Sichere SSL-Verschlüsselung. Ihre Daten werden vertraulich behandelt und direkt an Stripe zur Zahlungsabwicklung übergeben.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}