import { Github, Linkedin, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

export default function Contact() {
  return (
    <>
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.09em] text-primary">Contact</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s talk
          </h1>
          <p className="mt-3 max-w-[60ch] text-[17px] leading-relaxed text-muted-foreground">
            Roles, contract work, or a question about anything on this site. I read everything and
            usually reply within a day.
          </p>
        </div>
      </header>

      <section className="mx-auto grid max-w-4xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <Card>
          <CardContent>
            <ContactForm
              accessKey={process.env.NEXT_PUBLIC_WEB3FORMS_KEY}
              fallbackEmail={profile.email}
            />
          </CardContent>
        </Card>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <Card>
            <CardContent className="space-y-4 text-sm">
              <Fact icon={<MapPin className="size-4" aria-hidden />} term="Based in">
                {profile.location}
              </Fact>
              <Separator />
              <Fact term="Availability">
                <span className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="size-2 animate-pulse rounded-full bg-chart-2"
                  />
                  {profile.available}
                </span>
              </Fact>
              <Separator />
              <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Elsewhere
                </div>
                <a
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="size-4" aria-hidden />
                  GitHub
                </a>
                <a
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="size-4" aria-hidden />
                  LinkedIn
                </a>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </>
  );
}

function Fact({
  term,
  icon,
  children,
}: {
  term: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {icon}
        {term}
      </div>
      <div className="mt-1 text-muted-foreground">{children}</div>
    </div>
  );
}
