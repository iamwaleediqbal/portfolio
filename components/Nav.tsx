"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
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

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent bg-background/80 backdrop-blur transition-colors",
        lifted && "border-border bg-background/95",
      )}
    >
      <div className="mx-auto flex h-14 max-w-4xl items-center gap-3 px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="size-3 rounded-[4px] bg-gradient-to-br from-chart-1 via-chart-3 to-chart-5" />
          {name}
        </Link>

        <nav className="ml-auto hidden items-center gap-0.5 sm:flex">
          {LINKS.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Button
                key={href}
                asChild
                size="sm"
                variant={active ? "secondary" : "ghost"}
                className={cn(!active && "text-muted-foreground")}
              >
                <Link href={href}>{label}</Link>
              </Button>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:ml-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-0.5 border-t px-4 py-2 sm:hidden">
          {LINKS.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Button
                key={href}
                asChild
                variant={active ? "secondary" : "ghost"}
                className={cn("justify-start", !active && "text-muted-foreground")}
              >
                <Link href={href}>{label}</Link>
              </Button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
