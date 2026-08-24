import { ArrowUpRight, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/content/site";

const TONE = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "chart-6"] as const;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tone = TONE[index % TONE.length];

  return (
    <Card className="relative gap-0 overflow-hidden pt-0 transition-shadow hover:shadow-lg">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, var(--${tone}), transparent)` }}
      />
      <CardHeader className="pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="text-xl tracking-tight">{project.name}</CardTitle>
          <Badge variant="secondary" className="font-normal capitalize">
            {project.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{project.tagline}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        {project.mirrors && (
          <p
            className="rounded-r-md border-l-2 py-2 pl-3 pr-3 text-sm text-muted-foreground"
            style={{
              borderColor: `var(--${tone})`,
              background: `color-mix(in srgb, var(--${tone}) 6%, transparent)`,
            }}
          >
            {project.mirrors}
          </p>
        )}

        <p className="text-[15px]">{project.what}</p>
        <p className="text-[15px] text-muted-foreground">{project.why}</p>

        <ul className="space-y-2">
          {project.highlights.map((line) => (
            <li key={line.slice(0, 24)} className="flex gap-2.5 text-sm text-muted-foreground">
              <span
                aria-hidden
                className="mt-[7px] size-1.5 shrink-0 rounded-full"
                style={{ background: `color-mix(in srgb, var(--${tone}) 65%, transparent)` }}
              />
              {line}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-md border bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>

        {(project.repo || project.live) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.live && (
              <Button asChild size="sm">
                <a href={project.live}>
                  Try it live
                  <ArrowUpRight className="size-3.5" />
                </a>
              </Button>
            )}
            {project.repo && (
              <Button asChild size="sm" variant="outline">
                <a href={project.repo}>
                  <Github className="size-3.5" />
                  Source
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
