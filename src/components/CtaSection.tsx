import React from 'react';
import { siteData } from '../data/siteData';
import { FadeUp } from './FadeUp';

interface CtaSectionProps {
  onInquireClick?: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onInquireClick }) => {
  const handleInquire = () => {
    if (onInquireClick) {
      onInquireClick();
    } else {
      const el = document.querySelector('#contact');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-[#1A1A18] text-[#F1EFEA]">
      {/* Full-bleed Dark Background Video with Dark Scrim Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {siteData.cta.bgVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={siteData.cta.bgImage}
            className="w-full h-full object-cover object-center filter brightness-[0.5] contrast-[1.05]"
          >
            <source src={siteData.cta.bgVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={siteData.cta.bgImage}
            alt="Nocturnal stone villa courtyard with warm candlelights"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#1A1A18]/65 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-transparent to-[#1A1A18]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center flex flex-col items-center justify-center">
        <FadeUp>
          {/* Serif line with Script overlay */}
          <div className="relative mb-5 select-none">
            <h2
              className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-[0.2em] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {siteData.cta.serifHeading}
            </h2>
            <span
              className="block text-[#B7A58C] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal lowercase tracking-normal -mt-2 sm:-mt-3 md:-mt-4 relative z-10"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              {siteData.cta.scriptOverlay}
            </span>
          </div>

          <p className="max-w-md mx-auto text-xs sm:text-sm text-[#F1EFEA]/80 font-light tracking-wide mb-6">
            Dates for the upcoming wedding season are reserved on a first-confirmed basis.
          </p>

          {/* Thin Vertical Line */}
          <div className="w-[1px] h-10 bg-[#B7A58C]/50 mx-auto my-5" />

          {/* Ghost Button */}
          <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleInquire}
              className="px-9 py-3.5 rounded-full border border-[#F1EFEA] text-[#F1EFEA] text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300 hover:bg-[#F1EFEA] hover:text-[#1E1E1C]"
            >
              {siteData.cta.buttonText}
            </button>

            <a
              href={`https://wa.me/${siteData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(siteData.contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full border border-white/30 text-white/90 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:border-[#B7A58C] hover:text-white"
            >
              WHATSAPP CONCIERGE
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
