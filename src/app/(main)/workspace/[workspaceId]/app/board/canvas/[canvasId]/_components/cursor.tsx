"use client";

import { connectionIdToColourMaping } from "@/lib/utils";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";
import { useOther } from "../../../../../../../../../../liveblocks.config";

interface CursorProps {
    connectionId: number;
}

export const Cursor = memo(({
    connectionId
} : CursorProps) => {
    const info = useOther(connectionId, (user) => user?.info);
    const cursor = useOther(connectionId, (user) => user.presence.cursor);

    const name = info?.name || "Anonymous";

    if(!cursor){
        return null;
    }

    const { x, y } = cursor;

    return(
        <foreignObject style={{transform: `translateX(${x}px) translateY(${y}px)`}} height={50} width={name.length * 10 + 24} className="relative drop-shadow-md">
            <MousePointer2 className="h-5 w-5" style={{fill: connectionIdToColourMaping(connectionId), color: connectionIdToColourMaping(connectionId)}}>

            </MousePointer2>
            <div className="absolute left-3 top-4 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold" style={{ backgroundColor: connectionIdToColourMaping(connectionId) }}>
                {name}
            </div>
        </foreignObject>
    )
});

Cursor.displayName = "Cursor";