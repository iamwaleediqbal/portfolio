import { ArrowRight, Download } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LocalTime } from "@/components/LocalTime";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { TechIcon } from "@/components/TechIcon";
import { Button } from "@/components/ui/button";
import { profile, skills } from "@/content/site";
import type { IconName } from "@/lib/tech-icons";

export const metadata: Metadata = { title: "About", description: profile.headline };

/** A short heading for each paragraph of the story, so it can be skimmed. */
const CHAPTERS = ["Where it started", "What I do now", "The hard part", "Where the habits came from", "On the side"];

const ICON: Partial<Record<string, IconName>> = {
  Python: "python",
  FastAPI: "fastapi",
  Celery: "celery",
  Redis: "redis",
  PostgreSQL: "postgresql",
  "Node.js": "nodejs",
  "Ruby on Rails": "rails",
  TypeScript: "typescript",
  "Next.js": "nextjs",
  React: "react",
  Tailwind: "tailwind",
  "Shopify apps": "shopify",
  OpenAI: "openai",
  Anthropic: "anthropic",
  Gemini: "gemini",
  "GCP and GKE": "gcp",
  AWS: "aws",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Vercel: "vercel",
  "GitHub Actions": "githubactions",
  Prisma: "prisma",
};

const GROUP_TONE = ["var(--cobalt)", "var(--tangerine)", "var(--mint)", "var(--sun)", "var(--lilac)"];

export default function About() {
  return (
    <>
      <PageHeader kicker="About" title="Engineer first. AI agents for the last three years." lead={profile.headline} />

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
        <div className="divide-y border-y">
          {profile.intro.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={index * 50}>
              <div className="grid gap-2 py-6 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tangerine sm:pt-1.5">{CHAPTERS[index] ?? ""}</p>
                <p className="text-[16.5px] leading-relaxed text-foreground/85">{paragraph}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-[28px] border bg-cobalt text-white">
            <div className="relative p-5 pb-0">
              <Image
                src={profile.photo}
                alt={profile.name}
                width={640}
                height={640}
                className="aspect-square w-full rounded-[20px] border-4 border-white/90 object-cover"
              />
            </div>
            <dl className="space-y-3 p-6 text-sm">
              <Fact term="Based in">{profile.location}</Fact>
              <Fact term="Local time">
                <LocalTime /> UTC+5
              </Fact>
              <Fact term="Focus">{profile.focus}</Fact>
              <Fact term="Education">BS Computer Science, FAST NUCES Lahore, 2021</Fact>
              <Fact term="Availability">{profile.available}</Fact>
            </dl>
            <div className="flex gap-2 px-6 pb-6">
              <Button asChild className="flex-1 rounded-full bg-white text-ink hover:bg-white/90" data-watch="happy">
                <Link href="/contact">Get in touch</Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-full text-white hover:bg-white/10 hover:text-white">
                <a href={profile.cv} download="Waleed-Iqbal-CV.pdf">
                  <Download className="size-4" /> CV
                </a>
              </Button>
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Stack</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">What I work with</h2>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-medium text-link">
            See it in the projects <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <Reveal key={group.group} delay={index * 50} className={index === 1 ? "lg:col-span-2" : undefined}>
              <div className="h-full rounded-[24px] border bg-card p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                  <span className="size-2.5 rounded-full" style={{ background: GROUP_TONE[index % GROUP_TONE.length] }} />
                  {group.group}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => {
                    const icon = ICON[item];
                    return (
                      <li key={item} className="inline-flex items-center gap-1.5 rounded-full border bg-background/50 px-3 py-1 text-sm">
                        {icon && <TechIcon name={icon} className="text-[14px] text-muted-foreground" />}
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/65">{term}</dt>
      <dd className="mt-0.5 text-white/95">{children}</dd>
    </div>
  );
}
