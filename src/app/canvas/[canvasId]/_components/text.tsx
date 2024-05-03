import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { TextLayer } from "../../../../../types/canvas";
import { cn, colourToCss } from "@/lib/utils";
import { useMutation } from "../../../../../liveblocks.config";

const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.5;
    const fontSizeBasedOnHeight = height * scaleFactor;
    const fontSizeBasedOnWidth = width * scaleFactor;

    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize)
}

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColour?: string;
}

export const Text = ({
    id,
    layer,
    onPointerDown,
    selectionColour
}: TextProps) => {
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
        <foreignObject x={x} y={y} width={width} height={height} onPointerDown={(e) => onPointerDown(e, id)} style={{outline: selectionColour ? `1px solid ${selectionColour}` : "none"}}>
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn("h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none")}
                style={{fontSize: calculateFontSize(width, height), color: fill ? colourToCss(fill) : "#000"}}
            />
        </foreignObject>
    );
};