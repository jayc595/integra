import { Sidebar } from "@/components/navigation/sidebar";
import { OrgSidebar } from "@/components/navigation/organization-sidebar";
import { Navbar } from "@/components/navigation/navbar";



interface DashboardLayoutProps {
    children: React.ReactNode;
}

const BoardDashboardLayout = ({
    children, 
}: DashboardLayoutProps) => {
    return (
        <main className="h-full">
            <Sidebar></Sidebar>
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
    )
}

export default BoardDashboardLayout;