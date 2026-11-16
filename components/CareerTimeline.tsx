import { experience } from "@/content/site";

/**
 * Five years on one axis. Each employer is a track and each title a segment,
 * so the promotions and the overlap between the two jobs read at a glance,
 * which no list of dates manages. Scrolls sideways on a phone rather than
 * shrinking its labels away.
 */

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function month(label: string, now: Date): number {
  if (label === "present") return now.getUTCFullYear() * 12 + now.getUTCMonth() + 1;
  const [name, year] = label.split(" ");
  return Number(year) * 12 + MONTHS[name];
}

const TONES = ["var(--cobalt)", "var(--tangerine)"];

export function CareerTimeline() {
  const now = new Date();
  const tracks = experience.map((job, index) => ({
    company: job.company,
    tone: TONES[index % TONES.length],
    segments: job.roles
      .map((role) => {
        const [from, to] = role.period.split(" to ");
        return { label: role.short, start: month(from, now), end: month(to, now) };
      })
      .sort((a, b) => a.start - b.start),
  }));

  const start = Math.min(...tracks.flatMap((t) => t.segments.map((s) => s.start)));
  const end = Math.max(...tracks.flatMap((t) => t.segments.map((s) => s.end)));
  const span = end - start;
  const pct = (m: number) => ((m - start) / span) * 100;
  const firstYear = Math.ceil(start / 12);
  const years = Array.from({ length: Math.floor(end / 12) - firstYear + 1 }, (_, i) => firstYear + i);

  return (
    <div className="overflow-x-auto rounded-[24px] border bg-card p-5 sm:p-6">
      <div className="min-w-[720px]">
        <div className="relative ml-[110px] h-6">
          {years.map((year) => (
            <span
              key={year}
              className="absolute -translate-x-1/2 font-mono text-[11px] text-muted-foreground"
              style={{ left: `${pct(year * 12)}%` }}
            >
              {year}
            </span>
          ))}
        </div>
        <div className="space-y-3">
          {tracks.map((track) => (
            <div key={track.company} className="flex items-center gap-0">
              <span className="w-[110px] shrink-0 font-display text-base font-bold">{track.company}</span>
              <div className="relative h-12 flex-1 rounded-xl bg-secondary/60">
                {years.map((year) => (
                  <span key={year} aria-hidden className="absolute inset-y-0 w-px bg-border" style={{ left: `${pct(year * 12)}%` }} />
                ))}
                {track.segments.map((segment, i) => (
                  <div
                    key={segment.label}
                    className="absolute inset-y-1 flex items-center overflow-hidden rounded-lg px-3"
                    style={{
                      left: `calc(${pct(segment.start)}% + 2px)`,
                      width: `calc(${pct(segment.end) - pct(segment.start)}% - 4px)`,
                      background: `color-mix(in srgb, ${track.tone} ${30 + i * 25}%, var(--card))`,
                      border: `1px solid color-mix(in srgb, ${track.tone} 60%, transparent)`,
                    }}
                    title={segment.label}
                  >
                    <span className="truncate text-xs font-medium text-foreground">{segment.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="ml-[110px] mt-4 font-mono text-[11px] text-muted-foreground">
          Darker means later. The two tracks overlap for ten months, with both employers&apos; knowledge.
        </p>
      </div>
    </div>
  );
}
