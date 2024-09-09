import { Button } from "@/components/ui/button";
import { FaCaretDown } from "react-icons/fa";

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
    return(
        <div className="flex flex-col mt-3 px-2">
            <div className="flex items-center px-3.5 group">
                <Button variant="ghost" className="p-0.5 text-sm shrink-0 size-6">
                    <FaCaretDown className="size-4"/>
                </Button>
                <Button variant="ghost" size="sm" className="group px-1.5 text-sm h-[28px] justify-start overflow-hidden items-center">
                    <span className="truncate">{label}</span>
                </Button>
            </div>
            {children}
        </div>
    )
}