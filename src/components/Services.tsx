import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ModernCard
} from './atoms/ModernCard';
import {
  AIIcon,
  CodeIcon,
  DesignIcon,
  CloudIcon,
  APIIcon,
  DatabaseIcon,
  SecurityIcon,
  AnalyticsIcon
} from './atoms/ModernIcons';
import PremiumButton from './atoms/PremiumButton';
import { SectionHeading } from './atoms/PremiumHeading';
import { Check, ArrowRight, Sparkles, Mail, Phone, User, Building, MessageSquare, DollarSign, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// Service data with modern structure
const services = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    subtitle: 'Next-gen intelligence',
    description: 'Transform your business with cutting-edge AI solutions, neural networks, and predictive analytics.',
    icon: AIIcon,
    features: [
      'Deep Learning Models',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
    ],
    badge: 'Popular',
    color: 'amber',
  },
  {
    id: 'development',
    title: 'Custom Development',
    subtitle: 'Tailored solutions',
    description: 'Full-stack development with modern technologies, scalable architecture, and clean code.',
    icon: CodeIcon,
    features: [
      'React & Next.js',
      'Node.js & Python',
      'Mobile Apps',
      'System Integration',
    ],
    color: 'blue',
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    subtitle: 'User-centered design',
    description: 'Beautiful, intuitive interfaces that delight users and drive engagement.',
    icon: DesignIcon,
    features: [
      'User Research',
      'Interface Design',
      'Design Systems',
      'Prototyping',
    ],
    badge: 'New',
    color: 'purple',
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    subtitle: 'Scalable solutions',
    description: 'Modern cloud architecture with auto-scaling, high availability, and cost optimization.',
    icon: CloudIcon,
    features: [
      'AWS & Azure',
      'Kubernetes',
      'DevOps Pipeline',
      'Cloud Migration',
    ],
    color: 'cyan',
  },
  {
    id: 'api',
    title: 'API Development',
    subtitle: 'Seamless integration',
    description: 'Robust APIs and microservices that connect your systems and scale with demand.',
    icon: APIIcon,
    features: [
      'RESTful APIs',
      'GraphQL',
      'Microservices',
      'API Security',
    ],
    color: 'green',
  },
  {
    id: 'database',
    title: 'Data Management',
    subtitle: 'Data excellence',
    description: 'Comprehensive data solutions from storage to advanced analytics and insights.',
    icon: DatabaseIcon,
    features: [
      'Database Design',
      'Data Warehousing',
      'Real-time Processing',
      'Business Intelligence',
    ],
    color: 'orange',
  },
];

