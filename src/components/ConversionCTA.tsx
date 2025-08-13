import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import PremiumButton from './atoms/PremiumButton';

const ConversionCTA: React.FC = () => {
  const handleContactClick = () => {
    // Navigate to Services page contact form
    window.location.href = '/services#contact';
  };

  const stats = [
    { number: "500+", label: "Projects Delivered" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "25+", label: "Years Experience" },
    { number: "24/7", label: "AI Support" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 to-yellow-600/5 rounded-3xl blur-3xl" />
          
          <motion.div
            className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-yellow-400/20 rounded-3xl p-12 text-center backdrop-blur-sm"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main Heading */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your{' '}
              <span className="text-yellow-400">Business</span>?
            </motion.h2>

            {/* Subheading */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Join hundreds of forward-thinking companies who trust Veriton to deliver 
              cutting-edge AI solutions that drive real results.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <PremiumButton
                variant="gold"
                size="large"
                onClick={handleContactClick}
                className="px-12 py-4 text-lg font-semibold group min-w-[250px]"
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2" />
                Start Your Project
                <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </PremiumButton>

              <motion.div
                className="text-gray-400 text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <span className="border-b border-gray-600 hover:border-yellow-400 transition-colors cursor-pointer">
                  View Our Portfolio
                </span>
              </motion.div>
            </motion.div>

            {/* Trust Statement */}
            <motion.p
              className="text-sm text-gray-500 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              No commitment required • Free consultation • Australian-owned & operated
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConversionCTA;