'use client';

import React, { useMemo, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import KPopGroupCard from './KPopGroupCard';
import KpopFilterInfoBar from './KpopFilterInfoBar';
import KPopFilter, { GenderCategory, AgencyCategory, GenerationCategory } from './KPopFilter';

interface KPopGroupListProps {
  initialArtists: any[];
}

export default function KPopGroupList({ initialArtists }: KPopGroupListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Olvassuk ki az értékeket közvetlenül az URL-ből. 
  // A gender esetében ha nincs benn, akkor 'top10', de ha benn van ('all', 'gg', 'bg', 'coed', 'solo'), akkor azt használjuk!
  const genderParam = searchParams.get('gender');
  const selectedGender: GenderCategory = genderParam ? (genderParam as GenderCategory) : 'top10';
  const selectedAgency = (searchParams.get('agency') as AgencyCategory) || 'all';
  const selectedGeneration = (searchParams.get('generation') as GenerationCategory) || 'all';
  const searchQuery = searchParams.get('q') || '';

  // Segédfüggvény az URL paraméterek frissítésére
  const updateQueryParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        if (key === 'gender') {
          // A gender értéket MINDIG beírjuk az URL-be (top10, all, gg, bg, coed, solo), nem törölhetjük ki!
          params.set('gender', value);
        } else if (value !== 'all') {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      } else {
        if (key === 'gender') {
          params.set('gender', 'top10');
        } else {
          params.delete(key);
        }
      }
    });

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // 1. Kategória váltás (Top 10, Alle, Girlgroups, Boygroups, Duo & Co-ed, Solos)
  const setSelectedGender = (val: GenderCategory) => {
    if (val === 'top10') {
      updateQueryParams({
        gender: 'top10',
        agency: 'all',
        generation: 'all',
        q: '',
      });
    } else {
      updateQueryParams({
        gender: val,
        agency: 'all',
        generation: 'all',
      });
    }
  };

  // 2. Ügynökség szűrés: ha beállítanak egy ügynökséget, a kategória automatikusan 'all'-ra vált, hogy a teljes bázisból szűrjön
  const setSelectedAgency = (val: AgencyCategory) => {
    updateQueryParams({
      agency: val,
      gender: val !== 'all' ? 'all' : selectedGender,
    });
  };

  // 3. Generáció szűrés: szintén 'all'-ra állítja a kategóriát
  const setSelectedGeneration = (val: GenerationCategory) => {
    updateQueryParams({
      generation: val,
      gender: val !== 'all' ? 'all' : selectedGender,
    });
  };

  // 4. Keresés
  const setSearchQuery = (val: string) => {
    const updates: Record<string, string> = { q: val };
    if (val.trim() && selectedGender === 'top10') {
      updates.gender = 'all';
    }
    updateQueryParams(updates);
  };

  // Ha visszalépünk egy horgonnyal (pl. #artist-bts), automatikusan odagörgetünk
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  // Ez a lista a főoldali szűrt kártyákhoz tartozik
  const artistIndexData = useMemo(() => {
    return initialArtists.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      themeColor: item.themeColor,
      filterAgency: item.filterAgency,
      generation: item.generation,
      imageUrl: item.image,
    }));
  }, [initialArtists]);

  // TELJES LISTA A SCHNELLINDEX DRAWERNEK
  const completeArtistsList = useMemo(() => {
    return initialArtists.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      themeColor: item.themeColor,
      filterAgency: item.filterAgency,
      generation: item.generation,
      imageUrl: item.image,
    }));
  }, [initialArtists]);

  const handleSelectArtist = (id: string) => {
    router.push(`/kpop/${id}`);
  };

  const filteredGroups = useMemo(() => {
    // Rendezés: akiknek van érvényes rank-ja (> 0), azok előre kerülnek sorrendben, a többiek hátra
    const sortedData = [...initialArtists].sort((a, b) => {
      const rankA = a.rank && a.rank > 0 ? a.rank : 999;
      const rankB = b.rank && b.rank > 0 ? b.rank : 999;
      return rankA - rankB;
    });

    return sortedData.filter((item) => {
      // 1. Kategória ('top10', 'all', 'bg', 'gg', 'coed', 'solo')
      const matchesGender =
        selectedGender === 'top10' ||
        selectedGender === 'all' ||
        item.category?.toLowerCase() === selectedGender.toLowerCase();

      // 2. Ügynökség ('HYBE', 'SM', 'YG', 'JYP', 'OTHER') - kis/nagybetű független
      const matchesAgency =
        selectedAgency === 'all' ||
        item.filterAgency?.toUpperCase() === selectedAgency.toUpperCase();

      // 3. Generáció ('3rd', '4th', '5th' stb.) - számjegy vagy szöveg egyezés
      let matchesGeneration = true;
      if (selectedGeneration !== 'all') {
        const dbGen = String(item.generation || '').toLowerCase().trim();
        const filterGen = String(selectedGeneration).toLowerCase().trim();
        
        const dbNum = dbGen.replace(/\D/g, '');
        const filterNum = filterGen.replace(/\D/g, '');

        if (dbNum && filterNum) {
          matchesGeneration = dbNum === filterNum;
        } else {
          matchesGeneration = dbGen === filterGen;
        }
      }

      // 4. Keresőszó
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name?.toLowerCase().includes(q) || false;
        const matchesAgencyName = (item.agency || item.filterAgency || '').toLowerCase().includes(q);
        const matchesDescription =
          (item.description || '').toLowerCase().includes(q) ||
          (item.tagline ? item.tagline.toLowerCase().includes(q) : false);
        const matchesFandom = item.fandom ? item.fandom.toLowerCase().includes(q) : false;
        const matchesGenQuery = item.generation ? String(item.generation).toLowerCase().includes(q) : false;

        const matchesMembers =
          item.membersList?.some((m: any) => {
            if (typeof m === 'string') return m.toLowerCase().includes(q);
            return (
              m.name?.toLowerCase().includes(q) ||
              (m.role ? m.role.toLowerCase().includes(q) : false)
            );
          }) ?? false;

        matchesSearch =
          matchesName ||
          matchesAgencyName ||
          matchesDescription ||
          matchesFandom ||
          matchesGenQuery ||
          matchesMembers;
      }

      return matchesGender && matchesAgency && matchesGeneration && matchesSearch;
    });
  }, [initialArtists, selectedGender, selectedAgency, selectedGeneration, searchQuery]);

  // Csak akkor vágjuk 10-re és mutatunk rangsort, ha tényleg a tiszta Top 10 nézet van aktív
  const isPureTop10 =
    selectedGender === 'top10' &&
    selectedGeneration === 'all' &&
    selectedAgency === 'all' &&
    !searchQuery.trim();

  const displayedGroups = useMemo(() => {
    if (isPureTop10) {
      return filteredGroups.slice(0, 10);
    }
    return filteredGroups;
  }, [filteredGroups, isPureTop10]);

  const handleResetFilters = () => {
    router.replace(pathname, { scroll: false });
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
        allArtists={completeArtistsList}
        onSelectArtist={handleSelectArtist}
      />

      <KpopFilterInfoBar
        activeFilter={selectedGender}
        selectedAgency={selectedAgency}
        selectedGeneration={selectedGeneration}
        searchQuery={searchQuery}
        totalCount={displayedGroups.length}
      />

      {displayedGroups.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/40 rounded-3xl border border-zinc-800 my-12">
          <p className="text-zinc-400 text-lg">
            Leider wurden keine Künstler gefunden, die deiner Suche entsprechen.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-6 py-2.5 rounded-full bg-white text-zinc-950 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all cursor-pointer"
          >
            Filter zurücksetzen
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
                  showRank={isPureTop10}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}