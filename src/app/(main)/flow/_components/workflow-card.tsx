"use client";

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

type Props = {
    title: string;
    createdAt: string;
    updatedAt: string;
    active: boolean;
    workflowUrl: string;
}

const WorkflowCard = ({
    title,
    createdAt,
    updatedAt,
    active,
    workflowUrl
} : Props) => {
    const [isChecked, setChecked] = useState(active)

  return (
    <Link href={''}>
        <Card className='flex w-full items-center justify-between'>
            <CardHeader className='flex flex-col gap-4'>
                <div>
                    <CardTitle className='text-lg'>{title}</CardTitle>
                    <CardDescription>
                        <div className='flex justify-between gap-2 h-[20px]'>
                            Last updated 13 minutes ago
                            <Separator orientation='vertical' className=''/>
                            Created 19th January
                        </div>
                    </CardDescription>
                </div>
            </CardHeader>
            <div className="flex justify-between gap-2 p-4">
                <Label className="pt-1" htmlFor="is-active">{ isChecked ? 'Active' : 'Inactive' } </Label>
                <Switch id="is-active" checked={isChecked} onCheckedChange={setChecked}/>
                <EllipsisVertical/>
            </div>
        </Card>
    </Link>
  )
}

export default WorkflowCard
