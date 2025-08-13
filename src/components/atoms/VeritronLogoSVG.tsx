import React from 'react';
import { motion } from 'framer-motion';

interface VeritronLogoSVGProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'hero';
  className?: string;
  animate?: boolean;
  showText?: boolean;
  textColor?: string;
  glowEffect?: boolean;
  pulseEffect?: boolean;
  rotateEffect?: boolean;
}

const VeritronLogoSVG: React.FC<VeritronLogoSVGProps> = ({
  size = 'md',
  className = '',
  animate = false,
  showText = true,
  textColor = 'text-white',
  glowEffect = true,
  pulseEffect = false,
  rotateEffect = false
}) => {
  const sizeMap = {
    sm: { icon: 'w-16 h-16', text: 'text-lg' },
    md: { icon: 'w-24 h-24', text: 'text-2xl' },
    lg: { icon: 'w-32 h-32', text: 'text-4xl' },
    xl: { icon: 'w-64 h-64', text: 'text-6xl' },
    xxl: { icon: 'w-96 h-96', text: 'text-8xl' },
    hero: { icon: 'w-[32rem] h-[32rem]', text: 'text-9xl' }
  };

  const { icon: iconSize, text: textSize } = sizeMap[size];

  const logoVariants = {
    initial: { 
      scale: 1, 
      rotate: 0,
      filter: glowEffect ? 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))' : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))'
    },
    hover: { 
      scale: 1.1,
      rotate: 3,
      filter: 'drop-shadow(0 0 40px rgba(212, 175, 55, 0.8)) brightness(1.2)',
      transition: { type: "spring", stiffness: 400, damping: 20 }
    },
    pulse: {
      scale: [1, 1.15, 1],
      filter: [
        'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))',
        'drop-shadow(0 0 60px rgba(212, 175, 55, 0.9))',
        'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))'
      ],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    rotate3D: {
      rotateY: [0, 360],
      rotateX: [0, 15, 0],
      transition: { 
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }
    },
    float: {
      y: [0, -20, 0],
      transition: { 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Determine animation state based on props
  const getAnimationState = () => {
    if (pulseEffect) return "pulse";
    if (rotateEffect) return "rotate3D";
    if (animate) return ["float", "pulse"];
    return "initial";
  };

  return (
    <motion.div
      className={`flex items-center ${size === 'hero' ? 'flex-col space-y-8' : 'space-x-4'} ${className}`}
      initial="initial"
      whileHover="hover"
      animate={getAnimationState()}
    >
      {/* Veritron Logo from SVG file */}
      <motion.div
        className={`${iconSize} relative flex-shrink-0 ${glowEffect ? 'veritron-logo-glow' : ''}`}
        variants={logoVariants}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
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
          className={`${textSize} font-bold transition-all duration-300`}
          variants={{
            initial: { opacity: 0.9 },
            hover: { opacity: 1 }
          }}
          style={{
            background: textColor.includes('white') 
              ? 'linear-gradient(135deg, #ffffff 0%, #d4af37 50%, #ffffff 100%)'
              : textColor.includes('gunmetal') 
                ? 'linear-gradient(135deg, #2a2a2a 0%, #d4af37 50%, #2a2a2a 100%)'
                : 'linear-gradient(135deg, #d4af37 0%, #8a9ba8 50%, #d4af37 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 100%',
            animation: animate ? 'metallic-flow 3s ease-in-out infinite' : undefined,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          Veritron AI
        </motion.span>
      )}
    </motion.div>
  );
};

export default VeritronLogoSVG;