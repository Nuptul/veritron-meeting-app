import React from 'react';
import { motion } from 'framer-motion';
import { useCardTilt, CardTiltOptions } from '../../hooks/useCardTilt';

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
  interactive?: boolean;
  tiltOptions?: CardTiltOptions;
  shadow?: 'none' | 'glass' | 'elevated';
  border?: 'none' | 'metallic' | 'subtle';
  glow?: boolean;
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    as: Component = motion.div,
    className = '',
    children,
    interactive = true,
    tiltOptions,
    shadow = 'glass',
    border = 'subtle',
    glow = false,
    ...rest
  },
  forwardedRef
) {
  const { ref, onMouseEnter, onMouseLeave, onMouseMove, onKeyDown, isHover, disableTilt } = useCardTilt(tiltOptions);

  const combinedRef = (node: HTMLDivElement | null) => {
    // assign to both refs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ref as any).current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef && typeof forwardedRef === 'object') (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  const base = 'relative rounded-2xl overflow-hidden will-change-transform h-full flex flex-col min-h-[450px]';
  const glass = 'bg-white/10 dark:bg-black/30 backdrop-blur-2xl backdrop-saturate-150';
  const metallic = border === 'metallic' ? 'border-gradient-veritron' : border === 'subtle' ? 'border border-white/20 dark:border-white/10' : '';
  const shadowCls = shadow === 'elevated' ? 'shadow-elevated' : shadow === 'glass' ? 'shadow-glass' : '';
  const glowCls = glow ? 'glow-veritron-hover' : '';

  return (
    <Component
      ref={combinedRef}
      tabIndex={0}
      role="group"
      aria-label={rest['aria-label']}
      className={`${base} ${glass} ${metallic} ${shadowCls} ${glowCls} ${className} transform-preserve-3d ${disableTilt ? '' : 'transition-transform-120'}`}
      onMouseEnter={interactive ? onMouseEnter : undefined}
      onMouseLeave={interactive ? onMouseLeave : undefined}
      onMouseMove={interactive ? onMouseMove : undefined}
      onKeyDown={interactive ? onKeyDown : undefined}
      {...rest}
    >
      {/* mirror shine overlay */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent translate-x-[-60%] skew-x-[-15deg] mix-blend-screen ${isHover ? 'animate-[shine_0.8s_ease-in-out_forwards]' : ''}`}
      />

      {/* inner content wrapper lifts on hover for z-depth */}
      <div className="relative p-6 md:p-8 tz-1 flex flex-col flex-1">
        {children}
      </div>
    </Component>
  );
});

export default Card;


