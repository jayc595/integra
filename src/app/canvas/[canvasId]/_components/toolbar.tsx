import { Circle, Delete, MousePointer, MousePointer2, Pencil, Redo, Square, StickyNote, Trash2, Triangle, Type, Undo, SquareMenu } from "lucide-react"
import { ToolButtons } from "./tool-buttons"
import { CanvasMode, CanvasState, layerType } from "../../../../../types/canvas";
import { Separator } from "@/components/ui/separator";

interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    showActionBar: boolean;
    toggleActionBar: () => void; 
}

export const Toolbar = ({
    canvasState,
    setCanvasState,
    undo,
    redo,
    canUndo,
    canRedo,
    showActionBar,
    toggleActionBar
}: ToolbarProps) => {
    return(
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <ToolButtons label="select" icon={MousePointer2} onClick={() => setCanvasState({ mode: CanvasMode.None })} isActive={
                    canvasState.mode === CanvasMode.None 
                    || canvasState.mode === CanvasMode.Translating 
                    || canvasState.mode === CanvasMode.SelectionNet 
                    || canvasState.mode === CanvasMode.Pressing 
                    || canvasState.mode === CanvasMode.Resizing
                }>   
                </ToolButtons>
                <ToolButtons label="Text" icon={Type} onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: layerType.Text })} isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === layerType.Text}></ToolButtons>
                <ToolButtons label="Sticky note" icon={StickyNote} onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: layerType.StickyNote })} isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === layerType.StickyNote}></ToolButtons>
                <ToolButtons label="Square" icon={Square} onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: layerType.Rectangle })} isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === layerType.Rectangle}></ToolButtons>
                <ToolButtons label="Ellipse" icon={Circle} onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: layerType.Ellipse })} isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === layerType.Ellipse}></ToolButtons>
                <ToolButtons label="Triangle" icon={Triangle} onClick={() => setCanvasState({ mode: CanvasMode.Inserting, layerType: layerType.Triangle })} isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === layerType.Triangle}></ToolButtons>
                <ToolButtons label="Pen" icon={Pencil} onClick={() => setCanvasState({ mode: CanvasMode.Pencil })} isActive={canvasState.mode === CanvasMode.Pencil}></ToolButtons>
            </div>
            <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
                <ToolButtons label="Undo" icon={Undo} onClick={undo} isDisabled={!canUndo}></ToolButtons>
                <ToolButtons label="Redo" icon={Redo} onClick={redo} isDisabled={!canRedo}></ToolButtons>
                <ToolButtons label="Delete" icon={Trash2} onClick={() => {}} isActive={false}></ToolButtons>
                <Separator className="mb-2 mt-2"/>
                <ToolButtons label="Toggle Quick Action Menu" icon={SquareMenu} onClick={toggleActionBar} isActive={showActionBar}></ToolButtons>
            </div>
        </div>
    )
}

Toolbar.Skeleton =  function ToolbarSkeleton() {
    return(
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md">
        </div>
    )
} 