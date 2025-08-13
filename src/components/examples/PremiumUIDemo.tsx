import React from 'react';
import { motion } from 'framer-motion';
import PremiumGlassCard from '../atoms/PremiumGlassCard';
import AnimatedBorder, { CardBorder, NeonBorder } from '../atoms/AnimatedBorder';
import AnimatedButton from '../atoms/AnimatedButton';

const PremiumUIDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8">
      {/* Animated gradient background */}
      <div className="fixed inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(138, 155, 168, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(251, 191, 36, 0.2) 0%, transparent 50%)
            `,
            animation: 'gradient-shift 15s ease infinite'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Premium heading with dynamic typography */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <h1 className="premium-heading bg-gradient-to-r from-veritron-gold-400 via-white to-veritron-aluminum-400 bg-clip-text text-transparent">
            Premium UI Components
          </h1>
          <p className="premium-subheading text-gray-400 mt-4">
            Ultra-premium glass morphism with multi-layer effects
          </p>
        </motion.div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Premium Glass Card - Default */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <PremiumGlassCard variant="default">
              <h3 className="text-xl font-bold text-white mb-3">Glass Morphism</h3>
              <p className="text-gray-300 mb-4">
                Multi-layer glass effect with noise texture, gradient overlays, and interactive shimmer.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-veritron-gold-500/20 text-veritron-gold-400 text-sm">
                  Premium
                </span>
                <span className="px-3 py-1 rounded-full bg-veritron-aluminum-500/20 text-veritron-aluminum-400 text-sm">
                  Interactive
                </span>
              </div>
            </PremiumGlassCard>
          </motion.div>

          {/* Premium Glass Card - Elevated */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <PremiumGlassCard variant="elevated">
              <h3 className="text-xl font-bold text-white mb-3">Elevated Glass</h3>
              <p className="text-gray-300 mb-4">
                Complex shadow layering creates depth and dimension with hover effects.
              </p>
              <AnimatedButton variant="glass-chip" size="sm">
                Explore Features
              </AnimatedButton>
            </PremiumGlassCard>
          </motion.div>

          {/* Premium Glass Card - Floating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <PremiumGlassCard variant="floating">
              <h3 className="text-xl font-bold text-white mb-3">Floating Effect</h3>
              <p className="text-gray-300 mb-4">
                Gentle levitation animation with premium shadow effects.
              </p>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-veritron-gold-400 to-veritron-gold-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>
            </PremiumGlassCard>
          </motion.div>

          {/* Animated Border - Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <AnimatedBorder variant="gradient">
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-3">Gradient Border</h3>
                <p className="text-gray-300 mb-4">
                  Animated gradient border with smooth color transitions.
                </p>
                <code className="text-veritron-gold-400 text-sm font-mono">
                  variant="gradient"
                </code>
              </div>
            </AnimatedBorder>
          </motion.div>

          {/* Animated Border - Shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <AnimatedBorder variant="shimmer">
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-3">Shimmer Border</h3>
                <p className="text-gray-300 mb-4">
                  Conic gradient with rotating shimmer effect and blend modes.
                </p>
                <code className="text-veritron-aluminum-400 text-sm font-mono">
                  variant="shimmer"
                </code>
              </div>
            </AnimatedBorder>
          </motion.div>

          {/* Animated Border - Neon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <NeonBorder>
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-3">Neon Glow</h3>
                <p className="text-gray-300 mb-4">
                  Glowing neon border with pulsing animation and shadow effects.
                </p>
                <code className="text-veritron-gold-400 text-sm font-mono">
                  variant="neon"
                </code>
              </div>
            </NeonBorder>
          </motion.div>
        </div>

        {/* Button Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16"
        >
          <h2 className="premium-subheading text-white text-center mb-8">
            Premium Button Effects
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <AnimatedButton variant="metal" effect="glow">
              Metallic Glow
            </AnimatedButton>
            
            <AnimatedButton variant="gradient" effect="ripple">
              Gradient Ripple
            </AnimatedButton>
            
            <AnimatedButton variant="glass-chip" effect="morph">
              Glass Morph
            </AnimatedButton>
            
            <AnimatedButton variant="primary" effect="magnetic">
              Magnetic Effect
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Typography Showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <PremiumGlassCard variant="elevated" className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Dynamic Typography System
            </h2>
            <p className="premium-body text-gray-300 mb-6">
              Using CSS clamp() for responsive typography that scales smoothly across all viewport sizes.
              Combined with premium timing functions for smooth animations.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="text-veritron-gold-400 font-semibold mb-2">Spacing Scale</h4>
                <code className="text-xs text-gray-400 font-mono block">
                  --space-md: clamp(1rem, 2vw, 1.5rem)
                </code>
              </div>
              <div>
                <h4 className="text-veritron-aluminum-400 font-semibold mb-2">Type Scale</h4>
                <code className="text-xs text-gray-400 font-mono block">
                  --text-xl: clamp(1.25rem, 3.5vw, 1.5rem)
                </code>
              </div>
            </div>
          </PremiumGlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default PremiumUIDemo;