import { ArrowRight, ArrowUpRight, Download, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BrowserFrame } from "@/components/BrowserFrame";
import { Counter } from "@/components/Counter";
import { GitHubLive } from "@/components/GitHubLive";
import { LocalTime } from "@/components/LocalTime";
import { Reveal } from "@/components/Reveal";
import { Scribble } from "@/components/Scribble";
import { StackMarquee } from "@/components/StackMarquee";
import { Watcher } from "@/components/Watcher";
import { Button } from "@/components/ui/button";
import { experience, profile, projects } from "@/content/site";
import { getGitHub } from "@/lib/github";
import { cn } from "@/lib/utils";

/* The GitHub section is server rendered from data at most this old, then
   refreshed in the browser on load. */
export const revalidate = 1800;

/* Stats get the sun: sun is the colour for numbers. */
const STAT_TONES = ["text-sun-ink", "text-mint-ink", "text-link", "text-tangerine"] as const;

export default async function Home() {
  const github = await getGitHub();
  const main = projects.find((p) => p.kind === "main")!;
  const companions = projects.filter((p) => p.kind === "companion");
  const products = projects.filter((p) => p.kind === "product");

  return (
    <>
      {/* ───────────── hero: a bento of who, what, and proof ───────────── */}
      <section className="relative">
        <div aria-hidden className="bg-blueprint pointer-events-none absolute inset-0 -top-20" />
        <div className="relative mx-auto grid max-w-6xl gap-3 px-3 pb-6 pt-8 sm:px-5 lg:grid-cols-12 lg:pt-12">
          {/* who and what */}
          <div className="relative overflow-hidden rounded-[28px] border bg-card p-6 sm:p-9 lg:col-span-7 lg:row-span-2">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-25 blur-3xl"
              style={{ background: "var(--cobalt)" }}
            />
            <p className="inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-3 py-1 text-xs text-mint-ink">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-mint" />
              </span>
              {profile.available}
            </p>

            <p className="mt-7 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground sm:tracking-[0.2em]">
              {profile.name} <span className="text-tangerine">/</span> {profile.role}
            </p>
            <h1 className="mt-3 text-[2.3rem] font-extrabold leading-[1] tracking-[-0.03em] sm:text-[3.2rem] md:text-6xl lg:text-[3rem] xl:text-[3.5rem]">
              <span className="block motion-safe:animate-rise">I build AI agents,</span>
              <span className="block text-balance motion-safe:animate-rise [animation-delay:90ms]">and the systems that</span>
              <span className="block motion-safe:animate-rise [animation-delay:180ms]">
                <Scribble>check their work.</Scribble>
              </span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-muted-foreground motion-safe:animate-rise [animation-delay:280ms]">
              Five years shipping production software, three of them on AI agents full time. Python, FastAPI and
              TypeScript, from the evaluation platform under the model to the product people actually use.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <Button asChild size="lg" className="rounded-full" data-watch="happy">
                <Link href="/contact">
                  Hire me
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/projects">
                  See the work
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="rounded-full">
                <a href={profile.cv} download="Waleed-Iqbal-CV.pdf">
                  <Download className="size-4" />
                  CV
                </a>
              </Button>
            </div>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground"
              data-watch="happy"
            >
              <Mail className="size-4" />
              {profile.email}
            </a>
          </div>

          {/* face */}
          <div className="relative overflow-hidden rounded-[28px] border bg-cobalt lg:col-span-5">
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, #ffffff55, transparent 40%), repeating-linear-gradient(135deg, #ffffff10 0 2px, transparent 2px 14px)",
              }}
            />
            <div className="relative flex h-full min-h-[280px] items-end gap-5 p-6 sm:p-7">
              <p className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-ink/25 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-sm sm:left-7 sm:top-7">
                <span className="size-1.5 rounded-full bg-mint" />
                <LocalTime /> local time, UTC+5
              </p>
              <Image
                src={profile.photo}
                alt={profile.name}
                width={320}
                height={320}
                priority
                className="size-36 shrink-0 rounded-[22px] border-4 border-white/90 object-cover shadow-2xl sm:size-44"
              />
              <div className="pb-1 text-white">
                <p className="font-display text-2xl font-extrabold leading-tight">Waleed Iqbal</p>
                <p className="mt-1 text-sm text-white/80">{profile.location}</p>
                <p className="mt-1 text-sm text-white/80">Remote, or relocating</p>
              </div>
              <span
                className="absolute right-5 top-5 rotate-[8deg] rounded-full bg-sun px-3 py-1.5 font-display text-sm font-extrabold text-ink shadow-lg motion-safe:animate-float"
                style={{ ["--tilt" as string]: "8deg" }}
              >
                since 2021
              </span>
            </div>
          </div>

          {/* the watcher */}
          <div className="relative overflow-hidden rounded-[28px] border bg-tangerine p-6 text-ink sm:p-7 lg:col-span-5">
            <div className="grid h-full items-center gap-5 sm:grid-cols-[1.2fr_1fr]">
              <Watcher className="mx-auto w-full max-w-[260px]" />
              <div>
                <p className="font-display text-xl font-extrabold leading-tight">I watch what agents do.</p>
                <p className="mt-2 text-sm text-ink/75">
                  My day job is building the systems that decide whether an AI agent really did the task. These two
                  are practising on you.
                </p>
              </div>
            </div>
          </div>

          {/* proof, in numbers */}
          {profile.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70} className="lg:col-span-3">
              <div className="h-full rounded-[24px] border bg-card p-5">
                <p className={cn("font-display text-4xl font-extrabold tabular-nums", STAT_TONES[index])}>
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium">{stat.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{stat.hint}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── the stack ───────────── */}
      <section className="mx-auto max-w-6xl px-3 py-4 sm:px-5">
        <StackMarquee />
      </section>

      {/* ───────────── selected work ───────────── */}
      <section className="mx-auto max-w-6xl px-3 py-16 sm:px-5">
        <SectionHead
          kicker="Selected work"
          title="One main project. Two products people use."
          link={{ href: "/projects", label: "All projects" }}
        />

        <Reveal>
          <article className="group relative grid overflow-hidden rounded-[28px] border bg-card lg:grid-cols-[1fr_1.25fr]">
            <div className="flex flex-col p-6 sm:p-9">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-cobalt px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
                <Sparkles className="size-3.5" /> Main project, open source
              </p>
              <h3 className="mt-5 font-display text-4xl font-extrabold">{main.name}</h3>
              <p className="mt-3 text-[17px] text-muted-foreground">
                An evaluation harness for computer use agents. It drives an agent through a real app in a real browser,
                grades what it left behind, and keeps the evidence so any verdict can be recomputed.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-2">
                {[
                  ["48", "recorded runs"],
                  ["5", "models compared"],
                  ["$0.65", "total model spend"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border bg-background/50 p-3">
                    <dt className="sr-only">{label}</dt>
                    <dd className="font-display text-2xl font-extrabold text-sun-ink">{value}</dd>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                {main.live && (
                  <Button asChild className="rounded-full">
                    <a href={main.live}>
                      Open the console <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" className="rounded-full">
                  <Link href={`/projects/${main.slug}`}>
                    Case study <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <p className="mt-auto pt-7 text-sm text-muted-foreground">
                Built on two companion repos:{" "}
                {companions.map((c, i) => (
                  <span key={c.slug}>
                    <Link href={`/projects/${c.slug}`} className="font-mono text-link hover:underline">
                      {c.name}
                    </Link>
                    {i < companions.length - 1 ? " and " : "."}
                  </span>
                ))}
              </p>
            </div>
            <div className="relative bg-gradient-to-br from-cobalt/25 via-transparent to-tangerine/20 p-4 sm:p-8 lg:pl-0">
              {main.image && main.live && (
                <BrowserFrame src={main.image} alt={`${main.name} console`} url={main.live} className="lg:-mr-24 lg:mt-6" />
              )}
            </div>
          </article>
        </Reveal>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border bg-card">
                <div
                  className={cn(
                    "p-4 pb-0 sm:p-6 sm:pb-0",
                    index === 0 ? "bg-gradient-to-b from-mint/20 to-transparent" : "bg-gradient-to-b from-sun/20 to-transparent",
                  )}
                >
                  {product.image && product.live && (
                    <BrowserFrame src={product.image} alt={`${product.name} home page`} url={product.live} />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Live product</p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold">{product.name}</h3>
                  <p className="mt-2 text-muted-foreground">{product.summary}</p>
                  <p className="mt-4 rounded-2xl border bg-background/50 p-3 text-sm">
                    <span className="font-display text-lg font-extrabold text-sun-ink">{product.stats[0].value}</span>{" "}
                    <span className="text-muted-foreground">{product.stats[0].label}</span>
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {product.live && (
                      <Button asChild size="sm" className="rounded-full">
                        <a href={product.live}>
                          Visit <ArrowUpRight className="size-3.5" />
                        </a>
                      </Button>
                    )}
                    <Button asChild size="sm" variant="ghost" className="rounded-full">
                      <Link href={`/projects/${product.slug}`}>Case study</Link>
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── GitHub, live ───────────── */}
      <section className="mx-auto max-w-6xl px-3 py-16 sm:px-5">
        <SectionHead
          kicker="Live from GitHub"
          title="My GitHub, fetched as you load the page."
          note="Public repos open on GitHub. My own private repos are shown with a lock and open their case study instead. Work done for employers stays private and is not listed."
        />
        <Reveal>
          <GitHubLive initial={github} />
        </Reveal>
      </section>

      {/* ───────────── experience, in brief ───────────── */}
      <section className="mx-auto max-w-6xl px-3 py-16 sm:px-5">
        <SectionHead kicker="Experience" title="Production software since 2021." link={{ href: "/experience", label: "Full experience" }} />
        <div className="grid gap-3 md:grid-cols-2">
          {experience.map((job, index) => (
            <Reveal key={job.company} delay={index * 80}>
              <div className="h-full rounded-[24px] border bg-card p-6">
                <p className="font-mono text-xs text-muted-foreground">{job.period}</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold">{job.company}</h3>
                <p className="mt-1 text-sm font-medium text-link">{job.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────── call to action ───────────── */}
      <section className="mx-auto max-w-6xl px-3 pb-6 pt-10 sm:px-5">
        <div className="relative overflow-hidden rounded-[32px] bg-cobalt p-8 text-white sm:p-12">
          <div
            aria-hidden
            className="absolute inset-0 opacity-25"
            style={{ background: "repeating-linear-gradient(135deg, #ffffff14 0 2px, transparent 2px 16px)" }}
          />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-4xl font-extrabold leading-[1.02] sm:text-5xl">
                Got an agent that has to hold up with real users?
              </h2>
              <p className="mt-4 max-w-[52ch] text-white/80">
                Full time, contract or a small trial task first. I usually reply within a day.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <Button asChild size="lg" className="rounded-full bg-white text-ink hover:bg-white/90" data-watch="happy">
                  <Link href="/contact">
                    Start a conversation <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="rounded-full text-white hover:bg-white/10 hover:text-white" data-watch="happy">
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="size-4" /> Email me
                  </a>
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[260px] rounded-[28px] bg-sun p-6 text-ink">
              <Watcher />
              <p className="mt-2 text-center font-display text-lg font-extrabold">Still watching.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({
  kicker,
  title,
  note,
  link,
}: {
  kicker: string;
  title: string;
  note?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-tangerine">
          <span className="h-px w-6 bg-tangerine" /> {kicker}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-[2.6rem]">{title}</h2>
        {note && <p className="mt-3 text-muted-foreground">{note}</p>}
      </div>
      {link && (
        <Link href={link.href} className="group inline-flex items-center gap-1.5 text-sm font-medium text-link">
          {link.label}
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
