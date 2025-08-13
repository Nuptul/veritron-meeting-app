import React, { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'

interface PremiumGlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'floating' | 'metallic'
  glowColor?: string
  enableShimmer?: boolean
  enableNoise?: boolean
  interactive?: boolean
  borderGlow?: boolean
}

export const PremiumGlassCard: React.FC<PremiumGlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  glowColor = 'rgba(212, 175, 55, 0.15)',
  enableShimmer = true,
  enableNoise = true,
  interactive = true,
  borderGlow = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 30
  })
  
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 200,
    damping: 30
  })

  useEffect(() => {
    if (!interactive || !cardRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      
      mouseX.set(x)
      mouseY.set(y)
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    const element = cardRef.current
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [interactive, mouseX, mouseY])

  const variants = {
    default: {
      background: `
        linear-gradient(135deg, 
          rgba(15, 15, 20, 0.6) 0%, 
          rgba(10, 10, 15, 0.8) 100%)
      `,
      backdropFilter: 'blur(20px) saturate(180%)',
      border: '1px solid rgba(136, 136, 136, 0.2)',
      boxShadow: `
        0 2px 8px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.02),
        inset 0 -1px 0 rgba(0, 0, 0, 0.2)
      `
    },
    elevated: {
      background: `
        linear-gradient(135deg, 
          rgba(20, 20, 25, 0.7) 0%, 
          rgba(15, 15, 20, 0.85) 100%)
      `,
      backdropFilter: 'blur(30px) saturate(200%)',
      border: '1px solid rgba(212, 175, 55, 0.2)',
      boxShadow: `
        0 8px 24px rgba(0, 0, 0, 0.3),
        0 0 40px ${glowColor},
        inset 0 1px 0 rgba(255, 255, 255, 0.03),
        inset 0 -1px 0 rgba(0, 0, 0, 0.3)
      `
    },
    floating: {
      background: `
        linear-gradient(135deg, 
          rgba(25, 25, 30, 0.5) 0%, 
          rgba(20, 20, 25, 0.7) 100%)
      `,
      backdropFilter: 'blur(40px) saturate(250%) brightness(1.1)',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      boxShadow: `
        0 20px 60px rgba(0, 0, 0, 0.4),
        0 0 80px ${glowColor},
        inset 0 2px 0 rgba(255, 255, 200, 0.05),
        inset 0 -2px 0 rgba(0, 0, 0, 0.4)
      `
    },
    metallic: {
      background: `
        linear-gradient(135deg,
          rgba(136, 136, 136, 0.1) 0%,
          rgba(212, 175, 55, 0.05) 25%,
          rgba(136, 136, 136, 0.1) 50%,
          rgba(212, 175, 55, 0.05) 75%,
          rgba(136, 136, 136, 0.1) 100%)
      `,
      backdropFilter: 'blur(25px) saturate(200%) contrast(1.2)',
      border: '1px solid rgba(212, 175, 55, 0.4)',
      boxShadow: `
        0 10px 40px rgba(212, 175, 55, 0.2),
        0 0 60px ${glowColor},
        inset 0 1px 0 rgba(255, 255, 200, 0.1),
        inset 0 -1px 0 rgba(0, 0, 0, 0.5)
      `
    }
  }

  const currentVariant = variants[variant]

  return (
    <motion.div
      ref={cardRef}
      className={`premium-glass-card relative overflow-hidden rounded-2xl h-full flex flex-col min-h-[450px] ${className}`}
      style={{
        ...currentVariant,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0
      }}
      whileHover={interactive ? {
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
      } : {}}
    >
      {/* Multi-layer glass effect */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10" />
      </div>

      {/* Shimmer effect */}
      {enableShimmer && (
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(
              105deg,
              transparent 40%,
              rgba(212, 175, 55, 0.1) 45%,
              rgba(212, 175, 55, 0.2) 50%,
              rgba(212, 175, 55, 0.1) 55%,
              transparent 60%
            )`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite'
          }}
        />
      )}

      {/* Interactive glow follow */}
      {interactive && (
        <div
          className="absolute pointer-events-none"
          style={{
            width: '200px',
            height: '200px',
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            opacity: 0.5,
            transition: 'opacity 0.3s ease',
            filter: 'blur(40px)'
          }}
        />
      )}

      {/* Noise texture overlay */}
      {enableNoise && (
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
      )}

      {/* Border glow animation */}
      {borderGlow && (
        <>
          <div className="absolute inset-0 rounded-2xl p-[1px]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-veritron-gold-400/30 to-transparent animate-border-glow" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/30 to-transparent" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export const PremiumGlassPanel: React.FC<PremiumGlassCardProps> = (props) => {
  return (
    <PremiumGlassCard
      {...props}
      className={`premium-glass-panel ${props.className || ''}`}
      variant={props.variant || 'elevated'}
      enableShimmer={props.enableShimmer !== false}
      enableNoise={props.enableNoise !== false}
    />
  )
}

export const PremiumGlassButton: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.3) 100%)',
      border: '1px solid rgba(212, 175, 55, 0.4)',
      color: '#d4af37'
    },
    secondary: {
      background: 'linear-gradient(135deg, rgba(136, 136, 136, 0.1) 0%, rgba(136, 136, 136, 0.2) 100%)',
      border: '1px solid rgba(136, 136, 136, 0.3)',
      color: '#8a9ba8'
    },
    ghost: {
      background: 'transparent',
      border: '1px solid rgba(136, 136, 136, 0.2)',
      color: '#e8e8e8'
    }
  }

  return (
    <motion.button
      onClick={onClick}
      className={`premium-glass-button relative overflow-hidden rounded-lg font-semibold backdrop-blur-xl ${sizeClasses[size]} ${className}`}
      style={variantStyles[variant]}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  )
}