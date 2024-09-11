"use client";

import { InviteButton } from "./invite-button";
import { SearchInput } from "./search-input";
import { Book, Headphones, Settings } from "lucide-react";
import { Hint } from "../hint";
import UserButton from "./user-button";
import WorkspaceSwitcher from "./workspace-switcher";
import { useWorkspaceId } from "@/app/hooks/use-workspace-id";
import { useCurrentMember } from "@/features/workspaces/members/api/use-current-member";

export const Navbar = () => {
    const workspaceId = useWorkspaceId();
    // Only call useCurrentMember if workspaceId exists
    const { data: member, isLoading: memberLoading } = workspaceId 
        ? useCurrentMember({ workspaceId }) 
        : { data: null, isLoading: true };
    
    return (
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput/>
            </div>
            <div className="block lg:hidden flex-1">
            <WorkspaceSwitcher/>
            </div>
            {workspaceId && (<InviteButton />)}
            {workspaceId && member?.role === "admin" && (
                <Hint label="Workspace settings" side="bottom" align="center" sideOffset={2}>
                    <Settings/>
                </Hint>
            )}
            <Hint label="Guide" side="bottom" align="center" sideOffset={2}>
                <Book/>
            </Hint>
            <Hint label="Contact support" side="bottom" align="center" sideOffset={2}>
                <Headphones/>
            </Hint> 
            <UserButton/>
        </div>
    );
};