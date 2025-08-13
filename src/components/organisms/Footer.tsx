import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ChevronUp,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Send,
  ArrowRight,
  Sparkles,
  Globe,
  Shield,
  Award,
  Users
} from 'lucide-react';
import VeritronLogo from '../atoms/VeritronLogo';
import PremiumButton from '../atoms/PremiumButton';
import { ModernCard } from '../atoms/ModernCard';

const ModernFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  // Services data matching the main services
  const services = [
    { name: 'AI & Machine Learning', href: '/services/ai-ml' },
    { name: 'Custom Development', href: '/services/development' },
    { name: 'UI/UX Design', href: '/services/design' },
    { name: 'Cloud Infrastructure', href: '/services/cloud' },
    { name: 'API Development', href: '/services/api' },
    { name: 'Data Management', href: '/services/database' }
  ];

  // Company links
  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers', badge: 'Hiring' },
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/case-studies' }
  ];

  // Resources links
  const resources = [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
    { name: 'Support Center', href: '/support' },
    { name: 'Status Page', href: '/status' },
    { name: 'Security', href: '/security' }
  ];

  // Social links with icons
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/veritron', Icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/veritron', Icon: Linkedin },
    { name: 'Twitter', href: 'https://twitter.com/veritron', Icon: Twitter },
    { name: 'YouTube', href: 'https://youtube.com/@veritron', Icon: Youtube }
  ];

  // Trust badges
  const trustBadges = [
    { Icon: Shield, text: 'SOC 2 Certified' },
    { Icon: Award, text: 'ISO 27001' },
    { Icon: Users, text: '500+ Clients' },
    { Icon: Globe, text: 'Global Reach' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-gray-800/50 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-900/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-800/5 rounded-full blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section with Newsletter */}
        <div className="mb-12 pb-12 border-b border-gray-800/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Stay Ahead with <span className="text-gradient-metallic">Veritron</span>
            </h3>
            <p className="text-gray-400 mb-8">
              Get the latest updates on AI innovations, tech insights, and exclusive offers.
            </p>
            
            {/* Newsletter Form */}
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all"
                      required
                    />
                  </div>
                  <PremiumButton
                    type="submit"
                    variant="gold"
                    size="medium"
                    className="group"
                  >
                    <span className="flex items-center gap-2">
                      Subscribe
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </PremiumButton>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 text-green-400"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Successfully subscribed! Welcome to Veritron.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Middle Section with Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <VeritronLogo width={150} height={50} />
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Transforming businesses through innovative AI solutions, custom development, 
              and cutting-edge technology. Your vision, our expertise.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-900/50 border border-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-amber-400/10 hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <badge.Icon className="w-4 h-4 text-amber-400/60" />
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-400 text-sm hover:text-amber-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-amber-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.name}
                    {link.badge && (
                      <span className="px-2 py-0.5 bg-amber-400/10 text-amber-400 text-xs rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-amber-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-800/50 rounded-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <a href="mailto:hello@veritron.com" className="text-sm text-white hover:text-amber-400 transition-colors">
                  hello@veritron.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <a href="tel:+15551234567" className="text-sm text-white hover:text-amber-400 transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm text-white">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-sm text-gray-500"
            >
              © {currentYear} Veritron AI. All rights reserved.
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 text-sm"
            >
              <a href="/privacy" className="text-gray-500 hover:text-amber-400 transition-colors">
                Privacy Policy
              </a>
              <span className="text-gray-700">•</span>
              <a href="/terms" className="text-gray-500 hover:text-amber-400 transition-colors">
                Terms of Service
              </a>
              <span className="text-gray-700">•</span>
              <a href="/cookies" className="text-gray-500 hover:text-amber-400 transition-colors">
                Cookie Policy
              </a>
            </motion.div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="group flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-400 hover:bg-amber-400/10 hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              <span className="text-sm">Back to Top</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Animated gradient line at the very bottom */}
      <motion.div
        className="h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </footer>
  );
};

export default ModernFooter;