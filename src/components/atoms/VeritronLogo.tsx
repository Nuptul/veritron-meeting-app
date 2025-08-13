import React from 'react';
import { motion } from 'framer-motion';

interface VeritronLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
  showText?: boolean;
  textColor?: string;
  glowEffect?: boolean;
}

const VeritronLogo: React.FC<VeritronLogoProps> = ({
  size = 'md',
  className = '',
  animate = false,
  showText = true,
  textColor = 'text-white',
  glowEffect = false
}) => {
  const sizeMap = {
    sm: { icon: 'w-6 h-6', text: 'text-sm' },
    md: { icon: 'w-10 h-10', text: 'text-xl' },
    lg: { icon: 'w-16 h-16', text: 'text-2xl' },
    xl: { icon: 'w-24 h-24', text: 'text-4xl' }
  };

  const { icon: iconSize, text: textSize } = sizeMap[size];

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    animate: {
      rotate: [0, 5, -5, 0],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`flex items-center space-x-2 ${className}`}
      initial="initial"
      whileHover="hover"
      animate={animate ? "animate" : "initial"}
    >
      {/* Veritron Logo - Optimized */}
      <motion.div
        className={`${iconSize} relative flex-shrink-0 veritron-logo-glow`}
        variants={logoVariants}
      >
        {/* Metallic background glow */}
        <div className="absolute inset-0 veritron-brand-gradient rounded-lg opacity-20 blur-sm"></div>
        
        {/* Main logo */}
        <img
          src="/Veritron logo.png"
          alt="Veritron AI Logo"
          className={`${iconSize} drop-shadow-lg filter relative z-10 transition-all duration-300`}
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25)) brightness(1.1) contrast(1.1)',
            mixBlendMode: 'normal',
            background: 'transparent'
          }}
          onError={(e) => {
            // Ensure fallback uses provided PNG
            (e.target as HTMLImageElement).src = '/Veritron logo.png';
          }}
        />
        
        {/* Metallic shine overlay with brand colors */}
        <div 
          className="absolute inset-0 rounded-lg pointer-events-none z-20 opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.3) 0%, rgba(138,155,168,0.2) 30%, rgba(255,255,255,0.1) 50%, rgba(42,42,42,0.1) 70%, transparent 100%)'
          }}
        />
        
        {/* Animated metallic flow effect on hover */}
        <div className="absolute inset-0 rounded-lg pointer-events-none z-10 opacity-0 hover:opacity-20 transition-opacity duration-300 metallic-shine"></div>
      </motion.div>

      {/* Company Name */}
      {showText && (
        <motion.span 
          className={`${textSize} font-bold ${textColor} transition-colors duration-300`}
          variants={{
            initial: { opacity: 0.9 },
            hover: { opacity: 1 }
          }}
        >
          Veritron AI
        </motion.span>
      )}
    </motion.div>
  );
};

export default VeritronLogo;