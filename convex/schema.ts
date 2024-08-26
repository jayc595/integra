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