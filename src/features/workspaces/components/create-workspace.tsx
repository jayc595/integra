"use client";

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateWorkspace } from '../use-create-workspace';
import { useCreateWorkspaceModal } from '../use-create-workspace-modal';

type Props = {}

const CreateWorkspace = (props: Props) => {
    const [open, setOpen] = useCreateWorkspaceModal();

    const { mutate } = useCreateWorkspace();

    const handleClose = () => {
        setOpen(false);
        //TODO: clear form.
    }

    const handleSubmit = () => {
        mutate({
            name: "Workspace 1",
        }, {
            onSuccess(data){
                // Redirect to workspace.
            }
        })
    };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a new workspace</DialogTitle>
            </DialogHeader>
            <form className='space-y-4'>
                {/* @TODO: Add more to initial form, ability to upload photo. */}
                <Input disabled={false} required autoFocus minLength={3} placeholder='Workspace name'></Input>
                <div className='flex justify-end'>
                    <Button disabled={false}>Create</Button>
                </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateWorkspace