// import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/workspaces/members/api/use-current-member";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret: "sk_dev_k4RrjBrH8sSt6LF5aw26C_xu2NRBgsRKVwslXJPjvxDIV85QXK-Tu_cmUS5KydzQ",
});

export async function POST(request: Request){
    const workspaceId = useWorkspaceId();
    const {data: member, isLoading: memberLoading} = useCurrentMember({workspaceId});
    const {data: workspace, isLoading: workspaceLoading} = useGetWorkspace({id: workspaceId});

    if(!member || !workspace){
        return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json();

    const canvas = await convex.query(api.canvas.get, { id: room });

    if(canvas?.orgId !== workspaceId){
        return new Response("Unauthorized", { status: 403 });
    }

    const userInfo = {
        name: member.userId || "Anonymous",
        // picture: user.imageUrl,
    };

    const session = liveblocks.prepareSession(member.userId, { userInfo });

    if(room){
        session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();
    return new Response(body, {status});
}
