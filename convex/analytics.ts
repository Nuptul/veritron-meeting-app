import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Track a new analytics event
export const trackEvent = mutation({
  args: {
    event: v.string(),
    path: v.optional(v.string()),
    referrer: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    sessionId: v.optional(v.string()),
    metadata: v.optional(v.object({})),
  },
  handler: async (ctx, args) => {
    const eventId = await ctx.db.insert("analytics", {
      event: args.event,
      path: args.path,
      referrer: args.referrer,
      userAgent: args.userAgent,
      ipAddress: args.ipAddress,
      sessionId: args.sessionId,
      metadata: args.metadata,
      timestamp: Date.now(),
    });

    return eventId;
  },
});

// Get analytics events by type
export const getEventsByType = query({
  args: {
    event: v.string(),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let eventsQuery = ctx.db
      .query("analytics")
      .withIndex("by_event", (q) => q.eq("event", args.event));

    const events = await eventsQuery.collect();

    // Filter by date range if provided
    let filtered = events;
    if (args.startDate || args.endDate) {
      filtered = events.filter(event => {
        if (args.startDate && event.timestamp < args.startDate) return false;
        if (args.endDate && event.timestamp > args.endDate) return false;
        return true;
      });
    }

    // Sort by timestamp (newest first)
    const sorted = filtered.sort((a, b) => b.timestamp - a.timestamp);

    return args.limit ? sorted.slice(0, args.limit) : sorted;
  },
});

// Get page views analytics
export const getPageViews = query({
  args: {
    path: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let eventsQuery = ctx.db
      .query("analytics")
      .withIndex("by_event", (q) => q.eq("event", "page_view"));

    const events = await eventsQuery.collect();

    // Filter by path if provided
    let filtered = events;
    if (args.path) {
      filtered = events.filter(event => event.path === args.path);
    }

    // Filter by date range if provided
    if (args.startDate || args.endDate) {
      filtered = filtered.filter(event => {
        if (args.startDate && event.timestamp < args.startDate) return false;
        if (args.endDate && event.timestamp > args.endDate) return false;
        return true;
      });
    }

    return filtered;
  },
});

