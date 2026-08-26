/**
 * Everything editable lives here.
 *
 * The pages read from this file so that changing a claim is a one-line edit
 * rather than a hunt through JSX — and so that a claim appears in exactly one
 * place, which is what stops the same number drifting between two pages.
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
    "I have been shipping production software since 2021 — Ruby on Rails, React, Node, Python and Next.js — across commerce, publishing and fintech products, and for the last three years on agent systems full time.",
    "That current work is an evaluation platform for computer-use agents: a Python and Postgres backend with a Next.js front end, running batches of model attempts against browser and desktop environments, grading them against a known-good end state, and packaging the results for delivery to the client.",
    "It drives OpenAI, Anthropic, Gemini and self-hosted models through one code path. That is harder than it sounds: every provider returns a different action format, in a different coordinate space, with token accounting that disagrees about what it is counting. All of it has to mean the same thing before anything downstream can use it.",
    "The earlier years are where the engineering habits came from — client products with real deadlines, a Shopify app with Stripe billing and webhook handling, and a full rebuild of a live product onto Next.js and Django without dropping its users.",
    "Alongside that I publish my own agent evaluation stack in the open: a provider layer, a harness that drives and grades a run, and the application it drives. Three deployed repositories, and every number on this site is backed by a recorded run you can open.",
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
    tagline: "A grounded AI store assistant for Shopify merchants",
    status: "product",
    part: "The outlier: a commercial product with paying merchants behind it, rather than infrastructure.",
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
    role: "Software Engineer, Agentic AI Evaluation Platform",
    period: "Sept 2023 - present",
    /**
     * One contract, three scopes. Listed because a single title spanning three
     * years hides the progression, and the progression is the point: the work
     * moved from producing training data, to building the environments, to
     * building the platform that runs and grades them.
     */
    roles: [
      { title: "Software Engineer, Agentic AI Evaluation Platform", period: "Sep 2025 - present" },
      { title: "Software Engineer, Agentic RL Environments", period: "Jul 2024 - Aug 2025" },
      { title: "Software Engineer, LLM Code Generation and Computer Use", period: "Sep 2023 - Jun 2024" },
    ],
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
    role: "Senior Software Engineer",
    period: "Aug 2021 - July 2024",
    roles: [
      { title: "Senior Software Engineer", period: "Aug 2023 - Jul 2024" },
      { title: "Software Engineer", period: "Aug 2022 - Aug 2023" },
      { title: "Associate Software Engineer", period: "Aug 2021 - Aug 2022" },
    ],
    summary:
      "Client product work across commerce, publishing and fintech — the years that taught me what shipping to a deadline actually costs. " +
      "The final ten months ran concurrently with the Turing contract, with both employers' knowledge.",
    lines: [
      "Shipped and maintained client products in Ruby on Rails, React and Node, owning features from requirements through deployment and the support that followed.",
      "Built a Shopify app with Stripe billing and webhook handling, including the idempotency and replay handling that keeps a billing webhook from charging twice when the network retries it.",
      "Rebuilt an existing live product onto Next.js and Django, migrating its data and its users without a hard cutover.",
      "Worked across the stack throughout — schema and query work at one end, interface and state management at the other.",
    ],
    stack: ["Ruby on Rails", "React", "Node.js", "Next.js", "Django", "PostgreSQL", "Stripe", "Shopify"],
  },
];
