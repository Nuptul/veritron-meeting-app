import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  CubeIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { CometCard } from './ui/CometCard';
import PremiumButton from './atoms/PremiumButton';
import { SectionHeading } from './atoms/PremiumHeading';

const ValuePropositions: React.FC = () => {
  const valueProps = [
    {
      icon: ShieldCheckIcon,
      title: 'Enterprise Excellence',
      description: 'We don\'t just deliver solutions—we architect enterprise-grade systems that scale with your ambitions. Our track record with Fortune 500 companies speaks to our commitment to excellence.'
    },
    {
      icon: CubeIcon,
      title: 'Complete Digital Ecosystem',
      description: 'From initial concept to final deployment, from media creation to system integration—we\'re your single source for comprehensive digital transformation.'
    },
    {
      icon: LightBulbIcon,
      title: 'AI Pioneers & Guides',
      description: 'Navigate the rapidly evolving AI landscape with confidence. Our specialists don\'t just implement technology—we become your strategic advisors in the age of artificial intelligence.'
    }
  ];

  const trustIndicators = [
    { label: '25+ Years', sublabel: 'of Digital Innovation' },
    { label: 'Enterprise Clients', sublabel: 'Including HP, Dell, Philips' },
    { label: '100% Australian', sublabel: 'Owned & Operated' },
    { label: 'Full-Stack Expertise', sublabel: 'From Ground Up' }
  ];

  return (
    <>
      {/* Value Propositions Section */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-veritron-gunmetal-900 via-black to-veritron-gunmetal-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeading
            badge="Why Choose Us"
            title="Why Industry Leaders Choose VERITRON"
            accentWord="VERITRON"
            subtitle="For over 25 years, we've been the trusted partner for enterprises ready to embrace the future"
            className="mb-16"
            animate={false}
          />

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <CometCard className="h-full bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-amber-400/20 backdrop-blur-xl shadow-2xl hover:border-amber-400/40 transition-all duration-300 overflow-hidden">
                  <div className="p-8 text-center h-full flex flex-col relative">
                    {/* Glass morphism base */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none" />
                    
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg ring-1 ring-amber-400/20 relative z-10">
                      <prop.icon className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4 relative z-10">
                      {prop.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed flex-1 relative z-10">
                      {prop.description}
                    </p>
                  </div>
                </CometCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-16 bg-gradient-to-br from-veritron-gunmetal-900 via-black to-veritron-gunmetal-900 border-y border-amber-400/10 relative overflow-hidden">
        {/* Background noise texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
             }} />
        
        <div className="container mx-auto px-4 relative">
          <SectionHeading
            badge="Our Track Record"
            title="Proven Excellence Across Industries"
            accentWord="Industries"
            subtitle="25+ years of delivering enterprise-grade solutions across diverse sectors, from healthcare to technology, with measurable results and lasting partnerships."
            className="mb-12"
            animate={false}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-4 md:p-5 h-full shadow-2xl hover:border-amber-400/40 hover:shadow-amber-400/5 transition-all duration-300 relative overflow-hidden">
                  {/* Glass morphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] pointer-events-none" />
                  
                  <div className="text-lg md:text-xl font-bold text-gradient-metallic mb-1 relative z-10">
                    {indicator.label}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 relative z-10">
                    {indicator.sublabel}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="py-16 bg-gradient-to-br from-black via-amber-950/5 to-black">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            badge="Ready to Transform Your Digital Future?"
            title="Join the ranks of industry leaders who trust VERITRON"
            accentWord="VERITRON"
            subtitle="Partner with us to architect your digital success and join HP, Dell, Philips, and other industry leaders who trust our enterprise-grade solutions."
            className="mb-8"
            animate={false}
          />
          <PremiumButton
            variant="gold"
            size="large"
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="min-w-[220px]"
          >
            Discover Our Services →
          </PremiumButton>
        </div>
      </section>
    </>
  );
};

export default ValuePropositions;