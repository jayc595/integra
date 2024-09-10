import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { useToggle } from "react-use";

interface WorkspaceSectionProps {
    children: React.ReactNode;
    label: string;
    hint: string;
    onNew?: () => void;
};

export const WorkspaceSection = ({
    children,
    label,
    hint,
    onNew
}: WorkspaceSectionProps) => {
    const [on, toggle] = useToggle(true)

    return(
        <div className="flex flex-col mt-3 px-2">
            <div className="flex items-center px-3.5 group">
                <Button variant="ghost" className="p-0.5 text-sm shrink-0 size-6" onClick={toggle}>
                    <FaCaretDown className={cn("size-4 transition-transform", on && "-rotate-90")}/>
                </Button>
                <Button variant="ghost" size="sm" className="group px-1.5 text-sm h-[28px] justify-start overflow-hidden items-center">
                    <span className="truncate">{label}</span>
                </Button>
                {onNew && (
                    <Hint label={hint}>
                        <Button onClick={onNew} variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5">
                            <PlusIcon className="size-5"></PlusIcon>
                        </Button>
                    </Hint>
                )}
            </div>
            {!on && children}
        </div>
    )
}