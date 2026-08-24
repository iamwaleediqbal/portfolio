import type { Metadata } from "next";

import { Leaderboard } from "@/components/Leaderboard";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Open source agent tooling, an evaluation harness, and a shipped Shopify product.",
};

export default function Projects() {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.09em] text-primary">Projects</p>
          <h1 className="mt-2 max-w-[20ch] text-3xl font-semibold tracking-tight sm:text-4xl">
            Built in the open, small enough to read
          </h1>
          <p className="mt-4 max-w-[66ch] text-muted-foreground">
            I build agent evaluation infrastructure full time. That platform is not public, so
            these are light versions of the same systems, rebuilt where you can read them end
            to end. Each names what it is a reduction of. The tests are written against the
            mistakes rather than the happy path, which is the part worth looking at.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-4xl space-y-4 px-5 py-12 sm:px-6">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 55}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
          <h2 className="mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            <span aria-hidden className="size-2.5 rounded-[3px] bg-chart-4" />
            Free model leaderboard
          </h2>
          <p className="mb-6 max-w-[66ch] text-muted-foreground">
            Produced by <strong className="font-medium text-foreground">agentscore</strong>, run
            nightly in GitHub Actions. Bars are pass rates; the band behind each is the 95%
            interval. Where those overlap the data cannot order the models, and the ranking says
            so rather than inventing a winner.
          </p>
          <Reveal>
            <Leaderboard />
          </Reveal>
        </div>
      </section>
    </>
  );
}
