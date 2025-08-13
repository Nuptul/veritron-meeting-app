import { useState, useCallback, useMemo } from 'react';
import { useSpring, SpringValue, config } from '@react-spring/web';
import { useMotionValue, useTransform, MotionValue } from 'framer-motion';

/**
 * Animation presets for different icon interactions
 */
export const animationPresets = {
  pulse: {
    scale: [1, 1.2, 1],
    duration: 1000,
    easing: 'easeInOut'
  },
  rotate: {
    rotate: [0, 360],
    duration: 2000,
    easing: 'linear'
  },
  bounce: {
    y: [0, -10, 0],
    duration: 800,
    easing: 'easeOut'
  },
  shake: {
    x: [-2, 2, -2, 2, 0],
    duration: 500,
    easing: 'linear'
  },
  glow: {
    filter: ['brightness(1) drop-shadow(0 0 0px rgba(212, 175, 55, 0))', 
             'brightness(1.2) drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
             'brightness(1) drop-shadow(0 0 0px rgba(212, 175, 55, 0))'],
    duration: 1500,
    easing: 'easeInOut'
  },
  morph: {
    pathLength: [0, 1],
    duration: 1000,
    easing: 'easeInOut'
  }
};

/**
 * Color transitions for Veritron theme
 */
export const colorTransitions = {
  goldToAluminum: {
    from: '#d4af37',
    to: '#8a9ba8',
    duration: 300
  },
  goldToGunmetal: {
    from: '#d4af37',
    to: '#2a2a2a',
    duration: 300
  },
  aluminumToGold: {
    from: '#8a9ba8',
    to: '#d4af37',
    duration: 300
  },
  hover: {
    from: 'currentColor',
    to: '#fbbf24',
    duration: 200
  },
  active: {
    from: 'currentColor',
    to: '#92400e',
    duration: 100
  }
};

interface UseIconAnimationOptions {
  preset?: keyof typeof animationPresets;
  colorTransition?: keyof typeof colorTransitions;
  loop?: boolean;
  delay?: number;
  disabled?: boolean;
  onAnimationComplete?: () => void;
}

interface IconAnimationReturn {
  isAnimating: boolean;
  isHovered: boolean;
  triggerAnimation: () => void;
  stopAnimation: () => void;
  animationProps: {
    scale?: SpringValue<number>;
    rotation?: SpringValue<number>;
    x?: SpringValue<number>;
    y?: SpringValue<number>;
    color?: SpringValue<string>;
    filter?: SpringValue<string>;
  };
  motionValues: {
    scale: MotionValue<number>;
    rotate: MotionValue<number>;
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  handlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onClick: () => void;
  };
}

/**
 * Custom hook for managing icon animations
 */
