import type { Metadata } from "next";

import { Leaderboard } from "@/components/Leaderboard";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { RunCycle } from "@/components/RunCycle";
import { SystemMap } from "@/components/SystemMap";
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
            Three repositories that make up a working evaluation stack — the provider layer,
            the harness that drives and grades a run, and the application it drives — plus a
            commercial product that ships to merchants. Each one is deployed, tested and open,
            and the tests are written against the mistakes rather than the happy path, which is
            the part worth looking at.
          </p>
        </div>
      </header>

      <section className="border-b">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
          <h2 className="mb-6 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            <span aria-hidden className="size-2.5 rounded-[3px] bg-chart-1" />
            How the open projects fit together
          </h2>
          <Reveal>
            <SystemMap />
          </Reveal>
        </div>
      </section>

      {/* The three cards above say what the parts are. This says what happens
          when they run, which is the question a reader actually arrives with. */}
      <section className="border-b">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
          <h2 className="mb-6 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            <span aria-hidden className="size-2.5 rounded-[3px] bg-chart-2" />
            What one run actually does
          </h2>
          <Reveal>
            <RunCycle />
          </Reveal>
        </div>
      </section>

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
            Measured, not claimed
          </h2>
          <p className="mb-6 max-w-[66ch] text-muted-foreground">
            Every figure below comes out of{" "}
            <strong className="font-medium text-foreground">agentscore</strong>&rsquo;s committed
            run records — a real browser driving a real deployed application, one screenshot and
            one state snapshot at a time. The bar is the 95% interval and the tick inside it is
            the estimate. Where intervals overlap the data cannot order the models, and this says
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
