/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { siteData, PortfolioItem } from './data/siteData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Services } from './components/Services';
import { SoulCinema } from './components/SoulCinema';
import { Portfolio } from './components/Portfolio';
import { PortfolioGallery } from './components/PortfolioGallery';
import { PhotographyGallery } from './components/PhotographyGallery';
import { FilmsGallery } from './components/FilmsGallery';
import { SelectedFilms } from './components/SelectedFilms';
import { Testimonials } from './components/Testimonials';
import { CtaSection } from './components/CtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [isPhotographyGalleryOpen, setIsPhotographyGalleryOpen] = useState(false);
  const [isFilmsGalleryOpen, setIsFilmsGalleryOpen] = useState(false);

  // Sync with URL hash / path for direct links and browser history
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;

      if (hash === '#films-gallery' || pathname === '/films') {
        setSelectedProject(null);
        setIsPhotographyGalleryOpen(false);
        setIsFilmsGalleryOpen(true);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      if (hash === '#photography-gallery' || pathname === '/photography') {
        setSelectedProject(null);
        setIsFilmsGalleryOpen(false);
        setIsPhotographyGalleryOpen(true);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      if (hash.startsWith('#portfolio/')) {
        const slug = hash.replace('#portfolio/', '');
        const found = siteData.portfolio.find((p) => p.slug === slug);
        if (found) {
          setIsPhotographyGalleryOpen(false);
          setIsFilmsGalleryOpen(false);
          setSelectedProject(found);
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      }

      if (hash === '#films') {
        setIsPhotographyGalleryOpen(false);
        setIsFilmsGalleryOpen(false);
        setSelectedProject(null);
        setTimeout(() => {
          const el = document.querySelector('#films');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        return;
      }

      if (hash === '#testimonials') {
        setIsPhotographyGalleryOpen(false);
        setIsFilmsGalleryOpen(false);
        setSelectedProject(null);
        setTimeout(() => {
          const el = document.querySelector('#testimonials');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        return;
      }

      if (hash === '#photography') {
        setIsPhotographyGalleryOpen(false);
        setIsFilmsGalleryOpen(false);
        setSelectedProject(null);
        setTimeout(() => {
          const el = document.querySelector('#photography');
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
        return;
      }

      if (hash === '#portfolio' || !hash.includes('/')) {
        setIsPhotographyGalleryOpen(false);
        setIsFilmsGalleryOpen(false);
        setSelectedProject(null);
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleSelectProject = (project: PortfolioItem) => {
    setIsPhotographyGalleryOpen(false);
    setIsFilmsGalleryOpen(false);
    setSelectedProject(project);
    window.location.hash = `#portfolio/${project.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setSelectedProject(null);
    window.location.hash = '#portfolio';
    setTimeout(() => {
      const el = document.querySelector('#portfolio');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleOpenPhotographyGallery = () => {
    setSelectedProject(null);
    setIsFilmsGalleryOpen(false);
    setIsPhotographyGalleryOpen(true);
    window.location.hash = '#photography-gallery';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromPhotographyGallery = () => {
    setIsPhotographyGalleryOpen(false);
    window.location.hash = '#photography';
    setTimeout(() => {
      const el = document.querySelector('#photography');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const handleOpenFilmsGallery = () => {
    setSelectedProject(null);
    setIsPhotographyGalleryOpen(false);
    setIsFilmsGalleryOpen(true);
    window.location.hash = '#films-gallery';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromFilmsGallery = () => {
    setIsFilmsGalleryOpen(false);
    window.location.hash = '#films';
    setTimeout(() => {
      const el = document.querySelector('#films');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  const handleNavigateHome = () => {
    setSelectedProject(null);
    setIsPhotographyGalleryOpen(false);
    setIsFilmsGalleryOpen(false);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F1EFEA] text-[#1E1E1C] selection:bg-[#B7A58C]/25 selection:text-[#1E1E1C]">
      {/* Global Navigation - Nav stays visible at the top */}
      <Navbar
        onNavigateHome={handleNavigateHome}
        isGalleryOpen={!!selectedProject || isPhotographyGalleryOpen || isFilmsGalleryOpen}
      />

      {/* Main Content: Single Story Gallery OR Photography Gallery OR Films Gallery OR Full Homepage */}
      {selectedProject ? (
        <main>
          <PortfolioGallery
            project={selectedProject}
            onBack={handleBackToMain}
            onSelectOtherProject={handleSelectProject}
          />
        </main>
      ) : isPhotographyGalleryOpen ? (
        <main>
          <PhotographyGallery
            onBack={handleBackFromPhotographyGallery}
          />
        </main>
      ) : isFilmsGalleryOpen ? (
        <main>
          <FilmsGallery
            onBack={handleBackFromFilmsGallery}
          />
        </main>
      ) : (
        <main>
          {/* 2. Hero */}
          <Hero onViewPortfolio={() => {
            const el = document.querySelector('#portfolio');
            el?.scrollIntoView({ behavior: 'smooth' });
          }} />

          {/* 3. Photography (8-photo grid & Explore More button) */}
          <Intro onExploreMore={handleOpenPhotographyGallery} />

          {/* 4. Services: Photography & Film */}
          <Services />

          {/* 5. Films Section (with Explore Films button) */}
          <SoulCinema onExploreFilms={handleOpenFilmsGallery} />

          {/* 6. Portfolio ("Sampling of Our Works") */}
          <Portfolio onSelectProject={handleSelectProject} />

          {/* 7. Watch - Selected Films Gallery */}
          <SelectedFilms />

          {/* 8. Pre-Footer Call to Action */}
          <CtaSection />

          {/* 9. Testimonials (Auto-Swipe, 5 Reviews) */}
          <Testimonials />

          {/* 10. Contact */}
          <ContactSection />
        </main>
      )}

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
