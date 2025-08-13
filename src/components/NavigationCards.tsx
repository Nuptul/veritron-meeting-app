import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { 
  SparklesIcon, 
  SwatchIcon, 
  CubeTransparentIcon,
  CommandLineIcon,
  CpuChipIcon,
  AdjustmentsHorizontalIcon,
  BeakerIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'
import { cn } from '../utils/cn'

interface NavigationCard {
  title: string
  description: string
  href: string
  icon: React.ElementType
  gradient: string
  delay: number
}

const NavigationCards: React.FC = () => {
  const { theme } = useTheme()

  const cards: NavigationCard[] = [
    {
      title: 'Typography',
      description: 'Premium text effects and font specimens',
      href: '#typography',
      icon: SparklesIcon,
      gradient: 'from-amber-400 to-amber-600',
      delay: 0
    },
    {
      title: 'Components',
      description: 'Buttons, cards, and UI elements',
      href: '#components',
      icon: CubeTransparentIcon,
      gradient: 'from-blue-400 to-blue-600',
      delay: 0.1
    },
    {
      title: 'Color System',
      description: 'Material-inspired color palettes',
      href: '#colors',
      icon: SwatchIcon,
      gradient: 'from-purple-400 to-purple-600',
      delay: 0.2
    },
    {
      title: 'Dark Mode',
      description: 'Adaptive theme switching',
      href: '#dark-mode',
      icon: AdjustmentsHorizontalIcon,
      gradient: 'from-gray-600 to-gray-800',
      delay: 0.3
    },
    {
      title: 'Animations',
      description: 'Smooth motion and transitions',
      href: '#animations',
      icon: RocketLaunchIcon,
      gradient: 'from-green-400 to-green-600',
      delay: 0.4
    },
    {
      title: 'WebGPU',
      description: 'GPU-accelerated graphics',
      href: '#webgpu',
      icon: CpuChipIcon,
      gradient: 'from-red-400 to-red-600',
      delay: 0.5
    },
    {
      title: 'Code Examples',
      description: 'Implementation patterns',
      href: '#code',
      icon: CommandLineIcon,
      gradient: 'from-indigo-400 to-indigo-600',
      delay: 0.6
    },
    {
      title: 'Experiments',
      description: 'Cutting-edge UI features',
      href: '#experiments',
      icon: BeakerIcon,
      gradient: 'from-pink-400 to-pink-600',
      delay: 0.7
    }
  ]

  return (
    <section className={cn(
      'py-20 px-4 transition-colors duration-300',
      theme === 'dark' ? 'bg-gradient-to-b from-black to-gray-900' : 'bg-gradient-to-b from-white to-gray-50'
    )}>
      <div className="container mx-auto max-w-7xl">
        {/* Section Header removed per request */}

        {/* Cards Grid removed per request */}

        {/* CTA removed per request */}
      </div>
    </section>
  )
}

export default NavigationCards