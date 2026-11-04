'use client';

import React, { useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Utensils, ShoppingBag, Search, Clock, ArrowUpRight, Flame, ChevronLeft, ChevronRight, LayoutGrid, List } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface KFoodItem {
  _id: string;
  title: string;
  koreanTitle?: string;
  id: string | { current: string };
  subCategory: string;
  tagline: string;
  prepTime?: string;
  image: string;
  type: 'recipe' | 'product';
  storeLocation?: string;
  price?: string;
  spiceLevel?: '1' | '2' | '3';
}

interface KFoodCatalogProps {
  recipes: KFoodItem[];
  products: KFoodItem[];
  initialTab?: 'recipes' | 'products';
  initialCategory?: string;
}

// Kategóriák leképezése magyar/régi DB értékekről az új német UI feliratokra
const CATEGORY_MAP: Record<string, string> = {
  'Minden': 'Alle',
  'Főételek': 'Hauptgerichte',
  'Levesek & Egytálételek': 'Suppen & Eintöpfe',
  'Street Food': 'Street Food',
  'Desszertek & Sütemények': 'Desserts & Gebäck',
  'Italok': 'Getränke & Erfrischungen',
  'Italok & Frissítők': 'Getränke & Erfrischungen',
  'Nassolnivalók & Snackek': 'Snacks & Knabbereien',
  'Alapanyagok': 'Zutaten & Grundnahrungsmittel',
  // ITT A LÉNYEG: A bal oldal a régi DB érték, a jobb oldal az új megjelenő név!
  'Würzsaucen, Gewürze & Nudeln': 'Ramen & Instant-Gerichte',
  'Édességek & Desszertek': 'Süßwaren & Desserts',
};

const formatCategory = (cat?: string) => {
  if (!cat) return 'Sonstiges';
  return CATEGORY_MAP[cat] || cat;
};

