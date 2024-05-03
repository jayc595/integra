import { colourToCss } from "@/lib/utils";
import { TriangleLayer } from "../../../../../types/canvas";

interface TriangleProps {
    id: string;
    layer: TriangleLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColour?: string;
};

export const Triangle = ({
    id, 
    layer,
    onPointerDown,
    selectionColour
}: TriangleProps) => {
    const points = `${layer.x + (layer.width / 2)},${layer.y} ${layer.x},${layer.y + layer.height} ${layer.x + layer.width},${layer.y + layer.height}`;

    return(
        <polygon
            className="drop-shadow-md"
            onPointerDown={(e) => onPointerDown(e, id)}
            points={points}
            fill={layer.fill ? colourToCss(layer.fill) : "#000"}
            stroke={selectionColour || "transparent"}
            strokeWidth="1"
        />
    )
}