import type { Metadata } from "next";
import { PageHeader } from "@/components/app-shell/page-header";
import { ThemeToggle } from "@/components/theme-toggle";
import { requireUser } from "@/lib/auth/session";
import { copy } from "@/lib/copy";
import { SignOutButton } from "./sign-out-button";

export const metadata: Metadata = { title: copy.settings.title };

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <>
      <PageHeader title={copy.settings.title} />
      <div className="grid gap-4 md:max-w-xl">
        <section className="rounded-3xl border bg-card p-5">
          <h2 className="mb-1 text-sm text-muted-foreground">{copy.settings.account}</h2>
          <p className="font-medium">
            {user.isDemo ? (
              copy.settings.demoUser
            ) : (
              <>
                {copy.settings.signedInAs}{" "}
                <span dir="ltr" className="inline-block">
                  {user.email}
                </span>
              </>
            )}
          </p>
          {!user.isDemo && <SignOutButton className="mt-4" />}
        </section>

        <section className="rounded-3xl border bg-card p-5">
          <h2 className="mb-3 text-sm text-muted-foreground">{copy.settings.theme}</h2>
          <ThemeToggle />
        </section>

        <p className="px-1 text-xs text-muted-foreground">
          {copy.app.nameEn} · {copy.settings.version} <span dir="ltr">{process.env.NEXT_PUBLIC_APP_VERSION ?? "0.1.0"}</span>
        </p>
      </div>
    </>
  );
}
