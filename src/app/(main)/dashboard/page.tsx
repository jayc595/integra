"use client";

import { EmptyOrg } from "@/components/empty-org";


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
            {/* Only display EmptyOrg if the user has no organizations. */}
            <EmptyOrg name="Integra"/>
            {/* Display Organizations if user doesn't have one selected. */}

            {/* Display list of features if organization is selected. */}
            
        </div>
    );
};

export default DashboardPage;