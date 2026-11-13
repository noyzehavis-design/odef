/// <reference lib="webworker" />
import { defaultCache } from "@serwist/turbopack/worker";
import { type PrecacheEntry, Serwist, type SerwistGlobalConfig } from "serwist";

// Service worker source. Bundled by src/app/serwist/[path]/route.ts and served at /serwist/sw.js.
// Push notifications (stage 4) will be added here.

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
