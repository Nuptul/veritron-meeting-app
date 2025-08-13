import React from 'react'
import { motion } from 'framer-motion'
import { useButtonSound, useHoverSound } from '../../hooks/useSound'

interface PremiumButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'aluminum' | 'gunmetal' | 'gold'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  onClick,
  variant = 'gold',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false
}) => {
  const playClick = useButtonSound();
  const playHover = useHoverSound();
  
  const sizeClasses = {
    small: 'btn-small',
    medium: 'btn-medium', 
    large: 'btn-large'
  }

  const variantClasses = {
    aluminum: 'btn-aluminum',
    gunmetal: 'btn-gunmetal',
    gold: 'btn-gold'
  }

  const handleClick = () => {
    if (!disabled) {
      playClick();
      onClick?.();
    }
  };

  const handleHover = () => {
    if (!disabled) {
      playHover();
    }
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      onMouseEnter={handleHover}
      disabled={disabled}
      className={`veritron-button ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { 
        scale: 1.02,
        y: -2
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.98,
        y: 0
      } : {}}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        duration: 0.15 
      }}
      style={{
        transformOrigin: 'center center',
        overflow: 'hidden', // Ensure all animations stay contained
        contain: 'layout style paint' // Modern containment
      }}
    >
      <span className="relative z-20 flex items-center justify-center gap-2">{children}</span>
    </motion.button>
  )
}

// Enhanced Glass Morphism Button Component
export const PremiumGlassButton: React.FC<PremiumButtonProps> = ({
  children,
  onClick,
  variant = 'gold',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false
}) => {
  const playClick = useButtonSound();
  const playHover = useHoverSound();
  
  const sizeClasses = {
    small: 'h-8 px-4 text-sm',
    medium: 'h-12 px-6 text-base',
    large: 'h-14 px-8 text-lg'
  }

  const variantStyles = {
    aluminum: 'bg-gradient-to-r from-gray-100/90 to-gray-200/80 text-gray-800 border-gray-300/50 hover:from-gray-200/90 hover:to-gray-300/80',
    gunmetal: 'bg-gradient-to-r from-gray-800/90 to-gray-900/80 text-white border-gray-600/50 hover:from-gray-700/90 hover:to-gray-800/80',
    gold: 'bg-gradient-to-r from-amber-200/90 to-yellow-300/80 text-amber-900 border-amber-400/50 hover:from-amber-300/90 hover:to-yellow-400/80'
  }

  const handleClick = () => {
    if (!disabled) {
      playClick();
      onClick?.();
    }
  };

  const handleHover = () => {
    if (!disabled) {
      playHover();
    }
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      onMouseEnter={handleHover}
      disabled={disabled}
      className={`
        premium-glass-card relative overflow-hidden
        ${sizeClasses[size]} 
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        backdrop-blur-xl border-2 rounded-xl
        font-semibold transition-all duration-300
        hover:scale-105 hover:shadow-2xl
        active:scale-95 active:shadow-lg
        ${className}
      `}
      whileHover={!disabled ? { 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        contain: 'layout style paint' // Modern containment for glass button
      }}
    >
      <div className="premium-glass-layers">
        <div className="premium-glass-base" />
        <div className="premium-glass-noise" />
        <div className="premium-glass-gradient" />
        <div className="premium-glass-border-glow" />
        <div className="premium-glass-shimmer" />
      </div>
      <span className="relative z-20 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}

export default PremiumButton