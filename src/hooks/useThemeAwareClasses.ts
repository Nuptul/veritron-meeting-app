import { useTheme } from '../context/ThemeContext'

/**
 * Custom hook to get theme-aware CSS classes for common UI patterns
 * This hook provides pre-configured class combinations for different themes
 */
export const useThemeAwareClasses = () => {
  const { theme } = useTheme()
  
  return {
    // Background variations
    backgrounds: {
      primary: theme === 'dark' ? 'bg-veritron-gunmetal-950' : 'bg-white',
      secondary: theme === 'dark' ? 'bg-veritron-gunmetal-900' : 'bg-gray-50',
      tertiary: theme === 'dark' ? 'bg-veritron-gunmetal-800' : 'bg-gray-100',
      card: theme === 'dark' 
        ? 'bg-veritron-gunmetal-800/50 backdrop-blur-sm border border-veritron-gunmetal-700/50' 
        : 'bg-white/80 backdrop-blur-sm border border-gray-200',
      hero: theme === 'dark'
        ? 'bg-gradient-to-br from-veritron-gunmetal-950 via-veritron-gunmetal-900 to-veritron-gunmetal-950'
        : 'bg-gradient-to-br from-white via-veritron-aluminum-50 to-white'
    },
    
    // Text variations
    text: {
      primary: theme === 'dark' ? 'text-veritron-aluminum-100' : 'text-veritron-gunmetal-900',
      secondary: theme === 'dark' ? 'text-veritron-aluminum-300' : 'text-veritron-gunmetal-700',
      muted: theme === 'dark' ? 'text-veritron-aluminum-400' : 'text-veritron-gunmetal-500',
      accent: theme === 'dark' ? 'text-veritron-gold-400' : 'text-veritron-gold-600',
      link: theme === 'dark' 
        ? 'text-veritron-gold-400 hover:text-veritron-gold-300' 
        : 'text-veritron-gold-600 hover:text-veritron-gold-700',
      heading: theme === 'dark' ? 'text-veritron-aluminum-50' : 'text-veritron-gunmetal-900'
    },
    
    // Border variations
    borders: {
      subtle: theme === 'dark' ? 'border-veritron-gunmetal-700' : 'border-gray-200',
      medium: theme === 'dark' ? 'border-veritron-gunmetal-600' : 'border-gray-300',
      strong: theme === 'dark' ? 'border-veritron-gunmetal-500' : 'border-gray-400',
      accent: theme === 'dark' ? 'border-veritron-gold-500' : 'border-veritron-gold-400',
      focus: theme === 'dark' 
        ? 'focus:ring-veritron-gold-400 focus:ring-offset-veritron-gunmetal-800' 
        : 'focus:ring-veritron-gold-500 focus:ring-offset-white'
    },
    
    // Interactive elements
    interactive: {
      hover: theme === 'dark' 
        ? 'hover:bg-veritron-gunmetal-700 hover:text-veritron-aluminum-100' 
        : 'hover:bg-veritron-aluminum-100 hover:text-veritron-gunmetal-800',
      active: theme === 'dark' 
        ? 'active:bg-veritron-gunmetal-600' 
        : 'active:bg-veritron-aluminum-200',
      selected: theme === 'dark' 
        ? 'bg-veritron-gold-500/20 text-veritron-gold-300 border-veritron-gold-500/50' 
        : 'bg-veritron-gold-100 text-veritron-gold-700 border-veritron-gold-300'
    },
    
    // Button variants
    buttons: {
      primary: theme === 'dark'
        ? 'bg-gradient-to-r from-veritron-gold-500 to-veritron-gold-400 hover:from-veritron-gold-400 hover:to-veritron-gold-300 text-veritron-gunmetal-900 shadow-lg shadow-veritron-gold-500/20'
        : 'bg-gradient-to-r from-veritron-gold-500 to-veritron-gold-600 hover:from-veritron-gold-600 hover:to-veritron-gold-700 text-white shadow-lg',
      
      secondary: theme === 'dark'
        ? 'bg-veritron-gunmetal-700 hover:bg-veritron-gunmetal-600 text-veritron-aluminum-100 border border-veritron-gunmetal-600 shadow-md'
        : 'bg-veritron-aluminum-100 hover:bg-veritron-aluminum-200 text-veritron-gunmetal-800 border border-veritron-aluminum-300 shadow-sm',
      
      ghost: theme === 'dark'
        ? 'text-veritron-aluminum-200 hover:bg-veritron-gunmetal-700 hover:text-white'
        : 'text-veritron-gunmetal-600 hover:bg-veritron-gold-50 hover:text-veritron-gold-700',
      
      danger: theme === 'dark'
        ? 'bg-red-600 hover:bg-red-700 text-white'
        : 'bg-red-500 hover:bg-red-600 text-white',
        
      success: theme === 'dark'
        ? 'bg-green-600 hover:bg-green-700 text-white'
        : 'bg-green-500 hover:bg-green-600 text-white'
    },
    
    // Form elements
    forms: {
      input: theme === 'dark'
        ? 'bg-veritron-gunmetal-800 border-veritron-gunmetal-600 text-veritron-aluminum-100 placeholder-veritron-aluminum-400 focus:ring-veritron-gold-400 focus:border-veritron-gold-400'
        : 'bg-white border-gray-300 text-veritron-gunmetal-900 placeholder-gray-400 focus:ring-veritron-gold-500 focus:border-veritron-gold-500',
      
      select: theme === 'dark'
        ? 'bg-veritron-gunmetal-800 border-veritron-gunmetal-600 text-veritron-aluminum-100'
        : 'bg-white border-gray-300 text-veritron-gunmetal-900',
        
      checkbox: theme === 'dark'
        ? 'text-veritron-gold-400 bg-veritron-gunmetal-800 border-veritron-gunmetal-600 focus:ring-veritron-gold-400'
        : 'text-veritron-gold-600 bg-white border-gray-300 focus:ring-veritron-gold-500',
        
      radio: theme === 'dark'
        ? 'text-veritron-gold-400 bg-veritron-gunmetal-800 border-veritron-gunmetal-600'
        : 'text-veritron-gold-600 bg-white border-gray-300'
    },
    
    // Navigation specific
    navigation: {
      bg: theme === 'dark'
        ? 'bg-veritron-gunmetal-900/95 backdrop-blur-lg border-veritron-gunmetal-700/50'
        : 'bg-white/95 backdrop-blur-lg border-veritron-gold-200/50',
      
      link: theme === 'dark'
        ? 'text-veritron-aluminum-200 hover:text-white'
        : 'text-veritron-gunmetal-600 hover:text-veritron-gold-600',
        
      activeLink: theme === 'dark'
        ? 'text-veritron-gold-400'
        : 'text-veritron-gold-600',
        
      indicator: theme === 'dark'
        ? 'bg-veritron-gold-400'
        : 'bg-veritron-gold-600'
    },
    
    // Shadows and effects
    shadows: {
      sm: theme === 'dark' ? 'shadow-lg shadow-veritron-gunmetal-900/50' : 'shadow-sm',
      md: theme === 'dark' ? 'shadow-xl shadow-veritron-gunmetal-900/50' : 'shadow-md',
      lg: theme === 'dark' ? 'shadow-2xl shadow-veritron-gunmetal-900/50' : 'shadow-lg',
      xl: theme === 'dark' ? 'shadow-2xl shadow-veritron-gunmetal-950/70' : 'shadow-xl',
      glow: theme === 'dark' 
        ? 'shadow-2xl shadow-veritron-gold-400/20' 
        : 'shadow-xl shadow-veritron-gold-500/30'
    },
    
    // Status indicators
    status: {
      success: theme === 'dark'
        ? 'bg-green-900/50 text-green-300 border border-green-700'
        : 'bg-green-100 text-green-800 border border-green-300',
        
      warning: theme === 'dark'
        ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
        : 'bg-yellow-100 text-yellow-800 border border-yellow-300',
        
      error: theme === 'dark'
        ? 'bg-red-900/50 text-red-300 border border-red-700'
        : 'bg-red-100 text-red-800 border border-red-300',
        
      info: theme === 'dark'
        ? 'bg-blue-900/50 text-blue-300 border border-blue-700'
        : 'bg-blue-100 text-blue-800 border border-blue-300'
    }
  }
}

/**
 * Utility function to generate theme-aware gradient classes
 */
export const useThemeGradients = () => {
  const { theme } = useTheme()
  
  return {
    hero: theme === 'dark'
      ? 'bg-gradient-to-br from-veritron-gunmetal-950 via-veritron-gunmetal-900 to-veritron-gunmetal-950'
      : 'bg-gradient-to-br from-veritron-aluminum-50 via-white to-veritron-gold-50/30',
      
    card: theme === 'dark'
      ? 'bg-gradient-to-br from-veritron-gunmetal-800/80 to-veritron-gunmetal-900/60'
      : 'bg-gradient-to-br from-white to-veritron-aluminum-50/80',
      
    accent: theme === 'dark'
      ? 'bg-gradient-to-r from-veritron-gold-400 to-veritron-gold-500'
      : 'bg-gradient-to-r from-veritron-gold-500 to-veritron-gold-600',
      
    text: theme === 'dark'
      ? 'bg-gradient-to-r from-veritron-gold-400 to-veritron-gold-300 bg-clip-text text-transparent'
      : 'bg-gradient-to-r from-veritron-gold-600 to-veritron-gold-700 bg-clip-text text-transparent'
  }
}

export default useThemeAwareClasses