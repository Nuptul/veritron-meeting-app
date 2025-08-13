import React from 'react';
import { motion } from 'framer-motion';

interface VeritronLogoPNGProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'hero';
  className?: string;
  animate?: boolean;
  glowEffect?: boolean;
}

const VeritronLogoPNG: React.FC<VeritronLogoPNGProps> = ({ 
  size = 'md', 
  className = '',
  animate = false,
  glowEffect = false
}) => {
  const sizeMap = {
    xs: 'h-12 w-12',    // 48px
    sm: 'h-16 w-16',    // 64px
    md: 'h-24 w-24',    // 96px
    lg: 'h-32 w-32',    // 128px
    xl: 'h-40 w-40',    // 160px
    xxl: 'h-48 w-48',   // 192px
    hero: 'h-96 w-96'   // 384px
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.05,
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const glowStyles = glowEffect ? {
    filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.4))',
  } : {};

  return (
    <motion.div
      className={`relative ${sizeMap[size]} ${className}`}
      variants={animate ? logoVariants : undefined}
      initial={animate ? "initial" : undefined}
      animate={animate ? "animate" : undefined}
      whileHover={animate ? "hover" : undefined}
      style={glowStyles}
    >
      <img 
        src="/Veritron logo.png" 
        alt="Veritron AI" 
        className="w-full h-full object-contain"
      />
      
      {/* Animated ring effect */}
      {animate && glowEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-veritron-gold-500 opacity-50" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default VeritronLogoPNG;