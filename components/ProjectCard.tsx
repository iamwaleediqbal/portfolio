import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BrowserFrame } from "@/components/BrowserFrame";
import { CodeCard } from "@/components/CodeCard";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * A project as a tile that opens its case study. The whole card is the link,
 * because a reader scanning tiles clicks the picture, not the small text.
 */
export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group grid h-full grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[28px] border bg-card transition hover:-translate-y-0.5 hover:shadow-[0_30px_80px_-50px_var(--cobalt)]",
        wide && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]",
      )}
    >
      <div className={cn("flex min-w-0 flex-col p-6 sm:p-8", !wide && "order-2")}>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{project.label}</p>
        <h3 className={cn("mt-2 font-extrabold tracking-tight", wide ? "text-4xl sm:text-5xl" : "text-3xl")}>{project.name}</h3>
        <p className="mt-3 max-w-[52ch] leading-relaxed text-muted-foreground">{project.summary}</p>

        <dl className="mt-6 grid grid-cols-2 gap-2.5">
          {project.stats.slice(0, wide ? 4 : 2).map((stat, i) => (
            <div key={stat.label} className="rounded-2xl border bg-background/50 p-3.5">
              <dt className="sr-only">{stat.label}</dt>
              <dd className={cn("font-display text-2xl font-extrabold tabular-nums", i % 2 === 0 ? "text-sun-ink" : "text-mint-ink")}>{stat.value}</dd>
              <dd className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech.name} className="rounded-full border px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
              {tech.name}
            </span>
          ))}
        </div>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-medium text-link">
          Read the case study
          <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </span>
      </div>

      <div
        className={cn("min-w-0 p-4 sm:p-6", wide ? "lg:pl-0" : "order-1 pb-0 sm:pb-0")}
        style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--cobalt) 10%, transparent), transparent 70%)" }}
      >
        {project.image ? (
          <BrowserFrame src={project.image} alt={`${project.name}, running`} url={project.live ?? project.repo ?? ""} />
        ) : (
          <CodeCard />
        )}
      </div>
    </Link>
  );
}
