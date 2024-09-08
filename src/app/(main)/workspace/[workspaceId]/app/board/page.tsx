"use client";

import { CanvasList } from "./_components/canvas-list";
import { EmptyOrg } from "@/components/empty-org";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";

interface BoardPageProps {
    searchParams: {
        search?: string;
        favourites?: string;
    };
};

const BoardPage = ({
    searchParams,
}: BoardPageProps) => {
    const workspaceId = useWorkspaceId();

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            {!workspaceId ? (
                <EmptyOrg name="Integra Board"/> )
                : (
                    <CanvasList
                        orgId={workspaceId}
                        query={searchParams}
                    />
                    
                )
        }
            
        </div>
    );
};

export default BoardPage;