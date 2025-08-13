import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get approved testimonials for the landing page
export const getApprovedTestimonials = query({
  args: {
    featuredOnly: v.optional(v.boolean()),
    limit: v.optional(v.number()),
    minRating: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let testimonialsQuery = ctx.db
      .query("testimonials")
      .withIndex("by_approved", (q) => q.eq("approved", true));

    if (args.featuredOnly) {
      testimonialsQuery = ctx.db
        .query("testimonials")
        .withIndex("by_featured", (q) => q.eq("featured", true))
        .filter((q) => q.eq(q.field("approved"), true));
    }

    const testimonials = await testimonialsQuery.collect();

    // Filter by minimum rating if specified
    let filtered = testimonials;
    if (args.minRating) {
      filtered = testimonials.filter(t => t.rating >= args.minRating!);
    }

    // Sort by sortOrder, then by rating (highest first)
    const sorted = filtered.sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder;
      }
      return b.rating - a.rating;
    });

    return args.limit ? sorted.slice(0, args.limit) : sorted;
  },
});

// Get all testimonials (for admin)
export const getAllTestimonials = query({
  handler: async (ctx) => {
    const testimonials = await ctx.db.query("testimonials").collect();
    return testimonials.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get testimonial by ID
export const getTestimonialById = query({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new testimonial
export const createTestimonial = mutation({
  args: {
    clientName: v.string(),
    clientTitle: v.string(),
    clientCompany: v.string(),
    clientAvatar: v.optional(v.string()),
    testimonial: v.string(),
    rating: v.number(),
    projectId: v.optional(v.id("projects")),
    featured: v.optional(v.boolean()),
    approved: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Validate rating (1-5)
    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    // Get the highest sort order if not provided
    let sortOrder = args.sortOrder;
    if (sortOrder === undefined) {
      const testimonials = await ctx.db.query("testimonials").collect();
      sortOrder = Math.max(...testimonials.map(t => t.sortOrder), 0) + 1;
    }

    const testimonialId = await ctx.db.insert("testimonials", {
      clientName: args.clientName,
      clientTitle: args.clientTitle,
      clientCompany: args.clientCompany,
      clientAvatar: args.clientAvatar,
      testimonial: args.testimonial,
      rating: args.rating,
      projectId: args.projectId,
      featured: args.featured ?? false,
      approved: args.approved ?? false, // Require manual approval by default
      sortOrder,
      createdAt: now,
      updatedAt: now,
    });

    return testimonialId;
  },
});

// Update an existing testimonial
export const updateTestimonial = mutation({
  args: {
    id: v.id("testimonials"),
    clientName: v.optional(v.string()),
    clientTitle: v.optional(v.string()),
    clientCompany: v.optional(v.string()),
    clientAvatar: v.optional(v.string()),
    testimonial: v.optional(v.string()),
    rating: v.optional(v.number()),
    projectId: v.optional(v.id("projects")),
    featured: v.optional(v.boolean()),
    approved: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    const existingTestimonial = await ctx.db.get(id);
    if (!existingTestimonial) {
      throw new Error("Testimonial not found");
    }

    // Validate rating if provided
    if (updates.rating && (updates.rating < 1 || updates.rating > 5)) {
      throw new Error("Rating must be between 1 and 5");
    }

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return id;
  },
});

// Toggle testimonial approval status
export const toggleTestimonialApproval = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    const testimonial = await ctx.db.get(args.id);
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }

    await ctx.db.patch(args.id, {
      approved: !testimonial.approved,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Toggle testimonial featured status
export const toggleTestimonialFeatured = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    const testimonial = await ctx.db.get(args.id);
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }

    await ctx.db.patch(args.id, {
      featured: !testimonial.featured,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Delete a testimonial
export const deleteTestimonial = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Get testimonials by rating
export const getTestimonialsByRating = query({
  args: {
    rating: v.number(),
    approvedOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const testimonials = await ctx.db
      .query("testimonials")
      .withIndex("by_rating", (q) => q.eq("rating", args.rating))
      .collect();

    if (args.approvedOnly) {
      return testimonials.filter(t => t.approved);
    }

    return testimonials;
  },
});

// Get testimonial statistics
export const getTestimonialStats = query({
  handler: async (ctx) => {
    const testimonials = await ctx.db.query("testimonials").collect();
    
    const stats = {
      total: testimonials.length,
      approved: testimonials.filter(t => t.approved).length,
      featured: testimonials.filter(t => t.featured).length,
      pending: testimonials.filter(t => !t.approved).length,
      averageRating: testimonials.length > 0 
        ? Math.round((testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length) * 10) / 10
        : 0,
      ratingDistribution: {
        5: testimonials.filter(t => t.rating === 5).length,
        4: testimonials.filter(t => t.rating === 4).length,
        3: testimonials.filter(t => t.rating === 3).length,
        2: testimonials.filter(t => t.rating === 2).length,
        1: testimonials.filter(t => t.rating === 1).length,
      },
    };

    return stats;
  },
});