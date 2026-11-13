"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "dark", label: copy.settings.themeDark, Icon: Moon },
  { value: "light", label: copy.settings.themeLight, Icon: Sun },
  { value: "system", label: copy.settings.themeSystem, Icon: Monitor },
] as const;

const subscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // The theme is only known on the client; avoid a hydration mismatch.
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const current = mounted ? theme : undefined;

  return (
    <div role="radiogroup" aria-label={copy.settings.theme} className="grid grid-cols-3 gap-1 rounded-2xl bg-muted p-1">
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = current === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(value)}
            className={cn(
              "flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors",
              active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </button>
        );
      })}
    </div>
  );
}
