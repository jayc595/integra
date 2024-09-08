"use client";

import { Sidebar } from "@/components/navigation/sidebar";
import { OrgSidebar } from "@/components/navigation/organization-sidebar";
import { Navbar } from "@/components/navigation/navbar";
import { WorkspaceProvider } from "@/features/workspaces/workspace-context";
import { usePathname } from "next/navigation";



interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({
    children, 
}: MainLayoutProps) => {
    const pathname = usePathname();

  // Check if the current path is a canvas route and skip the main layout
  if (pathname.includes('/canvas/')) {
    return <>{children}</>;
  }

    return (
        <WorkspaceProvider>
            <main className="h-full">
                <Sidebar/>
                <div className="pl-[60px] h-full">
                    <div className="flex gap-x-3 h-full">
                        <OrgSidebar />
                        <div className="h-full flex-1">
                            <Navbar />
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </WorkspaceProvider>
    )
}

export default MainLayout;