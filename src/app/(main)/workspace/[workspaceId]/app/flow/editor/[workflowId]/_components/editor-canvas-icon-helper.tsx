'use client'
import React from 'react'
import {
  Calendar,
  CircuitBoard,
  Database,
  GitBranch,
  HardDrive,
  Mail,
  MousePointerClickIcon,
  Plus,
  Slack,
  Timer,
  Webhook,
  Zap,
} from 'lucide-react'
import { WorkflowEditorCanvasTypes } from '@/lib/types'

type Props = { type: WorkflowEditorCanvasTypes }

const EditorCanvasIconHelper = ({ type }: Props) => {
  switch (type) {
    case 'Email':
      return (
        <Mail
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Condition':
      return (
        <GitBranch
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'AI':
      return (
        <CircuitBoard
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Google Drive':
      return (
        <HardDrive
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Notion':
      return (
        <Database
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Trigger':
      return (
        <MousePointerClickIcon
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Action':
      return (
        <Zap
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Wait':
      return (
        <Timer
          className="flex-shrink-0"
          size={30}
        />
      )
    default:
      return (
        <Zap
          className="flex-shrink-0"
          size={30}
        />
      )
  }
}

export default EditorCanvasIconHelper