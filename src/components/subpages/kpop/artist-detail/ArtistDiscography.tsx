'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface KPopAlbumSanity {
  id: string;
  title: string;
  type: 'full' | 'mini' | 'single' | 'ost';
  releaseDate: string;
  coverImage?: string;
  spotifyUrl?: string;
  tracks?: string[];
}

interface ArtistDiscographyProps {
  albums?: KPopAlbumSanity[];
  themeColor?: string;
}

type AlbumFilter = 'all' | 'full' | 'mini' | 'single' | 'ost';

function parseAlbumDate(dateStr: string): number {
  if (!dateStr) return 0;
  const parts = dateStr.split('.');
  if (parts.length >= 3) {
    if (parts[0].length === 4) {
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])).getTime();
    } else if (parts[2].length === 4) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0])).getTime();
    }
  }
  return new Date(dateStr).getTime() || 0;
}

export default function ArtistDiscography({ albums, themeColor = '#ec4899' }: ArtistDiscographyProps) {
  const [filter, setFilter] = useState<AlbumFilter>('all');
  
  if (!albums || albums.length === 0) return null;

  const sortedAlbums = [...albums].sort((a, b) => parseAlbumDate(b.releaseDate) - parseAlbumDate(a.releaseDate));

  const latestAlbum = sortedAlbums[0];
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(latestAlbum.id);
  const featuredRef = useRef<HTMLDivElement>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const currentFeatured = sortedAlbums.find((a) => a.id === selectedAlbumId) || latestAlbum;
  const isLatestSelected = currentFeatured.id === latestAlbum.id;

  const filteredAlbums = sortedAlbums.filter((album) => {
    if (filter === 'all') return true;
    return album.type === filter;
  });

  const handleSelectAlbum = (albumId: string) => {
    if (hasMoved) return;
    setSelectedAlbumId(albumId);
    featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Segédfüggvény az albumtípusok szép magyar elnevezéséhez
  const getAlbumTypeLabel = (type: 'full' | 'mini' | 'single' | 'ost') => {
    switch (type) {
      case 'full': return 'Stúdióalbum';
      case 'mini': return 'Minialbum (EP)';
      case 'single': return 'Kislemez';
      case 'ost': return 'Zene (OST)';
      default: return 'Kiadvány';
    }
  };

  const getAlbumTypeBadgeLabel = (type: 'full' | 'mini' | 'single' | 'ost') => {
    switch (type) {
      case 'full': return 'Stúdió';
      case 'mini': return 'Mini EP';
      case 'single': return 'Single';
      case 'ost': return 'OST';
      default: return 'Album';
    }
  };

  // Egér és érintéskezelő logika egységesítve mobilos reszponzivitáshoz
  const handleDragStart = (pageX: number) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleDragMove = (pageX: number) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setHasMoved(true);
    }
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="discography" className="w-full py-16 sm:py-28 px-4 sm:px-8 lg:px-16 text-left relative overflow-hidden bg-[#07070a]">
      
      {/* Témaszínű egyedi scrollbar stílus */}
      <style jsx global>{`
        .custom-dynamic-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-dynamic-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
        }
        .custom-dynamic-scrollbar::-webkit-scrollbar-thumb {
          background-color: ${themeColor};
          border-radius: 8px;
          border: 2px solid #07070a;
        }
        .custom-dynamic-scrollbar::-webkit-scrollbar-thumb:hover {
          filter: brightness(1.2);
        }
        .custom-dynamic-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: ${themeColor} rgba(255, 255, 255, 0.02);
        }
      `}</style>

      {/* 1. Finom, világító elválasztó fénycsík a szekció tetején */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${themeColor}, transparent)`,
          boxShadow: `0 0 20px ${themeColor}`
        }}
      />

      {/* 2. Dinamikus LED háttérfény */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: themeColor }}
      />
      <div className="absolute top-2/3 right-10 w-100 h-100 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        
        {/* Szekció cím */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span 
              className="w-3 h-3 rounded-full shadow-[0_0_12px]" 
              style={{ backgroundColor: themeColor, boxShadow: `0 0 12px ${themeColor}` }}
            />
            <span 
              className="text-[11px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] font-extrabold"
              style={{ color: themeColor }}
            >
              Diszkográfia & Hanganyagok
            </span>
          </div>
          <h2 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.1)]">
            Albumok & <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #a855f7)` }}>Megjelenések</span>
          </h2>
        </div>

        {/* --- 1. KIEMELT KÁRTYA --- */}
        <div 
          ref={featuredRef} 
          className="relative w-full rounded-2xl overflow-hidden backdrop-blur-3xl border grid grid-cols-1 lg:grid-cols-12 mb-16 sm:mb-24 scroll-mt-24 transition-all duration-500 items-center"
          style={{ 
            backgroundColor: 'rgba(15, 15, 22, 0.8)',
            borderColor: `${themeColor}50`, 
            boxShadow: `0 30px 100px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 40px ${themeColor}15` 
          }}
        >
          
          {/* Bal oldal: Borítókép konténer - JAVÍTVA: Optimalizált sizes */}
          <div className="relative lg:col-span-6 p-6 sm:p-10 flex items-center justify-center bg-linear-to-br from-white/5 to-transparent">
            <div className="relative w-full max-w-70 sm:max-w-100 lg:max-w-120 aspect-square rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 group">
              {currentFeatured.coverImage ? (
                <Image
                  key={currentFeatured.id}
                  src={currentFeatured.coverImage}
                  alt={currentFeatured.title}
                  fill
                  // JAVÍTÁS: Nagyobb felbontás engedélyezése asztali nézetben
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">Nincs borítókép</div>
              )}
              
              {isLatestSelected && (
                <div 
                  className="absolute top-4 left-4 px-3.5 py-1.5 rounded-lg border backdrop-blur-md text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-xl flex items-center gap-2 z-10"
                  style={{ backgroundColor: 'rgba(0,0,0,0.85)', borderColor: `${themeColor}80`, color: themeColor }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
                  Legfrissebb Megjelenés
                </div>
              )}
            </div>
          </div>

          {/* Jobb oldal: Album infók és tracklist */}
          <div className="lg:col-span-6 p-6 sm:p-14 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span 
                  className="text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-extrabold px-3 py-1.5 rounded-lg border backdrop-blur-md"
                  style={{ backgroundColor: `${themeColor}20`, borderColor: `${themeColor}50`, color: themeColor }}
                >
                  {getAlbumTypeLabel(currentFeatured.type)}
                </span>
                <span className="text-xs sm:text-sm font-bold text-zinc-400">
                  {currentFeatured.releaseDate}
                </span>
              </div>

              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6 drop-shadow-md">
                {currentFeatured.title}
              </h3>

              {currentFeatured.tracks && currentFeatured.tracks.length > 0 && (
                <div className="mb-6">
                  <span className="block text-[11px] uppercase tracking-widest text-zinc-400 font-extrabold mb-3">
                    Dallista / Tracklist ({currentFeatured.tracks.length} dal)
                  </span>
                  <ul className="max-h-60 sm:max-h-95 overflow-y-auto space-y-2 pr-2 custom-dynamic-scrollbar border border-white/10 rounded-xl p-3 bg-black/40 shadow-inner backdrop-blur-md">
                    {currentFeatured.tracks.map((track, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200 bg-white/5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                        <span className="text-xs font-mono font-bold text-zinc-400 shrink-0" style={{ color: themeColor }}>
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <span className="font-semibold text-white tracking-wide truncate">{track}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Spotify Gomb */}
            {currentFeatured.spotifyUrl && (
              <a
                href={currentFeatured.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3.5 sm:py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-[#1DB954] text-center transition-all flex items-center justify-center gap-3 border border-[#1DB954]/60 hover:bg-[#1DB954]/10 hover:scale-[1.01] active:scale-[0.99] backdrop-blur-md"
                style={{ boxShadow: '0 0 25px rgba(29, 185, 84, 0.25)', backgroundColor: 'rgba(29, 185, 84, 0.05)' }}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.599-.12-.42.18-.78.6-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.66.24 1.08zm1.44-3.3c-.301.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.41-.48.18-1.02-.06-1.2-.54-.18-.48.06-1.02.54-1.2 4.2-1.26 9.6-.6 13.56 1.8.42.24.6.84.3 1.26zm.12-3.48C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.78-.18-.6.18-1.2.78-1.38 4.2-1.26 11.4-.96 15.66 1.56.54.3.72 1.02.42 1.56-.3.54-1.02.72-1.56.42z"/>
                </svg>
                <span>Hallgasd meg Spotify-on</span>
              </a>
            )}
          </div>

        </div>

        {/* --- 2. SZŰRŐK SÁV --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-white/10">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Összes Kiadvány</h3>
          
          <div className="flex flex-wrap gap-2">
            {(['all', 'full', 'mini', 'single', 'ost'] as AlbumFilter[]).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border backdrop-blur-md ${
                  filter === type
                    ? 'text-white border-transparent shadow-lg'
                    : 'bg-white/3 text-zinc-400 border-white/10 hover:bg-white/8 hover:text-white'
                }`}
                style={filter === type ? { backgroundColor: themeColor, boxShadow: `0 0 20px ${themeColor}70` } : {}}
              >
                {type === 'all' && 'Minden'}
                {type === 'full' && 'Stúdióalbum'}
                {type === 'mini' && 'Minialbum'}
                {type === 'single' && 'Kislemez'}
                {type === 'ost' && 'OST / Zene'}
              </button>
            ))}
          </div>
        </div>

        {/* --- 3. VÍZSZINTESEN LAPOZHATÓ SÁV ALUL --- */}
        <div className="relative w-full">
          <div 
            ref={scrollContainerRef}
            onMouseDown={(e) => handleDragStart(e.pageX)}
            onMouseMove={(e) => handleDragMove(e.pageX)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchStart={(e) => handleDragStart(e.touches[0].pageX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].pageX)}
            onTouchEnd={() => setIsDragging(false)}
            className={`flex items-center gap-4 sm:gap-6 overflow-x-auto pb-8 pt-4 px-3 custom-dynamic-scrollbar select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {filteredAlbums.map((album) => {
              const isSelected = album.id === currentFeatured.id;
              return (
                <div 
                  key={album.id}
                  onClick={() => handleSelectAlbum(album.id)}
                  className={`group shrink-0 w-64 sm:w-83 rounded-2xl p-3.5 sm:p-4 transition-all duration-300 relative flex flex-col justify-between backdrop-blur-xl border cursor-pointer hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${
                    isSelected ? 'scale-[1.02]' : ''
                  }`}
                  style={
                    isSelected 
                      ? { 
                          backgroundColor: `${themeColor}35`,
                          borderColor: themeColor,
                          boxShadow: `0 15px 40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.3), 0 0 30px ${themeColor}60`
                        }
                      : { 
                          backgroundColor: 'rgba(18, 18, 26, 0.85)',
                          backgroundImage: `linear-gradient(to bottom right, ${themeColor}12, rgba(12, 12, 18, 0.9))`,
                          borderColor: `${themeColor}40`,
                          boxShadow: `0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`
                        }
                  }
                >
                  {/* Album Borító Kép - JAVÍTVA: Optimalizált sizes */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-black/60 shadow-inner mb-3 sm:mb-4 border border-white/10">
                    {album.coverImage ? (
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        // JAVÍTÁS: Fixen nagyobb méretigény desktopon a crisp-tiszta megjelenésért
                        sizes="(max-width: 640px) 250px, 400px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600 text-xs">Nincs kép</div>
                    )}
                    
                    {/* Típus Badge */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider">
                      {getAlbumTypeBadgeLabel(album.type)}
                    </div>

                    {/* Kiválasztva Jelvény */}
                    {isSelected && (
                      <div 
                        className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-3.5 py-1.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider shadow-lg backdrop-blur-md"
                        style={{ backgroundColor: themeColor }}
                      >
                        Kiválasztva
                      </div>
                    )}
                  </div>

                  {/* Kártya alsó info rész */}
                  <div className="px-1 sm:px-2 pb-1 sm:pb-2">
                    <span className="text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                      {album.releaseDate}
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-white tracking-tight mb-1.5 sm:mb-2 truncate group-hover:text-zinc-200 transition-colors">
                      {album.title}
                    </h4>

                    {album.tracks && album.tracks.length > 0 && (
                      <p className="text-[11px] sm:text-xs text-zinc-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }} />
                        <span className="font-semibold text-zinc-200">{album.tracks.length} dal</span> a dallistán
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. Finom világító elválasztó fénycsík a szekció alján is */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${themeColor}, transparent)`,
          boxShadow: `0 0 20px ${themeColor}`
        }}
      />

    </section>
  );
}