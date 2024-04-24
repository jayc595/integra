import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
    args: {
        orgId: v.string(),
    },
    handler: async (ctx, args: { orgId: string }) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }
        const canvas = await ctx.db
        .query("canvas")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();

        return canvas
    }
        
});