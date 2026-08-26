import data from "@/data/model-results.json";

interface Row {
  model: string;
  space: "computer" | "tool";
  tasks: number;
  passes: number;
  scored: number;
  unscored: number;
  cost: number;
  pass_rate: number;
  ci_low: number;
  ci_high: number;
  rank: number;
  tied: boolean;
}

/**
 * Real runs, drawn as the intervals they are.
 *
 * These numbers come out of agentscore's committed run records — real Chromium
 * against a deployed application — via `scripts/import-model-results.mjs`. The
 * chart that stood here before was sample data for five models that no longer
 * exist, badged "sample" and still drawing concrete bars, which is not a thing
 * a portfolio about honest evaluation gets to ship.
 *
 * The interval is drawn rather than written down because it is the whole
 * argument. At a handful of runs per row these models cannot be told apart,
 * and the correct thing for a leaderboard to do about that is say so.
 *
 * One measure, one hue, no legend — the heading names the series. The bar is
 * the interval; the tick inside it is the point estimate.
 */
export function Leaderboard() {
  const report = data as unknown as {
    generated_at: string | null;
    runs: number;
    tasks: number;
    source_url: string;
    models: Row[];
  };

  const separable = report.models.some((row) => !row.tied);

  return (
    <figure className="m-0 overflow-hidden rounded-xl border bg-card">
      <figcaption className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b bg-muted/40 px-4 py-2.5 text-sm text-muted-foreground">
        <span className="tabular">{report.runs} recorded runs</span>
        <span aria-hidden>·</span>
        <span className="tabular">{report.tasks} tasks</span>
        <span aria-hidden>·</span>
        <span>real Chromium against the deployed app</span>
      </figcaption>

      <div className="divide-y">
        {report.models.map((row) => (
          <div
            key={`${row.model}:${row.space}`}
            className="grid grid-cols-[minmax(0,1fr)_64px] items-center gap-3 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_180px_72px]"
            title={`${row.model} (${row.space === "computer" ? "computer use" : "tool calling"}): ${row.passes} of ${row.scored} passed, 95% interval ${pct(row.ci_low)}–${pct(row.ci_high)}`}
          >
            <div className="min-w-0">
              <div className="truncate font-mono text-[13px]">{row.model}</div>
              <div className="text-xs text-muted-foreground">
                {row.space === "computer" ? "computer use" : "tool calling"}
                {row.cost === 0 && " · free"}
                {row.unscored > 0 && ` · ${row.unscored} not counted`}
              </div>
            </div>

            {/* The interval, to scale. Hidden on the narrowest screens, where
                it would be too short to read anything off. */}
            <div className="hidden sm:block" aria-hidden>
              <div className="relative h-1.5 w-full rounded-full bg-muted">
                <div
                  className="absolute h-full rounded-full bg-chart-4/45"
                  style={{
                    left: `${row.ci_low * 100}%`,
                    width: `${Math.max((row.ci_high - row.ci_low) * 100, 2)}%`,
                  }}
                />
                <div
                  className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-chart-4"
                  style={{ left: `calc(${row.pass_rate * 100}% - 1px)` }}
                />
              </div>
            </div>

            {/* Counts, not a percentage. "50%" over six runs reads as a
                measurement; "3 of 6" reads as what it is. */}
            <div className="text-right">
              <div className="tabular text-sm font-medium">
                {row.passes}
                <span className="text-muted-foreground">/{row.scored}</span>
              </div>
              <div className="tabular text-[11px] text-muted-foreground">
                {pct(row.ci_low)}–{pct(row.ci_high)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="border-t px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        {separable ? (
          <>Rows whose intervals overlap cannot be ordered, and are not.</>
        ) : (
          <>
            Every interval here overlaps every other, so nothing on this chart is separable yet
            — which is the correct reading of a handful of runs per row, and the reason the
            ranking is not shown. More runs narrow the bands; nothing else does.
          </>
        )}{" "}
        The full trajectories, screenshots and state snapshots are on{" "}
        <a
          href={report.source_url}
          className="underline underline-offset-4 hover:text-foreground"
          target="_blank"
          rel="noreferrer"
        >
          the agentscore console
        </a>
        .
      </p>
    </figure>
  );
}

const pct = (n: number) => `${Math.round(n * 100)}%`;
