import { OrganizationProfile } from "@clerk/nextjs";
import { CopyIcon, Plus, RefreshCcw } from "lucide-react";

import {
    Dialog,
    DialogClose,
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
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { Hint } from "../hint";

interface InviteButtonModalProps {
    role?: string;
}

export const InviteButton = ({
    role
}: InviteButtonModalProps) => {
    const workspaceId = useWorkspaceId();
    const workspace = useQuery(api.workspaces.getWorkspaceById, {
        id: workspaceId as Id<"workspaces">
    });

    const { mutate, isPending } = useNewJoinCode();

    const handleCopyLink = () => {
        const inviteLink = `${window.location.origin}/join/${workspaceId}`
        //TODO: Copy the invite link to clipboard.
        toast.success("Invite Link copied to clipboard");
    }

    const handleNewCodeGeneration = () => {
        mutate({workspaceId}, {
            onSuccess: () => {
                toast.success("New Invite Code generated");
            },
            onError: () => {
                toast.error("Unable to regenerate new Invite Code")
            }
        })
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
                        {workspace?.joinCode}
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyLink()}>
                        Copy Link
                        <CopyIcon className="size-4 ml-2"/>
                    </Button>
                </div>
                <div className="flex items-center justify-between w-full">
                    {role === 'admint' && (
                        <Button disabled={isPending} onClick={handleNewCodeGeneration} variant="outline">
                            <RefreshCcw className="size-4 mr-2"/>
                            Generate code
                        </Button>
                    )}
                    {role === 'admin' && (
                        <Hint label="Contact your administrator to refresh">
                            <Button disabled={true} onClick={handleNewCodeGeneration} variant="outline">
                                <RefreshCcw className="size-4 mr-2"/>
                                Generate code
                            </Button>
                        </Hint>
                    )}
                    <DialogClose asChild>
                        <Button>Close</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}