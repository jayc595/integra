"use client";

import { CONNECTIONS } from "@/lib/consts";
import { useOrganization } from "@clerk/nextjs";
import ConnectionCard from "./_components/connection-card";


interface FlowConnectionsPageProps {
    searchParams: {
        search?: string;
        favourites?: string;
    };
};

const FlowConnectionsPage = ({
    searchParams,
}: FlowConnectionsPageProps) => {
    const { organization } = useOrganization();

    return (
        <div className="flex-1 h-[calc(100%-80px)] p-6">
            <h2 className="text-3xl">
                Connections
            </h2>
            <div className='relative flex flex-col gap-4'>
                <section className='flex flex-col gap-4 pt-6 text-muted-foreground'>
                    {CONNECTIONS.map((connection) => (
                        <ConnectionCard 
                            type={connection.title}
                            title={connection.title}
                            description={connection.description}
                            icon={connection.image}
                            key={connection.title}
                            connected={true}
                        />
                    ))}
                </section>
                </div>
                
        </div>
    );
};

export default FlowConnectionsPage;