"use client";

import { ArrowRight, ArrowUpRight, CalendarDays, Flame, FolderGit2, GitCommitHorizontal, Github, Lock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { GitHubData, GitHubDay } from "@/lib/github";
import { cn } from "@/lib/utils";

/**
 * My GitHub profile, live.
 *
 * The server renders it from cached data so the HTML is complete before any
 * script runs, then this asks /api/github for the latest on load. The chip in
 * the corner says which one you are looking at, because a "live" badge on
 * saved data is exactly the kind of claim this site is trying not to make.
 */
export function GitHubLive({ initial }: { initial: GitHubData }) {
  const [data, setData] = useState(initial);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((fresh: GitHubData) => setData(fresh))
      .catch(() => undefined)
      .finally(() => setRefreshing(false));
    return () => controller.abort();
  }, []);

  const since = new Date(data.profile.createdAt).getFullYear();
  const privateCount = data.repos.filter((repo) => repo.private).length;
  const stats = [
    { icon: GitCommitHorizontal, value: data.stats.contributions.toLocaleString("en-US"), label: "contributions, last 12 months", tone: "text-mint-ink" },
    { icon: FolderGit2, value: data.profile.publicRepos.toString(), label: "public repositories", tone: "text-sun-ink" },
    { icon: Flame, value: `${data.stats.longestStreak} days`, label: "longest streak", tone: "text-tangerine" },
    { icon: CalendarDays, value: String(since), label: "on GitHub since", tone: "text-link" },
  ];

  return (
    <div className="overflow-hidden rounded-[28px] border bg-card">
      {/* header */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 border-b p-5 sm:flex sm:items-center sm:p-6">
        <Image
          src={data.profile.avatar}
          alt=""
          width={56}
          height={56}
          className="size-14 rounded-2xl border bg-secondary object-cover"
        />
        <div className="min-w-0 sm:flex-1">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-display text-xl font-bold">
            <Github className="size-[18px]" />
            {data.profile.name}
            <span className="font-mono text-sm font-normal text-muted-foreground">@{data.profile.login}</span>
          </p>
          {data.profile.bio && <p className="mt-1 max-w-[70ch] text-sm text-muted-foreground">{data.profile.bio}</p>}
        </div>
        <div className="col-span-2 sm:col-auto">
          <SourceChip source={data.source} fetchedAt={data.fetchedAt} refreshing={refreshing} />
        </div>
      </div>

      {/* stats */}
      <dl className="grid grid-cols-2 border-b lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label, tone }, index) => (
          <div
            key={label}
            className={cn("space-y-1 p-5 sm:p-6", index % 2 === 0 && "border-r", index < 2 && "border-b lg:border-b-0", index === 1 && "lg:border-r")}
          >
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className={cn("size-3.5", tone)} />
              {label}
            </dt>
            <dd className={cn("font-display text-3xl font-extrabold tabular-nums", tone)}>{value}</dd>
          </div>
        ))}
      </dl>

      {/* calendar */}
      <div className="border-b p-5 sm:p-6">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-base font-bold">Contributions</h3>
          <p className="font-mono text-xs text-muted-foreground">
            <span className="sm:hidden">last {PHONE_WEEKS} weeks</span>
            <span className="hidden sm:inline">last 52 weeks</span>
          </p>
        </div>
        {data.calendar.length ? (
          <>
            {/* A whole year on a phone shrinks every day to a speck, so phones get the recent months at a readable size. */}
            <Heatmap days={data.calendar.slice(-PHONE_WEEKS * 7)} className="sm:hidden" />
            <Heatmap days={data.calendar} className="hidden sm:block" />
          </>
        ) : (
          <EmptyNote>Contribution data is on its way.</EmptyNote>
        )}
      </div>

      <div className="grid lg:grid-cols-[1fr_1.6fr]">
        {/* languages */}
        <div className="border-b p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <h3 className="mb-4 font-display text-base font-bold">Languages, recent repos</h3>
          {data.languages.length ? (
            <>
              <div className="flex h-3 overflow-hidden rounded-full bg-secondary" role="img" aria-label="Share of code by language">
                {data.languages.map((language) => (
                  <span
                    key={language.name}
                    style={{ width: `${language.share * 100}%`, background: language.color }}
                    className="h-full border-r-2 border-card last:border-r-0"
                  />
                ))}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {data.languages.map((language) => (
                  <li key={language.name} className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full" style={{ background: language.color }} />
                    <span>{language.name}</span>
                    <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">
                      {(language.share * 100).toFixed(language.share < 0.01 ? 1 : 0)}%
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <EmptyNote>Language data is on its way.</EmptyNote>
          )}
        </div>

        {/* repositories */}
        <div className="p-5 sm:p-6">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h3 className="font-display text-base font-bold">Repositories</h3>
            {privateCount > 0 && (
              <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <Lock className="size-3" />
                {privateCount} private, shown not opened
              </p>
            )}
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.repos.map((repo) => (
              <li key={repo.name}>
                <RepoLink
                  repo={repo}
                  className={cn(
                    "group flex h-full flex-col gap-2 rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:border-link/50",
                    repo.private ? "border-dashed bg-secondary/30" : "bg-background/40",
                  )}
                >
                  <span className="flex items-center gap-2 font-mono text-sm font-medium">
                    {repo.private ? <Lock className="size-4 text-muted-foreground" /> : <FolderGit2 className="size-4 text-muted-foreground" />}
                    {repo.name}
                    {repo.private && (
                      <span className="rounded-full border px-1.5 py-px font-sans text-[10px] font-normal text-muted-foreground">Private</span>
                    )}
                    {repo.private ? (
                      <ArrowRight className="ml-auto size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
                    ) : (
                      <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                    )}
                  </span>
                  {repo.description && <span className="line-clamp-2 text-sm text-muted-foreground">{repo.description}</span>}
                  <span className="mt-auto flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full" style={{ background: repo.color }} />
                        {repo.language}
                      </span>
                    )}
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="size-3" />
                        {repo.stars}
                      </span>
                    )}
                    <span className="ml-auto" suppressHydrationWarning>
                      {repo.pushedAt ? `pushed ${ago(repo.pushedAt)}` : repo.private ? "case study" : ""}
                    </span>
                  </span>
                </RepoLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** Public repos open on GitHub. Private ones open their case study on this site. */
function RepoLink({ repo, className, children }: { repo: GitHubData["repos"][number]; className: string; children: React.ReactNode }) {
  if (repo.private) {
    return (
      <Link href={repo.url} className={className} title="Private repository. The case study explains the work.">
        {children}
      </Link>
    );
  }
  return (
    <a href={repo.url} className={className}>
      {children}
    </a>
  );
}

function SourceChip({ source, fetchedAt, refreshing }: { source: GitHubData["source"]; fetchedAt: string; refreshing: boolean }) {
  const live = source === "live";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px]",
        live ? "border-mint/40 text-mint-ink" : "text-muted-foreground",
      )}
      title={new Date(fetchedAt).toUTCString()}
      suppressHydrationWarning
    >
      <span className="relative flex size-2">
        {live && <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60" />}
        <span className={cn("relative inline-flex size-2 rounded-full", live ? "bg-mint" : "bg-muted-foreground")} />
      </span>
      {refreshing ? "checking GitHub" : live ? `live, ${ago(fetchedAt)}` : `saved ${ago(fetchedAt)}`}
    </span>
  );
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return <p className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">{children}</p>;
}

