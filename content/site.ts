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
  email: "waleediqbal28@gmail.com",
  github: "https://github.com/iamwaleediqbal",
  linkedin: "https://www.linkedin.com/in/iamwaleediqbal",
  intro: [
    "I build agent systems that survive contact with real users, and the tooling that proves whether they do.",
    "Since 2023 my full time work has been an evaluation platform for computer-use agents: a Python and Postgres backend, a Next.js front end, running batches of model attempts against browser and desktop environments, grading them, and packaging the results for delivery. It runs OpenAI, Anthropic, Gemini and self-hosted models through one code path, which is harder than it sounds, because every provider returns a different action format and they all have to mean the same thing before anything downstream can use them.",
    "Before that I spent three years on client products in Ruby on Rails, React and Node, including a Shopify app with Stripe billing and a rebuild of an existing product on Next.js and Django.",
    "That platform work is not public. So the projects below are the same ideas rebuilt in the open, small enough to read in one sitting.",
  ],
};

export interface Project {
  slug: string;
  name: string;
  tagline: string;
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
    what: "Point a model at a mailbox, give it a task in English, and watch what it changes. The whole app lives in local storage, so grading is a comparison between two JSON values rather than an argument about what the screen looked like.",
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

export const experience = [
  {
    company: "Turing",
    role: "Senior Software Engineer",
    period: "Sept 2023 - present",
    lines: [
      "Evaluation platform for computer-use agents. FastAPI, Postgres, Celery, Next.js, GCP.",
      "One provider-agnostic layer over OpenAI, Anthropic, Gemini and self-hosted models.",
      "Deliverables go to the client, not into a drawer.",
    ],
  },
  {
    company: "Softaims",
    role: "Software Engineer",
    period: "Aug 2021 - July 2024",
    lines: [
      "Client products in Ruby on Rails, React and Node.",
      "A Shopify app with Stripe billing and webhook handling.",
      "A rebuild of an existing product on Next.js and Django.",
    ],
  },
];
