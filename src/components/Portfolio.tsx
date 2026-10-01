import React from 'react';
import { siteData, PortfolioItem } from '../data/siteData';
import { FadeUp } from './FadeUp';

interface PortfolioProps {
  onSelectProject: (project: PortfolioItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  return (
    <section id="portfolio" className="py-20 md:py-28 px-6 md:px-10 bg-[#F1EFEA]">
      <div className="max-w-[1060px] mx-auto">
        {/* Section Header */}
        <FadeUp>
          <div className="text-center relative max-w-xl mx-auto mb-14 select-none">
            <span
              className="block text-[#B7A58C] text-2xl sm:text-3xl font-normal lowercase tracking-normal -mb-3 sm:-mb-4 z-10 relative"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              selected stories
            </span>
            <h2
              className="text-[#1E1E1C] text-xl sm:text-2xl md:text-3xl font-light uppercase tracking-[0.18em] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              SAMPLING OF OUR WORKS
            </h2>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#6B6860] font-sans">
              Archival Weddings & Quiet Gatherings
            </p>
          </div>
        </FadeUp>

        {/* 4 Column Grid (2 columns on mobile) with original frames */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-start">
          {siteData.portfolio.map((item, idx) => {
            return (
              <FadeUp key={item.slug} delay={idx * 0.1}>
                <div
                  className="group cursor-pointer flex flex-col"
                  onClick={() => onSelectProject(item)}
                >
                  {/* Photo Container showing original uncropped image frame */}
                  <div className="w-full overflow-hidden rounded-[2px] bg-[#E8E5DE] border border-[#B7A58C]/20 relative">
                    <img
                      src={item.coverImage}
                      alt={item.names}
                      className="w-full h-auto block object-contain filter contrast-[0.98] transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-[0.98]"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>

                  {/* Under photo: only couple names */}
                  <div className="mt-3.5 border-b border-[#B7A58C]/20 pb-2">
                    <span
                      className="font-serif-italic text-base sm:text-lg text-[#1E1E1C] block truncate group-hover:text-[#B7A58C] transition-colors"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {item.names}
                    </span>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Note / Inquire Footer */}
        <div className="mt-16 text-center">
          <p className="font-serif-italic text-xs text-[#6B6860]">
            Extended wedding chronicles and printed portfolio lookbooks are presented upon request.
          </p>
        </div>
      </div>
    </section>
  );
};
