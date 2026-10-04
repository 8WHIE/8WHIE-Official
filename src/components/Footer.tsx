import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_INFO } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050505] text-[#F2F2F2] border-t border-white/[0.08] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/8whie-logo.svg"
                alt="8WHIE"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-3xl font-bold tracking-tight font-['Space_Grotesk'] text-[#F2F2F2]">
                8WHIE
              </span>
            </div>

            <p className="text-sm font-semibold tracking-widest text-[#B7FF00] font-['Space_Grotesk'] uppercase">
              {BRAND_INFO.primaryTagline}
            </p>

            <p className="text-xs text-[#929292] font-mono uppercase tracking-wider">
              {BRAND_INFO.supportingTagline}
            </p>
          </div>

          {/* Founder & Location Details */}
          <div className="md:col-span-4 space-y-2 text-xs font-mono text-[#929292]">
            <span className="text-white/40 block text-[10px] uppercase tracking-wider">
              OPERATIONAL DETAILS
            </span>
            <p>
              FOUNDER:{' '}
              <span className="text-[#F2F2F2] font-semibold">
                {BRAND_INFO.founder.toUpperCase()}
              </span>
            </p>
            <p>
              LOCATION:{' '}
              <span className="text-[#F2F2F2]">
                {BRAND_INFO.location.toUpperCase()}
              </span>
            </p>
            <p>
              EMAIL:{' '}
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="text-[#B7FF00] hover:underline"
              >
                {BRAND_INFO.email}
              </a>
            </p>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 space-y-2 text-xs font-mono">
            <span className="text-white/40 block text-[10px] uppercase tracking-wider">
              COMMUNITY CHANNELS
            </span>
            <ul className="space-y-2 text-[#929292]">
              <li>
                <a
                  href={BRAND_INFO.socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B7FF00] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND_INFO.socials.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B7FF00] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>YouTube</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND_INFO.socials.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B7FF00] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Telegram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={BRAND_INFO.socials.x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B7FF00] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>X</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Mission Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#929292]">
          <p>© 2026 8WHIE. ALL RIGHTS RESERVED.</p>
          <p className="text-[11px] text-white/40 tracking-wider">
            BUILT FOR LEARNING. DESIGNED FOR EXPLORATION.
          </p>
        </div>
      </div>
    </footer>
  );
};
