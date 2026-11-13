import { type FormatILSOptions, formatILS } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Every amount in the app goes through this: LTR island inside the RTL page,
 * fixed-width digits so columns line up and counters don't jitter.
 */
export function Amount({
  value,
  className,
  ...options
}: { value: number; className?: string } & FormatILSOptions) {
  return (
    <span dir="ltr" className={cn("inline-block tabular-nums", className)}>
      {formatILS(value, options)}
    </span>
  );
}
