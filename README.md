# portfolio

The site at **[waleediqbal.vercel.app](https://waleediqbal.vercel.app)**.

Next.js on Vercel's free plan: static output, no database, no API routes, no
runtime cost. Tailwind v4 and shadcn/ui, light and dark driven by `next-themes`
with a system default.

## What is on it

| Page | What it is |
|---|---|
| Home | The headline claim, the numbers behind it, and the four projects. |
| Projects | Each project with what it is, what it demonstrates, and a link — plus a chart of measured model results. |
| Experience | Roles, the specific work, and the stack each was built on. |
| About | The longer version, and the tools. |
| Contact | A form that posts to Web3Forms, so there is no backend to run and no inbox credential anywhere in the deployment. A plain address is shown beside it as the fallback, because a form that silently fails is worse than an address a scraper might find. |

## The chart is not decoration

The projects page ends with per-model results. Those are not written by hand and
they are not a sample: `scripts/import-model-results.mjs` reads the run records
committed in [agentscore](https://github.com/iamwaleediqbal/agentscore) — real
Chromium sessions against a real deployed application — and reduces them to
what the chart needs.

```bash
node scripts/import-model-results.mjs ../agentscore/web/public/runs/index.json
```

A script rather than a build-time fetch. A build that depends on the network
fails on the day GitHub is slow, and a site that is down is worse than one whose
numbers are a fortnight old.

It computes Wilson intervals rather than bare percentages, and draws them. At a
handful of runs per row the models cannot be told apart, and the honest thing
for a chart to do about that is show it — which is why the ranking disappears
when every interval overlaps.

## Everything readable lives in one file

`content/site.ts`. Every page reads from it, so changing a claim is a one-line
edit rather than a hunt through JSX.

## Running it

Node 22 or newer.

```bash
git clone https://github.com/iamwaleediqbal/portfolio.git
cd portfolio
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # static output
npm run lint
```

## Deploying

Import the repository on [vercel.com](https://vercel.com) and deploy. Two
environment variables, both of them public by design:

| Name | What it does |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | A free key from [web3forms.com](https://web3forms.com). Without it the contact form does not pretend to work — it says so and shows a plain address rather than swallowing the message. The form also carries a honeypot field that bots fill and people never see. |
| `NEXT_PUBLIC_SITE_URL` | The exact origin, no trailing slash. It becomes `metadataBase`, which is what makes the social-card image an absolute URL. Get it wrong and **nothing on the page looks broken** — the only symptom is that every link preview of the site, everywhere, shows no image. |

Both are `NEXT_PUBLIC_`, so both ship in the bundle. Neither is a secret and
neither should ever be one. Web3Forms keys are designed to sit in client code.

## The other three repositories

This site is the front door. The work it points at:

| | |
|---|---|
| [clickmail](https://github.com/iamwaleediqbal/clickmail) | A mail client built to be operated by something that is not a person. Publishes a read-and-reset automation contract and contains no grader, so it cannot score itself. |
| [agentscore](https://github.com/iamwaleediqbal/agentscore) | The harness. Drives clickmail in a real browser, grades the state the agent left behind against the state the task required, and publishes the trajectories. |
| [polyact](https://github.com/iamwaleediqbal/polyact) | One action schema across OpenAI, Anthropic, Gemini and open checkpoints — including the coordinate-space conversion that agentscore's runner is tested against. |

## Licence

MIT.
