"use client";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal } from "lucide-react";


import { toast } from "sonner";
import { Actions } from "../actions";
import { useApiMutation } from "../../../../../../hooks/use-api-mutation";
import { api } from "../../../../../../convex/_generated/api";



interface CanvasCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavourite: boolean;
};

export const CanvasCard = ({
    id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,
    isFavourite,
} : CanvasCardProps) => {
    const { userId } = useAuth();

    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });

    const {
        mutate: onFavourite,
        pending: pendingFavourite,
    } = useApiMutation(api.canvas.favourite);
    const {
        mutate: onUnfavourite,
        pending: pendingUnfavourite,
    } = useApiMutation(api.canvas.unfavourite);

    const toggleFavourite = () => {
        if(isFavourite){
            onUnfavourite({ id })
            .then(() => toast.success("Canvas successfully unfavourited"))
            .catch(() => toast.error("Unable to unfavourite the canvas"));
        } else {
            onFavourite({ id, orgId })
            .then(() => toast.success("Canvas successfully favourited"))
            .catch(() => toast.error("Unable to favourite the canvas"));
        }
    }

    return (
        <div>
            <Link href={`/canvas/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50">
                    <Image 
                        src={imageUrl} 
                        alt={title}
                        fill 
                        className="object-fit" 
                    />
                    <Overlay />
                    <Actions id={id} title={title} side="right">
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity"/>
                        </button>
                    </Actions>
                </div>
                <Footer
                    isFavourite={isFavourite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={toggleFavourite}
                    disabled={pendingFavourite || pendingUnfavourite}
                />
            </div>
            </Link>
        </div>
    );
};

CanvasCard.Skeleton = function CanvasCardSkeleton() {
    return(
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full"></Skeleton>
        </div>
    )
}