"use client";

import { useChannelId } from '@/app/hooks/use-channel-id';
import { Loading } from '@/components/auth/loading';
import { useGetChannel } from '@/features/workspaces/channels/api/use-get-channel';
import { TriangleAlert } from 'lucide-react';
import React from 'react'
import ChatInput from '../../channel/[channelId]/_components/chat-input';
import Header from '../../channel/[channelId]/_components/header';
import { useGetMember } from '@/features/workspaces/members/api/use-get-member';
import { useMemberId } from '@/app/hooks/use-member-id';

type Props = {}

const MemberPage = (props: Props) => {
    const memberId = useMemberId();
    const { data: member, isLoading: memberLoading } = useGetMember({ id: memberId });

    if(memberLoading){
        return(
            <Loading/>
        )
    }

    if(!member){
        return(
            <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                <TriangleAlert className='size-6 text-muted-foreground'/>
                <span className='text-sm text-muted-foreground'>Channel not found</span>
            </div>
        )
    }

  return (
    // @TODO: fix the below styling.
    <div className='flex flex-col h-[93%]'>
        <Header channelName={member.userId}/>
        <div className='flex-1'/>
        <ChatInput placeholder=''/>
    </div>
  )
}

export default MemberPage