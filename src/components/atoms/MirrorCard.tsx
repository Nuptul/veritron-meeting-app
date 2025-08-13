import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface MirrorCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'chrome' | 'platinum' | 'silver' | 'dark-mirror' | 'gold'
  enableReflection?: boolean
  enableParallax?: boolean
}

export const MirrorCard: React.FC<MirrorCardProps> = ({
  children,
  className = '',
  variant = 'chrome',
  enableReflection = true,
  enableParallax = true
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Mouse position for reflection effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring animations for smooth movement
  const springConfig = { damping: 25, stiffness: 120 }
  const xSpring = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)
  
  // Transform values for 3D tilt
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-7deg', '7deg'])
  
  // Reflection gradient position
  const gradientX = useTransform(xSpring, [-0.5, 0.5], ['0%', '100%'])
  const gradientY = useTransform(ySpring, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableParallax || !cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) / rect.width
    const y = (e.clientY - centerY) / rect.height
    
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const variantStyles = {
    chrome: {
      background: `linear-gradient(145deg, 
        #ffffff 0%, 
        #f5f5f5 10%, 
        #e8e8e8 20%, 
        #d3d3d3 30%, 
        #bebebe 40%, 
        #a9a9a9 50%, 
        #949494 60%, 
        #7f7f7f 70%, 
        #6a6a6a 80%, 
        #555555 90%, 
        #404040 100%)`,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    platinum: {
      background: `linear-gradient(145deg,
        #ffffff 0%,
        #fafafa 15%,
        #f0f0f0 30%,
        #e0e0e0 45%,
        #d0d0d0 60%,
        #c0c0c0 75%,
        #b0b0b0 90%,
        #a0a0a0 100%)`,
      borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    silver: {
      background: `linear-gradient(145deg,
        #f9f9f9 0%,
        #e9e9e9 20%,
        #d9d9d9 40%,
        #c9c9c9 60%,
        #b9b9b9 80%,
        #a9a9a9 100%)`,
      borderColor: 'rgba(255, 255, 255, 0.25)',
    },
    gold: {
      background: `linear-gradient(145deg,
        #1a1410 0%,
        #2d2518 8%,
        #3d3420 16%,
        #4a3f2a 24%,
        #574834 32%,
        #64513e 40%,
        #715a48 48%,
        #7e6352 56%,
        #715a48 64%,
        #64513e 72%,
        #574834 80%,
        #4a3f2a 88%,
        #3d3420 94%,
        #2d2518 100%)`,
      borderColor: 'rgba(126, 99, 82, 0.3)',
    },
    'dark-mirror': {
      background: `linear-gradient(145deg,
        #2a2a2a 0%,
        #242424 15%,
        #1e1e1e 30%,
        #181818 45%,
        #121212 60%,
        #0c0c0c 75%,
        #060606 90%,
        #000000 100%)`,
      borderColor: 'rgba(255, 255, 255, 0.1)',
    }
  }

  const currentVariant = variantStyles[variant]

  return (
    <motion.div
      ref={cardRef}
      className={`mirror-card relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX: enableParallax ? rotateX : 0,
        rotateY: enableParallax ? rotateY : 0,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Base card with metallic gradient */}
      <div 
        className="mirror-card-base relative rounded-2xl overflow-hidden h-full flex flex-col min-h-[450px]"
        style={{
          background: currentVariant.background,
          border: `1px solid ${currentVariant.borderColor}`,
          boxShadow: `
            0 2px 4px rgba(0,0,0,0.1),
            0 4px 8px rgba(0,0,0,0.08),
            0 8px 16px rgba(0,0,0,0.06),
            0 16px 32px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,0.5),
            inset 0 -1px 0 rgba(0,0,0,0.2)
          `,
        }}
      >
        {/* Reflection layer */}
        {enableReflection && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: variant === 'gold' 
                ? `linear-gradient(
                    105deg,
                    transparent 40%,
                    rgba(199, 172, 132, 0.12) 45%,
                    rgba(212, 185, 145, 0.18) 48%,
                    rgba(225, 198, 158, 0.22) 50%,
                    rgba(212, 185, 145, 0.18) 52%,
                    rgba(199, 172, 132, 0.12) 55%,
                    transparent 60%
                  )`
                : `linear-gradient(
                    105deg,
                    transparent 40%,
                    rgba(255, 255, 255, 0.1) 45%,
                    rgba(255, 255, 255, 0.2) 48%,
                    rgba(255, 255, 255, 0.3) 50%,
                    rgba(255, 255, 255, 0.2) 52%,
                    rgba(255, 255, 255, 0.1) 55%,
                    transparent 60%
                  )`,
              backgroundPosition: `${gradientX} ${gradientY}`,
              opacity: isHovered ? 1 : 0.7,
              mixBlendMode: 'overlay',
            }}
            animate={{
              opacity: isHovered ? [0.7, 1, 0.7] : 0.7,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Metallic shine effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: variant === 'gold' 
              ? `radial-gradient(
                  circle at 30% 30%,
                  rgba(212, 185, 145, 0.15) 0%,
                  rgba(199, 172, 132, 0.08) 20%,
                  rgba(186, 159, 119, 0.04) 40%,
                  transparent 60%
                )`
              : `radial-gradient(
                  circle at 30% 30%,
                  rgba(255, 255, 255, 0.4) 0%,
                  rgba(255, 255, 255, 0.2) 20%,
                  rgba(255, 255, 255, 0.1) 40%,
                  transparent 60%
                )`,
            opacity: 0.6,
          }}
        />

        {/* Mirror reflection streaks */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            background: `repeating-linear-gradient(
              90deg,
              transparent 0px,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 2px,
              transparent 4px
            )`,
          }}
        />

        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col flex-1">
          {children}
        </div>

        {/* Bottom edge highlight */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          }}
        />

        {/* Top edge shadow */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent)',
          }}
        />
      </div>

      {/* Subtle hover glow - adaptive based on variant */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: isHovered 
            ? variant === 'gold' 
              ? '0 0 20px rgba(199, 172, 132, 0.2), 0 0 40px rgba(186, 159, 119, 0.15)' 
              : '0 0 30px rgba(192, 192, 192, 0.2), 0 0 60px rgba(192, 192, 192, 0.1)'
            : 'none',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default MirrorCard