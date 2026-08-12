import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this directory -- otherwise Turbopack gets confused by
  // the root-level package-lock.json (added for `npm run dev` via concurrently).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
