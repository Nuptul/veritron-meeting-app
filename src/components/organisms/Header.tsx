import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import VeritronLogoPNG from '../VeritronLogoPNG';
import {
  // HamburgerMenuIcon,
  SearchIcon,
  NotificationIcon,
  MobileMenuToggle
} from '../atoms/NavigationIcons';
import DarkModeToggle from '../atoms/DarkModeToggle';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { label: 'Home', href: '#home', active: true },
    { label: 'Services', href: '#services', active: false },
    { label: 'About', href: '#about', active: false },
    { label: 'Contact', href: '#contact', active: false },
  ];

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  };

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
  };

  return (
    <>
      {/* Skip Links for Keyboard Navigation */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <a href="#navigation" className="skip-link">Skip to navigation</a>
      
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible premium-glass-elevated ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-3xl shadow-2xl border-b border-veritron-gold-400/20'
            : 'bg-black/30 backdrop-blur-xl'
        } ${className}`}
        style={{
          background: isScrolled 
            ? 'linear-gradient(135deg, rgba(15, 15, 20, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)'
            : 'linear-gradient(135deg, rgba(15, 15, 20, 0.3) 0%, rgba(10, 10, 15, 0.5) 100%)',
          boxShadow: isScrolled
            ? '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 40px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
            : '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between ${isScrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-20'}`}>
            {/* Premium Veritron Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              <VeritronLogoPNG 
                size={isScrolled ? 'xs' : 'sm'} 
                animate={true} 
                glowEffect={true}
                className="drop-shadow-2xl"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav 
              id="navigation" 
              className="hidden lg:flex items-center space-x-2 rounded-xl p-1"
              aria-label="Main navigation"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm md:text-base font-semibold tracking-wide transition-colors duration-200 veritron-display rounded-lg focus-enhanced ${
                    item.active
                      ? 'text-veritron-gold-400 bg-white/5'
                      : 'text-veritron-aluminum-200 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={item.active ? 'page' : undefined}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {item.label}
                  {/* Active indicator bar */}
                  {item.active && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-2/3 bg-gradient-to-r from-veritron-gold-400 via-veritron-gold-500 to-veritron-aluminum-400 rounded-full"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Search Button */}
              <SearchIcon
                isActive={isSearchOpen}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                size={20}
              />

              {/* Notifications */}
              <NotificationIcon
                count={3}
                onClick={() => console.log('Notifications clicked')}
                size={20}
              />

              {/* Theme Toggle - Premium */}
              <DarkModeToggle size="small" variant="pill" />

              {/* CTA Button */}
              <motion.button
                className="veritron-button btn-gold btn-medium font-bold px-6 py-2 rounded-xl veritron-display relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 20,
                  duration: 0.15 
                }}
                style={{
                  transformOrigin: 'center center'
                }}
              >
                <span className="relative z-20">Get Started</span>
              </motion.button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <MobileMenuToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>

        {/* Bottom gradient hairline */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Search Bar Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 glass-veritron border-b border-white/10 shadow-glass"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="relative max-w-lg mx-auto">
                  <input
                    type="text"
                    placeholder="Search services, projects..."
                    className="w-full pl-4 pr-12 py-3 bg-veritron-aluminum-50 dark:bg-veritron-gunmetal-800 border border-veritron-aluminum-200 dark:border-veritron-gunmetal-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-veritron-gold-500 focus:border-transparent"
                    autoFocus
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2" aria-label="Search">
                    <SearchIcon size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-veritron-gunmetal-900 shadow-2xl z-50 lg:hidden focus-trap"
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-veritron-aluminum-200 dark:border-veritron-gunmetal-700">
                  <VeritronLogoPNG 
                    size="lg" 
                    animate={false} 
                    glowEffect={true}
                  />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-veritron-gunmetal-600 dark:text-veritron-aluminum-400 hover:bg-veritron-aluminum-100 dark:hover:bg-veritron-gunmetal-800 transition-colors duration-200 focus-enhanced touch-target"
                    aria-label="Close navigation menu"
                  >
                    ✕
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-6 py-8">
                  <div className="space-y-4">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                          item.active
                            ? 'bg-veritron-gold-100 dark:bg-veritron-gold-900/20 text-veritron-gold-700 dark:text-veritron-gold-400'
                            : 'text-veritron-gunmetal-700 dark:text-veritron-aluminum-300 hover:bg-veritron-aluminum-100 dark:hover:bg-veritron-gunmetal-800'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </div>
                </nav>

                {/* Mobile Actions */}
                <div className="px-6 py-6 border-t border-veritron-aluminum-200 dark:border-veritron-gunmetal-700">
                  <div className="flex items-center justify-between mb-4">
                    <SearchIcon
                      isActive={isSearchOpen}
                      onClick={() => {
                        setIsSearchOpen(!isSearchOpen);
                        setIsMobileMenuOpen(false);
                      }}
                      size={24}
                    />
                    <NotificationIcon
                      count={3}
                      onClick={() => {
                        console.log('Notifications clicked');
                        setIsMobileMenuOpen(false);
                      }}
                      size={24}
                    />
                    <DarkModeToggle size="small" variant="pill" />
                  </div>

                  <motion.button
                    className="veritron-button btn-gold btn-medium w-full font-semibold py-3 px-6 rounded-lg relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 20,
                      duration: 0.15 
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="relative z-20">Get Started</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;