"use client";

import BoardOrganizationSidebarButtons from "@/app/(main)/board/_components/organization-sidebar-buttons";
import FlowOrganizationSidebarButtons from "@/app/(main)/flow/_components/flow-organization-sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

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

    if (pathname.includes('/board')) {
        sidebarButtons = <BoardOrganizationSidebarButtons favourites={favourites}/>;
    } else if (pathname.includes('/flow')) {
        sidebarButtons = <FlowOrganizationSidebarButtons />;
    }

    //@TODO: We are no longer using Clerk - we need to add Organizations to Convex Auth.
    return(<div></div>);

    return (
        <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
            <Link href="/">
                <div className="flex items-center gap-x-2">
                    {/* <Image src="/logo.svg" alt="Logo" width={60} height={60}>

                    </Image> */}
                    <span className={cn(
                        "font-semibold text-1xl",
                        font.className
                    )}>
                        Integra.
                    </span>
                </div>
            </Link>
            <OrganizationSwitcher 
                hidePersonal
                appearance={{
                    elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #E5E7EB",
                            justifyContent: "space-between",
                            backgroundColor: "white",
                        }
                    }
                }}
            />
            {sidebarButtons}
        </div>
    )
}