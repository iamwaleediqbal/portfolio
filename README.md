# Portfolio site

Next.js, deployed on Vercel's free plan. Static, no database, no runtime cost.

## Editing

Everything readable lives in `content/site.ts`. Changing a claim is a one-line
edit rather than a hunt through JSX.

Replace before deploying:

* `iamwaleediqbal` in `content/site.ts` (GitHub and LinkedIn)
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

Node 22 or newer. No key, no database, no environment variables.

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
`portfolio`, deploy. There is nothing to configure.
