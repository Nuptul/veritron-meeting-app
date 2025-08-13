import { useEffect, useRef, MutableRefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin);

export interface GSAPTimelineConfig {
  paused?: boolean;
  delay?: number;
  repeat?: number;
  repeatDelay?: number;
  yoyo?: boolean;
  ease?: string;
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: () => void;
}

export interface GSAPScrollTriggerConfig {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | string | Element;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

/**
 * Custom hook for GSAP timeline animations with automatic cleanup
 */
export const useGSAP = () => {
  const timeline = useRef<gsap.core.Timeline>();
  const animations = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    timeline.current = gsap.timeline();
    
    return () => {
      // Clean up timeline and animations on unmount
      if (timeline.current) {
        timeline.current.kill();
      }
      animations.current.forEach(anim => anim.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const createTimeline = (config?: GSAPTimelineConfig) => {
    const tl = gsap.timeline(config);
    timeline.current = tl;
    return tl;
  };

  const animate = (
    target: gsap.TweenTarget,
    vars: gsap.TweenVars,
    position?: gsap.Position
  ) => {
    if (timeline.current) {
      return timeline.current.to(target, vars, position);
    }
    const tween = gsap.to(target, vars);
    animations.current.push(tween);
    return tween;
  };

  const animateFrom = (
    target: gsap.TweenTarget,
    vars: gsap.TweenVars,
    position?: gsap.Position
  ) => {
    if (timeline.current) {
      return timeline.current.from(target, vars, position);
    }
    const tween = gsap.from(target, vars);
    animations.current.push(tween);
    return tween;
  };

  const animateFromTo = (
    target: gsap.TweenTarget,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars,
    position?: gsap.Position
  ) => {
    if (timeline.current) {
      return timeline.current.fromTo(target, fromVars, toVars, position);
    }
    const tween = gsap.fromTo(target, fromVars, toVars);
    animations.current.push(tween);
    return tween;
  };

  const createScrollTrigger = (
    target: gsap.TweenTarget,
    vars: gsap.TweenVars,
    scrollConfig: GSAPScrollTriggerConfig
  ) => {
    const tween = gsap.to(target, {
      ...vars,
      scrollTrigger: scrollConfig
    });
    animations.current.push(tween);
    return tween;
  };

  const stagger = (
    targets: gsap.TweenTarget,
    vars: gsap.TweenVars & { stagger?: gsap.StaggerVars },
    position?: gsap.Position
  ) => {
    if (timeline.current) {
      return timeline.current.to(targets, vars, position);
    }
    const tween = gsap.to(targets, vars);
    animations.current.push(tween);
    return tween;
  };

  const pause = () => timeline.current?.pause();
  const play = () => timeline.current?.play();
  const restart = () => timeline.current?.restart();
  const reverse = () => timeline.current?.reverse();
  const seek = (position: string | number) => timeline.current?.seek(position);

  return {
    timeline: timeline.current,
    createTimeline,
    animate,
    animateFrom,
    animateFromTo,
    createScrollTrigger,
    stagger,
    pause,
    play,
    restart,
    reverse,
    seek,
    gsap // Expose GSAP for direct access
  };
};

/**
 * Hook for entrance animations on mount
 */
export const useEntranceAnimation = (
  ref: MutableRefObject<HTMLElement | null>,
  animation: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate' = 'fadeIn',
  delay: number = 0,
  duration: number = 0.6
) => {
  useEffect(() => {
    if (!ref.current) return;

    const animations = {
      fadeIn: { opacity: 0, y: 20 },
      slideUp: { y: 50, opacity: 0 },
      slideDown: { y: -50, opacity: 0 },
      slideLeft: { x: 50, opacity: 0 },
      slideRight: { x: -50, opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
      rotate: { rotation: 10, opacity: 0 }
    };

    gsap.fromTo(ref.current, 
      animations[animation],
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotation: 0,
        duration,
        delay,
        ease: "power2.out"
      }
    );
  }, [ref, animation, delay, duration]);
};

/**
 * Hook for hover animations
 */
export const useHoverAnimation = (
  ref: MutableRefObject<HTMLElement | null>,
  hoverVars: gsap.TweenVars = { scale: 1.05 },
  duration: number = 0.3
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let hoverTween: gsap.core.Tween;

    const handleMouseEnter = () => {
      hoverTween = gsap.to(element, { ...hoverVars, duration, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(element, { 
        scale: 1, 
        rotation: 0, 
        x: 0, 
        y: 0, 
        duration, 
        ease: "power2.out" 
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (hoverTween) hoverTween.kill();
    };
  }, [ref, hoverVars, duration]);
};

/**
 * Hook for text animation effects
 */
export const useTextAnimation = (
  ref: MutableRefObject<HTMLElement | null>,
  type: 'typewriter' | 'fadeInWords' | 'slideInWords' | 'scramble' = 'typewriter',
  delay: number = 0
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const originalText = element.textContent || '';

    switch (type) {
      case 'typewriter':
        gsap.to(element, {
          duration: originalText.length * 0.05,
          text: originalText,
          delay,
          ease: "none"
        });
        break;

      case 'fadeInWords':
        const words = originalText.split(' ');
        element.innerHTML = words.map(word => `<span style="opacity: 0">${word}</span>`).join(' ');
        gsap.to(element.children, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay,
          ease: "power2.out"
        });
        break;

      case 'slideInWords':
        const wordsSlide = originalText.split(' ');
        element.innerHTML = wordsSlide.map(word => 
          `<span style="display: inline-block; transform: translateY(20px); opacity: 0">${word}</span>`
        ).join(' ');
        gsap.to(element.children, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          delay,
          ease: "back.out(1.7)"
        });
        break;

      case 'scramble':
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const scrambleText = (target: string, duration: number = 1) => {
          const steps = 30;
          const stepDuration = duration / steps;
          
          for (let i = 0; i <= steps; i++) {
            setTimeout(() => {
              const progress = i / steps;
              const scrambledLength = Math.floor((1 - progress) * target.length);
              let result = target.substring(0, target.length - scrambledLength);
              
              for (let j = 0; j < scrambledLength; j++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
              }
              
              element.textContent = result;
            }, delay * 1000 + i * stepDuration * 1000);
          }
        };
        scrambleText(originalText, 1);
        break;
    }
  }, [ref, type, delay]);
};

export default useGSAP;