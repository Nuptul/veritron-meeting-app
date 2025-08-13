/**
 * Enhanced Hero Component with WebGPU Typography Integration
 * Combines existing particle system with advanced typography effects
 * Veritron AI Agency - 2025 Implementation
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { HeroCanvas } from '../HeroCanvas';
import { WebGPUTypography } from '../../features/webgpu-typography';
import { CTAButton } from '../atoms/AnimatedButton';
import VeritronLogoPNG from '../VeritronLogoPNG';

interface EnhancedHeroProps {
  className?: string;
  showParticles?: boolean;
  showTypographyEffects?: boolean;
  enableInteractiveTypography?: boolean;
}

export const EnhancedHero: React.FC<EnhancedHeroProps> = ({
  className = '',
  showParticles = true,
  showTypographyEffects = true,
  enableInteractiveTypography = true,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={heroRef}
      className={`relative w-full h-screen overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Particle System */}
      {showParticles && (
        <HeroCanvas 
          className="absolute inset-0 z-0"
          particleCount={12000}
          showMetrics={false}
        />
      )}
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-5 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <VeritronLogoPNG 
            className="w-24 h-24 md:w-32 md:h-32 opacity-90"
            animate={isHovering}
          />
        </motion.div>
        
        {/* Main Heading with WebGPU Typography */}
        <div className="w-full max-w-6xl mx-auto text-center mb-6">
          {showTypographyEffects ? (
            <WebGPUTypography
              text="VERITRON"
              fontSize={120}
              fontFamily="Veritron Display"
              color="#00FFCC"
              enableDistortion={true}
              enableInteraction={enableInteractiveTypography}
              animationSpeed={0.8}
              distortionStrength={0.4}
              className="w-full h-32 sm:h-40"
            />
          ) : (
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-veritron-gold-400 via-veritron-gold-500 to-veritron-gold-300 type-display"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              VERITRON
            </motion.h1>
          )}
        </div>
        
        {/* Subtitle with Enhanced Typography */}
        <div className="w-full max-w-4xl mx-auto text-center mb-12">
          {showTypographyEffects ? (
            <WebGPUTypography
              text="AI AGENCY"
              fontSize={36}
              fontFamily="Veritron Text"
              color="#FFFFFF"
              enableDistortion={true}
              enableInteraction={false}
              animationSpeed={0.5}
              distortionStrength={0.15}
              className="w-full h-12 sm:h-16 mb-6"
            />
          ) : (
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-medium text-white/90 type-heading tracking-wider"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              AI AGENCY
            </motion.h2>
          )}
          
          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl text-white/70 type-body leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            Cutting-edge artificial intelligence solutions with premium 
            GPU-accelerated experiences. Where innovation meets performance.
          </motion.p>
        </div>
        
        {/* Call-to-Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <CTAButton
            onClick={() => console.log('Explore Services clicked')}
            className="bg-veritron-gold-500 hover:bg-veritron-gold-400 text-black font-semibold px-8 py-3 rounded-lg transform hover:scale-105 transition-all duration-300"
            glowColor="rgba(212, 175, 55, 0.5)"
          >
            Explore Services
          </CTAButton>
          
          <CTAButton
            onClick={() => console.log('View Portfolio clicked')}
            variant="outline"
            className="border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/10 font-medium px-8 py-3 rounded-lg backdrop-blur-sm transition-all duration-300"
          >
            View Portfolio
          </CTAButton>
        </motion.div>
        
        {/* Feature Highlights */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          {[
            { icon: '⚡', text: 'WebGPU Accelerated' },
            { icon: '🎨', text: 'Real-time Effects' },
            { icon: '📱', text: 'Progressive Enhancement' },
            { icon: '🚀', text: 'High Performance' }
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 + index * 0.1 }}
            >
              <span className="text-xl">{feature.icon}</span>
              <span className="text-sm font-medium text-white/80">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Performance Enhancement Badge */}
      {showTypographyEffects && (
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-veritron-gold-500/20 to-veritron-gold-600/20 backdrop-blur-sm rounded-full px-4 py-2 border border-veritron-gold-500/30">
            <span className="text-sm font-medium text-veritron-gold-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              GPU Enhanced
            </span>
          </div>
        </motion.div>
      )}
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{
              scaleY: [1, 0.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnhancedHero;