"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { Plus } from "lucide-react";
import { useWorkspace } from "@/features/workspaces/workspace-context";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const isActive = (workspaceId !== null && id === workspaceId);

    return (
        <div className="aspect-square relative">
            <Hint label={name} side="right" align="start" sideOffset={18}>
                {imageUrl ? (
                    <Image
                        fill
                        alt={name}
                        src={imageUrl}
                        onClick={() => {
                            router.push(`/workspace/${id}`);
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
                            router.push(`/workspace/${id}`);
                        }}
                    >
                        {name[0]}
                    </button>
                )}
            </Hint>
        </div>
    );
};
