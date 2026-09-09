// src/utils/kbeautyTranslations.ts

const categoryTranslationMap: Record<string, string> = {
  'Arckrém & Hidratáló': 'Gesichtscreme & Feuchtigkeit',
  'Szérum & Esszencia': 'Serum & Essenz',
  'Arctisztító': 'Gesichtsreinigung',
  'Arcmaszk & Peeling': 'Gesichtsmaske & Peeling',
  'Smink & Egyéb': 'Make-up & Sonstiges',
  // Ha a jövőben bevezetsz egy újat, itt elég beírnod:
  // 'Új Magyar Név': 'Neuer Deutscher Name',
};

const badgeTranslationMap: Record<string, string> = {
  'Bestseller': 'Bestseller',
  'Trending': 'Trending',
  'Új': 'Neu',
  'Populáris': 'Beliebt',
};

export const translateCategory = (cat?: string): string => {
  if (!cat) return 'K-Beauty';
  return categoryTranslationMap[cat] || cat; // Ha nincs benne, visszadja az eredetit, hogy ne törjön el semmi
};

export const translateBadge = (badge?: string): string | null => {
  if (!badge) return null;
  return badgeTranslationMap[badge] || badge;
};