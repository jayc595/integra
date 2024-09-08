"use client";

import { useWorkspace } from "@/features/workspaces/workspace-context";
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
    const { workspaceId} = useWorkspace();

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