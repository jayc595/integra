"use client";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";

import { useState, useEffect, FormEventHandler } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "./use-rename-modal";
import { api } from "../../../../../convex/_generated/api";
import { useApiMutation } from "../../../../../hooks/use-api-mutation";

export const RenameModal = () => {
    const { mutate, pending } = useApiMutation(api.canvas.update);

    const {
        isOpen,
        onClose,
        initialValues,
    } = useRenameModal();

    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (
        e,
    ) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title,
        })
        .then(() => {
            toast.success("Canvas successfully renamed")
            onClose();
        })
        .catch(() => toast.error("An error occurred whilst trying to rename canvas. "))
    };
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit canvas title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new canvas title
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Canvas title"
                    >
                    </Input>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};