import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ConnectionTypes } from '@/lib/types'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {
    type: ConnectionTypes;
    icon: string;
    title: ConnectionTypes;
    description: string;
    callback?: () => void;
    connected: {} & any;
}

const ConnectionCard = ({
    type,
    icon,
    title,
    description,
    connected
} : Props) => {
  return (
    <Card className='flex w-full items-center justify-between'>
        <CardHeader className='flex flex-row gap-4'>
            <div className='flex flex-row gap-2'>
                <Image
                    src={icon}
                    alt={title}
                    height={30}
                    width={30}
                    className='object-contain'
                />
            </div>
            <div className='pl-4'>
                <CardTitle className='text-lg'>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </div>
        </CardHeader>
        <div className="flex flex-col items-center gap-2 p-4">
            <Link href={''} className='rounded-lg bg-primary p-2 font-bold text-primary-foreground'>Connect</Link>
        </div>
    </Card>
  )
}

export default ConnectionCard
