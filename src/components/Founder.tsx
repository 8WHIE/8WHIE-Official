import React, { useState, useRef } from 'react';
import { Mail, ArrowUpRight, MapPin, Camera, Check } from 'lucide-react';
import { BRAND_INFO } from '../data';

export const Founder: React.FC = () => {
  // First check localStorage for any direct user-uploaded photo, fallback to official public file, then vector
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('8whie_founder_photo');
      if (cached) return cached;
    }
    return '/images/aryan-profile.jpg';
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageError = () => {
    // If the jpg is not yet loaded, fallback smoothly to the high-fidelity photographic vector portrait
    setImgSrc('/images/aryan-profile.svg');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setImgSrc(base64);
        try {
          localStorage.setItem('8whie_founder_photo', base64);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);

          // Sync to server backend
          await fetch('/api/upload-founder-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: base64 }),
          });
        } catch (err) {
          console.error('Failed to sync founder photo to server:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section
      id="founder"
      aria-label="Founder Information"
      className="py-24 sm:py-32 bg-[#070707] border-b border-white/[0.08] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#B7FF00] uppercase mb-6">
          <span>02</span>
          <span className="text-white/20">/</span>
          <span>FOUNDER</span>
        </div>

        {/* Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Profile Visual Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              {/* Outer decorative framing */}
              <div className="absolute -inset-2 border border-white/[0.06] pointer-events-none" />
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#B7FF00]" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#B7FF00]" />

              <div className="relative aspect-[4/5] sm:aspect-[4/5] bg-[#0E0E0E] overflow-hidden border border-white/[0.12] shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                <img
                  src={imgSrc}
                  alt="Aryan Thakur — Founder of 8WHIE"
                  onError={handleImageError}
                  className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Subtle scrim & overlay tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-50 pointer-events-none" />

                {/* Corner Quick Photo Sync Control */}
                <div className="absolute top-3 right-3 z-20">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="founder-photo-upload"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Update or sync photo from device"
                    className="p-2 bg-black/60 hover:bg-[#B7FF00] text-white/70 hover:text-black transition-colors rounded backdrop-blur-sm border border-white/10 hover:border-[#B7FF00]"
                  >
                    {uploadSuccess ? (
                      <Check className="w-3.5 h-3.5 text-[#B7FF00] hover:text-black" />
                    ) : (
                      <Camera className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#F2F2F2] z-10 pointer-events-none">
                  <span className="text-[#B7FF00] font-semibold">ARYAN THAKUR</span>
                  <span className="text-[#929292]">FOUNDER // 8WHIE</span>
                </div>
              </div>

              {/* Status footer below image */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#929292]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#B7FF00]" />
                  {BRAND_INFO.location}
                </span>
                <span>RESEARCH &amp; SECURITY</span>
              </div>
            </div>
          </div>

          {/* Text Information Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F2F2F2] font-['Space_Grotesk'] leading-[1.1]">
              BEHIND 8WHIE
            </h2>

            <div className="mt-4 text-sm font-mono tracking-widest text-[#B7FF00] uppercase">
              FOUNDER // ARYAN THAKUR
            </div>

            <p className="mt-8 text-lg sm:text-xl text-[#F2F2F2] font-['Inter'] leading-relaxed">
              Aryan Thakur is the founder of 8WHIE, focused on cybersecurity, technology, ethical hacking education and digital experimentation.
            </p>

            <div className="mt-6 space-y-4 text-[#929292] text-base leading-relaxed font-['Inter']">
              <p>
                Working at the intersection of security research and educational pedagogy, Aryan established 8WHIE as an independent laboratory to examine systems deeply and share defensive knowledge openly.
              </p>
              <p>
                The focus remains grounded in clarity, technical rigor, and responsible exploration—helping learners and technologists build resilient mental models of modern networks and digital infrastructure.
              </p>
            </div>

            {/* Direct Connect & Social Bar */}
            <div className="mt-10 pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-6">
              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-semibold tracking-wider text-[#070707] bg-[#F2F2F2] hover:bg-[#B7FF00] transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>DIRECT EMAIL</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={BRAND_INFO.socials.x.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#929292] hover:text-[#F2F2F2] transition-colors flex items-center gap-1.5"
              >
                <span>X / @im_aryanthakur</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={BRAND_INFO.socials.telegram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#929292] hover:text-[#F2F2F2] transition-colors flex items-center gap-1.5"
              >
                <span>TELEGRAM / @Arnxkt</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
