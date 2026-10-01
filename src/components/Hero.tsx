import React from 'react';
import { siteData } from '../data/siteData';

interface HeroProps {
  onViewPortfolio?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewPortfolio }) => {
  const handleScrollDown = () => {
    if (onViewPortfolio) {
      onViewPortfolio();
    } else {
      const el = document.querySelector('#photography') || document.querySelector('#portfolio');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen min-h-[640px] max-h-[1080px] flex items-center justify-center overflow-hidden bg-[#1A1A18]">
      {/* Background Video Container with Clean Cinematic Dark Scrim (No White Bottom Fade) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero_landscape.jpg"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.02]"
        >
          <source src={siteData.brand.heroVideo} type="video/mp4" />
          {/* Fallback image if video cannot be played */}
          <img
            src="/images/hero_landscape.jpg"
            alt="Cinematic editorial photography backdrop"
            className="w-full h-full object-cover object-center"
          />
        </video>

        {/* Clean cinematic dark scrim - strictly no white shade at bottom */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Hero Content: Script Line + Serif Title only */}
      <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center flex flex-col items-center justify-center pt-8">
        <div className="relative select-none">
          <span
            className="block text-[#F1EFEA] text-3xl sm:text-4xl md:text-5xl font-normal lowercase tracking-normal -mb-3 sm:-mb-5 z-20 relative opacity-95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            style={{ fontFamily: "'Pinyon Script', cursive" }}
          >
            {siteData.brand.scriptHeroAccent}
          </span>
          <h1
            className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.2em] leading-tight text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {siteData.brand.serifHeroTitle}
          </h1>
        </div>

        {/* Subtle scroll cue indicator */}
        <button
          onClick={handleScrollDown}
          className="absolute -bottom-24 sm:-bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-65 hover:opacity-100 transition-opacity focus:outline-none group cursor-pointer"
          aria-label="Scroll to content"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#F1EFEA] font-light mb-2">SCROLL</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#F1EFEA] to-transparent group-hover:h-10 transition-all duration-300" />
        </button>
      </div>
    </section>
  );
};
