import { Room } from "@/components/room";
import { Canvas } from "./_components/canvas";
import { Divide } from "lucide-react";
import { CanvasLoading } from "./_components/canvas-loading";


interface CanvasIdPageProps {
    params: {
        canvasId: string;
    };
};

const CanvasIdPage = ({
    params,
} : CanvasIdPageProps) => {
    return (
        <Room roomId={params.canvasId} fallback={<CanvasLoading/>}>
            <Canvas canvasId={params.canvasId}></Canvas>
        </Room>
        
    )
}

export default CanvasIdPage;