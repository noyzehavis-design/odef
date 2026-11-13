import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabasePublishableKey, supabaseUrl } from "@/lib/env";

/**
 * Refreshes the Supabase session cookie on every request and returns the
 * signed-in user's email (verified JWT claims), or null.
 *
 * Follows the @supabase/ssr pattern: don't run code between createServerClient
 * and getClaims(), and always return the `response` built here (or copy its
 * cookies), otherwise sessions get logged out at random.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const email = typeof data?.claims?.email === "string" ? data.claims.email : null;

  return { response, email };
}

/** Redirect while keeping any refreshed session cookies. */
export function redirectWithCookies(from: NextResponse, url: URL) {
  const redirect = NextResponse.redirect(url);
  from.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
  return redirect;
}