const PHONE_WEEKS = 20;
const CELL = 12;
const GAP = 3;
const STEP = CELL + GAP;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * The year as a grid of days, drawn as one SVG so it scales to any width
 * instead of scrolling sideways on a phone. Mint, because mint means alive.
 */
function Heatmap({ days, className }: { days: GitHubDay[]; className?: string }) {
  const { weeks, months } = useMemo(() => {
    const first = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const padded: (GitHubDay | null)[] = [...Array(first).fill(null), ...days];
    const weeks: (GitHubDay | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
    const months: { label: string; x: number }[] = [];
    let last = -1;
    weeks.forEach((week, index) => {
      const day = week.find(Boolean);
      if (!day) return;
      const month = new Date(`${day.date}T00:00:00Z`).getUTCMonth();
      if (month !== last && index < weeks.length - 1) {
        months.push({ label: MONTHS[month], x: index * STEP });
        last = month;
      }
    });
    return { weeks, months };
  }, [days]);

  const width = weeks.length * STEP;
  const height = 7 * STEP + 18;
  const fill = (level: number) =>
    level === 0
      ? "var(--secondary)"
      : `color-mix(in srgb, var(--mint) ${[0, 32, 55, 78, 100][level]}%, var(--secondary))`;

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Contribution calendar for the last year">
        {months.map((month, index) =>
          index > 0 && month.x - months[index - 1].x < STEP * 3 ? null : (
            <text key={`${month.label}-${month.x}`} x={month.x} y={10} className="fill-muted-foreground font-mono" fontSize="9">
              {month.label}
            </text>
          ),
        )}
        {weeks.map((week, x) =>
          week.map((day, y) =>
            day ? (
              <rect key={day.date} x={x * STEP} y={18 + y * STEP} width={CELL} height={CELL} rx={3} fill={fill(day.level)}>
                <title>{`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}</title>
              </rect>
            ) : null,
          ),
        )}
      </svg>
      <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[11px] text-muted-foreground">
        less
        {[0, 1, 2, 3, 4].map((level) => (
          <span key={level} className="size-2.5 rounded-[3px]" style={{ background: fill(level) }} />
        ))}
        more
      </div>
    </div>
  );
}

function ago(iso: string) {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  const units: [number, string][] = [
    [60 * 60 * 24 * 365, "y"],
    [60 * 60 * 24 * 30, "mo"],
    [60 * 60 * 24, "d"],
    [60 * 60, "h"],
    [60, "m"],
  ];
  for (const [size, unit] of units) if (seconds >= size) return `${Math.floor(seconds / size)}${unit} ago`;
  return "just now";
}
