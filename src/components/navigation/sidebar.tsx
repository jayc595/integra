import { Blocks, Home, Presentation } from "lucide-react";
import { List } from "./sidebar/list";
import { NewButton } from "./sidebar/new-button";
import { Hint } from "../hint";
import { Separator } from "@/components/ui/separator"
import Link from "next/link";


export const Sidebar = () => {
    return (
        <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[60px] flex flex-col p-3 gap-y-4 text-white">
            <List />
            <NewButton />
            <div className="flex-grow">
                {/* Empty space to push content to the bottom */}
            </div>
            <Separator/>
            <div className="aspect-square">
                <Hint label="Flow" side="right" align="start" sideOffset={18}>
                <Link href={"/flow"}>
                    <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                        <Blocks className="text-white"/>
                    </button>
                </Link>
                    
                </Hint>
            </div>
            <div className="aspect-square">
                <Hint label="Board" side="right" align="start" sideOffset={18}>
                <Link href={"/board"}>
                    <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                        <Presentation className="text-white"/>
                    </button>
                </Link>
                    
                </Hint>
            </div>
            <div className="aspect-square">
                <Hint label="Dashboard" side="right" align="start" sideOffset={18}>
                    <Link href={"/dashboard"}>
                        <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                            <Home className="text-white"/>
                        </button>
                    </Link>
                    
                </Hint>
                
            </div>
            {/* Add additional items below the Hint component */}
        </aside>
    );
};
