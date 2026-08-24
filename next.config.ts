import type { NextConfig } from "next";

const config: NextConfig = {
  // Served as-is rather than through Vercel's image optimizer, so the
  // deployment never touches a metered feature.
  images: { unoptimized: true },
  // Type and lint errors fail the build. A green deploy that skipped both is
  // not a signal, and this repo exists to be read as evidence.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};

export default config;
