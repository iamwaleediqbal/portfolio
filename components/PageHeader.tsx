import { cn } from "@/lib/utils";

/**
 * The top of every inner page, in the same voice as the home page sections:
 * a mono kicker with the tangerine rule, a display headline, one line under it.
 */
export function PageHeader({
  kicker,
  title,
  lead,
  children,
  className,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("relative overflow-hidden", className)}>
      <div aria-hidden className="bg-blueprint pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-14 sm:pt-20">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-tangerine">
          <span aria-hidden className="h-px w-6 bg-tangerine" />
          {kicker}
        </p>
        <h1 className="mt-4 max-w-[20ch] text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-muted-foreground">{lead}</p>}
        {children}
      </div>
    </header>
  );
}

/** A section heading inside a page: small kicker, display title. */
export function SectionTitle({ kicker, title, id }: { kicker: string; title: string; id?: string }) {
  return (
    <div id={id} className="mb-6 scroll-mt-28">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{kicker}</p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}

/** Renders **bold** spans inside a plain string, so a line can lead with its point. */
export function Lead({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-semibold text-foreground">
            {part}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}
