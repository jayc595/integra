"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCreateWorkspaceModal } from "@/features/workspaces/use-create-workspace-modal";
import { CreateWorkspace } from "@/features/workspaces/components/create-workspace";

type EmptyOrgProps = {
    name: string;
}

export const EmptyOrg = ({
    name
} : EmptyOrgProps) => {
    const [open, setOpen] = useCreateWorkspaceModal();

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image src="/elements.svg" alt="empty" height={200} width={200}></Image>
            <h2 className="text-2xl font-semibold mt-6">Welcome to {name}</h2>
            <p className="text-muted-foreground text-sm mt-2">Create a workspace to get started.</p>
            <div className="mt-6">
                <CreateWorkspace/>
                <Button onClick={() => setOpen(true)} size="lg">
                    Create workspace
                </Button>
            </div>
        </div>
    );
};