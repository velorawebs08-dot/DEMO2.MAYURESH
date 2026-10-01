import React from 'react';
import { siteData } from '../data/siteData';
import { FadeUp } from './FadeUp';

interface IntroProps {
  onExploreMore?: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onExploreMore }) => {
  return (
    <section id="photography" className="scroll-mt-20 md:scroll-mt-24 py-20 md:py-28 px-6 md:px-10 bg-[#F1EFEA]">
      <div className="max-w-[1180px] mx-auto">
        {/* UPPER SIDE: Heading & Short Description */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16 select-none">
          <FadeUp>
            <h2
              className="text-[#1E1E1C] text-xl sm:text-2xl md:text-3xl font-light uppercase tracking-[0.2em] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              PHOTOGRAPHY
            </h2>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="mt-5 text-xs sm:text-[13px] md:text-sm text-[#6B6860] font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              <p className="md:block">Mayuresh captures real emotions, quiet glances and big celebrations.</p>
              <p className="md:block mt-1">So years from now, you can return to your photographs and feel it all over again.</p>
            </div>
          </FadeUp>
        </div>

        {/* DOWN SIDE: 8 Images in 2 Elegant Rows (Present 4 + New 4 Below Them) */}
        <div className="mt-12 md:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 gap-y-8 md:gap-y-12 items-start">
            {siteData.intro.cards.map((card, idx) => {
              const rowIdx = Math.floor(idx / 4);
              const colIdx = idx % 4;
              const delay = 0.08 + colIdx * 0.06 + rowIdx * 0.12;

              return (
                <FadeUp key={`${card.label}-${idx}`} delay={delay}>
                  <a
                    href={card.link}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(card.link)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group block text-center"
                  >
                    {/* Image Container with delicate 1px border and refined hover */}
                    <div className="w-full aspect-[4/5] overflow-hidden rounded-[2px] bg-[#E8E5DE] border border-[#B7A58C]/25 transition-all duration-500 group-hover:border-[#1E1E1C]/40 group-hover:shadow-md">
                      <img
                        src={card.image}
                        alt={card.alt}
                        className="w-full h-full object-cover filter contrast-[0.99] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Under-Image Label */}
                    <span
                      className="block mt-3.5 text-[11px] uppercase tracking-[0.22em] text-[#1E1E1C] font-medium group-hover:text-[#B7A58C] transition-colors"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {card.label}
                    </span>
                  </a>
                </FadeUp>
              );
            })}
          </div>

          {/* Centered Outline Button Under Images */}
          <FadeUp delay={0.4}>
            <div className="mt-14 md:mt-16 text-center">
              <a
                href="#photography-gallery"
                onClick={(e) => {
                  e.preventDefault();
                  if (onExploreMore) {
                    onExploreMore();
                  } else {
                    window.location.hash = '#photography-gallery';
                  }
                }}
                className="inline-block px-8 py-3 rounded-none border border-[#1E1E1C]/40 text-[#1E1E1C] text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#1E1E1C] hover:text-[#F1EFEA] hover:border-[#1E1E1C] transition-all duration-300 cursor-pointer"
              >
                Explore More
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Thin Divider Line at Section Base */}
        <div className="mt-20 pt-4 border-b border-[#B7A58C]/20 w-full" />
      </div>
    </section>
  );
};
