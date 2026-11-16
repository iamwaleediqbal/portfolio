"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Monogram } from "@/components/Monogram";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Route changes close the drawer; without this it stays open behind the page.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div
        className={cn(
          "mx-auto flex h-14 max-w-6xl items-center gap-3 rounded-2xl border border-transparent px-3 transition-all duration-300",
          lifted && "border-border bg-background/75 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${name}, home`}>
          <Monogram />
          <span className="hidden font-display text-[17px] font-bold tracking-tight sm:inline">{name}</span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 rounded-full border bg-card/60 p-1 md:flex">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                isActive(href)
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden rounded-full sm:inline-flex" data-watch="happy">
            <Link href="/contact">
              Hire me
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Main"
          className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border bg-background/95 p-2 backdrop-blur-xl md:hidden"
        >
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "rounded-xl px-3 py-2.5 text-[15px]",
                isActive(href) ? "bg-foreground text-background" : "text-muted-foreground hover:bg-secondary",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
