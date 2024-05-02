import { useMutation, useSelf } from "../liveblocks.config"
import { Colour } from "../types/canvas";

export const setFillColour = (setLastUsedColour?: ((fill: Colour) => void) | null) => {
    const selection = useSelf((me) => me.presence.selection);
    
    return useMutation((
        { storage },
        fill: Colour
    ) => {
        const liveLayers = storage.get("layers");
        if (setLastUsedColour) {
            setLastUsedColour(fill);
        }

        selection.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill);
        });
    }, [
        selection, 
        setLastUsedColour
    ]);
}
