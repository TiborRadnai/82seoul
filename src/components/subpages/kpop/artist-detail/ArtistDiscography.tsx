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

export default function ArtistDiscography({ albums, themeColor = '#ec4899' }: ArtistDiscographyProps) {
  const [filter, setFilter] = useState<AlbumFilter>('all');
  
  if (!albums || albums.length === 0) return null;

  const latestAlbum = albums[0];
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(latestAlbum.id);
  const featuredRef = useRef<HTMLDivElement>(null);

  const currentFeatured = albums.find((a) => a.id === selectedAlbumId) || latestAlbum;
  const isLatestSelected = currentFeatured.id === latestAlbum.id;

  const filteredAlbums = albums.filter((album) => {
    if (filter === 'all') return true;
    return album.type === filter;
  });

  const handleSelectAlbum = (albumId: string) => {
    setSelectedAlbumId(albumId);
    featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="w-full py-28 px-4 sm:px-8 lg:px-16 text-left relative overflow-hidden bg-[#07070a]">
      
      {/* 1. Finom, világító elválasztó fénycsík a szekció tetején */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${themeColor}, transparent)`,
          boxShadow: `0 0 20px ${themeColor}`
        }}
      />

      {/* 2. Dinamikus LED háttérfény a blokk mögött */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: themeColor }}
      />
      <div className="absolute top-2/3 right-10 w-100 h-100 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        
        {/* Szekció cím */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span 
              className="w-3 h-3 rounded-full shadow-[0_0_12px]" 
              style={{ backgroundColor: themeColor, boxShadow: `0 0 12px ${themeColor}` }}
            />
            <span 
              className="text-xs uppercase tracking-[0.4em] font-extrabold"
              style={{ color: themeColor }}
            >
              Diszkográfia & Hanganyagok
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.1)]">
            Albumok & <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${themeColor}, #a855f7)` }}>Megjelenések</span>
          </h2>
        </div>

        {/* --- 1. KIEMELT KÁRTYA --- */}
        <div 
          ref={featuredRef} 
          className="relative w-full rounded-3xl overflow-hidden bg-[#111116]/90 border backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-12 mb-24 scroll-mt-24 transition-all duration-500 items-center"
          style={{ borderColor: `${themeColor}40`, boxShadow: `0 20px 80px rgba(0,0,0,0.8), 0 0 30px ${themeColor}15` }}
        >
          
          {/* Bal oldal: Négyzetes / Tökéletesen igazított borítókép konténer */}
          <div className="relative lg:col-span-6 p-6 sm:p-10 flex items-center justify-center bg-black/40">
            <div className="relative w-full max-w-120 aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              {currentFeatured.coverImage ? (
                <Image
                  key={currentFeatured.id}
                  src={currentFeatured.coverImage}
                  alt={currentFeatured.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600">Nincs borítókép</div>
              )}
              
              {isLatestSelected && (
                <div 
                  className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/70 border backdrop-blur-md text-xs font-bold tracking-wider uppercase shadow-xl flex items-center gap-2 z-10"
                  style={{ borderColor: `${themeColor}60`, color: themeColor }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
                  Legfrissebb Megjelenés
                </div>
              )}
            </div>
          </div>

          {/* Jobb oldal: Album infók és magasabb tracklist */}
          <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span 
                  className="text-xs uppercase tracking-[0.3em] font-extrabold px-4 py-1.5 rounded-xl border"
                  style={{ backgroundColor: `${themeColor}15`, borderColor: `${themeColor}40`, color: themeColor }}
                >
                  {currentFeatured.type === 'full' ? 'Stúdióalbum' : currentFeatured.type === 'mini' ? 'Minialbum (EP)' : 'Kislemez'}
                </span>
                <span className="text-sm font-bold text-zinc-400">
                  {currentFeatured.releaseDate}
                </span>
              </div>

              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-6">
                {currentFeatured.title}
              </h3>

              {currentFeatured.tracks && currentFeatured.tracks.length > 0 && (
                <div className="mb-6">
                  <span className="block text-[11px] uppercase tracking-widest text-zinc-400 font-extrabold mb-3">
                    Dallista / Tracklist ({currentFeatured.tracks.length} dal)
                  </span>
                  <ul className="max-h-95 overflow-y-auto space-y-2.5 pr-2 custom-scrollbar border border-white/10 rounded-2xl p-3 bg-black/40 shadow-inner">
                    {currentFeatured.tracks.map((track, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-zinc-200 bg-white/5 px-4 py-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
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

            {/* Spotify Hivatalos Zöld Keretes Gomb Logóval */}
            {currentFeatured.spotifyUrl && (
              <a
                href={currentFeatured.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-[#1DB954] text-center transition-all flex items-center justify-center gap-3 border border-[#1DB954]/60 hover:bg-[#1DB954]/10 hover:scale-[1.01] active:scale-[0.99]"
                style={{ boxShadow: '0 0 25px rgba(29, 185, 84, 0.25)' }}
              >
                {/* Spotify SVG Logó */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.599-.12-.42.18-.78.6-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.66.24 1.08zm1.44-3.3c-.301.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.41-.48.18-1.02-.06-1.2-.54-.18-.48.06-1.02.54-1.2 4.2-1.26 9.6-.6 13.56 1.8.42.24.6.84.3 1.26zm.12-3.48C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.78-.18-.6.18-1.2.78-1.38 4.2-1.26 11.4-.96 15.66 1.56.54.3.72 1.02.42 1.56-.3.54-1.02.72-1.56.42z"/>
                </svg>
                <span>Hallgasd meg Spotify-on</span>
              </a>
            )}
          </div>

        </div>

        {/* --- 2. SZŰRŐK SÁV --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <h3 className="text-2xl font-black text-white tracking-tight">Összes Kiadvány</h3>
          
          <div className="flex flex-wrap gap-2">
            {(['all', 'full', 'mini', 'single'] as AlbumFilter[]).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  filter === type
                    ? 'text-white border-transparent shadow-lg'
                    : 'bg-white/3 text-zinc-400 border-white/10 hover:bg-white/8 hover:text-white'
                }`}
                style={filter === type ? { backgroundColor: themeColor, boxShadow: `0 0 15px ${themeColor}60` } : {}}
              >
                {type === 'all' && 'Minden'}
                {type === 'full' && 'Stúdióalbum'}
                {type === 'mini' && 'Minialbum'}
                {type === 'single' && 'Kislemez'}
              </button>
            ))}
          </div>
        </div>

        {/* --- 3. VÍZSZINTESEN LAPOZHATÓ SÁV ALUL --- */}
        <div className="relative w-full">
          <div className="flex items-center gap-6 overflow-x-auto pb-6 pt-2 px-2 custom-scrollbar snap-x snap-mandatory">
            {filteredAlbums.map((album) => {
              const isSelected = album.id === currentFeatured.id;
              return (
                <div 
                  key={album.id}
                  onClick={() => handleSelectAlbum(album.id)}
                  className={`group shrink-0 w-72 sm:w-80 rounded-3xl bg-[#121216] border overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 cursor-pointer snap-start ${
                    isSelected ? 'border-2 scale-[1.03]' : 'border-white/10 hover:border-white/30 opacity-75 hover:opacity-100'
                  }`}
                  style={isSelected ? { borderColor: themeColor, boxShadow: `0 10px 40px rgba(0,0,0,0.8), 0 0 20px ${themeColor}40` } : {}}
                >
                  <div className="relative aspect-square overflow-hidden bg-zinc-900">
                    {album.coverImage ? (
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">Nincs kép</div>
                    )}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white uppercase tracking-wider">
                      {album.type === 'full' ? 'Stúdió' : album.type === 'mini' ? 'Mini EP' : 'Single'}
                    </div>

                    {isSelected && (
                      <div 
                        className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-lg"
                        style={{ backgroundColor: themeColor }}
                      >
                        Kiválasztva
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                        {album.releaseDate}
                      </span>
                      <h4 className="text-xl font-black text-white tracking-tight mb-2 truncate">
                        {album.title}
                      </h4>

                      {album.tracks && album.tracks.length > 0 && (
                        <p className="text-xs text-zinc-400">
                          <span className="font-semibold" style={{ color: themeColor }}>{album.tracks.length} dal</span> a dallistán
                        </p>
                      )}
                    </div>
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