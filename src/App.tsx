import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { 
  ChevronUpIcon
} from '@heroicons/react/24/outline'

// Import all components and pages
import ModernHeader from './components/ModernHeader'
import ModernFooter from './components/organisms/Footer'
import PerformanceMonitor from './components/PerformanceMonitor'
import ServiceDetail from './components/ServiceDetail'
import SoundSettings from './components/SoundSettings'

// Import all pages
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import Typography from './pages/Typography'
import TestServices from './pages/TestServices'

import { ThemeProvider, useTheme } from './context/ThemeContext'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

// Premium Loading Spinner Component
const PremiumLoadingSpinner: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer ring */}
      <motion.div
        className="w-20 h-20 rounded-full border-2 border-veritron-aluminum-700/30"
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute w-16 h-16 rounded-full border-2 border-transparent border-t-veritron-gold-400 border-r-veritron-gold-400"
        animate={{ rotate: -360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: [0.19, 1, 0.22, 1]
        }}
      />

      {/* Inner ring */}
      <motion.div
        className="absolute w-12 h-12 rounded-full border-2 border-transparent border-t-veritron-gold-500 border-l-veritron-gold-500"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: [0.19, 1, 0.22, 1]
        }}
      />

      {/* Center glow */}
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-veritron-gold-400 to-veritron-gold-600"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: [0.19, 1, 0.22, 1]
        }}
      />

      {/* Outer glow effect */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-veritron-gold-400/10 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: [0.19, 1, 0.22, 1]
        }}
      />
    </div>
  );
};

