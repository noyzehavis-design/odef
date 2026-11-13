"use client";

import { Bell, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/brand/logo-mark";
import { copy } from "@/lib/copy";
import { isActive, NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Narrow rail on the right (start side in RTL) for tablets and desktop. */
export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 start-0 z-40 hidden w-24 flex-col items-center border-e bg-card/40 py-6 backdrop-blur-xl md:flex">
      <Link href="/" aria-label={copy.app.name} className="mb-10">
        <LogoMark className="size-11" />
      </Link>

      <nav aria-label={copy.nav.label} className="flex flex-1 flex-col items-center gap-2">
        {NAV_ITEMS.map(({ href, label, Icon }) => (
          <RailLink key={href} href={href} label={label} active={isActive(pathname, href)}>
            <Icon className="size-5" aria-hidden />
          </RailLink>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-2">
        <RailLink href="/notifications" label={copy.nav.notifications} active={pathname === "/notifications"}>
          <Bell className="size-5" aria-hidden />
        </RailLink>
        <RailLink href="/settings" label={copy.nav.settings} active={pathname === "/settings"}>
          <Settings className="size-5" aria-hidden />
        </RailLink>
      </div>
    </aside>
  );
}

function RailLink({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex w-[4.5rem] flex-col items-center gap-1.5 rounded-2xl py-2.5 text-xs transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      <span
        className={cn(
          "flex h-9 w-12 items-center justify-center rounded-full transition-colors",
          active ? "bg-primary text-primary-foreground" : "group-hover:bg-accent",
        )}
      >
        {children}
      </span>
      {label}
    </Link>
  );
}
