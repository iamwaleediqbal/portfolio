/**
 * Everything editable lives here.
 *
 * The pages read from this file so that changing a claim is a one-line edit
 * rather than a hunt through JSX. Replace iamwaleediqbal and the contact details
 * before deploying.
 */

export const profile = {
  name: "Waleed Iqbal",
  role: "Senior Software Engineer",
  focus: "Agent systems, evaluation, and the full stack around them",
  location: "Faisalabad, Pakistan",
  photo: "/waleed.jpg",
  available: "Open to senior roles and contract work, remote or relocating",
  email: "waleediqbal28@gmail.com",
  github: "https://github.com/iamwaleediqbal",
  linkedin: "https://www.linkedin.com/in/iamwaleediqbal",
  headline: "I build agent systems that survive contact with real users, and the tooling that proves whether they do.",
  intro: [
    "I have been shipping production software since 2021 — Ruby on Rails, React, Node, Python and Next.js — across commerce, publishing and fintech products, and for the last three years on agent systems full time.",
    "That current work is an evaluation platform for computer-use agents: a Python and Postgres backend with a Next.js front end, running batches of model attempts against browser and desktop environments, grading them against a known-good end state, and packaging the results for delivery to the client.",
    "It drives OpenAI, Anthropic, Gemini and self-hosted models through one code path. That is harder than it sounds: every provider returns a different action format, in a different coordinate space, with token accounting that disagrees about what it is counting. All of it has to mean the same thing before anything downstream can use it.",
    "The earlier years are where the engineering habits came from — client products with real deadlines, a Shopify app with Stripe billing and webhook handling, and a full rebuild of a live product onto Next.js and Django without dropping its users.",
    "That platform is not public. So the projects below are the same ideas rebuilt in the open, small enough to read in one sitting.",
  ],
  // Facts about the work, not about the website. Anything that only makes sense
  // to whoever built this page does not belong on it.
  stats: [
    { value: 5, suffix: "+", label: "Years in production", hint: "Rails, React, Python, Next.js" },
    { value: 3, suffix: "", label: "Years on agent systems", hint: "Evaluation platforms, full time" },
    { value: 4, suffix: "", label: "Model providers unified", hint: "One action schema across all" },
    { value: 4, suffix: "", label: "Products shipped", hint: "Commerce, publishing, fintech" },
  ],
};

/**
 * Grouped so the page reads as capability rather than a word cloud. Colour is
 * assigned per group in fixed order from a validated categorical palette — the
 * label always carries the meaning, the dot only reinforces it.
 */
export const skills = [
  {
    group: "AI & agents",
    tone: 1,
    items: [
      "Agent architecture",
      "LLM evaluation",
      "Tool calling",
      "RAG",
      "OpenAI",
      "Anthropic",
      "Gemini",
      "OpenRouter",
      "vLLM",
    ],
  },
  {
    group: "Backend",
    tone: 2,
    items: ["Python", "FastAPI", "Celery", "Ruby on Rails", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    group: "Frontend",
    tone: 3,
    items: ["TypeScript", "Next.js", "React", "Remix", "Tailwind", "shadcn/ui"],
  },
  {
    group: "Infrastructure",
    tone: 4,
    items: ["Docker", "Kubernetes", "GCP", "GitHub Actions", "GitLab CI", "Vercel"],
  },
  {
    group: "Commerce",
    tone: 5,
    items: ["Shopify apps", "Stripe", "Webhooks", "Prisma"],
  },
];

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  /** What this is a reduced, public version of. */
  mirrors?: string;
  what: string;
  why: string;
  stack: string[];
  repo?: string;
  live?: string;
  status: "open source" | "live demo" | "product";
  highlights: string[];
}

