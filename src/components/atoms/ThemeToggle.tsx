import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../../context/ThemeContext'

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'floating'
  className?: string
  showLabel?: boolean
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = 'md',
  variant = 'default',
  className = '',
  showLabel = false
}) => {
  const { theme, toggleTheme } = useTheme()

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'w-12 h-6',
      toggle: 'w-4 h-4',
      translate: 'translate-x-6',
      icon: 'w-3 h-3',
      padding: 'p-1'
    },
    md: {
      container: 'w-14 h-7',
      toggle: 'w-5 h-5',
      translate: 'translate-x-7',
      icon: 'w-4 h-4',
      padding: 'p-1'
    },
    lg: {
      container: 'w-16 h-8',
      toggle: 'w-6 h-6',
      translate: 'translate-x-8',
      icon: 'w-5 h-5',
      padding: 'p-1'
    }
  }

  const config = sizeConfig[size]

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return {
          container: 'border border-veritron-aluminum-300 dark:border-veritron-gunmetal-600',
          background: theme === 'dark' 
            ? 'bg-veritron-gunmetal-700' 
            : 'bg-veritron-aluminum-100',
          toggle: theme === 'dark'
            ? 'bg-veritron-gold-400 shadow-lg'
            : 'bg-white shadow-md'
        }
      
      case 'floating':
        return {
          container: 'shadow-lg border-0 backdrop-blur-sm',
          background: theme === 'dark' 
            ? 'bg-veritron-gunmetal-800/80' 
            : 'bg-white/80',
          toggle: theme === 'dark'
            ? 'bg-gradient-to-r from-veritron-gold-400 to-veritron-gold-500 shadow-xl'
            : 'bg-gradient-to-r from-veritron-gold-500 to-veritron-gold-600 shadow-lg'
        }
      
      default:
        return {
          container: 'border border-veritron-aluminum-200 dark:border-veritron-gunmetal-700',
          background: theme === 'dark' 
            ? 'bg-gradient-to-r from-veritron-gunmetal-800 to-veritron-gunmetal-700' 
            : 'bg-gradient-to-r from-veritron-aluminum-100 to-veritron-aluminum-50',
          toggle: theme === 'dark'
            ? 'bg-gradient-to-r from-veritron-gold-400 to-veritron-gold-500 shadow-lg shadow-veritron-gold-400/20'
            : 'bg-gradient-to-r from-white to-veritron-aluminum-50 shadow-md'
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showLabel && (
        <span className="text-sm font-medium text-veritron-gunmetal-600 dark:text-veritron-aluminum-300">
          Theme
        </span>
      )}
      
      <motion.button
        onClick={toggleTheme}
        className={`
          relative ${config.container} ${config.padding} rounded-full 
          ${styles.container} ${styles.background}
          transition-colors duration-300 ease-in-out
          hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-veritron-gold-400 focus:ring-offset-2
          dark:focus:ring-offset-veritron-gunmetal-800
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {/* Toggle Circle */}
        <motion.div
          className={`
            ${config.toggle} ${styles.toggle} rounded-full
            flex items-center justify-center
            transition-transform duration-300 ease-in-out
          `}
          animate={{
            x: theme === 'dark' ? config.translate.replace('translate-x-', '') : '0'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {/* Icon Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <MoonIcon 
                  className={`${config.icon} text-veritron-gunmetal-800`}
                />
              ) : (
                <SunIcon 
                  className={`${config.icon} text-veritron-gold-600`}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Background Icons (Subtle) */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          {/* Sun Icon Background */}
          <motion.div
            animate={{
              opacity: theme === 'light' ? 0.3 : 0.1,
              scale: theme === 'light' ? 1.1 : 0.9
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <SunIcon className={`${config.icon} text-veritron-gold-500 dark:text-veritron-gold-400`} />
          </motion.div>

          {/* Moon Icon Background */}
          <motion.div
            animate={{
              opacity: theme === 'dark' ? 0.3 : 0.1,
              scale: theme === 'dark' ? 1.1 : 0.9
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <MoonIcon className={`${config.icon} text-veritron-aluminum-500 dark:text-veritron-aluminum-300`} />
          </motion.div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className={`
            absolute inset-0 rounded-full
            ${theme === 'dark' 
              ? 'bg-gradient-to-r from-veritron-gold-400/20 to-veritron-gold-500/20' 
              : 'bg-gradient-to-r from-veritron-gold-500/10 to-veritron-gold-600/10'
            }
            opacity-0 transition-opacity duration-300
          `}
          animate={{
            opacity: theme === 'dark' ? 0.8 : 0.4
          }}
        />
      </motion.button>

      {/* Keyboard Shortcut Hint (Optional) */}
      {variant === 'floating' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xs text-veritron-gunmetal-400 dark:text-veritron-aluminum-500 font-mono"
        >
          ⌘K
        </motion.span>
      )}
    </div>
  )
}

// Floating Action Button variant
export const FloatingThemeToggle: React.FC<{
  className?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}> = ({
  className = '',
  position = 'bottom-right'
}) => {
  const { theme, toggleTheme } = useTheme()

  const positionClasses = {
    'top-left': 'fixed top-4 left-4',
    'top-right': 'fixed top-4 right-4',
    'bottom-left': 'fixed bottom-4 left-4',
    'bottom-right': 'fixed bottom-4 right-4'
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        ${positionClasses[position]} z-50 
        w-12 h-12 rounded-full
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-veritron-gunmetal-800 to-veritron-gunmetal-700 border border-veritron-gunmetal-600' 
          : 'bg-gradient-to-r from-white to-veritron-aluminum-50 border border-veritron-aluminum-200'
        }
        shadow-lg hover:shadow-xl
        backdrop-blur-sm
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-veritron-gold-400 focus:ring-offset-2
        ${className}
      `}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? (
            <MoonIcon className="w-5 h-5 text-veritron-gold-400" />
          ) : (
            <SunIcon className="w-5 h-5 text-veritron-gold-600" />
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
    </motion.button>
  )
}

export default ThemeToggle