import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { LayoutDashboard, ListFilter, SquarePen, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import StatusIndicator from './status-indicator'
import { Hint } from '@/components/hint'

type Props = {}

const ChatOrganizationSidebarButtons = (props: Props) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="space-y-1">
        <div className='flex justify-between items-center gap-0.5 mt-2 mb-2 pr-2 pl-5'>
            <p className='bold'>Chat</p>
            <div className="flex gap-1">
                <Hint label='Filter'>
                    <Button variant="ghost" size="icon">
                        <ListFilter className='h-4 w-4' />
                    </Button>
                </Hint>
                <Hint label='Compose message'>
                    <Button variant="ghost" size="icon">
                        <SquarePen className='h-4 w-4' />
                    </Button>
                </Hint>
            </div>
        </div>
        <Separator/>
        <Button variant="ghost" asChild size="lg" className="font-normal justify-start px-2 w-full pr-2 pl-5">
          <Link href="/board">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Home
          </Link>
        </Button>
        <Button variant="ghost" asChild size="lg" className="font-normal justify-start px-2 w-full pr-2 pl-5">
          <Link href={{
            pathname: "/board",
            query: { favourites: true }
          }}>
            <Star className="h-4 w-4 mr-2" />
            DM's
          </Link>
        </Button>
        <Button variant="ghost" asChild size="lg" className="font-normal justify-start px-2 w-full pr-2 pl-5">
          <Link href={{
            pathname: "/board",
            query: { favourites: true }
          }}>
            <Star className="h-4 w-4 mr-2" />
            Activity
          </Link>
        </Button>
      </div>

      {/* This ensures StatusIndicator is at the bottom */}
      <div className="mt-auto w-full">
        <StatusIndicator/>
      </div>
    </div>
  )
}

export default ChatOrganizationSidebarButtons