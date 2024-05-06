"use client";
import { usePathname } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useNodeConnections } from '../../../../../../../providers/connections-provider'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { onCreateNodesEdges, onFlowPublish } from '../_actions/workflow-connections';
import { Settings } from 'lucide-react';
import { Hint } from '@/components/hint';

type FlowInstanceProps = {
    children: React.ReactNode
    edges: any[]
    nodes: any[]
}

const FlowInstance = ({
    children,
    edges,
    nodes
}: FlowInstanceProps) => {
    const pathname = usePathname()
    const [isFlow, setIsFlow] = useState([])
    const { nodeConnection } = useNodeConnections()

    const onFlowAutomation = useCallback(async () => {
        const flow = await onCreateNodesEdges(
            pathname.split('/').pop()!,
            JSON.stringify(nodes),
            JSON.stringify(edges),
            JSON.stringify(isFlow)
        )

        if(flow) toast.message(flow.message)
    }, [])

    const onPublishWorkflow = useCallback(async () => {
        const response = await onFlowPublish(pathname.split('/').pop()!, true)
        if (response) toast.message(response)
      }, [])

  return (
    <div className='flex flex-col gap-2'>
        <div className='flex gap-3 p-4'>
            <Button onClick={onFlowAutomation} disabled={isFlow.length < 1}>
                Save & Execute
            </Button>
            <Button onClick={onPublishWorkflow} disabled={isFlow.length < 1}>
                Save
            </Button>
            <div className='flex mt-2 flex-grow justify-end'>
                <Hint label='Workflow settings'>
                    {/* @TODO - we should show additional settings here i.e (timezones, cron setup etc.) */}
                    <Settings />
                </Hint>
            </div>
        </div>
      {children}
    </div>
  )
}

export default FlowInstance
