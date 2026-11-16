import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CareerTimeline } from "@/components/CareerTimeline";
import { Lead, PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { career, experience, profile } from "@/content/site";

export const metadata: Metadata = {
  title: "Experience",
  description: `${profile.role}: evaluation platforms, agent systems and client products since 2021.`,
};

const TONES = ["var(--cobalt)", "var(--tangerine)"];

export default function Experience() {
  return (
    <>
      <PageHeader kicker="Experience" title={career.headline} lead={career.summary} />

      <section className="mx-auto max-w-6xl px-5 pb-6">
        <Reveal>
          <CareerTimeline />
        </Reveal>
      </section>

      {experience.map((job, index) => {
        const tone = TONES[index % TONES.length];
        return (
          <section key={job.company} className="mx-auto max-w-6xl px-5">
            <div className="grid gap-8 border-t py-14 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="size-2 rounded-full" style={{ background: tone }} />
                  {job.period}
                </p>
                <h2 className="mt-3 text-4xl font-extrabold tracking-tight">{job.company}</h2>
                <p className="mt-2 font-medium text-link">{job.role}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{job.summary}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {job.stack.map((item) => (
                    <span key={item} className="rounded-full border bg-card px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </aside>

              <ol className="space-y-4">
                {job.roles.map((role, i) => (
                  <Reveal key={role.title} delay={i * 60}>
                    <li className="rounded-[24px] border bg-card p-6 sm:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                        <h3 className="font-display text-xl font-bold leading-snug">{role.title}</h3>
                        <span className="rounded-full border px-3 py-1 font-mono text-[11px] text-muted-foreground">{role.period}</span>
                      </div>
                      <ul className="mt-5 space-y-3.5">
                        {role.lines.map((line) => (
                          <li key={line.slice(0, 32)} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                            <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 rounded-full" style={{ background: tone }} />
                            <span>
                              <Lead text={line} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>
        );
      })}

      <section className="mx-auto max-w-6xl px-5 pb-6 pt-4">
        <div className="flex flex-col gap-5 rounded-[28px] border bg-card p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">The platform is private. The projects are not.</h2>
            <p className="mt-2 max-w-[56ch] text-muted-foreground">
              Every project has a case study with its architecture, its stack and the numbers behind it.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button asChild className="rounded-full">
              <Link href="/projects">
                See the projects <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
