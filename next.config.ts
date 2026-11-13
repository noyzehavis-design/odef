import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

// cacheComponents stays off for now: every route is private (behind auth),
// and @serwist/turbopack's route handler relies on segment config that
// cacheComponents doesn't allow. Revisit when there is static content.
const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withSerwist(nextConfig);
