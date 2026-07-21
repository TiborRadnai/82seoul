import Navbar from "@/components/core/Navbar";
import Header from "@/components/home/Header";
import StatsDivider from "@/components/home/StatsDivider";
import KDramaSection from "@/components/home/KDramaSection";
import KPopSection from "@/components/home/KPopSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      {/* 1. Képernyő: Navigáció + Hero */}
      <Navbar />
      <Header />

      {/* 2. Képernyő: A divider és a K-Drama szekció pontosan 1 teljes kijelzőmagasságot tölt ki együtt */}
      <div className="min-h-screen flex flex-col justify-between">
        <StatsDivider />
        <KDramaSection />
      </div>
      <KPopSection />
    </main>
  );
}