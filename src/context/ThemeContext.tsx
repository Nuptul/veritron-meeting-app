import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Theme types
export type Theme = 'light' | 'dark'
export type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  storageKey = 'veritron-theme'
}) => {
  // Initialize theme state
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check if running in browser
    if (typeof window === 'undefined') return defaultTheme
    
    // Get theme from localStorage
    const savedTheme = localStorage.getItem(storageKey) as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    return defaultTheme
  })

  // Update theme function
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme)
    }
  }

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    
    // Remove any existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(theme)
    
    // Update meta theme color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        theme === 'dark' ? '#1f2937' : '#ffffff'
      )
    }
    
    // Optional: Update favicon based on theme
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    if (favicon) {
      // You can implement different favicons for light/dark modes here
      // favicon.href = theme === 'dark' ? '/favicon-dark.ico' : '/favicon-light.ico'
    }
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem(storageKey)
      if (!savedTheme) {
        setThemeState(e.matches ? 'dark' : 'light')
      }
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [storageKey])

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook for theme-aware classes
export const useThemeClasses = () => {
  const { theme } = useTheme()
  
  return {
    // Background classes
    bg: {
      primary: theme === 'dark' ? 'bg-veritron-gunmetal-900' : 'bg-white',
      secondary: theme === 'dark' ? 'bg-veritron-gunmetal-800' : 'bg-gray-50',
      accent: theme === 'dark' ? 'bg-veritron-gunmetal-700' : 'bg-veritron-gold-50',
      card: theme === 'dark' ? 'bg-veritron-gunmetal-800/50 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm',
    },
    
    // Text classes
    text: {
      primary: theme === 'dark' ? 'text-veritron-aluminum-100' : 'text-veritron-gunmetal-800',
      secondary: theme === 'dark' ? 'text-veritron-aluminum-300' : 'text-veritron-gunmetal-600',
      muted: theme === 'dark' ? 'text-veritron-aluminum-400' : 'text-veritron-gunmetal-400',
      accent: theme === 'dark' ? 'text-veritron-gold-400' : 'text-veritron-gold-600',
    },
    
    // Border classes
    border: {
      primary: theme === 'dark' ? 'border-veritron-gunmetal-700' : 'border-gray-200',
      secondary: theme === 'dark' ? 'border-veritron-gunmetal-600' : 'border-gray-300',
      accent: theme === 'dark' ? 'border-veritron-gold-500' : 'border-veritron-gold-400',
    },
    
    // Navigation specific
    nav: {
      bg: theme === 'dark' 
        ? 'bg-veritron-gunmetal-900/95 backdrop-blur-lg border-veritron-gunmetal-700/50'
        : 'bg-white/95 backdrop-blur-lg border-veritron-gold-200/50',
      text: theme === 'dark' ? 'text-veritron-aluminum-200' : 'text-veritron-gunmetal-600',
      textActive: theme === 'dark' ? 'text-veritron-gold-400' : 'text-veritron-gold-600',
      textHover: theme === 'dark' ? 'hover:text-white' : 'hover:text-veritron-gold-600',
    },
    
    // Button variants
    button: {
      primary: theme === 'dark'
        ? 'bg-gradient-to-r from-veritron-gold-500 to-veritron-gold-400 hover:from-veritron-gold-400 hover:to-veritron-gold-300 text-veritron-gunmetal-900'
        : 'bg-gradient-to-r from-veritron-gold-500 to-veritron-gold-600 hover:from-veritron-gold-600 hover:to-veritron-gold-700 text-white',
      secondary: theme === 'dark'
        ? 'bg-veritron-gunmetal-700 hover:bg-veritron-gunmetal-600 text-veritron-aluminum-100 border-veritron-gunmetal-600'
        : 'bg-veritron-aluminum-100 hover:bg-veritron-aluminum-200 text-veritron-gunmetal-800 border-veritron-aluminum-300',
      ghost: theme === 'dark'
        ? 'text-veritron-aluminum-200 hover:bg-veritron-gunmetal-700 hover:text-white'
        : 'text-veritron-gunmetal-600 hover:bg-veritron-gold-50 hover:text-veritron-gold-600',
    }
  }
}

// Utility hook for getting theme-appropriate colors
export const useThemeColors = () => {
  const { theme } = useTheme()
  
  return {
    primary: theme === 'dark' ? '#f1f5f9' : '#2a2a2a',
    secondary: theme === 'dark' ? '#cbd5e1' : '#4b5563',
    accent: theme === 'dark' ? '#fbbf24' : '#d4af37',
    background: theme === 'dark' ? '#1f2937' : '#ffffff',
    surface: theme === 'dark' ? '#374151' : '#f9fafb',
    border: theme === 'dark' ? '#4b5563' : '#e5e7eb',
  }
}

export default ThemeContext