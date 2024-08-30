"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { Plus } from "lucide-react";
import { useWorkspace } from "@/features/workspaces/workspace-context";

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
};

export const Item = ({
    id,
    name,
    imageUrl,
}: ItemProps) => {
    const { workspaceId, setWorkspaceId, setWorkspaceName } = useWorkspace();
    const isActive = (workspaceId !== null && id === workspaceId);

    // Optional: Use useEffect if you need to perform some action when workspaceId changes
    useEffect(() => {
        // Log or perform some action on workspaceId change
        console.log("workspaceId has changed to:", workspaceId);
    }, [workspaceId]);

    return (
        <div className="aspect-square relative">
            <Hint label={name} side="right" align="start" sideOffset={18}>
                {imageUrl ? (
                    <Image
                        fill
                        alt={name}
                        src={imageUrl}
                        onClick={() => {
                            // Example click handler
                            setWorkspaceId(id);
                            setWorkspaceName(name);
                        }}
                        className={cn(
                            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                            isActive && "opacity-100"
                        )}
                    />
                ) : (
                    <button
                        className={cn(
                            "bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition",
                            isActive && "opacity-100"
                        )}
                        onClick={() => {
                            // Example click handler
                            setWorkspaceId(id);
                            setWorkspaceName(name);
                        }}
                    >
                        {name[0]}
                    </button>
                )}
            </Hint>
        </div>
    );
};
