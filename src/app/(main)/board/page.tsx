"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "../../../components/empty-org";
import { CanvasList } from "./_components/canvas-list";

interface BoardPageProps {
    searchParams: {
        search?: string;
        favourites?: string;
    };
};

const BoardPage = ({
    searchParams,
}: BoardPageProps) => {
    const { organization } = true;

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {!organization ? (
                <EmptyOrg name="Integra Board"/> )
                : (
                    <CanvasList
                        orgId={organization.id}
                        query={searchParams}
                    />
                    
                )
        }
            
        </div>
    );
};

export default BoardPage;