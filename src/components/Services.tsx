import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { siteData } from '../data/siteData';
import { FadeUp } from './FadeUp';

export const Services: React.FC = () => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Preload images to avoid flicker
  useEffect(() => {
    siteData.storytellingImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Auto crossfade between 4 images every 4 seconds
  useEffect(() => {
    if (!siteData.storytellingImages || siteData.storytellingImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % siteData.storytellingImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="storytelling" className="py-20 md:py-28 px-6 md:px-10 bg-[#C9B59C] transition-colors duration-300">
      <div className="max-w-[1040px] mx-auto">
        {/* Section Header */}
        <FadeUp>
          <div className="text-center relative max-w-xl mx-auto mb-14 md:mb-16 select-none">
            {/* Script line sticking closely to heading like in other sections */}
            <span
              className="block text-[#8C6D4C] text-2xl sm:text-3xl font-normal lowercase tracking-normal -mb-3 sm:-mb-4 z-10 relative"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              {siteData.storytelling.scriptKicker}
            </span>
            <h2
              className="text-[#1E1E1C] text-xl sm:text-2xl md:text-3xl font-light uppercase tracking-[0.18em] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {siteData.storytelling.heading}
            </h2>
          </div>
        </FadeUp>

        {/* 2-Column Layout: Mobile: image on top, text below | Desktop: text LEFT, image RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content (Text) */}
          <div className="order-2 lg:order-1 flex flex-col justify-center text-center lg:text-left">
            {/* Staggered Fade Up: Subtitle */}
            <FadeUp delay={0.05}>
              <h3
                className="text-2xl sm:text-3xl lg:text-[32px] text-[#1E1E1C] italic font-light leading-snug"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {siteData.storytelling.italicSubtitle}
              </h3>
            </FadeUp>

            {/* Staggered Fade Up (+0.15s): Paragraph */}
            <FadeUp delay={0.20}>
              <p className="mt-5 text-[#4E483F] text-sm sm:text-base leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
                {siteData.storytelling.paragraph}
              </p>
            </FadeUp>

            {/* Staggered Fade Up (+0.15s): Text Link */}
            <FadeUp delay={0.35}>
              <div className="mt-8">
                <a
                  href={siteData.storytelling.ctaLink}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(siteData.storytelling.ctaLink)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-block text-[11px] uppercase tracking-[0.22em] font-medium text-[#1E1E1C] pb-1 border-b border-[#1E1E1C]/40 hover:border-[#1E1E1C] hover:text-[#8C6D4C] transition-all"
                  style={{ fontVariant: 'small-caps' }}
                >
                  {siteData.storytelling.ctaText}
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right Image Frame: Mobile on top, Desktop on right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 w-full flex justify-center"
          >
            {/* Portrait Frame (aspect 4/5), 2px radius, soft shadow, no arrows/buttons/dots */}
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[2px] shadow-lg overflow-hidden bg-[#BFA88D] border border-[#8C6D4C]/25">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentImageIdx}
                  src={siteData.storytellingImages[currentImageIdx]}
                  alt={`Wedding storytelling moment ${currentImageIdx + 1}`}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Also export as Storytelling for clear naming
export const Storytelling = Services;
