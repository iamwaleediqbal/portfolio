/**
 * Import real model results from the agentscore repository.
 *
 * This site used to ship a committed `data/leaderboard.json` full of sample
 * numbers for five models, badged "sample data". A fabricated chart on a
 * portfolio whose argument is "I do evaluation honestly" is the one thing it
 * could not afford, and the badge did not fix it: the bars, the percentages
 * and the intervals all still rendered as concrete figures.
 *
 * So the figures come from the runs instead. agentscore records real Chromium
 * sessions against a deployed application and commits them; this reads that
 * file and reduces it to what a chart needs.
 *
 * A script rather than a build-time fetch, on purpose. A build that depends on
 * the network fails on the day GitHub is slow, and a portfolio that is down is
 * worse than one whose numbers are a fortnight old.
 *
 *   node scripts/import-model-results.mjs [path/to/index.json]
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SOURCE = process.argv[2] ?? "../agentscore/web/public/runs/index.json";
const OUT = resolve("data/model-results.json");
const Z = 1.959963984540054;

/** Wilson score interval — the same one both halves of agentscore compute. */
function wilson(passes, trials) {
  if (trials <= 0) return { point: 0, low: 0, high: 1 };
  const p = passes / trials;
  const denominator = 1 + (Z * Z) / trials;
  const centre = p + (Z * Z) / (2 * trials);
  const margin = Z * Math.sqrt((p * (1 - p)) / trials + (Z * Z) / (4 * trials * trials));
  return {
    point: p,
    low: Math.max(0, Math.min((centre - margin) / denominator, p)),
    high: Math.min(1, Math.max((centre + margin) / denominator, p)),
  };
}

const separated = (a, b) => a.low > b.high || b.low > a.high;

const index = JSON.parse(readFileSync(SOURCE, "utf8"));
const runs = index.runs ?? [];
if (!runs.length) {
  console.error(`${SOURCE} has no runs — nothing to import.`);
  process.exit(1);
}

const rows = new Map();
for (const run of runs) {
  const space = run.mode === "computer" ? "computer" : "tool";
  const key = `${run.model}:${space}`;
  const row = rows.get(key) ?? {
    model: run.model,
    space,
    scored: 0,
    unscored: 0,
    passes: 0,
    cost: 0,
    tasks: new Set(),
  };

  row.tasks.add(run.taskId);
  row.cost += run.cost ?? 0;

  // An attempt that never reached a model is not evidence about one, so it
  // comes out of the denominator rather than being scored zero.
  if (run.status === "infrastructure_error" || run.status === "config_error") {
    row.unscored += 1;
  } else {
    row.scored += 1;
    if (run.verdict?.status === "pass") row.passes += 1;
  }
  rows.set(key, row);
}

const models = [...rows.values()]
  .map((row) => ({ ...row, tasks: row.tasks.size, interval: wilson(row.passes, row.scored) }))
  .sort((a, b) => b.interval.point - a.interval.point);

// Rank against every other row, never against the one above: a chain that each
// overlaps the next would otherwise collapse into one tie even when its ends
// are plainly different.
const ranked = models.map((row) => ({
  model: row.model,
  space: row.space,
  tasks: row.tasks,
  passes: row.passes,
  scored: row.scored,
  unscored: row.unscored,
  cost: Number(row.cost.toFixed(6)),
  pass_rate: Number(row.interval.point.toFixed(4)),
  ci_low: Number(row.interval.low.toFixed(4)),
  ci_high: Number(row.interval.high.toFixed(4)),
  rank:
    models.filter(
      (other) =>
        other !== row &&
        separated(other.interval, row.interval) &&
        other.interval.point > row.interval.point,
    ).length + 1,
  tied: models.some((other) => other !== row && !separated(other.interval, row.interval)),
}));

const payload = {
  source: "agentscore",
  source_url: "https://agentscore-sigma.vercel.app/models",
  generated_at: index.generated_at ?? null,
  driver: index.driver ?? null,
  runs: runs.length,
  tasks: new Set(runs.map((r) => r.taskId)).size,
  models: ranked,
};

writeFileSync(OUT, `${JSON.stringify(payload, null, 2)}\n`);
console.log(
  `wrote ${OUT} — ${ranked.length} rows from ${runs.length} runs across ${payload.tasks} tasks`,
);
