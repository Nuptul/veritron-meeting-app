import React from 'react';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { CometCard } from '../components/ui/CometCard';
import PremiumButton from '../components/atoms/PremiumButton';

const Contact: React.FC = () => {

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Contact <span className="text-gradient-metallic">VERITRON</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            For project inquiries and detailed consultations, please visit our Services page where you can submit a comprehensive project request through our premium contact form.
          </p>

          {/* CTA to Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <PremiumButton
              variant="gold"
              size="large"
              onClick={() => window.location.href = '/services#contact'}
              className="group"
            >
              <span className="flex items-center gap-2">
                Start Your Project
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </PremiumButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Quick Contact Info */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CometCard className="p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-8">Quick Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <EnvelopeIcon className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Email</p>
                    <a
                      href="mailto:contact@veritronai.com"
                      className="text-white hover:text-amber-400 transition-colors font-medium"
                    >
                      contact@veritronai.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <PhoneIcon className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Phone</p>
                    <a
                      href="tel:+1-555-VERITRON"
                      className="text-white hover:text-amber-400 transition-colors font-medium"
                    >
                      +1-555-VERITRON
                    </a>
                  </div>
                </div>
              </div>
            </CometCard>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default Contact;