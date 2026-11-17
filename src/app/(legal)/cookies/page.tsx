import type { Metadata } from 'next';
import CookiesContent from '@/components/subpages/legal/CookiesContent'; // Vagy ahova teszed a komponenst

export const metadata: Metadata = {
  title: 'Cookie-Richtlinie & Einstellungen | 82seoul',
  description: 'Transparenz über die Verwendung von Cookies auf 82seoul und Verwaltung deiner Präferenzen.',
  alternates: {
    canonical: 'https://www.82seoul.de/cookies',
  },
};

export default function CookiesPage() {
  return <CookiesContent />;
}