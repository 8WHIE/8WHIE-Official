/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Intro } from './components/Intro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Founder } from './components/Founder';
import { Expertise } from './components/Expertise';
import { Research } from './components/Research';
import { Projects } from './components/Projects';
import { Community } from './components/Community';
import { Contact } from './components/Contact';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for navigation indicator
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'founder', 'expertise', 'research', 'projects', 'community', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation & accessibility
  const handleScrollTo = (sectionId: string) => {
    setShowIntro(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterSite = () => {
    setShowIntro(false);
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#F2F2F2] selection:bg-[#B7FF00]/30 selection:text-[#F2F2F2]">
      {/* Intro Screen */}
      <Intro
        isOpen={showIntro}
        onEnter={handleEnterSite}
      />

      {/* Main Website Structure */}
      <div className={`transition-opacity duration-700 ${showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Navbar
          activeSection={activeSection}
          onNavigate={handleScrollTo}
          onReopenIntro={() => setShowIntro(true)}
        />

        <main id="main-content">
          <Hero
            onExplore={() => handleScrollTo('about')}
            onContact={() => handleScrollTo('contact')}
          />

          <About />

          <Founder />

          <Expertise />

          <Research />

          <Projects
            onContact={() => handleScrollTo('contact')}
          />

          <Community />

          <Contact />

          <FinalCTA
            onContact={() => handleScrollTo('contact')}
            onExplore={() => handleScrollTo('about')}
          />
        </main>

        <Footer
          onNavigate={handleScrollTo}
        />
      </div>
    </div>
  );
}
