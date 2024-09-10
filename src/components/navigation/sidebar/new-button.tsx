"use client";

import { Plus } from "lucide-react";
import { Hint } from "@/components/hint";
import { CreateWorkspace } from "@/features/workspaces/components/create-workspace";
import { useCreateWorkspaceModal } from "@/features/workspaces/use-create-workspace-modal";

export const NewButton = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    return (
        <>
            <CreateWorkspace/>
            <div className="aspect-square">
                <Hint label="Create workspace" side="right" align="start" sideOffset={18}>
                    <button onClick={() => setOpen(true)} className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                        <Plus className="text-white"/>
                    </button>
                </Hint>
            </div>
        </>
    )
}