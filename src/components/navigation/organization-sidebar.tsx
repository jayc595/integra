"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import WorkspaceSwitcher from "./workspace-switcher";
import ChatOrganizationSidebarButtons from "@/app/(main)/workspace/[workspaceId]/app/chat/_components/chat-organization-sidebar-buttons";
import BoardOrganizationSidebarButtons from "@/app/(main)/workspace/[workspaceId]/app/board/_components/organization-sidebar-buttons";
import FlowOrganizationSidebarButtons from "@/app/(main)/workspace/[workspaceId]/app/flow/_components/flow-organization-sidebar";
import { Separator } from "../ui/separator";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const OrgSidebar = () => {
    const pathname = usePathname()
    if (pathname.includes('/dashboard')) return null;

    const searchParams = useSearchParams();
    const favourites = searchParams.get("favourites") || "";


    let sidebarButtons = null;

    const pathSegments = pathname.split("/");
    const appName = pathSegments[pathSegments.indexOf("app") + 1]; // Extracts the application name


    switch(appName){
        case 'board':
            sidebarButtons = <BoardOrganizationSidebarButtons favourites={favourites}/>;
            break;
        case 'flow':
            sidebarButtons = <FlowOrganizationSidebarButtons />;
            break;
        case 'chat': 
            sidebarButtons = <ChatOrganizationSidebarButtons />;
            break;
        default:
            //TODO: Add default sidebar buttons, this should be application list.
            sidebarButtons = '';
            break;            
    }

    // if (pathname.includes('app/board')) {
    //     sidebarButtons = <BoardOrganizationSidebarButtons favourites={favourites}/>;
    // } else if (pathname.includes('app/flow')) {
    //     sidebarButtons = <FlowOrganizationSidebarButtons />;
    // } else if(pathname.includes('app/chat')) {

    // }

    return (
        <div className="hidden lg:flex flex-col w-[206px] pt-5 border-r border-gray">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    <Image src="/logo.svg" alt="Logo" width={60} height={60}/>
                    <span className={cn(
                        "font-semibold text-1xl",
                        font.className
                    )}>
                        Integra.
                    </span>
                </div>
            </Link>
            <div className="mt-[10%]">
                <WorkspaceSwitcher/>
            </div>
            
            <Separator className="mt-[10px]"/>
            {sidebarButtons}
        </div>
    )
}