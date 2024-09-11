import { useQuery} from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetInfoWorkspaceProps{
    id: Id<"workspaces">;
}

export const useGetInfoWorkspace = ({ id }: useGetInfoWorkspaceProps) => {
    const data = useQuery(api.workspaces.getInfoById, { id });
    const isLoading = data === undefined;

    return { data, isLoading };
};