'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KPOP_GROUPS } from '@/data/kpopData';
import KPopGroupCard from './KPopGroupCard';
import KPopFilter, { GenderCategory, AgencyCategory } from './KPopFilter';

export default function KPopGroupList() {
// State alapból top10!
const [selectedGender, setSelectedGender] = useState<GenderCategory>('top10');
const [selectedAgency, setSelectedAgency] = useState<AgencyCategory>('all');

// Szűrési logika
const filteredGroups = KPOP_GROUPS.filter((group) => {
  // Nem / Top10 szűrés
  const matchesGender =
    selectedGender === 'top10' ||
    selectedGender === 'all' ||
    group.category === selectedGender;

  // Kiadó szűrés
  const matchesAgency =
    selectedAgency === 'all' || group.filterAgency === selectedAgency;

  return matchesGender && matchesAgency;
});

// Ha 'top10' van kiválasztva, levágjuk 10 elemre, különben mutatjuk az ÖSSZES találatot!
const displayedGroups =
  selectedGender === 'top10'
    ? filteredGroups.slice(0, 10)
    : filteredGroups;

  return (
    <section className="max-w-[1800px] mx-auto px-4 sm:px-8 py-12 sm:py-20">
      
      {/* SZŰRŐ KOMPONENS */}
      <KPopFilter
        selectedGender={selectedGender}
        onSelectGender={setSelectedGender}
        selectedAgency={selectedAgency}
        onSelectAgency={setSelectedAgency}
        totalCount={displayedGroups.length}
      />

      {/* HA NINCS TALÁLAT */}
      {displayedGroups.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 my-12">
          <p className="text-zinc-400 text-lg">Sajnos nincs a keresésnek megfelelő előadó.</p>
          <button
            onClick={() => {
              setSelectedGender('all');
              setSelectedAgency('all');
            }}
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
                <KPopGroupCard band={group} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

    </section>
  );
}