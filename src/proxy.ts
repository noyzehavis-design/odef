import { type NextRequest, NextResponse } from "next/server";
import { isEmailAllowed } from "@/lib/auth/allowlist";
import { isDemoMode, isSupabaseConfigured } from "@/lib/env";
import { redirectWithCookies, updateSession } from "@/lib/supabase/proxy";

/** Routes that don't need a session. Everything else is private. */
const PUBLIC_PATHS = ["/login", "/auth/"];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p.endsWith("/") ? p : `${p}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Local dev without Supabase: let everything through (mock data only).
  if (isDemoMode) return NextResponse.next();

  // Production without Supabase config: fail closed. Only /login renders,
  // and it explains what's missing.
  if (!isSupabaseConfigured) {
    if (pathname === "/login") return NextResponse.next();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { response, email } = await updateSession(request);

  if (isPublic(pathname)) {
    // Already signed in and allowed: skip the login screen.
    if (pathname === "/login" && email && isEmailAllowed(email)) {
      return redirectWithCookies(response, new URL("/", request.url));
    }
    return response;
  }

  if (!email) {
    const login = new URL("/login", request.url);
    if (pathname !== "/") login.searchParams.set("next", `${pathname}${search}`);
    return redirectWithCookies(response, login);
  }

  if (!isEmailAllowed(email)) {
    // Signed in with an email that isn't on the list: drop the session.
    const login = new URL("/login", request.url);
    login.searchParams.set("error", "not_allowed");
    const redirect = NextResponse.redirect(login);
    request.cookies
      .getAll()
      .filter((c) => c.name.startsWith("sb-"))
      .forEach((c) => redirect.cookies.delete(c.name));
    return redirect;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Everything except static assets and the PWA files, which must load
     * without a session (the browser fetches them without cookies sometimes):
     * _next/static, _next/image, icons/, manifest.webmanifest, serwist/ (the
     * service worker), robots.txt, and image files.
     */
    "/((?!_next/static|_next/image|icons/|manifest.webmanifest|serwist/|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
