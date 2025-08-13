import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import VeritronLogoPNG from '../VeritronLogoPNG'
import PremiumButton from '../atoms/PremiumButton'
import { SearchIcon, NotificationIcon } from '../atoms/NavigationIcons'

interface PremiumHeaderProps {
  className?: string
}

const PremiumHeader: React.FC<PremiumHeaderProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '#home', active: true },
    // Services and Portfolio removed
    // { label: 'Services', href: '#services', active: false, badge: null },
    // { label: 'Portfolio', href: '#portfolio', active: false },
    { label: 'About', href: '#about', active: false },
    // Contact removed
    // { label: 'Contact', href: '#contact', active: false },
  ]

  return (
    <>
      <motion.header
        className={`premium-navbar-veritron ${isScrolled ? 'scrolled' : ''} ${className}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Multi-layer glass background */}
        <div className="navbar-glass-layers">
          <div className="glass-layer-1" />
          <div className="glass-layer-2" />
          <div className="glass-layer-3" />
        </div>

        {/* Premium border system */}
        <div className="navbar-borders">
          <div className="border-top" />
          <div className="border-bottom" />
          <div className="border-glow" />
        </div>

        <div className="navbar-container">
          {/* Brand Section */}
          <div className="nav-brand-section">
            <motion.div
              className="nav-logo-wrapper"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <VeritronLogoPNG 
                size={isScrolled ? 'xs' : 'sm'} 
                animate={true} 
                glowEffect={true}
                className="nav-logo"
              />
              <span className="nav-brand-text">VERITRON</span>
            </motion.div>
          </div>

          {/* Navigation Menu */}
          <nav className="nav-menu-wrapper">
            <ul className="nav-menu">
              {navItems.map((item) => (
                <li key={item.label} className="nav-item">
                  <a 
                    href={item.href} 
                    className={`nav-link ${item.active ? 'active' : ''}`}
                  >
                    <span className="nav-link-text">{item.label}</span>
                    {item.badge && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                    <div className="nav-link-underline" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions Section */}
          <div className="nav-actions">
            {/* Search */}
            <motion.div 
              className="nav-search-wrapper"
              whileHover={{ scale: 1.05 }}
            >
              <SearchIcon className="nav-icon" />
            </motion.div>

            {/* Notifications */}
            <motion.div 
              className="nav-notification-wrapper"
              whileHover={{ scale: 1.05 }}
            >
              <NotificationIcon className="nav-icon" />
              <span className="notification-badge">3</span>
            </motion.div>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="nav-theme-toggle"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </motion.button>

            {/* CTA Button */}
            {/* Get Started button removed - no contact section */}

            {/* Mobile Toggle */}
            <button
              className={`nav-mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="nav-mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`nav-mobile-link ${item.active ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <style jsx>{`
        .premium-navbar-veritron {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: var(--header-height, 80px);
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .premium-navbar-veritron.scrolled {
          height: var(--header-height-scrolled, 65px);
          --header-blur: 30px;
          --header-bg-opacity: 0.95;
        }

        .navbar-glass-layers {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .glass-layer-1 {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(15, 15, 20, var(--header-bg-opacity, 0.88)) 0%,
            rgba(10, 10, 15, var(--header-bg-opacity, 0.93)) 100%
          );
          backdrop-filter: blur(var(--header-blur, 20px)) saturate(180%);
          -webkit-backdrop-filter: blur(var(--header-blur, 20px)) saturate(180%);
        }

        .glass-layer-2 {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212, 175, 55, 0.03) 50%,
            transparent 100%
          );
          animation: shimmerMove 8s linear infinite;
        }

        @keyframes shimmerMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .navbar-borders {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .border-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(136, 136, 136, 0.2) 50%,
            transparent 100%
          );
        }

        .border-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212, 175, 55, 0.4) 50%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .premium-navbar-veritron.scrolled .border-glow {
          opacity: 1;
        }

        .navbar-container {
          position: relative;
          height: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 3vw, 2rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand-section {
          display: flex;
          align-items: center;
        }

        .nav-logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .nav-brand-text {
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          font-weight: 200;
          letter-spacing: 0.3em;
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #c0c0c0 50%,
            #808080 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-menu-wrapper {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .nav-menu {
          display: flex;
          gap: 0;
          list-style: none;
          margin: 0;
          padding: 0;
          height: 100%;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          padding: 0 clamp(1rem, 2vw, 1.5rem);
          height: 100%;
          color: #888888;
          text-decoration: none;
          font-size: clamp(0.75rem, 1vw, 0.875rem);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .nav-link:hover {
          color: #e8e8e8;
          transform: translateY(-1px);
        }

        .nav-link.active {
          color: #d4af37;
        }

        .nav-link-underline {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #d4af37, #f4c838);
          transform: translateX(-50%);
          transition: width 0.3s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .nav-link:hover .nav-link-underline,
        .nav-link.active .nav-link-underline {
          width: calc(100% - 2rem);
        }

        .nav-badge {
          position: absolute;
          top: 15px;
          right: 10px;
          background: linear-gradient(135deg, #ff4444, #cc0000);
          color: white;
          font-size: 9px;
          padding: 2px 5px;
          border-radius: 10px;
          font-weight: 600;
          min-width: 16px;
          text-align: center;
          animation: badgePulse 2s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: clamp(0.75rem, 2vw, 1.25rem);
        }

        .nav-icon {
          width: 20px;
          height: 20px;
          color: #888888;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-icon:hover {
          color: #d4af37;
        }

        .nav-notification-wrapper {
          position: relative;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: linear-gradient(135deg, #ff4444, #cc0000);
          color: white;
          font-size: 10px;
          padding: 2px 5px;
          border-radius: 10px;
          font-weight: 600;
          min-width: 16px;
          text-align: center;
        }

        .nav-theme-toggle {
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
          padding: 4px;
        }

        .nav-mobile-toggle {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: transparent;
          border: none;
          padding: 8px;
          cursor: pointer;
        }

        .nav-mobile-toggle span {
          display: block;
          width: 24px;
          height: 2px;
          background: #888888;
          transition: all 0.3s ease;
        }

        .nav-mobile-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .nav-mobile-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .nav-mobile-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        .nav-mobile-menu {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: linear-gradient(
            135deg,
            rgba(15, 15, 20, 0.98) 0%,
            rgba(10, 10, 15, 0.98) 100%
          );
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(136, 136, 136, 0.1);
          padding: 1rem 0;
        }

        .nav-mobile-link {
          display: block;
          padding: 1rem 2rem;
          color: #888888;
          text-decoration: none;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
        }

        .nav-mobile-link:hover,
        .nav-mobile-link.active {
          color: #d4af37;
          background: rgba(212, 175, 55, 0.05);
        }

        @media (max-width: 1024px) {
          .nav-menu-wrapper {
            display: none;
          }

          .nav-mobile-toggle {
            display: flex;
          }

          .nav-actions > *:not(.nav-mobile-toggle):not(.nav-cta) {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .nav-brand-text {
            display: none;
          }

          .nav-cta {
            display: none;
          }
        }
      `}</style>
    </>
  )
}

export default PremiumHeader