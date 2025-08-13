import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import './styles/motion.css'

// =======================
// VIEW TRANSITIONS API SETUP
// =======================

// Advanced View Transitions API with intelligent transition orchestration
function enableViewTransitions() {
  if ('startViewTransition' in document) {
    // Enhanced navigation event listeners with transition categorization
    const addTransitionListeners = () => {
      const links = document.querySelectorAll('a[href^="/"], button[data-navigate], [data-transition]')
      
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href') || link.getAttribute('data-navigate')
          const transitionType = link.getAttribute('data-transition') || 'slide'
          const transitionDuration = link.getAttribute('data-transition-duration') || 'normal'
          
          if (href && (href.startsWith('/') || link.hasAttribute('data-transition'))) {
            e.preventDefault()
            
            // Apply pre-transition classes for context
            document.documentElement.classList.add('view-transitioning', `transition-${transitionType}`)
            
            // Intelligent transition timing based on content type
            const getTransitionConfig = () => {
              if (transitionDuration === 'fast') return { duration: 200, easing: 'ease-out' }
              if (transitionDuration === 'slow') return { duration: 800, easing: 'ease-in-out' }
              return { duration: 400, easing: 'ease' }
            }
            
            const config = getTransitionConfig()
            
            // Start enhanced view transition with error handling
            const transition = document.startViewTransition(async () => {
              try {
                // Pre-transition setup
                await new Promise(resolve => {
                  // Allow layout to settle before transition
                  requestAnimationFrame(() => {
                    requestAnimationFrame(resolve)
                  })
                })
                
                // Simulated navigation (in real app, this would trigger router)
                if (href && href.startsWith('/')) {
                  // Update URL and document state
                  // window.history.pushState({}, '', href)
                  console.log(`🎬 Transitioning to: ${href} with ${transitionType} animation`)
                }
                
                return Promise.resolve()
              } catch (error) {
                console.error('View transition error:', error)
                throw error
              }
            })
            
            // Enhanced transition lifecycle management
            transition.ready.then(() => {
              console.log(`✨ Transition ready: ${transitionType}`)
              // Apply dynamic CSS custom properties for this transition
              document.documentElement.style.setProperty('--transition-duration', `${config.duration}ms`)
              document.documentElement.style.setProperty('--transition-easing', config.easing)
            })
            
            transition.finished.then(() => {
              console.log(`🎯 Transition completed: ${transitionType}`)
              document.documentElement.classList.remove('view-transitioning', `transition-${transitionType}`)
              // Clean up custom properties
              document.documentElement.style.removeProperty('--transition-duration')
              document.documentElement.style.removeProperty('--transition-easing')
            })
            
            transition.updateCallbackDone.then(() => {
              console.log(`🔄 DOM update completed for: ${transitionType}`)
            })
            
            // Handle transition skip/cancel
            transition.finished.catch((error) => {
              if (error.name === 'AbortError') {
                console.log('🚫 Transition was cancelled')
              } else {
                console.error('❌ Transition failed:', error)
              }
              // Clean up on error
              document.documentElement.classList.remove('view-transitioning', `transition-${transitionType}`)
            })
          }
        })
      })
    }
    
    // Initialize transition listeners
    addTransitionListeners()
    
    // Re-attach listeners when DOM changes (for dynamically added elements)
    const transitionObserver = new MutationObserver((mutations) => {
      let shouldReattach = false
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              const element = node as Element
              if (element.matches('a[href^="/"], button[data-navigate], [data-transition]') ||
                  element.querySelector('a[href^="/"], button[data-navigate], [data-transition]')) {
                shouldReattach = true
              }
            }
          })
        }
      })
      
      if (shouldReattach) {
        addTransitionListeners()
      }
    })
    
    transitionObserver.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    console.log('🎬 Enhanced View Transitions API enabled with intelligent orchestration')
  } else {
    console.log('📱 View Transitions API not supported - enhanced fallback transitions active')
    
    // Enhanced fallback for browsers without View Transitions
    const fallbackTransitions = () => {
      const links = document.querySelectorAll('a[href^="/"], button[data-navigate], [data-transition]')
      
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          const transitionType = link.getAttribute('data-transition') || 'fade'
          
          if (link.hasAttribute('data-transition') || link.getAttribute('href')?.startsWith('/')) {
            e.preventDefault()
            
            // Apply fallback transition classes
            document.body.classList.add('page-transitioning', `fallback-${transitionType}`)
            
            setTimeout(() => {
              document.body.classList.remove('page-transitioning', `fallback-${transitionType}`)
              console.log(`🎭 Fallback transition completed: ${transitionType}`)
            }, 400)
          }
        })
      })
    }
    
    fallbackTransitions()
  }
}

