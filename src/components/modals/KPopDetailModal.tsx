"use client";

import { useEffect, useState } from "react";
import { X, Users, Sparkles, ExternalLink, Check } from "lucide-react";
import { KPopGroupData, KPopMember } from "../../data/kpopData";

interface KPopDetailModalProps {
  group: KPopGroupData | null;
  onClose: () => void;
}

// Segédfüggvény a tagok adatainak biztonságos kinyerésére (string vagy objektum esetén is)
function parseMember(member: KPopMember): { name: string; role?: string; image?: string } {
  if (typeof member === "string") {
    return { name: member };
  }
  return member;
}

export default function KPopDetailModal({ group, onClose }: KPopDetailModalProps) {
  const [copied, setCopied] = useState(false);

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
      // Fallback ha a vágólap hozzáférés nem engedélyezett
    }
  };

  if (!group) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
      {/* Sötétített háttér kattintásos bezárással */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
      />

      {/* Modal Ablak */}
      <div className="relative w-full max-w-3xl bg-neutral-900 text-white rounded-4xl md:rounded-[40px] overflow-hidden border border-white/15 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] flex flex-col md:flex-row my-auto">
        
        {/* Bezáró gomb */}
        <button
          onClick={onClose}
          aria-label="Modal bezárása"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer group"
        >
          <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
        </button>

        {}
        {/* BAL OLDAL: Borítókép */}
        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-auto relative shrink-0 overflow-hidden bg-neutral-950 flex items-center justify-center min-h-80 md:min-h-115">
          {/* Lágyan elmosott háttérkép */}
          <img
            src={group.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40 pointer-events-none"
          />

          {/* Fő kép full object-cover-rel az álló 600x800-as képekhez */}
          <img
            src={group.image}
            alt={group.name}
            className="relative z-10 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />

          {/* Átmeneti sötétítő rétegek a hangulatos megjelenésért */}
          <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-black/20 md:bg-linear-to-r md:from-transparent md:via-neutral-900/20 md:to-neutral-900 pointer-events-none z-20" />
          
          <div className="absolute top-4 left-4 z-30 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-pink-400" />
            <span>K-POP GROUP</span>
          </div>
        </div>

        {/* JOBB OLDAL: Tartalom */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold tracking-widest text-pink-400 uppercase">
                {group.agency}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
                {group.name}
              </h2>
            </div>

            <p className="text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              {group.description || group.tagline}
            </p>

            {/* TAGOK LISTÁJA HOVERES KÉP POPOVERREL */}
            {group.membersList && group.membersList.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <div className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">
                  Tagok ({group.members})
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {group.membersList.map((rawMember, idx) => {
                    const member = parseMember(rawMember);

                    return (
                      <div key={idx} className="relative group/member">
                        {/* Tag pill / badge */}
                        <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-medium text-white/90 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer inline-flex items-center gap-1.5">
                          {member.name}
                          {member.role && (
                            <span className="text-[10px] text-pink-300 font-normal">
                              ({member.role})
                            </span>
                          )}
                        </span>

                        {/* Hover Tooltip Kép - Nagyméretű, részletgazdag popover (224x224px) */}
                        {member.image && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover/member:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-2 group-hover/member:translate-y-0 z-50">
                            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-white/30 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9)] bg-neutral-900 p-1 relative flex flex-col justify-end">
                              <img
                                src={member.image}
                                alt={member.name}
                                className="absolute inset-0 w-full h-full object-cover rounded-[22px]"
                              />
                              
                              {/* Címke a fotó alján névvel és szerepkörrel */}
                              <div className="relative z-10 p-3.5 bg-linear-to-t from-black/90 via-black/60 to-transparent rounded-b-[22px]">
                                <div className="text-sm font-extrabold text-white tracking-wide drop-shadow-md">
                                  {member.name}
                                </div>
                                {member.role && (
                                  <div className="text-[11px] text-pink-300 font-medium line-clamp-1 mt-0.5">
                                    {member.role}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Nyíl a kártya alján */}
                            <div className="w-3 h-3 bg-neutral-900 rotate-45 mx-auto -mt-2 border-r border-b border-white/30" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Info csempék */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                  Létszám
                </div>
                <div className="text-sm font-semibold text-white mt-0.5">
                  {group.members}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                  Ügynökség
                </div>
                <div className="text-sm font-semibold text-white mt-0.5 line-clamp-1">
                  {group.agency}
                </div>
              </div>
            </div>
          </div>

          {}
          {/* Alsó Akció gombok */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <a
              href={`#${group.id}`}
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