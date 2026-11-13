"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect } from "react";

/** Dark by default, light and system on demand (see SPEC "שפה עיצובית"). */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  );
}

/** Keeps the browser / iOS status bar color in step with the chosen theme. */
function ThemeColorSync() {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    if (!resolvedTheme) return;
    const color = getComputedStyle(document.documentElement).getPropertyValue("--background").trim();
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute("content", color));
  }, [resolvedTheme]);
  return null;
}
