import { v } from "convex/values";
import { query } from "./_generated/server";

// Get site-wide statistics for dashboard
export const getSiteStats = query({
  handler: async (ctx) => {
    // Get counts from all tables
    const [services, projects, contacts, testimonials, analytics] = await Promise.all([
      ctx.db.query("services").collect(),
      ctx.db.query("projects").collect(),
      ctx.db.query("contacts").collect(),
      ctx.db.query("testimonials").collect(),
      ctx.db.query("analytics").collect(),
    ]);

    // Calculate recent activity (last 7 days)
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    const recentContacts = contacts.filter(c => c.createdAt > weekAgo).length;
    const recentPageViews = analytics.filter(a => 
      a.event === "page_view" && a.timestamp > weekAgo
    ).length;
    
    return {
      overview: {
        totalServices: services.length,
        activeServices: services.filter(s => s.isActive).length,
        totalProjects: projects.length,
        publicProjects: projects.filter(p => p.isPublic).length,
        featuredProjects: projects.filter(p => p.featured).length,
        totalContacts: contacts.length,
        newContacts: contacts.filter(c => c.status === "new").length,
        totalTestimonials: testimonials.length,
        approvedTestimonials: testimonials.filter(t => t.approved).length,
        totalPageViews: analytics.filter(a => a.event === "page_view").length,
      },
      recent: {
        contactsThisWeek: recentContacts,
        pageViewsThisWeek: recentPageViews,
      },
      conversion: {
        contactFormSubmissions: analytics.filter(a => a.event === "contact_form").length,
        serviceInquiries: analytics.filter(a => a.event === "service_inquiry").length,
        portfolioViews: analytics.filter(a => a.event === "portfolio_view").length,
      },
    };
  },
});

// Health check for all systems
export const getSystemHealth = query({
  handler: async (ctx) => {
    try {
      // Test database connectivity with simple queries
      const [servicesCount, projectsCount, contactsCount] = await Promise.all([
        ctx.db.query("services").collect().then(items => items.length),
        ctx.db.query("projects").collect().then(items => items.length),
        ctx.db.query("contacts").collect().then(items => items.length),
      ]);

      return {
        status: "healthy",
        timestamp: Date.now(),
        database: {
          connected: true,
          tables: {
            services: servicesCount,
            projects: projectsCount,
            contacts: contactsCount,
          },
        },
        performance: {
          responseTime: Date.now(), // Will be calculated by the client
        },
      };
    } catch (error) {
      return {
        status: "error",
        timestamp: Date.now(),
        error: error instanceof Error ? error.message : "Unknown error",
        database: {
          connected: false,
        },
      };
    }
  },
});

