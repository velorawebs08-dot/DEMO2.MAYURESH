import React, { useState, useEffect } from 'react';
import { PortfolioItem, PortfolioImage, siteData } from '../data/siteData';

interface PortfolioGalleryProps {
  project: PortfolioItem;
  onBack: () => void;
  onSelectOtherProject: (project: PortfolioItem) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  project,
  onBack,
  onSelectOtherProject,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Scroll to top on project load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.slug]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % project.images.length : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + project.images.length) % project.images.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, project.images.length]);

  const currentIndex = siteData.portfolio.findIndex((p) => p.slug === project.slug);
  const nextProject = siteData.portfolio[(currentIndex + 1) % siteData.portfolio.length];
  const prevProject =
    siteData.portfolio[(currentIndex - 1 + siteData.portfolio.length) % siteData.portfolio.length];

  return (
    <div className="min-h-screen bg-[#F1EFEA] text-[#1E1E1C] pt-24 pb-28 px-6 md:px-10 animate-fadeIn">
      <div className="max-w-[1040px] mx-auto">
        {/* Navigation Bar Back Link */}
        <div className="mb-8 flex items-center justify-between border-b border-[#B7A58C]/25 pb-3">
          <button
            onClick={onBack}
            className="text-[10px] uppercase tracking-[0.22em] font-sans font-medium text-[#6B6860] hover:text-[#1E1E1C] flex items-center gap-2 transition-colors"
          >
            <span>←</span>
            <span>RETURN TO ARCHIVE</span>
          </button>

          <span className="text-[10px] uppercase tracking-[0.2em] text-[#B7A58C]">
            {project.category}
          </span>
        </div>

        {/* Gallery Header */}
        <div className="text-center max-w-xl mx-auto mb-14 select-none">
          <span
            className="block text-[#B7A58C] text-2xl sm:text-3xl font-normal lowercase tracking-normal -mb-3 sm:-mb-4 z-10 relative"
            style={{ fontFamily: "'Pinyon Script', cursive" }}
          >
            the chronicle of
          </span>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-[0.16em] text-[#1E1E1C]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {project.names}
          </h1>

          {/* Metadata line */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[#6B6860] font-sans">
            <span>{project.location}</span>
            <span aria-hidden="true" className="text-[#B7A58C]">·</span>
            <span>{project.seasonYear}</span>
            {project.filmFormat && (
              <>
                <span aria-hidden="true" className="text-[#B7A58C]">·</span>
                <span className="font-serif-italic">{project.filmFormat}</span>
              </>
            )}
          </div>

          <p className="mt-6 text-sm text-[#6B6860] leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Original Frame Masonry Image Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 [column-fill:_balance]">
          {project.images.map((img: PortfolioImage, idx: number) => {
            return (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="mb-6 md:mb-8 break-inside-avoid group cursor-pointer overflow-hidden rounded-[2px] bg-[#E8E5DE] border border-[#B7A58C]/20 relative"
              >
                <img
                  src={img.url}
                  alt={img.caption || `${project.names} photo ${idx + 1}`}
                  className="w-full h-auto block filter contrast-[0.98] transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle caption bar on hover */}
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-serif-italic text-xs text-[#F1EFEA]">
                      {img.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Story Pagination Footer */}
        <div className="mt-24 pt-12 border-t border-[#B7A58C]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={() => onSelectOtherProject(prevProject)}
            className="text-left group"
          >
            <span className="block text-[9px] uppercase tracking-[0.25em] text-[#6B6860] mb-1">
              PREVIOUS STORY
            </span>
            <span
              className="font-serif-italic text-lg text-[#1E1E1C] group-hover:text-[#B7A58C] transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              ← {prevProject.names}
            </span>
          </button>

          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-full border border-[#B7A58C] text-[10px] uppercase tracking-[0.2em] font-medium text-[#1E1E1C] hover:bg-[#1E1E1C] hover:text-[#F1EFEA] transition-colors"
          >
            ALL ARCHIVES
          </button>

          <button
            onClick={() => onSelectOtherProject(nextProject)}
            className="text-right group"
          >
            <span className="block text-[9px] uppercase tracking-[0.25em] text-[#6B6860] mb-1">
              NEXT STORY
            </span>
            <span
              className="font-serif-italic text-lg text-[#1E1E1C] group-hover:text-[#B7A58C] transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {nextProject.names} →
            </span>
          </button>
        </div>
      </div>

      {/* Simple Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#1A1A18]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Bar with Counter and Close Button */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 text-[#F1EFEA]">
            <span className="text-xs uppercase tracking-[0.2em] font-mono opacity-80">
              {String(lightboxIndex + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}
            </span>

            <button
              onClick={() => setLightboxIndex(null)}
              className="px-3 py-1 rounded-full border border-white/20 text-[10px] uppercase tracking-[0.25em] text-white hover:bg-white hover:text-black transition-colors"
              aria-label="Close lightbox"
            >
              CLOSE ✕
            </button>
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) =>
                prev !== null ? (prev - 1 + project.images.length) % project.images.length : 0
              );
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 text-[#F1EFEA]/80 hover:text-white p-3 text-2xl font-light focus:outline-none transition-colors"
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) =>
                prev !== null ? (prev + 1) % project.images.length : 0
              );
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 text-[#F1EFEA]/80 hover:text-white p-3 text-2xl font-light focus:outline-none transition-colors"
            aria-label="Next image"
          >
            ›
          </button>

          {/* Image Display */}
          <div
            className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center p-2 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.images[lightboxIndex]?.url}
              alt={project.images[lightboxIndex]?.caption || `Photo ${lightboxIndex + 1}`}
              className="max-h-[75vh] max-w-full object-contain rounded-[2px] border border-white/10 shadow-2xl"
              referrerPolicy="no-referrer"
            />
            {project.images[lightboxIndex]?.caption && (
              <p className="mt-4 font-serif-italic text-sm text-[#F1EFEA]/90 text-center tracking-wide">
                {project.images[lightboxIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
