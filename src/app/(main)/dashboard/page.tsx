"use client";

import { EmptyOrg } from "@/components/empty-org";
import { useOrganization } from "@clerk/nextjs";


interface DashboardPageProps {
    searchParams: {
        search?: string;
        favourites?: string;
    };
};

const DashboardPage = ({
    searchParams,
}: DashboardPageProps) => {
    const organization = false;
    // const { organization } = useOrganization();

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            <EmptyOrg name="Integra"/>
            
        </div>
    );
};

export default DashboardPage;