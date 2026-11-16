import type { Metadata } from "next";

import { Leaderboard } from "@/components/Leaderboard";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { RunCycle } from "@/components/RunCycle";
import { SystemMap } from "@/components/SystemMap";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "agentscore, an open source evaluation harness for computer use agents, its companion repos, and two live products: Anchorly and My Quran Companion.",
};

const harness = projects.filter((project) => project.kind !== "product");
const products = projects.filter((project) => project.kind === "product");

export default function Projects() {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-5 py-12 xl:pr-[17.25rem]">
          <p className="text-xs font-semibold uppercase tracking-[0.09em] text-primary">Projects</p>
          <h1 className="mt-2 max-w-[20ch] text-4xl font-extrabold tracking-tight sm:text-5xl">
            One main project, and two products people use
          </h1>
          <p className="mt-4 max-w-[66ch] text-muted-foreground">
            agentscore is my main open source project: a harness that drives an AI agent through a
            real application in a real browser and grades what it left behind. polyact and clickmail
            are its companion repos, the provider layer it reads model answers through and the
            application it drives. Alongside it I run two public products, Anchorly for Shopify
            stores and My Quran Companion.
          </p>
        </div>
      </header>

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-5 py-12 xl:pr-[17.25rem]">
          <h2 className="mb-6 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            <span aria-hidden className="size-2.5 rounded-[3px] bg-chart-1" />
            How agentscore and its companions fit together
          </h2>
          <Reveal>
            <SystemMap />
          </Reveal>
        </div>
      </section>

      {/* The three cards above say what the parts are. This says what happens
          when they run, which is the question a reader actually arrives with. */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-5 py-12 xl:pr-[17.25rem]">
          <h2 className="mb-6 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            <span aria-hidden className="size-2.5 rounded-[3px] bg-chart-2" />
            What one run actually does
          </h2>
          <Reveal>
            <RunCycle />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-4 px-5 py-12 xl:pr-[17.25rem]">
        {harness.map((project, index) => (
          <Reveal key={project.slug} delay={index * 55}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-6xl px-5 py-12 xl:pr-[17.25rem]">
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

      {/* Live products, not infrastructure: things people use, with their own
          sites rather than repositories. */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-5 py-12 xl:pr-[17.25rem]">
          <h2 className="mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            <span aria-hidden className="size-2.5 rounded-[3px] bg-chart-5" />
            Products
          </h2>
          <p className="mb-6 max-w-[66ch] text-muted-foreground">
            Two live products built on the same rule as the harness: an answer has to come from a
            source the system can show, and when there is no source, it says so.
          </p>
          <div className="space-y-4">
            {products.map((project, index) => (
              <Reveal key={project.slug} delay={index * 55}>
                <ProjectCard project={project} index={harness.length + index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
