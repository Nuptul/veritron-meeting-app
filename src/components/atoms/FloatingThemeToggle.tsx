import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SunIcon, MoonIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../../context/ThemeContext'

interface FloatingThemeToggleProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  showOnScroll?: boolean
  className?: string
}

export const FloatingThemeToggle: React.FC<FloatingThemeToggleProps> = ({
  position = 'bottom-right',
  showOnScroll = true,
  className = ''
}) => {
  const { theme, toggleTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(!showOnScroll)
  const [isHovered, setIsHovered] = useState(false)

  // Handle scroll visibility
  useEffect(() => {
    if (!showOnScroll) return

    const handleScroll = () => {
      const scrolled = window.scrollY > 200
      setIsVisible(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showOnScroll])

  const positionClasses = {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${positionClasses[position]} z-50 ${className}`}
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 180 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            duration: 0.6 
          }}
        >
          <motion.button
            onClick={toggleTheme}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              relative w-14 h-14 rounded-full
              ${theme === 'dark' 
                ? 'bg-gradient-to-br from-veritron-gunmetal-800 to-veritron-gunmetal-700 border border-veritron-gunmetal-600' 
                : 'bg-gradient-to-br from-white to-veritron-aluminum-100 border border-veritron-aluminum-200'
              }
              shadow-lg backdrop-blur-sm
              flex items-center justify-center
              transition-all duration-300
              hover:scale-110 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-veritron-gold-400 focus:ring-offset-2
              ${theme === 'dark' ? 'focus:ring-offset-veritron-gunmetal-800' : 'focus:ring-offset-white'}
            `}
            whileHover={{ 
              scale: 1.1, 
              y: -2,
              boxShadow: theme === 'dark' 
                ? "0 20px 40px rgba(0,0,0,0.4)" 
                : "0 20px 40px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {/* Background Glow */}
            <motion.div
              className={`
                absolute inset-0 rounded-full
                ${theme === 'dark' 
                  ? 'bg-gradient-to-br from-veritron-gold-400/30 to-veritron-gold-500/20' 
                  : 'bg-gradient-to-br from-veritron-gold-500/20 to-veritron-gold-600/10'
                }
              `}
              animate={{
                opacity: isHovered ? 0.8 : 0,
                scale: isHovered ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Icon Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative z-10"
              >
                {theme === 'dark' ? (
                  <MoonIcon 
                    className={`w-6 h-6 ${
                      theme === 'dark' ? 'text-veritron-gold-400' : 'text-veritron-gold-600'
                    }`}
                  />
                ) : (
                  <SunIcon 
                    className={`w-6 h-6 ${
                      theme === 'dark' ? 'text-veritron-gold-400' : 'text-veritron-gold-600'
                    }`}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Ripple Effect */}
            <motion.div
              className={`
                absolute inset-0 rounded-full
                ${theme === 'dark' 
                  ? 'bg-veritron-gold-400' 
                  : 'bg-veritron-gold-500'
                }
              `}
              initial={{ scale: 0, opacity: 0.5 }}
              whileTap={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Settings Icon (appears on hover) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className={`
                    w-4 h-4 rounded-full flex items-center justify-center
                    ${theme === 'dark' 
                      ? 'bg-veritron-gunmetal-700 border border-veritron-gunmetal-600' 
                      : 'bg-white border border-veritron-aluminum-300'
                    }
                  `}>
                    <Cog6ToothIcon className={`w-2.5 h-2.5 ${
                      theme === 'dark' ? 'text-veritron-aluminum-300' : 'text-veritron-gunmetal-600'
                    }`} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className={`
                  absolute ${position.includes('right') ? 'right-16' : 'left-16'}
                  ${position.includes('top') ? 'top-0' : 'bottom-0'}
                  flex items-center
                `}
                initial={{ opacity: 0, x: position.includes('right') ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: position.includes('right') ? 10 : -10 }}
                transition={{ delay: 0.2 }}
              >
                <div className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
                  ${theme === 'dark' 
                    ? 'bg-veritron-gunmetal-800 text-veritron-aluminum-200 border border-veritron-gunmetal-700' 
                    : 'bg-white text-veritron-gunmetal-700 border border-veritron-aluminum-300'
                  }
                  shadow-lg backdrop-blur-sm
                `}>
                  Switch to {theme === 'light' ? 'dark' : 'light'} mode
                  
                  {/* Arrow */}
                  <div className={`
                    absolute top-1/2 -translate-y-1/2
                    ${position.includes('right') ? '-left-1' : '-right-1'}
                    w-2 h-2 rotate-45
                    ${theme === 'dark' 
                      ? 'bg-veritron-gunmetal-800 border-l border-b border-veritron-gunmetal-700' 
                      : 'bg-white border-l border-b border-veritron-aluminum-300'
                    }
                  `} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keyboard shortcut hint */}
          <motion.div
            className={`
              absolute ${position.includes('bottom') ? '-top-8' : '-bottom-8'}
              ${position.includes('right') ? 'right-0' : 'left-0'}
              text-xs font-mono opacity-50
              ${theme === 'dark' ? 'text-veritron-aluminum-400' : 'text-veritron-gunmetal-500'}
            `}
            animate={{ opacity: isHovered ? 0.7 : 0.3 }}
          >
            ⌘+D
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Mini version for tight spaces
export const MiniFloatingThemeToggle: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}> = ({ position = 'bottom-right', className = '' }) => {
  const { theme, toggleTheme } = useTheme()

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4', 
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4'
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        fixed ${positionClasses[position]} z-50
        w-10 h-10 rounded-full
        ${theme === 'dark' 
          ? 'bg-veritron-gunmetal-800/90 border border-veritron-gunmetal-600' 
          : 'bg-white/90 border border-veritron-aluminum-200'
        }
        backdrop-blur-sm shadow-lg
        flex items-center justify-center
        transition-all duration-200
        hover:scale-105 active:scale-95
        ${className}
      `}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 180 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? (
            <MoonIcon className="w-4 h-4 text-veritron-gold-400" />
          ) : (
            <SunIcon className="w-4 h-4 text-veritron-gold-600" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}

export default FloatingThemeToggle