import { Bell } from "lucide-react";
import Link from "next/link";
import { copy } from "@/lib/copy";

/** Bell + avatar at the top of the home screen (avatar leads to settings). */
export function HomeActions({ email }: { email: string }) {
  const initial = email.trim().charAt(0).toUpperCase() || "?";
  return (
    <>
      <Link
        href="/notifications"
        aria-label={copy.notifications.open}
        className="flex size-11 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:text-foreground"
      >
        <Bell className="size-5" aria-hidden />
      </Link>
      <Link
        href="/settings"
        aria-label={copy.settings.open}
        className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-cat-7 text-base font-semibold text-primary-foreground"
      >
        {initial}
      </Link>
    </>
  );
}
