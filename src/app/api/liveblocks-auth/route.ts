import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret: "sk_dev_k4RrjBrH8sSt6LF5aw26C_xu2NRBgsRKVwslXJPjvxDIV85QXK-Tu_cmUS5KydzQ",
});

export async function POST(request: Request){
    const authorization = await auth();
    const user = await currentUser();

    if(!authorization || !user){
        return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json();

    const canvas = await convex.query(api.canvas.get, { id: room });

    if(canvas?.orgId !== authorization.orgId){
        return new Response("Unauthorized", { status: 403 });
    }

    const userInfo = {
        name: user.firstName || "Anonymous",
        picture: user.imageUrl,
    };

    const session = liveblocks.prepareSession(user.id, { userInfo });

    if(room){
        session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();
    return new Response(body, {status});
}
