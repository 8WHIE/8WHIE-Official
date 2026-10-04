import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onReopenIntro?: () => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'ABOUT' },
  { id: 'expertise', label: 'EXPERTISE' },
  { id: 'research', label: 'RESEARCH' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'community', label: 'COMMUNITY' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onReopenIntro }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070707]/90 backdrop-blur-md border-b border-white/[0.08] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Wordmark & Logo */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('hero');
              }}
              className="group flex items-center gap-3 text-lg font-bold tracking-tight text-[#F2F2F2] hover:text-[#B7FF00] transition-colors font-['Space_Grotesk']"
              aria-label="8WHIE Home"
            >
              <img
                src="/images/8whie-logo.svg"
                alt="8WHIE"
                className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <span className="tracking-widest">8WHIE</span>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest text-[#929292]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`relative py-1 transition-colors hover:text-[#F2F2F2] whitespace-nowrap ${
                    isActive ? 'text-[#F2F2F2]' : 'text-[#929292]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#B7FF00]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions / Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Quick Action Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider text-[#070707] bg-[#F2F2F2] hover:bg-[#B7FF00] transition-colors cursor-pointer"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 text-[#F2F2F2] hover:text-[#B7FF00] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B7FF00]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-[#070707] flex flex-col justify-between p-8 md:hidden overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-3">
              <img
                src="/images/8whie-logo.svg"
                alt="8WHIE"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-xl font-bold tracking-widest text-[#F2F2F2] font-['Space_Grotesk']">
                8WHIE
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              type="button"
              className="p-2 text-[#929292] hover:text-[#F2F2F2] focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-6 py-12">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className="group flex items-baseline justify-between py-2 border-b border-white/[0.04]"
              >
                <span className="text-2xl font-bold tracking-wider text-[#F2F2F2] group-hover:text-[#B7FF00] transition-colors font-['Space_Grotesk']">
                  {item.label}
                </span>
                <span className="text-xs font-mono text-[#929292] group-hover:text-[#B7FF00]">
                  0{idx + 1} ↗
                </span>
              </a>
            ))}
          </nav>

          {/* Footer note inside mobile menu */}
          <div className="pt-6 border-t border-white/[0.08] text-xs text-[#929292] space-y-2">
            <p className="font-['Space_Grotesk'] text-[#F2F2F2] tracking-wider">
              EXPLORE. BREAK. SECURE.
            </p>
            <p>Patna, India · iaryan9905@gmail.com</p>
          </div>
        </div>
      )}
    </>
  );
};
