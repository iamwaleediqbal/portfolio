import { cn } from "@/lib/utils";

/**
 * A hand-drawn underline. One per page at most: it marks the phrase the
 * headline is really about, and a second one would mean neither matters.
 * Drawn on load with a stroke animation, which reduced motion skips.
 */
export function Scribble({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.18em] left-0 z-0 h-[0.42em] w-full text-tangerine"
      >
        <path
          d="M4 16 C 60 6, 120 4, 180 10 S 270 18, 296 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          pathLength={1}
          className="[stroke-dasharray:1] [stroke-dashoffset:1] motion-safe:animate-[draw_900ms_600ms_cubic-bezier(0.6,0,0.2,1)_forwards] motion-reduce:[stroke-dashoffset:0]"
        />
      </svg>
    </span>
  );
}