function EmblaCategoryRow({ items, getItemId, renderSpiceBadge }: { 
  items: KFoodItem[]; 
  getItemId: (item: KFoodItem) => string; 
  renderSpiceBadge: (level?: '1' | '2' | '3') => React.ReactNode; 
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    skipSnaps: true,
    dragFree: true,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase">
            {formatCategory(items[0]?.subCategory)}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className="w-full overflow-hidden py-2 cursor-grab active:cursor-grabbing select-none"
        ref={emblaRef}
      >
        <div className="flex gap-6">
          {items.map((item, itemIdx) => {
            const uniqueKey = item._id || getItemId(item) || `item-${itemIdx}`;
            return (
              <Link
                key={uniqueKey}
                href={`/kfood/${getItemId(item)}`}
                className="group relative min-w-75 sm:min-w-90 lg:min-w-100 h-96 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(234,88,12,0.25)] hover:border-amber-500/50 shrink-0 block cursor-pointer"
              >
                <img
                  src={item.image || ""}
                  alt={item.title}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-950/95 via-neutral-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                    {formatCategory(item.subCategory)}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {renderSpiceBadge(item.spiceLevel)}

                    <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:text-black">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 space-y-2 z-10 text-white">
                  {item.prepTime && (
                    <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                      <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-xs border border-white/10">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {item.prepTime}
                      </span>
                    </div>
                  )}
                  {item.price && (
                    <div className="text-xs font-bold text-amber-400">
                      {item.price}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-300 font-normal line-clamp-2 leading-relaxed">
                    {item.tagline}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function KFoodCatalog({ 
  recipes = [], 
  products = [], 
  initialTab = 'recipes', 
  initialCategory = 'Alle' 
}: KFoodCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const activeTab = (searchParams.get('tab') as 'recipes' | 'products') || initialTab;
  
  // URL kategória beolvasása és átalakítása német megnevezésre
  const rawCategoryParam = searchParams.get('category');
  const selectedSubCategory = rawCategoryParam 
    ? (rawCategoryParam === 'Minden' ? 'Alle' : formatCategory(rawCategoryParam))
    : (initialCategory === 'Minden' ? 'Alle' : initialCategory);
  
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const currentItems = activeTab === 'recipes' ? recipes : products;

  const updateQueryParams = (newTab: string, newCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', newTab);
    params.set('category', newCategory);
    router.replace(`/kfood?${params.toString()}`, { scroll: false });
  };

  // Kizárólag Német kategórianevek generálása
  const subCategories = useMemo(() => {
    const cats = new Set(currentItems.map((item) => formatCategory(item.subCategory)).filter(Boolean));
    return ['Alle', ...Array.from(cats)];
  }, [currentItems]);

  const filteredItems = useMemo(() => {
    return currentItems.filter((item) => {
      const formattedItemCategory = formatCategory(item.subCategory);
      const matchesCategory = selectedSubCategory === 'Alle' || formattedItemCategory === selectedSubCategory;
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tagline && item.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.koreanTitle && item.koreanTitle.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [currentItems, selectedSubCategory, searchQuery]);

  const groupedByCategory = useMemo(() => {
    if (selectedSubCategory !== 'Alle' || searchQuery.trim() !== '') return null;
    
    const groups: { [key: string]: KFoodItem[] } = {};
    currentItems.forEach((item) => {
      const cat = item.subCategory || 'Sonstiges';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [currentItems, selectedSubCategory, searchQuery]);

  const handleTabChange = (tab: 'recipes' | 'products') => {
    setSearchQuery('');
    setViewMode('grid');
    updateQueryParams(tab, 'Alle');
  };

  const handleCategoryChange = (cat: string) => {
    updateQueryParams(activeTab, cat);
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isFilteredState = selectedSubCategory !== 'Alle' || searchQuery.trim() !== '';

  const getItemId = (item: KFoodItem) => {
    if (typeof item.id === 'string') return item.id;
    if (typeof item.id === 'object' && item.id?.current) return item.id.current;
    return item._id;
  };

  const renderSpiceBadge = (level?: '1' | '2' | '3') => {
    if (!level) return null;
    const count = Number(level);
    return (
      <div className="flex items-center gap-0.5 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-xs text-xs">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i}>🌶️</span>
        ))}
      </div>
    );
  };

  return (
    <section className="relative w-full py-12 px-4 sm:px-8 lg:px-12 bg-linear-to-b from-[#0a0a0c] via-[#16161a] to-[#f8f9fa] text-white min-h-screen">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1700px] h-96 bg-amber-600/5 blur-[140px] pointer-events-none rounded-full" />

      {/* Szélesített konténer PC-re (max-w-[1700px]) */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto space-y-8">

        {/* FŐ FÜLVÁLASZTÓ ÉS KERESŐ */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-800/80">
          
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 shadow-inner w-full sm:w-auto justify-center">
            <button
              onClick={() => handleTabChange('recipes')}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer flex-1 sm:flex-initial ${
                activeTab === 'recipes'
                  ? 'bg-linear-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <Utensils className="w-4 h-4 shrink-0" />
              <span>Authentische Rezepte</span>
            </button>

            <button
              onClick={() => handleTabChange('products')}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer flex-1 sm:flex-initial ${
                activeTab === 'products'
                  ? 'bg-linear-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Supermarkt-Produkte & Guide</span>
            </button>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            {/* Keresőmező */}
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'recipes' ? 'Rezepte suchen...' : 'Produkte suchen...'}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-neutral-900/90 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all"
              />
            </div>

            {/* Nézetváltó gombok */}
            {isFilteredState && (
              <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-900/90 border border-neutral-800 shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-amber-500 text-black font-bold shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Kartenansicht"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Karten</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-amber-500 text-black font-bold shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  title="Listenansicht"
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Liste</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* GÖRGETHETŐ KATEGÓRIA SÁV LÉPTETŐ GOMBOKKAL PC-RE ÉS MOBILRA */}
        <div className="relative w-full flex items-center gap-2">
          <button
            onClick={() => scrollCategories('left')}
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:bg-neutral-800 hover:text-white shrink-0 cursor-pointer z-10"
            title="Zurück"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={categoryScrollRef}
            className="flex items-center gap-2.5 overflow-x-auto py-2 w-full scrollbar-none scroll-smooth shrink"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {subCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer shrink-0 ${
                  selectedSubCategory === cat
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-neutral-900/90 text-neutral-300 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollCategories('right')}
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 hover:bg-neutral-800 hover:text-white shrink-0 cursor-pointer z-10"
            title="Weiter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* TARTALOM */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-24 space-y-3">
            <Flame className="w-10 h-10 text-amber-500/50 mx-auto animate-pulse" />
            <p className="text-neutral-400 text-lg">Keine Ergebnisse für die angegebenen Kriterien gefunden.</p>
            <button
              onClick={() => { handleCategoryChange('Alle'); setSearchQuery(''); }}
              className="text-xs text-amber-400 hover:underline uppercase tracking-wider font-bold cursor-pointer"
            >
              Filter zurücksetzen
            </button>
          </div>
        ) : groupedByCategory ? (
          <div className="space-y-16">
            {Object.entries(groupedByCategory).map(([categoryName, items]) => (
              <EmblaCategoryRow
                key={categoryName}
                items={items}
                getItemId={getItemId}
                renderSpiceBadge={renderSpiceBadge}
              />
            ))}
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
            {filteredItems.map((item, index) => {
              const uniqueKey = item._id || getItemId(item) || `grid-${index}`;
              return (
                <Link
                  key={uniqueKey}
                  href={`/kfood/${getItemId(item)}`}
                  className="group relative h-96 rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(234,88,12,0.25)] hover:border-amber-500/50 block cursor-pointer w-full"
                >
                  <img
                    src={item.image || ""}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-950/95 via-neutral-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                      {formatCategory(item.subCategory)}
                    </span>

                    <div className="flex items-center gap-2">
                      {renderSpiceBadge(item.spiceLevel)}

                      <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:border-amber-400 group-hover:text-black">
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-6 space-y-2 z-10 text-white">
                    {item.prepTime && (
                      <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                        <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-xs border border-white/10">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          {item.prepTime}
                        </span>
                      </div>
                    )}
                    {item.price && (
                      <div className="text-xs font-bold text-amber-400">
                        {item.price}
                      </div>
                    )}
                    <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-300 font-normal line-clamp-2 leading-relaxed">
                      {item.tagline}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 max-w-5xl mx-auto w-full">
            {filteredItems.map((item, index) => {
              const uniqueKey = item._id || getItemId(item) || `list-${index}`;
              return (
                <Link
                  key={uniqueKey}
                  href={`/kfood/${getItemId(item)}`}
                  className="group flex-col sm:flex-row items-center justify-between gap-6 p-4 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-md transition-all duration-300 hover:border-amber-500/50 hover:bg-neutral-900/80 block cursor-pointer"
                >
                  <div className="flex items-center gap-5 w-full sm:w-auto">
                    <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-neutral-800">
                      <img
                        src={item.image || ""}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-amber-400 text-[10px] font-bold tracking-wider uppercase">
                          {formatCategory(item.subCategory)}
                        </span>
                        {item.prepTime && (
                          <span className="flex items-center gap-1 text-xs text-neutral-400">
                            <Clock className="w-3 h-3 text-amber-400" />
                            {item.prepTime}
                          </span>
                        )}
                        {item.price && (
                          <span className="text-xs font-bold text-amber-400">
                            {item.price}
                          </span>
                        )}
                        {item.spiceLevel && (
                          <span className="text-xs ml-1">
                            {item.spiceLevel === '1' && '🌶️'}
                            {item.spiceLevel === '2' && '🌶️🌶️'}
                            {item.spiceLevel === '3' && '🌶️🌶️🌶️'}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-300 line-clamp-1 max-w-xl">
                        {item.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-800">
                    <span className="text-xs font-semibold text-amber-400 group-hover:underline">Ansehen</span>
                    <div className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 text-white flex items-center justify-center transition-all group-hover:bg-amber-500 group-hover:text-black">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}