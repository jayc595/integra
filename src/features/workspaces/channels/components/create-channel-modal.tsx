"use client";

import React, { useState } from 'react'
import { useCreateChannelModal } from '../use-create-channel-modal'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Hash, MailIcon } from 'lucide-react';
import { useCreateChannel } from '../use-create-channel';
import { useWorkspaceId } from '@/app/hooks/use-workspace-id';
import { toast } from 'sonner';

export const CreateChannelModal = () => {
    const maxCharLength = 80;
    const [open, setOpen] = useCreateChannelModal();
    const [name, setName] = useState("");
    const workspaceId = useWorkspaceId();

    const { mutate, isPending } = useCreateChannel()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
        value.slice(0, maxCharLength);
        setName(value);
    }

    const handleClose = () => {
      setName("");
      setOpen(false);
    }

    //TODO: Ensure duplicate channel names can't be created.
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate(
        { name, workspaceId },
        {
          onSuccess: (id) => {
            //TODO: Redirect to new channel 
            toast.success("New channel successfully created");
            handleClose();
          },
        },
      );
    };


  return (
    <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a channel</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='relative'>
                <Hash className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input value={name} disabled={isPending} onChange={handleChange} required autoFocus minLength={3} maxLength={maxCharLength} placeholder="e.g general" className='pl-8 pr-8'></Input>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                {maxCharLength - name.length}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                  Channels are spaces where discussions are organized around specific topics. Choose a name that is simple and easy to recognize.
              </p>
              <div className='flex justify-end'>
                <Button disabled={isPending}>Create</Button>
              </div>
            </form>
        </DialogContent>
    </Dialog>
  )
}