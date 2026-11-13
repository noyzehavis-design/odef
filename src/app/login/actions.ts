"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isEmailAllowed, normalizeEmail } from "@/lib/auth/allowlist";
import { safeNextPath } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export type LoginError = "not_allowed" | "invalid_email" | "bad_code" | "generic" | "not_configured";

export type LoginState =
  | { status: "idle"; email?: string }
  | { status: "sent"; email: string }
  | { status: "error"; error: LoginError; email?: string; sent?: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function siteOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const origin = h.get("origin");
  if (origin) return origin;
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

/** Sends a magic link + 6-digit code, but only to emails on the allowlist. */
export async function sendMagicLink(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isSupabaseConfigured) return { status: "error", error: "not_configured" };

  const email = normalizeEmail(String(formData.get("email") ?? ""));
  if (!EMAIL_RE.test(email)) return { status: "error", error: "invalid_email", email };
  if (!isEmailAllowed(email)) return { status: "error", error: "not_allowed", email };

  const next = safeNextPath(String(formData.get("next") ?? "/"));
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${await siteOrigin()}/auth/confirm?next=${encodeURIComponent(next)}`,
    },
  });
  if (error) return { status: "error", error: "generic", email };

  return { status: "sent", email };
}

/** Signs in with the 6-digit code from the email (handy in the installed iPhone app). */
export async function verifyCode(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isSupabaseConfigured) return { status: "error", error: "not_configured" };

  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const token = String(formData.get("code") ?? "").replace(/\D/g, "");
  const next = safeNextPath(String(formData.get("next") ?? "/"));

  if (!isEmailAllowed(email)) return { status: "error", error: "not_allowed", email };
  if (token.length < 6) return { status: "error", error: "bad_code", email, sent: true };

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error) return { status: "error", error: "bad_code", email, sent: true };

  redirect(next);
}
