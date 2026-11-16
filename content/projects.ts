/**
 * The projects, one case study each.
 *
 * Every number here was checked against the project's own code or committed
 * data before it went in. Keep it that way: a figure that cannot be traced
 * back to a repo, a run record or a test does not belong on the page.
 *
 * Written to be scanned, not read start to finish: one line per idea, and the
 * diagram does the explaining that paragraphs would otherwise try to do.
 */

import type { IconName } from "@/lib/tech-icons";

export type Tone = "cobalt" | "tangerine" | "sun" | "mint" | "pink" | "lilac" | "muted";
type Side = "top" | "right" | "bottom" | "left";

export interface DiagramNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  /** One or two short lines, split on \n. Keep each under the box width. */
  sub?: string;
  tone?: Tone;
  /** A dashed container drawn behind other nodes, titled in its corner. */
  group?: boolean;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  /** Arrowheads at both ends. */
  both?: boolean;
  fromSide?: Side;
  toSide?: Side;
  /** Where along the side the edge leaves or lands, 0 to 1. */
  fromAt?: number;
  toAt?: number;
}

export interface Diagram {
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  /** Two or three lines under the drawing: what to notice. */
  notes: string[];
}

export interface Tech {
  name: string;
  icon?: IconName;
  why: string;
}

export interface Shot {
  src: string;
  alt: string;
  caption: string;
  url: string;
  width?: number;
  height?: number;
}

export interface Project {
  slug: string;
  name: string;
  kind: "main" | "companion" | "product";
  /** The pill above the title. */
  label: string;
  tagline: string;
  /** Two lines for the project tiles. */
  summary: string;
  facts: { role: string; year: string; status: string; runs: string };
  repo?: string;
  live?: string;
  image?: string;
  stats: { value: string; label: string }[];
  /** Two or three sentences. Not an essay. */
  problem: string;
  diagram: Diagram;
  stack: Tech[];
  /** How the work was scoped, tested, paid for and shipped. */
  managed: { title: string; body: string }[];
  decisions: { title: string; body: string }[];
  results: string[];
  gallery: Shot[];
}

