import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),

    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if(!userId){
            throw new Error("Unauthorized");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const canvas = await ctx.db.insert("canvas", {
            title: args.title,
            orgId: args.orgId,
            authorId: userId,
            authorName: "Test",
            imageUrl: randomImage
        });
        
        return canvas;
    },
});

export const remove = mutation({
    args: { id: v.id("canvas") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;

        const existingFavourite = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_canvas", (q) => 
            q
                .eq("userId", userId)
                .eq("canvasId", args.id)
            )
            .unique();

        if(existingFavourite){
            await ctx.db.delete(existingFavourite._id);
        }    

        await ctx.db.delete(args.id);
    }
});

export const update = mutation({
    args: { id: v.id("canvas"), title: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }

        const title = args.title.trim();

        if(!title){
            throw new Error("Title is required");
        }

        if(title.length > 60){
            throw new Error("Title cannot be longer than 60 characters");
        }

        const canvas = await ctx.db.patch(args.id, {
            title: args.title,
        });

        return canvas;
    },
});

export const favourite = mutation({
    args: { id: v.id("canvas"), orgId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            return new Error("Unauthorized");
        }

        const canvas = await ctx.db.get(args.id);

        if(!canvas){
            return new Error("Canvas not found");
        }

        const userId = identity.subject;

        const existingFavourite = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_canvas_org", (q) => 
            q
                .eq("userId", userId)
                .eq("canvasId", canvas._id)
                .eq("orgId", args.orgId)
            )
            .unique();

        if(existingFavourite){
            throw new Error("Canvas already favourited");
        }

        await ctx.db.insert("userFavourites", {
            userId,
            canvasId: canvas._id,
            orgId: args.orgId,
        });

        return canvas;
    },
});

export const unfavourite = mutation({
    args: { id: v.id("canvas") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            return new Error("Unauthorized");
        }

        const canvas = await ctx.db.get(args.id);

        if(!canvas){
            return new Error("Canvas not found");
        }

        const userId = identity.subject;

        const existingFavourite = await ctx.db
            .query("userFavourites")
            .withIndex("by_user_canvas", (q) => 
            q
                .eq("userId", userId)
                .eq("canvasId", canvas._id)
            )
            .unique();

        if(!existingFavourite){
            throw new Error("Favourited canvas doesn't exist");
        }

        await ctx.db.delete(existingFavourite._id);

        return canvas;
    },
});

export const get = query({
    args:{ id: v.id("canvas") },
    handler: async (ctx, args) => {
        const canvas = ctx.db.get(args.id);

        return canvas;
    },
})
