import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { StickyNoteLayer } from "../../../../../../../../../../types/canvas";
import { cn, colourToCss, getContrastingTextColour } from "@/lib/utils";
import { useMutation } from "../../../../../../../../../../liveblocks.config";

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.15;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;

    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize)
}

interface StickyNoteProps {
    id: string;
    layer: StickyNoteLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColour?: string;
}

export const StickyNote = ({
    id,
    layer,
    onPointerDown,
    selectionColour
}: StickyNoteProps) => {
    const { x, y, width, height, fill, value } = layer;

    const updateTextValue = useMutation((
        { storage },
        newValue: string
    ) => {
        const liveLayers = storage.get("layers");
        liveLayers.get(id)?.set("value", newValue);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateTextValue(e.target.value)
    }

    return(
        <foreignObject 
            x={x} y={y} width={width} height={height} onPointerDown={(e) => onPointerDown(e, id)} 
            style={{outline: selectionColour ? `1px solid ${selectionColour}` : "none", backgroundColor: fill ? colourToCss(fill) : "#000"}}
            className="drop-shadow-xl shadow-md"
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn("h-full w-full flex items-center justify-center text-center outline-none")}
                style={{fontSize: calculateFontSize(width, height), color: fill ? getContrastingTextColour(fill) : "#000"}}
            />
        </foreignObject>
    );
};