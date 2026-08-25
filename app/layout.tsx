import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/content/site";

import "./globals.css";

/*
 * The deployed origin, used as `metadataBase` — which is what turns the
 * relative image path below into the absolute URL a social card needs.
 *
 * The fallback is the real domain, and it was not: it read
 * `iamwaleediqbal.vercel.app`, which 404s. Nothing on the page breaks when this
 * is wrong, which is exactly why it went unnoticed — the only symptom is that
 * every link preview of this site, on every platform, silently shows no image.
 *
 * Set NEXT_PUBLIC_SITE_URL on the deployment anyway. A default that happens to
 * be right today is not a configuration.
 */
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://waleediqbal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: `${profile.name} — ${profile.role}`, template: `%s — ${profile.name}` },
  description: profile.headline,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.headline,
    images: [{ url: profile.photo, width: 640, height: 640, alt: profile.name }],
    type: "profile",
  },
  // Deliberately not the photograph. A face at 16x16 is a smudge; a monogram
  // stays legible, and an SVG stays sharp on every display. app/icon.svg is
  // picked up by convention — naming it here as well keeps the two in sync if
  // anyone adds a second format later.
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <Nav name={profile.name} />
          <main id="main">{children}</main>
          <footer className="border-t">
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-muted-foreground sm:px-6">
              <span>
                &copy; {new Date().getFullYear()} {profile.name}
              </span>
              <span className="flex gap-4">
                <a href={profile.github} className="hover:text-foreground">
                  GitHub
                </a>
                <a href={profile.linkedin} className="hover:text-foreground">
                  LinkedIn
                </a>
                <a href="/contact" className="hover:text-foreground">
                  Contact
                </a>
              </span>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
