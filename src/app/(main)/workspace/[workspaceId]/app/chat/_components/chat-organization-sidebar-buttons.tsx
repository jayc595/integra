import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { BellRing, Hash, LayoutDashboard, ListFilter, MessageSquareText, SquarePen, Star, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import StatusIndicator from './status-indicator'
import { Hint } from '@/components/hint'
import SidebarItem from './sidebar-item'
import { useGetChannels } from '@/features/workspaces/channels/api/use-get-channels'
import { useWorkspaceId } from '@/app/hooks/use-workspace-id'
import { WorkspaceSection } from './workspace-section'
import { useGetMembers } from '@/features/workspaces/members/api/use-get-members'
import UserItem from './user-item'
import { useCreateChannelModal } from '@/features/workspaces/channels/use-create-channel-modal'
import { useChannelId } from '@/app/hooks/use-channel-id'
import { useGetMember } from '@/features/workspaces/members/api/use-get-member'
import { useMemberId } from '@/app/hooks/use-member-id'
import { useCurrentMember } from '@/features/workspaces/members/api/use-current-member'
import { Loading } from '@/components/auth/loading'

type Props = {}

const ChatOrganizationSidebarButtons = (props: Props) => {
    const workspaceId = useWorkspaceId();
    const channelId = useChannelId();

    const [_open, setOpen] = useCreateChannelModal();

    const {data: channels, isLoading: channelIsLoading} = useGetChannels({workspaceId});
    const {data: members, isLoading: membersIsLoading} = useGetMembers({workspaceId});
    const {data: member, isLoading: memberLoading} = useCurrentMember({workspaceId});

    if(memberLoading || !member){
        return (
            <Loading/>
        )
    }

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
            active={false}
        />
        <SidebarItem
            label="Activity"
            icon={BellRing}
            channelId="activity"
            active={false}
        />
        </div>
        <WorkspaceSection
            label="Channels"
            hint="New channel"
            onNew={() => setOpen(true)}
        >
            {channels?.map((item) => (
                <SidebarItem
                key={item._id}
                label={item.name}
                icon={Hash}
                channelId={item._id}
                active={channelId === item._id}
                />
            ))}
        </WorkspaceSection>

        <WorkspaceSection
            label="DM's"
            hint="New message"
            onNew={() => {}}
        >
            {members?.map((item) => (
                <UserItem
                    key={item._id}
                    id={item._id}
                    label={item.user.name}
                    image={item.user.image}
                />
            ))}
        </WorkspaceSection>

      {/* This ensures StatusIndicator is at the bottom */}
      <div className="mt-auto w-full">
        <StatusIndicator id={member._id} memberStatus={member.status} />
      </div>
    </div>
  )
}

export default ChatOrganizationSidebarButtons