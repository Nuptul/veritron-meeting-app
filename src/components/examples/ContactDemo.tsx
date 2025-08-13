import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../Contact';

/**
 * ContactDemo - Demonstrates the Contact form integration
 * 
 * Features showcased:
 * - React Hook Form validation with Zod schema
 * - Floating labels with focus animations
 * - Convex database integration
 * - Service interest selection from Convex services
 * - Budget and timeline selection
 * - Success/error notifications
 * - Responsive design with sidebar contact info
 * - Micro-interactions and animations
 */
const ContactDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Demo Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-veritron-gunmetal-800 mb-2">
              Contact Form Demo
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A comprehensive contact form with Convex integration, form validation, 
              floating labels, animations, and real-time notifications.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Form */}
      <Contact />

      {/* Demo Features Info */}
      <div className="bg-veritron-gunmetal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center mb-12"
            >
              Contact Form Features
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-veritron-gunmetal-800 p-6 rounded-xl"
                >
                  <div className="text-veritron-gold-400 mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: 'Form Validation',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'React Hook Form with Zod schema validation for robust form handling and error management.'
  },
  {
    title: 'Floating Labels',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V2a1 1 0 011-1h8a1 1 0 011 1v2" />
      </svg>
    ),
    description: 'Beautiful animated floating labels with focus effects and smooth transitions.'
  },
  {
    title: 'Convex Integration',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    description: 'Real-time database integration with Convex for form submissions and service data.'
  },
  {
    title: 'Service Selection',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    description: 'Dynamic service interest selection pulled from Convex services database.'
  },
  {
    title: 'Smart Notifications',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.021 9.869A5.99 5.99 0 019 7c.552 0 1.086.101 1.579.287A1 1 0 0110 7V6a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-.421.821A5.99 5.99 0 0119 13v1.5c0 .828-.672 1.5-1.5 1.5H5.5c-.828 0-1.5-.672-1.5-1.5V13a5.99 5.99 0 01.021-3.131z" />
      </svg>
    ),
    description: 'Toast notifications for success/error states with auto-dismiss functionality.'
  },
  {
    title: 'Micro-interactions',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    description: 'Smooth animations and micro-interactions using Framer Motion for enhanced UX.'
  }
];

export default ContactDemo;