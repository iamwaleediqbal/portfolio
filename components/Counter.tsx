"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Counts up once, when it first scrolls into view.
 *
 * The starting value is the *final* number, not zero, and that is the whole
 * point of this file. Starting at zero meant the server rendered `0+ Years in
 * production` into the HTML and only counted up once JavaScript ran — so
 * everything that reads a page without executing it (a link preview in Slack or
 * LinkedIn, the first crawl, view-source, a reader that snapshots before
 * hydration) saw a portfolio claiming zero years of everything.
 *
 * So the number is correct before any of this runs, and the animation is a
 * progressive enhancement layered on top: reset to zero and count back up, but
 * only in a browser that is going to do it.
 */

// Runs before paint on the client, so resetting to zero is never visible as a
// flash of the real number. `useLayoutEffect` warns when called during SSR,
// where there is no layout to read, so the server gets the passive one.
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(to);

  useBeforePaint(() => {
    const node = ref.current;
    if (!node) return;

    // Readers who asked for reduced motion keep the number they already have.
    if (to === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Older browsers without the observer keep the number too, rather than
    // being left on a zero that never animates away.
    if (typeof IntersectionObserver === "undefined") return;

    setValue(0);

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const duration = 900;
      let start: number | null = null;
      const tick = (now: number) => {
        start ??= now;
        const progress = Math.min((now - start) / duration, 1);
        // ease-out cubic, so it decelerates into the final value
        setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    observer.observe(node);
    return () => {
      observer.disconnect();
      // Whatever interrupted this, the number left on screen is the true one.
      setValue(to);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
