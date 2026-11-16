import type { Metadata } from "next";

import { HashRedirect } from "@/components/HashRedirect";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "agentscore, an open source evaluation harness for computer use agents, its two companion repos, and two live products: Anchorly and My Quran Companion.",
};

const main = projects.find((project) => project.kind === "main")!;
const companions = projects.filter((project) => project.kind === "companion");
const products = projects.filter((project) => project.kind === "product");

export default function Projects() {
  return (
    <>
      <HashRedirect slugs={projects.map((project) => project.slug)} />
      <PageHeader
        kicker="Projects"
        title="One main project. Two products people use."
        lead="Each project has its own case study: the problem, an architecture diagram, the stack and why, how I ran it, and what it showed."
      />

      <section className="mx-auto max-w-6xl space-y-14 px-5 pb-10">
        <Group title="Main project">
          <Reveal>
            <ProjectCard project={main} wide />
          </Reveal>
        </Group>

        <Group title="Built for agentscore" note="The provider layer it reads models through, and the app it drives.">
          <div className="grid gap-4 md:grid-cols-2">
            {companions.map((project, i) => (
              <Reveal key={project.slug} delay={i * 70}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Group>

        <Group title="Live products" note="Things people use, built on the same rule: an answer has to come from a source the system can show.">
          <div className="grid gap-4 md:grid-cols-2">
            {products.map((project, i) => (
              <Reveal key={project.slug} delay={i * 70}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Group>
      </section>
    </>
  );
}

function Group({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b pb-3">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</h2>
        {note && <p className="text-sm text-muted-foreground">{note}</p>}
      </div>
      {children}
    </div>
  );
}
