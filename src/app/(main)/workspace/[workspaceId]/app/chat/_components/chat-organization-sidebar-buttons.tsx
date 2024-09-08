import { Button } from '@/components/ui/button'
import { LayoutDashboard, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const ChatOrganizationSidebarButtons = (props: Props) => {
  return (
    <div className="space-y-1 w-full">
                <Button variant="ghost" asChild size="lg" className="font-normal justify-start px-2 w-full">
                    <Link href="/board">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Home
                    </Link>
                </Button>
                <Button variant="ghost" asChild size="lg" className="font-normal justify-start px-2 w-full">
                    <Link href={{
                        pathname: "/board",
                        query: { favourites: true }
                    }}>
                        <Star className="h-4 w-4 mr-2" />
                        DM's
                    </Link>
                </Button>
                <Button variant="ghost" asChild size="lg" className="font-normal justify-start px-2 w-full">
                    <Link href={{
                        pathname: "/board",
                        query: { favourites: true }
                    }}>
                        <Star className="h-4 w-4 mr-2" />
                        Activity
                    </Link>
                </Button>
            </div>
  )
}

export default ChatOrganizationSidebarButtons