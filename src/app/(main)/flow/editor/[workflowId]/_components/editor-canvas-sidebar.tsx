"use client";
import { WorkflowEditorCanvasTypes, WorkflowEditorNodeType } from '@/lib/types';
import React from 'react'
import { useEditor } from '../../../../../../../providers/editor-provider';
import { useNodeConnections } from '../../../../../../../providers/connections-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EditorCanvasDefaultCardTypes } from '@/lib/consts';
import EditorCanvasIconHelper from './editor-canvas-icon-helper';
import { onDragStart } from '@/lib/flow-editor-utils';

type EditorCanvasSidebarProps = {
    nodes: WorkflowEditorNodeType[]
}

const EditorCanvasSidebar = ({
    nodes
}: EditorCanvasSidebarProps) => {
    const { state } = useEditor()
    const { nodeConnection } = useNodeConnections()

  return (
    <aside>
        <Tabs
            defaultValue="actions"
            className='h-[93vh] overflow-scroll pb-24'
        >
            <TabsList>
                <TabsTrigger value="actions">Actions</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <Separator/>
            <TabsContent
          value="actions"
          className="flex flex-col gap-4 p-4"
        >
          {Object.entries(EditorCanvasDefaultCardTypes)
            .filter(
              ([_, cardType]) =>
                (!nodes.length && cardType.type === 'Trigger') ||
                (nodes.length && cardType.type === 'Action')
            )
            .map(([cardKey, cardValue]) => (
              <Card
                key={cardKey}
                draggable
                className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                onDragStart={(event) =>
                  onDragStart(event, cardKey as WorkflowEditorCanvasTypes)
                }
              >
                <CardHeader className="flex flex-row items-center gap-4 p-4">
                  <EditorCanvasIconHelper type={cardKey as WorkflowEditorCanvasTypes} />
                  <CardTitle className="text-md">
                    {cardKey}
                    <CardDescription>{cardValue.description}</CardDescription>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>
        </Tabs>
    </aside>
  )
}

export default EditorCanvasSidebar
