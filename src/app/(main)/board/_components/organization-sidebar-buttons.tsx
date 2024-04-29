import { Button } from '@/components/ui/button'
import { LayoutDashboard, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type BoardOrganizationSidebarButtonsProps = {
    favourites?: string;
}

const BoardOrganizationSidebarButtons = ({
    favourites
}: BoardOrganizationSidebarButtonsProps) => {
  return (
    <div className="space-y-1 w-full">
                <Button variant={favourites ? "ghost" : "secondary"} asChild size="lg" className="font-normal justify-start px-2 w-full">
                    <Link href="/board">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Team Canvas
                    </Link>
                </Button>
                <Button variant={favourites ? "secondary" : "ghost"} asChild size="lg" className="font-normal justify-start px-2 w-full">
                    <Link href={{
                        pathname: "/board",
                        query: { favourites: true }
                    }}>
                        <Star className="h-4 w-4 mr-2" />
                        Favourite Canvas
                    </Link>
                </Button>
            </div>
  )
}

export default BoardOrganizationSidebarButtons
