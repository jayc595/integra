import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { BellRing, Hash, LayoutDashboard, ListFilter, MessageSquareText, SquarePen, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import StatusIndicator from './status-indicator'
import { Hint } from '@/components/hint'
import SidebarItem from './sidebar-item'
import { useGetChannels } from '@/features/workspaces/channels/api/use-get-channels'
import { useWorkspaceId } from '@/app/hooks/use-workspace-id'
import { WorkspaceSection } from './workspace-section'

type Props = {}

const ChatOrganizationSidebarButtons = (props: Props) => {
    const workspaceId = useWorkspaceId();
    const {data: channels, isLoading: channelIsLoading} = useGetChannels({workspaceId});

  return (
    <div className="flex flex-col h-full w-full">
      <div className="space-y-1">
        <div className='flex justify-between items-center gap-0.5 mt-2 mb-2 pr-2 pl-5'>
            <p className='bold'>Chat</p>
            <div className="flex gap-1">
                <Hint label='Filter'>
                    <Button variant="ghost" size="icon">
                        <ListFilter className='h-4 w-4' />
                    </Button>
                </Hint>
                <Hint label='Compose message'>
                    <Button variant="ghost" size="icon">
                        <SquarePen className='h-4 w-4' />
                    </Button>
                </Hint>
            </div>
        </div>
        <Separator/>
        <SidebarItem
            label="Threads"
            icon={MessageSquareText}
            channelId="threads"
        />
        <SidebarItem
            label="Activity"
            icon={BellRing}
            channelId="activity"
        />
        <WorkspaceSection
            label="Channel"
            hint="New channel"
            onNew={() => {}}
        >
            <SidebarItem
                label="Channel One"
                icon={Hash}
                channelId="channelone"
            />
        </WorkspaceSection>
        
      </div>

      {/* This ensures StatusIndicator is at the bottom */}
      <div className="mt-auto w-full">
        <StatusIndicator/>
      </div>
    </div>
  )
}

export default ChatOrganizationSidebarButtons