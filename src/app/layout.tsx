import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/core/Navbar";
import BackToTop from "@/components/core/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "82.Seoul",
  description: "Korean media and culture portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {/* Globális Navbar minden aloldal tetején */}
        <Navbar />

        {/* Itt futnak be az egyes oldalak (pl. page.tsx) */}
        <main className="grow">{children}</main>

        {/* Globális Back to Top gomb */}
        <BackToTop />
      </body>
    </html>
  );
}