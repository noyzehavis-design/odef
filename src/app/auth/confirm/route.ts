import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { safeNextPath } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

/**
 * Magic link lands here with ?token_hash=...&type=email.
 * Unlike the PKCE ?code= flow, this works even when the link is opened in a
 * different browser than the one that asked for it (Gmail app, iOS PWA).
 * Needs the email template in supabase/templates/magic-link.html.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = (searchParams.get("type") ?? "email") as EmailOtpType;
  const next = safeNextPath(searchParams.get("next"));

  if (!tokenHash) return redirectToLogin(request, "generic");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
  if (error) return redirectToLogin(request, "link_expired");

  if (!isEmailAllowed(data.user?.email)) {
    await supabase.auth.signOut();
    return redirectToLogin(request, "not_allowed");
  }

  return NextResponse.redirect(new URL(next, request.url));
}

function redirectToLogin(request: NextRequest, error: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}
