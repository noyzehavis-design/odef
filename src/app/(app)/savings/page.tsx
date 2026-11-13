import { PiggyBank } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/app-shell/page-header";
import { EmptyState } from "@/components/empty-state";
import { copy } from "@/lib/copy";

export const metadata: Metadata = { title: copy.savings.title };

export default function SavingsPage() {
  return (
    <>
      <PageHeader title={copy.savings.title} />
      <EmptyState Icon={PiggyBank} title={copy.savings.emptyTitle} body={copy.savings.emptyBody} />
    </>
  );
}
