"use client";

import { useEffect, useState } from "react";
import { X, Users, Sparkles, ExternalLink, Check, Heart } from "lucide-react";
import { KPopGroupData, KPopMember } from "../../data/kpopData";

interface KPopDetailModalProps {
  group: KPopGroupData | null;
  onClose: () => void;
}

// Segédfüggvény a tagok adatainak kinyerésére
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
      // Fallback vágólap esetén
    }
  };

  if (!group) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
      {/* Sötétített háttér */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
      />

      {/* Modal Ablak */}
      <div className="relative w-full max-w-4xl bg-neutral-900 text-white rounded-3xl md:rounded-4xl border border-white/15 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.8)] z-10 max-h-[90vh] flex flex-col md:flex-row my-auto overflow-hidden">
        
        {/* Bezáró gomb */}
        <button
          onClick={onClose}
          aria-label="Modal bezárása"
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/60 hover:bg-white hover:text-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-lg cursor-pointer group"
        >
          <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
        </button>

        {/* BAL OLDAL: Borítókép */}
        <div className="w-full md:w-5/12 h-64 sm:h-80 md:h-auto relative shrink-0 overflow-hidden bg-neutral-950 flex items-center justify-center">
          <img
            src={group.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40 pointer-events-none"
          />

          <img
            src={group.image}
            alt={group.name}
            className="relative z-10 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-black/20 md:bg-linear-to-r md:from-transparent md:via-neutral-900/20 md:to-neutral-900 pointer-events-none z-20" />
          
          <div className="absolute top-4 left-4 z-30 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-pink-400" />
            <span>K-POP GROUP</span>
          </div>
        </div>

        {/* JOBB OLDAL: Tartalom */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold tracking-widest text-pink-400 uppercase">
                {group.agency}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-0.5">
                {group.name}
              </h2>
            </div>

            <p className="text-neutral-300 font-light text-sm leading-relaxed">
              {group.description || group.tagline}
            </p>

            {/* INFO CSEMPÉK */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                  Létszám
                </div>
                <div className="text-xs font-semibold text-white mt-0.5">
                  {group.members}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-bold tracking-wider uppercase text-neutral-400">
                  Ügynökség
                </div>
                <div className="text-xs font-semibold text-white mt-0.5 line-clamp-1">
                  {group.agency}
                </div>
              </div>

              {/* FANDOM CSEMPEM */}
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

            {/* TAGOK LISTÁJA */}
            {group.membersList && group.membersList.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">
                  Tagok ({group.members})
                </div>
                
                {/* 2 Oszlopos rács */}
                <div className="grid grid-cols-2 gap-2">
                  {group.membersList.map((rawMember, idx) => {
                    const member = parseMember(rawMember);
                    const isLeftColumn = idx % 2 === 0;

                    // Csak az elsődleges fő szerepkört vesszük ki (pl. "Leader, Main Dancer" -> "Leader")
                    const primaryRole = member.role ? member.role.split(',')[0].trim() : null;

                    return (
                      <div key={idx} className="relative group/member">
                        {/* Tag gomb / pill - A NÉV a fontosabb, a SZEREPKÖR rövidül, ha nem fér el */}
                        <div className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer flex items-center justify-between text-xs gap-2 min-w-0">
                          
                          {/* NÉV: Teljesen kiírva, nem nyomódik össze (shrink-0) */}
                          <span className="font-semibold text-white/90 shrink-0">
                            {member.name}
                          </span>
                          
                          {/* SZEREPKÖR: Ha a név túl hosszú, a szerepkör kap 3 pontot a végére (truncate min-w-0) */}
                          {primaryRole && (
                            <span 
                              className="text-[10px] text-pink-300 font-medium bg-pink-500/15 border border-pink-500/20 px-2 py-0.5 rounded-md truncate min-w-0 max-w-27.5"
                              title={primaryRole}
                            >
                              {primaryRole}
                            </span>
                          )}
                        </div>

                        {/* HOVER TOOLTIP KÉP */}
                        {member.image && (
                          <div 
                            className={`absolute bottom-full mb-3 opacity-0 group-hover/member:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-2 group-hover/member:translate-y-0 z-50 ${
                              isLeftColumn ? "left-0" : "right-0"
                            }`}
                          >
                            <div className="w-52 h-64 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border border-white/20 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9)] bg-neutral-900 relative flex flex-col justify-end group/card">
                              
                              {/* 1. Teljes kártyás kép */}
                              <img
                                src={member.image}
                                alt={member.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                              />
                              
                              {/* 2. FINOM, LÁGY SZÍNÁTMENETES SÖTÉTÍTÉS (Gradiens a kép alján) */}
                              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

                              {/* 3. Szöveges tartalom lágyan a gradiensre ültetve */}
                              <div className="relative z-10 p-4 space-y-0.5">
                                <div className="text-sm font-extrabold text-white tracking-wide drop-shadow-md">
                                  {member.name}
                                </div>
                                
                                {member.role && (
                                  <p className="text-[11px] text-pink-300 font-medium leading-snug wrap-break-word drop-shadow">
                                    {member.role}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Nyíl a kártya alján */}
                            <div className={`w-3 h-3 bg-neutral-900 rotate-45 -mt-1.5 border-r border-b border-white/20 ${
                              isLeftColumn ? "ml-6" : "ml-auto mr-6"
                            }`} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

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