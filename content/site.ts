/**
 * Everything editable lives here.
 *
 * The pages read from this file so that changing a claim is a one-line edit
 * rather than a hunt through JSX — and so that a claim appears in exactly one
 * place, which is what stops the same number drifting between two pages.
 */

export const profile = {
  name: "Waleed Iqbal",
  role: "Senior AI Engineer",
  focus: "Agent evaluation, RL environments and LLM apps",
  location: "Faisalabad, Pakistan",
  photo: "/waleed.jpg",
  available: "Open to senior roles and contract work, remote or relocating",
  email: "waleediqbal28@gmail.com",
  github: "https://github.com/iamwaleediqbal",
  /**
   * Served from public/ rather than linked to a drive.
   *
   * A CV behind a share link is one permission change away from being a 404 for
   * whoever is reading the page, and there is no way to find out that happened.
   * A file in the repository ships with the deployment.
   */
  cv: "/Waleed_Iqbal_CV.pdf",
  /**
   * The real profile, which is not the GitHub handle.
   *
   * This was `/in/iamwaleediqbal` — assumed from the GitHub username, and a
   * 404. It is the kind of wrong nobody catches on their own site: you never
   * click your own LinkedIn link, and the page around it looks perfect.
   */
  linkedin: "https://www.linkedin.com/in/waleed-iqbal-208a97a3",
  headline: "I build agent systems that survive contact with real users, and the tooling that proves whether they do.",
  intro: [
    "I have been shipping production software since 2021, in Ruby on Rails, React, Node, Python and Next.js, across commerce, publishing and fintech products. For the last three years I have worked on AI agents full time.",
    "Today I am one of the core engineers on an agent evaluation platform used daily by about 500 people across engineering, review and delivery teams. On its busiest days it runs more than 2,000 evaluations across 10 to 15 simulated web apps, plus full Ubuntu and Windows desktops for OSWorld, on FastAPI, Celery, Redis, PostgreSQL and Next.js across GCP and AWS.",
    "It drives OpenAI, Anthropic and Gemini, plus Qwen3-VL and UI-TARS self hosted on vLLM, through one code path. That is harder than it sounds: every provider returns a different action format, in a different coordinate space, with token accounting that disagrees about what it is counting. All of it has to mean the same thing before anything downstream can use it.",
    "The earlier years are where the engineering habits came from: client products with real deadlines, a Shopify app with Stripe billing and idempotent webhooks, and leading delivery for three client products as a senior engineer at Softaims.",
    "Outside that I built Anchorly, a live AI shopping assistant for Shopify stores, and I publish my own agent evaluation stack in the open: a provider layer, a harness that drives and grades a run, and the application it drives. Every number about those projects comes from a recorded run you can open.",
  ],
  // Facts about the work, not about the website. Anything that only makes sense
  // to whoever built this page does not belong on it.
  stats: [
    { value: 500, suffix: "", label: "Daily platform users", hint: "Engineering, review and delivery teams" },
    { value: 2000, suffix: "+", label: "Evaluations on busy days", hint: "Across 10 to 15 simulated web apps" },
    { value: 30, suffix: "+", label: "Agent runs at once", hint: "Recovering automatically from worker loss" },
    { value: 8, suffix: "x", label: "Cheaper per OSWorld task", hint: "About $400 down to $50 with VM checkpoints" },
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
    items: ["Agent architecture", "Tool calling", "MCP servers", "RAG", "pgvector", "OpenAI", "Anthropic", "Gemini", "Qwen3-VL", "UI-TARS", "vLLM", "OpenRouter"],
  },
  {
    group: "Evaluation & RL",
    tone: 2,
    items: ["LLM evaluation", "Benchmarking", "RL environments", "OSWorld V1 and V2", "BrowseComp", "WebArena", "Harbor", "Playwright", "LLM as judge", "Rubric and state based grading", "Human in the loop review"],
  },
  {
    group: "Backend",
    tone: 3,
    items: ["Python", "FastAPI", "Django", "Celery", "Redis", "PostgreSQL", "Node.js", "BullMQ", "Prisma", "Ruby on Rails", "Stripe"],
  },
  {
    group: "Frontend",
    tone: 4,
    items: ["TypeScript", "Next.js", "React", "Remix", "Tailwind", "shadcn/ui", "Shopify apps"],
  },
  {
    group: "Cloud & security",
    tone: 5,
    items: ["GCP and GKE", "AWS", "Docker", "Kubernetes", "QEMU", "Prometheus", "GitLab CI/CD", "GitHub Actions", "Vercel", "Non root containers", "Auth hardening"],
  },
];

