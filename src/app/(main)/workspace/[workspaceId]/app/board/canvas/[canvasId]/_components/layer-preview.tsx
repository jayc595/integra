"use client";

import { memo } from "react";
import { Rectangle } from "./rectangle";
import { layerType } from "../../../../../../../../../../types/canvas";
import { useStorage } from "../../../../../../../../../../liveblocks.config";
import { Ellipse } from "./ellipse";
import { Triangle } from "./triangle";
import { Text } from "./text";
import { StickyNote } from "./note";
import { Path } from "./path";
import { colourToCss } from "@/lib/utils";

interface LayerPreviewProps {
    id: string,
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void,
    selectionColour?: string;
};

export const LayerPreview = memo(({
    id,
    onLayerPointerDown,
    selectionColour,
} : LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if(!layer){
        return null;
    }

    switch(layer.type){
        case layerType.Path:
            return(
                <Path 
                    key={id}
                    points={layer.points}
                    onPointerDown={(e) => onLayerPointerDown(e, id)}
                    x={layer.x}
                    y={layer.y}
                    fill={layer.fill ? colourToCss(layer.fill) : "#000"}
                    stroke={selectionColour}
                />
            )
        case layerType.StickyNote:
            return(
                <StickyNote
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColour={selectionColour}
                />
            )
        case layerType.Text:
            return(
                <Text
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColour={selectionColour}
                />
            )
        case layerType.Triangle:
            return(
                <Triangle
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColour={selectionColour}
                />
            );
        case layerType.Ellipse:
            return(
                <Ellipse
                    id={id}
                    layer={layer}
                    onPointerDown={onLayerPointerDown}
                    selectionColour={selectionColour}
                />
            );
        case layerType.Rectangle:
            return(
                <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColour={selectionColour}></Rectangle>
            );
        default: 
                console.warn("Unknown layer type");
                return null;
    }
});

LayerPreview.displayName = "LayerPreview";