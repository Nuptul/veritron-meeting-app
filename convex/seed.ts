import { mutation } from "./_generated/server";

// Seed sample services
export const seedServices = mutation({
  handler: async (ctx) => {
    const services = [
      {
        title: "AI & Machine Learning",
        description: "Revolutionary AI solutions that transform businesses through intelligent automation, predictive analytics, and cutting-edge machine learning models.",
        icon: "brain",
        category: "ai-ml" as const,
        features: [
          "Custom AI Model Development",
          "Natural Language Processing",
          "Computer Vision & Image Recognition",
          "Predictive Analytics & Forecasting",
          "Intelligent Process Automation",
          "AI-Powered Chatbots & Assistants",
          "Deep Learning with TensorFlow/PyTorch",
          "MLOps & Model Deployment"
        ],
        isActive: true,
        sortOrder: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Digital Media Design",
        description: "Stunning visual experiences that captivate audiences. From brand identity to interactive digital experiences that leave lasting impressions.",
        icon: "palette",
        category: "design" as const,
        features: [
          "Brand Identity & Logo Design",
          "Motion Graphics & Animation",
          "Interactive Web Experiences",
          "Video Production & Editing",
          "3D Modeling & Visualization",
          "Social Media Creative Assets",
          "UI/UX Design Excellence",
          "Print & Digital Media Integration"
        ],
        isActive: true,
        sortOrder: 2,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        title: "Software Development",
        description: "End-to-end software solutions built with modern architectures. From web applications to mobile apps and enterprise systems.",
        icon: "code",
        category: "development" as const,
        features: [
          "Full-Stack Web Development",
          "Mobile App Development (iOS/Android)",
          "Cloud-Native Architecture",
          "Microservices & API Development",
          "DevOps & CI/CD Automation",
          "Database Design & Optimization",
          "Real-Time Systems & WebSockets",
          "Enterprise Software Solutions"
        ],
        isActive: true,
        sortOrder: 3,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    ];

    const serviceIds = [];
    for (const service of services) {
      const id = await ctx.db.insert("services", service);
      serviceIds.push(id);
    }

    return { created: serviceIds.length, serviceIds };
  },
});

// Seed sample projects
export const seedProjects = mutation({
  handler: async (ctx) => {
    const projects = [
      {
        title: "E-commerce Platform",
        description: "A complete e-commerce solution built with Next.js and Stripe integration. Features include product catalog, shopping cart, payment processing, and admin dashboard.",
        shortDescription: "Modern e-commerce platform with payment integration",
        imageUrl: "/images/projects/ecommerce-platform.jpg",
        thumbnailUrl: "/images/projects/thumbs/ecommerce-thumb.jpg",
        projectUrl: "https://demo-ecommerce.veritron.com",
        githubUrl: "https://github.com/veritron/ecommerce-platform",
        technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "PostgreSQL"],
        category: "web-app" as const,
        status: "completed" as const,
        featured: true,
        clientName: "TechCorp Inc",
        completedAt: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
        sortOrder: 1,
        isPublic: true,
        createdAt: Date.now() - (60 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, team collaboration, and project tracking. Built with React and Firebase.",
        shortDescription: "Collaborative task management with real-time sync",
        imageUrl: "/images/projects/task-manager.jpg",
        thumbnailUrl: "/images/projects/thumbs/task-thumb.jpg",
        projectUrl: "https://tasks.veritron.com",
        githubUrl: "https://github.com/veritron/task-manager",
        technologies: ["React", "Firebase", "Material-UI", "TypeScript"],
        category: "web-app" as const,
        status: "completed" as const,
        featured: true,
        clientName: "StartupXYZ",
        completedAt: Date.now() - (15 * 24 * 60 * 60 * 1000), // 15 days ago
        sortOrder: 2,
        isPublic: true,
        createdAt: Date.now() - (45 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        title: "Fitness Tracking Mobile App",
        description: "Cross-platform mobile application for fitness tracking with workout plans, progress tracking, and social features. Built with React Native.",
        shortDescription: "Cross-platform fitness tracking app",
        imageUrl: "/images/projects/fitness-app.jpg",
        thumbnailUrl: "/images/projects/thumbs/fitness-thumb.jpg",
        projectUrl: "https://apps.apple.com/app/fittrack",
        technologies: ["React Native", "Node.js", "MongoDB", "Express"],
        category: "mobile-app" as const,
        status: "completed" as const,
        featured: false,
        clientName: "FitLife LLC",
        completedAt: Date.now() - (60 * 24 * 60 * 60 * 1000), // 60 days ago
        sortOrder: 3,
        isPublic: true,
        createdAt: Date.now() - (90 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        title: "AI Content Generator",
        description: "An AI-powered content generation platform using GPT models. Features include blog post generation, social media content, and SEO optimization.",
        shortDescription: "AI-powered content generation platform",
        imageUrl: "/images/projects/ai-content.jpg",
        thumbnailUrl: "/images/projects/thumbs/ai-thumb.jpg",
        projectUrl: "https://ai-content.veritron.com",
        githubUrl: "https://github.com/veritron/ai-content-generator",
        technologies: ["Python", "OpenAI API", "FastAPI", "React", "PostgreSQL"],
        category: "ai-ml" as const,
        status: "completed" as const,
        featured: true,
        clientName: "ContentPro Agency",
        completedAt: Date.now() - (7 * 24 * 60 * 60 * 1000), // 7 days ago
        sortOrder: 4,
        isPublic: true,
        createdAt: Date.now() - (30 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        title: "Veritron Design System",
        description: "A comprehensive design system with reusable components, design tokens, and documentation. Built for scalable design across multiple products.",
        shortDescription: "Comprehensive design system with reusable components",
        imageUrl: "/images/projects/design-system.jpg",
        thumbnailUrl: "/images/projects/thumbs/design-thumb.jpg",
        projectUrl: "https://design.veritron.com",
        githubUrl: "https://github.com/veritron/design-system",
        technologies: ["React", "Storybook", "TypeScript", "Tailwind CSS", "Figma"],
        category: "design-system" as const,
        status: "in-progress" as const,
        featured: false,
        sortOrder: 5,
        isPublic: true,
        createdAt: Date.now() - (14 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        title: "Real Estate API",
        description: "RESTful API for real estate listings with search, filtering, and geolocation features. Includes comprehensive documentation and rate limiting.",
        shortDescription: "RESTful API for real estate listings",
        imageUrl: "/images/projects/realestate-api.jpg",
        thumbnailUrl: "/images/projects/thumbs/api-thumb.jpg",
        githubUrl: "https://github.com/veritron/realestate-api",
        technologies: ["Node.js", "Express", "MongoDB", "Redis", "Docker"],
        category: "api" as const,
        status: "completed" as const,
        featured: false,
        clientName: "PropertyTech Solutions",
        completedAt: Date.now() - (45 * 24 * 60 * 60 * 1000), // 45 days ago
        sortOrder: 6,
        isPublic: true,
        createdAt: Date.now() - (75 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        title: "DevOps Automation Suite",
        description: "Automated deployment and monitoring suite with Docker, Kubernetes, and CI/CD pipeline integration. Reduces deployment time by 80%.",
        shortDescription: "DevOps automation with CI/CD integration",
        imageUrl: "/images/projects/devops-suite.jpg",
        thumbnailUrl: "/images/projects/thumbs/devops-thumb.jpg",
        githubUrl: "https://github.com/veritron/devops-automation",
        technologies: ["Docker", "Kubernetes", "Jenkins", "Terraform", "AWS"],
        category: "automation" as const,
        status: "completed" as const,
        featured: false,
        clientName: "TechScale Corp",
        completedAt: Date.now() - (20 * 24 * 60 * 60 * 1000), // 20 days ago
        sortOrder: 7,
        isPublic: true,
        createdAt: Date.now() - (50 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        title: "Data Visualization Dashboard",
        description: "Interactive dashboard for business intelligence with real-time data visualization, custom charts, and export capabilities.",
        shortDescription: "Interactive business intelligence dashboard",
        imageUrl: "/images/projects/data-viz.jpg",
        thumbnailUrl: "/images/projects/thumbs/dataviz-thumb.jpg",
        projectUrl: "https://dashboard.veritron.com",
        technologies: ["D3.js", "React", "Python", "FastAPI", "PostgreSQL"],
        category: "web-app" as const,
        status: "completed" as const,
        featured: false,
        clientName: "DataInsights LLC",
        completedAt: Date.now() - (35 * 24 * 60 * 60 * 1000), // 35 days ago
        sortOrder: 8,
        isPublic: true,
        createdAt: Date.now() - (65 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      }
    ];

    const projectIds = [];
    for (const project of projects) {
      const id = await ctx.db.insert("projects", project);
      projectIds.push(id);
    }

    return { created: projectIds.length, projectIds };
  },
});

// Seed sample testimonials
export const seedTestimonials = mutation({
  handler: async (ctx) => {
    const testimonials = [
      {
        clientName: "Sarah Johnson",
        clientTitle: "CTO",
        clientCompany: "TechCorp Inc",
        clientAvatar: "/images/avatars/sarah-johnson.jpg",
        testimonial: "Veritron delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is outstanding. The project was completed on time and within budget.",
        rating: 5,
        featured: true,
        approved: true,
        sortOrder: 1,
        createdAt: Date.now() - (25 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        clientName: "Michael Chen",
        clientTitle: "Founder & CEO",
        clientCompany: "StartupXYZ",
        clientAvatar: "/images/avatars/michael-chen.jpg",
        testimonial: "Working with Veritron was a game-changer for our startup. They built a robust task management system that our team loves. The real-time collaboration features are incredible.",
        rating: 5,
        featured: true,
        approved: true,
        sortOrder: 2,
        createdAt: Date.now() - (20 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        clientName: "Emily Rodriguez",
        clientTitle: "Product Manager",
        clientCompany: "FitLife LLC",
        clientAvatar: "/images/avatars/emily-rodriguez.jpg",
        testimonial: "The mobile app Veritron created for us has been a huge success. User engagement is up 200% and the app store ratings are fantastic. Highly recommended!",
        rating: 5,
        featured: false,
        approved: true,
        sortOrder: 3,
        createdAt: Date.now() - (40 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        clientName: "David Thompson",
        clientTitle: "Marketing Director",
        clientCompany: "ContentPro Agency",
        clientAvatar: "/images/avatars/david-thompson.jpg",
        testimonial: "The AI content generation platform has revolutionized our workflow. We're producing high-quality content 5x faster. The Veritron team's expertise in AI is impressive.",
        rating: 5,
        featured: true,
        approved: true,
        sortOrder: 4,
        createdAt: Date.now() - (10 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        clientName: "Lisa Park",
        clientTitle: "VP of Engineering",
        clientCompany: "TechScale Corp",
        clientAvatar: "/images/avatars/lisa-park.jpg",
        testimonial: "Veritron's DevOps automation suite has transformed our deployment process. What used to take hours now takes minutes. Their technical expertise saved us months of development time.",
        rating: 4,
        featured: false,
        approved: true,
        sortOrder: 5,
        createdAt: Date.now() - (15 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      }
    ];

    const testimonialIds = [];
    for (const testimonial of testimonials) {
      const id = await ctx.db.insert("testimonials", testimonial);
      testimonialIds.push(id);
    }

    return { created: testimonialIds.length, testimonialIds };
  },
});

// Seed sample contacts
export const seedContacts = mutation({
  handler: async (ctx) => {
    const contacts = [
      {
        name: "John Smith",
        email: "john.smith@example.com",
        company: "Innovative Solutions Inc",
        phone: "+1 (555) 123-4567",
        subject: "Web Development Inquiry",
        message: "We're looking to rebuild our company website with modern technologies. Would love to discuss our requirements and get a quote.",
        serviceInterest: ["Web Development", "UI/UX Design"],
        budgetRange: "15k-50k" as const,
        preferredContact: "email" as const,
        timeline: "3-months" as const,
        status: "new" as const,
        priority: "medium" as const,
        isRead: false,
        createdAt: Date.now() - (2 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now(),
      },
      {
        name: "Amanda Wilson",
        email: "amanda@startup-venture.com",
        company: "Startup Venture",
        phone: "+1 (555) 987-6543",
        subject: "Mobile App Development",
        message: "We need a mobile app for our fitness startup. Looking for React Native development with backend integration.",
        serviceInterest: ["Mobile Development", "Cloud Infrastructure"],
        budgetRange: "50k-plus" as const,
        preferredContact: "both" as const,
        timeline: "asap" as const,
        status: "contacted" as const,
        priority: "urgent" as const,
        isRead: true,
        respondedAt: Date.now() - (12 * 60 * 60 * 1000), // 12 hours ago
        createdAt: Date.now() - (3 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now() - (12 * 60 * 60 * 1000),
      },
      {
        name: "Robert Garcia",
        email: "r.garcia@techconsulting.com",
        company: "Tech Consulting Group",
        subject: "AI Integration Consultation",
        message: "Our client needs AI integration in their existing platform. Looking for consultation on the best approach.",
        serviceInterest: ["AI & Machine Learning", "Technical Consulting"],
        budgetRange: "5k-15k" as const,
        preferredContact: "phone" as const,
        timeline: "1-month" as const,
        status: "qualified" as const,
        priority: "high" as const,
        isRead: true,
        respondedAt: Date.now() - (24 * 60 * 60 * 1000), // 24 hours ago
        notes: "[2025-01-01T12:00:00Z] Initial call scheduled for next week. Client interested in ML model integration.",
        createdAt: Date.now() - (5 * 24 * 60 * 60 * 1000),
        updatedAt: Date.now() - (24 * 60 * 60 * 1000),
      }
    ];

    const contactIds = [];
    for (const contact of contacts) {
      const id = await ctx.db.insert("contacts", contact);
      contactIds.push(id);
    }

    return { created: contactIds.length, contactIds };
  },
});

// Seed sample analytics events
export const seedAnalytics = mutation({
  handler: async (ctx) => {
    const now = Date.now();
    const events = [];

    // Generate page views for the last 30 days
    const pages = ["/", "/services", "/portfolio", "/contact", "/about"];
    const referrers = ["https://google.com", "https://linkedin.com", "direct", "https://github.com"];

    for (let day = 30; day >= 0; day--) {
      const dayStart = now - (day * 24 * 60 * 60 * 1000);
      const dailyPageViews = Math.floor(Math.random() * 100) + 50; // 50-150 page views per day

      for (let i = 0; i < dailyPageViews; i++) {
        const randomTime = dayStart + Math.random() * (24 * 60 * 60 * 1000);
        const randomPage = pages[Math.floor(Math.random() * pages.length)];
        const randomReferrer = referrers[Math.floor(Math.random() * referrers.length)];

        events.push({
          event: "page_view",
          path: randomPage,
          referrer: randomReferrer === "direct" ? undefined : randomReferrer,
          sessionId: `session_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: randomTime,
        });
      }

      // Add some contact form submissions
      const dailyContacts = Math.floor(Math.random() * 5); // 0-4 contacts per day
      for (let i = 0; i < dailyContacts; i++) {
        const randomTime = dayStart + Math.random() * (24 * 60 * 60 * 1000);
        events.push({
          event: "contact_form",
          path: "/contact",
          sessionId: `session_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: randomTime,
        });
      }

      // Add service inquiry events
      const dailyInquiries = Math.floor(Math.random() * 10) + 5; // 5-14 inquiries per day
      for (let i = 0; i < dailyInquiries; i++) {
        const randomTime = dayStart + Math.random() * (24 * 60 * 60 * 1000);
        const services = ["Web Development", "Mobile Development", "AI & Machine Learning", "UI/UX Design"];
        const randomService = services[Math.floor(Math.random() * services.length)];

        events.push({
          event: "service_inquiry",
          path: "/services",
          sessionId: `session_${Math.random().toString(36).substr(2, 9)}`,
          metadata: { serviceName: randomService },
          timestamp: randomTime,
        });
      }

      // Add portfolio view events
      const dailyPortfolioViews = Math.floor(Math.random() * 20) + 10; // 10-29 per day
      for (let i = 0; i < dailyPortfolioViews; i++) {
        const randomTime = dayStart + Math.random() * (24 * 60 * 60 * 1000);
        events.push({
          event: "portfolio_view",
          path: "/portfolio",
          sessionId: `session_${Math.random().toString(36).substr(2, 9)}`,
          metadata: { projectId: `project_${Math.floor(Math.random() * 8) + 1}` },
          timestamp: randomTime,
        });
      }
    }

    const eventIds = [];
    for (const event of events) {
      const id = await ctx.db.insert("analytics", event);
      eventIds.push(id);
    }

    return { created: eventIds.length, eventIds };
  },
});

// Seed all data at once
export const seedAll = mutation({
  handler: async (ctx) => {
    const results = await Promise.all([
      ctx.runMutation(ctx.db, "seed:seedServices", {}),
      ctx.runMutation(ctx.db, "seed:seedProjects", {}),
      ctx.runMutation(ctx.db, "seed:seedTestimonials", {}),
      ctx.runMutation(ctx.db, "seed:seedContacts", {}),
      ctx.runMutation(ctx.db, "seed:seedAnalytics", {}),
    ]);

    return {
      services: results[0].created,
      projects: results[1].created,
      testimonials: results[2].created,
      contacts: results[3].created,
      analytics: results[4].created,
      total: results.reduce((sum, result) => sum + result.created, 0),
    };
  },
});

// Clear all data (for development)
export const clearAll = mutation({
  handler: async (ctx) => {
    const tables = ["services", "projects", "contacts", "testimonials", "analytics", "blogPosts", "subscribers"];
    const deleteCounts: Record<string, number> = {};

    for (const table of tables) {
      const items = await ctx.db.query(table as any).collect();
      for (const item of items) {
        await ctx.db.delete(item._id);
      }
      deleteCounts[table] = items.length;
    }

    return deleteCounts;
  },
});