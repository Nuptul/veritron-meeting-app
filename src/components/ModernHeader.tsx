import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { VeritronButton } from './atoms/VeritronButton';
import DarkModeToggle from './atoms/DarkModeToggle';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const ModernHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Hover spin acceleration for logo
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const hoverStartRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const [hoverMs, setHoverMs] = useState(0);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    let rafId = 0 as unknown as number;
    const baseDuration = 1.2;  // slower at start (seconds per rotation)
    const minDuration = 0.25;  // fastest at 5s (seconds per rotation)
    const targetMs = 5000;     // 5 seconds to reach fastest speed

    const tick = () => {
      if (!isHoveringLogo) return;
      const now = performance.now();
      if (hoverStartRef.current == null) {
        hoverStartRef.current = now;
        lastTsRef.current = now;
      }
      const elapsed = now - hoverStartRef.current;
      setHoverMs(elapsed);
      const progress = Math.min(elapsed / targetMs, 1);
      const newDuration = baseDuration - progress * (baseDuration - minDuration);
      const degPerMs = 360 / (newDuration * 1000);
      const dt = lastTsRef.current != null ? (now - lastTsRef.current) : 0;
      lastTsRef.current = now;
      setRotationDeg(prev => (prev + degPerMs * dt) % 360);
      setShowAdminLogin(progress >= 1);
      rafId = requestAnimationFrame(tick);
    };

    if (isHoveringLogo) {
      rafId = requestAnimationFrame(tick);
    } else {
      hoverStartRef.current = null;
      lastTsRef.current = null;
      setHoverMs(0);
      setRotationDeg(0);
      setShowAdminLogin(false);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHoveringLogo]);

  const location = useLocation();

  // Navigation items with dropdown support
  const leftNavItems = [
    { 
      label: 'HOME', 
      href: '/',
      dropdown: null
    },
    { 
      label: 'SERVICES', 
      href: '/services',
      dropdown: [
        { label: 'AI & Machine Learning', href: '/services/ai-machine-learning', description: 'Advanced AI solutions' },
        { label: 'Custom Development', href: '/services/custom-software-development', description: 'Tailored software solutions' },
        { label: 'UI/UX Design', href: '/services/ui-ux-design', description: 'Stunning visual designs' },
        { label: 'Cloud Infrastructure', href: '/services/cloud-infrastructure', description: 'Scalable cloud solutions' }
      ]
    },
  ];

  const rightNavItems = [
    { 
      label: 'ABOUT', 
      href: '/about',
      dropdown: null
    },
    { 
      label: 'CONTACT', 
      href: '/contact',
      dropdown: null
    },
  ];

  // Check if current path matches nav item
  const isActiveNavItem = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <>
      <motion.header
        className="relative w-full z-50 bg-black py-4 border-b border-amber-400/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center relative">
            
            {/* Left Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-end pr-12">
              {leftNavItems.map((item, index) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="relative group flex items-center gap-1"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="contents"
                    >
                    <span className={`font-medium text-sm tracking-wider transition-colors duration-300 ${
                      isActiveNavItem(item.href) 
                        ? 'text-amber-400' 
                        : 'text-white/90 hover:text-amber-400'
                    }`}>
                      {item.label}
                    </span>
                    {item.dropdown && (
                      <ChevronDownIcon className="w-3 h-3 text-white/60 group-hover:text-amber-400 transition-colors duration-300" />
                    )}
                    
                    {/* Hover underline effect */}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300"
                    />
                    
                    {/* Glow effect on hover */}
                    <motion.span
                      className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
                        filter: 'blur(10px)',
                      }}
                    />
                    </motion.span>
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-lg border border-amber-400/20 rounded-lg shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.dropdown.map((subItem, subIndex) => (
                          <motion.div
                            key={subItem.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Link
                              to={subItem.href}
                              className="block px-4 py-3 hover:bg-amber-400/10 transition-colors duration-200"
                            >
                              <div className="text-white font-medium text-sm">{subItem.label}</div>
                              <div className="text-white/60 text-xs mt-1">{subItem.description}</div>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Center Logo */}
            <Link to="/" className="relative mx-8">
              <motion.div
                className="relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.1 }}
                onMouseEnter={() => setIsHoveringLogo(true)}
                onMouseLeave={() => setIsHoveringLogo(false)}
              >
              {/* Logo container */}
              <div className="relative w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                <motion.img
                  src="/Veritron logo.png"
                  alt="Veritron"
                  className="w-full h-full object-contain"
                  animate={{ rotate: isHoveringLogo ? rotationDeg : 0, opacity: showAdminLogin ? 0 : 1, scale: showAdminLogin ? 0.8 : 1 }}
                  transition={{ ease: 'linear', duration: 0.05 }}
                />
                
                {/* Subtle glow effect on hover */}
                <motion.div 
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 60%)',
                    filter: 'blur(20px)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Admin Login reveal after 5s continuous hover (replaces logo) */}
                <AnimatePresence>
                  {showAdminLogin && (
                    <motion.div
                      key="admin-login"
                      className="absolute inset-0 flex items-center justify-center z-10"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <VeritronButton
                        variant="gold"
                        size="small"
                        className="!px-4 !py-1 !text-xs"
                        onClick={() => { window.location.href = '/admin/login'; }}
                      >
                        Admin Login
                      </VeritronButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              </motion.div>
            </Link>

            {/* Right Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 pl-12">
              {rightNavItems.map((item, index) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className="relative group flex items-center gap-1"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="contents"
                    >
                    <span className={`font-medium text-sm tracking-wider transition-colors duration-300 ${
                      isActiveNavItem(item.href) 
                        ? 'text-amber-400' 
                        : 'text-white/90 hover:text-amber-400'
                    }`}>
                      {item.label}
                    </span>
                    {item.dropdown && (
                      <ChevronDownIcon className="w-3 h-3 text-white/60 group-hover:text-amber-400 transition-colors duration-300" />
                    )}
                    
                    {/* Hover underline effect */}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300"
                    />
                    
                    {/* Glow effect on hover */}
                    <motion.span
                      className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
                        filter: 'blur(10px)',
                      }}
                    />
                    </motion.span>
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-64 bg-black/95 backdrop-blur-lg border border-amber-400/20 rounded-lg shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.dropdown.map((subItem, subIndex) => (
                          <motion.div
                            key={subItem.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.05 }}
                          >
                            <Link
                              to={subItem.href}
                              className="block px-4 py-3 hover:bg-amber-400/10 transition-colors duration-200"
                            >
                              <div className="text-white font-medium text-sm">{subItem.label}</div>
                              <div className="text-white/60 text-xs mt-1">{subItem.description}</div>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Dark Mode Toggle */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="ml-4"
              >
                <DarkModeToggle size="small" variant="pill" />
              </motion.div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden absolute right-4 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  className="w-6 h-0.5 bg-amber-400 block"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-amber-400 block my-1"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-amber-400 block"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Decorative border line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.5), transparent)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 z-40 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Menu Content */}
            <motion.nav
              className="bg-black border-b border-amber-400/20 py-8 flex flex-col items-center space-y-6"
            >
              {[...leftNavItems, ...rightNavItems].map((item, index) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-lg font-light relative group transition-colors duration-300 ${
                    isActiveNavItem(item.href) 
                      ? 'text-amber-400' 
                      : 'text-white hover:text-amber-400'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:text-amber-400 transition-colors duration-300"
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Mobile hover effect */}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  />
                </Link>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernHeader;