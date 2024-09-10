"use client";

import { CreateChannelModal } from "@/features/workspaces/channels/components/create-channel-modal";
import { CreateWorkspace } from "@/features/workspaces/components/create-workspace";
import { useEffect, useState } from "react";

export const Modals = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) return null;

    return(
        <>
            <CreateChannelModal/>
            <CreateWorkspace/>
        </>
    )
}