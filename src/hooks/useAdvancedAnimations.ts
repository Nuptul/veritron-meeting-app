import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Advanced Typewriter Hook with Multiple Effects
export const useAdvancedTypewriter = (
  texts: string[],
  options: {
    speed?: number;
    deleteSpeed?: number;
    pauseDuration?: number;
    cursor?: boolean;
    loop?: boolean;
  } = {}
) => {
  const {
    speed = 80,
    deleteSpeed = 40,
    pauseDuration = 2000,
    cursor = true,
    loop = true
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentTextIndex];
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex(prev => 
            loop ? (prev + 1) % texts.length : Math.min(prev + 1, texts.length - 1)
          );
        }
      } else {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setIsPaused(true);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseDuration, loop]);

  return { displayText, cursor };
};

// GSAP Text Reveal Animation
export const useTextReveal = (trigger: boolean = true) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (trigger && textRef.current) {
      const chars = textRef.current.querySelectorAll('.char');
      gsap.fromTo(chars, 
        {
          y: 100,
          opacity: 0,
          rotation: 10
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.03
        }
      );
    }
  }, [trigger]);

  const splitText = useCallback((text: string) => {
    // Return a function that can be used in JSX
    return (createElement: any) => {
      return text.split('').map((char, index) => 
        createElement('span', 
          { key: index, className: 'char inline-block' }, 
          char === ' ' ? '\u00A0' : char
        )
      );
    };
  }, []);

  return { textRef, splitText };
};

// GSAP Magnetic Effect Hook
export const useMagneticEffect = (strength: number = 0.3) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

// GSAP Scroll Trigger Animation
export const useScrollReveal = (options: {
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  delay?: number;
} = {}) => {
  const { direction = 'up', distance = 100, duration = 1, delay = 0 } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const getInitialTransform = () => {
      switch (direction) {
        case 'up': return { y: distance, opacity: 0 };
        case 'down': return { y: -distance, opacity: 0 };
        case 'left': return { x: distance, opacity: 0 };
        case 'right': return { x: -distance, opacity: 0 };
        default: return { y: distance, opacity: 0 };
      }
    };

    gsap.fromTo(element,
      getInitialTransform(),
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, [direction, distance, duration, delay]);

  return ref;
};

// GSAP Floating Animation
export const useFloatingAnimation = (
  options: {
    intensity?: number;
    speed?: number;
    direction?: 'vertical' | 'horizontal' | 'both';
  } = {}
) => {
  const { intensity = 10, speed = 2, direction = 'vertical' } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const getAnimation = () => {
      switch (direction) {
        case 'vertical':
          return { y: intensity, duration: speed, yoyo: true, repeat: -1, ease: 'sine.inOut' };
        case 'horizontal':
          return { x: intensity, duration: speed, yoyo: true, repeat: -1, ease: 'sine.inOut' };
        case 'both':
          return { 
            y: intensity, 
            x: intensity / 2, 
            rotation: 5,
            duration: speed, 
            yoyo: true, 
            repeat: -1, 
            ease: 'sine.inOut' 
          };
        default:
          return { y: intensity, duration: speed, yoyo: true, repeat: -1, ease: 'sine.inOut' };
      }
    };

    gsap.to(element, getAnimation());
  }, [intensity, speed, direction]);

  return ref;
};

// Enhanced GSAP Stagger Animation Hook with Advanced Effects
export const useStaggerAnimation = (
  selector: string,
  options: {
    stagger?: number;
    duration?: number;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'center';
    distance?: number;
    scale?: number;
    rotation?: number;
    ease?: string;
  } = {}
) => {
  const { 
    stagger = 0.1, 
    duration = 0.8, 
    delay = 0,
    direction = 'up',
    distance = 50,
    scale = 0.8,
    rotation = 0,
    ease = 'power2.out'
  } = options;
  const containerRef = useRef<HTMLElement>(null);

  const animate = useCallback(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(selector);
      
      // Calculate initial position based on direction
      const getInitialState = () => {
        switch (direction) {
          case 'up': return { y: distance, opacity: 0, scale, rotation };
          case 'down': return { y: -distance, opacity: 0, scale, rotation };
          case 'left': return { x: distance, opacity: 0, scale, rotation };
          case 'right': return { x: -distance, opacity: 0, scale, rotation };
          case 'center': return { scale: 0.3, opacity: 0, rotation };
          default: return { y: distance, opacity: 0, scale, rotation };
        }
      };

      // Enhanced stagger animation with spring physics
      gsap.fromTo(elements,
        getInitialState(),
        { 
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1, 
          duration, 
          delay,
          stagger: {
            amount: stagger,
            from: "start",
            ease: "power2.out"
          },
          ease,
          // Add subtle scale bounce on completion
          onComplete: function() {
            gsap.to(this.targets(), {
              scale: 1.02,
              duration: 0.1,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut"
            });
          }
        }
      );
    }
  }, [selector, stagger, duration, delay, direction, distance, scale, rotation, ease]);

  return { containerRef, animate };
};

export default {
  useAdvancedTypewriter,
  useTextReveal,
  useMagneticEffect,
  useScrollReveal,
  useFloatingAnimation,
  useStaggerAnimation
};