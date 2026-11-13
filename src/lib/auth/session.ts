import "server-only";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { cache } from "react";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { isDemoMode, isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export type SessionUser = {
  email: string;
  isDemo: boolean;
};

const DEMO_USER: SessionUser = { email: "demo@odef.app", isDemo: true };

/**
 * The signed-in user, verified (JWT claims checked by Supabase) and on the
 * allowlist. Null otherwise. Deduplicated per request.
 *
 * This is the data access layer's entry point: every server function that
 * reads household data must call requireUser() itself, not rely on the proxy.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  // Always per request: never prerender a signed-in (or redirect) screen at build time.
  await connection();
  if (isDemoMode) return DEMO_USER;
  if (!isSupabaseConfigured) return null;

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email = data?.claims?.email;
  if (typeof email !== "string" || !isEmailAllowed(email)) return null;

  return { email, isDemo: false };
});

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/** Only allow same-site relative paths as a post-login destination. */
export function safeNextPath(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return "/";
  return next;
}
