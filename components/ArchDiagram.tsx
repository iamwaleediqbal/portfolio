import type { Diagram, DiagramEdge, DiagramNode, Tone } from "@/content/projects";

/**
 * An architecture diagram drawn from data.
 *
 * Boxes and arrows are plain SVG, coloured from the site's own tokens, so a
 * diagram themes itself and costs nothing at runtime. Edges are routed as
 * right angles between box sides; anything the router would get wrong is
 * fixed in the data (which side, and where along it) rather than in here.
 *
 * Below about 680px the drawing keeps its size and scrolls sideways, because
 * a diagram shrunk until its labels are unreadable is not a diagram.
 */

const TONE: Record<Tone, string> = {
  cobalt: "var(--cobalt)",
  tangerine: "var(--tangerine)",
  sun: "var(--sun)",
  mint: "var(--mint)",
  pink: "var(--pink)",
  lilac: "var(--lilac)",
  muted: "var(--muted-foreground)",
};

type Side = "top" | "right" | "bottom" | "left";
type Point = [number, number];

const height = (node: DiagramNode) => node.h ?? 64;

function anchor(node: DiagramNode, side: Side, at = 0.5): Point {
  const h = height(node);
  switch (side) {
    case "top":
      return [node.x + node.w * at, node.y];
    case "bottom":
      return [node.x + node.w * at, node.y + h];
    case "left":
      return [node.x, node.y + h * at];
    case "right":
      return [node.x + node.w, node.y + h * at];
  }
}

/** Pick the facing sides when the data does not say. */
function sides(a: DiagramNode, b: DiagramNode): [Side, Side] {
  const ax = a.x + a.w / 2;
  const ay = a.y + height(a) / 2;
  const bx = b.x + b.w / 2;
  const by = b.y + height(b) / 2;
  const overlapX = a.x < b.x + b.w && b.x < a.x + a.w;
  if (overlapX) return by > ay ? ["bottom", "top"] : ["top", "bottom"];
  return bx > ax ? ["right", "left"] : ["left", "right"];
}

const horizontal = (side: Side) => side === "left" || side === "right";

function route(edge: DiagramEdge, a: DiagramNode, b: DiagramNode): Point[] {
  const [autoFrom, autoTo] = sides(a, b);
  const fromSide = edge.fromSide ?? autoFrom;
  const toSide = edge.toSide ?? autoTo;
  let start = anchor(a, fromSide, edge.fromAt);
  let end = anchor(b, toSide, edge.toAt);

  // Facing sides that line up get a straight line, nudged onto a shared axis.
  if (horizontal(fromSide) && horizontal(toSide)) {
    if (edge.fromAt === undefined && edge.toAt === undefined) {
      const top = Math.max(a.y, b.y);
      const bottom = Math.min(a.y + height(a), b.y + height(b));
      if (bottom - top > 20) {
        const y = (top + bottom) / 2;
        start = [start[0], y];
        end = [end[0], y];
      }
    }
    if (Math.abs(start[1] - end[1]) < 1.5) return [start, [end[0], start[1]]];
    const mx = (start[0] + end[0]) / 2;
    return [start, [mx, start[1]], [mx, end[1]], end];
  }
  if (!horizontal(fromSide) && !horizontal(toSide)) {
    if (edge.fromAt === undefined && edge.toAt === undefined) {
      const left = Math.max(a.x, b.x);
      const right = Math.min(a.x + a.w, b.x + b.w);
      if (right - left > 20) {
        const x = (left + right) / 2;
        start = [x, start[1]];
        end = [x, end[1]];
      }
    }
    if (Math.abs(start[0] - end[0]) < 1.5) return [start, [start[0], end[1]]];
    const my = (start[1] + end[1]) / 2;
    return [start, [start[0], my], [end[0], my], end];
  }
  // One horizontal side and one vertical: a single corner.
  return horizontal(fromSide) ? [start, [end[0], start[1]], end] : [start, [start[0], end[1]], end];
}

/** The label sits on the longest segment, where it has the most room. */
function labelPoint(points: Point[]): { at: Point; vertical: boolean } {
  let best = 0;
  let length = -1;
  for (let i = 0; i < points.length - 1; i++) {
    const l = Math.hypot(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]);
    if (l > length) {
      length = l;
      best = i;
    }
  }
  const [p, q] = [points[best], points[best + 1]];
  return { at: [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], vertical: p[0] === q[0] };
}

export function ArchDiagram({ diagram, label }: { diagram: Diagram; label: string }) {
  const byId = new Map(diagram.nodes.map((node) => [node.id, node]));
  const groups = diagram.nodes.filter((node) => node.group);
  const boxes = diagram.nodes.filter((node) => !node.group);

  return (
    <figure className="m-0">
      <div className="bg-blueprint-soft overflow-x-auto rounded-[24px] border bg-card p-3 sm:p-5">
        <svg
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          role="img"
          aria-label={label}
          className="mx-auto block h-auto w-full min-w-[680px]"
        >
          <defs>
            <marker id="ad-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="var(--muted-foreground)" />
            </marker>
          </defs>

          {groups.map((group) => (
            <g key={group.id}>
              <rect
                x={group.x}
                y={group.y}
                width={group.w}
                height={height(group)}
                rx={18}
                fill="color-mix(in srgb, var(--foreground) 3%, transparent)"
                stroke="var(--border)"
                strokeWidth={1.5}
                strokeDasharray="6 6"
              />
              <text x={group.x + 16} y={group.y + 22} className="fill-muted-foreground font-mono" fontSize="11" letterSpacing="0.06em">
                {group.title}
              </text>
            </g>
          ))}

          {diagram.edges.map((edge) => {
            const a = byId.get(edge.from);
            const b = byId.get(edge.to);
            if (!a || !b) return null;
            const points = route(edge, a, b);
            const { at, vertical } = labelPoint(points);
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <polyline
                  points={points.map((p) => p.join(",")).join(" ")}
                  fill="none"
                  stroke="var(--muted-foreground)"
                  strokeOpacity={0.75}
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  strokeDasharray={edge.dashed ? "5 5" : undefined}
                  markerEnd="url(#ad-arrow)"
                  markerStart={edge.both ? "url(#ad-arrow)" : undefined}
                />
                {edge.label && (
                  <text
                    x={vertical ? at[0] + 8 : at[0]}
                    y={vertical ? at[1] + 4 : at[1] - 7}
                    textAnchor={vertical ? "start" : "middle"}
                    className="fill-foreground/80 font-mono"
                    fontSize="11"
                    stroke="var(--card)"
                    strokeWidth={5}
                    strokeLinejoin="round"
                    paintOrder="stroke"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {boxes.map((node) => {
            const tone = TONE[node.tone ?? "muted"];
            const h = height(node);
            const lines = node.sub?.split("\n") ?? [];
            return (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={h}
                  rx={14}
                  fill={`color-mix(in srgb, ${tone} 12%, var(--card))`}
                  stroke={`color-mix(in srgb, ${tone} 60%, transparent)`}
                  strokeWidth={1.5}
                />
                <circle cx={node.x + 18} cy={node.y + 22} r={4} fill={tone} />
                <text x={node.x + 30} y={node.y + 27} className="fill-foreground font-display" fontSize="15" fontWeight={700}>
                  {node.title}
                </text>
                {lines.map((line, index) => (
                  <text
                    key={line}
                    x={node.x + 18}
                    y={node.y + 47 + index * 15}
                    className="fill-muted-foreground font-mono"
                    fontSize="11"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 font-mono text-[11px] text-muted-foreground sm:hidden">Swipe the diagram sideways to see all of it.</figcaption>
    </figure>
  );
}
