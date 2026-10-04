import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { TechnicalCanvas } from './TechnicalCanvas';

interface FinalCTAProps {
  onContact: () => void;
  onExplore: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onContact, onExplore }) => {
  return (
    <section
      aria-label="Final Call to Action"
      className="relative py-28 sm:py-36 bg-[#070707] border-b border-white/[0.08] overflow-hidden text-center"
    >
      {/* Background technical canvas */}
      <TechnicalCanvas density="low" interactive={false} />
      <div className="absolute inset-0 bg-lab-grid pointer-events-none opacity-30" />

      {/* Dramatic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#B7FF00]/[0.03] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-4xl mx-auto px-6 z-10">
        <span className="text-xs font-mono tracking-widest text-[#B7FF00] uppercase mb-6 inline-block">
          // INITIATIVE HORIZON
        </span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] leading-[1.08] [text-wrap:balance]">
          READY TO EXPLORE?
        </h2>

        <p className="mt-6 text-lg sm:text-xl text-[#929292] font-['Inter'] max-w-xl mx-auto leading-relaxed">
          Let's build, research and understand what comes next.
        </p>

        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onContact}
            type="button"
            className="group inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-mono font-semibold tracking-wider text-[#070707] bg-[#F2F2F2] hover:bg-[#B7FF00] transition-all duration-200 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <span>CONTACT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={onExplore}
            type="button"
            className="group inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-mono font-semibold tracking-wider text-[#F2F2F2] hover:text-[#070707] bg-transparent hover:bg-[#F2F2F2] border border-white/20 hover:border-[#F2F2F2] transition-all duration-200 cursor-pointer"
          >
            <span>EXPLORE 8WHIE</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