// Get popular content based on analytics
export const getPopularContent = query({
  args: {
    days: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const days = args.days ?? 30;
    const limit = args.limit ?? 10;
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);

    // Get recent analytics events
    const recentEvents = await ctx.db
      .query("analytics")
      .filter((q) => q.gte(q.field("timestamp"), cutoffTime))
      .collect();

    // Count page views by path
    const pageViews = recentEvents.filter(e => e.event === "page_view");
    const pathCounts = pageViews.reduce((acc, event) => {
      const path = event.path || "unknown";
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Count service inquiries
    const serviceInquiries = recentEvents.filter(e => e.event === "service_inquiry");
    const serviceCounts = serviceInquiries.reduce((acc, event) => {
      const service = event.metadata?.serviceName || "unknown";
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Count project views
    const projectViews = recentEvents.filter(e => e.event === "portfolio_view");
    const projectCounts = projectViews.reduce((acc, event) => {
      const project = event.metadata?.projectId || "unknown";
      acc[project] = (acc[project] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      popularPages: Object.entries(pathCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, limit)
        .map(([path, count]) => ({ path, views: count })),
      
      popularServices: Object.entries(serviceCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, limit)
        .map(([service, count]) => ({ service, inquiries: count })),
      
      popularProjects: Object.entries(projectCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, limit)
        .map(([project, count]) => ({ project, views: count })),
    };
  },
});

// Get trending topics based on contact inquiries and service interests
export const getTrendingTopics = query({
  args: {
    days: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const days = args.days ?? 30;
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);

    // Get recent contacts
    const recentContacts = await ctx.db
      .query("contacts")
      .filter((q) => q.gte(q.field("createdAt"), cutoffTime))
      .collect();

    // Analyze service interests
    const serviceInterests = recentContacts.flatMap(contact => 
      contact.serviceInterest || []
    );

    const interestCounts = serviceInterests.reduce((acc, interest) => {
      acc[interest] = (acc[interest] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Analyze budget ranges
    const budgetRanges = recentContacts.map(contact => contact.budgetRange)
      .filter(Boolean);

    const budgetCounts = budgetRanges.reduce((acc, budget) => {
      acc[budget!] = (acc[budget!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Analyze timeline preferences
    const timelines = recentContacts.map(contact => contact.timeline)
      .filter(Boolean);

    const timelineCounts = timelines.reduce((acc, timeline) => {
      acc[timeline!] = (acc[timeline!] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      trendingServices: Object.entries(interestCounts)
        .sort(([,a], [,b]) => b - a)
        .map(([service, count]) => ({ service, mentions: count })),
      
      budgetTrends: Object.entries(budgetCounts)
        .sort(([,a], [,b]) => b - a)
        .map(([budget, count]) => ({ budget, count })),
      
      timelineTrends: Object.entries(timelineCounts)
        .sort(([,a], [,b]) => b - a)
        .map(([timeline, count]) => ({ timeline, count })),
      
      totalInquiries: recentContacts.length,
    };
  },
});

// Search across all content
export const searchAll = query({
  args: {
    query: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    const searchTerm = args.query.toLowerCase();

    if (searchTerm.length < 2) {
      return {
        services: [],
        projects: [],
        testimonials: [],
        contacts: [],
      };
    }

    // Search services
    const services = await ctx.db.query("services").collect();
    const matchingServices = services.filter(service =>
      service.title.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.features.some(feature => 
        feature.toLowerCase().includes(searchTerm)
      )
    ).slice(0, limit);

    // Search projects
    const projects = await ctx.db.query("projects").collect();
    const matchingProjects = projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.shortDescription.toLowerCase().includes(searchTerm) ||
      project.technologies.some(tech =>
        tech.toLowerCase().includes(searchTerm)
      )
    ).slice(0, limit);

    // Search testimonials
    const testimonials = await ctx.db.query("testimonials").collect();
    const matchingTestimonials = testimonials.filter(testimonial =>
      testimonial.clientName.toLowerCase().includes(searchTerm) ||
      testimonial.clientCompany.toLowerCase().includes(searchTerm) ||
      testimonial.testimonial.toLowerCase().includes(searchTerm)
    ).slice(0, limit);

    // Search contacts (for admin use)
    const contacts = await ctx.db.query("contacts").collect();
    const matchingContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm) ||
      contact.company?.toLowerCase().includes(searchTerm) ||
      contact.subject.toLowerCase().includes(searchTerm)
    ).slice(0, limit);

    return {
      services: matchingServices,
      projects: matchingProjects,
      testimonials: matchingTestimonials,
      contacts: matchingContacts,
    };
  },
});

// Get configuration/settings (for future use)
export const getConfiguration = query({
  handler: async (ctx) => {
    // This would typically read from a settings table
    // For now, return default configuration
    return {
      site: {
        name: "Veritron",
        description: "Premium Development & Design Services",
        url: "https://veritron.com",
        logo: "/logo.svg",
      },
      contact: {
        email: "hello@veritron.com",
        phone: "+1 (555) 123-4567",
        address: "San Francisco, CA",
      },
      social: {
        twitter: "@veritron",
        linkedin: "company/veritron",
        github: "veritron",
      },
      features: {
        analyticsEnabled: true,
        contactFormEnabled: true,
        testimonialModeration: true,
        blogEnabled: false,
      },
    };
  },
});