import React from 'react';
import { siteData } from '../data/siteData';

interface FooterProps {
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome }) => {
  const handleScroll = (href: string) => {
    if (onNavigateHome) {
      onNavigateHome();
    }
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-[#1A1A18] text-[#F1EFEA] pt-16 pb-14 px-6 md:px-10 border-t border-white/10">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group mb-2"
              aria-label={siteData.brand.name}
            >
              <img
                src={siteData.brand.logo}
                alt={siteData.brand.name}
                className="h-9 sm:h-10 w-auto max-w-[190px] object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </a>
            <p className="font-serif-italic text-xs sm:text-sm text-[#F1EFEA]/70 mt-1 max-w-sm">
              {siteData.brand.tagline}
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-6 sm:gap-8" aria-label="Footer navigation">
            {[...siteData.navigation.left, ...siteData.navigation.right].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll(item.href);
                }}
                className="text-[10px] uppercase tracking-[0.22em] text-[#F1EFEA]/80 hover:text-[#B7A58C] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Icons (Instagram, YouTube, Facebook) */}
          <div className="flex items-center space-x-6">
            {/* Instagram */}
            <a
              href={siteData.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F1EFEA]/70 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href={siteData.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F1EFEA]/70 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={siteData.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F1EFEA]/70 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Line & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#F1EFEA]/50 font-sans tracking-widest uppercase">
          <p>© {new Date().getFullYear()} {siteData.brand.name}. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 sm:mt-0 font-serif-italic lowercase tracking-normal text-xs text-[#B7A58C]">
            crafted with stillness & analog reverence
          </p>
        </div>
      </div>
    </footer>
  );
};
