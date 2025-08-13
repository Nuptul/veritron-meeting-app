import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

// Button variants using CVA for type-safe styling
const buttonVariants = cva(
  'veritron-button relative inline-flex items-center justify-center font-medium text-center uppercase tracking-wider transition-all duration-300 transform-gpu perspective-1000 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-veritron-gold-400 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        aluminum: 'btn-aluminum text-veritron-gunmetal-800',
        gunmetal: 'btn-gunmetal text-veritron-aluminum-100',
        gold: 'btn-gold text-veritron-gunmetal-900',
        ghost: 'bg-transparent hover:bg-veritron-gunmetal-800/10 dark:hover:bg-veritron-aluminum-100/10',
        outline: 'border-2 bg-transparent hover:bg-veritron-gunmetal-900/5 dark:hover:bg-veritron-aluminum-100/5'
      },
      size: {
        small: 'btn-small text-xs px-3 py-1.5',
        medium: 'btn-medium text-sm px-4 py-2',
        large: 'btn-large text-base px-5 py-2.5',
        icon: 'h-8 w-8 p-0 rounded-full'
      },
      fullWidth: {
        true: 'w-full'
      }
    },
    defaultVariants: {
      variant: 'aluminum',
      size: 'medium'
    }
  }
)

// Extend button props with motion and variant props
export interface VeritronButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  motionProps?: HTMLMotionProps<'button'>
}

const VeritronButton = forwardRef<HTMLButtonElement, VeritronButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      motionProps,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02, y: -2 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98, y: 0 } : undefined}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25
        }}
        {...motionProps}
        {...props}
      >
        {/* Shine effect overlay */}
        <span className="veritron-button-shine" aria-hidden="true" />
        
        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <span className="veritron-spinner" aria-label="Loading" />
          ) : (
            <>
              {leftIcon && <span className="veritron-button-icon">{leftIcon}</span>}
              {children}
              {rightIcon && <span className="veritron-button-icon">{rightIcon}</span>}
            </>
          )}
        </span>

        {/* Gradient border effect for premium feel */}
        {(variant === 'gold' || variant === 'aluminum') && (
          <span className="veritron-button-border" aria-hidden="true" />
        )}
      </motion.button>
    )
  }
)

VeritronButton.displayName = 'VeritronButton'

// Export button group component for grouped buttons
export const ButtonGroup: React.FC<{
  children: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
}> = ({ children, className, orientation = 'horizontal' }) => {
  return (
    <div
      className={cn(
        'veritron-button-group flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        className
      )}
      role="group"
    >
      {children}
    </div>
  )
}

export { VeritronButton, buttonVariants }