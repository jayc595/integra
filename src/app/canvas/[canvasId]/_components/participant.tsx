"use client";

import { useOthers, useSelf } from "../../../../../liveblocks.config";
import { UserAvatar } from "./user-avatar";
import { connectionIdToColourMaping } from "@/lib/utils";

//@TODO: change MAX_SHOWN_USERS depending on screen size.
const MAX_SHOWN__OTHER_USERS = 2;

export const Participant = () => {
    const users = useOthers();
    const currentUser = useSelf();

    const hasMoreUsers = users.length > MAX_SHOWN__OTHER_USERS;

    return(
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            <div className="flex gap-x-2">
                {users.slice(0, MAX_SHOWN__OTHER_USERS).map(({ connectionId, info
                    }) => {
                        return(
                            <UserAvatar borderColor={connectionIdToColourMaping(connectionId)} key={connectionId} src={info?.picture} name={info?.name} fallback={info?.name?.[0] || "A"}></UserAvatar>
                        )
                })}

                {currentUser && (
                    <UserAvatar borderColor={connectionIdToColourMaping(currentUser.connectionId)} src={currentUser.info?.picture} name={`${currentUser.info?.name} (You)`} fallback={currentUser.info?.name?.[0]}></UserAvatar>
                )}

                {hasMoreUsers && (
                    <UserAvatar name={`${users.length - MAX_SHOWN__OTHER_USERS} more`} fallback={`+${users.length - MAX_SHOWN__OTHER_USERS}`}></UserAvatar>
                )}
            </div>
        </div>
    )
}

Participant.Skeleton = function ParticipantSkeleton(){
    return(
        <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]">
        </div>
    )
}