// app/auth/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const convertToKorean = (name: string): string => {
  const map: { [key: string]: string } = {
    a: '아', e: '에', i: '이', o: '오', u: '우',
    ba: '바', be: '베', bi: '비', bo: '보', bu: '부',
    da: '다', de: '데', di: '디', do: '도', du: '두',
    fa: '파', fe: '페', fi: '피', fo: '포', fu: '푸',
    ga: '가', ge: '게', gi: '기', go: '고', gu: '구',
    ha: '하', he: '헤', hi: '히', ho: '호', hu: '후',
    ka: '카', ke: '케', ki: '키', ko: '코', ku: '쿠',
    la: '라', le: '레', li: '리', lo: '로', lu: '루',
    ma: '마', me: '메', mi: '미', mo: '모', mu: '무',
    na: '나', ne: '네', ni: '니', no: '노', nu: '누',
    pa: '파', pe: '페', pi: '피', po: '포', pu: '푸',
    ra: '라', re: '레', ri: '리', ro: '로', ru: '루',
    sa: '사', se: '세', si: '시', so: '소', su: 'सु',
    ta: '타', te: '테', ti: '티', to: '토', tu: '투',
    va: '바', ve: '베', vi: '비', vo: '보', vu: '부',
    za: '자', ze: '제', zi: '지', zo: '조', zu: '주',
    p: '프', t: '트', k: '크', n: 'ㄴ', m: 'ㅁ', l: 'ㄹ', s: 'ㅅ', r: 'ㄹ'
  };

  const lower = name.toLowerCase().trim();
  if (map[lower]) return map[lower];

  let result = '';
  for (let i = 0; i < lower.length; i += 2) {
    const chunk = lower.substr(i, 2);
    const single = lower.substr(i, 1);
    if (map[chunk]) {
      result += map[chunk];
    } else if (map[single]) {
      result += map[single];
    } else {
      result += chunk;
    }
  }
  return result || name;
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Deutschland');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        router.push('/');
      } else {
        const koreanName = convertToKorean(firstName);

        await signup({
          email,
          password,
          lastName,
          firstName,
          koreanName,
          phone,
          address: {
            street,
            city,
            postalCode,
            country,
          },
        });

        router.push('/');
      }
    } catch (err: any) {
      console.error("AUTH FEHLER:", err);
      setError(err.message || 'Ein Fehler ist aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 md:px-12 bg-[#f7f3ef] text-slate-900 flex items-center justify-center">
      {/* FELSŐ ÉJKÉK ÁTMENET A NAVIGÁCIÓHOZ */}
      <div className="absolute top-0 left-0 right-0 h-44 bg-linear-to-b from-indigo-950/70 via-indigo-950/20 to-transparent pointer-events-none z-20" />

      <div className="w-full max-w-xl bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-stone-200/85 shadow-xl relative z-35">
        
        <div className="text-center mb-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-rose-700 font-bold mb-2 block">
            82SEOUL BEAUTY CLUB
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide uppercase text-slate-950 mb-2">
            {isLogin ? 'Anmeldung' : 'Konto erstellen'}
          </h1>
          <p className="text-xs tracking-wide text-stone-500 font-medium">
            {isLogin ? 'Willkommen zurück in der Welt von 82.Seoul!' : 'Registrieren Sie sich für Bestellungen und koreanische Erlebnisse.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-stone-600 mb-1.5">
                  Nachname
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 placeholder:text-stone-400"
                  placeholder="Kovács"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-stone-600 mb-1.5">
                  Vorname
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 placeholder:text-stone-400"
                  placeholder="Péter"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase text-stone-600 mb-1.5">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 placeholder:text-stone-400"
              placeholder="beispiel@email.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold tracking-widest uppercase text-stone-600 mb-1.5">
              Passwort
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 pr-12 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 placeholder:text-stone-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-slate-950 transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-[11px] font-bold tracking-widest uppercase text-stone-600 mb-1.5">
                  Telefonnummer (für den Versand)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 placeholder:text-stone-400"
                  placeholder="+49 123 456789"
                />
              </div>

              <div className="pt-4 border-t border-stone-200/85">
                <p className="text-[11px] uppercase tracking-widest text-rose-700 font-bold mb-3">Lieferadresse</p>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-stone-600 mb-1.5">
                      Straße und Hausnummer
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 placeholder:text-stone-400"
                      placeholder="Hauptstraße 12"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold tracking-widest uppercase text-stone-600 mb-1.5">
                        Stadt
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 placeholder:text-stone-400"
                        placeholder="München"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold tracking-widest uppercase text-stone-600 mb-1.5">
                        Postleitzahl (PLZ)
                      </label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900 placeholder:text-stone-400"
                        placeholder="80331"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-widest uppercase text-stone-600 mb-1.5">
                      Land
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                    >
                      <option value="Deutschland">Deutschland</option>
                      <option value="Österreich">Österreich</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold tracking-widest uppercase text-xs transition-all cursor-pointer disabled:opacity-50 mt-6 shadow-md"
          >
            {loading ? 'Wird verarbeitet...' : isLogin ? 'Anmelden' : 'Registrieren & Konto erstellen'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-xs text-stone-600 hover:text-slate-950 transition-colors cursor-pointer tracking-wider font-semibold"
          >
            {isLogin ? 'Noch kein Konto? Hier registrieren!' : 'Bereits ein Konto? Anmelden!'}
          </button>
        </div>

        <div className="mt-6 text-center border-t border-stone-200/85 pt-4">
          <Link href="/" className="text-[10px] uppercase tracking-[0.25em] text-stone-500 hover:text-slate-950 transition-colors font-bold">
            ← Zurück zur Startseite
          </Link>
        </div>

      </div>
    </div>
  );
}