import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Github } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArchDiagram } from "@/components/ArchDiagram";
import { BrowserFrame } from "@/components/BrowserFrame";
import { CodeCard } from "@/components/CodeCard";
import { Leaderboard } from "@/components/Leaderboard";
import { SectionTitle } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SystemMap } from "@/components/SystemMap";
import { TechIcon } from "@/components/TechIcon";
import { Button } from "@/components/ui/button";
import { type Project, projectBySlug, projects } from "@/content/projects";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = projectBySlug((await params).slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

const STAT_TONES = ["text-sun-ink", "text-mint-ink", "text-link", "text-tangerine"] as const;

const PILL: Record<Project["kind"], string> = {
  main: "bg-cobalt text-white border-transparent",
  companion: "border-lilac/40 bg-lilac/10 text-foreground",
  product: "border-mint/40 bg-mint/10 text-mint-ink",
};

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const project = projectBySlug((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const family = project.slug === "agentscore" || project.kind === "companion";

  const sections = [
    { id: "problem", label: "The problem" },
    { id: "architecture", label: "Architecture" },
    { id: "stack", label: "Stack" },
    { id: "how", label: "How I ran it" },
    { id: "decisions", label: "Key decisions" },
    { id: "results", label: "Results" },
    ...(project.gallery.length ? [{ id: "screens", label: "Screens" }] : []),
  ];
  const number = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  return (
    <article>
      {/* ───────── hero ───────── */}
      <header className="relative overflow-hidden">
        <div aria-hidden className="bg-blueprint pointer-events-none absolute inset-0 -z-10 opacity-70" />
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-10 sm:pt-14">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
            All projects
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className={cn("inline-flex rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]", PILL[project.kind])}>
                {project.label}
              </span>
              <h1 className="mt-5 text-5xl font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-6xl">{project.name}</h1>
              <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">{project.tagline}</p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {project.live && (
                  <Button asChild size="lg" className="rounded-full">
                    <a href={project.live}>
                      Open it live
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                )}
                {project.repo && (
                  <Button asChild size="lg" variant="outline" className="rounded-full">
                    <a href={project.repo}>
                      <Github className="size-4" />
                      Source code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div>
              {project.image ? (
                <BrowserFrame src={project.image} alt={`${project.name}, running`} url={project.live ?? project.repo ?? ""} priority />
              ) : (
                <CodeCard />
              )}
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 overflow-hidden rounded-[22px] border bg-card md:grid-cols-4">
            {[
              ["Role", project.facts.role],
              ["Year", project.facts.year],
              ["Status", project.facts.status],
              ["Runs on", project.facts.runs],
            ].map(([term, value], i) => (
              <div key={term} className={cn("p-4 sm:p-5", i % 2 === 0 && "border-r", i < 2 && "border-b md:border-b-0", i === 1 && "md:border-r")}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{term}</dt>
                <dd className="mt-1 text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ───────── numbers ───────── */}
      <section className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {project.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 60}>
              <div className="h-full rounded-[22px] border bg-card p-5">
                <p className={cn("font-display text-3xl font-extrabold tabular-nums sm:text-4xl", STAT_TONES[i % STAT_TONES.length])}>{stat.value}</p>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── body ───────── */}
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[180px_minmax(0,1fr)]">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-28 space-y-1 border-l">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px flex gap-2 border-l border-transparent py-1 pl-4 text-sm text-muted-foreground transition hover:border-foreground hover:text-foreground">
                  <span className="font-mono text-[11px] leading-5 text-muted-foreground/70">{number(s.id)}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-20">
          <section>
            <SectionTitle id="problem" kicker={`${number("problem")} · The problem`} title="Why it exists" />
            <p className="max-w-[62ch] text-lg leading-relaxed text-foreground/85">{project.problem}</p>
          </section>

          <section>
            <SectionTitle id="architecture" kicker={`${number("architecture")} · Architecture`} title="How it fits together" />
            <Reveal>
              <ArchDiagram diagram={project.diagram} label={`Architecture of ${project.name}`} />
            </Reveal>
            <ol className="mt-5 grid gap-3 md:grid-cols-3">
              {project.diagram.notes.map((note, i) => (
                <li key={note} className="flex gap-3 rounded-[18px] border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-mono text-xs text-tangerine">{i + 1}</span>
                  {note}
                </li>
              ))}
            </ol>
            {family && (
              <div className="mt-10">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Where it sits</p>
                <SystemMap current={project.slug} />
              </div>
            )}
          </section>

          <section>
            <SectionTitle id="stack" kicker={`${number("stack")} · Stack`} title="What it runs on, and why" />
            <ul className="grid gap-3 sm:grid-cols-2">
              {project.stack.map((tech) => (
                <li key={tech.name} className="flex gap-4 rounded-[18px] border bg-card p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border bg-background text-[20px]">
                    {tech.icon ? <TechIcon name={tech.icon} /> : <span className="font-mono text-xs font-semibold">{tech.name.slice(0, 2)}</span>}
                  </span>
                  <span>
                    <span className="block font-medium">{tech.name}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">{tech.why}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionTitle id="how" kicker={`${number("how")} · Delivery`} title="How I ran it" />
            <div className="grid gap-3 sm:grid-cols-2">
              {project.managed.map((item) => (
                <div key={item.title} className="rounded-[18px] border bg-card p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-link">{item.title}</p>
                  <p className="mt-2 leading-relaxed text-foreground/85">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle id="decisions" kicker={`${number("decisions")} · Key decisions`} title="The choices that mattered" />
            <ol className="grid gap-3 md:grid-cols-2">
              {project.decisions.map((decision, i) => (
                <li key={decision.title} className="rounded-[18px] border bg-card p-5">
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-tangerine">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-lg font-bold leading-snug">{decision.title}</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{decision.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <SectionTitle id="results" kicker={`${number("results")} · Results`} title="What it showed" />
            <ul className="space-y-3">
              {project.results.map((result) => (
                <li key={result} className="flex gap-3 leading-relaxed">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-mint/15 text-mint-ink">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-foreground/85">{result}</span>
                </li>
              ))}
            </ul>
            {project.slug === "agentscore" && (
              <div className="mt-10">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Every model, both action spaces, with 95% intervals</p>
                <Leaderboard />
              </div>
            )}
          </section>

          {project.gallery.length > 0 && (
            <section>
              <SectionTitle id="screens" kicker={`${number("screens")} · Screens`} title="From the live product" />
              <div className="grid gap-6 md:grid-cols-6">
                {project.gallery.map((shot) => {
                  // Wide screenshots sit two to a row, tall ones three, and an odd wide one out leads at full width.
                  const tall = (shot.height ?? 800) > (shot.width ?? 1280) * 0.75;
                  const wide = project.gallery.filter((s) => (s.height ?? 800) <= (s.width ?? 1280) * 0.75);
                  const span = tall ? "md:col-span-2" : wide.length % 2 === 1 && wide.indexOf(shot) === 0 ? "md:col-span-6" : "md:col-span-3";
                  return (
                  <figure key={shot.src} className={cn("group m-0", span)}>
                    <BrowserFrame src={shot.src} alt={shot.alt} url={shot.url} width={shot.width} height={shot.height} />
                    <figcaption className="mt-3 text-sm text-muted-foreground">{shot.caption}</figcaption>
                  </figure>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* ───────── next ───────── */}
      <section className="mx-auto max-w-6xl px-5 pb-8">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex flex-col gap-4 rounded-[28px] border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-50px_var(--cobalt)] sm:flex-row sm:items-center sm:p-8"
        >
          <div className="flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Next project</p>
            <p className="mt-2 font-display text-3xl font-extrabold tracking-tight">{next.name}</p>
            <p className="mt-1 max-w-[60ch] text-muted-foreground">{next.summary}</p>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition group-hover:translate-x-1">
            <ArrowRight className="size-5" />
          </span>
        </Link>
      </section>
    </article>
  );
}
