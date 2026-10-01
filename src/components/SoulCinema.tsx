import React from 'react';
import { siteData } from '../data/siteData';
import { FadeUp } from './FadeUp';

interface SoulCinemaProps {
  onExploreFilms?: () => void;
}

export const SoulCinema: React.FC<SoulCinemaProps> = ({ onExploreFilms }) => {
  const { soulCinema, filmsVideo } = siteData;

  return (
    <section
      id="films"
      className="scroll-mt-20 md:scroll-mt-24 relative min-h-screen py-32 px-6 md:px-10 overflow-hidden flex items-center justify-center text-[#F5F0E8] select-none"
      style={{ clipPath: 'inset(0)' }}
    >
      {/* Desktop: Fixed video background staying locked in place while content scrolls */}
      <div className="hidden md:block fixed inset-0 w-full h-full pointer-events-none z-0">
        <video
          src={filmsVideo}
          poster={soulCinema.posterImage}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Mobile: Seamless fallback video container for iOS/Android */}
      <div className="block md:hidden absolute inset-0 w-full h-full pointer-events-none z-0">
        <video
          src={filmsVideo}
          poster={soulCinema.posterImage}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-[1040px] mx-auto w-full text-center">
        {/* Section Header */}
        <FadeUp delay={0}>
          <div className="text-center relative max-w-xl mx-auto mb-6">
            {/* Script line with 8-12px gap so it doesn't overlap heading */}
            <span
              className="block text-[#D4C2AA] text-2xl sm:text-3xl font-normal lowercase tracking-normal mb-2.5 z-10 relative"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              {soulCinema.scriptKicker}
            </span>
            <h2
              className="text-[#F5F0E8] text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-[0.2em] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {soulCinema.heading}
            </h2>
          </div>
        </FadeUp>

        {/* Narrative Paragraph */}
        <FadeUp delay={0.15}>
          <p className="mt-4 text-[#F5F0E8]/90 text-sm sm:text-base leading-relaxed font-light max-w-[560px] mx-auto tracking-wide">
            {soulCinema.paragraph}
          </p>
        </FadeUp>

        {/* 4 Points in one centered horizontal row (wraps into 2 lines on mobile) */}
        <FadeUp delay={0.30}>
          <div
            className="mt-10 md:mt-12 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-y-2 md:gap-y-0 text-[#F5F0E8] font-light italic leading-snug tracking-wide text-sm sm:text-base md:text-lg"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {/* Mobile Line 1 (Points 1 & 2) */}
            <div className="flex items-center justify-center">
              <span className="whitespace-nowrap">{soulCinema.points[0]?.title}</span>
              <span className="mx-3 sm:mx-4 text-[#F5F0E8]/40 select-none font-normal not-italic">
                |
              </span>
              <span className="whitespace-nowrap">{soulCinema.points[1]?.title}</span>
            </div>

            {/* Middle separator: hidden on mobile line break, visible on desktop */}
            <span className="hidden md:inline-block mx-4 lg:mx-5 text-[#F5F0E8]/40 select-none font-normal not-italic">
              |
            </span>

            {/* Mobile Line 2 (Points 3 & 4) */}
            <div className="flex items-center justify-center">
              <span className="whitespace-nowrap">{soulCinema.points[2]?.title}</span>
              <span className="mx-3 sm:mx-4 text-[#F5F0E8]/40 select-none font-normal not-italic">
                |
              </span>
              <span className="whitespace-nowrap">{soulCinema.points[3]?.title}</span>
            </div>
          </div>
        </FadeUp>

        {/* Action Buttons: Explore Films & BOOK YOUR DATE */}
        <FadeUp delay={0.45}>
          <div className="mt-12 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
            <a
              href="#films-gallery"
              onClick={(e) => {
                e.preventDefault();
                if (onExploreFilms) {
                  onExploreFilms();
                } else {
                  window.location.hash = '#films-gallery';
                }
              }}
              className="inline-block px-8 py-3 rounded-none border border-[#F5F0E8]/40 text-[#F5F0E8] text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#F5F0E8] hover:text-[#1E1E1C] hover:border-[#F5F0E8] transition-all duration-300 cursor-pointer"
            >
              Explore Films
            </a>

            <a
              href={soulCinema.ctaLink}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(soulCinema.ctaLink)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block text-[11px] uppercase tracking-[0.24em] font-medium text-[#F5F0E8] pb-1 border-b border-[#F5F0E8]/50 hover:border-[#F5F0E8] hover:text-[#D4C2AA] transition-all"
              style={{ fontVariant: 'small-caps' }}
            >
              {soulCinema.ctaText}
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
