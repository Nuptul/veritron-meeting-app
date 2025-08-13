import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VeritronButton } from './atoms/VeritronButton'
import VeritronLogoPNG from './VeritronLogoPNG'
import { cn } from '../utils/cn'
import DarkModeToggle from './atoms/DarkModeToggle'

// Navigation Types
interface ServiceItem {
  name: string
  href: string
  description: string
  icon?: React.ReactNode
}

interface NavItem {
  name: string
  href: string
  hasDropdown?: boolean
  items?: ServiceItem[]
}



// Navigation structure
const navigationItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { 
    name: 'Services', 
    href: '/services'
  },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

// Icons

const MenuIcon: React.FC<{ className?: string; isOpen?: boolean }> = ({ className = '', isOpen = false }) => (
  <motion.svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    animate={{ rotate: isOpen ? 90 : 0 }}
    transition={{ duration: 0.3 }}
  >
    {isOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    )}
  </motion.svg>
)

// Component Props
interface EnterpriseHeaderProps {
  className?: string
}

const EnterpriseHeader: React.FC<EnterpriseHeaderProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])



  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  }



  const mobileMenuVariants = {
    initial: { opacity: 0, x: '100%' },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  }

  return (
    <>
      {/* Skip Links for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-veritron-gold-500 text-veritron-gunmetal-900 px-4 py-2 rounded-lg font-semibold z-100"
      >
        Skip to main content
      </a>

      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 dark:bg-veritron-gunmetal-900/95 backdrop-blur-lg shadow-xl border-b border-veritron-gold-200/50 dark:border-veritron-gold-400/20'
            : 'bg-white/80 dark:bg-veritron-gunmetal-900/80 backdrop-blur-md',
          className
        )}
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            'flex items-center justify-between transition-all duration-300',
            isScrolled ? 'h-16 lg:h-18' : 'h-18 lg:h-20'
          )}>
            {/* Logo Section */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              <VeritronLogoPNG 
                size={isScrolled ? 'xs' : 'sm'} 
                animate={true} 
                glowEffect={true}
                className="drop-shadow-lg"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
              {navigationItems.map((item, index) => (
                <div key={item.name} className="relative">
                  <motion.a
                    href={item.href}
                    className={cn(
                      'block px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-200 rounded-lg',
                      'text-veritron-gunmetal-700 dark:text-veritron-aluminum-200',
                      'hover:text-veritron-gold-600 dark:hover:text-veritron-gold-400',
                      'hover:bg-veritron-gold-50 dark:hover:bg-veritron-gunmetal-800',
                      'focus:outline-none focus:ring-2 focus:ring-veritron-gold-500 focus:ring-offset-2'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {item.name}
                  </motion.a>
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme Toggle - Premium */}
              <DarkModeToggle size="small" variant="pill" />

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <VeritronButton
                  variant="gold"
                  size="medium"
                  className="font-bold tracking-wide"
                >
                  Get Started
                </VeritronButton>
              </motion.div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className={cn(
                  'p-2 rounded-lg transition-all duration-200',
                  'text-veritron-gunmetal-600 dark:text-veritron-aluminum-400',
                  'hover:bg-veritron-gold-50 dark:hover:bg-veritron-gunmetal-800',
                  'focus:outline-none focus:ring-2 focus:ring-veritron-gold-500 focus:ring-offset-2'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MenuIcon className="w-6 h-6" isOpen={isMobileMenuOpen} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Border Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-veritron-gold-400/30 to-transparent" />
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className={cn(
                'fixed top-0 right-0 h-full w-80 z-50 lg:hidden',
                'bg-white dark:bg-veritron-gunmetal-900 shadow-2xl',
                'border-l border-veritron-gold-200/50 dark:border-veritron-gunmetal-700'
              )}
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-veritron-gold-200/50 dark:border-veritron-gunmetal-700">
                  <VeritronLogoPNG 
                    size="sm" 
                    animate={false} 
                    glowEffect={true}
                  />
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close navigation menu"
                    className={cn(
                      'p-2 rounded-lg transition-colors duration-200',
                      'text-veritron-gunmetal-600 dark:text-veritron-aluminum-400',
                      'hover:bg-veritron-gold-50 dark:hover:bg-veritron-gunmetal-800',
                      'focus:outline-none focus:ring-2 focus:ring-veritron-gold-500'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 px-6 py-8 overflow-y-auto">
                  <div className="space-y-2">
                    {navigationItems.map((item, index) => (
                      <div key={item.name}>
                        <motion.a
                          href={item.href}
                          className={cn(
                            'block px-4 py-3 rounded-lg font-medium transition-colors duration-200',
                            'text-veritron-gunmetal-700 dark:text-veritron-aluminum-300',
                            'hover:bg-veritron-gold-50 dark:hover:bg-veritron-gunmetal-800',
                            'hover:text-veritron-gold-600 dark:hover:text-veritron-gold-400'
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.name}
                        </motion.a>
                      </div>
                    ))}
                  </div>
                </nav>

                {/* Mobile Actions */}
                <div className="px-6 py-6 border-t border-veritron-gold-200/50 dark:border-veritron-gunmetal-700">
                  <div className="flex items-center justify-between mb-4">
                    <DarkModeToggle size="medium" variant="pill" />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <VeritronButton
                      variant="gold"
                      size="large"
                      fullWidth
                      className="font-bold tracking-wide"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get Started
                    </VeritronButton>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default EnterpriseHeader