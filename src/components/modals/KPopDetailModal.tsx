'use client';

import { useEffect, useState } from 'react';
import { X, Users, Sparkles, ExternalLink, Check, Heart, Mic2 } from 'lucide-react';

interface KPopDetailModalProps {
  group: any | null;
  onClose: () => void;
}

export default function KPopDetailModal({ group, onClose }: KPopDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [hoveredMember, setHoveredMember] = useState<any>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (group) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [group, onClose]);

  const handleShare = async () => {
    if (!group) return;
    const shareUrl = `${window.location.origin}#${group.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback vágólap esetén
    }
  };

  if (!group) return null;

  const isSolo = group.category === 'solo' || !group.members || group.members === '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
      />

      <div className="relative w-full max-w-4xl bg-neutral-900 text-white rounded-3xl md:rounded-4xl border border-white/15 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] flex flex-col md:flex-row my-auto overflow-hidden">
        
        <button
          onClick={onClose}
          aria-label="Modal bezárása"
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/60 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer group"
        >
          <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
        </button>

        {/* BAL OLDAL: Borítókép */}
        <div className="w-full md:w-5/12 h-64 sm:h-80 md:h-auto relative shrink-0 overflow-hidden bg-neutral-950 flex items-center justify-center">
          {group.image && (
            <>
              <img
                src={group.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40 pointer-events-none"
              />
              <img
                src={group.image}
                alt={group.name || "K-Pop Artist"}
                className="relative z-10 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-black/20 md:bg-linear-to-r md:from-transparent md:via-neutral-900/20 md:to-neutral-900 pointer-events-none z-20" />
          
          <div className="absolute top-4 left-4 z-30 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
            {isSolo ? (
              <>
                <Mic2 className="w-3.5 h-3.5 text-pink-400" />
                <span>K-POP SOLO</span>
              </>
            ) : (
              <>
                <Users className="w-3.5 h-3.5 text-pink-400" />
                <span>K-POP GROUP</span>
              </>
            )}
          </div>
        </div>

        {/* JOBB OLDAL: Tartalom */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex flex-col justify-between space-y-6 relative">
          
          {/* BIZTONSÁGOS HOVER TOOLTIP */}
          {hoveredMember?.image && (
            <div className="absolute top-6 right-6 z-50 w-40 h-52 sm:w-48 sm:h-60 rounded-2xl overflow-hidden border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-neutral-900 flex flex-col justify-end pointer-events-none">
              <img
                src={hoveredMember.image}
                alt={hoveredMember.name || "Member"}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
              <div className="relative z-10 p-3 space-y-0.5">
                <div className="text-xs sm:text-sm font-extrabold text-white tracking-wide drop-shadow">
                  {hoveredMember.name}
                </div>
                {hoveredMember.role && (
                  <p className="text-[10px] text-pink-300 font-medium leading-snug drop-shadow truncate">
                    {hoveredMember.role}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold tracking-widest text-pink-400 uppercase">
                {group.filterAgency || group.agency || ""}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-0.5">
                {group.name}
              </h2>
            </div>

            <p className="text-neutral-300 font-light text-sm leading-relaxed">
              {group.description || group.tagline || ""}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                  {isSolo ? "Státusz" : "Létszám"}
                </div>
                <div className="text-xs font-semibold text-white mt-0.5">
                  {isSolo ? "Solo Artist" : (group.members || "N/A")}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                  Ügynökség
                </div>
                <div className="text-xs font-semibold text-white mt-0.5 line-clamp-1">
                  {group.filterAgency || group.agency || "N/A"}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-pink-500/10 border border-pink-500/20 col-span-2 sm:col-span-1">
                <div className="text-[10px] font-bold tracking-wider uppercase text-pink-300 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-pink-400 fill-pink-400/30" />
                  <span>Fandom</span>
                </div>
                <div className="text-xs font-bold text-pink-200 mt-0.5 line-clamp-1">
                  {group.fandom || "Nincs megadva"}
                </div>
              </div>
            </div>

            {!isSolo && Array.isArray(group.membersList) && group.membersList.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">
                  Tagok ({group.members || group.membersList.length})
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {group.membersList.map((member: any, idx: number) => {
                    const primaryRole = member?.role ? member.role.split(',')[0].trim() : null;

                    return (
                      <div 
                        key={idx}
                        onMouseEnter={() => setHoveredMember(member)}
                        onMouseLeave={() => setHoveredMember(null)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer flex items-center justify-between text-xs gap-2 min-w-0"
                      >
                        <span className="font-semibold text-white/90 shrink-0">
                          {member?.name || "Member"}
                        </span>
                        
                        {primaryRole && (
                          <span 
                            className="text-[10px] text-pink-300 font-medium bg-pink-500/15 border border-pink-500/20 px-2 py-0.5 rounded-md truncate min-w-0 max-w-27.5"
                            title={primaryRole}
                          >
                            {primaryRole}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <a
              href={`/kpop/${group.id}`}
              onClick={onClose}
              className="flex-1 py-3.5 px-6 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>Teljes Profil</span>
            </a>

            <button 
              onClick={handleShare}
              aria-label="Megosztás"
              title="Hivatkozás másolása"
              className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all duration-300 cursor-pointer relative"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <ExternalLink className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}