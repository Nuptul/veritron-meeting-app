import React from 'react';
import { motion } from 'framer-motion';
import VeritronIcon from './VeritronIcon';

interface ContactIconProps {
  isActive?: boolean;
  className?: string;
  size?: number;
  onClick?: () => void;
  animate?: boolean;
}

// Communication Icon Component
export const CommunicationIcon: React.FC<ContactIconProps> = ({ 
  isActive = false,
  className = '', 
  size = 32,
  onClick,
  animate = true
}) => {
  return (
    <motion.div
      className={`relative ${className} ${onClick ? 'cursor-pointer' : ''}`}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
    >
      <VeritronIcon
        name="communication-icon"
        size={size}
        animate={animate}
        hover={!!onClick}
        glow={isActive}
        color="gold"
        className="filter drop-shadow-lg"
      />
      
      {/* Communication waves */}
      {(isActive || animate) && (
        <motion.div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/4 right-0 w-3 h-0.5 bg-veritron-gold-400 rounded-full"
              animate={{
                x: [0, 10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// Support Icon Component
export const SupportIcon: React.FC<ContactIconProps> = ({ 
  isActive = false,
  className = '', 
  size = 32,
  onClick,
  animate = true
}) => {
  return (
    <motion.div
      className={`relative ${className} ${onClick ? 'cursor-pointer' : ''}`}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
    >
      <VeritronIcon
        name="support-icon"
        size={size}
        animate={animate}
        hover={!!onClick}
        glow={isActive}
        color="gold"
        className="filter drop-shadow-lg"
      />
      
      {/* Support availability indicator */}
      {isActive && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-veritron-gunmetal-800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <motion.div
            className="w-full h-full bg-green-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
      
      {/* Help pulse effect */}
      {animate && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-400 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

// Chat Icon Component
export const ChatIcon: React.FC<ContactIconProps & { hasNewMessage?: boolean }> = ({ 
  isActive = false,
  hasNewMessage = false,
  className = '', 
  size = 32,
  onClick,
  animate = true
}) => {
  return (
    <motion.div
      className={`relative ${className} ${onClick ? 'cursor-pointer' : ''}`}
      whileHover={onClick ? { scale: 1.05 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
      onClick={onClick}
    >
      <VeritronIcon
        name="chat-icon"
        size={size}
        animate={animate}
        hover={!!onClick}
        glow={isActive || hasNewMessage}
        color="gold"
        className="filter drop-shadow-lg"
      />
      
      {/* New message indicator */}
      {hasNewMessage && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <motion.div
            className="w-full h-full bg-red-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
      
      {/* Chat bubble animation */}
      {animate && (
        <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute bottom-0 right-0 w-2 h-2 bg-veritron-gold-400 rounded-full opacity-60"
            animate={{
              y: [0, -8, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

// Contact Method Card Component
export const ContactMethodCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  onClick?: () => void;
  className?: string;
}> = ({
  icon,
  title,
  description,
  action,
  onClick,
  className = ''
}) => {
  return (
    <motion.div
      className={`bg-white dark:bg-veritron-gunmetal-900 rounded-xl p-6 border border-veritron-aluminum-200 dark:border-veritron-gunmetal-700 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
      whileHover={{ 
        y: -5,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(212, 175, 55, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Icon */}
      <motion.div
        className="mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      
      {/* Content */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-veritron-gunmetal-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-veritron-gunmetal-600 dark:text-veritron-aluminum-400 mb-4">
          {description}
        </p>
        
        {/* Action Button */}
        <motion.button
          className="w-full bg-gradient-to-r from-veritron-gold-500 to-veritron-gold-600 hover:from-veritron-gold-600 hover:to-veritron-gold-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {action}
        </motion.button>
      </div>
      
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-veritron-gold-400/10 to-veritron-gold-600/10 rounded-xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Contact Info Item Component
export const ContactInfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  className?: string;
}> = ({
  icon,
  label,
  value,
  href,
  className = ''
}) => {
  const Component = href ? motion.a : motion.div;
  
  return (
    <Component
      className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-veritron-aluminum-50 dark:hover:bg-veritron-gunmetal-800 transition-colors duration-200 ${className}`}
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <div className="flex-1">
        <p className="text-sm font-medium text-veritron-gunmetal-700 dark:text-veritron-aluminum-300">
          {label}
        </p>
        <p className="text-sm text-veritron-gunmetal-600 dark:text-veritron-aluminum-400">
          {value}
        </p>
      </div>
    </Component>
  );
};

export default {
  CommunicationIcon,
  SupportIcon,
  ChatIcon,
  ContactMethodCard,
  ContactInfoItem
};