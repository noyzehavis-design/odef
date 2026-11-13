import { ReceiptText } from "lucide-react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/app-shell/page-header";
import { EmptyState } from "@/components/empty-state";
import { copy } from "@/lib/copy";

export const metadata: Metadata = { title: copy.transactions.title };

export default function TransactionsPage() {
  return (
    <>
      <PageHeader title={copy.transactions.title} />
      <EmptyState Icon={ReceiptText} title={copy.transactions.emptyTitle} body={copy.transactions.emptyBody} />
    </>
  );
}
