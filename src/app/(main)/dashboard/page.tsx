"use client";

import { Loading } from "@/components/auth/loading";
import { EmptyOrg } from "@/components/empty-org";
import WorkspaceCard from "@/components/workspace-card";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useWorkspace } from "@/features/workspaces/workspace-context";


interface DashboardPageProps {
    searchParams: {
        search?: string;
        favourites?: string;
    };
};

const DashboardPage = ({
    searchParams,
}: DashboardPageProps) => {
    const { data, isLoading } = useGetWorkspaces();
    const { workspaceId, setWorkspaceId, setWorkspaceName } = useWorkspace();

    const organization = false;
    // const { organization } = useOrganization();

    if(isLoading){
        //replace with skeleton loader.
        return <Loading/>
    }

    //User hasn't created a workspace yet.
    if(data === undefined || !data?.length) return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            <EmptyOrg name="Integra"/>
        </div>
    );

    if(data?.length && !workspaceId) return (
        <div>Choose an Existing Workspace
            <div className="pl-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-5 mt-8 pb-10">
                {data?.map((mem) => (
                    <WorkspaceCard
                        name={mem.name}
                        isDefault={false}
                    />
                ))}
            </div>
        </div>
    );



    return (
        <div>Workspace selected</div>
    );
};

export default DashboardPage;