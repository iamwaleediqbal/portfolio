import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { system } from "@/content/site";

const TONE = ["chart-1", "chart-2", "chart-3"] as const;

/**
 * The three open projects as one pipeline.
 *
 * Read as separate cards they look like three unrelated libraries. They are
 * three seams of one problem, and the order matters — so the layout says so:
 * numbered, in sequence, with what each one prevents sitting under what it does.
 *
 * The connector is an arrow between steps on a wide screen and a vertical rule
 * on a narrow one, because a row of three that reflows into a column loses the
 * one thing it was drawn to show.
 */
export function SystemMap() {
  return (
    <div className="space-y-4">
      <p className="max-w-[68ch] text-[17px] leading-relaxed">{system.lead}</p>

      <ol className="grid gap-3 lg:grid-cols-3">
        {system.layers.map((layer, index) => (
          <li key={layer.slug} className="relative flex">
            <Card className="relative h-full w-full gap-0 overflow-hidden pt-0">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background: `linear-gradient(90deg, var(--${TONE[index]}), transparent)`,
                }}
              />
              <CardContent className="space-y-3 pt-5">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-mono text-[11px] tabular"
                    style={{ color: `var(--${TONE[index]})` }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {layer.step}
                  </span>
                </div>

                <div>
                  <h3 className="font-mono text-sm font-semibold tracking-tight">{layer.slug}</h3>
                  <p className="mt-1 text-sm font-medium">{layer.role}</p>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{layer.owns}</p>

                <div className="rounded-md border-l-2 bg-muted/40 px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    What it prevents
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {layer.breaks}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Between the cards, never after the last one. */}
            {index < system.layers.length - 1 && (
              <ArrowRight
                aria-hidden
                className="absolute -right-3 top-1/2 hidden size-4 -translate-y-1/2 text-muted-foreground lg:block"
              />
            )}
          </li>
        ))}
      </ol>

      <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
        {system.honesty}
      </p>
    </div>
  );
}
