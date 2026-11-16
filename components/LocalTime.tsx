"use client";

import { useEffect, useState } from "react";

/**
 * The time where I am, ticking. For a remote hire the first practical question
 * is overlap, and this answers it without anyone doing timezone arithmetic.
 * Rendered empty on the server so the static HTML never shows a stale time.
 */
export function LocalTime({ zone = "Asia/Karachi" }: { zone?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: zone }).format(new Date());
    setNow(format());
    const id = window.setInterval(() => setNow(format()), 15_000);
    return () => window.clearInterval(id);
  }, [zone]);

  return (
    <span className="font-mono tabular-nums" suppressHydrationWarning>
      {now ?? "--:--"}
    </span>
  );
}
