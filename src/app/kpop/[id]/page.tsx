'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import { getKPopGroupById } from '@/data/kpopData';

import ArtistHero from '@/components/subpages/kpop/artist-detail/ArtistHero';
import ArtistStats from '@/components/subpages/kpop/artist-detail/ArtistStats';
import ArtistMembers from '@/components/subpages/kpop/artist-detail/ArtistMembers';
import ArtistMemberModal from '@/components/modals/ArtistMemberModal';

interface ArtistPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ArtistDetailPage({ params }: ArtistPageProps) {
  // A Promise feloldása a Next.js szabványa szerint
  const resolvedParams = use(params);
  const artist = getKPopGroupById(resolvedParams.id);

  if (!artist) {
    notFound();
  }

  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0c] text-white select-none">
      <Navbar />

      <ArtistHero artist={artist} />
      <ArtistStats agency={artist.agency} members={artist.members} category={artist.category} />
      
      <ArtistMembers 
        membersList={artist.membersList} 
        onMemberClick={handleMemberClick} 
      />

      <Footer />

      <ArtistMemberModal 
        member={selectedMember} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}