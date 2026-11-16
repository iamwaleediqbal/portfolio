"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Links shared before each project had its own page point at /projects#slug.
 * Send them to the page that replaced the anchor instead of the top of a list.
 */
export function HashRedirect({ slugs }: { slugs: string[] }) {
  const router = useRouter();
  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (slugs.includes(slug)) router.replace(`/projects/${slug}`);
  }, [router, slugs]);
  return null;
}
