import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

/**
 * Custom hook to handle keyboard shortcuts for theme switching and other actions
 */
export const useKeyboardShortcuts = () => {
  const { toggleTheme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for theme toggle shortcut: Cmd+D (Mac) or Ctrl+D (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === 'd') {
        event.preventDefault()
        toggleTheme()
        
        // Optional: Show a brief toast notification
        if (typeof window !== 'undefined') {
          // Create a temporary toast element
          const toast = document.createElement('div')
          toast.textContent = 'Theme switched!'
          toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            backdrop-filter: blur(8px);
            animation: slideIn 0.3s ease-out;
          `
          
          // Add keyframes for animation
          if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style')
            style.id = 'toast-styles'
            style.textContent = `
              @keyframes slideIn {
                from {
                  transform: translateX(100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
              @keyframes slideOut {
                from {
                  transform: translateX(0);
                  opacity: 1;
                }
                to {
                  transform: translateX(100%);
                  opacity: 0;
                }
              }
            `
            document.head.appendChild(style)
          }
          
          document.body.appendChild(toast)
          
          // Remove toast after 2 seconds
          setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease-out'
            setTimeout(() => {
              if (document.body.contains(toast)) {
                document.body.removeChild(toast)
              }
            }, 300)
          }, 2000)
        }
      }
      
      // Add more shortcuts here as needed
      // Example: Cmd+K for search, Cmd+/ for help, etc.
      
      // Search shortcut: Cmd+K or Ctrl+K
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        // Could trigger search modal or focus search input
        console.log('Search shortcut triggered')
      }
      
      // Help shortcut: Cmd+? or Ctrl+?
      if ((event.metaKey || event.ctrlKey) && event.key === '/') {
        event.preventDefault()
        // Could show help modal or shortcuts list
        console.log('Help shortcut triggered')
      }
    }

    // Add event listener
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggleTheme])

  // Return available shortcuts for display purposes
  return {
    shortcuts: [
      {
        key: '⌘+D',
        description: 'Toggle dark/light theme',
        action: 'toggleTheme'
      },
      {
        key: '⌘+K',
        description: 'Open search',
        action: 'openSearch'
      },
      {
        key: '⌘+/',
        description: 'Show keyboard shortcuts',
        action: 'showHelp'
      }
    ]
  }
}

/**
 * Hook specifically for theme keyboard shortcuts
 * Simpler version if you only need theme switching
 */
export const useThemeKeyboard = () => {
  const { toggleTheme, theme } = useTheme()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Theme toggle: Cmd+D or Ctrl+D
      if ((event.metaKey || event.ctrlKey) && event.key === 'd') {
        event.preventDefault()
        toggleTheme()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleTheme])

  return { theme, toggleTheme }
}

/**
 * Hook for accessibility shortcuts
 */
export const useAccessibilityShortcuts = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Focus main content: Alt+M
      if (event.altKey && event.key === 'm') {
        event.preventDefault()
        const main = document.querySelector('main')
        if (main) {
          main.focus()
        }
      }
      
      // Focus navigation: Alt+N
      if (event.altKey && event.key === 'n') {
        event.preventDefault()
        const nav = document.querySelector('nav')
        if (nav) {
          nav.focus()
        }
      }
      
      // Skip to content: Alt+S
      if (event.altKey && event.key === 's') {
        event.preventDefault()
        const content = document.querySelector('#hero') || document.querySelector('main')
        if (content) {
          content.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
}

export default useKeyboardShortcuts