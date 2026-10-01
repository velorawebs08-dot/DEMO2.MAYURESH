import React, { useState } from 'react';
import { siteData } from '../data/siteData';
import { VideoPlayer } from './VideoPlayer';
import { FadeUp } from './FadeUp';

interface FilmsGalleryProps {
  onBack: () => void;
}

export const FilmsGallery: React.FC<FilmsGalleryProps> = ({ onBack }) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const { filmsGallery } = siteData;

  const handleVideoPlay = (id: string) => {
    setActiveVideoId(id);
  };

  const handleVideoPause = (id: string) => {
    if (activeVideoId === id) {
      setActiveVideoId(null);
    }
  };

  return (
    <div className="pt-28 md:pt-36 pb-28 md:pb-36 px-4 sm:px-6 md:px-10 bg-[#F1EFEA] min-h-screen">
      <div className="max-w-[1240px] mx-auto">
        {/* Back Link */}
        <div className="mb-8 sm:mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#6B6860] hover:text-[#1E1E1C] transition-colors font-medium group cursor-pointer focus:outline-none"
            aria-label="Back to Films section"
          >
            <span className="mr-2.5 transition-transform duration-300 group-hover:-translate-x-1 font-serif text-sm">
              ←
            </span>
            Back
          </button>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-[650px] mx-auto mb-16 md:mb-20">
          <FadeUp>
            <h1
              className="text-[#1E1E1C] text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-[0.2em] leading-tight select-none"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {filmsGallery.heading}
            </h1>
            <p className="mt-4 sm:mt-5 text-[#6B6860] text-sm sm:text-base font-light leading-relaxed tracking-wide max-w-[650px] mx-auto">
              {filmsGallery.description}
            </p>
          </FadeUp>
        </div>

        {/* 3 Videos Stacked Vertically */}
        <div className="max-w-[900px] mx-auto space-y-16 sm:space-y-24 md:space-y-28">
          {filmsGallery.videos.map((video, idx) => (
            <FadeUp key={video.id} delay={idx * 0.1}>
              <div className="w-full flex flex-col items-center">
                {/* 16:9 Video Player */}
                <div className="w-full shadow-lg rounded-lg overflow-hidden border border-[#1E1E1C]/10 bg-black">
                  <VideoPlayer
                    src={video.src}
                    title={video.title}
                    isActive={activeVideoId === video.id}
                    onPlay={() => handleVideoPlay(video.id)}
                    onPause={() => handleVideoPause(video.id)}
                  />
                </div>

                {/* Film Title below video */}
                <h2
                  className="mt-6 sm:mt-7 text-base sm:text-lg md:text-xl font-light uppercase tracking-[0.22em] text-[#1E1E1C] text-center"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {video.title}
                </h2>

                {/* 2-line Description */}
                <div className="mt-2 text-xs sm:text-[13px] md:text-sm text-[#6B6860] font-light leading-relaxed tracking-wide text-center">
                  <p>{video.descriptionLine1}</p>
                  <p className="mt-0.5">{video.descriptionLine2}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Bottom Back Button */}
        <div className="mt-20 sm:mt-24 text-center">
          <button
            onClick={onBack}
            className="inline-block px-8 py-3 rounded-none border border-[#1E1E1C]/40 text-[#1E1E1C] text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#1E1E1C] hover:text-[#F1EFEA] hover:border-[#1E1E1C] transition-all duration-300 cursor-pointer"
          >
            ← Back to Films
          </button>
        </div>
      </div>
    </div>
  );
};
