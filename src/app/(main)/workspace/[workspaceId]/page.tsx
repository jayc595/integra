"use client"

import { useApplicationName } from '@/app/hooks/use-application-name';
import { useWorkspaceId } from '@/app/hooks/use-workspace-id';
import React from 'react'


const WorkspaceIdPage = () => {
  const workspaceId = useWorkspaceId();
  return (
    <div>
      <p>ID: {workspaceId}</p>
    </div>
    // Idea of this page would be to provide all the details about the workspace:
    // Members of the workspace (ability to kick a user from a workspace etc)
  )
}

export default WorkspaceIdPage