import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '@/app/hooks/use-workspace-id';

type Props = {}

const WorkspaceSwitcher = (props: Props) => {
    const router = useRouter();
    const worspaceId = useWorkspaceId();
    const { data } = useGetWorkspaces();

    if (data === undefined || !data.length) return null;

    const handleWorkspaceChange = (value: string) => {
        const selectedWorkspace = data.find(workspace => workspace._id === value);
        if (selectedWorkspace) {
            router.push(`/workspace/${selectedWorkspace._id}`);
        }
    };

    return (
        <Select value={worspaceId} onValueChange={handleWorkspaceChange}>
            <SelectTrigger>
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
