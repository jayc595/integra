import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Camera, Colour, Point, Side, XYWH } from "../../types/canvas"


const CONNECTION_ID_COLOURS = [
  "#ff1a1a",
  "#3399ff",
  "#ff9933",
  "#40bf40",
  "#004080",
  "#00ff00",
  "#ffff00",
  "#ff33bb",
  "#00ffff",
  "#cc00cc",
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
)  {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  }
}

export function connectionIdToColourMaping(connectionId: number) : string {
  return CONNECTION_ID_COLOURS[connectionId % CONNECTION_ID_COLOURS.length]
}

// Converts RGB to Hex Code
export function colourToCss(colour: Colour){
  return `#${colour.r.toString(16).padStart(2,"0")}${colour.g.toString(16).padStart(2,"0")}${colour.b.toString(16).padStart(2,"0")}`
}


export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height
  };

  if ((corner & Side.Left) === Side.Left){
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if((corner & Side.Right) === Side.Right){
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if((corner & Side.Top) === Side.Top){
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if((corner & Side.Bottom) === Side.Bottom){
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
};