// =======================
// MOTION SYSTEM INITIALIZATION
// =======================

// Initialize scroll-driven animations fallback for unsupported browsers
function initializeMotionSystem() {
  // Feature detection for CSS Scroll-Driven Animations
  const hasScrollTimeline = CSS.supports('animation-timeline', 'scroll()')
  
  if (!hasScrollTimeline) {
    console.log('🔄 Initializing Intersection Observer fallback for scroll animations')
    
    // Create intersection observer for scroll-triggered animations
    const observerOptions = {
      threshold: [0, 0.1, 0.5, 0.9, 1],
      rootMargin: '-10% 0px -10% 0px'
    }
    
    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement
        
        if (entry.isIntersecting) {
          element.classList.add('in-view')
          
          // Calculate scroll-based transforms for parallax
          if (element.classList.contains('parallax-text')) {
            const scrolled = window.pageYOffset
            const rate = scrolled * -0.5
            element.style.transform = `translateY(${rate}px)`
          }
        } else {
          element.classList.remove('in-view')
        }
      })
    }, observerOptions)
    
    // Observe all motion elements
    const observeMotionElements = () => {
      const motionElements = document.querySelectorAll(
        '.scroll-reveal-text, .kinetic-word-reveal, .letter-cascade, .parallax-text'
      )
      motionElements.forEach(el => motionObserver.observe(el))
    }
    
    // Initialize immediately and on DOM changes
    observeMotionElements()
    
    // Re-observe on dynamic content changes
    const mutationObserver = new MutationObserver(observeMotionElements)
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    // Add scroll listener for parallax elements
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const parallaxElements = document.querySelectorAll('.parallax-text')
        const scrolled = window.pageYOffset
        
        parallaxElements.forEach(el => {
          const rate = scrolled * -0.3
          ;(el as HTMLElement).style.transform = `translateY(${rate}px)`
        })
      })
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
  } else {
    console.log('✨ Native CSS Scroll-Driven Animations supported')
  }
}

// =======================
// PERFORMANCE MONITORING
// =======================

