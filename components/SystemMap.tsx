import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { system } from "@/content/site";
import { cn } from "@/lib/utils";

const TONE = ["var(--pink)", "var(--mint)", "var(--cobalt)"] as const;

/**
 * agentscore and its two companions as one pipeline, with the page you are on
 * marked. Three cards in order, because the order is the point: the model
 * answers, something happens, somebody decides whether it worked.
 */
export function SystemMap({ current }: { current?: string }) {
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {system.layers.map((layer, index) => {
        const here = layer.slug === current;
        return (
          <li key={layer.slug} className="relative">
            <Link
              href={`/projects/${layer.slug}`}
              aria-current={here ? "page" : undefined}
              className={cn(
                "group flex h-full flex-col gap-2 rounded-[22px] border bg-card p-5 transition hover:-translate-y-0.5",
                here && "ring-2 ring-offset-2 ring-offset-background",
              )}
              style={here ? ({ "--tw-ring-color": TONE[index] } as React.CSSProperties) : undefined}
            >
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <span className="size-2 rounded-full" style={{ background: TONE[index] }} />
                {String(index + 1).padStart(2, "0")} {layer.step}
              </span>
              <span className="font-mono text-lg font-semibold">{layer.slug}</span>
              <span className="text-sm leading-relaxed text-muted-foreground">{layer.role}</span>
              <span className="mt-auto pt-1 text-xs font-medium text-link">
                {here ? "You are here" : "Open the case study"}
              </span>
            </Link>
            {index < system.layers.length - 1 && (
              <ArrowRight
                aria-hidden
                className="absolute -right-[11px] top-1/2 z-10 hidden size-4 -translate-y-1/2 rounded-full bg-background text-muted-foreground md:block"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
