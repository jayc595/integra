import { WorkflowEditorCanvasCardType } from '@/lib/types'
import React, { useMemo } from 'react'
import { useEditor } from '../../../../../../../providers/editor-provider'
import { Position, useNodeId } from 'reactflow'
import EditorCanvasIconHelper from './editor-canvas-icon-helper'
import CustomHandle from './custom-handle'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

const EditorCanvasCardSingle = ({ data }: { data: WorkflowEditorCanvasCardType }) => {
    const { dispatch, state } = useEditor()
    const nodeId = useNodeId()
    const logo = useMemo(() => {
        return <EditorCanvasIconHelper type={data.type} />
    }, [data])
  return (
    <>
        {data.type !== "Trigger" && data.type !== "Google Drive" && (
            <CustomHandle
                type="target"
                position={Position.Top}
                style={{ zIndex: 100 }}
            />
        )}
        <Card
                    // onClick={(e) => {
                    //     console.log("card clicked");
                    //     e.stopPropagation();
                    //     const val = state.editor.elements.find((n) => n.id === nodeId);
                    //     if(val){
                    //         dispatch({
                    //             type: "SELECTED_ELEMENT",
                    //             payload: {
                    //                 element: val,
                    //             },
                    //         });
                    //     }
                    // }}
                    className='relative max-w-[400px] dark:border-muted-forground/70'
                >
                    <CardHeader className='flex flex-row items-center gap-4'>
                        <div>{logo}</div>
                        <div>
                            <CardTitle className='text-md'>{data.title}</CardTitle>
                            <CardDescription>
                                <p className='text-xs text-muted-foreground/50'>
                                    <b className='text-muted-foreground80'>ID:</b>
                                    {nodeId}
                                </p>
                                <p>{data.description}</p>
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <Badge variant="secondary" className='absolute right2 top-2'>
                        {data.type}
                    </Badge>
                </Card>
        
                
        <CustomHandle
            type="source"
            position={Position.Bottom}
            id="a"
        />
    </>
  )
}

export default EditorCanvasCardSingle
