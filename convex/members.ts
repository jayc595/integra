import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";

const populateUser = (ctx: QueryCtx, id: Id<"users">) => {
    return ctx.db.get(id);
};

export const get = query({
    args: { workspaceId: v.id("workspaces") },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            return [];
        }

        const member = await ctx.db.query("members")
            .withIndex("by_workspace_id_user_id", (q) => 
            q.eq("workspaceId", args.workspaceId).eq("userId", userId)
        ).unique();

        if(!member){
            return [];
        }

        const data = await ctx.db.query("members")
            .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
            .collect();

        const members = [];

        for(const member of data){
            const user = await populateUser(ctx, member.userId);

            if(user){
                members.push({
                    ...member,
                    user,
                });
            }
        }

        return members;
    }
})

export const currentMember = query({
    args: {workspaceId: v.id("workspaces")},
    handler: async (ctx,args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId) {
            return null;
        }

        const member = await ctx.db.query("members")
            .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", args.workspaceId)
            .eq("userId", userId)
        )
        .unique();

        if(!member){
            return null;
        }

        return member;
    },
});

export const getById = query({
    args: {
        id: v.id("members")
    },
    handler: async (ctx,args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            return null;
        }

        const member = await ctx.db.get(args.id);

        if(!member){
            return null;
        }

        return member;
    }
})

export const updateStatus = mutation({
    args: {
        id: v.id("members"),
        status: v.union(v.literal("online"), v.literal("away"), v.literal("doNotDisturb"), v.literal("offline"))
    },
    handler: async(ctx,args) => {
        const userId = await auth.getUserId(ctx);

        if(!args.status || args.status == undefined){
            throw new Error("Unauthorized");
        }

        if(!userId){
            throw new Error("Unauthorized");
        }

        const member = await ctx.db.get(args.id);

        if(!member){
            throw new Error("Unauthorized");
        }

        //TODO: Consider whether we should patch at a member id level or user id level. I.e should status change on any workplace for the user.
        await ctx.db.patch(args.id, {
            status: args.status,
        });

        return args.id;
    }
})