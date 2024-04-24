"use client";

import { Button } from "@/components/ui/button";
import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApiMutation } from "../../../../hooks/use-api-mutation";
import { api } from "../../../../convex/_generated/api";

export const EmptyCanvas = () => {
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.canvas.create);
    const router = useRouter();

    const onClick = () => {
        if (!organization) return;

        

        mutate({
            orgId: organization.id,
            title: "Untitled"
        })
        .then((id) => {
            toast.success("Canvas successfully created");
            router.push(`/canvas/${id}`);
        })
        .catch(() => {
            toast.error("We were unable to create your canvas.");
        })
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
                src="/note.svg"
                height={110}
                width={110}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">Create your first canvas</h2>
            <p className="text-muted-foreground textg-sm mt-2">Start by creating your first canvas</p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create canvas
                </Button>
            </div>
        </div>
        
    );
};

export default EmptyCanvas;