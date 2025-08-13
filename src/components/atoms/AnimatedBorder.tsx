import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedBorderProps {
  children: React.ReactNode
  variant?: 'gradient' | 'pulse' | 'shimmer' | 'neon'
  color?: string
  secondaryColor?: string
  borderWidth?: number
  borderRadius?: string
  speed?: number
  className?: string
}

export const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
  children,
  variant = 'gradient',
  color = '#d4af37',
  secondaryColor = '#8a9ba8',
  borderWidth = 2,
  borderRadius = '1rem',
  speed = 3,
  className = ''
}) => {
  const variants = {
    gradient: {
      background: `linear-gradient(90deg, ${color}, ${secondaryColor}, ${color})`,
      backgroundSize: '200% 100%',
      animation: `gradientMove ${speed}s linear infinite`
    },
    pulse: {
      background: color,
      animation: `pulseBorder ${speed}s ease-in-out infinite`
    },
    shimmer: {
      background: `linear-gradient(105deg, transparent 40%, ${color} 45%, ${color} 50%, ${color} 55%, transparent 60%)`,
      backgroundSize: '200% 100%',
      animation: `shimmerBorder ${speed}s linear infinite`
    },
    neon: {
      background: color,
      boxShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
      animation: `neonGlow ${speed}s ease-in-out infinite alternate`
    }
  }

  return (
    <div className={`animated-border-wrapper relative ${className}`}>
      {/* Animated border background */}
      <div
        className="absolute inset-0"
        style={{
          padding: `${borderWidth}px`,
          borderRadius,
          ...variants[variant],
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />
      
      {/* Corner accents */}
      {variant === 'gradient' && (
        <>
          <svg className="absolute top-0 left-0 w-6 h-6" viewBox="0 0 24 24">
            <path
              d="M 0 8 L 0 0 L 8 0"
              stroke={color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <svg className="absolute top-0 right-0 w-6 h-6" viewBox="0 0 24 24">
            <path
              d="M 16 0 L 24 0 L 24 8"
              stroke={color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <svg className="absolute bottom-0 left-0 w-6 h-6" viewBox="0 0 24 24">
            <path
              d="M 0 16 L 0 24 L 8 24"
              stroke={color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <svg className="absolute bottom-0 right-0 w-6 h-6" viewBox="0 0 24 24">
            <path
              d="M 16 24 L 24 24 L 24 16"
              stroke={color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </>
      )}

      {/* Content container */}
      <div className="relative z-10" style={{ borderRadius }}>
        {children}
      </div>

      {/* Additional effects based on variant */}
      {variant === 'neon' && (
        <div
          className="absolute inset-0 opacity-50 blur-xl"
          style={{
            background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
            borderRadius,
            animation: `neonPulse ${speed}s ease-in-out infinite`
          }}
        />
      )}

      <style jsx>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes pulseBorder {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes shimmerBorder {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }

        @keyframes neonGlow {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.2); }
        }

        @keyframes neonPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}

export const AnimatedConicBorder: React.FC<{
  children: React.ReactNode
  className?: string
  borderRadius?: string
  speed?: number
}> = ({ children, className = '', borderRadius = '1rem', speed = 4 }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Conic gradient border */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius,
          background: `conic-gradient(from var(--angle), #d4af37 0deg, #8a9ba8 90deg, #d4af37 180deg, #8a9ba8 270deg, #d4af37 360deg)`,
          animation: `rotateConic ${speed}s linear infinite`,
          padding: '2px',
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-30 blur-md"
        style={{
          borderRadius,
          background: `conic-gradient(from var(--angle), #d4af37 0deg, transparent 90deg, #d4af37 180deg, transparent 270deg, #d4af37 360deg)`,
          animation: `rotateConic ${speed}s linear infinite`
        }}
      />

      {/* Content */}
      <div className="relative z-10" style={{ borderRadius }}>
        {children}
      </div>

      <style jsx>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotateConic {
          0% { --angle: 0deg; }
          100% { --angle: 360deg; }
        }
      `}</style>
    </motion.div>
  )
}

export const PremiumBorderGlow: React.FC<{
  children: React.ReactNode
  className?: string
  intensity?: 'low' | 'medium' | 'high'
}> = ({ children, className = '', intensity = 'medium' }) => {
  const intensityStyles = {
    low: {
      boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
      borderColor: 'rgba(212, 175, 55, 0.3)'
    },
    medium: {
      boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), 0 0 80px rgba(212, 175, 55, 0.1)',
      borderColor: 'rgba(212, 175, 55, 0.4)'
    },
    high: {
      boxShadow: '0 0 60px rgba(212, 175, 55, 0.4), 0 0 120px rgba(212, 175, 55, 0.2), 0 0 180px rgba(212, 175, 55, 0.1)',
      borderColor: 'rgba(212, 175, 55, 0.5)'
    }
  }

  return (
    <motion.div
      className={`relative border-2 rounded-2xl ${className}`}
      style={intensityStyles[intensity]}
      whileHover={{
        scale: 1.02,
        boxShadow: intensity === 'high' 
          ? '0 0 80px rgba(212, 175, 55, 0.5), 0 0 160px rgba(212, 175, 55, 0.3)'
          : '0 0 60px rgba(212, 175, 55, 0.4)'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-2xl opacity-50">
        <div 
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)',
            animation: 'borderFlow 3s linear infinite',
            backgroundSize: '200% 100%'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes borderFlow {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
      `}</style>
    </motion.div>
  )
}