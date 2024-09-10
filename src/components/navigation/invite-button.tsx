import { OrganizationProfile } from "@clerk/nextjs";
import { CopyIcon, Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { getWorkspaceById } from "../../../convex/workspaces";
import { toast } from "sonner";

interface InviteButtonModalProps {
}

export const InviteButton = ({
}: InviteButtonModalProps) => {
    const workspaceId = useWorkspaceId();
    //const workspace = getWorkspaceById({workspaceId});

    const handleCopyLink = () => {
        const inviteLink = `${window.location.origin}/join/${workspaceId}`
        //TODO: Copy the invite link to clipboard.
        toast.success("Invite Link copied to clipboard");
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2"></Plus>
                    Invite members
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite members to your workspace</DialogTitle>
                    <DialogDescription>Use the below code to invite members to your workspace</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-y-4 items-center justify-center py-10">
                    <p className="text-4xl font-bold tracking-widest uppercase">
                        123456 
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyLink()}>
                        Copy Link
                        <CopyIcon className="size-4 ml-2"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}