import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { gsap } from 'gsap';
import { useMagneticEffect } from '../../hooks/useAdvancedAnimations';

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient' | 'metal' | 'glass-chip';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  effect?: 'magnetic' | 'ripple' | 'glow' | 'morph';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  effect = 'glow',
  icon,
  iconPosition = 'right'
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const magneticRef = useMagneticEffect(0.2);

  // Variant styles
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-veritron-gold-500 via-veritron-aluminum-400 to-veritron-gold-600 
      text-veritron-gunmetal-900 font-semibold veritron-display
      shadow-lg hover:shadow-elevated
      border-0
    `,
    secondary: `
      bg-transparent border-2 border-veritron-aluminum-500 
      text-veritron-aluminum-200 font-semibold veritron-display
      hover:bg-veritron-aluminum-500/10 hover:border-veritron-aluminum-400
    `,
    ghost: `
      bg-transparent text-veritron-gold-400 font-medium
      hover:bg-veritron-gold-400/10
    `,
    gradient: `
      bg-gradient-to-r from-veritron-gold-400 via-veritron-gold-500 to-veritron-aluminum-500
      text-veritron-gunmetal-900 font-bold veritron-display
      shadow-2xl hover:shadow-elevated
    `,
    metal: `
      relative veritron-display font-bold text-veritron-gunmetal-900
      bg-gradient-to-r from-[#f4e99c] via-[#d4af37] to-[#8a9ba8]
      shadow-lg hover:shadow-elevated border-0 rounded-xl
    `,
    'glass-chip': `
      glass-veritron border border-white/20 text-white veritron-display font-semibold rounded-xl
    `
  } as const;

  // Size styles
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    xl: 'px-10 py-5 text-xl rounded-2xl'
  };

  // Ripple effect
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rippleRef.current && buttonRef.current) {
      const button = buttonRef.current;
      const ripple = rippleRef.current;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      gsap.fromTo(ripple,
        { scale: 0, opacity: 0.6 },
        { scale: 4, opacity: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
    
    if (onClick) onClick();
  };

  // Glow effect animation
  const [glowSpring, setGlowSpring] = useSpring(() => ({
    boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
    transform: 'scale(1) translateY(0px)',
    config: { tension: 300, friction: 10 }
  }));

  const handleMouseEnter = () => {
    if (effect === 'glow') {
      setGlowSpring({
        boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)',
        transform: 'scale(1.05) translateY(-2px)'
      });
    }
  };

  const handleMouseLeave = () => {
    if (effect === 'glow') {
      setGlowSpring({
        boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)',
        transform: 'scale(1) translateY(0px)'
      });
    }
  };

  // Morph effect
  const morphVariants = {
    initial: { borderRadius: '1rem' },
    hover: { 
      borderRadius: ['1rem', '2rem', '1rem'],
      transition: { 
        duration: 0.5, 
        times: [0, 0.5, 1],
        repeat: Infinity 
      }
    }
  };

  const buttonComponent = (
    <motion.button
      ref={effect === 'magnetic' ? magneticRef as any : buttonRef}
      className={`
        relative overflow-hidden transition-all duration-300
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={effect === 'ripple' ? handleRipple : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      variants={effect === 'morph' ? morphVariants : undefined}
      initial="initial"
      whileHover={effect === 'morph' ? 'hover' : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && (
          <motion.span
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {icon}
          </motion.span>
        )}
        
        <span>{children}</span>
        
        {icon && iconPosition === 'right' && (
          <motion.span
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ x: 5 }}
          >
            {icon}
          </motion.span>
        )}
      </span>

      {/* Ripple Effect */}
      {effect === 'ripple' && (
        <div
          ref={rippleRef}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{ transform: 'scale(0)' }}
        />
      )}

      {/* Gradient Overlay Animation */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-veritron-gold-400 to-veritron-gold-500 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        animate={{
          x: ['0%', '200%'],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut'
          }
        }}
      />
    </motion.button>
  );

  // Apply glow effect wrapper
  if (effect === 'glow') {
    return (
      <animated.div style={glowSpring}>
        {buttonComponent}
      </animated.div>
    );
  }

  return buttonComponent;
};

// Specialized CTA Button Component
export const CTAButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'lg' | 'xl';
  className?: string;
}> = ({ children, onClick, variant = 'primary', size = 'lg', className = '' }) => {
  return (
    <AnimatedButton
      variant={variant}
      size={size}
      effect="glow"
      onClick={onClick}
      className={className}
      icon={
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          whileHover={{ x: 3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7,7 17,7 17,17"></polyline>
        </motion.svg>
      }
    >
      {children}
    </AnimatedButton>
  );
};

export default AnimatedButton;