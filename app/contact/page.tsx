import { ArrowUpRight, FileDown, Mail } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { LocalTime } from "@/components/LocalTime";
import { PageHeader } from "@/components/PageHeader";
import { TechIcon } from "@/components/TechIcon";
import { profile } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

export default function Contact() {
  return (
    <>
      <PageHeader
        kicker="Contact"
        title="Let's talk."
        lead="Roles, contract work, or a question about anything on this site. I read everything and usually reply within a day."
      />

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="rounded-[28px] border bg-card p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Send a message</p>
          <div className="mt-5">
            <ContactForm accessKey={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} fallbackEmail={profile.email} />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[28px] bg-cobalt p-6 text-white">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
              <Mail className="size-3.5" /> Email
            </p>
            <a href={`mailto:${profile.email}`} className="mt-3 block break-all font-display text-xl font-bold hover:underline" data-watch="happy">
              {profile.email}
            </a>
            <div className="mt-4">
              <CopyEmail email={profile.email} />
            </div>
          </div>

          <div className="rounded-[28px] border bg-card p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Where and when</p>
            <p className="mt-3 font-display text-3xl font-extrabold tabular-nums text-sun-ink">
              <LocalTime />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {profile.location}, UTC+5. Remote, or relocating.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-3 py-1 text-xs text-mint-ink">
              <span className="size-1.5 rounded-full bg-mint" />
              {profile.available}
            </p>
          </div>

          <div className="rounded-[28px] border bg-card p-3">
            {[
              { href: profile.github, label: "GitHub", sub: "Open source and products", icon: <TechIcon name="github" className="text-[18px]" /> },
              { href: profile.linkedin, label: "LinkedIn", sub: "Work history", icon: <TechIcon name="linkedin" className="text-[18px]" /> },
              { href: profile.cv, label: "Download CV", sub: "PDF, two pages", icon: <FileDown className="size-[18px]" />, download: true },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.download ? { download: "Waleed-Iqbal-CV.pdf" } : { target: "_blank", rel: "noreferrer" })}
                className="group flex items-center gap-3 rounded-2xl p-3 transition hover:bg-secondary"
              >
                <span className="grid size-10 place-items-center rounded-xl border bg-background">{item.icon}</span>
                <span className="flex-1">
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span className="block text-xs text-muted-foreground">{item.sub}</span>
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
