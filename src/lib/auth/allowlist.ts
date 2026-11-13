// Server-side only: reads a non-public env var (undefined in the browser).
// No "server-only" import because src/proxy.ts uses it too.
/**
 * Only emails in ALLOWED_EMAILS (comma separated, server-only env) can use the app.
 * Checked when sending a magic link, after every sign-in callback, and on
 * every request in src/proxy.ts.
 */
function allowedEmails(): Set<string> {
  return new Set(
    (process.env.ALLOWED_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isEmailAllowed(email: string | null | undefined): boolean {
  if (!email) return false;
  return allowedEmails().has(normalizeEmail(email));
}
