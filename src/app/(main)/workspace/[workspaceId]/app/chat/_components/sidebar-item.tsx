import { useWorkspaceId } from '@/app/hooks/use-workspace-id';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons/lib';

interface SidebarItemProps {
    label: string;
    channelId: string;
    icon: LucideIcon | IconType;
}

const SidebarItem = ({
    label,
    channelId,
    icon: Icon,
}: SidebarItemProps) => {
    const workspaceId = useWorkspaceId();

  return (
    <Button variant="ghost" size="sm" className="font-normal justify-start px-2 w-full pr-2 pl-5" asChild>
        <Link href={`/workspace/${workspaceId}/app/chat/channel/${channelId}`}>
            <Icon className="h-4 w-4 mr-2"/>
            <span>{label}</span>
        </Link>
    </Button>
  )
}

export default SidebarItem