import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/brand/logo-mark";
import { safeNextPath } from "@/lib/auth/session";
import { copy } from "@/lib/copy";
import { isDemoMode, isSupabaseConfigured } from "@/lib/env";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: copy.login.pageTitle };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const next = safeNextPath(typeof params.next === "string" ? params.next : null);
  const error = typeof params.error === "string" ? params.error : undefined;

  return (
    <main className="pt-safe pb-safe relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-10">
      {/* Soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center text-center">
          <LogoMark className="mb-5 size-16 drop-shadow-[0_12px_32px_rgb(124_108_255/0.45)]" />
          <h1 className="text-5xl font-light tracking-tight">{copy.app.name}</h1>
          <p className="mt-3 text-muted-foreground">{copy.app.tagline}</p>
        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-[0_1px_0_rgb(255_255_255/0.04)_inset]">
          {isDemoMode ? (
            <div className="space-y-3 text-center">
              <p className="text-sm text-muted-foreground">{copy.demo.hint}</p>
              <Link href="/" className="font-medium text-primary underline-offset-4 hover:underline">
                {copy.nav.home}
              </Link>
            </div>
          ) : !isSupabaseConfigured ? (
            <p role="alert" className="text-center text-sm text-danger">
              {copy.login.errors.notConfigured}
            </p>
          ) : (
            <>
              <div className="mb-5 space-y-1">
                <h2 className="text-lg font-medium">{copy.login.title}</h2>
                <p className="text-sm text-muted-foreground">{copy.login.subtitle}</p>
              </div>
              <LoginForm next={next} initialError={error} />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
