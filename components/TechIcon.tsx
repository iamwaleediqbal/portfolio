import { ICONS, type IconName } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

/** One brand mark from lib/tech-icons, sized by its container's font size. */
export function TechIcon({
  name,
  className,
  brand = false,
}: {
  name: IconName;
  className?: string;
  /** Fill with the brand colour rather than the current text colour. */
  brand?: boolean;
}) {
  const icon = ICONS[name];
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.title}
      className={cn("size-[1em] shrink-0", className)}
      fill={brand ? icon.hex : "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}
