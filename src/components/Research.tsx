import React, { useState } from 'react';
import { RESEARCH_TOPICS } from '../data';
import { ShieldAlert, ChevronRight, Eye } from 'lucide-react';
import { ResearchTopic } from '../types';

export const Research: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<ResearchTopic>(RESEARCH_TOPICS[0]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="research"
      aria-label="Research Areas & Topics"
      className="py-24 sm:py-32 bg-[#070707] border-b border-white/[0.08] relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#B7FF00] uppercase mb-6">
          <span>04</span>
          <span className="text-white/20">/</span>
          <span>RESEARCH</span>
        </div>

        {/* Section Heading & Introduction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] leading-[1.1]">
              LOOK CLOSER.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#929292] max-w-2xl font-['Inter']">
              Systematic investigations into modern protocol vulnerabilities, cryptographic isolation, and defensive intelligence architectures.
            </p>
          </div>
          <div className="text-xs font-mono text-[#929292]">
            <span>8 RESEARCH TRACKS</span>
          </div>
        </div>

        {/* Mandatory Educational Disclaimer */}
        <div className="mb-12 p-4 sm:p-5 bg-[#0C0C0C] border-l-2 border-[#B7FF00] border-y border-r border-white/[0.08] flex items-center gap-3 sm:gap-4">
          <ShieldAlert className="w-5 h-5 text-[#B7FF00] shrink-0" />
          <p className="text-xs sm:text-sm font-mono text-[#F2F2F2] tracking-wide">
            <span className="text-[#B7FF00] font-bold">ETHICAL NOTICE: </span>
            All security content is intended for authorized, educational and defensive purposes.
          </p>
        </div>

        {/* Sophisticated Editorial Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {RESEARCH_TOPICS.map((topic, index) => {
            const isSelected = selectedTopic.id === topic.id;
            const isHovered = hoveredId === topic.id;

            return (
              <div
                key={topic.id}
                onMouseEnter={() => {
                  setHoveredId(topic.id);
                  setSelectedTopic(topic);
                }}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedTopic(topic)}
                className={`group relative p-6 bg-[#0B0B0B] border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected || isHovered
                    ? 'border-[#B7FF00] bg-[#121212]'
                    : 'border-white/[0.08] hover:border-white/20'
                }`}
              >
                <div>
                  {/* Topic Index */}
                  <div className="flex items-center justify-between font-mono text-xs text-[#929292] mb-6">
                    <span className="text-white/40">TRACK 0{index + 1}</span>
                    <span className={`transition-colors ${isSelected ? 'text-[#B7FF00]' : 'text-transparent group-hover:text-white/40'}`}>
                      ↗
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] mb-3">
                    {topic.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[#929292] font-['Inter'] leading-relaxed">
                    {topic.summary}
                  </p>
                </div>

                {/* Hover Reveal Vectors */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#929292]">
                  <div className="text-[#B7FF00] text-[10px] tracking-wider mb-1 uppercase">
                    Vectors Analyzed
                  </div>
                  <div className="truncate text-white/70">
                    {topic.vectors.join(' · ')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Topic Deep-Dive Readout Panel */}
        {selectedTopic && (
          <div className="mt-8 p-6 sm:p-8 bg-[#0D0D0D] border border-white/[0.12] transition-all">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono text-[#B7FF00] uppercase tracking-widest">
                  DEEP-DIVE ANALYSIS //
                </span>
                <h4 className="text-2xl font-bold text-[#F2F2F2] font-['Space_Grotesk'] mt-1">
                  {selectedTopic.title}
                </h4>
              </div>
              <div className="text-xs font-mono text-[#929292]">
                STATUS: CONTINUOUS REVISION
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
              <div className="lg:col-span-8">
                <p className="text-sm sm:text-base text-[#F2F2F2] leading-relaxed font-['Inter']">
                  {selectedTopic.deepDive}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-[#929292]">
                  <span className="text-[#B7FF00]">KEY FOCUS VECTORS:</span>
                  {selectedTopic.vectors.map((vec, idx) => (
                    <React.Fragment key={vec}>
                      <span className="text-white/80">{vec}</span>
                      {idx < selectedTopic.vectors.length - 1 && <span className="text-white/20">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 p-4 bg-[#070707] border border-white/[0.08] text-xs font-mono">
                <div className="text-[#B7FF00] font-semibold mb-2">DEFENSIVE POSTURE:</div>
                <p className="text-xs text-[#929292] font-sans leading-relaxed">
                  {selectedTopic.defensiveFocus}
                </p>
                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-[#929292]/70">
                  Laboratory Verification: ISO/IEC 27001 &amp; NIST Alignment
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
