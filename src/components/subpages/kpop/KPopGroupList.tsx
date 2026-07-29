'use client';

import React from 'react';
import { KPOP_GROUPS } from '@/data/kpopData';
import KPopGroupCard from './KPopGroupCard';

export default function KPopGroupList() {
  return (
    // Max szélesség megnövelve 1800px-re, és az oldalsó padding lecsökkentve px-4 sm:px-8-ra
    <section className="max-w-[1800px] mx-auto px-4 sm:px-8 py-16 sm:py-24 space-y-28 sm:space-y-40">
      {KPOP_GROUPS.map((group, index) => (
        <KPopGroupCard key={group.id} band={group} index={index} />
      ))}
    </section>
  );
}