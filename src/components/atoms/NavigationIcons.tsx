import React from 'react'
import { motion } from 'framer-motion'

// Search Icon
export const SearchIcon: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  )
}

// Notification Icon with animation
export const NotificationIcon: React.FC<{ className?: string; hasNotification?: boolean }> = ({ 
  className = '', 
  hasNotification = true 
}) => {
  return (
    <div className="relative">
      <motion.svg 
        className={className} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
        />
      </motion.svg>
      {hasNotification && (
        <motion.span
          className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </div>
  )
}

// Menu Icon
export const MenuIcon: React.FC<{ className?: string; isOpen?: boolean }> = ({ 
  className = '', 
  isOpen = false 
}) => {
  return (
    <motion.svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      animate={{ rotate: isOpen ? 90 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {isOpen ? (
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M6 18L18 6M6 6l12 12" 
        />
      ) : (
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 6h16M4 12h16M4 18h16" 
        />
      )}
    </motion.svg>
  )
}

// User Icon
export const UserIcon: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
      />
    </svg>
  )
}

// Settings Icon
export const SettingsIcon: React.FC<{ className?: string; animate?: boolean }> = ({ 
  className = '', 
  animate = false 
}) => {
  return (
    <motion.svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      animate={animate ? { rotate: 360 } : {}}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
      />
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
      />
    </motion.svg>
  )
}

// Arrow Down Icon
export const ArrowDownIcon: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M19 9l-7 7-7-7" 
      />
    </svg>
  )
}

// External Link Icon
export const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
      />
    </svg>
  )
}

export default {
  SearchIcon,
  NotificationIcon,
  MenuIcon,
  UserIcon,
  SettingsIcon,
  ArrowDownIcon,
  ExternalLinkIcon
}