import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VeritronIconProps {
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
  hover?: boolean;
  glow?: boolean;
  darkMode?: boolean;
  color?: 'gold' | 'aluminum' | 'gunmetal' | 'custom';
  customColor?: string;
}

const VeritronIcon: React.FC<VeritronIconProps> = ({
  name,
  size = 24,
  className = '',
  onClick,
  animate = true,
  hover = true,
  glow = false,
  darkMode = false,
  color = 'gold',
  customColor
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [svgContent, setSvgContent] = useState<string>('');
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadSVG = async () => {
      try {
        const response = await fetch(`/${name}.svg`);
        if (response.ok) {
          let content = await response.text();
          
          // Apply dark mode transformations if needed
          if (darkMode) {
            content = applyDarkModeStyles(content);
          }
          
          // Apply color scheme
          if (color !== 'custom' || customColor) {
            content = applyColorScheme(content, color, customColor);
          }
          
          setSvgContent(content);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error(`Error loading icon ${name}:`, error);
      }
    };

    loadSVG();
  }, [name, darkMode, color, customColor]);

  const applyDarkModeStyles = (svgContent: string): string => {
    // Transform gradients for dark mode compatibility
    return svgContent
      .replace(/fill="url\(#(\w+)Gunmetal\)"/g, 'fill="url(#$1GunmetalDark)"')
      .replace(/fill="#ffffff"/g, 'fill="#e5e7eb"')
      .replace(/fill="#000000"/g, 'fill="#1f2937"')
      .replace(/stroke="#ffffff"/g, 'stroke="#e5e7eb"')
      .replace(/stroke="#000000"/g, 'stroke="#1f2937"');
  };

  const applyColorScheme = (svgContent: string, colorScheme: string, custom?: string): string => {
    const colorMaps = {
      gold: {
        primary: '#d4af37',
        secondary: '#b8860b',
        accent: '#ffd700'
      },
      aluminum: {
        primary: '#9ca3af',
        secondary: '#6b7280',
        accent: '#d1d5db'
      },
      gunmetal: {
        primary: '#4b5563',
        secondary: '#374151',
        accent: '#6b7280'
      }
    };

    if (custom) {
      return svgContent.replace(/fill="url\(#\w+Gold\)"/g, `fill="${custom}"`);
    }

    const colors = colorMaps[colorScheme as keyof typeof colorMaps];
    if (colors) {
      return svgContent
        .replace(/stop-color:#d4af37/g, `stop-color:${colors.primary}`)
        .replace(/stop-color:#b8860b/g, `stop-color:${colors.secondary}`)
        .replace(/stop-color:#ffd700/g, `stop-color:${colors.accent}`);
    }

    return svgContent;
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: hover ? 1.1 : 1,
      rotate: hover ? [0, -5, 5, 0] : 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const glowVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: glow ? 0.3 : 0,
      scale: glow ? [1, 1.2, 1] : 1,
      transition: { 
        duration: 2,
        repeat: glow ? Infinity : 0,
        ease: "easeInOut"
      }
    },
    hover: {
      opacity: glow ? 0.6 : 0,
      scale: 1.3,
      transition: { duration: 0.3 }
    }
  };

  if (!isLoaded) {
    return (
      <motion.div
        className={`inline-block ${className}`}
        style={{ width: size, height: size }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-full h-full bg-veritron-aluminum-200 dark:bg-veritron-gunmetal-600 rounded animate-pulse" />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={svgRef}
      className={`relative inline-block cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      variants={animate ? containerVariants : undefined}
      initial={animate ? "initial" : undefined}
      animate={animate ? "animate" : undefined}
      whileHover={hover ? "hover" : undefined}
      whileTap={onClick ? "tap" : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Glow effect */}
      <AnimatePresence>
        {(glow || isHovered) && (
          <motion.div
            className="absolute inset-0 rounded-full bg-veritron-gold-400 dark:bg-veritron-gold-500 blur-md"
            variants={glowVariants}
            initial="initial"
            animate={isHovered ? "hover" : "animate"}
            exit="initial"
          />
        )}
      </AnimatePresence>

      {/* Main icon */}
      <motion.div
        className="relative z-10 w-full h-full"
        animate={{
          filter: isHovered 
            ? `brightness(1.2) drop-shadow(0 0 8px ${color === 'gold' ? '#d4af37' : '#9ca3af'})`
            : 'brightness(1) drop-shadow(0 0 0px transparent)'
        }}
        transition={{ duration: 0.3 }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {/* Pulse ring on interaction */}
      <AnimatePresence>
        {isHovered && animate && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-veritron-gold-400 dark:border-veritron-gold-500"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Floating sparkles for special effects */}
      <AnimatePresence>
        {isHovered && glow && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-veritron-gold-400 rounded-full"
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: '50%',
                  y: '50%'
                }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1, 0],
                  x: [50 + '%', (50 + (Math.random() - 0.5) * 100) + '%'],
                  y: [50 + '%', (50 + (Math.random() - 0.5) * 100) + '%']
                }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VeritronIcon;