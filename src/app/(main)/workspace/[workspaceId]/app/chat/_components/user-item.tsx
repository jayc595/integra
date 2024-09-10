import React from 'react'
import { Id } from '../../../../../../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useWorkspaceId } from '@/app/hooks/use-workspace-id';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserItemProps {
    id: Id<"members">;
    label? : string;
    image?: string;
}

const UserItem = ({
    id,
    label = "Member",
    image
}: UserItemProps) => {
    const workspaceId = useWorkspaceId();
    const avatarFallback = label.charAt(0).toUpperCase();
  return (
    <Button variant="ghost" size="sm" className="font-normal justify-start px-2 w-full pr-2 pl-5" asChild>
        <Link href={`/workspace/${workspaceId}/app/chat/member/${id}`}>
            <Avatar className='size-5 rounded-md mr-1'>
                <AvatarImage className='rounded-md' src={image}/>
                <AvatarFallback className='rounded-md'>
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>
            <span className='text-sm truncate'>{label}</span>
        </Link>
    </Button>
  )
}

export default UserItem