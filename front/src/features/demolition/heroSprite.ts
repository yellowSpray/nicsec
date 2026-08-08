// Pixel art sprite of the little detective used by the demolition easter egg.
// Each frame is a 12x16 grid, one character per pixel, "." meaning transparent.

const PALETTE: Record<string, string> = {
  H: "#2B3035", // hat
  B: "#C21F22", // hat band / tie
  S: "#E2AF88", // skin
  W: "#F3F2F2", // shirt
  C: "#A8794C", // trench coat
  D: "#394149", // eyes, shoes
};

export const SPRITE_WIDTH = 12;
export const SPRITE_HEIGHT = 16;

const IDLE = [
  "............",
  "...HHHHHH...",
  "...BBBBBB...",
  ".HHHHHHHHHH.",
  "..SSSSSSSS..",
  "..SDSSSSDS..",
  "..SSSSSSSS..",
  "..CCWBBWCC..",
  ".CCCWBBWCCC.",
  ".CCCCBBCCCC.",
  ".CCCCBBCCCC.",
  "..CCCCCCCC..",
  "..CCC..CCC..",
  "..DDD..DDD..",
  "..DDD..DDD..",
  ".DDDD..DDDD.",
];

const RUN_A = [
  "............",
  "...HHHHHH...",
  "...BBBBBB...",
  ".HHHHHHHHHH.",
  "..SSSSSSSS..",
  "..SDSSSSDS..",
  "..SSSSSSSS..",
  "..CCWBBWCC..",
  ".CCCWBBWCCC.",
  ".CCCCBBCCCC.",
  "..CCCBBCCCC.",
  "..CCCCCCCC..",
  "..CCC..CCC..",
  ".DDD....DDD.",
  "DDD......DDD",
  "DDD......DDD",
];

const RUN_B = [
  "............",
  "...HHHHHH...",
  "...BBBBBB...",
  ".HHHHHHHHHH.",
  "..SSSSSSSS..",
  "..SDSSSSDS..",
  "..SSSSSSSS..",
  "..CCWBBWCC..",
  ".CCCWBBWCCC.",
  ".CCCCBBCCCC.",
  ".CCCCBBCCC..",
  "..CCCCCCCC..",
  "...CCCCCC...",
  "...DDDDDD...",
  "...DD..DD...",
  "..DDD..DDD..",
];

const JUMP = [
  "............",
  "...HHHHHH...",
  "...BBBBBB...",
  ".HHHHHHHHHH.",
  "..SSSSSSSS..",
  "..SDSSSSDS..",
  "..SSSSSSSS..",
  "C..CCWWCC..C",
  "C.CCWBBWCC.C",
  ".CCCCBBCCCC.",
  ".CCCCBBCCCC.",
  "..CCCCCCCC..",
  "..CCC..CCC..",
  ".DDD....DDD.",
  "DDDD....DDDD",
  "............",
];

export const FRAMES = { IDLE, RUN_A, RUN_B, JUMP };

export type FrameName = keyof typeof FRAMES;

// Turns a pixel grid into an inline <svg>, merging horizontal runs of the same
// color so a frame stays a handful of nodes instead of 192 of them.
export function frameToSvg(frame: string[]): string {
  const rects: string[] = [];

  frame.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const pixel = row[x];
      if (pixel === ".") {
        x += 1;
        continue;
      }
      let run = 1;
      while (row[x + run] === pixel) run += 1;
      rects.push(
        `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${PALETTE[pixel]}"/>`
      );
      x += run;
    }
  });

  return `<svg viewBox="0 0 ${SPRITE_WIDTH} ${SPRITE_HEIGHT}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">${rects.join("")}</svg>`;
}
