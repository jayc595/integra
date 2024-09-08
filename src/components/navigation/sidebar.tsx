"use client";

import { Blocks, Home, MessageCircle, Presentation } from "lucide-react";
import { List } from "./sidebar/list";
import { NewButton } from "./sidebar/new-button";
import { Hint } from "../hint";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";

export const Sidebar = () => {
    const workspaceId = useWorkspaceId();

    return (
        <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex flex-col p-3 gap-y-4 text-white">
            <List />
            <NewButton />
            <div className="flex-grow">
                {/* Empty space to push content to the bottom */}
            </div>

            {/* Conditionally render content based on workspaceId */}
            {workspaceId && (
                <>
                    <Separator />
                    <div className="aspect-square">
                        <Hint label="Chat" side="right" align="start" sideOffset={18}>
                            <Link href={"/chat"}>
                                <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                                    <MessageCircle className="text-white" />
                                </button>
                            </Link>
                        </Hint>
                    </div>
                    <div className="aspect-square">
                        <Hint label="Flow" side="right" align="start" sideOffset={18}>
                            <Link href={"/flow"}>
                                <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                                    <Blocks className="text-white" />
                                </button>
                            </Link>
                        </Hint>
                    </div>
                    <div className="aspect-square">
                        <Hint label="Board" side="right" align="start" sideOffset={18}>
                            <Link href={"/board"}>
                                <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                                    <Presentation className="text-white" />
                                </button>
                            </Link>
                        </Hint>
                    </div>
                    <div className="aspect-square">
                        <Hint label="Dashboard" side="right" align="start" sideOffset={18}>
                            <Link href={"/dashboard"}>
                                <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                                    <Home className="text-white" />
                                </button>
                            </Link>
                        </Hint>
                    </div>
                </>
            )}
        </aside>
    );
};
