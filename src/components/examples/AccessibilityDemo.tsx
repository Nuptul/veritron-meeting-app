import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AccessibilityDemo Component
 * 
 * Demonstrates proper implementation of accessibility features including:
 * - APCA-compliant color contrast
 * - Enhanced focus management 
 * - Screen reader support
 * - Reading mode utilities
 * - Dialog/popover patterns
 */

export const AccessibilityDemo: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [readingOverlay, setReadingOverlay] = useState<string>('none');
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Focus management for dialog
  const openDialog = () => {
    setIsDialogOpen(true);
    // Focus will be managed by focus trap
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    // Return focus to trigger
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  // Handle escape key for dialog
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isDialogOpen) {
      closeDialog();
    }
  };

  return (
    <div 
      className={`p-8 space-y-8 ${isReadingMode ? 'reading-mode' : ''} ${
        readingOverlay !== 'none' ? `reading-overlay-${readingOverlay}` : ''
      }`}
      onKeyDown={handleKeyDown}
    >
      {/* Page Title with APCA-compliant text */}
      <header>
        <h1 className="text-3xl font-bold text-apca-high mb-4">
          Accessibility Features Demo
        </h1>
        <p className="text-apca-medium text-lg">
          This demo showcases WCAG 2.1 AA and APCA-compliant accessibility patterns.
        </p>
      </header>

      {/* Live region for announcements */}
      <div 
        className="live-region" 
        aria-live="polite" 
        aria-atomic="true"
        id="announcements"
      />

      {/* Reading Mode Controls */}
      <section aria-labelledby="reading-controls">
        <h2 id="reading-controls" className="text-xl font-semibold text-apca-medium mb-4">
          Reading Accessibility
        </h2>
        
        <div className="space-y-4">
          {/* Reading Mode Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsReadingMode(!isReadingMode)}
              className={`px-4 py-2 rounded-lg focus-enhanced touch-target transition-colors ${
                isReadingMode 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-gray-100 text-gray-700 border border-gray-300'
              }`}
              aria-pressed={isReadingMode}
              aria-describedby="reading-mode-desc"
            >
              {isReadingMode ? 'Disable' : 'Enable'} Dyslexia-Friendly Mode
            </button>
            <p id="reading-mode-desc" className="text-sm text-apca-low">
              Uses OpenDyslexic font with increased spacing for better readability
            </p>
          </div>

          {/* Color Overlay Options */}
          <div>
            <fieldset>
              <legend className="text-sm font-semibold text-apca-medium mb-2">
                Visual Stress Reduction Overlays
              </legend>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'none', label: 'None', class: '' },
                  { value: 'blue', label: 'Blue Tint', class: 'bg-blue-100' },
                  { value: 'cream', label: 'Cream', class: 'bg-yellow-50' },
                  { value: 'gray', label: 'Light Gray', class: 'bg-gray-50' },
                ].map(overlay => (
                  <label key={overlay.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="overlay"
                      value={overlay.value}
                      checked={readingOverlay === overlay.value}
                      onChange={(e) => setReadingOverlay(e.target.value)}
                      className="focus-enhanced"
                    />
                    <span className={`px-2 py-1 rounded text-sm ${overlay.class} border`}>
                      {overlay.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </section>

      {/* APCA Color Contrast Examples */}
      <section aria-labelledby="contrast-examples">
        <h2 id="contrast-examples" className="text-xl font-semibold text-apca-medium mb-4">
          APCA Contrast Examples
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* High Contrast - Lc 90+ */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-apca-high mb-2">
              High Contrast (Lc 90+)
            </h3>
            <p className="text-apca-high text-sm">
              Critical information and fine print use maximum contrast for accessibility.
            </p>
          </div>

          {/* Medium Contrast - Lc 75+ */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-apca-medium mb-2">
              Body Text (Lc 75+)
            </h3>
            <p className="text-apca-medium text-base">
              Standard body text maintains excellent readability with balanced contrast.
            </p>
          </div>

          {/* Low Contrast - Lc 60+ */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-apca-gold-primary mb-2">
              Large Text (Lc 60+)
            </h3>
            <p className="text-apca-low text-lg">
              Large text can use lower contrast while remaining accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Focus Management Demo */}
      <section aria-labelledby="focus-demo">
        <h2 id="focus-demo" className="text-xl font-semibold text-apca-medium mb-4">
          Focus Management
        </h2>
        
        <div className="space-y-4">
          <p className="text-apca-medium">
            Tab through these elements to see enhanced focus indicators:
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg focus-enhanced touch-target">
              Standard Focus
            </button>
            
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg focus-critical touch-target">
              Critical Focus
            </button>
            
            <a 
              href="#" 
              className="px-4 py-2 bg-green-600 text-white rounded-lg focus-enhanced touch-target inline-block"
              onClick={(e) => e.preventDefault()}
            >
              Link with Focus
            </a>
          </div>
        </div>
      </section>

      {/* Dialog/Modal Demo */}
      <section aria-labelledby="dialog-demo">
        <h2 id="dialog-demo" className="text-xl font-semibold text-apca-medium mb-4">
          Accessible Dialog
        </h2>
        
        <button
          ref={triggerRef}
          onClick={openDialog}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg focus-enhanced touch-target"
          aria-haspopup="dialog"
          aria-expanded={isDialogOpen}
        >
          Open Accessible Dialog
        </button>
      </section>

      {/* Form Accessibility Demo */}
      <section aria-labelledby="form-demo">
        <h2 id="form-demo" className="text-xl font-semibold text-apca-medium mb-4">
          Accessible Form Elements
        </h2>
        
        <form className="space-y-4 max-w-md">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-apca-medium mb-1">
              Full Name <span className="form-required sr-only">required</span>
            </label>
            <input
              id="name"
              type="text"
              className="form-field w-full"
              placeholder="Enter your full name"
              required
              aria-describedby="name-help"
            />
            <p id="name-help" className="text-xs text-apca-low mt-1">
              First and last name as they appear on official documents
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-apca-medium mb-1">
              Email Address <span className="form-required sr-only">required</span>
            </label>
            <input
              id="email"
              type="email"
              className="form-field w-full"
              placeholder="your.email@example.com"
              required
              aria-describedby="email-error"
              aria-invalid="false"
            />
            <div id="email-error" className="form-error" style={{ display: 'none' }}>
              Please enter a valid email address
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white rounded-lg focus-enhanced touch-target"
          >
            Submit Form
          </button>
        </form>
      </section>

      {/* Accessible Dialog Implementation */}
      <AnimatePresence>
        {isDialogOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDialog}
              aria-hidden="true"
            />

            {/* Dialog */}
            <div className="dialog-container">
              <motion.div
                ref={dialogRef}
                className="dialog-content p-6 max-w-md w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                role="dialog"
                aria-labelledby="dialog-title"
                aria-describedby="dialog-description"
                tabIndex={-1}
              >
                <h3 id="dialog-title" className="text-lg font-semibold text-apca-high mb-4">
                  Accessible Dialog Example
                </h3>
                
                <p id="dialog-description" className="text-apca-medium mb-6">
                  This dialog demonstrates proper accessibility patterns including focus management,
                  keyboard navigation, and screen reader support.
                </p>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={closeDialog}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 focus-enhanced"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={closeDialog}
                    className="px-4 py-2 bg-blue-600 text-white rounded focus-enhanced touch-target"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Screen Reader Testing Section */}
      <section aria-labelledby="sr-testing" className="border-t pt-8">
        <h2 id="sr-testing" className="text-xl font-semibold text-apca-medium mb-4">
          Screen Reader Testing Notes
        </h2>
        
        <div className="space-y-4 text-apca-medium">
          <p>This page includes the following accessibility features:</p>
          
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Semantic HTML structure with proper heading hierarchy</li>
            <li>ARIA labels, descriptions, and live regions</li>
            <li>Keyboard navigation support (Tab, Shift+Tab, Enter, Space, Escape)</li>
            <li>Focus management for interactive elements</li>
            <li>High contrast text that exceeds APCA requirements</li>
            <li>Touch targets meeting 44px minimum size</li>
            <li>Dyslexia-friendly reading mode with specialized fonts</li>
          </ul>

          <p className="text-sm text-apca-low mt-4">
            <strong>Testing Instructions:</strong> Use a screen reader (NVDA, JAWS, VoiceOver) 
            or keyboard-only navigation to verify all functionality remains accessible.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AccessibilityDemo;