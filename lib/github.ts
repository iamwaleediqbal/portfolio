/**
 * Live GitHub data for the profile section: who, how active, in what languages,
 * and what was pushed recently.
 *
 * Runs on the server only. It works with no configuration at all, and gets
 * better with a token:
 *
 *  - Without GITHUB_TOKEN, the REST API allows 60 requests an hour per IP and
 *    the contribution calendar is read from the same public page github.com
 *    draws on a profile. That is enough because the result is cached for half
 *    an hour (see app/api/github/route.ts).
 *  - With GITHUB_TOKEN (any classic token, no scopes needed), the calendar
 *    comes from the GraphQL API instead and the hourly limit is 5,000.
 *
 * If GitHub is down, rate limited or changes its markup, the section does not
 * break or go blank: every piece falls back to data/github-snapshot.json, and
 * the UI says it is showing saved data. A portfolio that shows an error where
 * the activity should be is worse than one that shows yesterday's activity.
 */

import snapshot from "@/data/github-snapshot.json";

export const GITHUB_USER = process.env.GITHUB_USER ?? "iamwaleediqbal";

/** Repositories to list first, in this order, before the most recently pushed. */
const PRIORITY = ["agentscore", "clickmail", "polyact", "portfolio"];
const REVALIDATE = 1800;

export interface GitHubDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  color: string;
  stars: number;
  pushedAt: string;
}

export interface GitHubLanguage {
  name: string;
  bytes: number;
  share: number;
  color: string;
}

export interface GitHubData {
  source: "live" | "snapshot";
  fetchedAt: string;
  profile: {
    login: string;
    name: string;
    bio: string | null;
    avatar: string;
    url: string;
    location: string | null;
    createdAt: string;
    publicRepos: number;
  };
  stats: {
    contributions: number;
    activeDays: number;
    longestStreak: number;
    currentStreak: number;
  };
  calendar: GitHubDay[];
  languages: GitHubLanguage[];
  repos: GitHubRepo[];
}

/** GitHub's own language colours, so a TypeScript dot is the blue developers expect. */
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  Ruby: "#701516",
  CSS: "#663399",
  HTML: "#e34c26",
  PHP: "#4F5D95",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  SCSS: "#c6538c",
  Vue: "#41b883",
  MDX: "#fcb32c",
  Makefile: "#427819",
  HCL: "#844FBA",
  PLpgSQL: "#336790",
};
const colorOf = (language: string | null) => (language && LANGUAGE_COLORS[language]) || "#8b8b9a";

function headers(extra: Record<string, string> = {}): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": `${GITHUB_USER}-portfolio`,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

async function getJSON<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: headers(), next: { revalidate: REVALIDATE } });
  if (!response.ok) throw new Error(`${url} answered ${response.status}`);
  return (await response.json()) as T;
}

interface RestUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  created_at: string;
  public_repos: number;
}

interface RestRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

const LEVELS: Record<string, GitHubDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

async function calendarFromGraphQL(): Promise<GitHubDay[]> {
  const query = `query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks { contributionDays { date contributionCount contributionLevel } }
        }
      }
    }
  }`;
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ query, variables: { login: GITHUB_USER } }),
    next: { revalidate: REVALIDATE },
  });
  if (!response.ok) throw new Error(`graphql answered ${response.status}`);
  const body = (await response.json()) as {
    data?: {
      user?: {
        contributionsCollection: {
          contributionCalendar: {
            weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[];
          };
        };
      };
    };
  };
  const weeks = body.data?.user?.contributionsCollection.contributionCalendar.weeks;
  if (!weeks) throw new Error("graphql returned no calendar");
  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: LEVELS[day.contributionLevel] ?? 0,
    })),
  );
}

/**
 * The same calendar, read from the public page that draws it on a profile.
 * Each day is a cell with a date and a level, and its count is in a tooltip
 * pointing at the cell by id. Exported so it can be tested against a saved page.
 */
