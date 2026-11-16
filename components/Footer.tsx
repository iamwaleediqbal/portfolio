import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

import { LocalTime } from "@/components/LocalTime";
import { Monogram } from "@/components/Monogram";
import { TechIcon } from "@/components/TechIcon";
import { profile } from "@/content/site";

const PAGES = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-10 border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <Monogram />
            <span className="font-display text-xl font-bold">{profile.name}</span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            {profile.role}. Agent evaluation, LLM products and the backends under them, from Faisalabad, Pakistan.
          </p>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-mint" />
            </span>
            It is <LocalTime /> here, UTC+5
          </p>
        </div>

        <nav aria-label="Footer" className="space-y-3 text-sm">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Pages</p>
          <ul className="space-y-2">
            {PAGES.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="hover:text-tangerine">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 text-sm">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Elsewhere</p>
          <ul className="space-y-2">
            <li>
              <a href={profile.github} className="group inline-flex items-center gap-2 hover:text-tangerine">
                <TechIcon name="github" /> GitHub
                <ArrowUpRight className="size-3.5 opacity-50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
            <li>
              <a href={profile.linkedin} className="group inline-flex items-center gap-2 hover:text-tangerine">
                <TechIcon name="linkedin" /> LinkedIn
                <ArrowUpRight className="size-3.5 opacity-50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-tangerine">
                <Mail className="size-4" /> {profile.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-5 font-mono text-xs text-muted-foreground sm:px-6">
          <span>&copy; {new Date().getFullYear()} {profile.name}</span>
          <span>Designed and built by hand. Next.js on Vercel.</span>
        </div>
      </div>
    </footer>
  );
}
