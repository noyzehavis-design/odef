import { createSerwistRoute } from "@serwist/turbopack";

// Builds src/app/sw.ts with esbuild at build time and serves it as /serwist/sw.js.
export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute({
  swSrc: "src/app/sw.ts",
  useNativeEsbuild: true,
});
