import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumButton from './atoms/PremiumButton';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const ConversionHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatePresence>
          {isVisible && (
            <>
              {/* Main Headline */}
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="text-white">Enterprise </span>
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  AI Solutions
                </span>
                <br />
                <span className="text-white">That </span>
                <span className="text-yellow-400">Transform</span>
                <span className="text-white"> Business</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <span className="text-yellow-400 font-semibold">25 Years of Excellence.</span>{' '}
                <span className="text-white">Trusted by Industry Leaders.</span>
              </motion.p>

              {/* Primary CTA */}
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <PremiumButton
                  variant="gold"
                  size="large"
                  onClick={scrollToServices}
                  className="px-12 py-4 text-xl font-semibold group"
                >
                  Explore Our Services
                  <ArrowRightIcon className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-1" />
                </PremiumButton>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="grid grid-cols-3 md:grid-cols-5 gap-8 items-center max-w-4xl mx-auto opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                {/* HP */}
                <div className="flex items-center justify-center">
                  <div className="text-2xl font-bold text-white tracking-wider">HP</div>
                </div>
                
                {/* Dell */}
                <div className="flex items-center justify-center">
                  <div className="text-2xl font-bold text-white tracking-wider">DELL</div>
                </div>
                
                {/* Philips */}
                <div className="flex items-center justify-center">
                  <div className="text-2xl font-bold text-white tracking-wider">PHILIPS</div>
                </div>
                
                {/* Corona */}
                <div className="flex items-center justify-center">
                  <div className="text-2xl font-bold text-white tracking-wider">CORONA</div>
                </div>
                
                {/* Philips Australia */}
                <div className="flex items-center justify-center col-span-3 md:col-span-1">
                  <div className="text-lg font-bold text-white tracking-wider text-center">
                    PHILIPS<br />AUSTRALIA
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default ConversionHero;