// Advanced INP monitoring and motion budget controls
function initializePerformanceMonitoring() {
  if ('PerformanceObserver' in window) {
    // Motion Performance Budget Configuration
    const MOTION_BUDGET = {
      CRITICAL_INP_THRESHOLD: 200, // ms
      WARNING_INP_THRESHOLD: 100,  // ms
      FRAME_BUDGET: 16.67,         // ms (60fps)
      SLOW_FRAME_THRESHOLD: 20,    // ms (~50fps)
      JANK_THRESHOLD: 50,          // ms
      MAX_CONCURRENT_ANIMATIONS: 6
    }
    
    let currentAnimationCount = 0
    let performanceState = 'optimal' // 'optimal' | 'degraded' | 'critical'
    let inpMeasurements: number[] = []
    
    // Monitor Interaction to Next Paint (INP) - Critical for UX
    try {
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const inp = entry.duration
          inpMeasurements.push(inp)
          
          // Keep only recent measurements (last 50)
          if (inpMeasurements.length > 50) {
            inpMeasurements = inpMeasurements.slice(-50)
          }
          
          // Calculate 95th percentile INP
          const sortedINPs = [...inpMeasurements].sort((a, b) => a - b)
          const p95Index = Math.floor(sortedINPs.length * 0.95)
          const currentP95INP = sortedINPs[p95Index] || inp
          
          console.log(`📊 INP: ${inp}ms (P95: ${currentP95INP}ms)`, entry)
          
          // Dynamic motion quality adjustment based on INP
          if (currentP95INP > MOTION_BUDGET.CRITICAL_INP_THRESHOLD) {
            if (performanceState !== 'critical') {
              performanceState = 'critical'
              applyMotionBudget('critical')
              console.warn('🚨 Critical INP detected - motion severely restricted')
            }
          } else if (currentP95INP > MOTION_BUDGET.WARNING_INP_THRESHOLD) {
            if (performanceState !== 'degraded') {
              performanceState = 'degraded'
              applyMotionBudget('degraded')
              console.warn('⚠️ High INP detected - motion quality reduced')
            }
          } else if (performanceState !== 'optimal' && currentP95INP < MOTION_BUDGET.WARNING_INP_THRESHOLD * 0.7) {
            performanceState = 'optimal'
            applyMotionBudget('optimal')
            console.log('✅ INP improved - motion quality restored')
          }
        }
      })
      
      inpObserver.observe({ 
        entryTypes: ['first-input', 'event'], 
        buffered: true 
      })
    } catch (e) {
      console.log('📱 INP monitoring not available in this browser')
    }
    
    // Monitor Long Animation Frames (LAF) for comprehensive jank detection
    try {
      const lafObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > MOTION_BUDGET.FRAME_BUDGET) {
            console.warn(`🐌 Long animation frame: ${entry.duration}ms`, {
              entry,
              scripts: entry.scripts,
              renderStart: entry.renderStart,
              renderEnd: entry.renderEnd
            })
            
            // Immediate motion throttling for severe jank
            if (entry.duration > MOTION_BUDGET.JANK_THRESHOLD) {
              throttleAnimations(entry.duration)
            }
          }
        }
      })
      
      lafObserver.observe({ entryTypes: ['long-animation-frame'] })
    } catch (e) {
      // Fallback frame timing for browsers without LAF API
      let lastFrameTime = performance.now()
      let frameCount = 0
      let slowFrameCount = 0
      
      const checkFrameRate = () => {
        const now = performance.now()
        const delta = now - lastFrameTime
        frameCount++
        
        if (delta > MOTION_BUDGET.SLOW_FRAME_THRESHOLD) {
          slowFrameCount++
          console.warn(`🐌 Slow frame detected: ${delta}ms`)
          
          // Calculate frame drop percentage
          const frameDropPercentage = (slowFrameCount / frameCount) * 100
          
          if (frameDropPercentage > 10) { // More than 10% frame drops
            throttleAnimations(delta)
          }
        }
        
        // Reset counters every 1000 frames
        if (frameCount > 1000) {
          frameCount = 0
          slowFrameCount = 0
        }
        
        lastFrameTime = now
        requestAnimationFrame(checkFrameRate)
      }
      
      requestAnimationFrame(checkFrameRate)
    }
    
    // Memory pressure monitoring for animation limits
    if ('memory' in performance && performance.memory) {
      const checkMemoryPressure = () => {
        const memory = performance.memory
        const memoryPressure = memory.usedJSHeapSize / memory.jsHeapSizeLimit
        
        if (memoryPressure > 0.85) {
          console.warn('🧠 High memory pressure detected - reducing animation complexity')
          applyMotionBudget('critical')
        } else if (memoryPressure > 0.7) {
          console.warn('🧠 Moderate memory pressure - limiting animations')
          applyMotionBudget('degraded')
        }
      }
      
      setInterval(checkMemoryPressure, 5000) // Check every 5 seconds
    }
    
    // Apply motion budget based on performance state
    function applyMotionBudget(budgetLevel: 'optimal' | 'degraded' | 'critical') {
      const root = document.documentElement
      
      switch (budgetLevel) {
        case 'critical':
          root.style.setProperty('--motion-smooth', '100ms')
          root.style.setProperty('--motion-relaxed', '150ms')
          root.style.setProperty('--motion-budget-active', 'transform, opacity')
          root.classList.add('motion-budget-critical')
          root.classList.remove('motion-budget-degraded', 'motion-budget-optimal')
          currentAnimationCount = Math.min(currentAnimationCount, 2)
          break
          
        case 'degraded':
          root.style.setProperty('--motion-smooth', '200ms')
          root.style.setProperty('--motion-relaxed', '300ms')
          root.style.setProperty('--motion-budget-active', 'transform, opacity, filter')
          root.classList.add('motion-budget-degraded')
          root.classList.remove('motion-budget-critical', 'motion-budget-optimal')
          currentAnimationCount = Math.min(currentAnimationCount, 4)
          break
          
        case 'optimal':
          root.style.setProperty('--motion-smooth', '300ms')
          root.style.setProperty('--motion-relaxed', '500ms')
          root.style.setProperty('--motion-budget-active', 'all')
          root.classList.add('motion-budget-optimal')
          root.classList.remove('motion-budget-critical', 'motion-budget-degraded')
          break
      }
    }
    
    // Throttle animations during performance issues
    function throttleAnimations(frameTime: number) {
      const severity = frameTime > 100 ? 'severe' : frameTime > 50 ? 'moderate' : 'mild'
      
      // Find and pause non-essential animations
      const animations = document.getAnimations()
      const nonEssentialAnimations = animations.filter(anim => {
        const target = anim.effect?.target as Element
        return target && !target.classList.contains('essential-animation')
      })
      
      if (severity === 'severe') {
        // Pause all non-essential animations
        nonEssentialAnimations.forEach(anim => {
          anim.pause()
          setTimeout(() => anim.play(), 1000) // Resume after 1s
        })
        console.log('🔴 Severe jank: paused all non-essential animations')
      } else if (severity === 'moderate') {
        // Reduce playback rate for smoother performance
        nonEssentialAnimations.forEach(anim => {
          anim.playbackRate = 0.5
          setTimeout(() => anim.playbackRate = 1, 500)
        })
        console.log('🟡 Moderate jank: reduced animation speed')
      }
    }
    
    // Animation registration system for budget tracking
    window.registerAnimation = (element: Element, essential = false) => {
      if (currentAnimationCount >= MOTION_BUDGET.MAX_CONCURRENT_ANIMATIONS && !essential) {
        console.warn('📊 Animation budget exceeded - skipping non-essential animation')
        return false
      }
      
      if (essential) {
        element.classList.add('essential-animation')
      }
      
      currentAnimationCount++
      
      // Auto-cleanup when animation ends
      element.addEventListener('animationend', () => {
        currentAnimationCount = Math.max(0, currentAnimationCount - 1)
      }, { once: true })
      
      return true
    }
    
    // Initialize with optimal budget
    applyMotionBudget('optimal')
    
    console.log('📊 Advanced performance monitoring initialized with motion budgets')
  }
}

