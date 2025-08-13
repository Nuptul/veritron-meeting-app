import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight,
  CheckCircle,
  Sparkles,
  Target,
  Code,
  Palette,
  Database,
  Cloud,
  Bot,
  Cog,
  Users,
  Lightbulb,
  ChevronRight,
  Star,
  Award,
  Calendar,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react';
import PremiumButton from '../components/atoms/PremiumButton';
import { CometCard } from '../components/ui/CometCard';
import AnimatedBorder from '../components/atoms/AnimatedBorder';
import ModernHeader from '../components/ModernHeader';
import ServiceHeader from '../components/ServiceHeader';
import { useTheme } from '../context/ThemeContext';
import '../styles/services-animations.css';

// Service data structure with all 9 services
const servicesData = [
  {
    id: 'ai-automations',
    title: 'Bespoke AI Solutions Built from the Ground Up',
    shortTitle: 'AI Automations',
    description: 'Transform your operations with custom AI automations designed specifically for your enterprise needs. We don\'t rely on off-the-shelf solutions—every system is architected from scratch to perfectly align with your workflows, objectives, and scale requirements.',
    icon: Bot,
    category: 'AI & Automation',
    features: [
      'Custom AI model development',
      'Intelligent process automation',
      'Machine learning pipelines',
      'Natural language processing',
      'Computer vision solutions',
      'Predictive analytics systems'
    ],
    benefits: [
      'Reduce operational costs by 40-60%',
      'Increase processing speed by 10x',
      'Minimize human error',
      'Scale operations efficiently'
    ],
    process: [
      'Requirements analysis & AI feasibility study',
      'Custom model design & architecture',
      'Development & training phase',
      'Integration & deployment',
      'Monitoring & optimization'
    ],
    caseStudies: [
      {
        title: 'Fortune 500 Document Processing',
        result: '85% reduction in processing time',
        industry: 'Finance'
      }
    ],
    pricing: 'Starting at $25,000',
    timeline: '8-16 weeks'
  },
  {
    id: 'media-assets',
    title: 'Premium Digital Assets That Define Your Brand',
    shortTitle: 'Media Assets',
    description: 'Elevate your brand with comprehensive media creation services that go beyond the ordinary. From sophisticated typography to complete visual ecosystems, we craft every pixel with purpose and precision worthy of enterprise standards.',
    icon: Palette,
    category: 'Creative & Media',
    features: [
      'Custom typography design',
      'Brand identity systems',
      'Video production & animation',
      'Interactive media elements',
      'WebGL/WebGPU experiences',
      'Motion graphics & effects'
    ],
    benefits: [
      'Professional brand consistency',
      'Enhanced user engagement',
      'Memorable visual identity',
      'Cross-platform compatibility'
    ],
    process: [
      'Brand discovery & strategy',
      'Creative concept development',
      'Asset design & production',
      'Review & refinement cycles',
      'Final delivery & guidelines'
    ],
    caseStudies: [
      {
        title: 'Tech Startup Rebrand',
        result: '300% increase in brand recognition',
        industry: 'Technology'
      }
    ],
    pricing: 'Starting at $15,000',
    timeline: '6-12 weeks'
  },
  {
    id: 'fullstack-development',
    title: 'End-to-End Digital Architecture',
    shortTitle: 'Full-Stack Dev',
    description: 'Experience the power of truly integrated development. Our full-stack expertise spans from intuitive frontend experiences to robust backend infrastructure, ensuring every layer of your digital presence operates in perfect harmony.',
    icon: Code,
    category: 'Software Development',
    features: [
      'React/Next.js applications',
      'Node.js backend services',
      'Database architecture',
      'API design & development',
      'Cloud deployment',
      'Performance optimization'
    ],
    benefits: [
      'Unified development approach',
      'Faster time to market',
      'Scalable architecture',
      'Reduced maintenance costs'
    ],
    process: [
      'Technical requirements gathering',
      'System architecture design',
      'Frontend & backend development',
      'Testing & quality assurance',
      'Deployment & monitoring'
    ],
    caseStudies: [
      {
        title: 'E-commerce Platform',
        result: '500% increase in conversion rates',
        industry: 'Retail'
      }
    ],
    pricing: 'Starting at $30,000',
    timeline: '12-20 weeks'
  },
  {
    id: 'legacy-integration',
    title: 'Bridge the Past with the Future',
    shortTitle: 'Legacy Integration',
    description: 'Don\'t let legacy systems hold you back. Our integration specialists seamlessly connect your existing infrastructure with modern solutions, preserving your investments while unlocking new capabilities.',
    icon: Database,
    category: 'System Integration',
    features: [
      'Legacy system assessment',
      'Migration strategies',
      'API integration layers',
      'Data transformation',
      'Gradual modernization',
      'Zero-downtime transitions'
    ],
    benefits: [
      'Preserve existing investments',
      'Improve system performance',
      'Enable modern workflows',
      'Reduce operational risks'
    ],
    process: [
      'System audit & analysis',
      'Migration strategy planning',
      'Integration layer development',
      'Phased implementation',
      'Testing & validation'
    ],
    caseStudies: [
      {
        title: 'Manufacturing ERP Integration',
        result: '70% reduction in manual processes',
        industry: 'Manufacturing'
      }
    ],
    pricing: 'Starting at $20,000',
    timeline: '8-16 weeks'
  },
  {
    id: 'mcp-tools',
    title: 'Advanced Model Context Protocol Solutions',
    shortTitle: 'MCP Tools',
    description: 'Harness the full potential of AI with custom MCP tools designed for your specific use cases. We create sophisticated protocol tools that enable seamless AI integration across your entire technology stack.',
    icon: Cog,
    category: 'AI Infrastructure',
    features: [
      'Custom MCP server development',
      'AI agent tool integration',
      'Context protocol optimization',
      'Multi-model compatibility',
      'Real-time data pipelines',
      'Advanced AI workflows'
    ],
    benefits: [
      'Enhanced AI capabilities',
      'Streamlined AI workflows',
      'Better context understanding',
      'Improved AI accuracy'
    ],
    process: [
      'AI workflow analysis',
      'MCP architecture design',
      'Tool development & testing',
      'Integration & deployment',
      'Performance optimization'
    ],
    caseStudies: [
      {
        title: 'AI Research Lab Tools',
        result: '400% improvement in AI agent performance',
        industry: 'Research'
      }
    ],
    pricing: 'Starting at $18,000',
    timeline: '6-10 weeks'
  },
  {
    id: 'autonomous-agents',
    title: 'Intelligence That Works While You Sleep',
    shortTitle: 'Agent Systems',
    description: 'Deploy advanced autonomous agents that transform how work gets done. Our intelligent systems operate independently, making decisions, completing tasks, and driving efficiency 24/7.',
    icon: Target,
    category: 'Advanced AI',
    features: [
      'Multi-agent architectures',
      'Decision-making algorithms',
      'Task orchestration',
      'Learning & adaptation',
      'Real-time monitoring',
      'Safety & compliance'
    ],
    benefits: [
      'Fully autonomous operations',
      'Complex problem solving',
      'Continuous improvement',
      'Reduced human oversight'
    ],
    process: [
      'Agent requirements definition',
      'Multi-agent system design',
      'Development & training',
      'Safety testing & validation',
      'Deployment & monitoring'
    ],
    caseStudies: [
      {
        title: 'Supply Chain Optimization',
        result: '45% cost reduction in logistics',
        industry: 'Logistics'
      }
    ],
    pricing: 'Starting at $35,000',
    timeline: '16-24 weeks'
  },
  {
    id: 'workflow-automation',
    title: 'Efficiency at Enterprise Scale',
    shortTitle: 'Automation',
    description: 'Eliminate bottlenecks and accelerate productivity with intelligent workflow automation. We design systems that not only automate tasks but reimagine entire processes for maximum efficiency.',
    icon: Sparkles,
    category: 'Process Optimization',
    features: [
      'Process analysis & mapping',
      'Automation system design',
      'Integration with existing tools',
      'Custom workflow engines',
      'Performance monitoring',
      'Continuous optimization'
    ],
    benefits: [
      'Eliminate repetitive tasks',
      'Improve accuracy & speed',
      'Reduce operational costs',
      'Enable team focus on strategy'
    ],
    process: [
      'Process discovery & analysis',
      'Automation strategy design',
      'System development & testing',
      'Integration & deployment',
      'Monitoring & optimization'
    ],
    caseStudies: [
      {
        title: 'HR Process Automation',
        result: '80% reduction in manual HR tasks',
        industry: 'Human Resources'
      }
    ],
    pricing: 'Starting at $12,000',
    timeline: '4-8 weeks'
  },
  {
    id: 'team-training',
    title: 'Empower Your Team for the AI Revolution',
    shortTitle: 'Training',
    description: 'Equip your organization with the knowledge and skills to thrive in the AI era. Our expert-led training programs transform teams into AI-savvy innovators ready to drive your digital transformation.',
    icon: Users,
    category: 'Education & Training',
    features: [
      'Custom curriculum development',
      'Hands-on workshops',
      'AI literacy programs',
      'Technical skill development',
      'Best practices training',
      'Ongoing mentorship'
    ],
    benefits: [
      'Improved team capabilities',
      'Faster technology adoption',
      'Increased innovation',
      'Better project outcomes'
    ],
    process: [
      'Skills assessment & gap analysis',
      'Custom training program design',
      'Workshop delivery & hands-on practice',
      'Progress tracking & evaluation',
      'Ongoing support & mentorship'
    ],
    caseStudies: [
      {
        title: 'Enterprise AI Training Program',
        result: '90% of participants implemented AI solutions',
        industry: 'Enterprise'
      }
    ],
    pricing: 'Starting at $8,000',
    timeline: '2-6 weeks'
  },
  {
    id: 'ai-advisory',
    title: 'Your Strategic Navigator in the AI Landscape',
    shortTitle: 'AI Advisory',
    description: 'The AI space moves at lightning speed. Our specialist advisors keep you ahead of the curve, providing strategic guidance, technology assessments, and roadmaps that align AI capabilities with your business objectives.',
    icon: Lightbulb,
    category: 'Strategic Consulting',
    features: [
      'AI readiness assessment',
      'Technology roadmap planning',
      'ROI analysis & forecasting',
      'Risk assessment & mitigation',
      'Vendor selection guidance',
      'Implementation strategy'
    ],
    benefits: [
      'Strategic AI advantage',
      'Informed decision making',
      'Risk mitigation',
      'Optimized investments'
    ],
    process: [
      'Current state assessment',
      'Strategic planning & roadmap',
      'Technology evaluation',
      'Implementation planning',
      'Ongoing strategic guidance'
    ],
    caseStudies: [
      {
        title: 'Healthcare AI Strategy',
        result: '$2M+ in projected cost savings',
        industry: 'Healthcare'
      }
    ],
    pricing: 'Starting at $10,000',
    timeline: '4-8 weeks'
  }
];

