'use client';

import React from 'react';
import {
  Sparkles,
  Users,
  Disc3,
  Award,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

interface KpopFilterInfoBarProps {
  activeFilter: string;
  selectedAgency?: string;
  selectedGeneration?: string;
  searchQuery?: string;
  totalCount: number;
}

function getSpotifyWeek() {
  const date = new Date();

  const target = new Date(date.valueOf());

  const dayNr = (date.getDay() + 6) % 7;

  target.setDate(target.getDate() - dayNr + 3);

  const firstThursday = target.valueOf();

  target.setMonth(0, 1);

  if (target.getDay() !== 4) {
    target.setMonth(
      0,
      1 + ((4 - target.getDay()) + 7) % 7
    );
  }

  const week =
    1 +
    Math.ceil(
      (firstThursday - target.valueOf()) /
        604800000
    );

  return Math.max(1, week - 1);
}

export default function KpopFilterInfoBar({
  activeFilter,
  selectedAgency = 'all',
  selectedGeneration = 'all',
  searchQuery = '',
  totalCount,
}: KpopFilterInfoBarProps) {
  const hasExtraFilters =
    selectedAgency !== 'all' || selectedGeneration !== 'all';

  const getContent = () => {
    if (searchQuery.trim()) {
        return {
        icon: <Search className="w-4 h-4 text-pink-500" />,
        label: 'SUCHERGEBNISSE',
        title: `Suche nach „${searchQuery.trim()}“`,
        description:
            'Die Ergebnisse umfassen Künstler, Gruppen, Agenturen, Mitglieder sowie weitere Inhalte aus der 82Seoul K-Pop Datenbank.',
        isTop10: false,
        };
    }

    switch (activeFilter) {
        case 'top10':
        return {
            icon: <Award className="w-4 h-4 text-amber-500" />,
            label: '82SEOUL TOP 10',
            title: 'Wie entsteht das 82Seoul Top 10 Ranking?',
            description:
            'Das wöchentliche 82Seoul Ranking basiert auf den aktuellen Spotify Korea Top Artists Charts. Da die 82Seoul Datenbank kontinuierlich erweitert wird und noch nicht alle koreanischen Künstler umfasst, werden ausschließlich bereits erfasste Künstler und Gruppen berücksichtigt. Die Platzierungen werden wöchentlich entsprechend der aktuellen Spotify Korea Rankings aktualisiert.',
            isTop10: true,
        };

      case 'gg':
        return {
          icon: <Sparkles className="w-4 h-4 text-purple-500" />,
          label: 'GIRLGROUPS',
          title: 'Girlgroups der koreanischen Musikszene',
          description:
            'Diese Auswahl umfasst aktive sowie prägende Girlgroups verschiedener K-Pop Generationen innerhalb der 82Seoul Datenbank.',
          isTop10: false, 
        };

      case 'bg':
        return {
          icon: <Users className="w-4 h-4 text-blue-500" />,
          label: 'BOYGROUPS',
          title: 'Boygroups der koreanischen Musikszene',
          description:
            'Diese Übersicht zeigt Boygroups unterschiedlicher Generationen, Konzepte und Agenturen innerhalb der 82Seoul Datenbank.',
          isTop10: false,  
        };

      case 'solo':
        return {
          icon: <Disc3 className="w-4 h-4 text-emerald-500" />,
          label: 'SOLO ARTISTS',
          title: 'Solo-Künstler & Einzelinterpreten',
          description:
            'Die Auswahl umfasst Solo-Künstler, ehemalige Gruppenmitglieder sowie eigenständige Interpreten aus der koreanischen Musikszene.',
          isTop10: false,  
        };

      default:
        return {
          icon: <Sparkles className="w-4 h-4 text-pink-500" />,
          label: '82SEOUL DATABASE',
          title: 'Künstler, Gruppen und Solo Acts',
          description:
            'Diese Übersicht vereint alle derzeit erfassten Künstler, Gruppen und Solo Acts der 82Seoul K-Pop Datenbank.',
          isTop10: false,  
        };
    }
  };

  const content = getContent();
  const spotifyWeek = getSpotifyWeek();

  return (
    <div className="my-12 sm:my-16">
      <div className="border-t border-zinc-200 mb-6" />

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

        <div className="max-w-4xl">

          <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-zinc-500 mb-3">
            {content.icon}
            <span>{content.label}</span>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 mb-3">
            {content.title}
          </h2>

          <p className="text-sm sm:text-[15px] leading-7 text-zinc-600">
            {content.description}
          </p>

        </div>

<div className="shrink-0 lg:text-right">

  {content.isTop10 ? (
    <>
      <div className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-2">
        Spotify Korea
      </div>

      <div className="text-3xl font-light text-zinc-900">
        KW {spotifyWeek}
      </div>
    </>
  ) : (
    <>
      <div className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-2">
        Einträge
      </div>

      <div className="flex lg:justify-end items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-pink-500" />

        <span className="text-3xl font-light text-zinc-900">
          {totalCount}
        </span>
      </div>
    </>
  )}

</div>

      </div>

      <div className="border-b border-zinc-200 mt-6" />
    </div>
  );
}