// =======================
// ACCESSIBILITY ENHANCEMENTS
// =======================

// Enhanced accessibility and motion preferences with WCAG compliance
function setupMotionPreferences() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const prefersReducedTransparency = window.matchMedia('(prefers-reduced-transparency: reduce)')
  const prefersHighContrast = window.matchMedia('(prefers-contrast: high)')
  const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  
  const handleMotionPreference = (e: MediaQueryListEvent | MediaQueryList) => {
    const root = document.documentElement
    
    if (e.matches) {
      root.classList.add('reduce-motion')
      
      // Pause all current animations
      const animations = document.getAnimations()
      animations.forEach(animation => {
        if (!animation.effect?.target?.classList.contains('essential-animation')) {
          animation.pause()
        }
      })
      
      // Apply immediate accessibility styles
      root.style.setProperty('--motion-instant', '0ms')
      root.style.setProperty('--motion-quick', '0ms')
      root.style.setProperty('--motion-smooth', '0ms')
      
      console.log('🛡️ Reduced motion mode enabled - animations paused')
      
      // Announce to screen readers
      announceToScreenReader('Motion reduced for accessibility')
    } else {
      root.classList.remove('reduce-motion')
      
      // Resume animations with respect for performance state
      const animations = document.getAnimations()
      animations.forEach(animation => {
        if (animation.playState === 'paused') {
          animation.play()
        }
      })
      
      // Restore motion timing
      root.style.removeProperty('--motion-instant')
      root.style.removeProperty('--motion-quick')
      root.style.removeProperty('--motion-smooth')
      
      console.log('🎭 Full motion mode enabled')
      announceToScreenReader('Motion animations enabled')
    }
  }
  
  const handleTransparencyPreference = (e: MediaQueryListEvent | MediaQueryList) => {
    const root = document.documentElement
    
    if (e.matches) {
      root.classList.add('reduce-transparency')
      console.log('🔍 Reduced transparency mode enabled')
    } else {
      root.classList.remove('reduce-transparency')
      console.log('✨ Full transparency effects enabled')
    }
  }
  
  const handleContrastPreference = (e: MediaQueryListEvent | MediaQueryList) => {
    const root = document.documentElement
    
    if (e.matches) {
      root.classList.add('high-contrast')
      console.log('🎯 High contrast mode enabled')
    } else {
      root.classList.remove('high-contrast')
      console.log('🌈 Standard contrast mode')
    }
  }
  
  // Screen reader announcement helper
  function announceToScreenReader(message: string) {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.setAttribute('class', 'sr-only')
    announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    setTimeout(() => document.body.removeChild(announcement), 1000)
  }
  
  // Set initial states
  handleMotionPreference(prefersReducedMotion)
  handleTransparencyPreference(prefersReducedTransparency)
  handleContrastPreference(prefersHighContrast)
  
  // Listen for changes
  prefersReducedMotion.addEventListener('change', handleMotionPreference)
  prefersReducedTransparency.addEventListener('change', handleTransparencyPreference)
  prefersHighContrast.addEventListener('change', handleContrastPreference)
  
  // Enhanced keyboard shortcuts for accessibility
  document.addEventListener('keydown', (e) => {
    // Motion toggle (Ctrl+Alt+M)
    if (e.ctrlKey && e.altKey && e.key === 'm') {
      e.preventDefault()
      const currentlyReduced = document.documentElement.classList.contains('reduce-motion')
      
      if (currentlyReduced) {
        document.documentElement.classList.remove('reduce-motion')
        handleMotionPreference({ matches: false } as MediaQueryList)
        console.log('🎭 Motion manually enabled')
      } else {
        document.documentElement.classList.add('reduce-motion')
        handleMotionPreference({ matches: true } as MediaQueryList)
        console.log('🛡️ Motion manually disabled')
      }
    }
    
    // Pause all animations (Ctrl+Alt+P)
    if (e.ctrlKey && e.altKey && e.key === 'p') {
      e.preventDefault()
      const animations = document.getAnimations()
      const isPaused = animations.some(anim => anim.playState === 'paused')
      
      animations.forEach(animation => {
        if (isPaused) {
          animation.play()
        } else {
          animation.pause()
        }
      })
      
      const action = isPaused ? 'resumed' : 'paused'
      console.log(`⏯️ All animations ${action}`)
      announceToScreenReader(`All animations ${action}`)
    }
    
    // Focus visible elements only (Ctrl+Alt+F)
    if (e.ctrlKey && e.altKey && e.key === 'f') {
      e.preventDefault()
      const motionElements = document.querySelectorAll('.motion-element, .kinetic-text')
      motionElements.forEach(element => {
        ;(element as HTMLElement).style.outline = '2px solid #d4af37'
        ;(element as HTMLElement).style.outlineOffset = '2px'
      })
      
      setTimeout(() => {
        motionElements.forEach(element => {
          ;(element as HTMLElement).style.outline = ''
          ;(element as HTMLElement).style.outlineOffset = ''
        })
      }, 3000)
      
      announceToScreenReader('Motion elements highlighted')
    }
  })
  
  // Respect system-level accessibility settings
  if (window.matchMedia('(prefers-reduced-data: reduce)').matches) {
    console.log('📱 Reduced data preference detected - optimizing for performance')
    document.documentElement.classList.add('reduce-data')
  }
  
  // Add ARIA labels and roles for interactive motion elements
  const addAccessibilityEnhancements = () => {
    const interactiveMotionElements = document.querySelectorAll('.text-morph, .cta-kinetic-text, [data-transition]')
    
    interactiveMotionElements.forEach(element => {
      if (!element.getAttribute('role')) {
        element.setAttribute('role', 'button')
      }
      
      if (!element.getAttribute('aria-label')) {
        const text = element.textContent?.trim()
        if (text) {
          element.setAttribute('aria-label', `Interactive text: ${text}`)
        }
      }
      
      // Add focus management
      element.setAttribute('tabindex', '0')
    })
  }
  
  // Apply accessibility enhancements initially and on DOM changes
  addAccessibilityEnhancements()
  
  const accessibilityObserver = new MutationObserver(() => {
    addAccessibilityEnhancements()
  })
  
  accessibilityObserver.observe(document.body, {
    childList: true,
    subtree: true
  })
}

// =======================
// INITIALIZATION SEQUENCE
// =======================

// Initialize all motion systems on DOM ready
const initializeApp = () => {
  // Setup motion preferences first
  setupMotionPreferences()
  
  // Initialize core motion systems
  initializeMotionSystem()
  
  // Enable view transitions
  enableViewTransitions()
  
  // Start performance monitoring
  initializePerformanceMonitoring()
  
  console.log('🚀 Veritron Motion System initialized successfully')
}

// Ensure we have a root element
const container = document.getElementById('root')
if (!container) {
  throw new Error('Root element not found')
}

// Create root and render with React 18's concurrent features
const root = createRoot(container)

// Initialize motion system when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  initializeApp()
}

root.render(
  <App />
)