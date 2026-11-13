/**
 * Public env (safe in the browser). Server-only secrets live in
 * src/lib/auth/allowlist.ts and future server modules, never here.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

/**
 * Demo mode: local development without Supabase. Auth is skipped so the UI
 * can be built on mock data. Never active in production builds: there,
 * missing Supabase config means nobody gets in.
 */
export const isDemoMode = !isSupabaseConfigured && process.env.NODE_ENV !== "production";