export function parseContributionsPage(html: string): GitHubDay[] {
  const tips = new Map<string, number>();
  for (const match of html.matchAll(/for="(contribution-day-component-[\d-]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const count = /^(\d[\d,]*) contribution/.exec(match[2].trim());
    tips.set(match[1], count ? Number(count[1].replace(/,/g, "")) : 0);
  }
  const days: GitHubDay[] = [];
  for (const cell of html.matchAll(/<td[^>]*class="ContributionCalendar-day"[^>]*>/g)) {
    const tag = cell[0];
    const date = /data-date="([\d-]+)"/.exec(tag)?.[1];
    const id = /id="(contribution-day-component-[\d-]+)"/.exec(tag)?.[1];
    const level = Number(/data-level="(\d)"/.exec(tag)?.[1] ?? 0);
    if (!date) continue;
    days.push({ date, count: (id && tips.get(id)) || 0, level: Math.min(4, Math.max(0, level)) as GitHubDay["level"] });
  }
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

async function calendarFromPage(): Promise<GitHubDay[]> {
  const response = await fetch(`https://github.com/users/${GITHUB_USER}/contributions`, {
    headers: { "User-Agent": `${GITHUB_USER}-portfolio`, "X-Requested-With": "XMLHttpRequest" },
    next: { revalidate: REVALIDATE },
  });
  if (!response.ok) throw new Error(`contributions page answered ${response.status}`);
  const days = parseContributionsPage(await response.text());
  if (days.length < 300) throw new Error(`contributions page had ${days.length} days; the markup may have changed`);
  return days;
}

async function getCalendar(): Promise<GitHubDay[]> {
  if (process.env.GITHUB_TOKEN) {
    try {
      return await calendarFromGraphQL();
    } catch {
      // fall through to the public page
    }
  }
  return calendarFromPage();
}

export function summarise(calendar: GitHubDay[]): GitHubData["stats"] {
  let longest = 0;
  let run = 0;
  for (const day of calendar) {
    run = day.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // The current streak may end yesterday: today is not over yet.
  let current = 0;
  const days = [...calendar];
  if (days.length && days[days.length - 1].count === 0) days.pop();
  for (let i = days.length - 1; i >= 0 && days[i].count > 0; i--) current++;

  return {
    contributions: calendar.reduce((sum, day) => sum + day.count, 0),
    activeDays: calendar.filter((day) => day.count > 0).length,
    longestStreak: longest,
    currentStreak: current,
  };
}

function rank(repos: RestRepo[], login: string): RestRepo[] {
  const own = repos.filter((repo) => !repo.fork && !repo.archived && !repo.private && repo.name !== login);
  const first = PRIORITY.map((name) => own.find((repo) => repo.name === name)).filter(Boolean) as RestRepo[];
  const rest = own
    .filter((repo) => !PRIORITY.includes(repo.name))
    .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));
  return [...first, ...rest];
}

async function getLanguages(repos: RestRepo[]): Promise<GitHubLanguage[]> {
  // What I write now, not what I wrote at university: only repositories pushed
  // in the last two years count, so a 2022 PHP side project cannot outweigh
  // this year's TypeScript and Python. Falls back to the newest few if that
  // leaves too little to chart.
  const cutoff = new Date(Date.now() - 2 * 365 * 24 * 3600 * 1000).toISOString();
  const byPush = [...repos].sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));
  const fresh = byPush.filter((repo) => repo.pushed_at >= cutoff);
  const recent = (fresh.length >= 3 ? fresh : byPush).slice(0, 8);
  const totals = new Map<string, number>();
  const results = await Promise.allSettled(
    recent.map((repo) =>
      getJSON<Record<string, number>>(`https://api.github.com/repos/${GITHUB_USER}/${repo.name}/languages`),
    ),
  );
  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    for (const [name, bytes] of Object.entries(result.value)) totals.set(name, (totals.get(name) ?? 0) + bytes);
  }
  const all = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  const sum = all.reduce((acc, [, bytes]) => acc + bytes, 0);
  if (!sum) throw new Error("no language data");
  const top = all.slice(0, 5);
  const other = all.slice(5).reduce((acc, [, bytes]) => acc + bytes, 0);
  const rows = top.map(([name, bytes]) => ({ name, bytes, share: bytes / sum, color: colorOf(name) }));
  if (other) rows.push({ name: "Other", bytes: other, share: other / sum, color: "#8b8b9a" });
  return rows;
}

const SNAPSHOT = snapshot as GitHubData;

export async function getGitHub(): Promise<GitHubData> {
  try {
    const [user, repos] = await Promise.all([
      getJSON<RestUser>(`https://api.github.com/users/${GITHUB_USER}`),
      getJSON<RestRepo[]>(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&type=owner&sort=pushed`),
    ]);
    const ranked = rank(repos, user.login);

    // Each of these can fail on its own; one failure keeps the saved version
    // of that piece rather than losing the whole section.
    const [calendar, languages] = await Promise.allSettled([getCalendar(), getLanguages(ranked)]);
    const days = calendar.status === "fulfilled" ? calendar.value : SNAPSHOT.calendar;

    return {
      source: "live",
      fetchedAt: new Date().toISOString(),
      profile: {
        login: user.login,
        name: user.name ?? user.login,
        bio: user.bio,
        avatar: user.avatar_url,
        url: user.html_url,
        location: user.location,
        createdAt: user.created_at,
        publicRepos: user.public_repos,
      },
      stats: summarise(days),
      calendar: days,
      languages: languages.status === "fulfilled" ? languages.value : SNAPSHOT.languages,
      repos: ranked.slice(0, 4).map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        color: colorOf(repo.language),
        stars: repo.stargazers_count,
        pushedAt: repo.pushed_at,
      })),
    };
  } catch {
    return { ...SNAPSHOT, source: "snapshot" };
  }
}
