import { v } from "convex/values";
import { mutation,query } from "./_generated/server";
import { auth } from "./auth";

const generateCode = () => {
    const code = Array.from(
        { length: 6 },
        () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
    ).join("");

    return code;
}

export const join = mutation({
    args: {
        joinCode: v.string(),
        workspaceId: v.id("workspaces"),
    },
    handler: async(ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw new Error("Unauthorized");
        }

        const workspace = await ctx.db.get(args.workspaceId);

        //TODO: Consider whether we should let the user know if the workspace existed but code was wrong.
        if(!workspace || workspace.joinCode !== args.joinCode.toLowerCase()){
            throw new Error("Workspace not found");
        }

        const existingMember = await ctx.db.query("members")
            .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", args.workspaceId).eq("userId", userId)
        )
        .unique();

        if(existingMember){
            throw new Error("Already a member of this workspace");
        }

        //TODO: Should new members be considered a user or guest?
        await ctx.db.insert("members", {
            userId,
            workspaceId: workspace._id,
            role: "user",
            status: "online",
        })

        return workspace._id;

    }
})

export const newJoinCode = mutation({
    args: {
        workspaceId: v.id("workspaces"),
    },
    handler: async(ctx,args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw new Error("Unauthorized");
        }

        const member = await ctx.db.query("members")
            .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", args.workspaceId).eq("userId", userId)
        )
        .unique();

        if(!member){
            throw new Error("Unauthorized");
        }

        const joinCode = generateCode();

        await ctx.db.patch(args.workspaceId, {
            joinCode,
        });

        return args.workspaceId;
    }
})

export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw new Error("Unauthorized");
        }

        const joinCode = generateCode();

        const workspaceId = await ctx.db.insert("workspaces", {
            name: args.name,
            userId,
            joinCode
        });

        await ctx.db.insert("members", {
            userId,
            workspaceId,
            role: "admin",
            status: "online",
        });

        return workspaceId;
    },
});


export const get = query({
    args: {},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            return [];
        }

        const members = await ctx.db.query("members")
            .withIndex("by_user_id", (q) => q.eq("userId", userId))
            .collect();

        const workspaceIds = members.map((member) => member.workspaceId);
        
        const workspaces = [];

        for (const workspaceId of workspaceIds) {
            const workspace = await ctx.db.get(workspaceId);

            if(workspace){
                workspaces.push(workspace);
            }
        }

        return workspaces;
    },
})

export const getInfoById = query({
    args: { id: v.id("workspaces")},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            return null;
        }

        const member = await ctx.db.query("members")
        .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", args.id)
        .eq("userId", userId),).unique();

        const workspace =  await ctx.db.get(args.id);

        return {
            name: workspace?.name,
            isMember: !!member,
        }
    },
});

export const getWorkspaceById = query({
    args: { id: v.id("workspaces")},
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw new Error("Unauthorized");
        }

        const member = await ctx.db.query("members")
        .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", args.id)
        .eq("userId", userId),).unique();

        if(!member){
            return null;
        }

        return await ctx.db.get(args.id);
    },
});