export const projects: Project[] = [
  {
    slug: "polyact",
    name: "polyact",
    tagline: "One action schema for computer-use agents",
    status: "open source",
    mirrors:
      "The provider-agnostic layer inside the evaluation platform I work on, extracted and rewritten in the open.",
    what: "A Python library that turns four incompatible provider response formats into one record, in real screen pixels, with token accounting that survives a provider change.",
    why: "The largest source of quiet, score-corrupting bugs in agent evaluation is not prompting or grading. It is that providers disagree about what their own output means, and the disagreements do not raise. They degrade.",
    stack: ["Python", "async", "pytest"],
    repo: "https://github.com/iamwaleediqbal/polyact",
    highlights: [
      "Gemini emits 0-1000 coordinates, OpenAI emits pixels. Read one as the other and the agent clicks the top-left corner of every screen forever, scores zero, and looks like a weak model.",
      "OpenAI's input token count includes cached tokens. Anthropic's excludes them. Get it backwards and a cached run looks cheaper than it was until the invoice arrives.",
      "A broken proxy is not a bad model. Transport failures are kept separate from model failures all the way to the report, because an attempt that never reached a model is an absent measurement, not a zero.",
      "55 tests, no network.",
    ],
  },
  {
    slug: "agentscore",
    name: "agentscore",
    tagline: "An evaluation harness that refuses to overclaim",
    status: "open source",
    mirrors:
      "The batch runner and scoring pipeline, minus the queueing, the reviewer workflow and the delivery packaging.",
    what: "Runs a task suite against several models, repeats every task, and reports pass rates with confidence intervals instead of a single number. Benchmarks free models, because that is the question nobody with a budget bothers to answer.",
    why: "One run is not a result. A leaderboard built from single runs reorders itself nightly for no reason anyone can explain.",
    stack: ["Python", "GitHub Actions", "OpenRouter"],
    repo: "https://github.com/iamwaleediqbal/agentscore",
    highlights: [
      "Wilson intervals, so three out of three reports 100% with a lower bound near 44%, which is the correct amount of confidence to have in three attempts.",
      "Overlapping intervals share a rank and are marked tied. Ranking them anyway invents a difference the data cannot support.",
      "Deterministic checks run first. A judge is a model, so it brings its own variance on top of the variance you were trying to measure, and it is a last resort rather than a default.",
      "Runs nightly in GitHub Actions and commits a JSON file. No server, no database.",
    ],
  },
  {
    slug: "clickgym",
    name: "clickgym",
    tagline: "A browser gym graded on final state, not the route taken",
    status: "live demo",
    mirrors:
      "A single browser gym with one task suite. The production version runs hundreds of tasks across cloned web apps and full desktop VMs, on a queue, with human review.",
    what: "Point a model at a mailbox, give it a task in English, and watch what it changes. Each run gets its own environment and its own storage, graded on the state it leaves behind — with a full action timeline, per-turn token accounting and a screenshot of every step.",
    why: "A model that does everything you asked and then one thing more produces a state that matches on every required field. Check only the required fields and it passes. It should not.",
    stack: ["Next.js", "TypeScript", "Vercel Edge"],
    repo: "https://github.com/iamwaleediqbal/clickgym",
    live: "https://clickgym.vercel.app",
    highlights: [
      "Four verdicts, not two: pass, incomplete, did more than it was asked, and both.",
      "One task exists purely to provoke the third. Forwarding a customer's invoice to accounts would be reasonable behaviour. It is still a fail, and the verdict names the change.",
      "Opening an email marks it read, deliberately, so an agent that hunts around for the right message shows up as having changed three things it was not asked to change.",
      "25 tests that need nothing installed.",
    ],
  },
  {
    slug: "anchorly",
    name: "Anchorly",
    tagline: "A grounded AI store assistant for Shopify merchants",
    status: "product",
    mirrors: "Not a reduction — this one ships to merchants.",
    what: "Every factual answer comes from a live database lookup, never from model memory. Prices, stock, policies and order status are quoted from the merchant's own synced data.",
    why: "Competing chatbot apps get churned over for inventing prices and fabricating policies. The whole architecture exists to make that class of failure structurally impossible rather than merely unlikely.",
    stack: ["Remix", "TypeScript", "Prisma", "Shopify"],
    highlights: [
      "Capability switches are enforced by removing tools, not by asking the model nicely.",
      "A weekly accuracy audit generates questions from the merchant's own catalogue and grades retrieval separately from generation, because a right answer from the wrong source is a bug waiting for a different question.",
      "Unanswered questions are deduplicated and counted, which turns support volume into a list of what to write next.",
    ],
  },
];

/** Read on the experience page above the timeline. */
export const career = {
  since: 2021,
  headline: "Production software since 2021, agent systems since 2023",
  summary:
    "Five years building and running products people depend on, the last three of them full time on evaluation infrastructure for computer-use agents. Backend and front end both — I have never had the luxury of only owning one half.",
};

export const experience = [
  {
    company: "Turing",
    role: "Senior Software Engineer",
    period: "Sept 2023 - present",
    summary:
      "Evaluation infrastructure for computer-use agents, end to end: the environments, the runner, the grading, and the console people read the results in.",
    lines: [
      "Built and run an evaluation platform on FastAPI, Postgres, Celery and Next.js, deployed on GCP, executing batches of model attempts against cloned web applications and full desktop virtual machines.",
      "Wrote the provider-agnostic layer that drives OpenAI, Anthropic, Gemini and self-hosted models through a single action schema — normalising three different coordinate conventions and three different definitions of a token before anything downstream sees them.",
      "Designed grading against a known-good end state rather than the action trajectory, so a model that reaches the goal a different way still passes, and one that reaches it and then keeps going is reported as overreach instead of a pass.",
      "Made runs that never reached a model unscored rather than zero. Counting transport failures as model failures quietly biases every aggregate computed afterwards, and that bias is invisible once it is in the average.",
      "Report pass rates with confidence intervals, because a leaderboard built on a few dozen attempts per model puts most of its ordering inside the noise, and a client acting on that ordering deserves to know which gaps are real.",
      "Own the queue, retries and artifact storage that make a batch resumable: a run that dies six hours in resumes rather than restarts.",
      "Work directly against client deliverables and timelines, including human review workflows layered on top of the automated grading.",
    ],
    stack: ["Python", "FastAPI", "Celery", "PostgreSQL", "Next.js", "TypeScript", "GCP", "Playwright"],
  },
  {
    company: "Softaims",
    role: "Software Engineer",
    period: "Aug 2021 - July 2024",
    summary:
      "Client product work across commerce, publishing and fintech — the years that taught me what shipping to a deadline actually costs.",
    lines: [
      "Shipped and maintained client products in Ruby on Rails, React and Node, owning features from requirements through deployment and the support that followed.",
      "Built a Shopify app with Stripe billing and webhook handling, including the idempotency and replay handling that keeps a billing webhook from charging twice when the network retries it.",
      "Rebuilt an existing live product onto Next.js and Django, migrating its data and its users without a hard cutover.",
      "Worked across the stack throughout — schema and query work at one end, interface and state management at the other.",
    ],
    stack: ["Ruby on Rails", "React", "Node.js", "Next.js", "Django", "PostgreSQL", "Stripe", "Shopify"],
  },
];