// Loading Screen Component
const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Fallback video sources in order of preference
  const videoSources = [
    '/Veritron_Logo_Animation_Generation.mp4',
    '/Veritron_Logo_Animation_Generation_trimmed.mp4',
    '/Veritron_Logo_Animation_Creation.mp4',
    '/Neural_Network_Visualization_Loop.mp4'
  ];

  // Playback speed configuration
  const speedMode = ((import.meta as any).env?.VITE_LOADING_SPEED_MODE as string) || 'adaptive';
  const fixedRate = Number((import.meta as any).env?.VITE_LOADING_FIXED_RATE ?? 1.25);
  const maxRate = Number((import.meta as any).env?.VITE_LOADING_MAX_RATE ?? 2.0);
  const minRate = Number((import.meta as any).env?.VITE_LOADING_MIN_RATE ?? 1.0);
  const baseRate = Number((import.meta as any).env?.VITE_LOADING_BASE_RATE ?? 1.25);

  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const onLoad = () => setIsPageLoaded(true);
    if (document.readyState === 'complete') setIsPageLoaded(true);
    window.addEventListener('load', onLoad);
    
    // Fallback timeout - ensure loading completes within 10 seconds
    const fallbackTimer = setTimeout(() => {
      console.log('Loading timeout reached - completing loading screen');
      setProgress(100);
      onComplete();
    }, 10000);
    
    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  const handleLoadedMetadata = () => {
    console.log('Video metadata loaded successfully');
    setProgress(0);
    const el = videoRef.current;
    if (!el) return;
    
    // Ensure video can autoplay by checking properties
    el.muted = true;
    el.volume = 0;
    
    if (speedMode === 'fixed') {
      el.playbackRate = Math.max(0.5, fixedRate);
    } else {
      el.playbackRate = Math.max(minRate, baseRate);
    }
    
    // Explicitly try to play the video
    el.play().catch(err => {
      console.error('Video autoplay failed:', err);
      setVideoError(true);
    });
  };

  const handleTimeUpdate = () => {
    const el = videoRef.current;
    if (!el || !el.duration || Number.isNaN(el.duration)) return;
    const pct = Math.min(100, Math.round((el.currentTime / el.duration) * 100));
    setProgress(pct);

    if (speedMode === 'adaptive') {
      if (isPageLoaded && el.playbackRate < maxRate) {
        el.playbackRate = Math.min(maxRate, el.playbackRate + 0.1);
      } else if (!isPageLoaded && el.playbackRate < baseRate) {
        el.playbackRate = Math.min(baseRate, Math.max(minRate, el.playbackRate + 0.02));
      }
    }
  };

  const handleEnded = () => {
    setProgress(100);
    setTimeout(onComplete, 200);
  };

  const handleError = (e: any) => {
    console.error('Video error occurred:', e.target?.error);
    
    // Try next video source if available
    if (currentVideoIndex < videoSources.length - 1) {
      console.log(`Trying fallback video ${currentVideoIndex + 1}`);
      setCurrentVideoIndex(currentVideoIndex + 1);
      setVideoError(false);
      return;
    }
    
    // All videos failed
    setVideoError(true);
    console.warn('All video sources failed, continuing with fallback');
    // Complete loading after short delay even if video fails
    setTimeout(() => {
      setProgress(100);
      onComplete();
    }, 1500);
  };
  
  const handleCanPlay = () => {
    console.log('Video can start playing');
    const el = videoRef.current;
    if (el && !videoError) {
      el.play().catch(err => {
        console.error('Video play failed:', err);
        setVideoError(true);
      });
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Background video */}
      <video
        key={currentVideoIndex}
        className="absolute inset-0 w-full h-full object-cover"
        src={videoSources[currentVideoIndex]}
        autoPlay
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        onCanPlay={handleCanPlay}
        onLoadStart={() => console.log('Video loading started')}
        onLoadedData={() => console.log('Video data loaded')}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      />
      
      {/* Fallback background if video fails */}
      {videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Premium Loading overlay */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <div className="text-center">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          >
            <span className="text-veritron-gold-400">VERITRON</span> AI Agency
          </motion.h1>

          {/* Premium Loading Spinner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="mb-8"
            role="status"
            aria-label="Loading application"
          >
            <PremiumLoadingSpinner />
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="w-80 max-w-sm mx-auto"
          >
            <div className="h-1 bg-veritron-gunmetal-800 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-veritron-gold-400 to-veritron-gold-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              />
            </div>

            <motion.p
              className="text-veritron-aluminum-400 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {videoError ? 'Initializing premium experience...' : 'Loading enterprise solutions...'}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Scroll to Top Button
const ScrollToTop: React.FC<{ isVisible: boolean; onClick: () => void }> = ({ isVisible, onClick }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.button
        className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={onClick}
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0, y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUpIcon className="w-6 h-6 mx-auto" />
      </motion.button>
    )}
  </AnimatePresence>
);

// Schema injection component for different page types
const SchemaInjector: React.FC = () => {
  const location = useLocation();
  
  const generatePageSchema = () => {
    const baseUrl = 'https://veritronai.com';
    const currentPath = location.pathname;
    
    let pageType = 'WebPage';
    let name = 'Veritron AI Agency';
    let description = 'Leading AI technology agency specializing in machine learning, artificial intelligence solutions, and cutting-edge digital experiences.';
    
    if (currentPath === '/') {
      pageType = 'WebSite';
      name = 'Veritron AI Agency - Innovative Technology Solutions';
    } else if (currentPath === '/services' || currentPath.startsWith('/services/')) {
      pageType = 'Service';
      name = 'Technology Services - Veritron AI Agency';
      description = 'Comprehensive technology services including AI/ML, web development, cloud infrastructure, and digital transformation solutions.';
    } else if (currentPath === '/about') {
      pageType = 'AboutPage';
      name = 'About Veritron AI Agency';
      description = 'Learn about our team, mission, and values. We are passionate technologists dedicated to transforming businesses through innovative digital solutions.';
    } else if (currentPath === '/contact') {
      pageType = 'ContactPage';
      name = 'Contact Veritron AI Agency';
      description = 'Get in touch with our team to discuss your project. We offer free consultations and custom technology solutions.';
    }

    return {
      '@context': 'https://schema.org',
      '@type': pageType,
      name,
      description,
      url: `${baseUrl}${currentPath}`,
      provider: {
        '@type': 'Organization',
        name: 'Veritron AI Agency',
        url: baseUrl
      }
    };
  };

  const schema = generatePageSchema();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Main App Component (wrapped with theme)
const ThemedApp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSoundSettings, setShowSoundSettings] = useState(false);
  
  const { scrollY } = useScroll();
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  // Handle scroll events
  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowScrollTop(latest > 500);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { theme } = useTheme()
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black' : 'bg-black'
    }`} style={{ backgroundColor: '#000000' }}>
      
      {/* Dynamic Schema Injection */}
      <SchemaInjector />
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <ModernHeader />

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/typography" element={<Typography />} />
          <Route path="/test-services" element={<TestServices />} />
        </Routes>
      </main>

      {/* Footer */}
      <ModernFooter />

      {/* Scroll to Top Button */}
      <ScrollToTop 
        isVisible={showScrollTop}
        onClick={scrollToTop}
      />

      {/* Sound Settings */}
      <SoundSettings 
        position="floating"
        isOpen={showSoundSettings}
        onClose={() => setShowSoundSettings(false)}
      />
      
      {/* Performance Monitor - Disabled by default */}
      <PerformanceMonitor 
        show={false}
        position="bottom-left"
      />

      {/* Global Loading States & Transitions */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #2d3748;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #d4af37, #b8941f);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #b8941f, #9a7b1a);
        }
        
        /* Gradient animation for text */
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .text-gradient-metallic {
          background: linear-gradient(135deg, #d4af37 0%, #b8941f 25%, #d4af37 50%, #b8941f 75%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-gradient-text {
          animation: gradient-x 3s ease infinite;
        }
        
        /* Loading spinner */
        .spinner-veritron {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Line clamp utility */
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

// App wrapper with Router, ThemeProvider and HelmetProvider
function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="veritron-theme">
        <Router>
          <ThemedApp />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App