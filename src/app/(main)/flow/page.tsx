"use client";

import { useOrganization } from "@clerk/nextjs";


interface FlowPageProps {
    searchParams: {
        search?: string;
        favourites?: string;
    };
};

const FlowPage = ({
    searchParams,
}: FlowPageProps) => {
    const { organization } = useOrganization();

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            Test
            
        </div>
    );
};

export default FlowPage;