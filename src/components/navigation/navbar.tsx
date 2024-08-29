"use client";

import { InviteButton } from "./invite-button";
import { SearchInput } from "./search-input";
import { Book, Headphones } from "lucide-react";
import { Hint } from "../hint";
import UserButton from "./user-button";
import WorkspaceSwitcher from "./workspace-switcher";

export const Navbar = () => {
    const organization = true;

    return (
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput/>
            </div>
            <div className="block lg:hidden flex-1">
            <WorkspaceSwitcher/>
            </div>
            {organization && (<InviteButton/>)}
            <Hint label="Guide" side="bottom" align="center" sideOffset={2}>
                <Book/>
            </Hint>
            <Hint label="Contact support" side="bottom" align="center" sideOffset={2}>
                <Headphones/>
            </Hint> 
            <UserButton />
        </div>
    );
};