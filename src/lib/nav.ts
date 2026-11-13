import { ChartColumn, House, PiggyBank, ReceiptText, type LucideIcon } from "lucide-react";
import { copy } from "@/lib/copy";

export type NavItem = {
  href: "/" | "/transactions" | "/insights" | "/savings";
  label: string;
  Icon: LucideIcon;
};

/** The four tabs. Order is right to left. Don't add a fifth (SPEC: "לא נוסף אף טאב"). */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: copy.nav.home, Icon: House },
  { href: "/transactions", label: copy.nav.transactions, Icon: ReceiptText },
  { href: "/insights", label: copy.nav.insights, Icon: ChartColumn },
  { href: "/savings", label: copy.nav.savings, Icon: PiggyBank },
];

export function isActive(pathname: string, href: NavItem["href"]) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
