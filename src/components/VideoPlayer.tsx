import React, { useState, useRef, useEffect, useCallback } from 'react';

interface VideoPlayerProps {
  src: string;
  title: string;
  isActive: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  isActive,
  onPlay,
  onPause,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedProgress, setBufferedProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false); // Hidden by default; seen only when cursor stays > 2s
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [doubleTapAnimation, setDoubleTapAnimation] = useState<{
    side: 'left' | 'right';
    key: number;
  } | null>(null);

  // Timers for 2s hover requirement and idle fadeout
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<{ time: number; x: number }>({ time: 0, x: 0 });

  // Format time (mm:ss or hh:mm:ss)
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '0:00';
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Enforce single active video
  useEffect(() => {
    if (!isActive) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
      setIsBuffering(false);
    }
  }, [isActive]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // Cursor Hover Handling:
  // "ui of vdo play voice and all when cursor moves to vdo more 2s then only it should seen"
  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    // Only reveal controls if cursor stays on the video for more than 2 seconds (2000ms)
    hoverTimerRef.current = setTimeout(() => {
      setShowControls(true);
    }, 2000);
  };

  const handleMouseMove = () => {
    // If controls are already shown, reset idle timer to keep them visible while active
    if (showControls) {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (isPlaying) {
        idleTimerRef.current = setTimeout(() => {
          setShowControls(false);
        }, 2500);
      }
    } else {
      // If controls not shown yet and no 2s timer currently ticking, start 2s timer
      if (!hoverTimerRef.current) {
        hoverTimerRef.current = setTimeout(() => {
          setShowControls(true);
        }, 2000);
      }
    }
  };

  const handleMouseLeave = () => {
    // Cancel the 2-second hover timer if user leaves before 2s
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    // Instantly hide controls when cursor leaves the video
    setShowControls(false);
  };

  // Touch Handling for mobile: tap shows controls for 3s
  const handleTouchStart = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setShowControls(true);
    idleTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Calculate buffer indicator
  const updateBuffered = () => {
    if (!videoRef.current || !videoRef.current.duration) return;
    const b = videoRef.current.buffered;
    if (b.length > 0) {
      const end = b.end(b.length - 1);
      setBufferedProgress((end / videoRef.current.duration) * 100);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || isScrubbing) return;
    setCurrentTime(videoRef.current.currentTime);
    updateBuffered();
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 0);
    setIsBuffering(false);
    updateBuffered();
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (hasError) {
      handleRetry();
      return;
    }

    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      onPlay();
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsBuffering(false);
        })
        .catch(() => {
          setIsBuffering(false);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      onPause();
    }
  };

  // Retry loading video
  const handleRetry = () => {
    setHasError(false);
    setIsBuffering(true);
    onPlay();

    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsBuffering(false);
        })
        .catch(() => {
          setIsBuffering(false);
          setHasError(true);
        });
    }
  };

  // Skip ±10 seconds
  const skip = useCallback((seconds: number) => {
    if (!videoRef.current) return;
    const newTime = Math.min(Math.max(videoRef.current.currentTime + seconds, 0), videoRef.current.duration || 0);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, []);

  // Toggle Mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Volume Slider Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Progress Bar Seek
  const seekToPosition = (clientX: number) => {
    if (!progressBarRef.current || !videoRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.min(Math.max(0, clientX - rect.left), rect.width);
    const percentage = pos / rect.width;
    const newTime = percentage * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hasError) return;
    setIsScrubbing(true);
    seekToPosition(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      seekToPosition(moveEvent.clientX);
    };

    const onMouseUp = () => {
      setIsScrubbing(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleProgressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (hasError) return;
    setIsScrubbing(true);
    if (e.touches[0]) seekToPosition(e.touches[0].clientX);

    const onTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches[0]) seekToPosition(moveEvent.touches[0].clientX);
    };

    const onTouchEnd = () => {
      setIsScrubbing(false);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
  };

  // Double-tap on mobile (left = -10s, right = +10s)
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    const touch = e.changedTouches[0];
    if (!touch || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const width = rect.width;

    const timeDiff = now - lastTapRef.current.time;
    const distDiff = Math.abs(x - lastTapRef.current.x);

    if (timeDiff < 300 && distDiff < 60) {
      if (x < width * 0.4) {
        skip(-10);
        setDoubleTapAnimation({ side: 'left', key: now });
      } else if (x > width * 0.6) {
        skip(10);
        setDoubleTapAnimation({ side: 'right', key: now });
      } else {
        togglePlay();
      }
      lastTapRef.current = { time: 0, x: 0 };
    } else {
      lastTapRef.current = { time: now, x };
    }
  };

  // Keyboard Shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      togglePlay();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      skip(-10);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      skip(10);
    } else if (e.key === 'm' || e.key === 'M') {
      e.preventDefault();
      toggleMute();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`group relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden select-none outline-none shadow-xl border border-[#1E1E1C]/10 ${
        isFullscreen ? 'rounded-none' : ''
      }`}
    >
      {/* Direct Video Element - No thumbnail image overlay */}
      <video
        ref={videoRef}
        src={`${src}#t=0.001`}
        preload="metadata"
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onProgress={updateBuffered}
        onLoadedMetadata={handleLoadedMetadata}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setIsPlaying(true);
        }}
        onCanPlay={() => setIsBuffering(false)}
        onSeeking={() => setIsBuffering(true)}
        onSeeked={() => setIsBuffering(false)}
        onError={() => {
          setIsBuffering(false);
          setHasError(true);
        }}
        onEnded={() => {
          setIsPlaying(false);
          onPause();
        }}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer relative z-10"
      />

      {/* Buffering Loading Spinner */}
      {isBuffering && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-25 bg-black/20">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Error Fallback Display */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-6 z-30 text-center select-none">
          <p className="text-[#F5F0E8] text-sm tracking-wide font-light mb-4">
            Video unavailable, try again
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="px-6 py-2.5 border border-[#F5F0E8]/50 text-[#F5F0E8] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#F5F0E8] hover:text-[#1E1E1C] transition-all cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Double Tap Skip Ripple Animations */}
      {doubleTapAnimation && (
        <div
          key={doubleTapAnimation.key}
          className={`absolute top-0 bottom-0 ${
            doubleTapAnimation.side === 'left' ? 'left-0' : 'right-0'
          } w-1/3 flex items-center justify-center pointer-events-none bg-white/10 z-20`}
        >
          <div className="bg-black/60 backdrop-blur-sm text-[#F5F0E8] px-4 py-2 rounded-full text-xs font-mono tracking-wider flex items-center gap-1.5">
            {doubleTapAnimation.side === 'left' ? '« 10s' : '10s »'}
          </div>
        </div>
      )}

      {/* Big Center Play / Pause Button Overlay - Seen ONLY when cursor moves to video > 2s (showControls === true) */}
      {showControls && !hasError && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-opacity duration-500 opacity-100"
        >
          <button
            type="button"
            className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/80 bg-black/45 backdrop-blur-[4px] flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:bg-black/65 hover:border-white shadow-2xl cursor-pointer"
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
          >
            {isPlaying ? (
              <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 ml-1 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Bottom Gradient for Control Bar Readability - Seen ONLY when showControls is true */}
      <div
        className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none transition-opacity duration-500 z-20 ${
          showControls && !hasError ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Custom Control Bar (Play, Voice/Volume, Seeker, Timestamp, Fullscreen) */}
      {/* Seen ONLY when cursor moves to video > 2s (showControls === true) */}
      <div
        className={`absolute inset-x-0 bottom-0 p-3 sm:p-4 z-30 flex flex-col gap-2 transition-all duration-500 ${
          showControls && !hasError
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar with Buffered Indicator & Smooth Scrubbing */}
        <div
          ref={progressBarRef}
          onMouseDown={handleProgressMouseDown}
          onTouchStart={handleProgressTouchStart}
          className="group/progress relative w-full h-2 sm:h-2.5 bg-white/20 hover:h-3 rounded-full cursor-pointer flex items-center transition-all"
        >
          {/* Buffered Track Indicator */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-white/35 rounded-full pointer-events-none transition-all duration-150"
            style={{ width: `${bufferedProgress}%` }}
          />
          {/* Played Track */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#E8E2D5] rounded-full pointer-events-none"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md transition-transform scale-0 group-hover/progress:scale-100 pointer-events-none"
            style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>

        {/* Controls Row: Play/Pause, -10s, +10s, Timestamp, Voice/Volume, Fullscreen */}
        <div className="flex items-center justify-between text-[#F5F0E8] text-xs sm:text-[13px] font-sans pt-1">
          {/* Left Controls: Play/Pause, -10s, +10s, Time */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 hover:text-white/80 transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Skip Back 10 Seconds */}
            <button
              type="button"
              onClick={() => skip(-10)}
              className="p-1.5 hover:text-white/80 transition-colors cursor-pointer flex items-center gap-0.5 text-[11px] sm:text-xs font-medium"
              aria-label="Skip back 10 seconds"
              title="Skip -10s (Left Arrow)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.2 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
              </svg>
              <span className="text-[10px] hidden sm:inline">-10s</span>
            </button>

            {/* Skip Forward 10 Seconds */}
            <button
              type="button"
              onClick={() => skip(10)}
              className="p-1.5 hover:text-white/80 transition-colors cursor-pointer flex items-center gap-0.5 text-[11px] sm:text-xs font-medium"
              aria-label="Skip forward 10 seconds"
              title="Skip +10s (Right Arrow)"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M11.5 8c2.65 0 5.05.99 6.9 2.6L22 7v9h-9l3.62-3.62c-1.39-1.2-3.16-1.88-5.12-1.88-3.54 0-6.55 2.31-7.6 5.5l-2.37-.78C2.92 11.03 6.85 8 11.5 8z" />
              </svg>
              <span className="text-[10px] hidden sm:inline">+10s</span>
            </button>

            {/* Time Stamp Display */}
            <div className="text-[11px] sm:text-xs tracking-wider font-mono opacity-80 pl-1 select-none">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1 opacity-60">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls: Voice / Volume + Fullscreen */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Voice / Volume Control */}
            <div className="flex items-center group/vol">
              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 hover:text-white/80 transition-colors cursor-pointer"
                aria-label={isMuted || volume === 0 ? 'Unmute' : 'Mute'}
                title="Mute / Unmute (M)"
              >
                {isMuted || volume === 0 ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-14 sm:w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#E8E2D5] transition-all ml-1"
                aria-label="Volume Slider"
              />
            </div>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 hover:text-white/80 transition-colors cursor-pointer"
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              title="Fullscreen (F)"
            >
              {isFullscreen ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-14v3h3v2h-5V5h2z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
