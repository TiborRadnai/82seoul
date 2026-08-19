'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ArtistMembers from './ArtistMembers';
import ArtistMemberModal from '@/components/modals/ArtistMemberModal';

interface ArtistDetailClientWrapperProps {
  artist: any;
}

export default function ArtistDetailClientWrapper({ artist }: ArtistDetailClientWrapperProps) {
  const searchParams = useSearchParams();
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Összeállítjuk a visszautat a meglévő keresési paraméterekkel és a horgonnyal
  const queryStr = searchParams.toString();
  const backUrl = `/kpop${queryStr ? `?${queryStr}` : ''}#artist-${artist.id}`;

  const handleMemberClick = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Elegáns lebegő / fix Vissza gomb a részletes oldal tetején */}
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 pt-6 mb-16 sm:mb-24">
        <Link
          href={backUrl}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-zinc-800 transition-all shadow-lg hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Liste
        </Link>
      </div>

      <ArtistMemberModal 
        member={selectedMember} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        themeColor={artist.themeColor}
      />
    </>
  );
}