/**
 * The three open projects, read as one system.
 *
 * They are not packages that import one another — two are Python and one is
 * TypeScript, and each is meant to be readable on its own in a sitting. What
 * they share is a pipeline: the same three seams the production platform has,
 * pulled apart so each can be looked at without the other two in the way.
 */
export const system = {
  lead:
    "Measuring whether an agent can operate software has three separate problems in it, and " +
    "conflating them is how evaluation quietly goes wrong. Each project below is one of them.",
  layers: [
    {
      slug: "polyact",
      step: "The model answers",
      role: "Translate four provider dialects into one record",
      owns:
        "A model says where to click in whatever convention its provider chose, and reports " +
        "tokens by whatever it counts. polyact turns that into one action in real screen " +
        "pixels, with usage that means the same thing across providers.",
      breaks:
        "Read Gemini's 0–1000 grid as pixels and the agent clicks the top-left corner of every " +
        "screen forever. It scores zero and reads as a weak model. Nothing raises.",
    },
    {
      slug: "clickmail",
      step: "Something happens",
      role: "Be the application, and say what state you are in",
      owns:
        "A mail client with fifty-two messages across seven folders, deployed publicly so anyone " +
        "can click around it. It publishes a read-and-reset contract and knows nothing " +
        "about tasks, grading or models.",
      breaks:
        "An environment that knows it is being tested is one whose results do not transfer. " +
        "Keeping the grader inside it made the whole thing look like it could only ever score " +
        "itself.",
    },
    {
      slug: "agentscore",
      step: "Somebody decides whether it worked",
      role: "Drive the application, grade the result, and repeat it enough times to mean something",
      owns:
        "The harness. It opens the environment in a real browser, fetches the world before the " +
        "task and after it, grades one snapshot against the other, and keeps both — so a change " +
        "to the grading logic is retested against every past run without paying for a single " +
        "model call.",
      breaks:
        "One run is not a result, and a verdict you cannot recompute is a number you have to " +
        "take on trust. A leaderboard built from single runs reorders itself for no reason " +
        "anyone can explain, and three out of three gets reported as 100%.",
    },
  ],
  honesty:
    "The harness reaches the environment over HTTP, with no shared process and no privileged " +
    "access — which is the only arrangement under which \"it could drive a real application\" " +
    "means anything. polyact stays separate because it is a library, not a service. The " +
    "dependency between them is in the argument rather than the imports: grading is worthless " +
    "if the coordinates were mistranslated on the way in, and a correct grade on one attempt " +
    "says nothing until it has been repeated.",
};

/**
 * The execution cycle, as the diagram beside it explains it.
 *
 * Kept here rather than in the component so the drawing and the sentences that
 * frame it are edited in the same place — a caption that drifts from the
 * picture is worse than no caption.
 */
