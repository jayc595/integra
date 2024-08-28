"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { Plus } from "lucide-react";

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
    const isActive = false;

    return (
        <div className="aspect-square relative">
            <Hint label={name} side="right" align="start" sideOffset={18}>
            {imageUrl ? (
                    <Image
                        fill
                        alt={name}
                        src={imageUrl}
                        onClick={() => {}}
                        className={cn(
                            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
                            isActive && "opacity-100"
                        )}
                    />
                ) : (
                    <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                        {name[0]}
                    </button>
                )}
            </Hint>
            
        </div>
    )
}