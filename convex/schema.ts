import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Services schema for the services section of landing page
  services: defineTable({
    title: v.string(),
    description: v.string(),
    icon: v.string(), // Icon name or URL
    category: v.union(
      v.literal("development"), 
      v.literal("design"), 
      v.literal("consulting"),
      v.literal("ai-ml"),
      v.literal("cloud"),
      v.literal("security")
    ),
    features: v.array(v.string()),
    isActive: v.boolean(),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_active", ["isActive"])
    .index("by_sort_order", ["sortOrder"]),

  // Projects/Portfolio schema for showcasing work
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    shortDescription: v.string(), // For cards/previews
    imageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    projectUrl: v.optional(v.string()), // Live project URL
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
    status: v.union(
      v.literal("completed"), 
      v.literal("in-progress"), 
      v.literal("archived")
    ),
    featured: v.boolean(), // For highlighting top projects
    clientName: v.optional(v.string()),
    completedAt: v.optional(v.number()),
    sortOrder: v.number(),
    isPublic: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_featured", ["featured"])
    .index("by_status", ["status"])
    .index("by_public", ["isPublic"])
    .index("by_sort_order", ["sortOrder"]),

  // Contacts schema for contact form submissions
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    serviceInterest: v.optional(v.array(v.string())), // Which services they're interested in
    budgetRange: v.optional(v.union(
      v.literal("under-5k"),
      v.literal("5k-15k"),
      v.literal("15k-50k"),
      v.literal("50k-plus"),
      v.literal("not-specified")
    )),
    preferredContact: v.optional(v.union(
      v.literal("email"),
      v.literal("phone"),
      v.literal("both")
    )),
    timeline: v.optional(v.union(
      v.literal("asap"),
      v.literal("1-month"),
      v.literal("3-months"),
      v.literal("6-months-plus"),
      v.literal("not-specified")
    )),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("converted"),
      v.literal("closed")
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    ),
    notes: v.optional(v.string()), // Internal notes
    isRead: v.boolean(),
    respondedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_priority", ["priority"])
    .index("by_read", ["isRead"])
    .index("by_created", ["createdAt"]),

  // Blog posts for content marketing (optional)
  blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(), // Markdown content
    author: v.string(),
    featuredImage: v.optional(v.string()),
    tags: v.array(v.string()),
    category: v.string(),
    published: v.boolean(),
    featured: v.boolean(),
    readTime: v.number(), // Estimated read time in minutes
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["published"])
    .index("by_featured", ["featured"])
    .index("by_category", ["category"])
    .index("by_published_at", ["publishedAt"]),

  // Testimonials for social proof
  testimonials: defineTable({
    clientName: v.string(),
    clientTitle: v.string(),
    clientCompany: v.string(),
    clientAvatar: v.optional(v.string()),
    testimonial: v.string(),
    rating: v.number(), // 1-5 star rating
    projectId: v.optional(v.id("projects")), // Link to related project
    featured: v.boolean(),
    approved: v.boolean(),
    sortOrder: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_featured", ["featured"])
    .index("by_approved", ["approved"])
    .index("by_rating", ["rating"])
    .index("by_sort_order", ["sortOrder"]),

  // Newsletter subscribers
  subscribers: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("unsubscribed"),
      v.literal("bounced")
    ),
    source: v.optional(v.string()), // Where they signed up from
    tags: v.optional(v.array(v.string())),
    subscribedAt: v.number(),
    unsubscribedAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_subscribed_at", ["subscribedAt"]),

  // Site analytics and metrics
  analytics: defineTable({
    event: v.string(), // 'page_view', 'contact_form', 'service_inquiry', etc.
    path: v.optional(v.string()),
    referrer: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    ipAddress: v.optional(v.string()),
    sessionId: v.optional(v.string()),
    metadata: v.optional(v.object({})), // Additional event data
    timestamp: v.number(),
  })
    .index("by_event", ["event"])
    .index("by_timestamp", ["timestamp"])
    .index("by_path", ["path"]),
});