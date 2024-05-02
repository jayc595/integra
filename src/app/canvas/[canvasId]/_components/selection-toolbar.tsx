"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Colour } from "../../../../../types/canvas";
import { useMutation, useSelf } from "../../../../../liveblocks.config";
import { useSelectionBounds } from "../../../../../hooks/use-selections-bounds";
import { ColourPicker } from "./colour-picker";
import { useDeleteLayer } from "../../../../../hooks/use-delete-layer";
import { Hint } from "@/components/hint";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

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

    const setFillColour = useMutation((
        { storage },
        fill: Colour
    ) => {
        const liveLayers = storage.get("layers");
        setLastUsedColour(fill);

        selection.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill);
        })
    }, [
        selection, 
        setLastUsedColour
    ]);

    const deleteLayers = useDeleteLayer();

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
            <ColourPicker onChange={setFillColour}/>
            <div className="flex flex-col gap-y-0.5">
                <Hint label="Bring to font">
                    <Button variant="canvas" size="icon">
                        <BringToFront/>
                    </Button>
                </Hint>
                <Hint label="Send to back" side="bottom">
                    <Button variant="canvas" size="icon">
                        <SendToBack/>
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
                <Hint label="Delete">
                    <Button variant="canvas" size="icon" onClick={deleteLayers}>
                        <Trash2/>
                    </Button>
                </Hint>
            </div>
        </div>
    )
})

SelectionToolbar.displayName = "SelectionToolbar";