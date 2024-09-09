import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '@/app/hooks/use-workspace-id';
import { useApplicationName } from '@/app/hooks/use-application-name';

type Props = {}

const WorkspaceSwitcher = (props: Props) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { data } = useGetWorkspaces();
    const applicationName = useApplicationName();

    if (data === undefined || !data.length) return null;

    const handleWorkspaceChange = (value: string) => {
        const selectedWorkspace = data.find(workspace => workspace._id === value);
        //TODO: seperate into reuseable function.
        if (selectedWorkspace) {
            if(!applicationName){
                router.push(`/workspace/${selectedWorkspace._id}`);
                return;
            }

            router.push(`/workspace/${selectedWorkspace._id}/app/${applicationName}`);
        }
    };

    return (
        <Select value={workspaceId} onValueChange={handleWorkspaceChange}>
            <SelectTrigger className='focus:ring-0 focus:ring-offset-0 focus:border-input'>
                <SelectValue placeholder="Select a Workspace" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Workspaces</SelectLabel>
                    {data.map((workspace) => (
                        <SelectItem key={workspace._id} value={workspace._id}>
                            {workspace.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default WorkspaceSwitcher;