export const cycle = {
  lead:
    "One run, end to end. The harness asks the application to reset and records the world it " +
    "reports back. The model then works one turn at a time — shown either a screenshot of the " +
    "screen or the same mailbox serialised as text — and every action it chooses is carried out " +
    "by a real browser against the live page. When it stops, the world is recorded again, and " +
    "the two recordings are graded against each other.",
  alt:
    "One evaluation run. The environment is reset and the world it reports is recorded. The " +
    "model then acts one turn at a time through a real browser against the live application. " +
    "When it stops, the world is recorded again, and the two recordings are graded against each " +
    "other into one of four verdicts. The route taken between them is never graded.",
  caption:
    "Both snapshots come from the application itself and travel past the loop untouched, meeting " +
    "only at the grader. That is what makes a verdict recomputable a year later without paying " +
    "for another model call — and why there is no way for the agent to influence what it is " +
    "measured against.",
  scrollHint: "Swipe the diagram sideways to follow the whole cycle.",
  scopeLabel: "Scope",
  // One line saying what the picture is. It used to explain what larger system
  // the loop was a slice of, which was both an excuse and somebody else's
  // architecture to be publishing.
  scope:
    "One evaluation run, start to finish. Scheduling, isolation and review all sit outside this loop.",
};

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  /** The part this piece plays in the stack, for a reader meeting it cold. */
  part?: string;
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
    part: "The foundation. Everything above it can stay ignorant of which provider answered, because this is where four formats become one.",
    what: "A Python library that turns four incompatible provider response formats into one record, in real screen pixels, with token accounting that survives a provider change.",
    why: "The largest source of quiet, score-corrupting bugs in agent evaluation is not prompting or grading. It is that providers disagree about what their own output means, and the disagreements do not raise. They degrade.",
    stack: ["Python", "async", "pytest"],
    repo: "https://github.com/iamwaleediqbal/polyact",
    highlights: [
      "Gemini emits 0-1000 coordinates, OpenAI emits pixels. Read one as the other and the agent clicks the top-left corner of every screen forever, scores zero, and looks like a weak model. This is not hypothetical: agentscore hit it on a real paid run, and now carries the same rules.",
      "OpenAI's input token count includes cached tokens. Anthropic's excludes them. Get it backwards and a cached run looks cheaper than it was until the invoice arrives.",
      "A broken proxy is not a bad model. Transport failures are kept separate from model failures all the way to the report, because an attempt that never reached a model is an absent measurement, not a zero.",
      "The whole suite runs offline in under a second, because the model call is injected rather than made inside the loop — which is also what makes the budget and termination logic testable at all.",
    ],
  },
  {
    slug: "agentscore",
    name: "agentscore",
    tagline: "The harness: drive it, grade it, and repeat it enough times to mean something",
    status: "open source",
    part: "The harness. The only piece here that talks to a model, and the one that decides what a run was worth.",
    what: "Opens an environment in a real browser, fetches the world before the task and after it, and grades one snapshot against the other — never the route taken. Both snapshots are kept, so a change to the grading logic is retested against every past run without a single model call. A separate suite repeats short tasks across free models and reports intervals rather than numbers.",
    why: "One run is not a result. A leaderboard built from single runs reorders itself nightly for no reason anyone can explain.",
    stack: ["Next.js", "TypeScript", "Playwright", "Python", "OpenRouter"],
    repo: "https://github.com/iamwaleediqbal/agentscore",
    live: "https://agentscore-sigma.vercel.app",
    highlights: [
      "48 recorded runs so far: 6 tasks across 5 models in both action spaces, for $0.65 of model spend in total. Three of the five models score strictly better reading the screen as text than as pixels; one is the other way round. A single blended score would have hidden that entirely, which is why the two are never averaged.",
      "Wilson intervals, so three out of three reports 100% with a lower bound near 44%, which is the correct amount of confidence to have in three attempts.",
      "Overlapping intervals share a rank and are marked tied. Ranking them anyway invents a difference the data cannot support.",
      "Deterministic checks run first. A judge is a model, so it brings its own variance on top of the variance you were trying to measure, and it is a last resort rather than a default.",
      "The browser runner carries polyact's coordinate rules in TypeScript, because a paid Gemini run proved it needs them: Gemini answered on a 0-1000 grid while the harness read most of its clicks as pixels, so the clicks landed where it had never aimed and the model was scored for the harness's arithmetic.",
      "Every turn is a real tool call. The two action spaces differ in what the model is shown and what it can name — not in how it replies, because a difference in transport would show up in the comparison as if it were a difference in skill.",
      "The console shows the system prompts exactly as sent, generated from the same constants the runner uses rather than transcribed — a benchmark that paraphrases what it told the model is not reproducible by anyone reading it.",
      "Runs in GitHub Actions on demand and commits a JSON file. No server, no database, no key on the deployment — and no schedule, because a benchmark nobody watched is a number nobody should trust.",
    ],
  },
  {
    slug: "clickmail",
    name: "clickmail",
    tagline: "The application under test, and nothing else",
    status: "live demo",
    part: "The target. It knows nothing about models, tasks or grading, and that ignorance is the feature — it is what keeps the harness honest.",
    what: "A public mail client — fifty-two messages, seven folders, search, labels, spam — that exists to be operated by something that is not a person. It publishes a small read-and-reset contract and knows nothing about tasks, grading or models.",
    why: "An environment that contains its own grader can only ever score itself. Separating them is what makes \"point the harness at a real application\" a question of writing an adapter rather than rewriting the grader.",
    stack: ["Next.js", "TypeScript", "Vercel"],
    repo: "https://github.com/iamwaleediqbal/clickmail",
    // /gym, not the bare origin. The origin is a landing page; the mailbox and
    // the published contract — the thing the harness drives — live at /gym, and
    // that is where every other surface sends people.
    live: "https://clickmail-sigma.vercel.app/gym",
    highlights: [
      "Read and reset is the whole interface a harness gets: report the world, or discard it and report the world it starts in. There is deliberately no way to install a state from outside — a driver that could write the world could write the answer. No storage key, no DOM, no framework; the same surface a real application could be made to expose.",
      "It also reports which controls it is currently rendering, so a harness can refuse to spend a turn on an action space the interface no longer offers. That pair has drifted before, in both directions.",
      "Opening an email marks it read, deliberately, because that is what a mail client does — and it is the most common way an agent changes something nobody asked it to.",
      "The suite needs nothing installed — Node's own test runner, no dependencies — and a mutation check reintroduces every bug it is meant to catch, one at a time, failing if the suite stays green. A passing suite proves nothing if it could not go red. The environment is deliberately small; the harness is where most of the testing lives.",
    ],
  },
  {
    slug: "anchorly",
    name: "Anchorly",
    tagline: "A retrieval grounded AI shopping assistant for Shopify stores",
    status: "product",
    part: "The outlier: a live product for Shopify merchants, rather than infrastructure.",
    what: "Syncs each store's products, pages and policies into PostgreSQL with pgvector, and describes every product photo once with a vision model so shoppers can search by how items look. Price and stock come from live tool calls, never from model memory or stuffed context.",
    why: "Competing chatbot apps get churned over for inventing prices and fabricating policies. The whole architecture exists to make that class of failure structurally impossible rather than merely unlikely.",
    stack: ["Node.js", "TypeScript", "Shopify Remix", "Prisma", "PostgreSQL", "pgvector", "BullMQ", "OpenRouter"],
    live: "https://anchorlychat.com",
    highlights: [
      "Tested on the public catalogs of 7 real Shopify stores, 280 products in all, it found the right product 51 out of 51 times and never invented a product or a price.",
      "Below a relevance floor it declines and takes the shopper's email instead of guessing. It answered honestly all 8 times a store did not sell what the shopper asked for.",
      "Hybrid retrieval, vectors plus keyword search fused with Reciprocal Rank Fusion, so exact product names and codes still match.",
      "A one time store setup runs on a stronger model and daily chat runs on low cost models, with tools scoped to what a shopper is allowed to see.",
      "Capability switches are enforced by removing tools, not by asking the model nicely, and built in audits grade answers against the store's own catalog.",
      "Unanswered questions are deduplicated and counted, which turns support volume into a list of what to write next.",
    ],
  },
];

