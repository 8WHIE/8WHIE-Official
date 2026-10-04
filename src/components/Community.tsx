import React from 'react';
import { ArrowUpRight, Radio, Youtube, Instagram, Send, Twitter } from 'lucide-react';
import { BRAND_INFO } from '../data';

const SOCIAL_CARDS = [
  {
    platform: 'INSTAGRAM',
    handle: BRAND_INFO.socials.instagram.handle,
    url: BRAND_INFO.socials.instagram.url,
    description: 'Visual security breakdowns, lab updates, and bite-sized technical concepts.',
    metric: 'Visual Logbook',
    icon: Instagram,
  },
  {
    platform: 'YOUTUBE',
    handle: BRAND_INFO.socials.youtube.handle,
    url: BRAND_INFO.socials.youtube.url,
    description: 'In-depth tutorials, hands-on demonstrations, and defensive security walkthroughs.',
    metric: 'Technical Video',
    icon: Youtube,
  },
  {
    platform: 'TELEGRAM',
    handle: BRAND_INFO.socials.telegram.handle,
    url: BRAND_INFO.socials.telegram.url,
    description: 'Direct signals, research notes, tool releases, and immediate community dispatches.',
    metric: 'Instant Broadcast',
    icon: Send,
  },
  {
    platform: 'X',
    handle: BRAND_INFO.socials.x.handle,
    url: BRAND_INFO.socials.x.url,
    description: 'Real-time cybersecurity discourse, threat intelligence commentary, and tech thoughts.',
    metric: 'Micro-Dispatches',
    icon: Twitter,
  },
];

export const Community: React.FC = () => {
  return (
    <section
      id="community"
      aria-label="Community & Social Channels"
      className="py-24 sm:py-32 bg-[#070707] border-b border-white/[0.08] relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#B7FF00] uppercase mb-6">
          <span>06</span>
          <span className="text-white/20">/</span>
          <span>COMMUNITY</span>
        </div>

        {/* Heading & Text */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] leading-[1.1]">
            FOLLOW THE SIGNAL.
          </h2>

          <div className="mt-8 space-y-3 text-lg sm:text-xl text-[#929292] font-['Inter'] leading-relaxed">
            <p className="text-[#F2F2F2] font-medium">
              Cybersecurity is not learned alone.
            </p>
            <p className="text-base sm:text-lg">
              Follow 8WHIE for cybersecurity education, tutorials, research, experiments, tools and technology content.
            </p>
          </div>
        </div>

        {/* Large Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SOCIAL_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.platform}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-8 sm:p-10 bg-[#0C0C0C] border border-white/[0.1] hover:border-[#B7FF00] transition-all duration-300 flex flex-col justify-between min-h-[260px] cursor-pointer"
              >
                {/* Corner accent */}
                <div className="absolute top-3 right-3 text-[#929292] group-hover:text-[#B7FF00] transition-colors">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#929292] mb-6">
                    <Icon className="w-4 h-4 text-[#B7FF00]" />
                    <span className="uppercase tracking-widest">{card.platform}</span>
                    <span aria-hidden="true" className="text-white/20">·</span>
                    <span className="text-white/50">{card.metric}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#F2F2F2] group-hover:text-[#B7FF00] transition-colors font-['Space_Grotesk']">
                    {card.handle}
                  </h3>

                  <p className="mt-4 text-sm text-[#929292] font-['Inter'] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#929292]">
                  <span>CONNECT VIA {card.platform}</span>
                  <span className="text-[#B7FF00] group-hover:underline">OPEN CHANNEL ↗</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