// Individual Service Card Component
const ServiceCard: React.FC<{ service: typeof services[0]; index: number }> = ({ 
  service, 
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  const handleCardClick = () => {
    // Future navigation - will be implemented when pages are created
    console.log(`Navigate to ${service.id} page`);
    // Example: navigate(`/services/${service.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <ModernCard
        variant="gradient"
        hover="lift"
        interactive
        className="h-full flex flex-col min-h-[420px] cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group"
        padding="none"
        onClick={handleCardClick}
      >
        {/* Card Header Section - Fixed Height */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            {/* Icon */}
            <motion.div
              className="relative"
              animate={{ 
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Icon 
                size={48} 
                isHovered={isHovered} 
                variant={isHovered ? 'fill' : 'line'}
                className="text-amber-400"
              />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-xl"
                animate={{
                  opacity: isHovered ? 0.5 : 0,
                }}
              >
                <Icon 
                  size={48} 
                  variant="fill"
                  className="text-amber-400"
                />
              </motion.div>
            </motion.div>
            
            {/* Badge */}
            {service.badge && (
              <span className="px-2 py-1 text-xs font-semibold bg-amber-400/10 text-amber-400 rounded-full">
                {service.badge}
              </span>
            )}
          </div>
          
          {/* Title - Fixed Height */}
          <div className="h-[60px]">
            <h3 className="text-xl font-bold text-white mb-1">
              {service.title}
            </h3>
            <p className="text-sm text-amber-400/80">
              {service.subtitle}
            </p>
          </div>
        </div>

        {/* Card Body - Fixed Height */}
        <div className="flex-1 px-6 pb-6">
          {/* Description Section - Fixed Height */}
          <div className="h-[72px] mb-4">
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {service.description}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent mb-4" />

          {/* Features List Section - Fixed Height */}
          <div className="h-[120px] space-y-2">
            {service.features.slice(0, 4).map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + idx * 0.05 }}
              >
                <div className="flex-shrink-0">
                  <Check className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-gray-300 text-sm line-clamp-1">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Click indicator - shows on hover */}
        <motion.div
          className="absolute bottom-4 right-4 text-amber-400 opacity-0 transition-opacity duration-300"
          animate={{ opacity: isHovered ? 0.7 : 0 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>

        {/* Floating sparkles on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                  }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    y: [0, -30],
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                >
                  <Sparkles className="w-3 h-3 text-amber-400/60" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </ModernCard>
    </motion.div>
  );
};

// Additional Cards Section
const AdditionalServices: React.FC = () => {
  const additionalServices = [
    {
      icon: SecurityIcon,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security with full compliance.',
    },
    {
      icon: AnalyticsIcon,
      title: 'Analytics & Insights',
      description: 'Data-driven decisions with real-time analytics.',
    },
  ];

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {additionalServices.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ModernCard
              variant="bordered"
              hover="glow"
              interactive
              padding="md"
              className="text-center"
            >
              <Icon size={40} className="text-amber-400 mx-auto mb-4" variant="duotone" />
              <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
              <p className="text-sm text-gray-400">{service.description}</p>
            </ModernCard>
          </motion.div>
        );
      })}
    </div>
  );
};

// Form validation types and interfaces
interface FormData {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  serviceInterest: string;
  budgetRange: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormState {
  data: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string | null;
}

// Premium Contact Form Component
const PremiumContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    data: {
      fullName: '',
      email: '',
      company: '',
      phone: '',
      serviceInterest: '',
      budgetRange: '',
      message: ''
    },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    submitError: null
  });

  // Service options from the services data
  const serviceOptions = [
    { value: '', label: 'Select a service...' },
    { value: 'ai-ml', label: 'AI & Machine Learning' },
    { value: 'development', label: 'Custom Development' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'cloud', label: 'Cloud Infrastructure' },
    { value: 'api', label: 'API Development' },
    { value: 'database', label: 'Data Management' },
    { value: 'security', label: 'Security & Compliance' },
    { value: 'analytics', label: 'Analytics & Insights' },
    { value: 'consultation', label: 'General Consultation' }
  ];

  // Budget range options
  const budgetOptions = [
    { value: '', label: 'Select budget range...' },
    { value: 'under-10k', label: 'Under $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-250k', label: '$100,000 - $250,000' },
    { value: 'over-250k', label: 'Over $250,000' },
    { value: 'discuss', label: 'Let\'s discuss' }
  ];

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Optional field
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};

    if (!data.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (data.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }

    if (!data.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (data.phone && !validatePhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!data.message.trim()) {
      errors.message = 'Project details are required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Please provide more details (at least 10 characters)';
    }

    return errors;
  };

  // Handle input changes with real-time validation
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      errors: { ...prev.errors, [field]: '' }, // Clear error on change
      submitError: null
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm(formState.data);

    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({ ...prev, errors }));
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true, submitError: null }));

    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate random success/failure for demo
      if (Math.random() > 0.1) {
        setFormState(prev => ({
          ...prev,
          isSubmitting: false,
          isSubmitted: true,
          data: {
            fullName: '',
            email: '',
            company: '',
            phone: '',
            serviceInterest: '',
            budgetRange: '',
            message: ''
          }
        }));
      } else {
        throw new Error('Network error occurred');
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: 'Failed to send message. Please try again.'
      }));
    }
  };

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <motion.div
      id="contact"
      className="mt-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          badge="Get In Touch"
          title="Ready to Transform Your Business?"
          subtitle="Tell us about your project and let's create something extraordinary together."
          accentWord="Transform"
          className="mb-12 text-center"
        />

        <AnimatePresence mode="wait">
          {formState.isSubmitted ? (
            // Success State
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-veritron-gold-400 to-veritron-gold-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-veritron-gunmetal-900" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
              <p className="text-veritron-aluminum-400 mb-8 max-w-md mx-auto">
                Thank you for reaching out. We'll review your project details and get back to you within 24 hours.
              </p>
              <PremiumButton
                variant="aluminum"
                size="medium"
                onClick={() => setFormState(prev => ({ ...prev, isSubmitted: false }))}
              >
                Send Another Message
              </PremiumButton>
            </motion.div>
          ) : (
            // Form State
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gradient-to-br from-veritron-gunmetal-900/50 to-veritron-gunmetal-800/30 backdrop-blur-sm border border-veritron-aluminum-200/10 rounded-2xl p-8 lg:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-veritron-aluminum-300">
                      Full Name <span className="text-veritron-gold-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-veritron-aluminum-500" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        value={formState.data.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`
                          block w-full pl-10 pr-3 py-3 border rounded-lg bg-veritron-gunmetal-800/50 backdrop-blur-sm
                          text-white placeholder-veritron-aluminum-500 transition-all duration-300
                          focus:outline-none focus:ring-2 focus:ring-veritron-gold-400 focus:border-transparent
                          ${formState.errors.fullName
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-veritron-aluminum-200/20 hover:border-veritron-aluminum-200/40'
                          }
                        `}
                        placeholder="Enter your full name"
                        aria-describedby={formState.errors.fullName ? 'fullName-error' : undefined}
                      />
                    </div>
                    {formState.errors.fullName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        id="fullName-error"
                        className="text-sm text-red-400 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {formState.errors.fullName}
                      </motion.p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-veritron-aluminum-300">
                      Email Address <span className="text-veritron-gold-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-veritron-aluminum-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={formState.data.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`
                          block w-full pl-10 pr-3 py-3 border rounded-lg bg-veritron-gunmetal-800/50 backdrop-blur-sm
                          text-white placeholder-veritron-aluminum-500 transition-all duration-300
                          focus:outline-none focus:ring-2 focus:ring-veritron-gold-400 focus:border-transparent
                          ${formState.errors.email
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-veritron-aluminum-200/20 hover:border-veritron-aluminum-200/40'
                          }
                        `}
                        placeholder="your.email@company.com"
                        aria-describedby={formState.errors.email ? 'email-error' : undefined}
                      />
                    </div>
                    {formState.errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        id="email-error"
                        className="text-sm text-red-400 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {formState.errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Row 2: Company and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company */}
                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-veritron-aluminum-300">
                      Company/Organization
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-veritron-aluminum-500" />
                      </div>
                      <input
                        type="text"
                        id="company"
                        value={formState.data.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="
                          block w-full pl-10 pr-3 py-3 border border-veritron-aluminum-200/20 rounded-lg
                          bg-veritron-gunmetal-800/50 backdrop-blur-sm text-white placeholder-veritron-aluminum-500
                          transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-veritron-gold-400
                          focus:border-transparent hover:border-veritron-aluminum-200/40
                        "
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-veritron-aluminum-300">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-veritron-aluminum-500" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={formState.data.phone}
                        onChange={(e) => {
                          const formatted = formatPhoneNumber(e.target.value);
                          handleInputChange('phone', formatted);
                        }}
                        className={`
                          block w-full pl-10 pr-3 py-3 border rounded-lg bg-veritron-gunmetal-800/50 backdrop-blur-sm
                          text-white placeholder-veritron-aluminum-500 transition-all duration-300
                          focus:outline-none focus:ring-2 focus:ring-veritron-gold-400 focus:border-transparent
                          ${formState.errors.phone
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-veritron-aluminum-200/20 hover:border-veritron-aluminum-200/40'
                          }
                        `}
                        placeholder="(555) 123-4567"
                        aria-describedby={formState.errors.phone ? 'phone-error' : undefined}
                      />
                    </div>
                    {formState.errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        id="phone-error"
                        className="text-sm text-red-400 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {formState.errors.phone}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Row 3: Service Interest and Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Service Interest */}
                  <div className="space-y-2">
                    <label htmlFor="serviceInterest" className="block text-sm font-medium text-veritron-aluminum-300">
                      Service Interest
                    </label>
                    <select
                      id="serviceInterest"
                      value={formState.data.serviceInterest}
                      onChange={(e) => handleInputChange('serviceInterest', e.target.value)}
                      className="
                        block w-full px-3 py-3 border border-veritron-aluminum-200/20 rounded-lg
                        bg-veritron-gunmetal-800/50 backdrop-blur-sm text-white
                        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-veritron-gold-400
                        focus:border-transparent hover:border-veritron-aluminum-200/40
                      "
                    >
                      {serviceOptions.map(option => (
                        <option key={option.value} value={option.value} className="bg-veritron-gunmetal-800">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div className="space-y-2">
                    <label htmlFor="budgetRange" className="block text-sm font-medium text-veritron-aluminum-300">
                      Project Budget Range
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-veritron-aluminum-500" />
                      </div>
                      <select
                        id="budgetRange"
                        value={formState.data.budgetRange}
                        onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                        className="
                          block w-full pl-10 pr-3 py-3 border border-veritron-aluminum-200/20 rounded-lg
                          bg-veritron-gunmetal-800/50 backdrop-blur-sm text-white
                          transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-veritron-gold-400
                          focus:border-transparent hover:border-veritron-aluminum-200/40
                        "
                      >
                        {budgetOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-veritron-gunmetal-800">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message/Project Details */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-veritron-aluminum-300">
                    Project Details <span className="text-veritron-gold-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-veritron-aluminum-500" />
                    </div>
                    <textarea
                      id="message"
                      rows={5}
                      value={formState.data.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`
                        block w-full pl-10 pr-3 py-3 border rounded-lg bg-veritron-gunmetal-800/50 backdrop-blur-sm
                        text-white placeholder-veritron-aluminum-500 transition-all duration-300 resize-none
                        focus:outline-none focus:ring-2 focus:ring-veritron-gold-400 focus:border-transparent
                        ${formState.errors.message
                          ? 'border-red-400 focus:ring-red-400'
                          : 'border-veritron-aluminum-200/20 hover:border-veritron-aluminum-200/40'
                        }
                      `}
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                      aria-describedby={formState.errors.message ? 'message-error' : undefined}
                    />
                  </div>
                  {formState.errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      id="message-error"
                      className="text-sm text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {formState.errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Error */}
                {formState.submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-900/20 border border-red-400/20 rounded-lg"
                  >
                    <p className="text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {formState.submitError}
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <PremiumButton
                    type="submit"
                    variant="gold"
                    size="large"
                    disabled={formState.isSubmitting}
                    className="min-w-[200px]"
                  >
                    {formState.isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </PremiumButton>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Main Services Component
const Services: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-800/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          badge="Our Services"
          title="Modern Solutions for Digital Excellence"
          subtitle="Cutting-edge technology meets exceptional design to create solutions that drive real business results."
          accentWord="Excellence"
          className="mb-16 text-center"
        />

        {/* Main Services Grid with consistent card heights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Additional Services */}
        <AdditionalServices />

        {/* Premium Contact Form */}
        <PremiumContactForm />
      </div>
    </section>
  );
};

export default Services;