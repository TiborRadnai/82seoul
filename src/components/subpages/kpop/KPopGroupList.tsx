'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_KPOP_DATA } from '@/data/kpopData';
import KPopGroupCard from './KPopGroupCard';
import KPopFilter, { GenderCategory, AgencyCategory } from './KPopFilter';

export default function KPopGroupList() {
  // Szűrő állapotok (alapból Top 10 kiemelt)
  const [selectedGender, setSelectedGender] = useState<GenderCategory>('top10');
  const [selectedAgency, setSelectedAgency] = useState<AgencyCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Kombinált Szűrési Logika (useMemo-val a jobb teljesítményért)
  const filteredGroups = useMemo(() => {
    // 1. Először sorba rendezzük az adatokat rank szerint
    const sortedData = [...ALL_KPOP_DATA].sort((a, b) => a.rank - b.rank);

    return sortedData.filter((item) => {
      // Nem / Kategória szűrés
      const matchesGender =
        selectedGender === 'top10' ||
        selectedGender === 'all' ||
        item.category === selectedGender;

      // Kiadó szűrés
      const matchesAgency =
        selectedAgency === 'all' || item.filterAgency === selectedAgency;

      // Globális Kereső szűrés (Név, Kiadó, Leírás, Fandom, Tagok)
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesAgencyName = item.agency.toLowerCase().includes(q);
        const matchesDescription = item.description.toLowerCase().includes(q) ||
          (item.tagline ? item.tagline.toLowerCase().includes(q) : false);
        const matchesFandom = item.fandom ? item.fandom.toLowerCase().includes(q) : false;
        
        const matchesMembers = item.membersList?.some((m) => {
          if (typeof m === 'string') return (m as string).toLowerCase().includes(q);
          return (
            m.name.toLowerCase().includes(q) ||
            (m.role ? m.role.toLowerCase().includes(q) : false)
          );
        }) ?? false;

        matchesSearch = matchesName || matchesAgencyName || matchesDescription || matchesFandom || matchesMembers;
      }

      return matchesGender && matchesAgency && matchesSearch;
    });
  }, [selectedGender, selectedAgency, searchQuery]);

  // Ha 'top10' van kiválasztva ÉS nincs aktív keresés, levágjuk a legnépszerűbb 10-re!
  const displayedGroups = useMemo(() => {
    if (selectedGender === 'top10' && !searchQuery.trim()) {
      return filteredGroups.slice(0, 10);
    }
    return filteredGroups;
  }, [filteredGroups, selectedGender, searchQuery]);

  // Szűrők visszaállítása alaphelyzetbe
  const handleResetFilters = () => {
    setSelectedGender('top10');
    setSelectedAgency('all');
    setSearchQuery('');
  };

  return (
    <section className="max-w-[1800px] mx-auto px-4 sm:px-8 py-12 sm:py-20">
      
      {/* SZŰRŐ ÉS KERESŐ KOMPONENS */}
      <KPopFilter
        selectedGender={selectedGender}
        onSelectGender={setSelectedGender}
        selectedAgency={selectedAgency}
        onSelectAgency={setSelectedAgency}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={displayedGroups.length}
      />

      {/* HA NINCS TALÁLAT */}
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
        /* ANIMÁLT KÁRTYA LISTA */
        <motion.div layout className="space-y-28 sm:space-y-40 mt-12">
          <AnimatePresence mode="popLayout">
            {displayedGroups.map((group, index) => (
              <motion.div
                key={group.id}
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