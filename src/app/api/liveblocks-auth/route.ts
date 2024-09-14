// import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/workspaces/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { Id } from "../../../../convex/_generated/dataModel";
import { currentUser } from "../../../../convex/getCurrentUser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET!,
});

export async function POST(request: Request){
    try {
      const workspaceId: Id<"workspaces"> = "k97a6wgj33jppxbybv6yjanpxn70s9c3" as Id<"workspaces">;
      const { room } = await request.json(); // Expecting workspaceId in the request body
      const user = currentUser();
    
        if (!user) {
          return new Response("Unauthorized 100", { status: 403 });
        }
    
        // Fetch workspace data from Convex (replace useGetWorkspace with server-side logic)
        // const workspace = await convex.query(api.workspaces.getWorkspaceById, { id: workspaceId });
    
        // if (!workspace) {
          // return new Response("Unauthorized 1", { status: 403 });
        // }
    
        // Fetch the canvas data
        const canvas = await convex.query(api.canvas.get, { id: room });
    
        // Check if the canvas belongs to the workspace
        if (canvas?.orgId !== workspaceId) {
          return new Response("Unauthorized 2", { status: 403 });
        }
    
        // Prepare user info for Liveblocks session
        const userInfo = {
          name: user.id || "Anonymous",
        };
    
        // Create Liveblocks session for the member
        const session = liveblocks.prepareSession(member.userId, { userInfo });
    
        // Authorize the user for the room
        if (room) {
          session.allow(room, session.FULL_ACCESS);
        }
    
        // Authorize the session and return the response
        const { status, body } = await session.authorize();
        return new Response(body, { status });
      } catch (error) {
        const err = `Internal server error: ${error}`
        console.error("Error processing request:", error);
        return new Response(err , { status: 500 });
      }
    }