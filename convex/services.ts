import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all active services for the landing page
export const getActiveServices = query({
  args: {
    category: v.optional(v.union(
      v.literal("development"), 
      v.literal("design"), 
      v.literal("consulting"),
      v.literal("ai-ml"),
      v.literal("cloud"),
      v.literal("security")
    )),
  },
  handler: async (ctx, args) => {
    let servicesQuery = ctx.db
      .query("services")
      .withIndex("by_active", (q) => q.eq("isActive", true));

    if (args.category) {
      servicesQuery = ctx.db
        .query("services")
        .withIndex("by_category", (q) => q.eq("category", args.category))
        .filter((q) => q.eq(q.field("isActive"), true));
    }

    const services = await servicesQuery.collect();
    
    // Sort by sortOrder
    return services.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

// Get all services (for admin)
export const getAllServices = query({
  handler: async (ctx) => {
    const services = await ctx.db.query("services").collect();
    return services.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

// Get service by ID
export const getServiceById = query({
  args: { id: v.id("services") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new service
export const createService = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    category: v.union(
      v.literal("development"), 
      v.literal("design"), 
      v.literal("consulting"),
      v.literal("ai-ml"),
      v.literal("cloud"),
      v.literal("security")
    ),
    features: v.array(v.string()),
    isActive: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Get the highest sort order if not provided
    let sortOrder = args.sortOrder;
    if (sortOrder === undefined) {
      const services = await ctx.db.query("services").collect();
      sortOrder = Math.max(...services.map(s => s.sortOrder), 0) + 1;
    }

    const serviceId = await ctx.db.insert("services", {
      title: args.title,
      description: args.description,
      icon: args.icon,
      category: args.category,
      features: args.features,
      isActive: args.isActive ?? true,
      sortOrder,
      createdAt: now,
      updatedAt: now,
    });

    return serviceId;
  },
});

// Update an existing service
export const updateService = mutation({
  args: {
    id: v.id("services"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    icon: v.optional(v.string()),
    category: v.optional(v.union(
      v.literal("development"), 
      v.literal("design"), 
      v.literal("consulting"),
      v.literal("ai-ml"),
      v.literal("cloud"),
      v.literal("security")
    )),
    features: v.optional(v.array(v.string())),
    isActive: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    const existingService = await ctx.db.get(id);
    if (!existingService) {
      throw new Error("Service not found");
    }

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return id;
  },
});

// Delete a service
export const deleteService = mutation({
  args: { id: v.id("services") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Toggle service active status
export const toggleServiceStatus = mutation({
  args: { id: v.id("services") },
  handler: async (ctx, args) => {
    const service = await ctx.db.get(args.id);
    if (!service) {
      throw new Error("Service not found");
    }

    await ctx.db.patch(args.id, {
      isActive: !service.isActive,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Reorder services
export const reorderServices = mutation({
  args: {
    serviceIds: v.array(v.id("services")),
  },
  handler: async (ctx, args) => {
    const updates = args.serviceIds.map((id, index) => ({
      id,
      sortOrder: index,
    }));

    for (const update of updates) {
      await ctx.db.patch(update.id, {
        sortOrder: update.sortOrder,
        updatedAt: Date.now(),
      });
    }

    return true;
  },
});