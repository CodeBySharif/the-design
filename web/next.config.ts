import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Keep the linter package external so import.meta.url resolves to node_modules.
  serverExternalPackages: ["@google/design.md"],
  outputFileTracingIncludes: {
    "/api/lint": [
      "./node_modules/@google/design.md/dist/linter/spec-config.yaml",
    ],
  },
};

export default nextConfig;
