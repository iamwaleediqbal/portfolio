import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { career, experience, profile } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description: `${profile.role} — evaluation platforms, agent systems, and client products.`,
};

const TONE = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "chart-6"] as const;

export default function Experience() {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.09em] text-primary">
            Experience
          </p>
          <h1 className="mt-2 max-w-[26ch] text-3xl font-semibold tracking-tight sm:text-4xl">
            {career.headline}
          </h1>
          <p className="mt-4 max-w-[68ch] text-[17px] leading-relaxed text-muted-foreground">
            {career.summary}
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
        <ol className="relative space-y-5 border-l pl-6 sm:pl-8">
          {experience.map((job, index) => {
            const tone = TONE[index % TONE.length];
            return (
              <li key={job.company} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[calc(1.5rem+5px)] top-7 size-2.5 rounded-full ring-4 ring-background sm:-left-[calc(2rem+5px)]"
                  style={{ background: `var(--${tone})` }}
                />
                <Reveal delay={index * 55}>
                  <Card
                    style={{
                      borderLeftColor: `color-mix(in srgb, var(--${tone}) 45%, transparent)`,
                      borderLeftWidth: 3,
                    }}
                  >
                    <CardContent className="space-y-5">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h2 className="text-lg font-semibold tracking-tight">
                            {job.role}
                            <span className="text-muted-foreground">, {job.company}</span>
                          </h2>
                          <Badge variant="secondary" className="font-mono text-[11px] font-medium">
                            {job.period}
                          </Badge>
                        </div>
                        <p className="max-w-[68ch] text-[15px] leading-relaxed text-muted-foreground">
                          {job.summary}
                        </p>
                      </div>

                      <Separator />

                      <ul className="space-y-3">
                        {job.lines.map((line) => (
                          <li
                            key={line.slice(0, 28)}
                            className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                          >
                            <span
                              aria-hidden
                              className="mt-[0.55rem] size-1.5 shrink-0 rounded-full"
                              style={{ background: `var(--${tone})` }}
                            />
                            <span className="text-foreground/85">{line}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border px-2 py-0.5 text-xs text-muted-foreground"
                            style={{
                              background: `color-mix(in srgb, var(--${tone}) 8%, transparent)`,
                              borderColor: `color-mix(in srgb, var(--${tone}) 22%, transparent)`,
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="border-t">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-5 py-10 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">The code, not the CV</h2>
            <p className="mt-1 max-w-[52ch] text-sm text-muted-foreground">
              The platform above is not public. These four projects are the same ideas rebuilt in
              the open, and every one of them runs.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/projects">See the projects</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
