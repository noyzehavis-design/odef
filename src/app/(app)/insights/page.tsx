import { ChartColumn } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/app-shell/page-header";
import { EmptyState } from "@/components/empty-state";
import { copy } from "@/lib/copy";

export const metadata: Metadata = { title: copy.insights.title };

export default function InsightsPage() {
  return (
    <>
      <PageHeader title={copy.insights.title} />
      <EmptyState Icon={ChartColumn} title={copy.insights.emptyTitle} body={copy.insights.emptyBody} />
    </>
  );
}
