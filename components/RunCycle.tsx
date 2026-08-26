import { cycle } from "@/content/site";

/**
 * One evaluation run, drawn.
 *
 * The claim the picture makes, and the reason it is worth the space: the two
 * state snapshots come from the application itself and travel past the loop
 * untouched, meeting only at the grader. The route the model took between them
 * sits inside the dashed box and is never an input to the verdict — which is
 * the one thing about this design that prose keeps failing to land.
 *
 * Hand-authored SVG rather than a diagram library: no runtime, nothing added to
 * the bundle, and it themes itself because every colour in it is a token this
 * site already defines. It scrolls inside its own container below ~620px, where
 * the labels would otherwise shrink past reading size.
 */
export function RunCycle() {
  return (
    <div className="space-y-4">
      <p className="max-w-[68ch] text-[17px] leading-relaxed">{cycle.lead}</p>

      <figure className="m-0 space-y-3">
        <div className="overflow-x-auto rounded-xl border px-4 py-6">
          <svg
            viewBox="0 0 760 522"
            role="img"
            aria-label={cycle.alt}
            className="mx-auto block h-auto w-full min-w-[620px] max-w-[820px] text-foreground"
          >
            <defs>
              <marker id="rc-a" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--muted-foreground)" />
              </marker>
              <marker id="rc-s" viewBox="0 0 10 10" refX="9.5" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="var(--chart-2)" />
              </marker>
            </defs>

            {/* the world before */}
            <rect x="150" y="30" width="460" height="56" rx="10" fill="var(--card)" stroke="var(--chart-2)" strokeOpacity=".55" />
            <text x="380" y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor">the world before</text>
            <text x="380" y="72" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">clickmail.reset() — every message, folder and flag</text>
            <line x1="380" y1="88" x2="380" y2="122" stroke="var(--muted-foreground)" strokeOpacity=".7" markerEnd="url(#rc-a)" />

            {/* the turn loop */}
            <rect x="60" y="128" width="640" height="172" rx="14" fill="none" stroke="var(--muted-foreground)" strokeOpacity=".45" strokeDasharray="5 4" />
            <rect x="296" y="119" width="168" height="18" fill="var(--background)" />
            <text x="380" y="133" textAnchor="middle" fontSize="10.5" letterSpacing=".1em" fill="var(--muted-foreground)">THE TURN LOOP</text>

            <text x="217" y="158" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">the screen, and what it may do</text>
            <text x="380" y="158" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">one action → real pixels</text>
            <text x="380" y="171" textAnchor="middle" fontSize="9.5" fill="var(--muted-foreground)" opacity=".75">polyact&rsquo;s rules</text>
            <text x="543" y="158" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">a real click</text>

            <rect x="76" y="180" width="118" height="46" rx="8" fill="var(--card)" stroke="var(--chart-3)" strokeOpacity=".55" />
            <text x="135" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">the harness</text>
            <text x="135" y="216" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">agentscore</text>

            <rect x="239" y="180" width="118" height="46" rx="8" fill="var(--card)" stroke="var(--chart-1)" strokeOpacity=".55" />
            <text x="298" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">the model</text>
            <text x="298" y="216" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">any provider</text>

            <rect x="402" y="180" width="118" height="46" rx="8" fill="var(--card)" stroke="var(--muted-foreground)" strokeOpacity=".4" />
            <text x="461" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">the browser</text>
            <text x="461" y="216" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">real Chromium</text>

            <rect x="565" y="180" width="118" height="46" rx="8" fill="var(--card)" stroke="var(--chart-2)" strokeOpacity=".55" />
            <text x="624" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor">the app</text>
            <text x="624" y="216" textAnchor="middle" fontSize="10" fill="var(--muted-foreground)">clickmail</text>

            <line x1="196" y1="203" x2="235" y2="203" stroke="var(--muted-foreground)" strokeOpacity=".7" markerEnd="url(#rc-a)" />
            <line x1="359" y1="203" x2="398" y2="203" stroke="var(--muted-foreground)" strokeOpacity=".7" markerEnd="url(#rc-a)" />
            <line x1="522" y1="203" x2="561" y2="203" stroke="var(--muted-foreground)" strokeOpacity=".7" markerEnd="url(#rc-a)" />

            <path d="M624 228 L624 250 Q624 256 618 256 L141 256 Q135 256 135 250 L135 236" fill="none" stroke="var(--muted-foreground)" strokeOpacity=".7" markerEnd="url(#rc-a)" />
            <text x="380" y="278" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">what changed — as text, or as the next screenshot</text>

            <line x1="380" y1="302" x2="380" y2="334" stroke="var(--muted-foreground)" strokeOpacity=".7" markerEnd="url(#rc-a)" />
            <text x="396" y="322" fontSize="10.5" fill="var(--muted-foreground)">when it finishes, or the turn budget runs out</text>

            {/* the world after */}
            <rect x="150" y="338" width="460" height="56" rx="10" fill="var(--card)" stroke="var(--chart-2)" strokeOpacity=".55" />
            <text x="380" y="362" textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor">the world after</text>
            <text x="380" y="380" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)">clickmail.state() — the same shape, taken again</text>

            {/* both snapshots travel past the loop untouched, and meet at the grader */}
            <path d="M150 58 L34 58 Q22 58 22 70 L22 437 Q22 449 34 449 L244 449" fill="none" stroke="var(--chart-2)" strokeOpacity=".65" strokeWidth="1.5" markerEnd="url(#rc-s)" />
            <path d="M610 366 L726 366 Q738 366 738 378 L738 437 Q738 449 726 449 L516 449" fill="none" stroke="var(--chart-2)" strokeOpacity=".65" strokeWidth="1.5" markerEnd="url(#rc-s)" />

            <rect x="250" y="424" width="260" height="50" rx="10" fill="var(--muted)" stroke="var(--muted-foreground)" strokeOpacity=".3" />
            <text x="380" y="446" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="currentColor">grade(before, after)</text>
            <text x="380" y="463" textAnchor="middle" fontSize="10.5" fill="var(--muted-foreground)">the two snapshots, never the route</text>

            <line x1="380" y1="476" x2="380" y2="490" stroke="var(--muted-foreground)" strokeOpacity=".7" markerEnd="url(#rc-a)" />
            <text x="380" y="510" textAnchor="middle" fontSize="11.5" fontWeight="500" fill="currentColor" opacity=".85">pass · incomplete · overreach · both</text>
          </svg>
        </div>

        {/* Only where the figure actually clips. Above 620px it does not. */}
        <p aria-hidden className="text-xs text-muted-foreground sm:hidden">{cycle.scrollHint}</p>

        <figcaption className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
          {cycle.caption}
        </figcaption>
      </figure>

      <div
        className="rounded-md border-l-2 bg-muted/40 px-4 py-3"
        style={{ borderLeftColor: "var(--chart-4)" }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {cycle.scopeLabel}
        </p>
        <p className="mt-1 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
          {cycle.scope}
        </p>
      </div>
    </div>
  );
}