/** Read on the experience page above the timeline. */
export const career = {
  since: 2021,
  headline: "Production software since 2021, AI agents since 2023",
  summary:
    "Five years building and running products people depend on, the last three of them full time on AI agents: the environments, the evaluation platform that runs and grades them, and the LLM products around them. Backend and front end both. I have never had the luxury of only owning one half.",
};

export interface Role {
  title: string;
  period: string;
  lines: string[];
}

export interface Job {
  company: string;
  role: string;
  period: string;
  summary: string;
  /**
   * The positions inside the employer, newest first, each with its own work. A
   * single title across several years hides the progression, and the
   * progression is the point.
   */
  roles: Role[];
  stack: string[];
}

export const experience: Job[] = [
  {
    company: "Turing",
    role: "Software Engineer, Agentic AI Evaluation Platform",
    period: "Sep 2023 - present",
    summary:
      "Evaluation infrastructure for AI agents end to end: the environments, the runner, the grading, the review pipeline and delivery to the client. One remote, full time contract across three scopes.",
    roles: [
      {
        title: "Software Engineer, Agentic AI Evaluation Platform",
        period: "Sep 2025 - present",
        lines: [
          "One of the core engineers who took the agent evaluation platform to production within three months of its first commit, on FastAPI, Celery, Redis, PostgreSQL and Next.js across GCP and AWS. About 500 people use it daily, and on its busiest days it runs more than 2,000 evaluations across 10 to 15 simulated web apps.",
          "Built the review pipeline a client asked for: humans perform each task, an AI review scores it, and reviewers sign it off or send it back for rework, with every role and handoff permissioned and approved work shipped in the client's own format. Weekly output rose from about 100 tasks to 500 to 800, once reaching 1,000, while client rejections fell.",
          "Ran OSWorld desktop benchmarks on isolated Ubuntu and Windows VMs, first on GKE pods through QEMU, then on AWS after leading the move to OSWorld V2. Up to 10 desktops run at once across as many as 10 nodes, with each run taking 3 to 4 hours.",
          "Added VM checkpoints and state restore so graders rerun on a saved desktop instead of replaying the whole run, cutting cost per task from about $400 to $50, and let human testers work inside the same VMs with live grading.",
          "Integrated computer use agents from OpenAI, Anthropic and Gemini plus self hosted Qwen3-VL and UI-TARS on vLLM, mapping every provider's actions and coordinates into one trajectory format under shared rules.",
          "Designed layered grading that checks each result with golden references, LLM evaluators, DOM and state assertions and graders inside the environment, so results are repeatable and valid alternative solutions still pass.",
          "Ran 30+ long running agent tasks at once without duplicate dispatch, recovering automatically from worker loss, using atomic claims, PostgreSQL advisory locks, Redis leases and watchdog sweeps.",
          "Built the checks that accept a BrowseComp task only if models without internet fail it (closed book), then rerun it with search in the same chat after approval to prove its evidence holds (answer back). Integrated OpenAI and Gemini agents into Harbor for these tasks.",
          "Hardened the verification service after a model's MCP tools were found running as root: disabled stdio MCP execution, moved every container to a non root user, closed SSRF and authorization gaps and cleared all High and Critical dependency alerts.",
          "Caught a supply chain attack that hid an obfuscated payload in the ESLint config of three team repos, reported it to management and removed it from every working branch within 30 minutes.",
          "Reviewed teammates' pull requests and mentored new engineers through onboarding.",
        ],
      },
      {
        title: "Software Engineer, Agentic RL Environments",
        period: "Jul 2024 - Aug 2025",
        lines: [
          "Recreated production SaaS apps, including Salesforce, another CRM, and healthcare and travel booking apps, as offline React clones with no outside dependencies, so agent runs are reproducible.",
          "Designed multi step agent tasks graded on the final state of the app rather than the answer text.",
          "Built prompt generation for each task type and multi agent workflows that check tasks and submissions before a human reviewer sees them.",
        ],
      },
      {
        title: "Software Engineer, LLM Code Generation and Computer Use",
        period: "Sep 2023 - Jun 2024",
        lines: [
          "Wrote and graded Python solutions that became training and benchmark data for LLM coding models, growing from single algorithm problems to Django and React apps built over several rounds.",
          "Ran full development workflows with computer use agents on macOS, Ubuntu and Chromium, writing targeted prompts that exposed where models failed at reading, changing and debugging code.",
        ],
      },
    ],
    stack: ["Python", "FastAPI", "Celery", "Redis", "PostgreSQL", "Next.js", "TypeScript", "GCP", "AWS", "Docker", "Kubernetes", "QEMU", "vLLM", "Playwright"],
  },
  {
    company: "Softaims",
    role: "Senior Software Engineer",
    period: "Aug 2021 - Jul 2024",
    summary:
      "Client product work across commerce, publishing and fintech, promoted every year from associate to senior engineer. The final ten months ran concurrently with the Turing contract, with both employers' knowledge.",
    roles: [
      {
        title: "Senior Software Engineer",
        period: "Aug 2023 - Jul 2024",
        lines: [
          "Led architecture, delivery planning and releases for three concurrent client products with a team of three engineers, reporting production risk directly to clients.",
          "Took an upsell app rebuilt from a five year old codebase through Shopify App Store review, with theme app extensions, order history based recommendations and a GraphQL rewrite for Shopify's API transition.",
        ],
      },
      {
        title: "Software Engineer",
        period: "Aug 2022 - Aug 2023",
        lines: [
          "Rebuilt delivery on GitLab CI/CD with Dockerised builds to Heroku, so a non technical client running a network of German institutes could review every branch and ship it with one click.",
          "Gave every institute its own subdomain on a shared Rails and React codebase, rebuilt the interface on Tailwind and integrated the institutes' administration APIs.",
          "Built a Shopify app with Stripe billing and idempotent webhooks, so retries never charge a customer twice.",
        ],
      },
      {
        title: "Associate Software Engineer",
        period: "Aug 2021 - Aug 2022",
        lines: [
          "Built an embeddable WebRTC support tool that lets agents see a customer's screen with video and audio calling, plus a Chrome extension recording straight to storage via FFmpeg.",
          "Cut page loads on an overloaded crypto platform from about 5 seconds to under 1 by moving the UI to Next.js and realtime third party fetching onto cached Redis workers.",
        ],
      },
    ],
    stack: ["Ruby on Rails", "React", "Node.js", "Next.js", "PostgreSQL", "Redis", "Tailwind", "GraphQL", "Shopify", "Stripe", "GitLab CI/CD", "Docker", "Heroku", "WebRTC", "FFmpeg"],
  },
];
