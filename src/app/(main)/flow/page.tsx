"use client";

import { useOrganization } from "@clerk/nextjs";
import WorkflowCard from "./_components/workflow-card";


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
            <h2 className="text-3xl">
                Workflows
            </h2>
            <div className='relative flex flex-col gap-4'>
                <section className='flex flex-col gap-4 pt-6 text-muted-foreground'>
                <WorkflowCard
                    title="Test Workflow"
                    createdAt="21st April 2024"
                    updatedAt="22nd April 2024"
                    workflowUrl=""
                    active={true}
                />
                <WorkflowCard
                    title="Test Workflow"
                    createdAt="21st April 2024"
                    updatedAt="22nd April 2024"
                    workflowUrl=""
                    active={false}
                />
                </section>
                </div>
                
        </div>
    );
};

export default FlowPage;