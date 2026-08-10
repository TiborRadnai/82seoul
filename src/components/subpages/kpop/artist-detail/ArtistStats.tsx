import React from 'react';

interface ArtistStatsProps {
  agency: string;
  members: string | number; // Engedélyezzük mindkettőt
  category: 'gg' | 'bg' | 'solo';
  themeColor?: string;
}

export default function ArtistStats({ agency, members, category, themeColor = '#ec4899' }: ArtistStatsProps) {
  return (
    <section className="relative w-full bg-[#121216]/80 border-b border-white/10 py-8 px-6 backdrop-blur-xl shadow-2xl">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-4 rounded-xl bg-white/2 border border-white/5">
          <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1 font-semibold">Ügynökség</span>
          <span className="text-base sm:text-lg font-black text-zinc-100">{agency || 'N/A'}</span>
        </div>
        
        <div className="p-4 rounded-xl bg-white/2 border border-white/5">
          <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1 font-semibold">Tagok Száma</span>
          <span className="text-base sm:text-lg font-black text-zinc-100">
            {typeof members === 'number' ? `${members} fő` : members}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white/2 border border-white/5">
          <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1 font-semibold">Kategória</span>
          <span 
            className="text-base sm:text-lg font-black uppercase tracking-wide"
            style={{ color: themeColor }}
          >
            {category === 'gg' && 'Lánycsapat'}
            {category === 'bg' && 'Fiúcsapat'}
            {category === 'solo' && 'Szóló előadó'}
          </span>
        </div>
      </div>
    </section>
  );
}