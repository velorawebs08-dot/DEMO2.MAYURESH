import React, { useState, useEffect, useCallback } from 'react';
import { siteData } from '../data/siteData';
import { FadeUp } from './FadeUp';

interface PhotographyGalleryProps {
  onBack: () => void;
}

export const PhotographyGallery: React.FC<PhotographyGalleryProps> = ({ onBack }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = siteData.photographyGallery.shuffledPhotos;

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? photos.length - 1 : prev - 1;
    });
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === photos.length - 1 ? 0 : prev + 1;
    });
  }, [photos.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-32 px-6 md:px-10 bg-[#F1EFEA] min-h-screen">
      <div className="max-w-[1240px] mx-auto">
        {/* Back Link */}
        <div className="mb-8 sm:mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#6B6860] hover:text-[#1E1E1C] transition-colors font-medium group cursor-pointer focus:outline-none"
            aria-label="Back to Photography section"
          >
            <span className="mr-2.5 transition-transform duration-300 group-hover:-translate-x-1 font-serif text-sm">
              ←
            </span>
            Back
          </button>
        </div>

        {/* Section Context Header */}
        <div className="text-center max-w-[650px] mx-auto mb-14 md:mb-18 select-none">
          <FadeUp>
            <h1
              className="text-[#1E1E1C] text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-[0.2em] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {siteData.photographyGallery.heading}
            </h1>
          </FadeUp>

          <FadeUp delay={0.08}>
            <p className="mt-5 text-xs sm:text-[13px] md:text-sm text-[#6B6860] font-light leading-relaxed max-w-[650px] mx-auto tracking-wide">
              {siteData.photographyGallery.description}
            </p>
          </FadeUp>
        </div>

        {/* 25 Photos Compact Masonry Grid: 4 cols desktop, 3 cols tablet, 2 cols mobile */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 md:gap-5 [column-fill:_balance]">
          {photos.map((photo, idx) => (
            <div key={photo.id} className="mb-3 sm:mb-4 md:mb-5 break-inside-avoid">
              <FadeUp delay={(idx % 8) * 0.04}>
                <div
                  onClick={() => setLightboxIndex(idx)}
                  className="group cursor-pointer overflow-hidden rounded-[2px] bg-[#E8E5DE] border border-[#B7A58C]/20 transition-all duration-300 hover:shadow-md hover:border-[#1E1E1C]/35 relative"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[260px] sm:max-h-[320px] md:max-h-[360px] object-cover object-center block filter contrast-[0.99] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                </div>
              </FadeUp>
            </div>
          ))}
        </div>

        {/* Bottom Back Button */}
        <div className="mt-16 sm:mt-20 text-center">
          <button
            onClick={onBack}
            className="inline-block px-8 py-3 rounded-none border border-[#1E1E1C]/40 text-[#1E1E1C] text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#1E1E1C] hover:text-[#F1EFEA] hover:border-[#1E1E1C] transition-all duration-300 cursor-pointer"
          >
            ← Back to Photography
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
          onClick={handleClose}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 sm:top-7 sm:right-7 z-50 text-white/80 hover:text-white p-2 text-xs uppercase tracking-[0.25em] font-sans transition-colors cursor-pointer flex items-center gap-2"
            aria-label="Close photo preview"
          >
            <span>CLOSE</span>
            <span className="text-base leading-none">✕</span>
          </button>

          {/* Photo Counter */}
          <div className="absolute top-6 left-6 z-50 text-white/60 text-[11px] uppercase tracking-[0.2em] font-mono">
            {lightboxIndex + 1} / {photos.length}
          </div>

          {/* Previous Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center bg-black/40 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 cursor-pointer"
            aria-label="Previous photograph"
          >
            <span className="font-serif text-xl sm:text-2xl leading-none">‹</span>
          </button>

          {/* Main Image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightboxIndex].url}
              alt={photos[lightboxIndex].alt}
              className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain rounded-[2px] shadow-2xl transition-all duration-300"
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center bg-black/40 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 cursor-pointer"
            aria-label="Next photograph"
          >
            <span className="font-serif text-xl sm:text-2xl leading-none">›</span>
          </button>
        </div>
      )}
    </div>
  );
};
