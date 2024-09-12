import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrashIcon } from 'lucide-react';
import React from 'react'
import { FaChevronDown } from 'react-icons/fa';

interface HeaderProps {
    channelName: string;
}

const Header = ({
    channelName
}: HeaderProps) => {
    const channelNameConverted = `# ${channelName}`;

  return (
    <div className='bg-white border-b h-[49px] flex items-center px-4 overflow-hidden'>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='ghost' className='text-lg font-semibold px-2 overflow-hidden w-auto' size="sm">
                    <span className='truncate'>{channelNameConverted}</span>
                    <FaChevronDown className='size-2.5 ml-2'/>
                </Button>
            </DialogTrigger>
            <DialogContent className='p-0 overflow-hidden bg-gray-50'>
                <DialogHeader className='p-4 border-b pb-white'>
                    <DialogTitle>{channelNameConverted}</DialogTitle>
                </DialogHeader>
                <div className='px-4 pb-4 flex flex-col gap-y-2'>
                    <div className='px-5 py-4 bg-white rounded-lg border cursor-pointed hover:bg-gray-50'>
                        <div className='flex items-center justify-between'>
                            <p className='text-sm font-semibold'>Channel Name</p>
                            <p className='text-sm text-[#1264a3] hover:underline font-semibold'>Edit</p>
                        </div>
                        <p className='text-sm'>{channelNameConverted}</p>
                    </div>
                    <button className='flex items-center gap-x-2 px-2 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600'>
                        <TrashIcon className='size-4'/>
                        <p className='text-sm font-semibold'>Delete Channel</p>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
        
    </div>
  )
}

export default Header