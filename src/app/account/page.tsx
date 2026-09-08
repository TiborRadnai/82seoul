// app/account/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { client } from '../../../sanity/lib/client';
import { getCustomerByUserIdQuery } from '../../../sanity/queries';
import Link from 'next/link';
import { Package, MapPin, User, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function AccountPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [customerData, setCustomerData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
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

    async function fetchCustomerDataAndOrders() {
      if (user?.userId || user?.email) {
        try {
          // 1. Ügyfél profil lekérdezése
          if (user.userId) {
            const customer = await client.fetch(getCustomerByUserIdQuery, { userId: user.userId });
            setCustomerData(customer);
            if (customer) {
              setFirstName(customer.firstName || '');
              setLastName(customer.lastName || '');
              setPhone(customer.phone || '');
              setStreet(customer.shippingAddress?.street || '');
              setCity(customer.shippingAddress?.city || '');
              setPostalCode(customer.shippingAddress?.postalCode || '');
              setCountry(customer.shippingAddress?.country || 'Deutschland');
            }
          }

          // 2. Rendelések lekérdezése (legújabb legfelül) - Mindkét mezőnév támogatásával a hibátlan megjelenítésért
          const fetchedOrders = await client.fetch(
            `*[_type == "order" && (userId == $userId || customerEmail == $email)] | order(_createdAt desc){
              _id,
              _createdAt,
              stripeSessionId,
              totalAmount,
              amountTotal,
              currency,
              paymentStatus,
              invoiceId,
              invoiceUrl,
              items,
              shippingDetails
            }`,
            { userId: user.userId || '', email: user.email || '' }
          );
          setOrders(fetchedOrders);

        } catch (err) {
          console.error('Hiba a felhasználói adatok vagy rendelések lekérdezésekor:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    if (user) {
      fetchCustomerDataAndOrders();
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

      const res = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Hiba történt a mentés során.');
      }

      setCustomerData((prev: any) => ({
        ...prev,
        ...updatedFields,
      }));

      setIsEditing(false);
      setSuccessMessage('Ihre Daten wurden erfolgreich aktualisiert!');
    } catch (err: any) {
      console.error('Mentési hiba:', err);
      setError(err.message || 'Nem sikerült menteni a módosításokat.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Möchten Sie Ihr Konto wirklich archivieren?')) {
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
          phone: '[GELÖSCHT]',
          shippingAddress: {
            street: '[GELÖSCHT]',
            city: '[GELÖSCHT]',
            postalCode: '[GELÖSCHT]',
            country: '[GELÖSCHT]',
          },
        })
        .commit();

      await logout();
    } catch (err: any) {
      console.error('Fiók archiválási hiba:', err);
      setError('Fehler beim Archivieren des Kontos.');
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-36 pb-20 px-5 flex items-center justify-center bg-[#f7f3ef] text-slate-900">
        <p className="animate-pulse tracking-[0.25em] uppercase text-xs font-semibold">Profil wird geladen...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 bg-[#f7f3ef] text-slate-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
            {successMessage}
          </div>
        )}

        {/* FEJLÉC KÁRTYA */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200/80 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-rose-700 font-bold mb-1 block">
              82Seoul Kundenportal
            </span>
            <h1 className="text-2xl font-extrabold tracking-wide uppercase text-slate-950">
              Mein Konto
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Willkommen zurück, <span className="text-slate-950 font-bold">{customerData?.firstName || 'Kunde'}</span>!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold tracking-widest uppercase transition-all cursor-pointer shadow-md"
            >
              {isEditing ? 'Abbrechen' : 'Daten bearbeiten'}
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
            >
              Abmelden
            </button>
            <button
              onClick={handleDeleteAccount}
              className="px-4 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer border border-rose-200"
            >
              Konto löschen
            </button>
          </div>
        </div>

        {/* SZERKESZTÉSI ŰRLAP VAGY PROFIL KÁRTYÁK */}
        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200/80 shadow-xl space-y-6">
            <h2 className="text-sm font-bold tracking-widest uppercase text-slate-950 border-b border-stone-100 pb-3">
              Profilinformationen bearbeiten
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">Vorname (Keresztnév)</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">Nachname (Vezetéknév)</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1">Telefonnummer</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
              />
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-950">Lieferadresse</h3>
              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">Straße und Hausnummer</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Postleitzahl (PLZ)</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">Stadt</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-stone-600 mb-1">Land</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                >
                  <option value="Deutschland">Deutschland</option>
                  <option value="Österreich">Österreich</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs tracking-widest uppercase transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              {saving ? 'Wird gespeichert...' : 'Änderungen speichern'}
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* SZEMÉLYES ADATOK KÁRTYA */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-xl space-y-5">
              <h2 className="text-xs font-bold tracking-widest uppercase text-slate-950 border-b border-stone-100 pb-3">
                Persönliche Daten
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Vollständiger Name</span>
                  <span className="font-bold text-slate-950 text-sm">{customerData?.firstName} {customerData?.lastName}</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-rose-700 font-bold mb-0.5">Koreanischer Name (Hangeul)</span>
                    <span className="text-2xl font-extrabold text-slate-950">{customerData?.koreanName || 'N/A'}</span>
                  </div>
                  <span className="text-2xl">🇰🇷</span>
                </div>

                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">E-Mail-Adresse</span>
                  <span className="text-slate-800 font-medium">{customerData?.email || user?.email}</span>
                </div>

                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Telefonnummer</span>
                  <span className="text-slate-800 font-medium">{customerData?.phone || 'Nicht angegeben'}</span>
                </div>
              </div>
            </div>

            {/* SZÁLLÍTÁSI CÍM KÁRTYA */}
            <div className="bg-white p-8 rounded-3xl border border-stone-200/80 shadow-xl space-y-5">
              <h2 className="text-xs font-bold tracking-widest uppercase text-slate-950 border-b border-stone-100 pb-3">
                Standard-Lieferadresse
              </h2>

              {customerData?.shippingAddress ? (
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Straße und Hausnummer</span>
                    <span className="font-bold text-slate-950 text-sm">{customerData.shippingAddress.street}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Postleitzahl</span>
                      <span className="font-bold text-slate-950 text-sm">{customerData.shippingAddress.postalCode}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Stadt</span>
                      <span className="font-bold text-slate-950 text-sm">{customerData.shippingAddress.city}</span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-stone-400 mb-0.5">Land</span>
                    <span className="font-bold text-slate-950 text-sm">{customerData.shippingAddress.country}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic py-8 text-center">Keine Lieferadresse gespeichert.</p>
              )}
            </div>
          </div>
        )}

        {/* KORÁBBI RENDELÉSEK SZEKCIÓ */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-stone-200/80 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <Package className="w-5 h-5 text-rose-700" />
            <h2 className="text-sm font-bold tracking-widest uppercase text-slate-950">
              Meine Bestellungen ({orders.length})
            </h2>
          </div>

          {orders.length === 0 ? (
            <p className="text-xs text-stone-500 py-6 text-center font-medium">
              Sie haben noch keine Bestellungen aufgegeben. Sobald Sie einkaufen, sehen Sie hier Ihre Bestellhistorie!
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                // Biztosra megyünk mindkét mezőnévvel (amountTotal vagy totalAmount)
                const finalAmount = order.amountTotal ?? order.totalAmount ?? 0;

                return (
                  <div key={order._id} className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-4 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/60 pb-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Bestell-ID</span>
                        <span className="font-mono font-bold text-slate-950">{order.orderId || order._id}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Datum</span>
                        <span className="font-mono text-stone-700">
                          {new Date(order._createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Gesamtbetrag</span>
                        <span className="font-mono font-bold text-rose-800 text-sm">€{finalAmount.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Artikel</span>
                      <div className="divide-y divide-stone-200/40">
                        {order.items?.map((item: any, idx: number) => (
                          <div key={idx} className="py-2 flex justify-between items-center">
                            <span className="text-stone-800 font-medium">{item.name} (Anzahl: {item.quantity})</span>
                            <span className="font-mono text-stone-600">€{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.shippingDetails && (
                      <div className="pt-2 border-t border-stone-200/60 flex items-start gap-2 text-stone-500 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-rose-700 shrink-0 mt-0.5" />
                        <p>
                          Lieferadresse: {order.shippingDetails.street}, {order.shippingDetails.postalCode} {order.shippingDetails.city}, {order.shippingDetails.country}
                        </p>
                      </div>
                    )}

                    {/* Számla letöltése gomb szép Tailwind dizájnnal és ikonnal */}
                    {order.invoiceUrl && (
                      <div className="pt-3 border-t border-stone-200/60 flex justify-end">
                        <a
                          href={order.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-[11px] font-bold tracking-widest uppercase transition-all shadow-md cursor-pointer"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          <span>Rechnung herunterladen (PDF)</span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs font-bold text-stone-600 hover:text-slate-950 tracking-wider uppercase transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>

      </div>
    </div>
  );
}