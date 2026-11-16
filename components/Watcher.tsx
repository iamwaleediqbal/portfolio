"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A pair of eyes that watch the visitor.
 *
 * The idea is the job: I build the systems that watch AI agents and decide
 * whether they did what they were asked. So the page watches you back. It is
 * also a nod to xeyes, the X11 toy from 1988 whose eyes follow the pointer,
 * which is about as old as developer culture gets.
 *
 * Behaviour, in order of how much it matters:
 *  - pupils follow the pointer, eased, and never leave the eye;
 *  - they blink at random, sometimes twice;
 *  - over anything marked data-watch="happy" (the hire and contact buttons)
 *    they close into a smile;
 *  - with no pointer (phones) they look around on their own;
 *  - with reduced motion they hold still and look at you.
 *
 * The pupils are moved by writing the transform attribute directly from a
 * requestAnimationFrame loop, so following the mouse never re-renders React.
 */

const EYES = [
  { cx: 64, cy: 74 },
  { cx: 160, cy: 74 },
] as const;
const RX = 44;
const RY = 54;
const REACH_X = 20;
const REACH_Y = 26;

type Mood = "watching" | "happy";

export function Watcher({ className, label = true }: { className?: string; label?: boolean }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pupilRefs = useRef<(SVGGElement | null)[]>([]);
  const [blink, setBlink] = useState(false);
  const [mood, setMood] = useState<Mood>("watching");

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = { x: 0, y: 0 };
    let current = EYES.map(() => ({ x: 0, y: 0 }));
    let pointerSeen = false;
    let frame = 0;
    let idleTimer = 0;

    // Where the target is, in each eye's own coordinates, clamped to the white.
    const aim = () => {
      const box = svg.getBoundingClientRect();
      const scale = box.width / 224;
      return EYES.map((eye) => {
        const ex = box.left + eye.cx * scale;
        const ey = box.top + eye.cy * scale;
        const dx = target.x - ex;
        const dy = target.y - ey;
        const distance = Math.hypot(dx, dy) || 1;
        // Near the eyes the pupils move a little; across the page they reach the rim.
        const pull = Math.min(distance / 260, 1);
        return { x: (dx / distance) * REACH_X * pull, y: (dy / distance) * REACH_Y * pull };
      });
    };

    const loop = () => {
      const goal = aim();
      current = current.map((c, i) => ({
        x: c.x + (goal[i].x - c.x) * 0.18,
        y: c.y + (goal[i].y - c.y) * 0.18,
      }));
      current.forEach((c, i) => {
        pupilRefs.current[i]?.setAttribute("transform", `translate(${c.x.toFixed(2)} ${c.y.toFixed(2)})`);
      });
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerSeen = true;
      target = { x: event.clientX, y: event.clientY };
    };

    // Phones have no pointer to follow, so the eyes glance around instead.
    const wander = () => {
      if (!pointerSeen) {
        const box = svg.getBoundingClientRect();
        target = {
          x: box.left + box.width / 2 + (Math.random() - 0.5) * 900,
          y: box.top + box.height / 2 + (Math.random() - 0.5) * 600,
        };
      }
      idleTimer = window.setTimeout(wander, 1400 + Math.random() * 1800);
    };

    const onOver = (event: PointerEvent) => {
      const happy = (event.target as Element | null)?.closest?.('[data-watch="happy"]');
      setMood(happy ? "happy" : "watching");
    };

    const box = svg.getBoundingClientRect();
    target = { x: box.left + box.width / 2, y: box.top + box.height * 2 };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    frame = requestAnimationFrame(loop);
    wander();

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(idleTimer);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  // Blinks come at irregular intervals, and one in four is a double blink.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(() => {
        const twice = Math.random() < 0.25;
        setBlink(true);
        window.setTimeout(() => setBlink(false), 130);
        if (twice) {
          window.setTimeout(() => setBlink(true), 260);
          window.setTimeout(() => setBlink(false), 390);
        }
        schedule();
      }, 2600 + Math.random() * 3400);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, []);

  const closed = blink || mood === "happy";

  return (
    <div className={cn("relative select-none", className)}>
      <svg ref={svgRef} viewBox="0 0 224 148" className="h-auto w-full" aria-hidden>
        {EYES.map((eye, i) => (
          <g key={i}>
            <g
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                transform: `scaleY(${closed ? 0.06 : 1})`,
                transition: "transform 110ms ease-in-out",
                opacity: mood === "happy" && !blink ? 0 : 1,
              }}
            >
              {/* a hard offset shadow, printed rather than blurred; it closes with the eye */}
              <ellipse cx={eye.cx + 5} cy={eye.cy + 6} rx={RX} ry={RY} fill="#0b0b10" />
              <ellipse cx={eye.cx} cy={eye.cy} rx={RX} ry={RY} fill="#fffaf0" stroke="#0b0b10" strokeWidth="5" />
              <g
                ref={(node) => {
                  pupilRefs.current[i] = node;
                }}
              >
                <circle cx={eye.cx} cy={eye.cy + 6} r="21" fill="var(--cobalt)" />
                <circle cx={eye.cx} cy={eye.cy + 6} r="10" fill="#0b0b10" />
                <circle cx={eye.cx + 7} cy={eye.cy - 2} r="5" fill="#ffffff" />
              </g>
            </g>
            {/* the smile: closed lids curving up, shown while something good is hovered */}
            <path
              d={`M ${eye.cx - 30} ${eye.cy + 8} Q ${eye.cx} ${eye.cy - 26} ${eye.cx + 30} ${eye.cy + 8}`}
              fill="none"
              stroke="#0b0b10"
              strokeWidth="7"
              strokeLinecap="round"
              style={{ opacity: mood === "happy" && !blink ? 1 : 0, transition: "opacity 120ms" }}
            />
          </g>
        ))}
      </svg>
      {label && (
        <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
          {mood === "happy" ? "oh, nice" : "$ xeyes --watch"}
        </p>
      )}
    </div>
  );
}
