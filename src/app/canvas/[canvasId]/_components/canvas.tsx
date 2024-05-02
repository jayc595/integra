"use client";

import { useCallback, useMemo, useState } from "react";
import { Info } from "./info";
import { Participant } from "./participant";
import { Toolbar } from "./toolbar";
import { CursorExistance } from "./cursor-existance";
import { connectionIdToColourMaping, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { useHistory, useCanRedo, useCanUndo, useMutation, useStorage, useOthersMapped } from "../../../../../liveblocks.config";
import { CanvasState, CanvasMode, Camera, Colour, layerType, Point, Side, XYWH } from "../../../../../types/canvas";
import { useApiMutation } from "../../../../../hooks/use-api-mutation";
import { SelectionBox } from "./selection-box";
import { SelectionToolbar } from "./selection-toolbar";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { BringToFront, ClipboardPaste, Copy, SendToBack, Trash2 } from "lucide-react";
import { useDeleteLayer } from "../../../../../hooks/use-delete-layer";
import { useSendToBack } from "../../../../../hooks/use-send-to-back";
import { useBringToFront } from "../../../../../hooks/use-bring-to-front";

const MAX_LAYERS = 100;


interface CanvasProps {
    canvasId: string;
};

export const Canvas = ({
    canvasId,
} : CanvasProps) => {
    const layerIds = useStorage((root) => root.layerIds);


    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();


    const [lastUsedColour, setLastUsedColour] = useState<Colour>({
        r: 255,
        g: 255,
        b: 255,
    });

    const insertLayer = useMutation((
        { storage, setMyPresence },
        LayerType: layerType.Ellipse | layerType.Rectangle | layerType.Text | layerType.StickyNote,
        position: Point,
      ) => {
        const liveLayers = storage.get("layers");
        if (liveLayers.size >= MAX_LAYERS) {
          return;
        }
    
        const liveLayerIds = storage.get("layerIds");
        const layerId = nanoid();
        const layer = new LiveObject({
          type: LayerType,
          x: position.x,
          y: position.y,
          height: 100,
          width: 100,
          fill: lastUsedColour,
        });
    
        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);
    
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({ mode: CanvasMode.None });
      }, [lastUsedColour]);

    const onResizeHandlePointerDown = useCallback((
        corner: Side,
        initialBounds: XYWH,
    ) => {
       history.pause();
       setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner
       });

    }, []);  

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY
        }))
    }, []);
    const [ camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None
    });

    const translateSelectedLayer = useMutation((
        { storage, self },
        point: Point
    ) => {
        if(canvasState.mode !== CanvasMode.Translating){
            return; 
        }

        const offset = {
            x: point.x - canvasState.current.x,
            y: point.y - canvasState.current.y,
        }

        const liveLayers = storage.get("layers");

        for (const id of self.presence.selection){
            const layer = liveLayers.get(id);

            if (layer) {
                layer.update({
                    x: layer.get("x") + offset.x,
                    y: layer.get("y") + offset.y
                })
            }
        }

        setCanvasState({ mode: CanvasMode.Translating, current:point })
    }, [
        canvasState
    ])

    const unselectLayers = useMutation((
        { self, setMyPresence }
    ) =>{
        if(self.presence.selection.length > 0){
            setMyPresence({ selection: [] }, { addToHistory: true });
        }
    }, [])

    const resizeSelectedLayer = useMutation((
        { storage, self },
        point: Point
    ) => {
        if(canvasState.mode !== CanvasMode.Resizing){
            return;
        }
        
        const bounds = resizeBounds(
            canvasState.initialBounds,
            canvasState.corner,
            point
        );

        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(self.presence.selection[0]);

        if(layer){
            layer.update(bounds);
        }

    }, [canvasState]);


    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();

        const current = pointerEventToCanvasPoint(e, camera);

        if(canvasState.mode == CanvasMode.Translating){
            translateSelectedLayer(current);
        } else if(canvasState.mode === CanvasMode.Resizing){
            resizeSelectedLayer(current);
        }

        setMyPresence({ cursor: current });
    }, [
        camera,
        canvasState,
        resizeSelectedLayer,
        translateSelectedLayer
    ]);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    const onPointerDown = useCallback((
        e: React.PointerEvent,
    ) => {
        const point = pointerEventToCanvasPoint(e, camera);

        if(canvasState.mode === CanvasMode.Inserting){
            return;
        }

        setCanvasState({ origin: point, mode: CanvasMode.Pressing })

    }, [
        camera,
        canvasState.mode,
        setCanvasState
    ]);


    const onPointerUp = useMutation(({}, e) => {
        const point = pointerEventToCanvasPoint(e, camera);

        if(canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing){
            unselectLayers();
            setCanvasState({ mode: CanvasMode.None });
        }
        else if(canvasState.mode === CanvasMode.Inserting){
            insertLayer(canvasState.layerType, point);
        } else {
            setCanvasState({
                mode: CanvasMode.None,
            });
        }
        history.resume();
    }, [
        camera,
        canvasState,
        history,
        insertLayer,
        unselectLayers
    ]);

    const selections = useOthersMapped((other) => other.presence.selection);

    const onLayerPointerDown = useMutation((
        { self, setMyPresence },
        e: React.PointerEvent,
        layerId: string,
    ) => {
        if (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting)
        {
           return; 
        }

        history.pause();
        e.stopPropagation();

        const point = pointerEventToCanvasPoint(e, camera);
        if(!self.presence.selection.includes(layerId)){
            setMyPresence({ selection: [layerId] }, { addToHistory: true });
        }
        setCanvasState({ mode: CanvasMode.Translating, current:point });
    }, [
        setCanvasState,
        camera,
        history,
        canvasState.mode
    ]);

    const layerIdsToColourSelection = useMemo(() => {
        const layerIdsToColourSelection: Record<string, string> = {};

        for (const user of selections) {
            const [connectionId, selection] = user;

            for (const layerId of selection) {
                layerIdsToColourSelection[layerId] = connectionIdToColourMaping(connectionId)
            }
        }

        return layerIdsToColourSelection;
    }, [selections]);

    const deleteLayers = useDeleteLayer();
    const sendToBack = useSendToBack();
    const bringToFront = useBringToFront();

    return(
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info canvasId={canvasId}></Info>
            <Participant></Participant>
            <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} canRedo={canRedo} canUndo={canUndo} redo={history.redo} undo={history.undo}></Toolbar>
            <SelectionToolbar camera={camera} setLastUsedColour={setLastUsedColour}/>
            <ContextMenu>
                <ContextMenuTrigger>
                    <svg className="h-[100vh] w-[100vw]" onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
                        <g style={{transform: `translate(${camera.x}px, ${camera.y}px)`}}>
                            {layerIds.map((layerId) => (
                                <LayerPreview key={layerId} id={layerId} onLayerPointerDown={onLayerPointerDown} selectionColour={layerIdsToColourSelection[layerId]}></LayerPreview>
                        ))}
                            <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown}/>
                            <CursorExistance></CursorExistance>
                        </g>
                    </svg>
                </ContextMenuTrigger>
                <ContextMenuContent className="min-w-[264px]">
                    <ContextMenuItem><Copy className="pr-2"/>Copy</ContextMenuItem>
                    <ContextMenuItem><ClipboardPaste className="pr-2"/>Paste</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={bringToFront}><BringToFront className="pr-2"/>Bring to front</ContextMenuItem>
                    <ContextMenuItem onClick={sendToBack}><SendToBack className="pr-2"/>Send to back</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={deleteLayers}><Trash2 className="pr-2"/>Delete</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </main>
    );
};