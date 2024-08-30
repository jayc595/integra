import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';
import { useWorkspace } from '@/features/workspaces/workspace-context';

type Props = {}

const WorkspaceSwitcher = (props: Props) => {
    const { data } = useGetWorkspaces();
    const { workspaceId, setWorkspaceId, setWorkspaceName } = useWorkspace();

    if (data === undefined || !data.length) return null;

    const handleWorkspaceChange = (value: string) => {
        console.log("Workspace changed to:", value);
        const selectedWorkspace = data.find(workspace => workspace._id === value);
        if (selectedWorkspace) {
            setWorkspaceId(selectedWorkspace._id);
            setWorkspaceName(selectedWorkspace.name);
        }
    };

    return (
        <Select value={workspaceId} onValueChange={handleWorkspaceChange}>
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