// Trust indicators with client logos
const trustIndicators = [
  { name: 'HP', logo: '/logos/hp.svg' },
  { name: 'Dell', logo: '/logos/dell.svg' },
  { name: 'Philips', logo: '/logos/philips.svg' },
  { name: 'Corona Bathrooms', logo: '/logos/corona.svg' },
  { name: 'Philips Australia', logo: '/logos/philips-au.svg' }
];

// Service card component
const ServiceCard: React.FC<{
  service: typeof servicesData[0];
  isSelected: boolean;
  onClick: () => void;
  index: number;
}> = ({ service, isSelected, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const IconComponent = service.icon;

  return (
    <motion.div
      ref={cardRef}
      className={`group relative cursor-pointer ${isSelected ? 'z-20' : 'z-10'}`}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: isSelected ? 1 : 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect for selected card */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute -inset-2 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.3), rgba(184,148,31,0.2))',
              boxShadow: '0 0 40px rgba(212,175,55,0.4)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      <CometCard className="h-full">
        <div className={`neumorphic-card rounded-2xl border overflow-hidden transition-all duration-300 ${
          isSelected 
            ? 'bg-gradient-to-br from-[#2d251a] via-[#3d3327] to-[#2d251a] border-amber-600/50 premium-glow' 
            : 'bg-gradient-to-br from-[#1a1410] via-[#2d2518] to-[#453e35] border-amber-900/30'
        }`}>
          <div className="p-6 md:p-8 h-full min-h-[400px] flex flex-col">
            {/* Service Icon */}
            <motion.div
              className="relative w-20 h-20 mx-auto mb-6"
              animate={{
                scale: isHovered ? [1, 1.1, 1.05] : 1,
                rotate: isHovered ? [0, 5, -5, 0] : 0
              }}
              transition={{ duration: 0.6 }}
            >
              <div className={`w-full h-full rounded-2xl flex items-center justify-center transition-all duration-300 service-icon-glow ${
                isSelected 
                  ? 'bg-gradient-to-br from-amber-600 to-amber-700 shadow-lg shadow-amber-600/30' 
                  : 'bg-gradient-to-br from-amber-800/40 to-amber-900/40'
              }`}>
                <IconComponent className={`w-10 h-10 ${isSelected ? 'text-black' : 'text-amber-300'}`} />
              </div>
            </motion.div>

            {/* Service Title */}
            <h3 className={`text-xl font-bold mb-3 text-center transition-colors duration-300 ${
              isSelected ? 'text-gradient-animate' : 'text-amber-100'
            }`}>
              {service.title}
            </h3>

            {/* Service Description */}
            <p className="text-amber-50/70 text-center mb-6 leading-relaxed flex-1 text-sm">
              {service.description}
            </p>

            {/* Quick Features */}
            <div className="space-y-2 mb-6">
              {service.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-center text-xs text-amber-200/60">
                  <CheckCircle className="w-3 h-3 mr-2 text-amber-500" />
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <PremiumButton
                variant={isSelected ? "gold" : "secondary"}
                size="small"
                className="w-full"
              >
                {isSelected ? "View Details" : "Select Service"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </PremiumButton>
            </div>
          </div>
        </div>
      </CometCard>
    </motion.div>
  );
};

// Service detail view component
const ServiceDetailView: React.FC<{
  service: typeof servicesData[0];
  onBack: () => void;
}> = ({ service, onBack }) => {
  const IconComponent = service.icon;

  return (
    <motion.div
      className="bg-gradient-to-br from-black via-amber-950/20 to-black rounded-3xl border border-amber-600/30 overflow-hidden"
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Header */}
      <div className="relative bg-gradient-to-r from-amber-900/30 to-amber-800/20 p-8 border-b border-amber-700/30">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 text-amber-200 hover:text-amber-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-700 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-600/30">
            <IconComponent className="w-12 h-12 text-black" />
          </div>
          <h2 className="text-3xl font-bold text-amber-100 mb-2">{service.title}</h2>
          <p className="text-amber-200/70 text-lg max-w-2xl mx-auto">{service.description}</p>
        </div>
      </div>

      <div className="p-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold text-amber-200 mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Key Features
            </h3>
            <ul className="space-y-3">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-amber-100/80">
                  <CheckCircle className="w-4 h-4 mr-3 text-amber-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="text-xl font-semibold text-amber-200 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Benefits
            </h3>
            <ul className="space-y-3">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center text-amber-100/80">
                  <Star className="w-4 h-4 mr-3 text-amber-500" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div>
            <h3 className="text-xl font-semibold text-amber-200 mb-4 flex items-center">
              <Cog className="w-5 h-5 mr-2" />
              Our Process
            </h3>
            <ol className="space-y-3">
              {service.process.map((step, idx) => (
                <li key={idx} className="flex items-start text-amber-100/80">
                  <span className="bg-amber-600 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                    {idx + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Case Study */}
        {service.caseStudies[0] && (
          <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-2xl p-6 mb-8 border border-amber-700/20">
            <h3 className="text-xl font-semibold text-amber-200 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Success Story
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-amber-100">{service.caseStudies[0].title}</h4>
                <p className="text-amber-200/60 text-sm">{service.caseStudies[0].industry}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-2xl font-bold text-amber-300">{service.caseStudies[0].result}</p>
              </div>
            </div>
          </div>
        )}

        {/* Pricing & Timeline */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-2xl p-6 border border-amber-700/20">
            <h4 className="font-semibold text-amber-200 mb-2 flex items-center">
              <span className="text-lg">💰</span>
              <span className="ml-2">Investment</span>
            </h4>
            <p className="text-2xl font-bold text-amber-100">{service.pricing}</p>
          </div>
          <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-2xl p-6 border border-amber-700/20">
            <h4 className="font-semibold text-amber-200 mb-2 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Timeline
            </h4>
            <p className="text-2xl font-bold text-amber-100">{service.timeline}</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PremiumButton variant="gold" size="large" className="flex items-center justify-center premium-button-gold focus-ring">
            <Calendar className="w-5 h-5 mr-2" />
            Book a Consultation
          </PremiumButton>
          <PremiumButton variant="secondary" size="large" className="flex items-center justify-center focus-ring">
            <Phone className="w-5 h-5 mr-2" />
            Learn More
          </PremiumButton>
        </div>
      </div>
    </motion.div>
  );
};

// Trust indicators component
const TrustSection: React.FC = () => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/10 rounded-2xl p-6 border border-amber-700/20 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <Award className="w-6 h-6 text-amber-500 mr-2" />
          <span className="text-amber-200 font-semibold">25+ Years Experience</span>
        </div>
        <p className="text-amber-100/70 mb-6">Trusted by industry leaders worldwide</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {trustIndicators.map((client, idx) => (
            <motion.div
              key={idx}
              className="text-amber-300 font-bold text-lg"
              whileHover={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {client.name}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Services page component
const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [dynamicHeader, setDynamicHeader] = useState({
    title: 'Our Services',
    subtitle: 'Comprehensive solutions for your business needs'
  });
  const { theme } = useTheme();

  const selectedServiceData = selectedService 
    ? servicesData.find(s => s.id === selectedService) 
    : null;

  useEffect(() => {
    if (selectedServiceData) {
      setDynamicHeader({
        title: selectedServiceData.title,
        subtitle: `${selectedServiceData.category} • ${selectedServiceData.timeline}`
      });
    } else {
      setDynamicHeader({
        title: 'Enterprise-Grade Solutions for the AI Era',
        subtitle: 'At Veriton, we don\'t just adapt to change—we architect it. Our comprehensive suite of services combines decades of enterprise experience with cutting-edge AI innovation.'
      });
    }
  }, [selectedServiceData]);

  const handleServiceSelect = useCallback((serviceId: string) => {
    setSelectedService(serviceId === selectedService ? null : serviceId);
  }, [selectedService]);

  const handleBackToGrid = useCallback(() => {
    setSelectedService(null);
  }, []);

  // Memoize expensive calculations
  const memoizedServices = useMemo(() => servicesData, []);
  const memoizedTrustIndicators = useMemo(() => trustIndicators, []);

  return (
    <>
      <Helmet>
        <title>Services - Veritron AI Agency | AI & Technology Solutions</title>
        <meta name="description" content="Comprehensive AI and technology services including automation, development, training, and advisory services. Transform your business with cutting-edge solutions." />
        <meta name="keywords" content="AI services, software development, automation, consulting, training, technology solutions" />
      </Helmet>

      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black' : 'bg-black'
      }`}>
        {/* Navigation */}
        <ModernHeader />
        
        {/* Service Navigation */}
        <ServiceHeader />

        <div className="text-white">
        {/* Dynamic Header */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-black via-amber-950/10 to-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                key={dynamicHeader.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
                  {dynamicHeader.title}
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-amber-200/70 max-w-3xl mx-auto"
                key={dynamicHeader.subtitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {dynamicHeader.subtitle}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <TrustSection />
          </div>
        </section>

        {/* Services Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              {selectedService ? (
                <ServiceDetailView
                  key="detail"
                  service={selectedServiceData!}
                  onBack={handleBackToGrid}
                />
              ) : (
                <motion.div
                  key="grid"
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {memoizedServices.map((service, index) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isSelected={selectedService === service.id}
                      onClick={() => handleServiceSelect(service.id)}
                      index={index}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Bottom CTA Section */}
        {!selectedService && (
          <section className="py-16 bg-gradient-to-r from-amber-900/20 to-amber-800/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-amber-100 mb-4">
                  Ready to Elevate Your Enterprise?
                </h2>
                <p className="text-amber-200/70 mb-8 max-w-2xl mx-auto">
                  Join HP, Dell, Philips, and other industry leaders who trust Veriton to architect their digital future. 
                  Let's discuss how our enterprise-grade solutions can transform your organization.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <PremiumButton variant="gold" size="large">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Your Strategy Session
                  </PremiumButton>
                  <PremiumButton variant="secondary" size="large">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Us
                  </PremiumButton>
                </div>
              </motion.div>
            </div>
          </section>
        )}
        </div>
      </div>
    </>
  );
};

export default Services;