export function useIconAnimation(options: UseIconAnimationOptions = {}): IconAnimationReturn {
  const {
    preset = 'pulse',
    colorTransition,
    loop = false,
    delay = 0,
    disabled = false,
    onAnimationComplete
  } = options;

  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Spring animations for smooth transitions
  const [springProps, springApi] = useSpring(() => ({
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0,
    color: colorTransition ? colorTransitions[colorTransition].from : '#d4af37',
    filter: 'brightness(1) drop-shadow(0 0 0px rgba(212, 175, 55, 0))',
    config: config.gentle,
    onRest: () => {
      if (loop && isAnimating) {
        triggerAnimation();
      } else {
        setIsAnimating(false);
        onAnimationComplete?.();
      }
    }
  }));

  // Framer Motion values for advanced animations
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform motion values for complex animations
  const scaleTransform = useTransform(scale, [0.9, 1, 1.1], [0.9, 1, 1.1]);
  const rotateTransform = useTransform(rotate, [0, 360], [0, 360]);

  // Trigger animation based on preset
  const triggerAnimation = useCallback(() => {
    if (disabled || isAnimating) return;

    setIsAnimating(true);
    const animation = animationPresets[preset];

    setTimeout(() => {
      if ('scale' in animation) {
        springApi.start({
          scale: animation.scale[1],
          config: { duration: animation.duration / 2 }
        });
        setTimeout(() => {
          springApi.start({
            scale: animation.scale[2] || animation.scale[0],
            config: { duration: animation.duration / 2 }
          });
        }, animation.duration / 2);
      }

      if ('rotate' in animation) {
        springApi.start({
          rotation: animation.rotate[1],
          config: { duration: animation.duration }
        });
      }

      if ('y' in animation) {
        springApi.start({
          y: animation.y[1],
          config: { duration: animation.duration / 2 }
        });
        setTimeout(() => {
          springApi.start({
            y: animation.y[2] || animation.y[0],
            config: { duration: animation.duration / 2 }
          });
        }, animation.duration / 2);
      }

      if ('x' in animation) {
        const xValues = animation.x;
        let currentStep = 0;
        const stepDuration = animation.duration / xValues.length;

        const animateX = () => {
          if (currentStep < xValues.length) {
            springApi.start({
              x: xValues[currentStep],
              config: { duration: stepDuration }
            });
            currentStep++;
            setTimeout(animateX, stepDuration);
          }
        };
        animateX();
      }

      if ('filter' in animation) {
        springApi.start({
          filter: animation.filter[1],
          config: { duration: animation.duration / 2 }
        });
        setTimeout(() => {
          springApi.start({
            filter: animation.filter[2] || animation.filter[0],
            config: { duration: animation.duration / 2 }
          });
        }, animation.duration / 2);
      }
    }, delay);
  }, [disabled, isAnimating, preset, springApi, delay]);

  // Stop animation
  const stopAnimation = useCallback(() => {
    setIsAnimating(false);
    springApi.stop();
    springApi.start({
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      filter: 'brightness(1) drop-shadow(0 0 0px rgba(212, 175, 55, 0))',
      config: config.gentle
    });
  }, [springApi]);

  // Mouse event handlers
  const handlers = useMemo(() => ({
    onMouseEnter: () => {
      if (disabled) return;
      setIsHovered(true);
      
      if (colorTransition) {
        springApi.start({
          color: colorTransitions[colorTransition].to,
          config: { duration: colorTransitions[colorTransition].duration }
        });
      }

      // Subtle hover scale
      springApi.start({
        scale: 1.05,
        config: config.gentle
      });
    },
    onMouseLeave: () => {
      if (disabled) return;
      setIsHovered(false);
      
      if (colorTransition) {
        springApi.start({
          color: colorTransitions[colorTransition].from,
          config: { duration: colorTransitions[colorTransition].duration }
        });
      }

      springApi.start({
        scale: 1,
        config: config.gentle
      });
    },
    onMouseDown: () => {
      if (disabled) return;
      springApi.start({
        scale: 0.95,
        config: config.stiff
      });
    },
    onMouseUp: () => {
      if (disabled) return;
      springApi.start({
        scale: isHovered ? 1.05 : 1,
        config: config.gentle
      });
    },
    onClick: () => {
      if (disabled) return;
      triggerAnimation();
    }
  }), [disabled, colorTransition, springApi, triggerAnimation, isHovered]);

  return {
    isAnimating,
    isHovered,
    triggerAnimation,
    stopAnimation,
    animationProps: springProps,
    motionValues: {
      scale: scaleTransform,
      rotate: rotateTransform,
      x,
      y
    },
    handlers
  };
}

/**
 * Hook for managing icon loading states
 */
export function useIconLoading(initialLoading = false) {
  const [isLoading, setIsLoading] = useState(initialLoading);

  const loadingAnimation = useSpring({
    from: { rotate: 0 },
    to: { rotate: isLoading ? 360 : 0 },
    loop: isLoading,
    config: { duration: 1000 }
  });

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    loadingProps: loadingAnimation
  };
}

/**
 * Hook for icon tooltip management
 */
export function useIconTooltip(tooltipText: string, delay = 500) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    const id = setTimeout(() => setShowTooltip(true), delay);
    setTimeoutId(id);
  }, [delay]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setShowTooltip(false);
  }, [timeoutId]);

  const tooltipSpring = useSpring({
    opacity: showTooltip ? 1 : 0,
    transform: showTooltip ? 'translateY(-8px)' : 'translateY(0px)',
    config: config.gentle
  });

  return {
    showTooltip,
    tooltipText,
    tooltipProps: tooltipSpring,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }
  };
}

/**
 * Hook for managing icon badge notifications
 */
export function useIconBadge(initialCount = 0) {
  const [badgeCount, setBadgeCount] = useState(initialCount);
  const [showBadge, setShowBadge] = useState(initialCount > 0);

  const badgeSpring = useSpring({
    scale: showBadge ? 1 : 0,
    opacity: showBadge ? 1 : 0,
    config: config.wobbly
  });

  const updateBadge = useCallback((count: number) => {
    setBadgeCount(count);
    setShowBadge(count > 0);
  }, []);

  const incrementBadge = useCallback(() => {
    setBadgeCount(prev => {
      const newCount = prev + 1;
      setShowBadge(true);
      return newCount;
    });
  }, []);

  const decrementBadge = useCallback(() => {
    setBadgeCount(prev => {
      const newCount = Math.max(0, prev - 1);
      setShowBadge(newCount > 0);
      return newCount;
    });
  }, []);

  const clearBadge = useCallback(() => {
    setBadgeCount(0);
    setShowBadge(false);
  }, []);

  return {
    badgeCount,
    showBadge,
    badgeProps: badgeSpring,
    updateBadge,
    incrementBadge,
    decrementBadge,
    clearBadge
  };
}