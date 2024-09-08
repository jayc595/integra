"use client";

import { RenameModal } from "@/app/(main)/workspace/[workspaceId]/app/board/_components/modals/rename";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return (
        <>
            <RenameModal/>
        </>
    );
};