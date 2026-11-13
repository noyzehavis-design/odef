import { BellRing } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/app-shell/page-header";
import { EmptyState } from "@/components/empty-state";
import { copy } from "@/lib/copy";

export const metadata: Metadata = { title: copy.notifications.title };

export default function NotificationsPage() {
  return (
    <>
      <PageHeader title={copy.notifications.title} />
      <EmptyState Icon={BellRing} title={copy.notifications.emptyTitle} body={copy.notifications.emptyBody} />
    </>
  );
}
