import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { profile, skills } from "@/content/site";

export const metadata: Metadata = { title: "About", description: profile.headline };

const TONE = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "chart-6"] as const;

export default function About() {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.09em] text-primary">About</p>
          <h1 className="mt-2 max-w-[22ch] text-3xl font-semibold tracking-tight sm:text-4xl">
            {profile.headline}
          </h1>
        </div>
      </header>

      <section className="mx-auto grid max-w-4xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="space-y-4">
          {profile.intro.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={index * 55}>
              <p className="max-w-[68ch] text-[17px] leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <Card className="gap-0 overflow-hidden pt-0">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={520}
              height={520}
              className="aspect-square w-full object-cover"
            />
            <CardContent className="space-y-3 pt-5 text-sm">
              <Fact term="Based in">{profile.location}</Fact>
              <Fact term="Focus">{profile.focus}</Fact>
              <Fact term="Availability">{profile.available}</Fact>
              <Button asChild className="w-full">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
          <h2 className="mb-6 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.09em] text-muted-foreground">
            <span aria-hidden className="size-2.5 rounded-[3px] bg-chart-3" />
            Stack
          </h2>
          <div className="space-y-3">
            {skills.map((group, index) => (
              <Reveal key={group.group} delay={index * 45}>
                <Card>
                  <CardContent className="space-y-3">
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <span
                        aria-hidden
                        className="size-2 rounded-full"
                        style={{ background: `var(--${TONE[(group.tone - 1) % TONE.length]})` }}
                      />
                      {group.group}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-sm"
                          style={{
                            background: `color-mix(in srgb, var(--${TONE[(group.tone - 1) % TONE.length]}) 9%, transparent)`,
                            borderColor: `color-mix(in srgb, var(--${TONE[(group.tone - 1) % TONE.length]}) 24%, transparent)`,
                          }}
                        >
                          <span
                            aria-hidden
                            className="size-1.5 rounded-full"
                            style={{
                              background: `var(--${TONE[(group.tone - 1) % TONE.length]})`,
                            }}
                          />
                          {item}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {term}
      </div>
      <div className="mt-0.5 text-muted-foreground">{children}</div>
    </div>
  );
}
