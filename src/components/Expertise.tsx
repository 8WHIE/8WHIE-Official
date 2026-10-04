import React, { useState } from 'react';
import { EXPERTISE_ITEMS } from '../data';
import { ArrowUpRight } from 'lucide-react';

export const Expertise: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <section
      id="expertise"
      aria-label="Areas of Expertise"
      className="py-24 sm:py-32 bg-[#070707] border-b border-white/[0.08] relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#B7FF00] uppercase mb-6">
          <span>03</span>
          <span className="text-white/20">/</span>
          <span>EXPERTISE</span>
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] leading-[1.1]">
              WHAT WE EXPLORE.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#929292] max-w-xl font-['Inter']">
              Core domains under continuous research, testing, and educational deconstruction.
            </p>
          </div>
          <div className="text-xs font-mono text-[#929292]">
            <span>6 OPERATIONAL DOMAINS</span>
          </div>
        </div>

        {/* 6 Interactive Expertise Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {EXPERTISE_ITEMS.map((item) => {
            const isExpanded = activeItem === item.number;
            return (
              <div
                key={item.number}
                onMouseEnter={() => setActiveItem(item.number)}
                onMouseLeave={() => setActiveItem(null)}
                className={`group relative p-8 bg-[#0C0C0C] border transition-all duration-300 flex flex-col justify-between min-h-[320px] ${
                  isExpanded ? 'border-[#B7FF00]/80 shadow-[0_0_30px_rgba(183,255,0,0.06)]' : 'border-white/[0.1] hover:border-white/25'
                }`}
              >
                {/* Subtle corner line */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-[1px] bg-white/20 group-hover:bg-[#B7FF00] transition-colors" />
                  <div className="absolute top-0 right-0 h-full w-[1px] bg-white/20 group-hover:bg-[#B7FF00] transition-colors" />
                </div>

                <div>
                  {/* Top Bar: Number + Tech Marker */}
                  <div className="flex items-center justify-between font-mono mb-8">
                    <span className="text-3xl sm:text-4xl font-bold text-[#929292]/50 group-hover:text-[#B7FF00] transition-colors">
                      {item.number}
                    </span>
                    <span className="text-[10px] tracking-widest text-[#929292] group-hover:text-[#F2F2F2] transition-colors uppercase">
                      SYSTEM // 0{item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] group-hover:text-[#F2F2F2]">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm text-[#929292] font-['Inter'] leading-relaxed group-hover:text-[#C4C4C4] transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Subdomains & Methodology (Unboxed text, no pills) */}
                <div className="mt-8 pt-6 border-t border-white/[0.08]">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#929292] font-mono">
                    {item.domains.map((dom, i) => (
                      <React.Fragment key={dom}>
                        <span className="hover:text-[#B7FF00] transition-colors">{dom}</span>
                        {i < item.domains.length - 1 && <span aria-hidden="true" className="text-white/20">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="mt-3 text-[11px] font-mono text-[#929292]/70">
                    <span className="text-[#B7FF00]/80">METHOD:</span> {item.methodology}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
