import React from 'react';
import { motion } from 'framer-motion';

interface VeritronBrandAccentProps {
  variant?: 'line' | 'dot' | 'stripe' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
}

const VeritronBrandAccent: React.FC<VeritronBrandAccentProps> = ({
  variant = 'line',
  size = 'md',
  className = '',
  animate = false
}) => {
  const sizeMap = {
    sm: {
      line: 'h-0.5 w-12',
      dot: 'w-2 h-2',
      stripe: 'h-1 w-8',
      glow: 'w-8 h-8'
    },
    md: {
      line: 'h-1 w-20',
      dot: 'w-3 h-3',
      stripe: 'h-2 w-16',
      glow: 'w-12 h-12'
    },
    lg: {
      line: 'h-1.5 w-32',
      dot: 'w-4 h-4',
      stripe: 'h-3 w-24',
      glow: 'w-16 h-16'
    }
  };

  const baseClasses = `${sizeMap[size][variant]} ${className}`;

  const variants = {
    initial: { 
      opacity: 0.7,
      scale: 1
    },
    animate: {
      opacity: [0.7, 1, 0.7],
      scale: variant === 'glow' ? [1, 1.1, 1] : [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      opacity: 1,
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  const renderAccent = () => {
    switch (variant) {
      case 'line':
        return (
          <motion.div
            className={`${baseClasses} rounded-full veritron-brand-gradient`}
            variants={variants}
            initial="initial"
            animate={animate ? "animate" : "initial"}
            whileHover="hover"
          />
        );

      case 'dot':
        return (
          <motion.div
            className={`${baseClasses} rounded-full bg-gradient-to-br from-veritron-gold-400 to-veritron-gold-600`}
            variants={variants}
            initial="initial"
            animate={animate ? "animate" : "initial"}
            whileHover="hover"
            style={{
              boxShadow: '0 2px 8px rgba(212, 175, 55, 0.3)'
            }}
          />
        );

      case 'stripe':
        return (
          <motion.div
            className={`${baseClasses} rounded metallic-shine opacity-80`}
            variants={variants}
            initial="initial"
            animate={animate ? "animate" : "initial"}
            whileHover="hover"
          />
        );

      case 'glow':
        return (
          <motion.div
            className={`${baseClasses} rounded-full relative flex items-center justify-center`}
            variants={variants}
            initial="initial"
            animate={animate ? "animate" : "initial"}
            whileHover="hover"
          >
            {/* Outer glow */}
            <div 
              className="absolute inset-0 rounded-full bg-gradient-radial from-veritron-gold-400/30 to-transparent blur-sm"
            />
            
            {/* Inner glow */}
            <div 
              className="absolute inset-2 rounded-full bg-gradient-to-br from-veritron-gold-500 to-veritron-gold-600 opacity-80"
            />
            
            {/* Core */}
            <div 
              className="absolute inset-4 rounded-full bg-white opacity-90"
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return renderAccent();
};

export default VeritronBrandAccent;