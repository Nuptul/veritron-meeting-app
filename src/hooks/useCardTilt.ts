import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export type CardTiltOptions = {
  maxTiltDeg?: number; // maximum degrees of tilt on each axis
  translateZ?: number; // amount of pop-out on hover
  scale?: number; // hover scale factor
};

export function useCardTilt(options: CardTiltOptions = {}) {
  const { maxTiltDeg = 10, translateZ = 40, scale = 1.02 } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isHover, setIsHover] = useState(false);

  const disableTilt = useMemo(() => {
    // Respect reduced motion and avoid tilt on coarse pointers (mobile)
    const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    return reduced || coarse;
  }, []);

  const applyTransform = useCallback((xPercent: number, yPercent: number) => {
    const tiltX = (yPercent - 0.5) * -2 * maxTiltDeg;
    const tiltY = (xPercent - 0.5) * 2 * maxTiltDeg;
    if (!ref.current) return;
    (ref.current as HTMLDivElement).style.transform = `perspective(1000px) rotate3d(1,0,0, ${tiltX}deg) rotate3d(0,1,0, ${tiltY}deg) translateZ(${isHover ? translateZ : 0}px) scale(${isHover ? scale : 1})`;
  }, [isHover, maxTiltDeg, translateZ, scale]);

  const resetTransform = useCallback(() => {
    if (!ref.current) return;
    (ref.current as HTMLDivElement).style.transform = 'perspective(1000px) rotate3d(1,0,0, 0deg) rotate3d(0,1,0, 0deg) translateZ(0) scale(1)';
  }, []);

  useEffect(() => {
    if (disableTilt) return;
    resetTransform();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [disableTilt, resetTransform]);

  const onMouseEnter = useCallback(() => {
    if (disableTilt) return;
    setIsHover(true);
  }, [disableTilt]);

  const onMouseLeave = useCallback(() => {
    if (disableTilt) return;
    setIsHover(false);
    resetTransform();
  }, [disableTilt, resetTransform]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (disableTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = Math.max(0, Math.min(1, x / rect.width));
    const yPercent = Math.max(0, Math.min(1, y / rect.height));

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => applyTransform(xPercent, yPercent));
  }, [applyTransform, disableTilt]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disableTilt) return;
    const step = 0.1; // 10% steps on each arrow
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        applyTransform(0.5, 0.5 - step);
        break;
      case 'ArrowDown':
        e.preventDefault();
        applyTransform(0.5, 0.5 + step);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        applyTransform(0.5 - step, 0.5);
        break;
      case 'ArrowRight':
        e.preventDefault();
        applyTransform(0.5 + step, 0.5);
        break;
      case 'Escape':
        resetTransform();
        break;
    }
  }, [applyTransform, disableTilt, resetTransform]);

  return {
    ref,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onKeyDown,
    isHover,
    disableTilt
  } as const;
}



