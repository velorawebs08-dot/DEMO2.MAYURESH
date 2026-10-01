import React, { useState, useEffect } from 'react';
import { siteData } from '../data/siteData';

interface NavbarProps {
  onNavigateHome?: () => void;
  isGalleryOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, isGalleryOpen = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      // When near the top, HOME is actively in view
      if (scrollY < 200) {
        setActiveSection('home');
        return;
      }

      // Check section offsets to highlight active item
      const sections = ['contact', 'testimonials', 'films', 'storytelling', 'photography', 'home'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);

    if (href === '#home') {
      if (isGalleryOpen && onNavigateHome) {
        onNavigateHome();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (isGalleryOpen && onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When gallery is open or page is scrolled, use solid paper style
  const isSolid = scrolled || isGalleryOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
          isSolid
            ? 'bg-[#F1EFEA]/95 backdrop-blur-md border-b border-[#B7A58C]/25 text-[#1E1E1C] shadow-[0_1px_0_0_rgba(183,165,140,0.15)]'
            : 'bg-transparent text-white'
        }`}
      >
        <div className="max-w-[1080px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Left Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary navigation left">
            {siteData.navigation.left.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-opacity duration-300 hover:opacity-60 relative group ${
                    isSolid ? 'text-[#1E1E1C]' : 'text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`block h-[1px] transition-all duration-300 bg-current mt-1 ${
                      isActive ? 'w-full opacity-90' : 'w-0 group-hover:w-full opacity-40'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Center Brand Name / Logo */}
          <div className="text-center flex items-center justify-center">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#home');
              }}
              className="group flex flex-col items-center justify-center transition-opacity duration-300 hover:opacity-80 py-1"
              aria-label={siteData.brand.name}
            >
              <img
                src={siteData.brand.logo}
                alt={siteData.brand.name}
                className={`h-8 sm:h-9 md:h-10 w-auto max-w-[170px] sm:max-w-[200px] object-contain transition-all duration-300 ${
                  isSolid
                    ? 'brightness-0 opacity-90'
                    : 'brightness-0 invert opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
                }`}
              />
            </a>
          </div>

          {/* Right Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Primary navigation right">
            {siteData.navigation.right.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-opacity duration-300 hover:opacity-60 relative group ${
                    isSolid ? 'text-[#1E1E1C]' : 'text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`block h-[1px] transition-all duration-300 bg-current mt-1 ${
                      isActive ? 'w-full opacity-90' : 'w-0 group-hover:w-full opacity-40'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors focus:outline-none ${
                isSolid ? 'text-[#1E1E1C]' : 'text-white'
              }`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-6 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-[1px] transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-[7.5px] bg-[#1E1E1C]' : 'bg-current'
                  }`}
                />
                <span
                  className={`w-full h-[1px] transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-0 bg-[#1E1E1C]' : 'bg-current'
                  }`}
                />
                <span
                  className={`w-full h-[1px] transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-[7.5px] bg-[#1E1E1C]' : 'bg-current'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#F1EFEA] text-[#1E1E1C] flex flex-col justify-between px-8 py-10 transition-all duration-500 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#B7A58C]/20 pb-5">
          <img
            src={siteData.brand.logo}
            alt={siteData.brand.name}
            className="h-8 w-auto max-w-[150px] object-contain brightness-0 opacity-90"
          />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-[#1E1E1C] text-xs uppercase tracking-[0.2em] font-sans hover:opacity-60"
            aria-label="Close menu"
          >
            CLOSE
          </button>
        </div>

        <nav className="flex flex-col space-y-6 my-auto text-center py-8">
          {[...siteData.navigation.left, ...siteData.navigation.right].map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className={`font-serif text-2xl tracking-[0.18em] uppercase transition-colors relative inline-block mx-auto ${
                  isActive ? 'text-[#B7A58C] border-b border-[#B7A58C]/60 pb-1' : 'text-[#1E1E1C] hover:text-[#B7A58C]'
                }`}
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="border-t border-[#B7A58C]/20 pt-6 text-center text-xs text-[#6B6860]">
          <p className="font-serif-italic mb-1">{siteData.brand.tagline}</p>
          <p className="font-mono text-[10px] tracking-wider uppercase opacity-70">{siteData.contact.email}</p>
        </div>
      </div>
    </>
  );
};
