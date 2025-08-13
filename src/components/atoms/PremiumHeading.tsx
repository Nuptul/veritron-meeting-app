import React from 'react';
import { motion } from 'framer-motion';

interface PremiumHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'default' | 'accent' | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  animate?: boolean;
  accentWord?: string; // Word to highlight in gold
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accentWord?: string;
  badge?: string;
  className?: string;
  animate?: boolean;
}

// Base heading component
export const PremiumHeading: React.FC<PremiumHeadingProps> = ({
  children,
  level = 1,
  variant = 'default',
  size,
  className = '',
  animate = true,
  accentWord
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // Size mappings based on heading level if not explicitly set
  const defaultSizes = {
    1: '3xl',
    2: '2xl', 
    3: 'xl',
    4: 'lg',
    5: 'md',
    6: 'sm'
  };

  const actualSize = size || defaultSizes[level];

  const sizeClasses = {
    xs: 'text-sm',
    sm: 'text-base lg:text-lg',
    md: 'text-lg lg:text-xl',
    lg: 'text-xl lg:text-2xl',
    xl: 'text-2xl lg:text-3xl',
    '2xl': 'text-3xl lg:text-4xl xl:text-5xl',
    '3xl': 'text-4xl lg:text-5xl xl:text-6xl'
  };

  const variantClasses = {
    default: 'text-white',
    accent: 'text-veritron-gold-400',
    gradient: 'text-gradient-metallic animate-gradient-text'
  };

  const baseClasses = `font-bold leading-tight ${sizeClasses[actualSize]} ${variantClasses[variant]} ${className}`;

  // Handle accent word highlighting
  const renderContent = () => {
    if (typeof children === 'string' && accentWord) {
      const parts = children.split(accentWord);
      return (
        <>
          {parts[0]}
          <span className="text-veritron-gold-400 font-normal">{accentWord}</span>
          {parts[1]}
        </>
      );
    }
    return children;
  };

  const content = (
    <Tag className={baseClasses}>
      {renderContent()}
    </Tag>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      {content}
    </motion.div>
  );
};

// Section heading component matching the screenshot pattern
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  accentWord,
  badge,
  className = '',
  animate = true
}) => {
  const content = (
    <div className={`text-center ${className}`}>
      {/* Badge */}
      {badge && (
        <motion.div
          className="section-badge"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="section-badge-dot" />
          <span className="section-badge-text">
            {badge}
          </span>
        </motion.div>
      )}

      {/* Main heading */}
      <h2 className="section-heading heading-xl text-white mb-6 px-4 md:px-2 whitespace-normal md:whitespace-nowrap">
        {accentWord && title.includes(accentWord) ? (
          <>
            {title.split(accentWord)[0]}
            <span className="heading-accent">{accentWord}</span>
            {title.split(accentWord)[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="section-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      viewport={{ once: true }}
    >
      {content}
    </motion.div>
  );
};

// Preset heading components for common use cases
export const H1: React.FC<Omit<PremiumHeadingProps, 'level'>> = (props) => (
  <PremiumHeading level={1} {...props} />
);

export const H2: React.FC<Omit<PremiumHeadingProps, 'level'>> = (props) => (
  <PremiumHeading level={2} {...props} />
);

export const H3: React.FC<Omit<PremiumHeadingProps, 'level'>> = (props) => (
  <PremiumHeading level={3} {...props} />
);

export const H4: React.FC<Omit<PremiumHeadingProps, 'level'>> = (props) => (
  <PremiumHeading level={4} {...props} />
);

export const H5: React.FC<Omit<PremiumHeadingProps, 'level'>> = (props) => (
  <PremiumHeading level={5} {...props} />
);

export const H6: React.FC<Omit<PremiumHeadingProps, 'level'>> = (props) => (
  <PremiumHeading level={6} {...props} />
);

export default PremiumHeading;
