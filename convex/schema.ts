import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
    ...authTables,

    //Workspaces Table definition start
    workspaces: defineTable({
        name: v.string(),
        userId: v.id("users"),
        joinCode: v.string(),
    }),
    //Workspaces table definition end

    //Members Table definition start
    members: defineTable({
        userId: v.id("users"),
        workspaceId: v.id("workspaces"),
        role: v.union(v.literal("admin"), v.literal("user"), v.literal("guest"), v.literal("superadmin")),
        status: v.union(v.literal("online"), v.literal("away"), v.literal("doNotDisturb"), v.literal("offline"))
    })
        .index("by_user_id", ["userId"])
        .index("by_workspace_id", ["workspaceId"])
        .index("by_workspace_id_user_id", ["workspaceId", "userId"]),
    //Members table definition end

    //Channels Table definition start
    channels: defineTable({
        name: v.string(),
        workspaceId: v.id("workspaces")
    })
    .index("by_workspace_id", ["workspaceId"]),
    //Channels Table definition end

    //Messages Table definition start
    messages: defineTable({
        body: v.string(),
        image: v.optional(v.id("_storage")),
        memberId: v.id("members"),
        workspaceId: v.id("workspaces"),
        channelId: v.optional(v.id("channels")),
        parentMessageId: v.optional(v.id("messages")),
        updatedAt: v.number()
        //TODO: Add conversation ID later.
    }),
    //Messages Table definition end

    //Canvas Table Definition Start
    canvas: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string(),
        
    })
    .index("by_org", ["orgId"])
    .searchIndex("search_title",{
        searchField: "title",
        filterFields: ["orgId"]
    }),
    //Canvas Table Definition End


    //User Favourites Table Definition Start
    userFavourites: defineTable({
        orgId: v.string(),
        userId: v.string(),
        canvasId: v.id("canvas")
    })
    .index("by_canvas", ["canvasId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_canvas", ["userId", "canvasId"])
    .index("by_user_canvas_org", ["userId", "canvasId", "orgId"])
    //User Favourites Table Definition End
});