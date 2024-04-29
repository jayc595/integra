import { Button } from '@/components/ui/button'
import { Boxes, Cable, LayoutDashboard, Scroll, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useSearchParams, usePathname } from "next/navigation";


const FlowOrganizationSidebarButtons = () => {
    const pathname = usePathname()
  return (
    <div className="space-y-1 w-full">
                <Button variant={pathname === "/flow" ? "secondary" : "ghost"} asChild size="lg" className="font-normal justify-start px-2 w-full">
                    <Link href="/flow">
                        <Boxes className="h-4 w-4 mr-2" />
                        Workflows
                    </Link>
                </Button>
                <Button variant={pathname === "/flow/connections" ? "secondary" : "ghost"} asChild size="lg" className="font-normal justify-start px-2 w-full">
                    <Link href="/flow/connections">
                        <Cable className="h-4 w-4 mr-2" />
                        Connections
                    </Link>
                </Button>
                <Button variant={pathname === "/flow/templates" ? "secondary" : "ghost"} asChild size="lg" className="font-normal justify-start px-2 w-full">
                    <Link href="/flow/templates">
                        <Scroll className="h-4 w-4 mr-2" />
                        Templates
                    </Link>
                </Button>
            </div>
  )
}

export default FlowOrganizationSidebarButtons
