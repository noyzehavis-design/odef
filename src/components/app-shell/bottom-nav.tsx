"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copy } from "@/lib/copy";
import { isActive, NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Floating tab bar on phones. The active tab grows into a pill with its label. */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav aria-label={copy.nav.label} className="bottom-safe-4 fixed inset-x-0 z-40 flex justify-center px-4 md:hidden">
      <ul className="flex w-full max-w-md items-center gap-1 rounded-full border bg-nav p-1.5 shadow-[0_10px_40px_rgb(0_0_0/0.35)] backdrop-blur-xl">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className={cn("transition-[flex-grow] duration-300 ease-out", active ? "grow-[1.8]" : "grow")}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-12 items-center justify-center gap-2 rounded-full transition-colors duration-300",
                  active
                    ? "bg-primary px-4 text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground active:scale-95",
                )}
              >
                <Icon className="size-5 shrink-0" strokeWidth={active ? 2.25 : 1.75} aria-hidden />
                <span className={cn("text-sm font-medium whitespace-nowrap", !active && "sr-only")}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
