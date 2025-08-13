import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import PremiumButton from './atoms/PremiumButton';
import HeroCanvas from './HeroCanvas';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

type VideoFitMode = 'cover' | 'contain' | 'cinematic' | 'fill' | 'responsive';

const VideoHero: React.FC = () => {
  const logoAnimationPath = '/Veritron_Logo_Animation_Creation.mp4';
  const neuralNetworkPath = '/Neural_Network_Visualization_Loop.mp4';
  const fallbackPath = '/Veritron Hero video.mp4';
  const envSrc = (import.meta as any).env?.VITE_HERO_VIDEO_URL as string | undefined;
  
  // Play neural network first, then end on the creation logo animation
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoSequence = [neuralNetworkPath, logoAnimationPath];
  const initialSrc = envSrc ? envSrc : encodeURI(videoSequence[0]);
  const poster = (import.meta as any).env?.VITE_HERO_VIDEO_POSTER || undefined;
  
  const [src, setSrc] = useState<string>(initialSrc);
  const hasAdvancedRef = useRef(false);
  const [triedFallback, setTriedFallback] = useState(false);
  const [, setFailed] = useState(false);
  const [fitMode, setFitMode] = useState<VideoFitMode>('responsive');
  const [isMuted, setIsMuted] = useState(true); // Must start muted for autoplay to work
  const [volume, setVolume] = useState(0.7);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPortrait, setIsPortrait] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState(16/9);
  const advanceTimeoutRef = useRef<number | null>(null);
  const [videosCompleted, setVideosCompleted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Calculate responsive video dimensions based on container
  const getResponsiveVideoStyle = (): React.CSSProperties => {
    return {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    };
  };

  // Video fit modes with container-based sizing
  const videoStyles: Record<VideoFitMode, React.CSSProperties> = {
    cover: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    contain: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    cinematic: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100%',
      height: '100%',
      transform: 'translate(-50%, -50%) scale(1.05)',
      objectFit: 'cover',
    },
    fill: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      objectFit: 'fill',
    },
    responsive: getResponsiveVideoStyle(),
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
        videoRef.current.volume = volume;
      } else {
        videoRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume > 0 && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else if (newVolume === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  // Handle video metadata and orientation
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedMetadata = () => {
        // Get actual video dimensions
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        if (videoWidth && videoHeight) {
          setVideoAspectRatio(videoWidth / videoHeight);
        }
        // Ensure audio is properly initialized
        video.volume = volume;
        video.muted = isMuted;
        
        // Ensure video plays
        video.play().catch(error => {
          console.log('Autoplay failed, trying muted:', error);
          // If autoplay fails, ensure it's muted and try again
          video.muted = true;
          video.play();
        });
      };

      const handleEnded = () => {
        // Play next video in sequence
        if (currentVideoIndex < videoSequence.length - 1) {
          const nextIndex = currentVideoIndex + 1;
          setCurrentVideoIndex(nextIndex);
          setSrc(encodeURI(videoSequence[nextIndex]));
          console.log(`Playing next video: ${videoSequence[nextIndex]}`);
        } else {
          // All videos played, stop at last frame
          try {
            // Try to freeze on the last frame reliably
            video.currentTime = Math.max(0, (video.duration || 0) - 0.05);
            video.pause();
          } catch (e) {
            // Fallback: just pause
            video.pause();
          }
          console.log('Video sequence completed - stopped at last frame');
          // Trigger the call-to-action popup
          setVideosCompleted(true);
          setTimeout(() => {
            setShowContent(true);
          }, 500);
        }
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('ended', handleEnded);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [src, volume, isMuted, currentVideoIndex, videoSequence]);

  // Reset advancement guard when src changes
  useEffect(() => {
    hasAdvancedRef.current = false;
  }, [src]);

  // Handle responsive orientation changes
  useEffect(() => {
    const handleResize = () => {
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Cycle video fit modes with Ctrl+V
      if (e.key === 'v' && e.ctrlKey) {
        const modes: VideoFitMode[] = ['cover', 'contain', 'cinematic', 'fill', 'responsive'];
        setFitMode(prev => {
          const currentIndex = modes.indexOf(prev);
          return modes[(currentIndex + 1) % modes.length];
        });
      }
      // Toggle mute with M key
      else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isMuted, volume]);

  return (
    <section className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: '16/9' }}>
      {/* Video Background with native resolution */}
      <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <video
          ref={videoRef}
          key={currentVideoIndex}
          style={fitMode === 'responsive' ? getResponsiveVideoStyle() : videoStyles[fitMode]}
          src={src}
          poster={poster}
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
          controls={false}
          onError={() => {
            if (!triedFallback) {
              setTriedFallback(true);
              setSrc(fallbackPath);
              setFailed(false);
            } else {
              setFailed(true);
            }
          }}
          onLoadedData={() => setFailed(false)}
          onLoadedMetadata={() => {
            const el = videoRef.current;
            if (!el) return;
            const w = el.videoWidth, h = el.videoHeight;
            if (w && h) {
              setVideoAspectRatio(w / h);
            }
            // Ensure playback starts
            el.play().catch(() => {
              el.muted = true;
              el.play().catch(() => {});
            });
            // Fallback: schedule advance in case 'ended' never fires
            if (advanceTimeoutRef.current) {
              clearTimeout(advanceTimeoutRef.current);
              advanceTimeoutRef.current = null;
            }
            if (currentVideoIndex < videoSequence.length - 1) {
              const durationMs = isFinite(el.duration) ? el.duration * 1000 : 8000;
              advanceTimeoutRef.current = window.setTimeout(() => {
                if (currentVideoIndex < videoSequence.length - 1) {
                  const nextIndex = currentVideoIndex + 1;
                  setCurrentVideoIndex(nextIndex);
                  setSrc(encodeURI(videoSequence[nextIndex]));
                }
              }, Math.max(1000, durationMs - 100));
            }
          }}
          onTimeUpdate={() => {
            const el = videoRef.current;
            if (!el || hasAdvancedRef.current) return;
            if (el.duration && el.currentTime / el.duration >= 0.995) {
              hasAdvancedRef.current = true;
              if (currentVideoIndex < videoSequence.length - 1) {
                const nextIndex = currentVideoIndex + 1;
                setCurrentVideoIndex(nextIndex);
                setSrc(encodeURI(videoSequence[nextIndex]));
                // Force reload and attempt autoplay on next tick
                setTimeout(() => {
                  const v = videoRef.current;
                  if (!v) return;
                  try { v.load(); } catch {}
                  v.play().catch(() => {
                    v.muted = true;
                    v.play().catch(() => {});
                  });
                }, 0);
              }
            }
          }}
          onEnded={() => {
            const el = videoRef.current;
            if (!el) return;
            if (currentVideoIndex < videoSequence.length - 1) {
              const nextIndex = currentVideoIndex + 1;
              setCurrentVideoIndex(nextIndex);
              setSrc(encodeURI(videoSequence[nextIndex]));
              // Nudge playback start on the next source (handles autoplay policy)
              setTimeout(() => {
                const v = videoRef.current;
                if (!v) return;
                try { v.load(); } catch {}
                v.play().catch(() => {
                  v.muted = true;
                  v.play().catch(() => {});
                });
              }, 50);
            } else {
              // All videos completed
              try {
                el.currentTime = Math.max(0, (el.duration || 0) - 0.05);
                el.pause();
              } catch {
                el.pause();
              }
              // Mark videos as completed and show content after delay
              setVideosCompleted(true);
              setTimeout(() => {
                setShowContent(true);
              }, 500);
            }
          }}
        />
      </div>

      {/* Gradient overlays for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      {/* WebGPU Particle System Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroCanvas 
          particleCount={10000}
          showMetrics={false}
          className="w-full h-full opacity-50"
        />
      </div>

      {/* Hero Content - Call to Action Popup */}
      {showContent && (
        <motion.div 
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="bg-black/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 max-w-[85%] sm:max-w-md md:max-w-lg lg:max-w-xl pointer-events-auto border border-amber-400/30 shadow-2xl mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.2, 
              duration: 0.6,
              type: "spring",
              stiffness: 100
            }}
          >
            {/* Eyebrow text */}
            <motion.p 
              className="text-amber-400 font-medium text-[10px] sm:text-xs md:text-sm mb-2 tracking-wider uppercase text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              25+ Years of Innovation. Trusted by HP, Dell, and Philips
            </motion.p>

            {/* Main heading - Responsive sizing */}
            <motion.h1 
              className="veritron-display font-extrabold text-white mb-2 sm:mb-3 md:mb-4 text-center"
              style={{
                fontSize: 'clamp(1.25rem, 4vw, 2.5rem)',
                lineHeight: '1.1'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="block">Transform Your Enterprise with</span>
              <span className="text-gradient-metallic animate-gradient-text">AI-Powered Digital Excellence</span>
            </motion.h1>

            {/* Subheading - Responsive text */}
            <motion.p 
              className="text-gray-200 mb-3 sm:mb-4 md:mb-5 max-w-3xl leading-relaxed text-center mx-auto px-2"
              style={{
                fontSize: 'clamp(0.75rem, 2vw, 1rem)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Veriton is Australia's premier enterprise-grade digital agency, specializing in AI transformation 
              and complete digital solutions. From custom AI automations to full-stack development, we architect 
              the future of business—one innovation at a time.
            </motion.p>

            {/* CTA Buttons - Responsive */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-4 sm:mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <PremiumButton
                variant="gold"
                size="medium"
                onClick={() => {
                  setShowContent(false);
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="min-w-[120px] sm:min-w-[140px] md:min-w-[160px] text-xs sm:text-sm"
              >
                Explore Our Solutions
              </PremiumButton>
              <PremiumButton
                variant="gunmetal"
                size="medium"
                onClick={() => {
                  setShowContent(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="min-w-[120px] sm:min-w-[140px] md:min-w-[160px] backdrop-blur-sm bg-white/10 text-xs sm:text-sm"
              >
                Book a Strategy Session
              </PremiumButton>
            </motion.div>

            {/* Stats or Trust Indicators - Responsive grid */}
            <motion.div 
              className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div className="text-white text-center">
                <div 
                  className="font-bold text-amber-400"
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}
                >
                  25+
                </div>
                <div 
                  className="text-gray-300"
                  style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.75rem)' }}
                >
                  Years Excellence
                </div>
              </div>
              <div className="text-white text-center">
                <div 
                  className="font-bold text-amber-400"
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}
                >
                  Fortune 500
                </div>
                <div 
                  className="text-gray-300"
                  style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.75rem)' }}
                >
                  Trusted By
                </div>
              </div>
              <div className="text-white text-center">
                <div 
                  className="font-bold text-amber-400"
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}
                >
                  100%
                </div>
                <div 
                  className="text-gray-300"
                  style={{ fontSize: 'clamp(0.5rem, 1.2vw, 0.75rem)' }}
                >
                  Australian Owned
                </div>
              </div>
            </motion.div>

            {/* Close button */}
            <motion.button
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white/60 hover:text-white transition-colors"
              onClick={() => setShowContent(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </motion.div>

      {/* Audio Controls - Mobile Responsive */}
      <motion.div 
        className="absolute bottom-16 right-4 sm:bottom-8 sm:right-8 z-30 flex items-center gap-2 sm:gap-4 bg-black/70 backdrop-blur-md rounded-full px-3 sm:px-4 py-2 sm:py-3"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Mute/Unmute Button */}
        <motion.button
          onClick={toggleMute}
          className="w-10 h-10 flex items-center justify-center text-white hover:text-amber-400 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isMuted ? "Unmute (M)" : "Mute (M)"}
        >
          {isMuted ? (
            <SpeakerXMarkIcon className="w-6 h-6" />
          ) : (
            <SpeakerWaveIcon className="w-6 h-6" />
          )}
        </motion.button>

        {/* Volume Slider */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            aria-label="Volume control"
            title="Adjust volume"
            className="w-16 sm:w-24 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer 
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:w-3 
                     [&::-webkit-slider-thumb]:h-3 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-amber-400
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:hover:bg-amber-300
                     [&::-moz-range-thumb]:w-3 
                     [&::-moz-range-thumb]:h-3 
                     [&::-moz-range-thumb]:rounded-full 
                     [&::-moz-range-thumb]:bg-amber-400
                     [&::-moz-range-thumb]:border-0
                     [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:hover:bg-amber-300"
          />
          <span className="text-white text-xs w-8">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      </motion.div>


    </section>
  );
};

export default VideoHero;