// Get analytics dashboard data
export const getDashboardData = query({
  args: {
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const events = await ctx.db.query("analytics").collect();

    // Filter by date range if provided
    let filtered = events;
    if (args.startDate || args.endDate) {
      filtered = events.filter(event => {
        if (args.startDate && event.timestamp < args.startDate) return false;
        if (args.endDate && event.timestamp > args.endDate) return false;
        return true;
      });
    }

    // Calculate metrics
    const pageViews = filtered.filter(e => e.event === "page_view");
    const contactForms = filtered.filter(e => e.event === "contact_form");
    const serviceInquiries = filtered.filter(e => e.event === "service_inquiry");

    // Top pages
    const pageViewsByPath = pageViews.reduce((acc, event) => {
      const path = event.path || "unknown";
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topPages = Object.entries(pageViewsByPath)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    // Referrers
    const referrerStats = filtered.reduce((acc, event) => {
      const referrer = event.referrer || "direct";
      acc[referrer] = (acc[referrer] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topReferrers = Object.entries(referrerStats)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([referrer, count]) => ({ referrer, count }));

    // Daily analytics (last 30 days)
    const now = Date.now();
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
    const dailyData = [];

    for (let i = 29; i >= 0; i--) {
      const dayStart = now - (i * 24 * 60 * 60 * 1000);
      const dayEnd = dayStart + (24 * 60 * 60 * 1000);
      
      const dayEvents = filtered.filter(event => 
        event.timestamp >= dayStart && event.timestamp < dayEnd
      );

      dailyData.push({
        date: new Date(dayStart).toISOString().split('T')[0],
        pageViews: dayEvents.filter(e => e.event === "page_view").length,
        contacts: dayEvents.filter(e => e.event === "contact_form").length,
        inquiries: dayEvents.filter(e => e.event === "service_inquiry").length,
      });
    }

    return {
      totalEvents: filtered.length,
      totalPageViews: pageViews.length,
      totalContacts: contactForms.length,
      totalInquiries: serviceInquiries.length,
      topPages,
      topReferrers,
      dailyData,
      uniqueSessions: new Set(filtered.map(e => e.sessionId).filter(Boolean)).size,
    };
  },
});

// Get real-time analytics (last 24 hours)
export const getRealTimeData = query({
  handler: async (ctx) => {
    const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
    
    const events = await ctx.db
      .query("analytics")
      .withIndex("by_timestamp", (q) => q.gte("timestamp", twentyFourHoursAgo))
      .collect();

    // Group by hour
    const hourlyData = [];
    const now = Date.now();

    for (let i = 23; i >= 0; i--) {
      const hourStart = now - (i * 60 * 60 * 1000);
      const hourEnd = hourStart + (60 * 60 * 1000);
      
      const hourEvents = events.filter(event => 
        event.timestamp >= hourStart && event.timestamp < hourEnd
      );

      hourlyData.push({
        hour: new Date(hourStart).getHours(),
        pageViews: hourEvents.filter(e => e.event === "page_view").length,
        contacts: hourEvents.filter(e => e.event === "contact_form").length,
        inquiries: hourEvents.filter(e => e.event === "service_inquiry").length,
      });
    }

    return {
      last24Hours: events.length,
      hourlyData,
      recentEvents: events
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 20),
    };
  },
});

// Clean up old analytics data
export const cleanupOldAnalytics = mutation({
  args: {
    olderThanDays: v.number(),
  },
  handler: async (ctx, args) => {
    const cutoffTime = Date.now() - (args.olderThanDays * 24 * 60 * 60 * 1000);
    
    const oldEvents = await ctx.db
      .query("analytics")
      .filter((q) => q.lt(q.field("timestamp"), cutoffTime))
      .collect();

    let deletedCount = 0;
    for (const event of oldEvents) {
      await ctx.db.delete(event._id);
      deletedCount++;
    }

    return { deletedCount };
  },
});

// Get user journey analytics
export const getUserJourney = query({
  args: {
    sessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const events = await ctx.db
      .query("analytics")
      .filter((q) => q.eq(q.field("sessionId"), args.sessionId))
      .collect();

    return events.sort((a, b) => a.timestamp - b.timestamp);
  },
});

// Get conversion funnel data
export const getConversionFunnel = query({
  args: {
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const events = await ctx.db.query("analytics").collect();

    // Filter by date range if provided
    let filtered = events;
    if (args.startDate || args.endDate) {
      filtered = events.filter(event => {
        if (args.startDate && event.timestamp < args.startDate) return false;
        if (args.endDate && event.timestamp > args.endDate) return false;
        return true;
      });
    }

    const pageViews = filtered.filter(e => e.event === "page_view").length;
    const serviceViews = filtered.filter(e => e.event === "service_view").length;
    const portfolioViews = filtered.filter(e => e.event === "portfolio_view").length;
    const contactPageViews = filtered.filter(e => e.event === "page_view" && e.path === "/contact").length;
    const contactSubmissions = filtered.filter(e => e.event === "contact_form").length;

    return {
      steps: [
        { name: "Landing Page Views", count: pageViews },
        { name: "Services Viewed", count: serviceViews },
        { name: "Portfolio Viewed", count: portfolioViews },
        { name: "Contact Page Views", count: contactPageViews },
        { name: "Contact Form Submissions", count: contactSubmissions },
      ],
      conversionRates: {
        serviceViewRate: pageViews > 0 ? (serviceViews / pageViews * 100).toFixed(2) : "0",
        portfolioViewRate: pageViews > 0 ? (portfolioViews / pageViews * 100).toFixed(2) : "0",
        contactPageRate: pageViews > 0 ? (contactPageViews / pageViews * 100).toFixed(2) : "0",
        contactSubmissionRate: contactPageViews > 0 ? (contactSubmissions / contactPageViews * 100).toFixed(2) : "0",
        overallConversionRate: pageViews > 0 ? (contactSubmissions / pageViews * 100).toFixed(2) : "0",
      },
    };
  },
});