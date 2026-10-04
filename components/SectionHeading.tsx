import React from 'react';

interface SectionHeadingProps {
  label: string; // e.g. "01 / ABOUT"
  title: string; // e.g. "UNDERSTAND THE SYSTEM."
  description?: string;
  countLabel?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  description,
  countLabel,
  className = '',
}) => {
  return (
    <div className={`mb-12 sm:mb-16 ${className}`}>
      {/* Section Tag Kicker */}
      <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#B7FF00] uppercase mb-6">
        <span>{label}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] leading-[1.1] [text-wrap:balance]">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base sm:text-lg text-[#929292] max-w-2xl font-['Inter'] leading-relaxed [text-wrap:pretty]">
              {description}
            </p>
          )}
        </div>
        {countLabel && (
          <div className="text-xs font-mono text-[#929292] tracking-wider shrink-0">
            <span>{countLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};
