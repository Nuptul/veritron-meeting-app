import React from 'react';
import { motion } from 'framer-motion';
import {
  RocketLaunchIcon,
  UserGroupIcon,
  LightBulbIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { CometCard } from '../components/ui/CometCard';
import PremiumButton from '../components/atoms/PremiumButton';
import { SectionHeading } from '../components/atoms/PremiumHeading';

const About: React.FC = () => {
  const values = [
    {
      icon: LightBulbIcon,
      title: 'Enterprise Authority',
      description: 'We don\'t just serve enterprises—we think like them. Every solution is architected for scale, security, and sustainable growth.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Comprehensive Capability',
      description: 'From the first pixel to the final deployment, from AI strategy to team training—we\'re your complete digital transformation partner.'
    },
    {
      icon: UserGroupIcon,
      title: 'AI Leadership',
      description: 'In the rapidly evolving AI landscape, you need more than vendors—you need visionaries. We\'re your strategic guides to the future.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Proven Excellence',
      description: '25 years. Fortune 500 clients. Australian innovation. Global impact. The numbers speak, but our results roar.'
    }
  ];

  const stats = [
    { number: '25+', label: 'Years of Excellence' },
    { number: 'Fortune 500', label: 'Trusted by Enterprise' },
    { number: '100%', label: 'Australian Owned' },
    { number: 'HP, Dell, Philips', label: 'Leading Clients' }
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years in technology innovation and business transformation.',
      image: '/images/team/alex.jpg'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      bio: 'Expert in AI/ML and cloud architecture with a passion for cutting-edge solutions.',
      image: '/images/team/sarah.jpg'
    },
    {
      name: 'Marcus Williams',
      role: 'Head of Design',
      bio: 'Creative director specializing in user experience and brand transformation.',
      image: '/images/team/marcus.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          badge="About Us"
          title="25 Years of Digital Excellence, Powered by Australian Innovation"
          accentWord="Innovation"
          subtitle="VERITRON isn't just another digital agency. We're architects of transformation, pioneers of possibility, and partners in your success. Australian-owned and globally minded, we've spent over two decades earning the trust of the world's most demanding enterprises."
          className="max-w-4xl mx-auto mb-12"
          animate={false}
        />
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              badge="Our Mission"
              title="From Vision to VERITRON"
              accentWord="VERITRON"
              subtitle="For over 25 years, we've been at the forefront of digital innovation, evolving from a commitment to excellence into Australia's premier enterprise-grade digital agency, trusted by Fortune 500 companies worldwide."
              className="text-left"
              animate={false}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-amber-500/20 to-gray-900/40 rounded-2xl p-8 border border-amber-500/20">
              <div className="space-y-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center border-b border-gray-700/50 pb-4"
                  >
                    <span className="text-gray-400">{stat.label}</span>
                    <span className="text-2xl font-bold text-amber-400">{stat.number}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          badge="Our Values"
          title="Why Industry Leaders Choose VERITRON"
          accentWord="VERITRON"
          subtitle="These core principles have guided us for over 25 years and continue to shape how we deliver enterprise-grade solutions for the world's most demanding organizations."
          className="mb-16"
          animate={false}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CometCard className="p-6 h-full text-center">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </CometCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          badge="Our Team"
          title="Meet Our Team"
          accentWord="Team"
          subtitle="Our diverse team of experts brings together decades of experience across technology, design, and business strategy to deliver exceptional results."
          className="mb-16"
          animate={false}
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CometCard className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-500/20 to-gray-700/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <UserGroupIcon className="w-12 h-12 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-amber-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.bio}</p>
              </CometCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Client Testimonials Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          badge="Client Success"
          title="Trusted by Industry Leaders"
          accentWord="Leaders"
          subtitle="Our client roster reads like a who's who of global enterprise: HP, Dell, Philips, Corona Bathrooms, and Philips Australia. These partnerships aren't just projects—they're long-term relationships built on trust, innovation, and exceptional results."
          className="mb-16"
          animate={false}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <CometCard className="p-6 text-center h-full">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-amber-400 mb-2">HP</h3>
                <p className="text-sm text-gray-500 mb-4">Global Technology Leader</p>
              </div>
              <p className="text-gray-400 text-sm italic">
                "VERITRON's enterprise-grade solutions have been instrumental in our digital transformation journey.
                Their deep understanding of complex enterprise requirements sets them apart."
              </p>
            </CometCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CometCard className="p-6 text-center h-full">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-amber-400 mb-2">Dell</h3>
                <p className="text-sm text-gray-500 mb-4">Enterprise Solutions</p>
              </div>
              <p className="text-gray-400 text-sm italic">
                "Working with VERITRON feels like partnering with an extension of our own team.
                They understand our business needs and consistently deliver beyond expectations."
              </p>
            </CometCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <CometCard className="p-6 text-center h-full">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-amber-400 mb-2">Philips</h3>
                <p className="text-sm text-gray-500 mb-4">Healthcare Innovation</p>
              </div>
              <p className="text-gray-400 text-sm italic">
                "The level of innovation and technical expertise VERITRON brings to every project
                has been crucial in helping us stay ahead in the competitive healthcare technology market."
              </p>
            </CometCard>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900/50 to-black border-t border-gray-700 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            badge="Ready to Work Together?"
            title="Let's Architect Your Digital Future"
            accentWord="Future"
            subtitle="Join HP, Dell, Philips, and other industry leaders who trust VERITRON to architect their digital success. Schedule a consultation with our enterprise specialists and discover how we can transform your organization."
            className="mb-8"
            animate={false}
          />
          <div className="flex flex-wrap justify-center gap-4">
            <PremiumButton variant="gold" size="large">
              Book Your Strategy Session
            </PremiumButton>
            <PremiumButton variant="aluminum" size="large">
              Explore Our Solutions
            </PremiumButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;