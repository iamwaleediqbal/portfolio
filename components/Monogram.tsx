import { cn } from "@/lib/utils";

/**
 * WI, set in the display face on a cobalt tile, with one tangerine dot as the
 * single hot spot. Small enough for the nav, and the same mark as the favicon.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-grid size-9 place-items-center rounded-[11px] bg-cobalt font-display text-[15px] font-extrabold leading-none text-white shadow-[0_6px_20px_-6px_var(--cobalt)]",
        className,
      )}
    >
      WI
      <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-background bg-tangerine" />
    </span>
  );
}
