"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { Actions } from "@/app/(main)/board/_components/actions";
import { useRenameModal } from "@/app/(main)/board/_components/modals/use-rename-modal";

interface InfoProps{
    canvasId: string;
};

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1.5">
            |
        </div>
    );
};

export const Info = ({
    canvasId,
} : InfoProps) => {
    const { onOpen } = useRenameModal();

    const data = useQuery(api.canvas.get, {
        id: canvasId as Id<"canvas">
    });

    if(!data) return <Info.Skeleton />

    return(
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Go to canvas list">
                <Button asChild variant="canvas" className="px-2">
                    <Link href="/board">
                        <Image src="/logo.svg" alt="Canvas logo" height={40} width={40}></Image>
                        <span className={cn("font-semibold text-l ml-2 text-black",font.className) }>IntegraBoard</span>
                    </Link>
                </Button>
            </Hint>
            <TabSeparator />
            <Hint label="Rename canvas">
                <Button onClick={() => onOpen(data._id, data.title)} variant="canvas" className="text-base font-normal px-2">
                    {data.title}
                </Button>
            </Hint>
            <TabSeparator />
            <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
                <div>
                    <Hint label="Menu" side="bottom" sideOffset={10}>
                        <Button size="icon" variant="canvas">
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    )
}

Info.Skeleton = function InfoSkeleton(){
    return(
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]">
        </div>
    )
}