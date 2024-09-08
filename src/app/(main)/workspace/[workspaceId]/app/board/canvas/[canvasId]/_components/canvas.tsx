"use client";

import { useCallback, useMemo, useState } from "react";
import { Info } from "./info";
import { Participant } from "./participant";
import { Toolbar } from "./toolbar";
import { CursorExistance } from "./cursor-existance";
import { colourToCss, connectionIdToColourMaping, findIntersectingLayersWithRectangle, penPointsToPathLayer, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { useHistory, useCanRedo, useCanUndo, useMutation, useStorage, useOthersMapped, useSelf } from "../../../../../../../../../../liveblocks.config";
import { SelectionBox } from "./selection-box";
import { SelectionToolbar } from "./selection-toolbar";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { BringToFront, ClipboardPaste, Copy, SendToBack, Trash2 } from "lucide-react";
import { Path } from "./path";
import { useDeleteLayer } from "../../../../../../../../../../hooks/use-delete-layer";
import { useSendToBack } from "../../../../../../../../../../hooks/use-send-to-back";
import { useBringToFront } from "../../../../../../../../../../hooks/use-bring-to-front";
import { Camera, CanvasMode, Colour, layerType, Point, Side, XYWH } from "../../../../../../../../../../types/canvas";

const MAX_LAYERS = 100;


interface CanvasProps {
    canvasId: string;
};

export const Canvas = ({
    canvasId,
} : CanvasProps) => {
    const layerIds = useStorage((root) => root.layerIds);
    const pencilDraft = useSelf((me) => me.presence.pencilDraft);

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
        LayerType: layerType.Ellipse | layerType.Rectangle | layerType.Triangle | layerType.Text | layerType.StickyNote,
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
    }, []);

    const startSelectionNet = useCallback((
        current: Point,
        origin: Point,
    ) => {
        if(Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5){
            setCanvasState({mode: CanvasMode.SelectionNet, origin, current});
        }

    }, []);

    const updateSelectionNet = useMutation((
        { storage, setMyPresence },
        current: Point,
        origin: Point,
    ) => {
        const layers = storage.get("layers").toImmutable();
        setCanvasState({mode: CanvasMode.SelectionNet, origin, current});

        const ids = findIntersectingLayersWithRectangle(layerIds, layers, origin, current);

        setMyPresence({ selection: ids });

    }, [layerIds]);

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

    const continueDrawing = useMutation((
        { self, setMyPresence },
        point: Point,
        e: React.PointerEvent
    ) => {
        const { pencilDraft } = self.presence;

        if(canvasState.mode !== CanvasMode.Pencil || e.buttons !== 1 || pencilDraft == null){
            return;
        }

        setMyPresence({
            cursor: point,
            pencilDraft: pencilDraft.length === 1 && pencilDraft[0][0] === point.x && pencilDraft[0][1] === point.y ? pencilDraft : [...pencilDraft, [point.x, point.y, e.pressure]],
        });
    }, [canvasState.mode]);

    const insertPath = useMutation((
        { storage, self, setMyPresence }
    ) => {
        const liveLayers = storage.get("layers");
        const { pencilDraft } = self.presence

        if(pencilDraft == null || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYERS){
            setMyPresence({ pencilDraft: null });
            return;
        }

        const id = nanoid();
        liveLayers.set(id, new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColour)));

        const liveLayerIds = storage.get("layerIds");
        liveLayerIds.push(id);
        setMyPresence({ pencilDraft: null });
        setCanvasState({ mode: CanvasMode.Pencil });
    }, [lastUsedColour]);

    const startDrawing = useMutation((
        { setMyPresence },
        point: Point,
        pressure: number,
    ) => {
        setMyPresence({
            pencilDraft: [[point.x, point.y, pressure]],
            penColour: lastUsedColour,
        })
    }, [lastUsedColour]);


    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();

        const current = pointerEventToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.Pressing) {
            startSelectionNet(current, canvasState.origin);
        } else if(canvasState.mode === CanvasMode.SelectionNet){
            updateSelectionNet(current, canvasState.origin);
        }else if(canvasState.mode == CanvasMode.Translating){
            translateSelectedLayer(current);
        } else if(canvasState.mode === CanvasMode.Resizing){
            resizeSelectedLayer(current);
        } else if(canvasState.mode === CanvasMode.Pencil){
            continueDrawing(current, e);
        }

        setMyPresence({ cursor: current });
    }, [
        camera,
        canvasState,
        resizeSelectedLayer,
        translateSelectedLayer,
        continueDrawing,
        updateSelectionNet,
        startSelectionNet
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

        if(canvasState.mode === CanvasMode.Pencil){
            startDrawing(point, e.pressure);
            return;
        }

        setCanvasState({ origin: point, mode: CanvasMode.Pressing })

    }, [
        camera,
        canvasState.mode,
        setCanvasState,
        startDrawing
    ]);


    const onPointerUp = useMutation(({}, e) => {
        const point = pointerEventToCanvasPoint(e, camera);

        if(canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing){
            unselectLayers();
            setCanvasState({ mode: CanvasMode.None });
        } else if(canvasState.mode === CanvasMode.Pencil){
            insertPath();
        } else if(canvasState.mode === CanvasMode.Inserting){
            insertLayer(canvasState.layerType, point);
        } else {
            setCanvasState({
                mode: CanvasMode.None,
            });
        }
        history.resume();
    }, [
        setCanvasState,
        camera,
        canvasState,
        history,
        insertLayer,
        unselectLayers,
        insertPath
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

    const [showActionBar, setShowActionBar] = useState(true);

    return(
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info canvasId={canvasId}></Info>
            <Participant></Participant>
            <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} canRedo={canRedo} canUndo={canUndo} redo={history.redo} undo={history.undo} showActionBar={showActionBar} toggleActionBar={() => setShowActionBar(prevState => !prevState)}></Toolbar>
            <SelectionToolbar showQuickActionMenu={showActionBar} camera={camera} setLastUsedColour={setLastUsedColour}/>
            <ContextMenu>
                <ContextMenuTrigger>
                    <svg className="h-[100vh] w-[100vw]" onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
                        <g style={{transform: `translate(${camera.x}px, ${camera.y}px)`}}>
                            {layerIds.map((layerId) => (
                                <LayerPreview key={layerId} id={layerId} onLayerPointerDown={onLayerPointerDown} selectionColour={layerIdsToColourSelection[layerId]}></LayerPreview>
                        ))}
                            <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown}/>
                            {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
                                <rect
                                    className="fill-blue-200/5 stroke-blue-200 stroke-1"
                                    x={Math.min(canvasState.origin.x, canvasState.current.x)}
                                    y={Math.min(canvasState.origin.y, canvasState.current.y)}
                                    width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                                    height={Math.abs(canvasState.origin.y - canvasState.current.y)}
                                />
                            )}
                            <CursorExistance></CursorExistance>
                            {pencilDraft != null && pencilDraft.length > 0 && (
                                <Path
                                    points={pencilDraft}
                                    fill={colourToCss(lastUsedColour)}
                                    x={0}
                                    y={0}
                                />
                            )}
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