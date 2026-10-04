import React from 'react';
import { ArrowDown, ArrowUpRight, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { TechnicalCanvas } from './TechnicalCanvas';
import { BRAND_INFO } from '../data';

interface HeroProps {
  onExplore: () => void;
  onContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onContact }) => {
  return (
    <section
      id="hero"
      aria-label="Introduction & Mission"
      className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-[#070707] border-b border-white/[0.08]"
    >
      {/* Background canvas & architectural grid */}
      <TechnicalCanvas density="normal" interactive={true} />
      <div className="absolute inset-0 bg-lab-grid pointer-events-none opacity-40" />

      {/* Subtle radial ambient highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#B7FF00]/[0.025] blur-[140px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 w-full z-10">
        {/* Lab Status Kicker (clean typography, no pill badges) */}
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-mono text-[#929292] mb-8">
          <span className="inline-block w-2 h-2 rounded-full bg-[#B7FF00]" />
          <span>CYBERSECURITY &amp; TECHNOLOGY LABORATORY</span>
          <span aria-hidden="true" className="text-white/20">/</span>
          <span>EST. PATNA, IN</span>
        </div>

        {/* Main Editorial Headings */}
        <div className="max-w-5xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] leading-[1.05] [text-wrap:balance]">
            THE DIGITAL WORLD <br className="hidden sm:inline" />
            IS BUILT ON CODE.
          </h1>

          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#929292] font-['Space_Grotesk'] leading-[1.1] [text-wrap:balance]">
            WE LEARN TO <span className="text-[#F2F2F2] font-semibold underline decoration-[#B7FF00]/40 decoration-2 underline-offset-8">UNDERSTAND IT</span>.
          </h2>
        </div>

        {/* Description */}
        <p className="mt-8 sm:mt-10 max-w-2xl text-base sm:text-lg md:text-xl text-[#929292] font-['Inter'] leading-relaxed [text-wrap:pretty]">
          8WHIE is a cybersecurity and technology platform exploring ethical hacking,
          digital security, research and the systems that shape the modern internet.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
          <button
            onClick={onExplore}
            type="button"
            className="group relative inline-flex items-center gap-3 px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-[#070707] bg-[#F2F2F2] hover:bg-[#B7FF00] transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          >
            <span>EXPLORE 8WHIE</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            onClick={onContact}
            type="button"
            className="group inline-flex items-center gap-3 px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider text-[#F2F2F2] hover:text-[#070707] bg-transparent hover:bg-[#F2F2F2] border border-white/20 hover:border-[#F2F2F2] transition-all duration-200 cursor-pointer"
          >
            <span>CONTACT</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Key Operational Pillars (Subtle hairline row) */}
        <div className="mt-20 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-xs text-[#929292]">
          <div className="flex items-start gap-3">
            <span className="font-mono text-[#B7FF00] font-bold">01</span>
            <div>
              <p className="font-semibold text-[#F2F2F2] tracking-wider uppercase">Independent Research</p>
              <p className="mt-1 text-xs text-[#929292] leading-normal">
                Controlled experiments in software architecture, network telemetry, and defensive posture.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="font-mono text-[#B7FF00] font-bold">02</span>
            <div>
              <p className="font-semibold text-[#F2F2F2] tracking-wider uppercase">Ethical Standards</p>
              <p className="mt-1 text-xs text-[#929292] leading-normal">
                Dedicated exclusively to authorized, educational and defensive technical methodologies.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="font-mono text-[#B7FF00] font-bold">03</span>
            <div>
              <p className="font-semibold text-[#F2F2F2] tracking-wider uppercase">Open Knowledge</p>
              <p className="mt-1 text-xs text-[#929292] leading-normal">
                Synthesizing deep cybersecurity concepts into structured educational insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
