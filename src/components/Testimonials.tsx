import React, { useState, useEffect, useRef, useCallback } from 'react';
import { siteData } from '../data/siteData';
import { FadeUp } from './FadeUp';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = siteData.testimonialsSection?.testimonials || siteData.testimonials;
  const total = testimonials.length;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchEndRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Navigate to next (normal switch, no fade effect)
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Navigate to prev (normal switch, no fade effect)
  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Navigate to specific index
  const goToIndex = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  // Auto-slide every 5 seconds (pauses on hover or touch)
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNext();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, goToNext, currentIndex]);

  // Touch Swipe Handling for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    if (e.touches[0]) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      touchEndRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchEndRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartRef.current.x - touchEndRef.current.x;
    const deltaY = Math.abs(touchStartRef.current.y - touchEndRef.current.y);

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    // Resume auto-slide after brief touch delay
    setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    }
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section
      id="testimonials"
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="What couples say"
      className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-28 md:py-32 px-5 sm:px-6 md:px-10 bg-[#F1EFEA] text-[#1E1E1C] relative border-t border-[#1E1E1C]/5 outline-none select-none"
    >
      <div className="max-w-[840px] mx-auto text-center">
        {/* Section Header */}
        <FadeUp delay={0}>
          <div className="relative mb-12 sm:mb-14 select-none">
            {/* Script line */}
            <span
              className="block text-[#9E896A] text-2xl sm:text-3xl font-normal lowercase tracking-normal mb-2.5"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              {siteData.testimonialsSection?.scriptKicker || 'kind words'}
            </span>

            {/* Heading in wide-spaced serif caps */}
            <h2
              className="text-[#1E1E1C] text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-[0.2em] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {siteData.testimonialsSection?.heading || 'WHAT COUPLES SAY'}
            </h2>
          </div>
        </FadeUp>

        {/* Carousel Container (Max-width 700px, min-height to prevent layout shift) */}
        <div className="max-w-[700px] mx-auto min-h-[220px] sm:min-h-[200px] md:min-h-[190px] flex flex-col justify-center items-center px-4">
          {/* Thin decorative quote mark above text */}
          <div
            className="text-3xl sm:text-4xl leading-none text-[#9E896A]/60 font-serif mb-3 select-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            aria-hidden="true"
          >
            “
          </div>

          {/* Testimonial Quote - Normal instant switch with NO fade effect */}
          <div>
            <blockquote className="my-2">
              <p
                className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#1E1E1C] font-light leading-relaxed max-w-[680px] mx-auto tracking-wide"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                “{current.quote || (current as any).text}”
              </p>
            </blockquote>

            {/* Author Name and Location/Place */}
            <div className="mt-5">
              <p
                className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium text-[#1E1E1C]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {current.name}
              </p>
              <p className="text-[11px] sm:text-xs text-[#6B6860] font-sans mt-1 font-light tracking-wider uppercase">
                {current.place || (current as any).location}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Controls: Previous Button, Dots, Next Button */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-4 sm:gap-6">
          {/* Previous Button */}
          <button
            type="button"
            onClick={goToPrev}
            className="w-10 h-10 rounded-full border border-[#1E1E1C]/25 hover:border-[#1E1E1C] hover:bg-[#1E1E1C] hover:text-[#F1EFEA] flex items-center justify-center text-[#1E1E1C] transition-all duration-200 cursor-pointer shadow-sm group/btn focus:outline-none"
            aria-label="Previous testimonial"
            title="Previous"
          >
            <span className="text-base font-serif transition-transform duration-200 group-hover/btn:-translate-x-0.5">
              ←
            </span>
          </button>

          {/* Dot Indicators */}
          <div
            className="flex items-center justify-center gap-1.5"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {testimonials.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={item.id || index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}: ${item.name}`}
                  onClick={() => goToIndex(index)}
                  className="w-7 h-7 flex items-center justify-center cursor-pointer group focus:outline-none"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-5 h-2 bg-[#1E1E1C]'
                        : 'w-2 h-2 bg-[#1E1E1C]/25 group-hover:bg-[#1E1E1C]/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={goToNext}
            className="w-10 h-10 rounded-full border border-[#1E1E1C]/25 hover:border-[#1E1E1C] hover:bg-[#1E1E1C] hover:text-[#F1EFEA] flex items-center justify-center text-[#1E1E1C] transition-all duration-200 cursor-pointer shadow-sm group/btn focus:outline-none"
            aria-label="Next testimonial"
            title="Next"
          >
            <span className="text-base font-serif transition-transform duration-200 group-hover/btn:translate-x-0.5">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
