import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * A screenshot inside a minimal browser window. The chrome is what tells the
 * eye "this is a real, running site" rather than a mock-up, and the address is
 * the real one, so it doubles as a caption.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  className,
  priority = false,
  width = 1280,
  height = 800,
}: {
  src: string;
  alt: string;
  url: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-secondary shadow-[0_30px_80px_-40px_rgb(0_0_0/0.7)]", className)}>
      <div className="flex items-center gap-2 border-b bg-card/80 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-tangerine/80" />
          <span className="size-2.5 rounded-full bg-sun/80" />
          <span className="size-2.5 rounded-full bg-mint/80" />
        </span>
        <span className="mx-auto truncate rounded-md bg-secondary px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
          {url.replace(/^https?:\/\//, "")}
        </span>
        <span className="w-[42px]" aria-hidden />
      </div>
      <div className="overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}
