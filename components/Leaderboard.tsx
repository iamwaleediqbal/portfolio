import data from "@/data/leaderboard.json";
import { Badge } from "@/components/ui/badge";

interface Row {
  model: string;
  pass_rate: number;
  ci_low: number;
  ci_high: number;
  rank: number;
  tied: boolean;
  dropped_attempts: number;
  attempts: number;
}

/**
 * One measure across a handful of entities: horizontal bars, one hue, no legend
 * — the heading names the series.
 *
 * The confidence interval is drawn rather than written down, because it is the
 * whole argument: at these sample sizes several of these models cannot be told
 * apart, and a bare ranked list would assert an order the data does not support.
 */
export function Leaderboard() {
  const report = data as unknown as {
    generated_at: string | null;
    repeats: number;
    task_count: number;
    models: Row[];
    sample?: boolean;
  };

  return (
    <figure className="m-0 overflow-hidden rounded-xl border bg-card">
      <figcaption className="flex flex-wrap items-center gap-2 border-b bg-muted/40 px-4 py-2.5 text-sm text-muted-foreground">
        {report.sample ? (
          <>
            <Badge variant="outline" className="font-normal">
              sample data
            </Badge>
            Replaced by the first nightly run.
          </>
        ) : (
          <>
            {report.task_count} tasks · {report.repeats} attempts each · generated{" "}
            {report.generated_at?.slice(0, 10)}
          </>
        )}
      </figcaption>

      <div className="divide-y">
        {report.models.map((row) => (
          <div
            key={row.model}
            className="grid grid-cols-[28px_minmax(0,1fr)_64px] items-center gap-3 px-4 py-3 sm:grid-cols-[28px_minmax(0,1fr)_180px_72px]"
            title={`${row.model}: ${pct(row.pass_rate)} (95% CI ${pct(row.ci_low)}–${pct(row.ci_high)}) over ${row.attempts} counted attempts`}
          >
            <span className="tabular text-sm text-muted-foreground">
              {row.rank}
              {row.tied ? "=" : ""}
            </span>
            <span className="truncate font-mono text-xs sm:text-[13px]">
              {row.model.replace(":free", "")}
            </span>
            <span className="col-span-3 h-2.5 rounded-full bg-muted sm:col-span-1">
              <span className="relative block h-full">
                <span
                  className="absolute inset-y-0 rounded-full bg-primary/25"
                  style={{ left: `${row.ci_low * 100}%`, right: `${100 - row.ci_high * 100}%` }}
                />
                <span
                  className="absolute inset-y-0 left-0 rounded-r bg-primary ring-2 ring-card"
                  style={{ width: `${Math.max(row.pass_rate * 100, 1.5)}%` }}
                />
              </span>
            </span>
            <span className="text-right tabular text-sm">
              {pct(row.pass_rate)}
              <span className="block text-[11px] text-muted-foreground">
                {pct(row.ci_low)}–{pct(row.ci_high)}
              </span>
            </span>
          </div>
        ))}
      </div>

      <p className="border-t px-4 py-3 text-xs text-muted-foreground">
        Models sharing a rank have overlapping intervals, which means the data cannot order
        them. Attempts that never reached a model are excluded rather than scored zero.
      </p>
    </figure>
  );
}

function pct(value: number): string {
  return `${Math.round(value * 100)}%`;
}
