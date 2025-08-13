import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { VeritronButton } from '../components/atoms/VeritronButton'
import { cn } from '../utils/cn'

const Typography: React.FC = () => {
  const { theme } = useTheme()

  // Typography samples
  const headingSamples = [
    { level: 'h1', text: 'Display Heading', className: 'text-neumorphic-gold-xl' },
    { level: 'h2', text: 'Section Title', className: 'text-neumorphic-silver-lg' },
    { level: 'h3', text: 'Subsection Header', className: 'text-neumorphic-glass' },
    { level: 'h4', text: 'Card Title', className: 'text-metallic-gradient' },
    { level: 'h5', text: 'Label Text', className: 'text-holographic' },
    { level: 'h6', text: 'Caption Text', className: 'text-plasma' }
  ]

  const textStyles = [
    {
      name: 'Neumorphic Gold',
      className: 'text-neumorphic-gold',
      description: 'Premium metallic gold with depth'
    },
    {
      name: 'Neumorphic Silver',
      className: 'text-neumorphic-silver',
      description: 'Brushed aluminum appearance'
    },
    {
      name: 'Black Glass',
      className: 'text-neumorphic-glass',
      description: 'Reflective obsidian effect'
    },
    {
      name: 'Holographic',
      className: 'text-holographic',
      description: 'Color-shifting prismatic text'
    },
    {
      name: 'Plasma Glow',
      className: 'text-plasma',
      description: 'Energetic neon effect'
    },
    {
      name: 'Carbon Fiber',
      className: 'text-carbon',
      description: 'Technical composite texture'
    }
  ]

  const fontFamilies = [
    { name: 'Display Primary', variable: '--font-display-primary', sample: 'The quick brown fox' },
    { name: 'Display Secondary', variable: '--font-display-secondary', sample: 'Jumps over the lazy dog' },
    { name: 'Display Accent', variable: '--font-display-accent', sample: 'Pack my box with liquor' },
    { name: 'Body Primary', variable: '--font-body-primary', sample: 'Lorem ipsum dolor sit amet' },
    { name: 'Body Secondary', variable: '--font-body-secondary', sample: 'Consectetur adipiscing elit' },
    { name: 'Heading Primary', variable: '--font-heading-primary', sample: 'Veritron Premium UI' },
    { name: 'Monospace', variable: '--font-mono', sample: 'const code = "example"' }
  ]

  return (
    <div className={cn(
      'min-h-screen py-20 px-4 transition-colors duration-300',
      theme === 'dark' ? 'bg-black' : 'bg-white'
    )}>
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-bold mb-4 text-neumorphic-gold-xl">
            Typography System
          </h1>
          <p className="text-xl text-muted">
            Premium type specimens and text effects
          </p>
        </motion.div>

        {/* Heading Specimens */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-neumorphic-silver">Heading Hierarchy</h2>
          <div className="space-y-8">
            {headingSamples.map((heading, index) => {
              const Tag = heading.level as keyof JSX.IntrinsicElements
              return (
                <motion.div
                  key={heading.level}
                  className="card-neumorphic p-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <Tag className={cn('font-bold', heading.className)}>
                      {heading.text}
                    </Tag>
                    <span className="text-sm text-muted font-mono">
                      {`<${heading.level}>`}
                    </span>
                  </div>
                  <p className="text-sm text-muted">
                    Class: <code className="text-accent">{heading.className}</code>
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Text Effects Grid */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-neumorphic-silver">Text Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {textStyles.map((style, index) => (
              <motion.div
                key={style.name}
                className="card-neumorphic p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className={cn('text-2xl font-bold mb-3', style.className)}>
                  {style.name}
                </h3>
                <p className="text-sm text-muted mb-4">{style.description}</p>
                <code className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                  {style.className}
                </code>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Font Families */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-neumorphic-silver">Font Families</h2>
          <div className="space-y-4">
            {fontFamilies.map((font, index) => (
              <motion.div
                key={font.name}
                className="card-neumorphic p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-primary">{font.name}</h4>
                  <code className="text-xs text-accent">{font.variable}</code>
                </div>
                <p
                  className="text-2xl"
                  style={{ fontFamily: `var(${font.variable})` }}
                >
                  {font.sample}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interactive Demo */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-neumorphic-silver">Interactive Demo</h2>
          <div className="card-neumorphic p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Editable Text</h3>
                <div
                  contentEditable
                  className="p-4 rounded-lg bg-secondary border border-primary min-h-[100px] focus:outline-none focus:ring-2 focus:ring-accent"
                  suppressContentEditableWarning
                >
                  <p className="text-neumorphic-gold">
                    Click to edit this text and see the premium typography in action.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Size Controls</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <VeritronButton variant="aluminum" size="small">Small</VeritronButton>
                    <VeritronButton variant="gunmetal" size="medium">Medium</VeritronButton>
                    <VeritronButton variant="gold" size="large">Large</VeritronButton>
                  </div>
                  <p className="text-sm text-muted">
                    Button components with integrated typography scales
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Performance Metrics */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-neumorphic-silver">Typography Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Variable Fonts', value: 'Enabled', icon: '✓' },
              { label: 'WebGPU Rendering', value: 'Active', icon: '⚡' },
              { label: 'Dark Mode', value: 'Adaptive', icon: '🌙' },
              { label: 'Accessibility', value: 'WCAG AAA', icon: '♿' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="card-neumorphic p-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <div className="text-3xl mb-2">{metric.icon}</div>
                <h4 className="font-semibold text-primary">{metric.label}</h4>
                <p className="text-accent font-bold">{metric.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Typography