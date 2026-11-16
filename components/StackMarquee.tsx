import { TechIcon } from "@/components/TechIcon";
import type { IconName } from "@/lib/tech-icons";

const STACK: { icon: IconName; label: string }[] = [
  { icon: "python", label: "Python" },
  { icon: "fastapi", label: "FastAPI" },
  { icon: "typescript", label: "TypeScript" },
  { icon: "nextjs", label: "Next.js" },
  { icon: "react", label: "React" },
  { icon: "postgresql", label: "PostgreSQL" },
  { icon: "redis", label: "Redis" },
  { icon: "celery", label: "Celery" },
  { icon: "langchain", label: "LangGraph" },
  { icon: "openai", label: "OpenAI" },
  { icon: "anthropic", label: "Anthropic" },
  { icon: "gemini", label: "Gemini" },
  { icon: "docker", label: "Docker" },
  { icon: "kubernetes", label: "Kubernetes" },
  { icon: "gcp", label: "Google Cloud" },
  { icon: "aws", label: "AWS" },
  { icon: "shopify", label: "Shopify" },
  { icon: "nodejs", label: "Node.js" },
  { icon: "rails", label: "Rails" },
  { icon: "expo", label: "Expo" },
];

/**
 * The stack as a slow, endless strip. Marks sit in the text colour and take
 * their brand colour on hover. The list is rendered twice so the loop has no
 * seam; the copy is hidden from screen readers so the stack is read once.
 * Reduced motion stops it, and the row simply wraps.
 */
export function StackMarquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {STACK.map(({ icon, label }) => (
        <li
          key={label}
          className="group flex items-center gap-2 rounded-full border bg-card/70 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="text-[17px] transition-colors">
            <TechIcon name={icon} className="group-hover:hidden" />
            <TechIcon name={icon} brand className="hidden group-hover:block" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee-mask overflow-hidden py-2" aria-label="Tools I use">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap">
        {row(false)}
        <span className="contents motion-reduce:hidden">{row(true)}</span>
      </div>
    </div>
  );
}
