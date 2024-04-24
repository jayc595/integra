"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApiMutation } from "../../../../../hooks/use-api-mutation";
import { api } from "../../../../../convex/_generated/api";

interface NewCanvasButtonProps {
    orgId: string;
    disabled?: boolean;
}

export const NewCanvasButton = ({
    orgId,
    disabled,
}: NewCanvasButtonProps) => {
    const { mutate, pending } = useApiMutation(api.canvas.create);
    const router = useRouter();

    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        })
        .then((id) => {
            toast.success("Canvas successfully created")
            router.push(`/canvas/${id}`);
        })
        .catch(() => toast.error("We were unable to create your canvas.")
        )
    }

    return (
        <button
        disabled={pending || disabled}
        onClick={onClick}
        className={cn(
            "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
            (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
        )}
        >
            <div/>
            <Plus className="h-12 w-12 text-white stroke-1"></Plus>
            <p className="text-xs text-white font-light">New canvas</p>
        </button>
    )
}