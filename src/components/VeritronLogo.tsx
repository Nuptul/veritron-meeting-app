import React from 'react';
import { motion } from 'framer-motion';

interface VeritronLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'hero';
  className?: string;
  animate?: boolean;
  glowEffect?: boolean;
}

const VeritronLogo: React.FC<VeritronLogoProps> = ({ 
  size = 'md', 
  className = '',
  animate = false,
  glowEffect = false
}) => {
  const sizeMap = {
    xs: 'h-8 w-8',    // 32px
    sm: 'h-12 w-12',  // 48px
    md: 'h-16 w-16',  // 64px
    lg: 'h-20 w-20',  // 80px
    xl: 'h-24 w-24',  // 96px
    xxl: 'h-32 w-32', // 128px
    hero: 'h-64 w-64' // 256px
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
    filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.5)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.3))',
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
      {/* Premium 3D Logo Design */}
      <div className="relative w-full h-full">
        {/* Background hexagon with gradient */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8a9ba8" stopOpacity="1" />
                <stop offset="50%" stopColor="#2a3f5f" stopOpacity="1" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#a16207" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Hexagon background */}
            <polygon 
              points="100,20 170,60 170,140 100,180 30,140 30,60"
              fill="url(#hexGradient)"
              stroke="url(#goldAccent)"
              strokeWidth="2"
              opacity="0.9"
            />
            
            {/* Inner hexagon */}
            <polygon 
              points="100,40 150,70 150,130 100,160 50,130 50,70"
              fill="none"
              stroke="#8a9ba8"
              strokeWidth="1"
              opacity="0.5"
            />
            
            {/* V Letter */}
            <path 
              d="M 60 70 L 100 130 L 140 70"
              stroke="url(#goldAccent)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
            
            {/* Accent bar */}
            <rect
              x="110"
              y="80"
              width="30"
              height="6"
              fill="url(#goldAccent)"
              transform="rotate(15 125 83)"
            />
            
            {/* Tech dots */}
            <circle cx="100" cy="145" r="3" fill="#d4af37" opacity="0.8" />
            <circle cx="85" cy="145" r="2" fill="#8a9ba8" opacity="0.6" />
            <circle cx="115" cy="145" r="2" fill="#8a9ba8" opacity="0.6" />
          </svg>
        </div>
        
        {/* Animated ring effect */}
        {animate && (
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon 
                points="100,20 170,60 170,140 100,180 30,140 30,60"
                fill="none"
                stroke="url(#goldAccent)"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default VeritronLogo;