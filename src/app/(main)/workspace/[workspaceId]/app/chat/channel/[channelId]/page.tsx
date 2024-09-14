"use client";

import { useChannelId } from '@/app/hooks/use-channel-id';
import { Loading } from '@/components/auth/loading';
import { useGetChannel } from '@/features/workspaces/channels/api/use-get-channel';
import { TriangleAlert } from 'lucide-react';
import React from 'react'
import Header from './_components/header';
import ChatInput from './_components/chat-input';

type Props = {}

const ChannelPage = (props: Props) => {
    const channelId = useChannelId();
    const { data: channel, isLoading: channelLoading } = useGetChannel({ id: channelId });

    if(channelLoading){
        return(
            <Loading/>
        )
    }

    if(!channel){
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
        <Header channelName={channel.name}/>
        <div className='flex-1'/>
        <ChatInput placeholder={`Message #${channel.name}`}/>
    </div>
  )
}

export default ChannelPage