export const projects: Project[] = [
  /* ───────────────────────────── agentscore ───────────────────────────── */
  {
    slug: "agentscore",
    name: "agentscore",
    kind: "main",
    label: "Main project, open source",
    tagline:
      "An evaluation harness for computer use agents. It drives a real app in a real browser and grades what the agent left behind.",
    summary:
      "Runs an AI agent through a live web app in Chromium, then grades what changed. Every verdict can be recomputed from saved snapshots.",
    facts: { role: "Solo, end to end", year: "2026", status: "Open source, MIT", runs: "Static site on Vercel" },
    repo: "https://github.com/iamwaleediqbal/agentscore",
    live: "https://agentscore-sigma.vercel.app",
    image: "/shots/agentscore.webp",
    stats: [
      { value: "48", label: "recorded runs, 5 models, 6 tasks" },
      { value: "$0.65", label: "total model spend for all 48" },
      { value: "24 / 26", label: "passed with tool calling, against 12 / 22 with screenshots" },
      { value: "347", label: "tests, and they run with no install" },
    ],
    problem:
      "Most agent benchmarks report one number from one run. Run it again and the order changes, and nobody can say why. I wanted verdicts anyone can check: graded on what the agent changed, kept with their evidence, and honest about how sure they are.",
    diagram: {
      width: 900,
      height: 510,
      nodes: [
        { id: "tasks", x: 20, y: 30, w: 190, title: "Task suite", sub: "6 tasks in plain English", tone: "sun" },
        { id: "runner", x: 290, y: 30, w: 230, title: "Runner", sub: "Node · Playwright · turn loop", tone: "cobalt" },
        { id: "model", x: 640, y: 30, w: 240, title: "Model API", sub: "OpenRouter and providers", tone: "lilac" },
        { id: "polyact", x: 20, y: 170, w: 190, title: "polyact vectors", sub: "coordinate rules", tone: "pink" },
        { id: "chromium", x: 290, y: 170, w: 230, title: "Chromium", sub: "a real browser, nothing stubbed", tone: "muted" },
        { id: "clickmail", x: 640, y: 170, w: 240, title: "clickmail", sub: "the app under test, on Vercel", tone: "mint" },
        { id: "grader", x: 290, y: 310, w: 230, title: "Grader", sub: "diff of before and after", tone: "tangerine" },
        { id: "record", x: 290, y: 430, w: 230, title: "Run record", sub: "one JSON file in git", tone: "sun" },
        { id: "console", x: 640, y: 430, w: 240, title: "Console", sub: "static Next.js, no API key", tone: "cobalt" },
      ],
      edges: [
        { from: "tasks", to: "runner", label: "task" },
        { from: "runner", to: "model", label: "observe, act", both: true },
        { from: "polyact", to: "runner", label: "tested against", dashed: true, fromSide: "right", toSide: "left", toAt: 0.78 },
        { from: "runner", to: "chromium", label: "performs it" },
        { from: "chromium", to: "clickmail", label: "drives the page" },
        { from: "clickmail", to: "grader", label: "state before and after", fromSide: "bottom", toSide: "right" },
        { from: "grader", to: "record", label: "verdict" },
        { from: "record", to: "console", label: "read only" },
      ],
      notes: [
        "Both snapshots come from the app and meet only at the grader. The agent never touches what it is measured against.",
        "polyact's coordinate rules ship as test vectors, and the TypeScript runner must agree with every case.",
        "The console reads committed JSON and nothing else. No server, no database, no key.",
      ],
    },
    stack: [
      { name: "Playwright + Chromium", icon: "chrome", why: "A real browser, so the agent sees the page a person sees." },
      { name: "TypeScript + Node", icon: "typescript", why: "Runner, grader and console share one set of types." },
      { name: "Next.js on Vercel", icon: "nextjs", why: "The console is static and only reads committed runs." },
      { name: "Python", icon: "python", why: "The text only suite: graders, Wilson intervals, ranking." },
      { name: "OpenRouter", why: "One key for many models, with free variants for testing." },
      { name: "GitHub Actions", icon: "githubactions", why: "Records runs on demand. No server to keep alive." },
    ],
    managed: [
      { title: "Scope", body: "Split the problem into three repos: the provider layer, the app under test and the harness. Each one reads on its own." },
      { title: "Quality", body: "347 tests on Node's own runner. One of them rebuilds all 48 published verdicts from the snapshots alone." },
      { title: "Cost", body: "48 runs for $0.65 in total. Every run file records its own tokens and cost, so spend is never a guess." },
      { title: "Shipping", body: "Runs are recorded on demand and committed as JSON. The site deploys as static files." },
    ],
    decisions: [
      { title: "Four verdicts, not two", body: "Pass, incomplete, overreach, or both. Overreach on its own was the most common computer use failure: 6 of the 10." },
      { title: "Two action spaces, never averaged", body: "Each task runs with a screenshot and with the screen as text. Passing one and failing the other means the model understood the job and missed the button." },
      { title: "Regrade without a model", body: "npm run regrade scores every past run again from its snapshots after a grader change, with no model, browser or app, and lists which verdicts moved." },
      { title: "Intervals, not percentages", body: "Wilson 95% intervals. Three out of three is 100% with a lower bound near 44%. Overlapping models share a rank." },
      { title: "A failed request is not a failed model", body: "Timeouts and 429s never reached the model, so they are dropped and counted in their own column instead of scored as zero." },
      { title: "Judge last, and it fails closed", body: "Exact, contains, regex, numeric and JSON checks run first. A judge is used only for reading problems, and bad judge output fails." },
    ],
    results: [
      "Tool calling passed 24 of 26 runs. Computer use passed 12 of 22.",
      "Four of the five models passed more often reading the screen as text. One, gpt-5.6-luna, did better with screenshots: 6 of 6.",
      "A paid Gemini run exposed a 0 to 1000 grid read as pixels. The rule now lives in tested vectors shared with polyact.",
      "At this number of runs most models are statistically tied, and the leaderboard says so instead of inventing a winner.",
    ],
    gallery: [
      { src: "/shots/agentscore-run.webp", alt: "One run in the agentscore console", caption: "One run: what the task required, what changed, and what nobody asked for.", url: "agentscore-sigma.vercel.app/runs" },
      { src: "/shots/agentscore-models.webp", alt: "Models page with 95% intervals", caption: "Models ranked by interval. Overlaps are marked as ties.", url: "agentscore-sigma.vercel.app/models" },
      { src: "/shots/agentscore-graders.webp", alt: "The grading rule", caption: "The whole grading rule, as it runs.", url: "agentscore-sigma.vercel.app/graders" },
    ],
  },

  /* ───────────────────────────── polyact ───────────────────────────── */
  {
    slug: "polyact",
    name: "polyact",
    kind: "companion",
    label: "Built for agentscore",
    tagline:
      "One action schema for computer use agents. Four providers describe the same click four different ways. polyact turns them into one record, in real screen pixels.",
    summary:
      "A Python library that turns OpenAI, Anthropic, Gemini and open model responses into one action format, with token counts that mean the same thing.",
    facts: { role: "Solo, end to end", year: "2026", status: "Open source, MIT", runs: "Python library" },
    repo: "https://github.com/iamwaleediqbal/polyact",
    stats: [
      { value: "4", label: "provider formats in, one schema out" },
      { value: "71", label: "tests, all offline" },
      { value: "0.08s", label: "for the whole test suite" },
      { value: "0", label: "runtime dependencies" },
    ],
    problem:
      "Providers disagree about what their own output means, and the differences never raise an error. Read a Gemini click as pixels and the agent hits the top left corner of every screen. It does not crash. It scores zero and looks like a weak model.",
    diagram: {
      width: 900,
      height: 420,
      nodes: [
        { id: "openai", x: 20, y: 96, w: 200, h: 56, title: "OpenAI", sub: "pixels", tone: "muted" },
        { id: "anthropic", x: 20, y: 168, w: 200, h: 56, title: "Anthropic", sub: "pixels, as an array", tone: "muted" },
        { id: "gemini", x: 20, y: 240, w: 200, h: 56, title: "Gemini", sub: "0 to 1000 grid", tone: "muted" },
        { id: "open", x: 20, y: 312, w: 200, h: 56, title: "Open models", sub: "XML calls, fixed canvas", tone: "muted" },
        { id: "vectors", x: 300, y: 24, w: 230, h: 56, title: "Conformance vectors", sub: "used by agentscore", tone: "pink" },
        { id: "parsers", x: 300, y: 96, w: 230, h: 272, title: "Provider parsers", sub: "one per response format", tone: "cobalt" },
        { id: "coords", x: 610, y: 20, w: 270, title: "Coordinates", sub: "to screen pixels, raw value kept", tone: "tangerine" },
        { id: "usage", x: 610, y: 130, w: 270, title: "Token usage", sub: "cache and thinking counted once", tone: "sun" },
        { id: "action", x: 610, y: 240, w: 270, title: "NormalizedAction", sub: "one record per action", tone: "mint" },
        { id: "runner", x: 610, y: 340, w: 270, title: "AgentRunner", sub: "budgets and five end reasons", tone: "lilac" },
      ],
      edges: [
        { from: "openai", to: "parsers", fromSide: "right", toSide: "left", toAt: 0.103 },
        { from: "anthropic", to: "parsers", fromSide: "right", toSide: "left", toAt: 0.368 },
        { from: "gemini", to: "parsers", fromSide: "right", toSide: "left", toAt: 0.632 },
        { from: "open", to: "parsers", fromSide: "right", toSide: "left", toAt: 0.897 },
        { from: "parsers", to: "coords", fromSide: "right", toSide: "left", fromAt: 0.05 },
        { from: "parsers", to: "usage", fromSide: "right", toSide: "left", fromAt: 0.243 },
        { from: "parsers", to: "action", fromSide: "right", toSide: "left", fromAt: 0.647 },
        { from: "action", to: "runner", label: "each turn" },
        { from: "coords", to: "vectors", label: "published", dashed: true },
      ],
      notes: [
        "Every action keeps the raw value and the space it came from, so a trace can always be audited.",
        "Transport failures stay separate from model failures all the way to the report.",
        "The model call and the executor are injected, which is why the run loop is testable offline.",
      ],
    },
    stack: [
      { name: "Python 3.10+", icon: "python", why: "Pure Python. Parsing and accounting touch nothing outside." },
      { name: "asyncio", why: "The run loop awaits an injected model call and executor." },
      { name: "pytest", icon: "pytest", why: "71 tests named after the bugs they prevent." },
      { name: "JSON test vectors", icon: "json", why: "The coordinate rules, in a form any language can test against." },
      { name: "httpx, optional", why: "Only for the OpenRouter client, behind an extra." },
    ],
    managed: [
      { title: "Scope", body: "Small on purpose. No prompts, no planner, no framework. Only the layer under them." },
      { title: "Quality", body: "71 tests run offline in about a tenth of a second. The first ones to read encode real bugs." },
      { title: "Interop", body: "The rules ship as JSON vectors, so a second implementation in another language can prove it agrees." },
      { title: "Dependencies", body: "None at runtime. httpx is needed only by the optional OpenRouter client." },
    ],
    decisions: [
      { title: "Convert on the way in", body: "Pixels, a 0 to 1000 grid and a fixed 1428 by 896 canvas all become real screen pixels before anything else sees them." },
      { title: "Token counts that agree", body: "OpenAI counts cached tokens inside input. Anthropic leaves them out. A test asserts the same work reported both ways comes out equal." },
      { title: "Truncated output is the model's failure", body: "A tool call cut off mid JSON is recorded as an unknown action with its parse error, not logged as infrastructure." },
      { title: "Refuse unaligned grids", body: "A fixed grid that does not match the vision model's patch size raises, because its edge coordinates drift." },
      { title: "Named fields only if every provider fills them", body: "Anything provider specific goes in metadata, so a missing value never looks universal downstream." },
    ],
    results: [
      "agentscore's TypeScript runner is tested against these vectors, so both repos must agree on every coordinate case.",
      "Five ways a run can end, kept apart: completed, out of budget, stopped acting, transport error, environment error.",
      "A failed click no longer loses the trace. The run returns its actions, usage and end reason.",
    ],
    gallery: [],
  },

  /* ───────────────────────────── clickmail ───────────────────────────── */
  {
    slug: "clickmail",
    name: "clickmail",
    kind: "companion",
    label: "Built for agentscore",
    tagline:
      "A mail client built to be operated by AI agents. It is the app agentscore drives, and it knows nothing about tasks, grading or models.",
    summary:
      "A public web mail client with 52 messages in 7 folders. A tiny read and reset contract lets a harness record its state, and nothing more.",
    facts: { role: "Solo, end to end", year: "2026", status: "Open source, MIT", runs: "Next.js on Vercel" },
    repo: "https://github.com/iamwaleediqbal/clickmail",
    live: "https://clickmail-sigma.vercel.app/gym",
    image: "/shots/clickmail-open.webp",
    stats: [
      { value: "52", label: "messages across 7 folders" },
      { value: "39", label: "tests with zero dependencies" },
      { value: "14", label: "known bugs a mutation check puts back" },
      { value: "0", label: "API routes or environment variables" },
    ],
    problem:
      "An app that contains its own grader can only ever grade itself, so its scores say nothing about real software. I wanted a normal web app that a harness drives from outside, the way any visitor would.",
    diagram: {
      width: 900,
      height: 380,
      nodes: [
        { id: "harness", x: 20, y: 50, w: 200, h: 178, title: "agentscore", sub: "drives it from outside\nover plain HTTP", tone: "cobalt" },
        { id: "gym", x: 330, y: 16, w: 550, h: 236, title: "/gym on Vercel", group: true },
        { id: "contract", x: 360, y: 50, w: 210, title: "window.clickmail", sub: "reset · state · controls", tone: "mint" },
        { id: "state", x: 650, y: 50, w: 210, title: "State", sub: "one JSON value", tone: "sun" },
        { id: "ui", x: 360, y: 164, w: 210, title: "Mailbox UI", sub: "every control has a test id", tone: "muted" },
        { id: "reducer", x: 650, y: 164, w: 210, title: "Reducer", sub: "action in, next state out", tone: "tangerine" },
        { id: "tests", x: 360, y: 296, w: 210, title: "39 tests", sub: "Node's own runner, no deps", tone: "lilac" },
        { id: "mutation", x: 650, y: 296, w: 210, title: "Mutation check", sub: "puts 14 known bugs back", tone: "pink" },
      ],
      edges: [
        { from: "harness", to: "contract", label: "reset, read", fromSide: "right", toSide: "left", fromAt: 0.18 },
        { from: "harness", to: "ui", label: "clicks, types", fromSide: "right", toSide: "left", fromAt: 0.82 },
        { from: "contract", to: "state", label: "reads", both: true },
        { from: "ui", to: "reducer", label: "action" },
        { from: "reducer", to: "state", label: "next state" },
        { from: "mutation", to: "tests", label: "must fail", dashed: true },
      ],
      notes: [
        "There is no way to write state from outside. A driver that could write the world could write the answer.",
        "controls() reports what is on screen, and the harness refuses to start if a control it needs is missing.",
        "reset() restores the same seeded world every time, so runs repeat and one agent never inherits another's mess.",
      ],
    },
    stack: [
      { name: "Next.js", icon: "nextjs", why: "A normal web app, deployed like any other." },
      { name: "TypeScript", icon: "typescript", why: "The contract and the state shape are typed end to end." },
      { name: "Node test runner", icon: "nodejs", why: "39 tests, no dependencies, green before npm install." },
      { name: "Vercel", icon: "vercel", why: "A public URL with nothing to configure." },
      { name: "Python", icon: "python", why: "The mutation check that proves the tests can fail." },
      { name: "GitHub Actions", icon: "githubactions", why: "Tests and the mutation check on every push." },
    ],
    managed: [
      { title: "Scope", body: "Kept small on purpose: no grader, no tasks, no models, no keys. All of that lives in agentscore." },
      { title: "Quality", body: "39 tests, plus a mutation check that reintroduces 14 known bugs one at a time and fails if the suite stays green." },
      { title: "Contract", body: "Versioned, so a harness can refuse a shape it does not understand, and named, so it notices the wrong page." },
      { title: "Shipping", body: "Deploys on Vercel with nothing to set. CI runs the same checks on every push." },
    ],
    decisions: [
      { title: "Read and reset only", body: "The harness can read the world or reset it. It cannot install a state, because then it could install the answer." },
      { title: "The world is one value", body: "One JSON object holds everything, so did the agent do the task becomes a comparison of two values." },
      { title: "Opening an email marks it read", body: "Like a real client. It is also the most common way an agent changes something nobody asked for." },
      { title: "A clear button for search", body: "Without it, a second search cost about seven turns of backspacing. A turn spent clearing a field measures nothing." },
      { title: "No keys, by construction", body: "Not one environment variable is read. It cannot reach a model because it cannot hold a credential." },
    ],
    results: [
      "agentscore has driven it for all 48 recorded runs, over plain HTTP like any other visitor.",
      "The seeded world is fixed: inbox 18, drafts 4, outbox 2, sent 6, spam 9, archive 8, trash 5.",
      "Fixes like save draft and search clear each have a mutation guarding them, so they cannot quietly come back.",
    ],
    gallery: [],
  },

  /* ───────────────────────────── Anchorly ───────────────────────────── */
  {
    slug: "anchorly",
    name: "Anchorly",
    kind: "product",
    label: "Live product",
    tagline:
      "An AI shopping assistant for Shopify stores. It answers every shopper question from the store's own catalogue and policies.",
    summary:
      "Answers questions about products, prices, stock and policies from the store's own data. Facts come from live lookups, never from model memory.",
    facts: { role: "Solo, end to end", year: "2026", status: "In production", runs: "Railway and Neon" },
    live: "https://anchorlychat.com",
    image: "/shots/anchorly.webp",
    stats: [
      { value: "51 / 51", label: "right product found in testing" },
      { value: "8 / 8", label: "honest answers when the store did not sell it" },
      { value: "0", label: "invented prices or links" },
      { value: "$0.001", label: "model cost per shopper message" },
    ],
    problem:
      "Shopify chatbot apps get uninstalled for inventing prices, mixing up products and making up policies. For a store, one wrong price in chat is worse than no chat. Anchorly never hands the model facts to misremember.",
    diagram: {
      width: 900,
      height: 500,
      nodes: [
        { id: "shopper", x: 20, y: 20, w: 220, title: "Storefront widget", sub: "theme app extension", tone: "mint" },
        { id: "shopify", x: 340, y: 20, w: 220, title: "Shopify", sub: "webhooks, Admin API", tone: "muted" },
        { id: "merchant", x: 660, y: 20, w: 220, title: "Merchant admin", sub: "embedded, Polaris", tone: "muted" },
        { id: "web", x: 200, y: 150, w: 500, h: 74, title: "web process", sub: "chat proxy · admin · webhooks\nagent loop with scoped tools", tone: "cobalt" },
        { id: "worker", x: 200, y: 300, w: 500, h: 74, title: "worker process", sub: "catalogue sync · photo descriptions\nknowledge base · answer audits", tone: "tangerine" },
        { id: "pg", x: 20, y: 420, w: 250, title: "Postgres + pgvector", sub: "catalogue and knowledge, Neon", tone: "sun" },
        { id: "redis", x: 325, y: 420, w: 250, title: "Redis", sub: "BullMQ queues, rate limits", tone: "pink" },
        { id: "llm", x: 630, y: 420, w: 250, title: "Model gateway", sub: "OpenRouter, every call metered", tone: "lilac" },
      ],
      edges: [
        { from: "shopper", to: "web", label: "App Proxy, signed", fromSide: "bottom", toSide: "top", toAt: 0.12 },
        { from: "shopify", to: "web", label: "webhooks", fromSide: "bottom", toSide: "top" },
        { from: "merchant", to: "web", label: "session token", fromSide: "bottom", toSide: "top", toAt: 0.88 },
        { from: "web", to: "worker", label: "jobs" },
        { from: "web", to: "pg", label: "hybrid search", fromSide: "left", toSide: "top", toAt: 0.3 },
        { from: "worker", to: "pg", fromSide: "bottom", toSide: "top", fromAt: 0.1, toAt: 0.75 },
        { from: "worker", to: "redis", label: "queues", fromSide: "bottom", toSide: "top" },
        { from: "web", to: "llm", label: "chat", fromSide: "right", toSide: "top", toAt: 0.5 },
        { from: "worker", to: "llm", fromSide: "bottom", toSide: "top", fromAt: 0.9, toAt: 0.2 },
      ],
      notes: [
        "The widget talks through Shopify's signed App Proxy, so a shopper's identity cannot be forged and no key sits in the theme.",
        "Every tool takes a scope built on the server. No tool has a parameter for another store, so the model cannot ask for one.",
        "Prices, stock and policies are read at the moment of asking. Photo descriptions make products findable but are never quoted as specs.",
      ],
    },
    stack: [
      { name: "Shopify app + Polaris", icon: "shopify", why: "The official app template and the admin UI merchants know." },
      { name: "Node.js + TypeScript", icon: "nodejs", why: "One codebase, deployed as a web and a worker process." },
      { name: "PostgreSQL + pgvector", icon: "postgresql", why: "Catalogue, full text and vector search in one database." },
      { name: "Prisma", icon: "prisma", why: "Typed queries. Migrations written by hand for generated columns." },
      { name: "Redis + BullMQ", icon: "redis", why: "Background sync and photo descriptions, with rate limits." },
      { name: "OpenRouter", why: "One gateway to every model, and every call is metered." },
      { name: "Railway + Neon", icon: "railway", why: "Web and worker on Railway, Postgres on Neon." },
    ],
    managed: [
      { title: "Testing", body: "One test store holding 280 products from seven vendors: shoes, cosmetics with no descriptions, coffee, bedding, pet gear, olive oil, and a German catalogue." },
      { title: "Model choice", body: "Three models on the same 66 conversations. gpt-4o-mini matched Claude Haiku at a tenth of the price, so it shipped." },
      { title: "Quality", body: "About 290 tests that run without Postgres, Redis or a model. make verify runs types, tests and the production build before a push." },
      { title: "Cost control", body: "Development is locked to free models: the gateway refuses paid ones outside production." },
    ],
    decisions: [
      { title: "Facts come from tools", body: "Prices, stock, variants and policies are database lookups made when the shopper asks. The prompt is only a second line of defence." },
      { title: "Search by how products look", body: "A vision model describes each product photo once at sync, so \"a light blue bag\" works even with no description. Cached on a hash, so resyncs are free." },
      { title: "Hybrid retrieval", body: "Keyword and vector search run together and merge by rank fusion, so exact names and SKUs still match." },
      { title: "\"I don't know\" is a success", body: "Below a relevance floor nothing is returned, and the assistant offers to take the shopper's details." },
      { title: "Switches remove tools", body: "A merchant turning a topic off removes the tool. It does not ask the model nicely." },
      { title: "Indexed vector search", body: "HNSW indexing: 2 ms against 827 ms unindexed, measured on 65,000 chunks." },
    ],
    results: [
      "51 of 51 right products, 8 of 8 honest \"not sold\" answers, 7 of 7 follow ups, and no invented links or prices.",
      "Testing on varied catalogues caught real bugs: a safety check had blocked 5 correct replies, and no single similarity threshold worked across stores.",
      "Unanswered questions are deduplicated and counted, so support volume becomes a list of what to write next.",
      "Merchants can run audits that write questions from their own catalogue and grade the answers.",
    ],
    gallery: [
      { src: "/shots/anchorly-admin.webp", alt: "Anchorly merchant dashboard", caption: "The merchant side: unanswered questions, audits and switches.", url: "anchorlychat.com" },
      { src: "/shots/anchorly-look.webp", alt: "Anchorly finding a bag by colour", caption: "Found by how it looks. The tote has no description at all.", url: "larkfield demo store", width: 1040, height: 900 },
      { src: "/shots/anchorly-language.webp", alt: "Anchorly answering in German", caption: "Asked in German, answered in German from an English catalogue.", url: "larkfield demo store", width: 1040, height: 900 },
      { src: "/shots/anchorly-policy.webp", alt: "Anchorly declining to invent a policy", caption: "No refund policy published, so it does not invent one.", url: "larkfield demo store", width: 1040, height: 900 },
    ],
  },

  /* ───────────────────────── My Quran Companion ───────────────────────── */
  {
    slug: "my-quran-companion",
    name: "My Quran Companion",
    kind: "product",
    label: "Live product",
    tagline:
      "An AI companion that answers only from the Quran and authentic hadith, with every source shown in full.",
    summary:
      "Ask in your own language and get a reply built only from the Quran and authentic hadith. The app shows the exact text of every source.",
    facts: { role: "Solo, end to end", year: "2026", status: "Live, free, no ads", runs: "Web app and Android" },
    live: "https://myqurancompanion.com",
    image: "/shots/quran.webp",
    stats: [
      { value: "29,360", label: "hadith pass every authenticity gate, of 69,408 stored" },
      { value: "6,236", label: "ayahs, with 7 translations" },
      { value: "8", label: "languages, right to left included" },
      { value: "400+", label: "tests across builder, backend and app" },
    ],
    problem:
      "A general chatbot will happily make up a hadith or misquote an ayah, and on this subject a made up source is the worst possible failure. Every answer here has to trace back to a source the reader can check.",
    diagram: {
      width: 900,
      height: 480,
      nodes: [
        { id: "sources", x: 20, y: 30, w: 200, h: 74, title: "Sources", sub: "Tanzil, 10 hadith books,\nHadeethEnc, QuranEnc", tone: "muted" },
        { id: "builder", x: 300, y: 30, w: 260, h: 74, title: "Data builder", sub: "Python · LangGraph\nresumable, safe to rerun", tone: "tangerine" },
        { id: "enrich", x: 640, y: 30, w: 240, h: 74, title: "Tags and vectors", sub: "Claude batch API\nOpenRouter embeddings", tone: "lilac" },
        { id: "content", x: 300, y: 190, w: 260, h: 74, title: "Content DB", sub: "Quran, hadith, tafsir, duas\npgvector, read only role", tone: "sun" },
        { id: "app", x: 20, y: 358, w: 200, h: 74, title: "Expo app", sub: "web on Cloudflare\nAndroid, 8 languages", tone: "mint" },
        { id: "backend", x: 300, y: 350, w: 260, h: 90, title: "Backend", sub: "FastAPI · LangGraph\nchecks every citation", tone: "cobalt" },
        { id: "model", x: 640, y: 330, w: 240, title: "Chat model", sub: "Anthropic, OpenRouter fallback", tone: "pink" },
        { id: "appdb", x: 640, y: 404, w: 240, title: "App DB", sub: "chats encrypted, costs logged", tone: "sun" },
      ],
      edges: [
        { from: "sources", to: "builder", label: "import" },
        { from: "builder", to: "enrich", label: "batch", both: true },
        { from: "builder", to: "content", label: "writes" },
        { from: "app", to: "backend", label: "asks", fromSide: "right", toSide: "left", toAt: 0.411 },
        { from: "backend", to: "content", label: "reads only" },
        { from: "backend", to: "model", label: "sources", both: true, fromSide: "right", toSide: "left", fromAt: 0.133 },
        { from: "backend", to: "appdb", label: "encrypted", fromSide: "right", toSide: "left", fromAt: 0.955 },
      ],
      notes: [
        "The model never writes scripture. It picks numbered sources, and the app shows their exact text from the database.",
        "A reply that cites anything outside the retrieved sources is rejected, retried once, then replaced by a fixed message.",
        "Scripture and user data live in separate databases, linked only by ids like quran:2:255.",
      ],
    },
    stack: [
      { name: "FastAPI", icon: "fastapi", why: "Async API for chat, auth and the app." },
      { name: "LangGraph", icon: "langchain", why: "The chat flow as a graph, and a data build that resumes." },
      { name: "PostgreSQL + pgvector", icon: "postgresql", why: "Two databases: scripture apart from user data." },
      { name: "Expo + React Native", icon: "expo", why: "One codebase for the web app and Android." },
      { name: "Anthropic", icon: "anthropic", why: "Chat replies, and one off tagging on the batch API." },
      { name: "Cloudflare Workers", icon: "cloudflare", why: "Serves the web app and landing pages." },
      { name: "Railway + Neon", icon: "railway", why: "Backend on Railway, both databases on Neon." },
    ],
    managed: [
      { title: "Structure", body: "Three parts, one contract: the data builder, the backend and the app agree on a single API document." },
      { title: "Quality", body: "More than 400 tests across the three parts, and a verify step that checks counts, grades and licences." },
      { title: "Cost", body: "Tagging ran once on Claude's batch API at half price, about $1.50. Every model call is logged with its cost." },
      { title: "Operations", body: "A runbook for health checks, alerts, restores, rollbacks and key rotation." },
    ],
    decisions: [
      { title: "Authenticity gates", body: "A hadith reaches a reply only if graded sahih or hasan, complete, with a connected chain, and its Arabic confirmed against an independent copy." },
      { title: "Check a saying you heard", body: "An Arabic quote is matched word for word. The reply says whether a source matches, is similar, or was not found." },
      { title: "No rulings", body: "Questions asking for a fatwa are pointed to a qualified scholar, with related sources and no ruling drawn." },
      { title: "Help in a crisis", body: "Crisis words in all 8 languages and Roman Urdu show a helpline card, with or without the AI." },
      { title: "Private by default", body: "Messages, chat titles and search queries are encrypted with AES-256-GCM in the app database." },
    ],
    results: [
      "29,360 of 69,408 stored hadith pass every gate. Missing a true hadith is acceptable here. Showing a wrong one is not.",
      "1,581 duas are tagged with the situations they are for, so a problem gets the dua taught for it.",
      "Live on the web with an Android app, free and without ads, in Arabic, Urdu, English, Bengali, Hindi, Turkish, Indonesian and Malay.",
    ],
    gallery: [
      { src: "/shots/quran-sources.webp", alt: "Sources and method section", caption: "Only what can be traced: the numbers behind every answer.", url: "myqurancompanion.com" },
      { src: "/shots/quran-how.webp", alt: "How it works section", caption: "A gentle reply, with its sources in full.", url: "myqurancompanion.com" },
      { src: "/shots/quran-checker.webp", alt: "Hadith checker guide", caption: "A guide to checking a hadith you heard.", url: "myqurancompanion.com/hadith-checker" },
    ],
  },
];

export const projectBySlug = (slug: string) => projects.find((project) => project.slug === slug);
