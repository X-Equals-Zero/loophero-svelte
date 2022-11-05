export type Point = [number, number];
export type DrawFn = (ctx: CanvasRenderingContext2D) => void;
export type CanvasContext = {
    addDrawFn: (fn: DrawFn) => void;
    removeDrawFn: (fn: DrawFn) => void;
}
export type Rectangle = {
    x: number,
    y: number,
    width: number,
    height: number,
    angle: number,
    fill: string,
    stroke: string,
    direction?: 'left' | 'right',
    blend: 'source-over' | 'destination-over' | 'lighter' | 'copy' | 'xor' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity',

}
