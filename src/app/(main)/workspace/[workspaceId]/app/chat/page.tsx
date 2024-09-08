"use client"
import { useApplicationName } from '@/app/hooks/use-application-name'
import { useWorkspaceId } from '@/app/hooks/use-workspace-id'
import React from 'react'

type Props = {}

const ChatPage = (props: Props) => {
    const applicationName = useApplicationName();
    const workspaceId = useWorkspaceId();
  return (
    <div>
        <p>App name: {applicationName}</p>
        <p>workspace id: {workspaceId}</p>
    </div>
  )
}

export default ChatPage