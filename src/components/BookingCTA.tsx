import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarIcon, ArrowRightIcon, ClockIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import PremiumButton from './atoms/PremiumButton'

interface BookingCTAProps {
  variant?: 'primary' | 'secondary' | 'floating'
  size?: 'small' | 'medium' | 'large'
  showUrgency?: boolean
  className?: string
}

const BookingCTA: React.FC<BookingCTAProps> = ({
  variant = 'primary',
  size = 'medium',
  showUrgency = true,
  className = ''
}) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('')

  // Mock available time slots
  const timeSlots = [
    { id: '1', time: '9:00 AM - 10:00 AM', date: 'Today', available: true },
    { id: '2', time: '2:00 PM - 3:00 PM', date: 'Today', available: true },
    { id: '3', time: '10:00 AM - 11:00 AM', date: 'Tomorrow', available: true },
    { id: '4', time: '3:00 PM - 4:00 PM', date: 'Tomorrow', available: true },
    { id: '5', time: '11:00 AM - 12:00 PM', date: 'Day After', available: true },
  ]

  const benefits = [
    'Free 30-minute consultation',
    'Custom AI strategy roadmap',
    'No obligation assessment',
    'Expert technical guidance'
  ]

  const handleBookConsultation = () => {
    setShowModal(true)
  }

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
    // In a real app, this would integrate with calendar API
    console.log('Selected time slot:', timeSlot)
    alert(`Consultation booked for ${timeSlot}! You'll receive a confirmation email shortly.`)
    setShowModal(false)
    setSelectedTimeSlot('')
  }

  // Variant styles
  const variantStyles = {
    primary: 'w-full',
    secondary: 'inline-flex',
    floating: 'fixed bottom-6 right-6 z-50 shadow-2xl'
  }

  const sizeStyles = {
    small: variant === 'floating' ? 'w-14 h-14 rounded-full' : '',
    medium: '',
    large: ''
  }

  if (variant === 'floating' && size === 'small') {
    return (
      <>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className={`${variantStyles[variant]} ${sizeStyles[size]} bg-gradient-to-r from-veritron-gold-500 to-veritron-gold-600 cursor-pointer ${className}`}
          onClick={handleBookConsultation}
        >
          <div className="flex items-center justify-center w-full h-full text-white">
            <CalendarIcon className="w-6 h-6" />
          </div>
        </motion.div>
        <BookingModal 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          timeSlots={timeSlots}
          onSelectTimeSlot={handleTimeSlotSelect}
          benefits={benefits}
        />
      </>
    )
  }

  return (
    <>
      <div className={`${variantStyles[variant]} ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-veritron-gold-50 to-veritron-aluminum-50 dark:from-veritron-gunmetal-900 dark:to-veritron-gunmetal-800 rounded-2xl p-8 border border-veritron-gold-200 dark:border-veritron-gold-700/30"
        >
          {/* Urgency indicator */}
          {showUrgency && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center mb-4 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-semibold rounded-full"
            >
              <ClockIcon className="w-4 h-4 mr-2" />
              Limited Availability - Book Today
            </motion.div>
          )}

          <div className="text-center">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl font-bold text-veritron-gunmetal-900 dark:text-veritron-aluminum-100 mb-2"
            >
              Ready to Transform Your Business?
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-veritron-gunmetal-600 dark:text-veritron-aluminum-400 mb-6"
            >
              Book a free consultation and discover how AI can revolutionize your operations
            </motion.p>

            {/* Benefits list */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {benefits.map((benefit, index) => (
                <div key={benefit} className="flex items-center text-sm text-veritron-gunmetal-600 dark:text-veritron-aluminum-400">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  {benefit}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <PremiumButton
                onClick={handleBookConsultation}
                size="large"
                variant="gold"
                fullWidth={variant === 'primary'}
                className="group"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Book Free Consultation
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </PremiumButton>
              
              <p className="text-xs text-veritron-gunmetal-500 dark:text-veritron-aluminum-500">
                ⚡ Response within 2 hours • 📞 30-minute strategy session • 🎯 Custom roadmap
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <BookingModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        timeSlots={timeSlots}
        onSelectTimeSlot={handleTimeSlotSelect}
        benefits={benefits}
      />
    </>
  )
}

// Booking Modal Component
interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  timeSlots: Array<{ id: string; time: string; date: string; available: boolean }>
  onSelectTimeSlot: (timeSlot: string) => void
  benefits: string[]
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  timeSlots,
  onSelectTimeSlot,
  benefits
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl bg-white dark:bg-veritron-gunmetal-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-veritron-gunmetal-200 dark:border-veritron-gunmetal-700">
                <h2 className="text-2xl font-bold text-veritron-gunmetal-900 dark:text-veritron-aluminum-100">
                  Book Your Free Consultation
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-veritron-gunmetal-100 dark:hover:bg-veritron-gunmetal-800 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-veritron-gunmetal-500 dark:text-veritron-aluminum-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-veritron-gunmetal-900 dark:text-veritron-aluminum-100 mb-4">
                    What You'll Get:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-veritron-gunmetal-700 dark:text-veritron-aluminum-300"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        {benefit}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="text-lg font-semibold text-veritron-gunmetal-900 dark:text-veritron-aluminum-100 mb-4">
                    Available Times:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {timeSlots.map((slot, index) => (
                      <motion.button
                        key={slot.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onSelectTimeSlot(`${slot.date} at ${slot.time}`)}
                        className="p-4 text-left border border-veritron-gunmetal-200 dark:border-veritron-gunmetal-700 rounded-xl hover:border-veritron-gold-400 hover:bg-veritron-gold-50 dark:hover:bg-veritron-gold-900/10 transition-all duration-300 group"
                      >
                        <div className="font-semibold text-veritron-gunmetal-900 dark:text-veritron-aluminum-100 group-hover:text-veritron-gold-600 dark:group-hover:text-veritron-gold-400">
                          {slot.time}
                        </div>
                        <div className="text-sm text-veritron-gunmetal-600 dark:text-veritron-aluminum-400">
                          {slot.date}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Footer Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 bg-veritron-aluminum-50 dark:bg-veritron-gunmetal-800 rounded-xl"
                >
                  <p className="text-sm text-veritron-gunmetal-600 dark:text-veritron-aluminum-400">
                    <strong>Note:</strong> All consultations are conducted via video call. You'll receive calendar invite and joining instructions after booking.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BookingCTA