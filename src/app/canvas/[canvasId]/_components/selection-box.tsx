"use client";

import React, { memo } from 'react'
import { Side, XYWH, layerType } from '../../../../../types/canvas';
import { useSelf, useStorage } from '../../../../../liveblocks.config';
import { useSelectionBounds } from '../../../../../hooks/use-selections-bounds';

interface SelectionBoxProps {
    onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
};

const HANDLE_WIDTH = 8;


export const SelectionBox = memo(({
    onResizeHandlePointerDown,
}: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) => 
        me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowingHandles = useStorage((root) => 
        soleLayerId && root.layers.get(soleLayerId)?.type !== layerType.Path
    );

    const bounds = useSelectionBounds();

    if (!bounds){
        return null;
    }

    return (
        <>
            <rect
                className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
                style={{transform: `translate(${bounds.x}px, ${bounds.y}px)`}}
                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height}
            />
        </>
    )
});

SelectionBox.displayName = "SelectionBox";
