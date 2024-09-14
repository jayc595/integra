import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import React, { useState } from 'react'
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface EmojiPopupProps {
    children: React.ReactNode;
    hint?: string;
    onEmojiSelect: (emoji: any) => void;
}

const EmojiPopup = ({
    children,
    hint = "Emoji",
    onEmojiSelect
}: EmojiPopupProps) => {
    const [popupOpen, setPopupOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const onSelect = (emoji: any) => {
        onEmojiSelect(emoji);
        setPopupOpen(false);

        setTimeout(() => {
            setTooltipOpen(false);
        }, 500);
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
            <PopoverContent className='p-0 w-full border-none shadow-none'>
                <Picker data={data} onEmojiSelect={onSelect}/>
            </PopoverContent>
        </Popover>
    </TooltipProvider>
  )
}

export default EmojiPopup