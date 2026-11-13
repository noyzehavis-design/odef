import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  Icon,
  title,
  body,
  className,
}: {
  Icon: LucideIcon;
  title: string;
  body?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex animate-fade-up flex-col items-center rounded-3xl border border-dashed bg-card/50 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="mb-5 flex size-16 animate-float items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
        <Icon className="size-7" strokeWidth={1.75} aria-hidden />
      </div>
      <h2 className="text-lg font-medium">{title}</h2>
      {body && <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">{body}</p>}
    </div>
  );
}
