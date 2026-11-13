import { type NextRequest, NextResponse } from "next/server";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { safeNextPath } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

/** OAuth (Google) lands here with ?code=..., which we swap for a session. */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"));

  if (!code) return redirectToLogin(request, "generic");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
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
