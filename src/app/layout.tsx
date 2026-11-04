// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/core/Navbar";
import BackToTop from "@/components/core/BackToTop";
import { CartProvider } from "../../context/CartContext";
import { AuthProvider } from "../../context/AuthContext"; 
import CartDrawer from "@/components/CartDrawer";
import CookieBanner from '@/components/CookieBanner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://82seoul.de'),
  title: {
    default: "82seoul | Dein Portal für koreanische Kultur, K-Beauty & Travel",
    template: "%s | 82seoul",
  },
  description: "Entdecke die faszinierende Welt Südkoreas – K-Beauty, K-Dramen, authentische Rezepte, K-Pop und exklusive Reiseführer auf Deutsch.",
  openGraph: {
    title: "82seoul | Dein Portal für koreanische Kultur, K-Beauty & Travel",
    description: "Entdecke die faszinierende Welt Südkoreas – K-Beauty, K-Dramen, authentische Rezepte, K-Pop und exklusive Reiseführer auf Deutsch.",
    url: 'https://82seoul.de',
    siteName: '82seoul',
    locale: 'de_DE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <AuthProvider> 
          <CartProvider>
            {/* Globális Kosár Fiók */}
            <CartDrawer />

            {/* Globális Navbar minden aloldal tetején */}
            <Navbar />

            {/* Itt futnak be az egyes oldalak (pl. page.tsx) */}
            <main className="grow">{children}</main>

            {/* Globális Back to Top gomb */}
            <BackToTop />
          </CartProvider>
        </AuthProvider>
        <CookieBanner />
      </body>
    </html>
  );
}