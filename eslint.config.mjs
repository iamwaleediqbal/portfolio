import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Build output, dependencies, and generated declarations. Without these,
    // `eslint .` reports thousands of problems in code nobody wrote and drowns
    // the handful that are real.
    ignores: [".next/**", ".next-stale*/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default config;
