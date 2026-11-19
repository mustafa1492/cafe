import { qrMatrix } from "./qrMatrix";

const QUIET = 4; // quiet zone, in modules

/** Draws a QR code as a single <path> SVG (black on white, 4-module quiet zone). */
export function QrSvg({ text, size, title }: { text: string; size: number; title?: string }) {
  const m: boolean[][] = qrMatrix(text);
  const n = m.length;
  const total = n + QUIET * 2;
  let d = "";
  m.forEach((row, y) =>
    row.forEach((dark, x) => {
      if (dark) d += `M${x + QUIET} ${y + QUIET}h1v1h-1z`;
    }),
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${total} ${total}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      role="img"
      aria-label={title}
    >
      {title && <title>{title}</title>}
      <rect width={total} height={total} fill="#fff" />
      <path d={d} fill="#000" />
    </svg>
  );
}
