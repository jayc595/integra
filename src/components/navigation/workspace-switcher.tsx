import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces';

type Props = {}

const WorkspaceSwitcher = (props: Props) => {
    const { data } = useGetWorkspaces();

    if(data === undefined) return null;

    if(!data?.length) return null;

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a Workspace" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Workspaces</SelectLabel>
          {data?.map((mem) => (
                <SelectItem value={mem._id}>{mem.name}</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default WorkspaceSwitcher