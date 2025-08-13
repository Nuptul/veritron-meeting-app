export interface ServiceFeature {
  name: string;
  description: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export interface CaseStudy {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string[];
  image?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  icon: string;
  heroImage?: string;
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  process: ProcessStep[];
  caseStudies: CaseStudy[];
  pricing: PricingTier[];
  relatedServices: string[];
  tags: string[];
  estimatedTimeline: string;
  minBudget: string;
}

export const services: Service[] = [
  {
    id: '1',
    slug: 'ai-machine-learning',
    title: 'AI & Machine Learning Solutions',
    shortDescription: 'Advanced AI solutions, neural networks, and machine learning models that transform your business processes.',
    fullDescription: 'Our AI & Machine Learning solutions leverage cutting-edge artificial intelligence technologies to automate processes, extract insights from data, and create intelligent systems that adapt and improve over time. From natural language processing to computer vision, we build custom AI solutions tailored to your specific business needs.',
    category: 'ai-ml',
    icon: 'ai-ml',
    heroImage: '/images/services/ai-ml-hero.jpg',
    features: [
      {
        name: 'Deep Learning Networks',
        description: 'Custom neural networks for complex pattern recognition and prediction tasks'
      },
      {
        name: 'Natural Language Processing',
        description: 'Advanced text analysis, sentiment analysis, and conversational AI systems'
      },
      {
        name: 'Computer Vision',
        description: 'Image recognition, object detection, and visual intelligence solutions'
      },
      {
        name: 'Predictive Analytics',
        description: 'Forecasting models to predict trends and optimize business decisions'
      },
      {
        name: 'Model Training & Deployment',
        description: 'End-to-end ML pipeline from data preparation to production deployment'
      }
    ],
    benefits: [
      {
        title: 'Automated Decision Making',
        description: 'Reduce manual processes with intelligent automation that learns and improves',
        icon: 'automation'
      },
      {
        title: 'Data-Driven Insights',
        description: 'Extract valuable insights from your data to inform strategic decisions',
        icon: 'insights'
      },
      {
        title: 'Competitive Advantage',
        description: 'Stay ahead with AI-powered solutions that differentiate your business',
        icon: 'advantage'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Data Assessment',
        description: 'Analyze your data quality, volume, and structure to determine AI feasibility',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Model Design',
        description: 'Design and architect the optimal AI solution for your specific use case',
        duration: '2-3 weeks'
      },
      {
        step: 3,
        title: 'Training & Testing',
        description: 'Train models with your data and rigorously test for accuracy and performance',
        duration: '4-6 weeks'
      },
      {
        step: 4,
        title: 'Deployment & Integration',
        description: 'Deploy the solution and integrate with your existing systems',
        duration: '2-3 weeks'
      }
    ],
    caseStudies: [
      {
        title: 'Predictive Maintenance System',
        client: 'Manufacturing Company',
        challenge: 'Frequent unexpected equipment failures causing costly downtime',
        solution: 'AI-powered predictive maintenance using sensor data and machine learning',
        results: [
          '75% reduction in unplanned downtime',
          '$2.3M annual savings in maintenance costs',
          '95% accuracy in failure prediction'
        ]
      }
    ],
    pricing: [
      {
        name: 'AI Consultation',
        price: '$5,000',
        description: 'Strategic AI assessment and roadmap',
        features: [
          'Data readiness assessment',
          'AI opportunity analysis',
          'Implementation roadmap',
          '2-week consultation period'
        ]
      },
      {
        name: 'Custom AI Solution',
        price: '$25,000+',
        description: 'End-to-end AI model development',
        features: [
          'Custom model development',
          'Training and optimization',
          'Production deployment',
          '6 months support'
        ],
        recommended: true
      },
      {
        name: 'Enterprise AI Platform',
        price: '$100,000+',
        description: 'Comprehensive AI infrastructure',
        features: [
          'Multiple AI models',
          'Scalable infrastructure',
          'Advanced analytics dashboard',
          'Ongoing optimization'
        ]
      }
    ],
    relatedServices: ['2', '4', '6'],
    tags: ['AI', 'Machine Learning', 'Deep Learning', 'Data Science', 'Automation'],
    estimatedTimeline: '3-6 months',
    minBudget: '$25,000'
  },
  {
    id: '2',
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    shortDescription: 'Tailored software solutions built with cutting-edge technologies to meet your specific business needs.',
    fullDescription: 'We develop custom software applications from the ground up, using modern technologies and best practices to create scalable, maintainable, and user-friendly solutions. Our full-stack development approach ensures seamless integration across all layers of your application.',
    category: 'development',
    icon: 'development',
    heroImage: '/images/services/development-hero.jpg',
    features: [
      {
        name: 'Full-Stack Development',
        description: 'Complete web applications from database to user interface'
      },
      {
        name: 'Mobile Applications',
        description: 'Native and cross-platform mobile apps for iOS and Android'
      },
      {
        name: 'Web Platforms',
        description: 'Modern web applications with responsive design and optimal performance'
      },
      {
        name: 'System Integration',
        description: 'Seamless integration with existing systems and third-party services'
      },
      {
        name: 'Performance Optimization',
        description: 'High-performance applications optimized for speed and scalability'
      }
    ],
    benefits: [
      {
        title: 'Custom Fit Solution',
        description: 'Software tailored exactly to your business processes and requirements',
        icon: 'custom'
      },
      {
        title: 'Scalable Architecture',
        description: 'Built to grow with your business using modern, scalable technologies',
        icon: 'scalability'
      },
      {
        title: 'Full Ownership',
        description: 'Complete control over your software with full source code ownership',
        icon: 'ownership'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Requirements Analysis',
        description: 'Deep dive into your business needs and technical requirements',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Architecture Design',
        description: 'Design the technical architecture and user experience flows',
        duration: '2-3 weeks'
      },
      {
        step: 3,
        title: 'Development',
        description: 'Agile development with regular check-ins and demonstrations',
        duration: '8-16 weeks'
      },
      {
        step: 4,
        title: 'Testing & Launch',
        description: 'Comprehensive testing, deployment, and go-live support',
        duration: '2-4 weeks'
      }
    ],
    caseStudies: [
      {
        title: 'Customer Management Platform',
        client: 'Service-Based Business',
        challenge: 'Manual customer tracking and inefficient workflow management',
        solution: 'Custom CRM with automated workflows and reporting dashboard',
        results: [
          '60% improvement in customer response time',
          '40% increase in team productivity',
          '90% reduction in manual data entry'
        ]
      }
    ],
    pricing: [
      {
        name: 'MVP Development',
        price: '$15,000',
        description: 'Minimum viable product for testing',
        features: [
          'Core functionality',
          'Basic user interface',
          'Database setup',
          'Basic testing'
        ]
      },
      {
        name: 'Full Application',
        price: '$50,000+',
        description: 'Complete custom application',
        features: [
          'Full feature set',
          'Advanced UI/UX',
          'Comprehensive testing',
          'Production deployment'
        ],
        recommended: true
      },
      {
        name: 'Enterprise Solution',
        price: '$150,000+',
        description: 'Large-scale enterprise application',
        features: [
          'Complex business logic',
          'Advanced integrations',
          'High availability setup',
          'Extended support'
        ]
      }
    ],
    relatedServices: ['3', '5', '7'],
    tags: ['Software Development', 'Full-Stack', 'Web Apps', 'Mobile Apps', 'Custom Solutions'],
    estimatedTimeline: '3-8 months',
    minBudget: '$15,000'
  },
  {
    id: '3',
    slug: 'ui-ux-design',
    title: 'UI/UX Design & Digital Media',
    shortDescription: 'Stunning visual designs and user experiences that captivate your audience and drive engagement.',
    fullDescription: 'Our design team creates beautiful, intuitive user interfaces and experiences that not only look amazing but also drive user engagement and business results. We combine aesthetic excellence with data-driven design principles to create digital experiences that users love.',
    category: 'design',
    icon: 'design',
    heroImage: '/images/services/design-hero.jpg',
    features: [
      {
        name: 'User Interface Design',
        description: 'Beautiful, modern interfaces that engage and delight users'
      },
      {
        name: 'User Experience Research',
        description: 'Data-driven UX research to optimize user journeys and conversions'
      },
      {
        name: 'Brand Identity',
        description: 'Comprehensive brand design including logos, guidelines, and assets'
      },
      {
        name: 'Responsive Design',
        description: 'Designs that work perfectly across all devices and screen sizes'
      },
      {
        name: 'Design Systems',
        description: 'Scalable design systems for consistent brand experience'
      }
    ],
    benefits: [
      {
        title: 'Increased Conversions',
        description: 'Better design leads to higher user engagement and conversion rates',
        icon: 'conversions'
      },
      {
        title: 'Brand Recognition',
        description: 'Strong visual identity that makes your brand memorable and trustworthy',
        icon: 'branding'
      },
      {
        title: 'User Satisfaction',
        description: 'Intuitive designs that provide excellent user experiences',
        icon: 'satisfaction'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & Research',
        description: 'Understand your users, competitors, and design requirements',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Wireframing',
        description: 'Create structural blueprints and user flow diagrams',
        duration: '1-2 weeks'
      },
      {
        step: 3,
        title: 'Visual Design',
        description: 'Develop high-fidelity designs with brand-aligned aesthetics',
        duration: '3-4 weeks'
      },
      {
        step: 4,
        title: 'Prototyping & Testing',
        description: 'Create interactive prototypes and conduct user testing',
        duration: '1-2 weeks'
      }
    ],
    caseStudies: [
      {
        title: 'E-commerce Platform Redesign',
        client: 'Online Retailer',
        challenge: 'Low conversion rates and poor mobile experience',
        solution: 'Complete UX overhaul with mobile-first responsive design',
        results: [
          '45% increase in conversion rate',
          '70% improvement in mobile usability scores',
          '25% reduction in cart abandonment'
        ]
      }
    ],
    pricing: [
      {
        name: 'UI Design Package',
        price: '$8,000',
        description: 'Interface design for existing application',
        features: [
          'UI mockups for key screens',
          'Design system components',
          'Responsive layouts',
          'Developer handoff'
        ]
      },
      {
        name: 'Complete UX/UI Project',
        price: '$20,000+',
        description: 'Full design process from research to delivery',
        features: [
          'User research and testing',
          'Complete UI/UX design',
          'Interactive prototypes',
          'Brand guidelines'
        ],
        recommended: true
      },
      {
        name: 'Brand & Digital Identity',
        price: '$35,000+',
        description: 'Comprehensive brand and digital design',
        features: [
          'Complete brand identity',
          'Website and app design',
          'Marketing materials',
          'Brand guidelines'
        ]
      }
    ],
    relatedServices: ['2', '8', '9'],
    tags: ['UI Design', 'UX Design', 'Branding', 'Responsive Design', 'User Research'],
    estimatedTimeline: '2-4 months',
    minBudget: '$8,000'
  },
  {
    id: '4',
    slug: 'cloud-infrastructure',
    title: 'Cloud Infrastructure & Services',
    shortDescription: 'Scalable cloud solutions and infrastructure management for modern applications.',
    fullDescription: 'Our cloud infrastructure services help you leverage the power of cloud computing to scale your applications, reduce costs, and improve reliability. We design and manage cloud architectures that grow with your business while maintaining security and performance.',
    category: 'cloud',
    icon: 'cloud',
    heroImage: '/images/services/cloud-hero.jpg',
    features: [
      {
        name: 'AWS/Azure/GCP',
        description: 'Multi-cloud expertise across all major cloud platforms'
      },
      {
        name: 'Kubernetes',
        description: 'Container orchestration for scalable application deployment'
      },
      {
        name: 'DevOps',
        description: 'Automated deployment pipelines and infrastructure as code'
      },
      {
        name: 'Auto-scaling',
        description: 'Automatic scaling based on demand to optimize costs and performance'
      },
      {
        name: 'Cloud Migration',
        description: 'Smooth migration from on-premises to cloud infrastructure'
      }
    ],
    benefits: [
      {
        title: 'Cost Optimization',
        description: 'Reduce infrastructure costs with efficient cloud resource management',
        icon: 'cost'
      },
      {
        title: 'Scalability',
        description: 'Scale resources up or down based on demand automatically',
        icon: 'scale'
      },
      {
        title: 'Reliability',
        description: 'High availability and disaster recovery with cloud-native architectures',
        icon: 'reliability'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Infrastructure Assessment',
        description: 'Evaluate current infrastructure and cloud readiness',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Architecture Design',
        description: 'Design optimal cloud architecture for your requirements',
        duration: '2-3 weeks'
      },
      {
        step: 3,
        title: 'Migration & Setup',
        description: 'Migrate applications and set up cloud infrastructure',
        duration: '4-8 weeks'
      },
      {
        step: 4,
        title: 'Optimization & Monitoring',
        description: 'Optimize performance and set up monitoring systems',
        duration: '2-3 weeks'
      }
    ],
    caseStudies: [
      {
        title: 'Multi-Region Cloud Migration',
        client: 'SaaS Company',
        challenge: 'Scaling limitations with on-premises infrastructure',
        solution: 'Migration to AWS with auto-scaling and multi-region deployment',
        results: [
          '50% reduction in infrastructure costs',
          '99.9% uptime improvement',
          '300% capacity increase capability'
        ]
      }
    ],
    pricing: [
      {
        name: 'Cloud Assessment',
        price: '$5,000',
        description: 'Infrastructure analysis and migration planning',
        features: [
          'Current infrastructure audit',
          'Cloud readiness assessment',
          'Migration roadmap',
          'Cost optimization analysis'
        ]
      },
      {
        name: 'Cloud Migration',
        price: '$25,000+',
        description: 'Complete cloud infrastructure setup',
        features: [
          'Full cloud architecture',
          'Application migration',
          'Security configuration',
          'Monitoring setup'
        ],
        recommended: true
      },
      {
        name: 'Managed Cloud Services',
        price: '$10,000/month',
        description: 'Ongoing cloud management and optimization',
        features: [
          '24/7 monitoring',
          'Performance optimization',
          'Security management',
          'Cost optimization'
        ]
      }
    ],
    relatedServices: ['2', '5', '7'],
    tags: ['Cloud Computing', 'AWS', 'Azure', 'DevOps', 'Kubernetes', 'Infrastructure'],
    estimatedTimeline: '2-4 months',
    minBudget: '$25,000'
  },
  {
    id: '5',
    slug: 'api-development',
    title: 'API Development & Integration',
    shortDescription: 'Robust API solutions and seamless integrations to connect your systems and services.',
    fullDescription: 'We create powerful APIs and integration solutions that connect your systems, enable data flow, and facilitate seamless communication between different applications and services. Our APIs are designed for performance, security, and scalability.',
    category: 'api',
    icon: 'api',
    heroImage: '/images/services/api-hero.jpg',
    features: [
      {
        name: 'RESTful APIs',
        description: 'Modern REST APIs following industry best practices and standards'
      },
      {
        name: 'GraphQL',
        description: 'Flexible GraphQL APIs for efficient data querying and manipulation'
      },
      {
        name: 'Microservices',
        description: 'Scalable microservice architectures for complex applications'
      },
      {
        name: 'Third-party Integrations',
        description: 'Seamless integration with external services and platforms'
      },
      {
        name: 'API Security',
        description: 'Comprehensive security measures including authentication and rate limiting'
      }
    ],
    benefits: [
      {
        title: 'System Connectivity',
        description: 'Connect disparate systems and enable seamless data flow',
        icon: 'connectivity'
      },
      {
        title: 'Improved Efficiency',
        description: 'Automate processes and reduce manual data transfer',
        icon: 'efficiency'
      },
      {
        title: 'Future-Ready',
        description: 'Extensible APIs that adapt to future business needs',
        icon: 'future'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Integration Analysis',
        description: 'Analyze existing systems and integration requirements',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'API Design',
        description: 'Design API structure, endpoints, and data models',
        duration: '1-2 weeks'
      },
      {
        step: 3,
        title: 'Development',
        description: 'Build and test APIs with comprehensive documentation',
        duration: '4-6 weeks'
      },
      {
        step: 4,
        title: 'Integration & Testing',
        description: 'Integrate with systems and conduct thorough testing',
        duration: '2-3 weeks'
      }
    ],
    caseStudies: [
      {
        title: 'Multi-Platform Integration',
        client: 'Retail Chain',
        challenge: 'Disconnected systems causing data inconsistencies',
        solution: 'Comprehensive API integration connecting POS, inventory, and CRM systems',
        results: [
          '95% reduction in data sync errors',
          '60% faster inventory updates',
          'Real-time reporting across all platforms'
        ]
      }
    ],
    pricing: [
      {
        name: 'Simple API',
        price: '$8,000',
        description: 'Basic API for simple integrations',
        features: [
          'REST API development',
          'Basic authentication',
          'Documentation',
          'Testing suite'
        ]
      },
      {
        name: 'Enterprise API',
        price: '$20,000+',
        description: 'Comprehensive API solution',
        features: [
          'Advanced API features',
          'Multiple integrations',
          'Advanced security',
          'Monitoring & analytics'
        ],
        recommended: true
      },
      {
        name: 'API Platform',
        price: '$50,000+',
        description: 'Complete API management platform',
        features: [
          'API gateway',
          'Developer portal',
          'Advanced analytics',
          'Enterprise security'
        ]
      }
    ],
    relatedServices: ['2', '4', '6'],
    tags: ['API Development', 'REST', 'GraphQL', 'Integrations', 'Microservices'],
    estimatedTimeline: '2-4 months',
    minBudget: '$8,000'
  },
  {
    id: '6',
    slug: 'data-management',
    title: 'Data Management & Analytics',
    shortDescription: 'Comprehensive data solutions from storage and processing to advanced analytics and insights.',
    fullDescription: 'Transform your raw data into actionable insights with our comprehensive data management and analytics solutions. We help you collect, process, store, and analyze data to make informed business decisions and drive growth.',
    category: 'database',
    icon: 'database',
    heroImage: '/images/services/data-hero.jpg',
    features: [
      {
        name: 'Database Design',
        description: 'Optimized database schemas for performance and scalability'
      },
      {
        name: 'Data Warehousing',
        description: 'Centralized data storage solutions for enterprise-scale analytics'
      },
      {
        name: 'ETL Processes',
        description: 'Automated data extraction, transformation, and loading pipelines'
      },
      {
        name: 'Business Intelligence',
        description: 'Advanced analytics and reporting for strategic decision making'
      },
      {
        name: 'Data Visualization',
        description: 'Interactive dashboards and reports for data-driven insights'
      }
    ],
    benefits: [
      {
        title: 'Data-Driven Decisions',
        description: 'Make informed decisions based on comprehensive data analysis',
        icon: 'decisions'
      },
      {
        title: 'Operational Efficiency',
        description: 'Streamline operations with automated data processing',
        icon: 'operations'
      },
      {
        title: 'Competitive Insights',
        description: 'Gain market insights to stay ahead of competition',
        icon: 'insights'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Data Audit',
        description: 'Assess current data sources, quality, and infrastructure',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Architecture Design',
        description: 'Design data architecture and analytics framework',
        duration: '2-3 weeks'
      },
      {
        step: 3,
        title: 'Implementation',
        description: 'Build data pipelines, warehouses, and analytics tools',
        duration: '6-10 weeks'
      },
      {
        step: 4,
        title: 'Analytics & Reporting',
        description: 'Create dashboards and train team on analytics tools',
        duration: '2-4 weeks'
      }
    ],
    caseStudies: [
      {
        title: 'Customer Analytics Platform',
        client: 'E-commerce Company',
        challenge: 'Fragmented customer data across multiple systems',
        solution: 'Unified data warehouse with real-time analytics dashboard',
        results: [
          '360-degree customer view',
          '35% increase in marketing campaign effectiveness',
          '50% faster reporting and decision making'
        ]
      }
    ],
    pricing: [
      {
        name: 'Data Audit',
        price: '$5,000',
        description: 'Comprehensive data assessment',
        features: [
          'Data quality analysis',
          'Infrastructure review',
          'Improvement recommendations',
          'Implementation roadmap'
        ]
      },
      {
        name: 'Analytics Platform',
        price: '$30,000+',
        description: 'Complete data analytics solution',
        features: [
          'Data warehouse setup',
          'ETL pipeline development',
          'Analytics dashboard',
          'Training and documentation'
        ],
        recommended: true
      },
      {
        name: 'Enterprise Data Platform',
        price: '$100,000+',
        description: 'Large-scale enterprise data solution',
        features: [
          'Multi-source data integration',
          'Advanced analytics capabilities',
          'Real-time processing',
          'Enterprise security'
        ]
      }
    ],
    relatedServices: ['1', '4', '5'],
    tags: ['Data Analytics', 'Business Intelligence', 'Data Warehouse', 'ETL', 'Reporting'],
    estimatedTimeline: '3-6 months',
    minBudget: '$30,000'
  },
  {
    id: '7',
    slug: 'cybersecurity-consulting',
    title: 'Cybersecurity & Risk Assessment',
    shortDescription: 'Comprehensive security audits and risk management to protect your digital assets.',
    fullDescription: 'Protect your business from cyber threats with our comprehensive cybersecurity solutions. We provide security assessments, implement protective measures, and help you maintain a strong security posture against evolving threats.',
    category: 'security',
    icon: 'security',
    heroImage: '/images/services/security-hero.jpg',
    features: [
      {
        name: 'Security Audits',
        description: 'Comprehensive security assessments to identify vulnerabilities'
      },
      {
        name: 'Risk Management',
        description: 'Strategic risk assessment and mitigation planning'
      },
      {
        name: 'Penetration Testing',
        description: 'Ethical hacking to test your security defenses'
      },
      {
        name: 'Compliance Management',
        description: 'Ensure compliance with industry standards and regulations'
      },
      {
        name: 'Security Training',
        description: 'Staff training on security best practices and threat awareness'
      }
    ],
    benefits: [
      {
        title: 'Risk Mitigation',
        description: 'Identify and address security vulnerabilities before they become threats',
        icon: 'mitigation'
      },
      {
        title: 'Compliance Assurance',
        description: 'Meet regulatory requirements and industry standards',
        icon: 'compliance'
      },
      {
        title: 'Business Continuity',
        description: 'Maintain operations and protect against business disruption',
        icon: 'continuity'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Security Assessment',
        description: 'Comprehensive evaluation of current security posture',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Risk Analysis',
        description: 'Identify and prioritize security risks and vulnerabilities',
        duration: '1-2 weeks'
      },
      {
        step: 3,
        title: 'Implementation',
        description: 'Deploy security measures and protective technologies',
        duration: '4-6 weeks'
      },
      {
        step: 4,
        title: 'Monitoring & Maintenance',
        description: 'Ongoing monitoring and security posture maintenance',
        duration: 'Ongoing'
      }
    ],
    caseStudies: [
      {
        title: 'Financial Services Security Overhaul',
        client: 'Regional Bank',
        challenge: 'Outdated security infrastructure with compliance gaps',
        solution: 'Complete security framework redesign with advanced threat detection',
        results: [
          '99.9% threat detection improvement',
          'Full regulatory compliance achieved',
          'Zero security incidents post-implementation'
        ]
      }
    ],
    pricing: [
      {
        name: 'Security Audit',
        price: '$8,000',
        description: 'Comprehensive security assessment',
        features: [
          'Vulnerability scanning',
          'Risk assessment report',
          'Compliance review',
          'Remediation recommendations'
        ]
      },
      {
        name: 'Security Implementation',
        price: '$25,000+',
        description: 'Complete security solution deployment',
        features: [
          'Security infrastructure setup',
          'Policy development',
          'Staff training',
          'Ongoing support'
        ],
        recommended: true
      },
      {
        name: 'Managed Security Services',
        price: '$15,000/month',
        description: '24/7 security monitoring and management',
        features: [
          'Continuous monitoring',
          'Threat response',
          'Regular assessments',
          'Compliance management'
        ]
      }
    ],
    relatedServices: ['4', '8', '9'],
    tags: ['Cybersecurity', 'Risk Assessment', 'Compliance', 'Penetration Testing', 'Security Audit'],
    estimatedTimeline: '2-4 months',
    minBudget: '$25,000'
  },
  {
    id: '8',
    slug: 'digital-marketing',
    title: 'Digital Marketing & SEO',
    shortDescription: 'Strategic digital marketing campaigns and SEO optimization to grow your online presence.',
    fullDescription: 'Boost your online visibility and drive qualified traffic with our comprehensive digital marketing services. From SEO optimization to social media marketing, we create data-driven campaigns that deliver measurable results.',
    category: 'marketing',
    icon: 'marketing',
    heroImage: '/images/services/marketing-hero.jpg',
    features: [
      {
        name: 'Search Engine Optimization',
        description: 'Improve search rankings and organic traffic with technical and content SEO'
      },
      {
        name: 'Pay-Per-Click Advertising',
        description: 'Strategic PPC campaigns across Google Ads, Facebook, and other platforms'
      },
      {
        name: 'Content Marketing',
        description: 'Engaging content creation and distribution strategies'
      },
      {
        name: 'Social Media Marketing',
        description: 'Build brand presence and engagement across social media platforms'
      },
      {
        name: 'Analytics & Reporting',
        description: 'Comprehensive tracking and reporting of marketing performance'
      }
    ],
    benefits: [
      {
        title: 'Increased Visibility',
        description: 'Improve search rankings and online presence',
        icon: 'visibility'
      },
      {
        title: 'Lead Generation',
        description: 'Drive qualified leads and potential customers',
        icon: 'leads'
      },
      {
        title: 'ROI Optimization',
        description: 'Maximize return on marketing investment',
        icon: 'roi'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Marketing Audit',
        description: 'Analyze current marketing performance and opportunities',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Strategy Development',
        description: 'Create comprehensive marketing strategy and campaign plans',
        duration: '1-2 weeks'
      },
      {
        step: 3,
        title: 'Campaign Implementation',
        description: 'Launch and optimize marketing campaigns across channels',
        duration: '4-8 weeks'
      },
      {
        step: 4,
        title: 'Optimization & Reporting',
        description: 'Continuous optimization based on performance data',
        duration: 'Ongoing'
      }
    ],
    caseStudies: [
      {
        title: 'B2B Lead Generation Campaign',
        client: 'Technology Startup',
        challenge: 'Low online visibility and insufficient qualified leads',
        solution: 'Integrated SEO and PPC campaign with content marketing',
        results: [
          '300% increase in organic traffic',
          '150% improvement in lead quality',
          '45% reduction in cost per lead'
        ]
      }
    ],
    pricing: [
      {
        name: 'SEO Audit',
        price: '$3,000',
        description: 'Comprehensive SEO analysis',
        features: [
          'Technical SEO audit',
          'Keyword research',
          'Competitor analysis',
          'Optimization roadmap'
        ]
      },
      {
        name: 'Digital Marketing Package',
        price: '$5,000/month',
        description: 'Complete digital marketing solution',
        features: [
          'SEO optimization',
          'PPC campaign management',
          'Content creation',
          'Monthly reporting'
        ],
        recommended: true
      },
      {
        name: 'Enterprise Marketing',
        price: '$15,000/month',
        description: 'Large-scale marketing campaigns',
        features: [
          'Multi-channel campaigns',
          'Advanced analytics',
          'Dedicated account manager',
          'Custom reporting'
        ]
      }
    ],
    relatedServices: ['3', '9'],
    tags: ['Digital Marketing', 'SEO', 'PPC', 'Content Marketing', 'Social Media'],
    estimatedTimeline: '3-6 months to see results',
    minBudget: '$5,000/month'
  },
  {
    id: '9',
    slug: 'business-consulting',
    title: 'Technology Consulting & Strategy',
    shortDescription: 'Strategic technology consulting to align your tech stack with business objectives.',
    fullDescription: 'Navigate the complex technology landscape with our strategic consulting services. We help you make informed decisions about technology investments, digital transformation, and IT strategy to drive business growth.',
    category: 'consulting',
    icon: 'consulting',
    heroImage: '/images/services/consulting-hero.jpg',
    features: [
      {
        name: 'Technology Strategy',
        description: 'Develop comprehensive technology roadmaps aligned with business goals'
      },
      {
        name: 'Digital Transformation',
        description: 'Guide your organization through digital transformation initiatives'
      },
      {
        name: 'Vendor Selection',
        description: 'Evaluate and select the right technology vendors and solutions'
      },
      {
        name: 'Process Optimization',
        description: 'Streamline business processes through technology solutions'
      },
      {
        name: 'Change Management',
        description: 'Manage organizational change during technology implementations'
      }
    ],
    benefits: [
      {
        title: 'Strategic Alignment',
        description: 'Align technology investments with business objectives',
        icon: 'alignment'
      },
      {
        title: 'Cost Efficiency',
        description: 'Optimize technology spending and reduce unnecessary costs',
        icon: 'efficiency'
      },
      {
        title: 'Competitive Advantage',
        description: 'Leverage technology for competitive differentiation',
        icon: 'advantage'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Business Analysis',
        description: 'Understand business objectives and current technology landscape',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Strategy Development',
        description: 'Create comprehensive technology strategy and roadmap',
        duration: '2-3 weeks'
      },
      {
        step: 3,
        title: 'Implementation Planning',
        description: 'Develop detailed implementation plans and timelines',
        duration: '1-2 weeks'
      },
      {
        step: 4,
        title: 'Execution Support',
        description: 'Provide ongoing support during implementation',
        duration: 'As needed'
      }
    ],
    caseStudies: [
      {
        title: 'Digital Transformation Initiative',
        client: 'Manufacturing Company',
        challenge: 'Legacy systems hindering growth and efficiency',
        solution: 'Comprehensive digital transformation strategy and implementation',
        results: [
          '40% improvement in operational efficiency',
          '25% reduction in IT costs',
          'Successful migration to cloud-based systems'
        ]
      }
    ],
    pricing: [
      {
        name: 'Technology Assessment',
        price: '$5,000',
        description: 'Comprehensive technology evaluation',
        features: [
          'Current state analysis',
          'Technology gap assessment',
          'Improvement recommendations',
          'Strategic roadmap'
        ]
      },
      {
        name: 'Strategic Consulting',
        price: '$15,000+',
        description: 'Complete strategy development',
        features: [
          'Business-technology alignment',
          'Detailed implementation plan',
          'Vendor recommendations',
          'Change management strategy'
        ],
        recommended: true
      },
      {
        name: 'Ongoing Advisory',
        price: '$10,000/month',
        description: 'Continuous strategic guidance',
        features: [
          'Regular strategy reviews',
          'Technology trend analysis',
          'Decision support',
          'Implementation oversight'
        ]
      }
    ],
    relatedServices: ['1', '4', '7'],
    tags: ['Technology Consulting', 'Digital Transformation', 'Strategy', 'Business Analysis'],
    estimatedTimeline: '1-3 months',
    minBudget: '$15,000'
  }
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(service => service.slug === slug);
};

export const getRelatedServices = (serviceId: string): Service[] => {
  const service = services.find(s => s.id === serviceId);
  if (!service) return [];
  
  return service.relatedServices
    .map(relatedId => services.find(s => s.id === relatedId))
    .filter((service): service is Service => service !== undefined)
    .slice(0, 3);
};

export const getServicesByCategory = (category: string): Service[] => {
  return services.filter(service => service.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = services.map(service => service.category);
  return Array.from(new Set(categories));
};