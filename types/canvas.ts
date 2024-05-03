export type CanvasState = | {
    mode: CanvasMode.None;
}| {
    mode: CanvasMode.Pressing,
    origin: Point;
} | {
    mode: CanvasMode.SelectionNet,
    origin: Point,
    current?: Point;
} | {
    mode: CanvasMode.Translating
    current: Point;
} | {
    mode: CanvasMode.Resizing,
    initialBounds: XYWH,
    corner: Side;
} | {
    mode: CanvasMode.Pencil;
} | {
    mode: CanvasMode.Inserting
    layerType: layerType.Ellipse | layerType.Rectangle | layerType.Triangle | layerType.Text | layerType.StickyNote;
}

export type Colour = {
    r: number;
    g: number;
    b: number;
}

export type Camera = {
    x: number;
    y: number;
};

export type RectangleLayer = {
    type: layerType.Rectangle;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Colour;
    value?: string;
};

export type EllipseLayer = {
    type: layerType.Ellipse;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Colour;
    value?: string;
};

export type TriangleLayer = {
    type: layerType.Triangle;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Colour;
    value?: string;
};

export type PathLayer = {
    type: layerType.Path;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Colour;
    points: number[][];
    value?: string;
};

export type Point = {
    x: number;
    y: number;
};

export type XYWH = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8,
};

export type TextLayer = {
    type: layerType.Text;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Colour;
    value?: string;
};

export type StickyNoteLayer = {
    type: layerType.StickyNote;
    x: number;
    y: number;
    height: number;
    width: number;
    fill: Colour;
    value?: string;
};

export enum layerType {
    Rectangle,
    Ellipse,
    Triangle,
    Path,
    Text,
    StickyNote,
};

export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil,
};

export type Layer = RectangleLayer | EllipseLayer | PathLayer | TriangleLayer | TextLayer | StickyNoteLayer;
