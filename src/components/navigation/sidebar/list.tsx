"use client";

import { Item } from "./item";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

export const List = () => {
    const { data } = useGetWorkspaces();

    if(data === undefined) return null;

    if(!data?.length) return null;

    return (
        <ul className="space-y-4">
            {data?.map((mem) => (
                <Item
                    key={mem._id}
                    id={mem._id}
                    name={mem.name}
                    imageUrl={""}
                />
            ))}
        </ul>
    )
}