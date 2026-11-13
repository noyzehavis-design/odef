import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * Temporary mark until the real logo lands in public/icons.
 * Two coins: the big one is the month, the small mint one is what's left over (עודף).
 * Keep in sync with public/icons/icon.svg.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-10 shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id="odef-mark-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9384FF" />
          <stop offset="1" stopColor="#5B49F0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#odef-mark-bg)" />
      <circle cx="35" cy="35" r="14.5" fill="none" stroke="#fff" strokeWidth="5" />
      <circle cx="20" cy="20" r="7.5" fill="#3EE0A8" stroke="url(#odef-mark-bg)" strokeWidth="3" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-9" />
      <span className="text-xl font-semibold tracking-tight">{copy.app.name}</span>
    </span>
  );
}
