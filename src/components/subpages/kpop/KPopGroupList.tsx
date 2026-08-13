'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KPopGroupCard from './KPopGroupCard';
import KPopFilter, { GenderCategory, AgencyCategory, GenerationCategory } from './KPopFilter';

interface KPopGroupListProps {
  initialArtists: any[]; // A Sanityből érkező adatok
}

export default function KPopGroupList({ initialArtists }: KPopGroupListProps) {
  const [selectedGender, setSelectedGender] = useState<GenderCategory>('top10');
  const [selectedAgency, setSelectedAgency] = useState<AgencyCategory>('all');
  const [selectedGeneration, setSelectedGeneration] = useState<GenerationCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Átadjuk az indexnek a generációt és a filterAgency-t is, hogy a szűrő látja őket
  const artistIndexData = useMemo(() => {
    return initialArtists.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      themeColor: item.themeColor,
      filterAgency: item.filterAgency,
      generation: item.generation,
    }));
  }, [initialArtists]);

  const handleSelectArtist = (id: string) => {
    const element = document.getElementById(`artist-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setSelectedGender('all');
      setSelectedGeneration('all');
      setTimeout(() => {
        const el = document.getElementById(`artist-${id}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const filteredGroups = useMemo(() => {
    // Biztosítjuk, hogy rank szerint legyenek rendezve, ha van rank
    const sortedData = [...initialArtists].sort((a, b) => (a.rank || 99) - (b.rank || 99));

    return sortedData.filter((item) => {
      const matchesGender =
        selectedGender === 'top10' ||
        selectedGender === 'all' ||
        item.category === selectedGender;

      const matchesAgency =
        selectedAgency === 'all' || item.filterAgency === selectedAgency;

      // Generáció szűrés hozzáadása
      const matchesGeneration =
        selectedGeneration === 'all' || item.generation === selectedGeneration;

      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name?.toLowerCase().includes(q) || false;
        const matchesAgencyName = (item.agency || item.filterAgency || '').toLowerCase().includes(q);
        const matchesDescription = (item.description || '').toLowerCase().includes(q) ||
          (item.tagline ? item.tagline.toLowerCase().includes(q) : false);
        const matchesFandom = item.fandom ? item.fandom.toLowerCase().includes(q) : false;
        const matchesGenQuery = item.generation ? item.generation.toLowerCase().includes(q) : false;
        
        const matchesMembers = item.membersList?.some((m: any) => {
          if (typeof m === 'string') return m.toLowerCase().includes(q);
          return (
            m.name?.toLowerCase().includes(q) ||
            (m.role ? m.role.toLowerCase().includes(q) : false)
          );
        }) ?? false;

        matchesSearch = matchesName || matchesAgencyName || matchesDescription || matchesFandom || matchesGenQuery || matchesMembers;
      }

      return matchesGender && matchesAgency && matchesGeneration && matchesSearch;
    });
  }, [initialArtists, selectedGender, selectedAgency, selectedGeneration, searchQuery]);

  const displayedGroups = useMemo(() => {
    if (selectedGender === 'top10' && selectedGeneration === 'all' && selectedAgency === 'all' && !searchQuery.trim()) {
      return filteredGroups.slice(0, 10);
    }
    return filteredGroups;
  }, [filteredGroups, selectedGender, selectedGeneration, selectedAgency, searchQuery]);

  const handleResetFilters = () => {
    setSelectedGender('top10');
    setSelectedAgency('all');
    setSelectedGeneration('all');
    setSearchQuery('');
  };

  return (
    <section className="max-w-[1800px] mx-auto px-4 sm:px-8 py-12 sm:py-20">
      
      <KPopFilter
        selectedGender={selectedGender}
        onSelectGender={setSelectedGender}
        selectedAgency={selectedAgency}
        onSelectAgency={setSelectedAgency}
        selectedGeneration={selectedGeneration}
        onSelectGeneration={setSelectedGeneration}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={displayedGroups.length}
        artists={artistIndexData}
        onSelectArtist={handleSelectArtist}
      />

      {displayedGroups.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 my-12">
          <p className="text-zinc-400 text-lg">
            Sajnos nincs a keresésnek megfelelő előadó.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-6 py-2.5 rounded-full bg-white text-zinc-950 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer"
          >
            Szűrők alaphelyzetbe
          </button>
        </div>
      ) : (
        <motion.div layout className="space-y-28 sm:space-y-40 mt-12">
          <AnimatePresence mode="popLayout">
            {displayedGroups.map((group, index) => (
              <motion.div
                key={group.id || group._id}
                id={`artist-${group.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <KPopGroupCard 
                  band={group} 
                  index={index} 
                  showRank={selectedGender === 'top10' && !searchQuery.trim()} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

    </section>
  );
}