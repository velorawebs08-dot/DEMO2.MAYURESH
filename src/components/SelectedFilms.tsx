import React from 'react';
import { siteData, SelectedFilmItem } from '../data/siteData';
import { FadeUp } from './FadeUp';

interface FilmCardProps {
  video: SelectedFilmItem;
}

const FilmCard: React.FC<FilmCardProps> = ({ video }) => {
  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-[16/9] w-full overflow-hidden bg-black select-none cursor-pointer"
      aria-label={video.alt || 'Watch selected film on YouTube'}
    >
      {/* 16:9 Thumbnail with slow soft zoom on hover */}
      <img
        src={video.thumbnail}
        alt={video.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Subtle overlay for contrast */}
      <div className="absolute inset-0 bg-black/15 transition-opacity duration-300 group-hover:bg-black/25" />

      {/* White Play Icon in the Center with subtle hover growth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-13 h-13 sm:w-15 sm:h-15 md:w-16 md:h-16 rounded-full bg-black/45 backdrop-blur-[3px] border border-white/70 flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-black/60">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 fill-white"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export const SelectedFilms: React.FC = () => {
  const { scriptKicker, heading, paragraph, videos } = siteData.selectedFilms;

  return (
    <section
      id="selected-films"
      className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-28 md:py-32 bg-[#F1EFEA] text-[#1E1E1C] relative border-t border-[#1E1E1C]/5"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header: Script line + Heading + Context paragraph */}
        <div className="text-center max-w-[650px] mx-auto mb-12 sm:mb-16 md:mb-20">
          <FadeUp delay={0}>
            {/* Script line */}
            <span
              className="block text-[#9E896A] text-2xl sm:text-3xl font-normal lowercase tracking-normal mb-2.5"
              style={{ fontFamily: "'Pinyon Script', cursive" }}
            >
              {scriptKicker}
            </span>

            {/* Heading in wide-spaced serif caps */}
            <h2
              className="text-[#1E1E1C] text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-[0.2em] leading-tight select-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {heading}
            </h2>

            {/* Context Paragraph: One paragraph, centered, max width ~650px */}
            <p className="mt-4 sm:mt-5 text-[#6B6860] text-sm sm:text-base font-light leading-relaxed tracking-wide">
              {paragraph}
            </p>
          </FadeUp>
        </div>

        {/* Thumbnail Layout:
            Row 1: 2 thumbnails side by side (gap-5 sm:gap-6 md:gap-7)
            Row 2: the 3rd thumbnail CENTERED, same size as the others
            Mobile: 1 per row, full width with side padding
        */}
        <div className="max-w-[1140px] mx-auto">
          {/* Row 1: 2 Thumbnails Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-7">
            {videos[0] && (
              <FadeUp delay={0.1}>
                <FilmCard video={videos[0]} />
              </FadeUp>
            )}

            {videos[1] && (
              <FadeUp delay={0.2}>
                <FilmCard video={videos[1]} />
              </FadeUp>
            )}
          </div>

          {/* Row 2: 3rd Thumbnail Centered (Exact same width as Row 1 cards on md+) */}
          {videos[2] && (
            <div className="mt-5 sm:mt-6 md:mt-7 flex justify-center">
              <div className="w-full md:w-[calc(50%-0.875rem)]">
                <FadeUp delay={0.3}>
                  <FilmCard video={videos[2]} />
                </FadeUp>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
