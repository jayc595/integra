"use client";

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateWorkspace } from '../use-create-workspace';
import { useCreateWorkspaceModal } from '../use-create-workspace-modal';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type Props = {}

export const CreateWorkspace = (props: Props) => {
    const router = useRouter();
    const [open, setOpen] = useCreateWorkspaceModal();
    const [name, setName] = useState("");

    const { mutate, isPending, isError, isSuccess, data, error } = useCreateWorkspace();

    const handleClose = () => {
        setOpen(false);
        setName("");
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate({ name }, {
            onSuccess(id){
                toast.success("New Workspace successfully created");
                setOpen(false);
                //Redirect to newly created workspace.
                router.push(`/workspace/${id}`);
            }
        })
    };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a new workspace</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* @TODO: Add more to initial form, ability to upload photo. */}
                <Input disabled={isPending} value={name} onChange={(e) => setName(e.target.value)} required autoFocus minLength={3} placeholder='Workspace name'></Input>
                <div className='flex justify-end'>
                    <Button disabled={isPending}>Create</Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}