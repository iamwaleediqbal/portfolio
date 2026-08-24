import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { profile, projects } from "@/content/site";

const TONE = ["chart-1", "chart-2", "chart-3", "chart-4"] as const;

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[420px] opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(40% 50% at 20% 30%, color-mix(in srgb, var(--chart-1) 24%, transparent), transparent 70%), radial-gradient(36% 44% at 78% 18%, color-mix(in srgb, var(--chart-3) 20%, transparent), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-4xl px-5 pb-10 pt-16 sm:px-6 sm:pt-20">
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
            <div className="relative shrink-0">
              <span
                aria-hidden
                className="absolute -inset-1 rounded-full bg-gradient-to-br from-chart-1 via-chart-3 to-chart-5 opacity-70 blur-[2px]"
              />
              <Image
                src={profile.photo}
                alt={profile.name}
                width={160}
                height={160}
                priority
                className="relative size-[136px] rounded-full border-4 border-background object-cover shadow-lg sm:size-40"
              />
            </div>

            <div className="min-w-0">
              <Badge variant="outline" className="mb-4 gap-2 rounded-full py-1 font-normal">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-status-good opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2 rounded-full bg-status-good" />
                </span>
                {profile.available}
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
              <p className="mt-2 text-muted-foreground">
                <span className="font-medium text-foreground">{profile.role}</span> ·{" "}
                {profile.focus} · {profile.location}
              </p>
              <p className="mt-5 text-lg leading-snug tracking-tight sm:text-xl">
                {profile.headline}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                <Button asChild>
                  <Link href="/contact">
                    Get in touch
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/projects">See the work</Link>
                </Button>
                <Button asChild variant="ghost">
                  <a href={profile.github}>GitHub</a>
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {profile.stats.map((stat, index) => (
              <Card key={stat.label} className="relative gap-0 overflow-hidden py-4">
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[3px]"
                  style={{ background: `var(--${TONE[index % TONE.length]})` }}
                />
                <CardContent className="px-4">
                  <div className="text-3xl font-semibold tracking-tight tabular">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm font-medium">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.hint}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6">
          <SectionLabel tone="chart-1">In short</SectionLabel>
          <Reveal>
            <p className="max-w-[70ch] text-[17px] leading-relaxed">{profile.intro[0]}</p>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-4 max-w-[70ch] text-[17px] leading-relaxed text-muted-foreground">
              {profile.intro[1]}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Button asChild variant="link" className="mt-4 px-0">
              <Link href="/about">
                Read the longer version
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6">
          <SectionLabel tone="chart-2">Selected work</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {projects.slice(0, 4).map((project, index) => (
              <Reveal key={project.slug} delay={index * 55}>
                <Card className="relative h-full gap-0 overflow-hidden pt-0">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px]"
                    style={{
                      background: `linear-gradient(90deg, var(--${TONE[index % TONE.length]}), transparent)`,
                    }}
                  />
                  <CardContent className="space-y-3 pt-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold tracking-tight">{project.name}</h3>
                      <Badge variant="secondary" className="font-normal capitalize">
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.tagline}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className="rounded-md border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <Button asChild variant="link" className="mt-5 px-0">
            <Link href="/projects">
              All projects, in detail
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function SectionLabel({ children, tone }: { children: React.ReactNode; tone: string }) {
  return (
    <h2 className="mb-6 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
      <span
        aria-hidden
        className="size-2.5 rounded-[3px]"
        style={{ background: `var(--${tone})` }}
      />
      {children}
    </h2>
  );
}
