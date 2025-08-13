import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all public projects for the landing page portfolio
export const getPublicProjects = query({
  args: {
    category: v.optional(v.union(
      v.literal("web-app"), 
      v.literal("mobile-app"), 
      v.literal("ai-ml"),
      v.literal("design-system"),
      v.literal("api"),
      v.literal("automation")
    )),
    featuredOnly: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let projectsQuery = ctx.db
      .query("projects")
      .withIndex("by_public", (q) => q.eq("isPublic", true));

    if (args.category) {
      projectsQuery = ctx.db
        .query("projects")
        .withIndex("by_category", (q) => q.eq("category", args.category))
        .filter((q) => q.eq(q.field("isPublic"), true));
    }

    if (args.featuredOnly) {
      projectsQuery = ctx.db
        .query("projects")
        .withIndex("by_featured", (q) => q.eq("featured", true))
        .filter((q) => q.eq(q.field("isPublic"), true));
    }

    const projects = await projectsQuery.collect();
    
    // Sort by sortOrder, then by completedAt (newest first)
    const sortedProjects = projects.sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) {
        return a.sortOrder - b.sortOrder;
      }
      return (b.completedAt || b.createdAt) - (a.completedAt || a.createdAt);
    });

    // Apply limit if specified
    return args.limit ? sortedProjects.slice(0, args.limit) : sortedProjects;
  },
});

// Get featured projects for homepage hero section
export const getFeaturedProjects = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .filter((q) => q.eq(q.field("isPublic"), true))
      .collect();

    const sortedProjects = projects.sort((a, b) => a.sortOrder - b.sortOrder);
    return args.limit ? sortedProjects.slice(0, args.limit) : sortedProjects;
  },
});

// Get all projects (for admin)
export const getAllProjects = query({
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    return projects.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get project by ID
export const getProjectById = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new project
export const createProject = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    shortDescription: v.string(),
    imageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    projectUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    technologies: v.array(v.string()),
    category: v.union(
      v.literal("web-app"), 
      v.literal("mobile-app"), 
      v.literal("ai-ml"),
      v.literal("design-system"),
      v.literal("api"),
      v.literal("automation")
    ),
    status: v.optional(v.union(
      v.literal("completed"), 
      v.literal("in-progress"), 
      v.literal("archived")
    )),
    featured: v.optional(v.boolean()),
    clientName: v.optional(v.string()),
    completedAt: v.optional(v.number()),
    sortOrder: v.optional(v.number()),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Get the highest sort order if not provided
    let sortOrder = args.sortOrder;
    if (sortOrder === undefined) {
      const projects = await ctx.db.query("projects").collect();
      sortOrder = Math.max(...projects.map(p => p.sortOrder), 0) + 1;
    }

    const projectId = await ctx.db.insert("projects", {
      title: args.title,
      description: args.description,
      shortDescription: args.shortDescription,
      imageUrl: args.imageUrl,
      thumbnailUrl: args.thumbnailUrl,
      projectUrl: args.projectUrl,
      githubUrl: args.githubUrl,
      technologies: args.technologies,
      category: args.category,
      status: args.status ?? "completed",
      featured: args.featured ?? false,
      clientName: args.clientName,
      completedAt: args.completedAt,
      sortOrder,
      isPublic: args.isPublic ?? true,
      createdAt: now,
      updatedAt: now,
    });

    return projectId;
  },
});

// Update an existing project
export const updateProject = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    projectUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    technologies: v.optional(v.array(v.string())),
    category: v.optional(v.union(
      v.literal("web-app"), 
      v.literal("mobile-app"), 
      v.literal("ai-ml"),
      v.literal("design-system"),
      v.literal("api"),
      v.literal("automation")
    )),
    status: v.optional(v.union(
      v.literal("completed"), 
      v.literal("in-progress"), 
      v.literal("archived")
    )),
    featured: v.optional(v.boolean()),
    clientName: v.optional(v.string()),
    completedAt: v.optional(v.number()),
    sortOrder: v.optional(v.number()),
    isPublic: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    const existingProject = await ctx.db.get(id);
    if (!existingProject) {
      throw new Error("Project not found");
    }

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return id;
  },
});

// Delete a project
export const deleteProject = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Toggle project featured status
export const toggleProjectFeatured = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) {
      throw new Error("Project not found");
    }

    await ctx.db.patch(args.id, {
      featured: !project.featured,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Toggle project public status
export const toggleProjectPublic = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);
    if (!project) {
      throw new Error("Project not found");
    }

    await ctx.db.patch(args.id, {
      isPublic: !project.isPublic,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Get projects by technology
export const getProjectsByTechnology = query({
  args: {
    technology: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query("projects")
      .filter((q) => 
        q.and(
          q.eq(q.field("isPublic"), true),
          q.gte(q.field("technologies"), args.technology)
        )
      )
      .collect();

    const filtered = projects.filter(project => 
      project.technologies.includes(args.technology)
    );

    const sorted = filtered.sort((a, b) => a.sortOrder - b.sortOrder);
    return args.limit ? sorted.slice(0, args.limit) : sorted;
  },
});

// Get project categories with counts
export const getProjectCategories = query({
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_public", (q) => q.eq("isPublic", true))
      .collect();

    const categories = projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categories).map(([category, count]) => ({
      category,
      count,
    }));
  },
});