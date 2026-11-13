import { Wallet } from "lucide-react";
import { HomeActions } from "@/components/app-shell/home-actions";
import { PageHeader } from "@/components/app-shell/page-header";
import { EmptyState } from "@/components/empty-state";
import { requireUser } from "@/lib/auth/session";
import { copy } from "@/lib/copy";

export default async function HomePage() {
  const user = await requireUser();

  return (
    <>
      <PageHeader eyebrow={copy.home.greeting} title={copy.home.title} actions={<HomeActions email={user.email} />} />
      <EmptyState Icon={Wallet} title={copy.home.emptyTitle} body={copy.home.emptyBody} />
    </>
  );
}
