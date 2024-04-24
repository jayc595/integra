import { Sidebar } from "@/components/navigation/sidebar";
import { OrgSidebar } from "@/components/navigation/organization-sidebar";
import { Navbar } from "@/components/navigation/navbar";



interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({
    children, 
}: MainLayoutProps) => {
    return (
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
    )
}

export default MainLayout;