import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Submit a new contact form
export const submitContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    subject: v.string(),
    message: v.string(),
    serviceInterest: v.optional(v.array(v.string())),
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(args.email)) {
      throw new Error("Invalid email format");
    }

    // Determine priority based on budget and timeline
    let priority: "low" | "medium" | "high" | "urgent" = "medium";
    if (args.budgetRange === "50k-plus" || args.timeline === "asap") {
      priority = "high";
    } else if (args.budgetRange === "under-5k") {
      priority = "low";
    }

    if (args.budgetRange === "50k-plus" && args.timeline === "asap") {
      priority = "urgent";
    }

    const contactId = await ctx.db.insert("contacts", {
      name: args.name,
      email: args.email,
      company: args.company,
      phone: args.phone,
      subject: args.subject,
      message: args.message,
      serviceInterest: args.serviceInterest,
      budgetRange: args.budgetRange,
      preferredContact: args.preferredContact,
      timeline: args.timeline,
      status: "new",
      priority,
      isRead: false,
      createdAt: now,
      updatedAt: now,
    });

    return contactId;
  },
});

// Get all contacts (for admin)
export const getAllContacts = query({
  args: {
    status: v.optional(v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("converted"),
      v.literal("closed")
    )),
    priority: v.optional(v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    )),
    unreadOnly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let contactsQuery = ctx.db.query("contacts");

    if (args.status) {
      contactsQuery = ctx.db
        .query("contacts")
        .withIndex("by_status", (q) => q.eq("status", args.status));
    }

    if (args.priority) {
      contactsQuery = ctx.db
        .query("contacts")
        .withIndex("by_priority", (q) => q.eq("priority", args.priority));
    }

    if (args.unreadOnly) {
      contactsQuery = ctx.db
        .query("contacts")
        .withIndex("by_read", (q) => q.eq("isRead", false));
    }

    const contacts = await contactsQuery.collect();
    
    // Sort by priority (urgent first) then by creation date (newest first)
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    return contacts.sort((a, b) => {
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.createdAt - a.createdAt;
    });
  },
});

// Get contact by ID
export const getContactById = query({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get contact statistics
export const getContactStats = query({
  handler: async (ctx) => {
    const contacts = await ctx.db.query("contacts").collect();
    
    const stats = {
      total: contacts.length,
      new: contacts.filter(c => c.status === "new").length,
      contacted: contacts.filter(c => c.status === "contacted").length,
      qualified: contacts.filter(c => c.status === "qualified").length,
      converted: contacts.filter(c => c.status === "converted").length,
      closed: contacts.filter(c => c.status === "closed").length,
      unread: contacts.filter(c => !c.isRead).length,
      urgent: contacts.filter(c => c.priority === "urgent").length,
      high: contacts.filter(c => c.priority === "high").length,
      thisMonth: contacts.filter(c => {
        const now = new Date();
        const contactDate = new Date(c.createdAt);
        return contactDate.getMonth() === now.getMonth() && 
               contactDate.getFullYear() === now.getFullYear();
      }).length,
    };

    return stats;
  },
});

// Update contact status
export const updateContactStatus = mutation({
  args: {
    id: v.id("contacts"),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("converted"),
      v.literal("closed")
    ),
  },
  handler: async (ctx, args) => {
    const contact = await ctx.db.get(args.id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
      respondedAt: args.status !== "new" ? Date.now() : contact.respondedAt,
    });

    return args.id;
  },
});

// Update contact priority
export const updateContactPriority = mutation({
  args: {
    id: v.id("contacts"),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("urgent")
    ),
  },
  handler: async (ctx, args) => {
    const contact = await ctx.db.get(args.id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    await ctx.db.patch(args.id, {
      priority: args.priority,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Mark contact as read/unread
export const markContactAsRead = mutation({
  args: {
    id: v.id("contacts"),
    isRead: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const contact = await ctx.db.get(args.id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    await ctx.db.patch(args.id, {
      isRead: args.isRead ?? true,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Add notes to a contact
export const addContactNotes = mutation({
  args: {
    id: v.id("contacts"),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    const contact = await ctx.db.get(args.id);
    if (!contact) {
      throw new Error("Contact not found");
    }

    const existingNotes = contact.notes || "";
    const timestamp = new Date().toISOString();
    const newNotes = existingNotes 
      ? `${existingNotes}\n\n[${timestamp}] ${args.notes}`
      : `[${timestamp}] ${args.notes}`;

    await ctx.db.patch(args.id, {
      notes: newNotes,
      updatedAt: Date.now(),
    });

    return args.id;
  },
});

// Delete a contact
export const deleteContact = mutation({
  args: { id: v.id("contacts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Get contacts by email (for duplicate checking)
export const getContactsByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contacts")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
  },
});

// Get recent contacts
export const getRecentContacts = query({
  args: {
    limit: v.optional(v.number()),
    days: v.optional(v.number()), // Number of days to look back
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    const daysBack = args.days ?? 7;
    const cutoffTime = Date.now() - (daysBack * 24 * 60 * 60 * 1000);

    const contacts = await ctx.db
      .query("contacts")
      .withIndex("by_created", (q) => q.gte("createdAt", cutoffTime))
      .collect();

    return contacts
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
  },
});