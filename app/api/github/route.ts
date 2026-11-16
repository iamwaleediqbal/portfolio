import { NextResponse } from "next/server";

import { getGitHub } from "@/lib/github";

/*
 * The profile section fetches this on every page load, so it is cached here
 * rather than per visitor: GitHub is asked at most once every half hour,
 * however many people open the page. That is what keeps an unauthenticated
 * deployment inside GitHub's 60 requests an hour.
 */
export const revalidate = 1800;

export async function GET() {
  const data = await getGitHub();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400" },
  });
}
