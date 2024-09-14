import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'

// Mock data for users to replace with db.
const users = [
    { id: 1, name: 'Alice Johnson', username: 'alice', avatar: '/placeholder.svg?height=32&width=32' },
    { id: 2, name: 'Bob Smith', username: 'bob', avatar: '/placeholder.svg?height=32&width=32' },
    { id: 3, name: 'Charlie Brown', username: 'charlie', avatar: '/placeholder.svg?height=32&width=32' },
    { id: 4, name: 'Diana Prince', username: 'diana', avatar: '/placeholder.svg?height=32&width=32' },
    { id: 5, name: 'Ethan Hunt', username: 'ethan', avatar: '/placeholder.svg?height=32&width=32' },
]

interface MentionPopupProps {
    children: React.ReactNode;
    hint?: string;
    onMentionSelect: (user: any) => void;
}

export default function MentionPopup({
    children,
    hint = "User",
    onMentionSelect,
}: MentionPopupProps) {
    const [popupOpen, setPopupOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [search, setSearch] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
    )

    const handleSelect = (user: any) => {
        setSelectedUser(user);
        onMentionSelect(user);
        setPopupOpen(false);

        setTimeout(() => {
            setTooltipOpen(false);
        }, 500);
        // Here you would typically update the chat input with the @mention
    }

    return (
        <TooltipProvider>
            <Popover open={popupOpen} onOpenChange={setPopupOpen}>
                <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={50}>
                    <PopoverTrigger asChild>
                        <TooltipTrigger>
                            {children}
                        </TooltipTrigger>
                    </PopoverTrigger>
                    <TooltipContent className='bg-black text-white border border-white/5'>
                        <p className='font-medium text-xs'>{hint}</p>
                    </TooltipContent>
                </Tooltip>
                <PopoverContent className='p-0 w-full border shadow-none'>
                    <div className="p-4 space-y-2">
                        <Input
                            type="text"
                            placeholder="Search members..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Separator />
                    </div>
                    <ul className="max-h-[300px] overflow-auto">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <li
                                    key={user.id}
                                    className="flex items-center space-x-2 p-2 hover:bg-accent cursor-pointer"
                                    onClick={() => handleSelect(user)}
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium leading-none">{user.name}</p>
                                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-center text-sm text-muted-foreground">No users found</li>
                        )}
                    </ul>

                </PopoverContent>
            </Popover>
        </TooltipProvider>
    )
}