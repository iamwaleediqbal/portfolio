# Portfolio site

Next.js on Vercel's free plan. Static, no database, no runtime cost.

Built on Tailwind v4 and shadcn/ui, with light and dark themes driven by
`next-themes` and a system default. Every page reads from `content/site.ts`, so
changing a claim is a one-line edit rather than a hunt through JSX.

## What is here

* **Home** — the headline claim, the stats, and the four projects.
* **Projects** — each one with what it is, what it demonstrates, and a link.
* **Experience** — roles with a summary, the specific work, and the stack.
* **About** — the longer version, and the tools.
* **Contact** — a form that posts to Web3Forms, so there is no backend and no
  address sitting in the page source for scrapers. Without a key configured it
  says so and falls back to a plain address rather than swallowing a message.

## Editing

Everything readable lives in `content/site.ts`. Changing a claim is a one-line
edit rather than a hunt through JSX.

Replace before deploying:

* `iamwaleediqbal` in `content/site.ts` (GitHub; LinkedIn is a separate
  handle and is set beside it)
* `data/leaderboard.json` with a real run from
  [agentscore](https://github.com/iamwaleediqbal/agentscore)

## Keeping the leaderboard current

The committed `data/leaderboard.json` is a copy. Two ways to refresh it:

1. Copy `results/latest.json` from the agentscore repo after a nightly run.
2. Fetch it at build time from the raw GitHub URL and let Vercel rebuild on a
   schedule.

Option 1 is the honest default. A build that depends on a network fetch fails
on the day GitHub is slow, and a portfolio site that is down is worse than one
whose numbers are a week old.

## Setup

Node 22 or newer. No database. One optional environment variable.

```bash
git clone git@github.com-personal:iamwaleediqbal/portfolio.git
cd portfolio
npm install
npm run dev          # http://localhost:3000
```

Then, before deploying:

1. Open `content/site.ts` and check the LinkedIn URL, the email, and anything
   in `intro` that does not sound like you.
2. Replace the sample leaderboard:
   `cp ../agentscore/results/latest.json data/leaderboard.json`
3. `npm run build` to confirm it compiles.

Deploy on [vercel.com](https://vercel.com): **Add New → Project**, import
`portfolio`, deploy.

Two environment variables:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | a free key from [web3forms.com](https://web3forms.com). Without it the contact form does not pretend to work — it says so and shows a plain address instead of swallowing the message. |
| `NEXT_PUBLIC_SITE_URL` | the exact origin you deployed to, no trailing slash. It becomes `metadataBase`, which is what makes the social-card image an absolute URL. Get it wrong and **nothing on the page looks broken** — the only symptom is that every link preview of the site, everywhere, shows no image. |

The Web3Forms key is public by design — those keys are meant to sit in client
code, and the form carries a honeypot field that bots fill and people never see.
Both variables are `NEXT_PUBLIC_`, so both are visible in the bundle; neither is
a secret and neither should ever be one.
