import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
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

/*
 * Three faces, three jobs. Bricolage Grotesque carries the voice: headings and
 * big numbers, where a little eccentricity is the point. Geist carries the
 * reading. Geist Mono carries anything a machine produced: labels, data, code.
 * All self-hosted by next/font, so there is no layout shift and no request to
 * a font CDN on first paint.
 */
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b10" },
    { media: "(prefers-color-scheme: light)", color: "#f6f2ea" },
  ],
};

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
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
