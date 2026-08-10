'use client';

import React, { useState } from 'react';
import ArtistMembers from './ArtistMembers';
import ArtistMemberModal from '@/components/modals/ArtistMemberModal';

interface ArtistDetailClientWrapperProps {
  artist: any;
}

export default function ArtistDetailClientWrapper({ artist }: ArtistDetailClientWrapperProps) {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  return (
    <>
      <ArtistMembers 
        membersList={artist.membersList} 
        onMemberClick={handleMemberClick} 
        themeColor={artist.themeColor}
        category={artist.category}
      />

      <ArtistMemberModal 
        member={selectedMember} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        themeColor={artist.themeColor}
      />
    </>
  );
}