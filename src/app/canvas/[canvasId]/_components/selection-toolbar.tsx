"use client";

import { memo } from "react";
import { Camera, Colour } from "../../../../../types/canvas";
import { useSelf } from "../../../../../liveblocks.config";
import { useSelectionBounds } from "../../../../../hooks/use-selections-bounds";

interface SelectionToolbarProps {
    camera: Camera;
    setLastUsedColour: (colour: Colour) => void;
};

export const SelectionToolbar = memo(({
    camera,
    setLastUsedColour
} : SelectionToolbarProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
        return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return(
        <div 
            className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none" 
            style={{
                transform: `translate(calc(${x}px - 50%), 
                calc(${y - 16}px - 100%)
            )`
        }}>
            In progress selection toolbar
            {/* @TODO - add colour picker */}
        </div>
    )
})

SelectionToolbar.displayName = "SelectionToolbar";