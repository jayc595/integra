"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
    Link2,
    Pencil,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { ConfirmModal } from "./confirm-modal";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "./modals/use-rename-modal";
import { useApiMutation } from "../../../../../../../../hooks/use-api-mutation";
import { api } from "../../../../../../../../convex/_generated/api";



interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionsProps) => {
    const { onOpen } = useRenameModal();
    const { mutate, pending } = useApiMutation(api.canvas.remove);
    const router = useRouter();

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/canvas/${id}`
        )
            .then(() => {
                toast.success("Canvas link copied to clipboard.");
                
            })
            .catch(() => toast.error("An error occurred when trying to copy the canvas link"))
    }

    const onDeleteLink = () => {
        mutate({ id })
            .then(() => {
                toast.success("Canvas successfully removed")
                if(window.location.href == `${window.location.origin}/canvas/${id}`){
                    router.push(`${window.location.origin}`);
                }
            })

            .catch(() => toast.error("An error occurred whilst trying to remove canvas"))
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent onClick={(e) => e.stopPropagation()} side={side} sideOffset={sideOffset} className="w-60">
                <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
                    <Link2 className="h-4 w-4 mr-2"/>
                        Copy canvas link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onOpen(id, title)} className="p-3 cursor-pointer">
                    <Pencil className="h-4 w-4 mr-2"/>
                        Rename canvas
                </DropdownMenuItem>
                <ConfirmModal
                    header={"Delete canvas"}
                    description={"This will permenantly delete the canvas and all content"}
                    disabled={pending}
                    onConfirm={onDeleteLink}
                >
                    <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                        <Trash2 className="h-4 w-4 mr-2"/>
                            Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
           
    );
};

