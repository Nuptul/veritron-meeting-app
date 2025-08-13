import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// =======================
// KINETIC TYPOGRAPHY SHOWCASE
// =======================

interface KineticTypographyProps {
  children: string
  variant?: 'scroll-reveal' | 'word-cascade' | 'letter-float' | 'parallax' | 'morph' | 'gradient-flow' | 'blur-focus' | 'char-reveal'
  className?: string
  delay?: number
  stagger?: number
  intensity?: 'subtle' | 'normal' | 'dramatic'
}

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  children,
  variant = 'scroll-reveal',
  className = '',
  delay = 0,
  stagger = 0.1,
  intensity = 'normal'
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    // Apply CSS classes based on variant
    const element = textRef.current
    element.classList.add(variant)

    // Set CSS custom properties for dynamic control
    element.style.setProperty('--animation-delay', `${delay}s`)
    element.style.setProperty('--stagger-delay', `${stagger}s`)

    // Intensity-based property adjustments
    const intensitySettings = {
      subtle: {
        '--text-float-distance': 'clamp(1px, 0.2vw, 3px)',
        '--text-slide-distance': 'clamp(10px, 2vw, 20px)',
        '--motion-smooth': '400ms'
      },
      normal: {
        '--text-float-distance': 'clamp(2px, 0.5vw, 8px)',
        '--text-slide-distance': 'clamp(20px, 4vw, 60px)',
        '--motion-smooth': '300ms'
      },
      dramatic: {
        '--text-float-distance': 'clamp(4px, 0.8vw, 16px)',
        '--text-slide-distance': 'clamp(40px, 6vw, 100px)',
        '--motion-smooth': '600ms'
      }
    }

    Object.entries(intensitySettings[intensity]).forEach(([property, value]) => {
      element.style.setProperty(property, value)
    })

    // Special handling for word and character-based animations
    if (variant === 'word-cascade' || variant === 'char-reveal') {
      const text = element.textContent || ''
      const isWordBased = variant === 'word-cascade'
      const units = isWordBased ? text.split(' ') : text.split('')

      element.innerHTML = units.map((unit, index) => {
        const tag = isWordBased ? 'span' : 'span'
        const className = isWordBased ? 'kinetic-word-reveal' : 'char-reveal-scroll'
        const indexVar = isWordBased ? '--word-index' : '--char-index'
        
        return `<${tag} class="${className}" style="${indexVar}: ${index}; animation-delay: ${index * stagger}s">${unit}${isWordBased ? ' ' : ''}</${tag}>`
      }).join('')
    }

    // Letter floating requires individual letter wrapping
    if (variant === 'letter-float') {
      const text = element.textContent || ''
      element.innerHTML = text.split('').map((letter, index) => {
        return `<span class="letter-float" style="--letter-index: ${index}; animation-delay: ${index * stagger}s">${letter}</span>`
      }).join('')
    }

    // Cleanup function
    return () => {
      if (element) {
        element.classList.remove(variant)
      }
    }
  }, [variant, delay, stagger, intensity])

  return (
    <div ref={containerRef} className={`kinetic-typography-container ${className}`}>
      <span
        ref={textRef}
        className="kinetic-text motion-element"
        data-text={children}
      >
        {children}
      </span>
    </div>
  )
}

// =======================
// SPECIALIZED TYPOGRAPHY COMPONENTS
// =======================

// Hero text with multiple animation layers
export const HeroKineticText: React.FC<{ children: string; className?: string }> = ({ children, className = '' }) => (
  <motion.div
    className={`hero-kinetic-text ${className}`}
    initial={{ opacity: 0, y: 100, rotateX: -15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }}
  >
    <KineticTypography variant="scroll-reveal" intensity="dramatic" className="text-4xl md:text-6xl lg:text-7xl font-bold">
      {children}
    </KineticTypography>
    <div className="hero-text-shadow absolute inset-0 -z-10 text-glow-pulse opacity-30">
      {children}
    </div>
  </motion.div>
)

// Subtitle with flowing gradient animation
export const SubtitleKineticText: React.FC<{ children: string; className?: string }> = ({ children, className = '' }) => (
  <KineticTypography
    variant="gradient-flow"
    intensity="subtle"
    className={`gradient-text-animated text-lg md:text-xl lg:text-2xl ${className}`}
    stagger={0.05}
  >
    {children}
  </KineticTypography>
)

// Call-to-action text with morphing effects
export const CTAKineticText: React.FC<{ children: string; hoverText?: string; className?: string }> = ({
  children,
  hoverText,
  className = ''
}) => (
  <motion.div
    className={`cta-kinetic-text ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-morph" data-text={hoverText || children}>
      <KineticTypography variant="word-cascade" intensity="normal" stagger={0.08}>
        {children}
      </KineticTypography>
    </span>
  </motion.div>
)

// Parallax section titles
export const SectionTitleKinetic: React.FC<{ children: string; depth?: 'surface' | 'normal' | 'deep'; className?: string }> = ({
  children,
  depth = 'normal',
  className = ''
}) => {
  const depthClass = {
    surface: 'parallax-text-surface',
    normal: 'parallax-text',
    deep: 'parallax-text-deep'
  }[depth]

  return (
    <KineticTypography
      variant="parallax"
      className={`${depthClass} text-3xl md:text-4xl lg:text-5xl font-semibold ${className}`}
      intensity="normal"
    >
      {children}
    </KineticTypography>
  )
}

// Typewriter effect for dynamic content
export const TypewriterText: React.FC<{
  children: string
  speed?: number
  showCursor?: boolean
  className?: string
  onComplete?: () => void
}> = ({
  children,
  speed = 50,
  showCursor = true,
  className = '',
  onComplete
}) => {
  const [displayText, setDisplayText] = React.useState('')
  const [isComplete, setIsComplete] = React.useState(false)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < children.length) {
        setDisplayText(children.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [children, speed, onComplete])

  return (
    <span
      className={`typing-animation ${className}`}
      style={{
        '--char-count': children.length,
        borderRight: showCursor && !isComplete ? '2px solid var(--veritron-gold-500)' : 'none'
      }}
    >
      {displayText}
    </span>
  )
}

// Floating text for decorative elements
export const FloatingText: React.FC<{
  children: string
  floatPattern?: 'sine' | 'bounce' | 'drift'
  className?: string
}> = ({
  children,
  floatPattern = 'sine',
  className = ''
}) => {
  const patternClass = {
    sine: 'text-float-scroll',
    bounce: 'letter-float',
    drift: 'parallax-text'
  }[floatPattern]

  return (
    <KineticTypography
      variant="letter-float"
      className={`${patternClass} ${className}`}
      intensity="subtle"
      stagger={0.1}
    >
      {children}
    </KineticTypography>
  )
}

// Blur-to-focus reveal for dramatic entries
export const BlurRevealText: React.FC<{ children: string; className?: string }> = ({ children, className = '' }) => (
  <KineticTypography
    variant="blur-focus"
    className={`blur-focus-scroll ${className}`}
    intensity="dramatic"
  >
    {children}
  </KineticTypography>
)

// Export all components for easy usage
export {
  KineticTypography as default,
  HeroKineticText,
  SubtitleKineticText,
  CTAKineticText,
  SectionTitleKinetic,
  TypewriterText,
  FloatingText,
  BlurRevealText
}