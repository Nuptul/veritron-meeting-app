import React from 'react'
import { motion } from 'framer-motion'

interface PremiumLoadingProps {
  size?: 'small' | 'medium' | 'large'
  variant?: 'gold' | 'aluminum' | 'glass'
  text?: string
  className?: string
}

export const PremiumSpinner: React.FC<PremiumLoadingProps> = ({
  size = 'medium',
  variant = 'gold',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  const variantStyles = {
    gold: 'border-amber-400/30 border-t-amber-400',
    aluminum: 'border-gray-400/30 border-t-gray-400',
    glass: 'border-white/30 border-t-white'
  }

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        border-2 rounded-full
        ${variantStyles[variant]}
        ${className}
      `}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}

export const PremiumPulse: React.FC<PremiumLoadingProps> = ({
  size = 'medium',
  variant = 'gold',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-6 h-6'
  }

  const variantStyles = {
    gold: 'bg-amber-400',
    aluminum: 'bg-gray-400',
    glass: 'bg-white/80'
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`
            ${sizeClasses[size]} 
            ${variantStyles[variant]}
            rounded-full
          `}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export const PremiumSkeleton: React.FC<{
  className?: string
  variant?: 'gold' | 'aluminum' | 'glass'
  animated?: boolean
}> = ({
  className = '',
  variant = 'glass',
  animated = true
}) => {
  const variantStyles = {
    gold: 'bg-gradient-to-r from-amber-200/20 via-amber-300/30 to-amber-200/20',
    aluminum: 'bg-gradient-to-r from-gray-200/20 via-gray-300/30 to-gray-200/20',
    glass: 'bg-gradient-to-r from-white/10 via-white/20 to-white/10'
  }

  return (
    <div className={`${variantStyles[variant]} ${className} rounded-lg overflow-hidden`}>
      {animated && (
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </div>
  )
}

export const PremiumLoadingCard: React.FC<{
  className?: string
  lines?: number
}> = ({
  className = '',
  lines = 3
}) => {
  return (
    <div className={`premium-glass-card p-6 ${className}`}>
      <div className="premium-glass-layers">
        <div className="premium-glass-base" />
        <div className="premium-glass-noise" />
        <div className="premium-glass-gradient" />
      </div>
      
      <div className="relative z-10 space-y-4">
        {/* Title skeleton */}
        <PremiumSkeleton className="h-6 w-3/4" />
        
        {/* Content lines */}
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <PremiumSkeleton
              key={i}
              className={`h-4 ${
                i === lines - 1 ? 'w-2/3' : 'w-full'
              }`}
            />
          ))}
        </div>
        
        {/* Button skeleton */}
        <PremiumSkeleton className="h-10 w-32 mt-6" />
      </div>
    </div>
  )
}

export const PremiumLoadingOverlay: React.FC<{
  isVisible: boolean
  text?: string
  className?: string
}> = ({
  isVisible,
  text = 'Loading...',
  className = ''
}) => {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        ${className}
      `}
    >
      <div className="premium-glass-card premium-glass-elevated p-8 text-center min-w-[200px]">
        <div className="premium-glass-layers">
          <div className="premium-glass-base" />
          <div className="premium-glass-noise" />
          <div className="premium-glass-gradient" />
        </div>
        
        <div className="relative z-10 space-y-4">
          <PremiumSpinner size="large" variant="gold" className="mx-auto" />
          {text && (
            <motion.p
              className="text-primary-contrast font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {text}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export const PremiumProgressBar: React.FC<{
  progress: number // 0-100
  variant?: 'gold' | 'aluminum' | 'glass'
  className?: string
  showPercentage?: boolean
}> = ({
  progress,
  variant = 'gold',
  className = '',
  showPercentage = true
}) => {
  const variantStyles = {
    gold: 'bg-amber-400',
    aluminum: 'bg-gray-400',
    glass: 'bg-white/90'
  }

  const clampedProgress = Math.max(0, Math.min(100, progress))

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-secondary-contrast">Progress</span>
        {showPercentage && (
          <span className="text-sm text-primary-contrast font-medium">
            {Math.round(clampedProgress)}%
          </span>
        )}
      </div>
      
      <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
        <motion.div
          className={`h-2 ${variantStyles[variant]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        />
      </div>
    </div>
  )
}

export const PremiumLoadingText: React.FC<{
  text: string
  variant?: 'dots' | 'pulse' | 'wave'
  className?: string
}> = ({
  text,
  variant = 'dots',
  className = ''
}) => {
  const baseText = text.replace(/\.+$/, '') // Remove existing dots

  if (variant === 'dots') {
    return (
      <span className={`text-secondary-contrast ${className}`}>
        {baseText}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ...
        </motion.span>
      </span>
    )
  }

  if (variant === 'pulse') {
    return (
      <motion.span
        className={`text-secondary-contrast ${className}`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {text}
      </motion.span>
    )
  }

  // Wave variant
  return (
    <span className={`text-secondary-contrast ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          animate={{
            y: [0, -4, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// Main loading component that combines multiple elements
export const PremiumLoading: React.FC<{
  type?: 'spinner' | 'pulse' | 'skeleton' | 'overlay' | 'progress'
  size?: 'small' | 'medium' | 'large'
  variant?: 'gold' | 'aluminum' | 'glass'
  text?: string
  progress?: number
  className?: string
  [key: string]: any
}> = ({ 
  type = 'spinner', 
  ...props 
}) => {
  switch (type) {
    case 'spinner':
      return <PremiumSpinner {...props} />
    case 'pulse':
      return <PremiumPulse {...props} />
    case 'skeleton':
      return <PremiumSkeleton {...props} />
    case 'overlay':
      return <PremiumLoadingOverlay {...props} />
    case 'progress':
      return <PremiumProgressBar {...props} />
    default:
      return <PremiumSpinner {...props} />
  }
}

export default PremiumLoading