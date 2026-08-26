import React from 'react';

interface PlatformLogoProps {
  platform: string;
  className?: string;
}

export default function PlatformLogo({ platform, className = "" }: PlatformLogoProps) {
  const normalized = platform?.toLowerCase().trim();

  switch (normalized) {
    case 'netflix':
      return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900/90 border border-red-600/40 text-red-500 shadow-md backdrop-blur-md ${className}`}>
          {/* Netflix ikon SVG */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M5.103 0v24h3.794V9.614l5.358 14.386h4.642V0h-3.794v14.386L7.387 0H5.103z"/>
          </svg>
          <span className="text-xs font-bold tracking-wide uppercase">Netflix</span>
        </div>
      );

    case 'disney+':
    case 'disney plus':
      return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900/90 border border-blue-500/40 text-blue-400 shadow-md backdrop-blur-md ${className}`}>
          {/* Disney+ stílusú jelvény / szöveg */}
          <span className="text-xs font-black tracking-widest uppercase font-serif">Disney+</span>
        </div>
      );

    case 'tving':
      return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900/90 border border-rose-500/40 text-rose-500 shadow-md backdrop-blur-md ${className}`}>
          <span className="text-xs font-extrabold tracking-wider uppercase">TVING</span>
        </div>
      );

    default:
      return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-900/90 border border-amber-500/30 text-amber-400 shadow-md backdrop-blur-md ${className}`}>
          <span className="text-xs font-semibold">{platform || "Sorozat"}</span>
        </div>
      );
  }
}