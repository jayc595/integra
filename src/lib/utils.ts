import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Camera, Colour } from "../../types/canvas"


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
