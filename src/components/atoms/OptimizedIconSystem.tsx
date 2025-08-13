import React from 'react'
import { motion, Variants } from 'framer-motion'

// Unified Icon Props
interface IconProps {
  size?: number
  color?: string
  secondaryColor?: string
  strokeWidth?: number
  animate?: boolean
  variant?: 'default' | 'gradient' | 'metallic' | 'glow'
  className?: string
}

// Shared gradient definitions for consistency
const GradientDefs: React.FC = () => (
  <defs>
    <linearGradient id="veritron-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#d4af37" />
      <stop offset="50%" stopColor="#f4c838" />
      <stop offset="100%" stopColor="#b88c34" />
    </linearGradient>
    <linearGradient id="veritron-aluminum" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#e2e2e2" />
      <stop offset="50%" stopColor="#c4c4c4" />
      <stop offset="100%" stopColor="#8a9ba8" />
    </linearGradient>
    <radialGradient id="veritron-glow">
      <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
      <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
    </radialGradient>
  </defs>
)

// Animation variants for icons
const iconAnimations: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 5,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  tap: { scale: 0.95 },
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  }
}

// Icon wrapper component for consistent animations
export const IconWrapper: React.FC<{
  children: React.ReactNode
  animate?: boolean
  className?: string
}> = ({ children, animate = true, className = '' }) => {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      variants={animate ? iconAnimations : undefined}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </motion.div>
  )
}

// Optimized AI/ML Icon
export const OptimizedAIMLIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  variant = 'default',
  animate = false,
  className = ''
}) => {
  const fillColor = variant === 'gradient' ? 'url(#veritron-gold)' : color
  
  return (
    <IconWrapper animate={animate} className={className}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <GradientDefs />
        {variant === 'glow' && (
          <circle cx="12" cy="12" r="11" fill="url(#veritron-glow)" opacity="0.3" />
        )}
        <path
          d="M12 2L2 7L12 12L22 7L12 2Z"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17L12 22L22 17"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L12 17L22 12"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  )
}

// Optimized Cloud Icon
export const OptimizedCloudIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  variant = 'default',
  animate = false,
  className = ''
}) => {
  const fillColor = variant === 'gradient' ? 'url(#veritron-aluminum)' : color
  
  return (
    <IconWrapper animate={animate} className={className}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <GradientDefs />
        {variant === 'glow' && (
          <ellipse cx="12" cy="15" rx="10" ry="6" fill="url(#veritron-glow)" opacity="0.3" />
        )}
        <path
          d="M18 10H16.74C16.36 7.68 14.37 6 12 6C9.11 6 6.73 8.07 6.52 10.78C4.34 11.19 2.73 13.04 2.73 15.27C2.73 17.79 4.78 19.82 7.31 19.82H18C20.21 19.82 22 18.05 22 15.86C22 13.67 20.21 11.9 18 10Z"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconWrapper>
  )
}

// Optimized Database Icon
export const OptimizedDatabaseIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  variant = 'default',
  animate = false,
  className = ''
}) => {
  const fillColor = variant === 'gradient' ? 'url(#veritron-gold)' : color
  
  return (
    <IconWrapper animate={animate} className={className}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <GradientDefs />
        {variant === 'glow' && (
          <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#veritron-glow)" opacity="0.3" />
        )}
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke={fillColor} strokeWidth={strokeWidth} />
        <path d="M21 5V19C21 20.66 16.97 22 12 22C7.03 22 3 20.66 3 19V5" stroke={fillColor} strokeWidth={strokeWidth} />
        <path d="M21 12C21 13.66 16.97 15 12 15C7.03 15 3 13.66 3 12" stroke={fillColor} strokeWidth={strokeWidth} />
      </svg>
    </IconWrapper>
  )
}

// Optimized Development Icon
export const OptimizedDevelopmentIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  variant = 'default',
  animate = false,
  className = ''
}) => {
  const fillColor = variant === 'gradient' ? 'url(#veritron-aluminum)' : color
  
  return (
    <IconWrapper animate={animate} className={className}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <GradientDefs />
        {variant === 'glow' && (
          <rect x="2" y="3" width="20" height="18" rx="2" fill="url(#veritron-glow)" opacity="0.3" />
        )}
        <rect x="2" y="3" width="20" height="18" rx="2" stroke={fillColor} strokeWidth={strokeWidth} />
        <path d="M8 10L6 12L8 14" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 10L18 12L16 14" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 10L10 14" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconWrapper>
  )
}

// Optimized API Icon
export const OptimizedAPIIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  variant = 'default',
  animate = false,
  className = ''
}) => {
  const fillColor = variant === 'gradient' ? 'url(#veritron-gold)' : color
  
  return (
    <IconWrapper animate={animate} className={className}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <GradientDefs />
        {variant === 'glow' && (
          <circle cx="12" cy="12" r="10" fill="url(#veritron-glow)" opacity="0.3" />
        )}
        <path d="M7 8H4V16H7" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 8H20V16H17" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke={fillColor} strokeWidth={strokeWidth} />
        <path d="M9 12H7" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M17 12H15" stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    </IconWrapper>
  )
}

// Optimized UI/UX Icon
export const OptimizedUIUXIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  variant = 'default',
  animate = false,
  className = ''
}) => {
  const fillColor = variant === 'gradient' ? 'url(#veritron-aluminum)' : color
  
  return (
    <IconWrapper animate={animate} className={className}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <GradientDefs />
        {variant === 'glow' && (
          <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#veritron-glow)" opacity="0.3" />
        )}
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={fillColor} strokeWidth={strokeWidth} />
        <rect x="7" y="7" width="4" height="4" rx="1" stroke={fillColor} strokeWidth={strokeWidth} />
        <rect x="13" y="7" width="4" height="4" rx="1" stroke={fillColor} strokeWidth={strokeWidth} />
        <rect x="7" y="13" width="10" height="4" rx="1" stroke={fillColor} strokeWidth={strokeWidth} />
      </svg>
    </IconWrapper>
  )
}

// Icon collection export
export const OptimizedIcons = {
  AIML: OptimizedAIMLIcon,
  Cloud: OptimizedCloudIcon,
  Database: OptimizedDatabaseIcon,
  Development: OptimizedDevelopmentIcon,
  API: OptimizedAPIIcon,
  UIUX: OptimizedUIUXIcon
}

// Usage hook for icon animations
export const useIconAnimation = (enabled: boolean = true) => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [isActive, setIsActive] = React.useState(false)
  
  const handlers = enabled ? {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onMouseDown: () => setIsActive(true),
    onMouseUp: () => setIsActive(false)
  } : {}
  
  return {
    isHovered,
    isActive,
    handlers,
    animationProps: {
      animate: isHovered ? 'hover' : isActive ? 'tap' : 'initial',
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    }
  }
}