import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  eyebrow,
  actions,
  className,
}: {
  title: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("flex items-center justify-between gap-4 pb-6", className)}>
      <div className="min-w-0">
        {eyebrow && <p className="mb-0.5 text-sm text-muted-foreground">{eyebrow}</p>}
        <h1 className="truncate text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}
