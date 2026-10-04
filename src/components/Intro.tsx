import React, { useState, useEffect } from 'react';
import { TechnicalCanvas } from './TechnicalCanvas';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { BRAND_INFO } from '../data';

interface IntroProps {
  onEnter: () => void;
  isOpen: boolean;
}

export const Intro: React.FC<IntroProps> = ({ onEnter, isOpen }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (!isOpen) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20) {
        onEnter();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchCurrentY = e.touches[0].clientY;
      if (touchStartY - touchCurrentY > 40) {
        onEnter();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter') {
        onEnter();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onEnter]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="8WHIE Introduction Screen"
      className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#070707] text-[#F2F2F2] overflow-hidden transition-all duration-700 ease-out"
    >
      {/* Background technical canvas */}
      <TechnicalCanvas density="normal" interactive={true} />

      {/* Subtle fine grid & scanlines */}
      <div className="absolute inset-0 bg-lab-grid pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-20" />

      {/* Top minimal status bar */}
      <div className="w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center z-10 text-xs tracking-widest text-[#929292] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF00] animate-pulse" />
          <span>8WHIE LAB // ACTIVE</span>
        </div>
        <div className="hidden sm:block text-right">
          <span>{BRAND_INFO.location.toUpperCase()}</span>
        </div>
      </div>

      {/* Center cinematic typography */}
      <div
        className={`w-full max-w-4xl px-6 text-center z-10 flex flex-col items-center justify-center transition-all duration-1000 ${
          mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Monogram / Logo Mark */}
        <div className="mb-6 flex items-center justify-center">
          <img
            src="/images/8whie-logo.svg"
            alt="8WHIE Logo"
            className="h-14 w-auto max-w-[220px] object-contain drop-shadow-[0_0_20px_rgba(183,255,0,0.15)]"
            onError={(e) => {
              // Graceful fallback to typography
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Large center typography */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] leading-none select-none">
          8WHIE
        </h1>

        {/* Primary tagline */}
        <p className="mt-6 text-base sm:text-lg md:text-xl font-semibold tracking-[0.25em] text-[#F2F2F2] font-['Space_Grotesk']">
          EXPLORE. BREAK. SECURE.
        </p>

        {/* Supporting tagline */}
        <p className="mt-3 text-xs sm:text-sm font-medium tracking-[0.2em] text-[#929292] uppercase font-['Inter']">
          {BRAND_INFO.supportingTagline}
        </p>

        {/* CTA Button: ENTER ↗ */}
        <div className="mt-10 sm:mt-12">
          <button
            onClick={onEnter}
            type="button"
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-semibold tracking-widest text-[#070707] bg-[#F2F2F2] hover:bg-[#B7FF00] rounded-none transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(183,255,0,0.4)] cursor-pointer"
          >
            <span>ENTER</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            {/* Corner accents */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#B7FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#B7FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center z-10 text-xs tracking-widest text-[#929292] gap-4">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#929292]/70">
          <span>FOUNDER: {BRAND_INFO.founder.toUpperCase()}</span>
        </div>

        <button
          onClick={onEnter}
          type="button"
          className="group inline-flex items-center gap-2 text-xs font-mono text-[#929292] hover:text-[#B7FF00] transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:text-[#B7FF00]" />
        </button>
      </div>
    </div>
  );
};
