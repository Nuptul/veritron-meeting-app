import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { cn } from '../../utils/cn'

interface DarkModeToggleProps {
  className?: string
  showLabel?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'minimal' | 'pill'
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  className,
  showLabel = false,
  size = 'medium',
  variant = 'default'
}) => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  // Size configurations
  const sizeConfig = {
    small: {
      toggle: 'w-12 h-6',
      slider: 'w-5 h-5',
      icon: 'w-3 h-3',
      translate: 'translate-x-6'
    },
    medium: {
      toggle: 'w-16 h-8',
      slider: 'w-7 h-7',
      icon: 'w-4 h-4',
      translate: 'translate-x-8'
    },
    large: {
      toggle: 'w-20 h-10',
      slider: 'w-9 h-9',
      icon: 'w-5 h-5',
      translate: 'translate-x-10'
    }
  }

  const config = sizeConfig[size]

  // Variant styles
  const variantStyles = {
    default: {
      toggle: cn(
        'relative inline-flex items-center rounded-full transition-all duration-300',
        'bg-gradient-to-r shadow-lg',
        isDark
          ? 'from-veritron-gunmetal-700 to-veritron-gunmetal-800 shadow-veritron-gunmetal-900/50'
          : 'from-veritron-aluminum-200 to-veritron-aluminum-300 shadow-veritron-aluminum-400/50'
      ),
      slider: cn(
        'absolute left-0.5 inline-flex items-center justify-center rounded-full transition-all duration-300 transform',
        'bg-gradient-to-br shadow-md',
        isDark
          ? 'from-veritron-gold-400 to-veritron-gold-500 shadow-veritron-gold-600/50'
          : 'from-white to-veritron-aluminum-100 shadow-veritron-gunmetal-200/30'
      )
    },
    minimal: {
      toggle: cn(
        'relative inline-flex items-center rounded-full transition-all duration-300',
        'bg-veritron-gunmetal-200 dark:bg-veritron-gunmetal-700'
      ),
      slider: cn(
        'absolute left-0.5 inline-flex items-center justify-center rounded-full transition-all duration-300 transform',
        'bg-white dark:bg-veritron-gold-400'
      )
    },
    pill: {
      toggle: cn(
        'relative inline-flex items-center rounded-full transition-all duration-300',
        'ring-2',
        isDark
          ? 'bg-veritron-gunmetal-800 ring-veritron-gold-400'
          : 'bg-white ring-veritron-aluminum-300'
      ),
      slider: cn(
        'absolute left-0.5 inline-flex items-center justify-center rounded-full transition-all duration-300 transform',
        isDark
          ? 'bg-veritron-gold-400'
          : 'bg-veritron-gunmetal-600'
      )
    }
  }

  const styles = variantStyles[variant]

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {showLabel && (
        <span className="text-sm font-medium text-veritron-gunmetal-600 dark:text-veritron-aluminum-300">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}

      <button
        type="button"
        onClick={toggleTheme}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggleTheme()
          }
        }}
        className={cn(
          'group',
          config.toggle,
          styles.toggle,
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-veritron-gold-400 focus-visible:ring-offset-2',
          'transition-all duration-300'
        )}
        role="switch"
        aria-checked={isDark ? 'true' : 'false'}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        data-state={isDark ? 'dark' : 'light'}
      >
        {/* Background glow effect */}
        <div
          className={cn(
            'absolute inset-0 rounded-full opacity-0 transition-opacity duration-300',
            'bg-gradient-to-r blur-md',
            isDark
              ? 'from-veritron-gold-400/20 to-veritron-gold-500/20'
              : 'from-veritron-aluminum-300/20 to-veritron-aluminum-400/20',
            'group-hover:opacity-100'
          )}
        />

        {/* Slider with icon */}
        <motion.div
          className={cn(
            config.slider,
            styles.slider
          )}
          animate={{ x: isDark ? (size === 'small' ? 24 : size === 'large' ? 40 : 32) : 0 }}
          transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Icon transition */}
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ scale: 0.8, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.8, rotate: 180, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
              >
                <MoonIcon className={cn(config.icon, 'text-veritron-gunmetal-900')} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ scale: 0.8, rotate: 180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.8, rotate: -180, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
              >
                <SunIcon className={cn(config.icon, 'text-veritron-gold-500')} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stars/dots decoration for night mode */}
        {isDark && variant === 'default' && (
          <>
            <div className="absolute top-1 right-3 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
            <div className="absolute bottom-2 right-5 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-75" />
            <div className="absolute top-2 right-6 w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse delay-150" />
          </>
        )}
      </button>
    </div>
  )
}

// Floating theme toggle for fixed positioning
export const FloatingDarkModeToggle: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  offset?: { x?: number; y?: number }
}> = ({ position = 'top-right', offset = { x: 20, y: 20 } }) => {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  }

  return (
    <motion.div
      className={cn(
        'fixed z-50',
        positionClasses[position]
      )}
      style={{
        margin: `${offset.y}px ${offset.x}px`
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25
      }}
    >
      <DarkModeToggle variant="default" size="medium" />
    </motion.div>
  )
}

export default DarkModeToggle