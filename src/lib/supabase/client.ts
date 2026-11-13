import { createBrowserClient } from "@supabase/ssr";
import { supabasePublishableKey, supabaseUrl } from "@/lib/env";

/** Supabase client for Client Components. Uses the publishable key only. */
export function createClient() {
  return createBrowserClient(supabaseUrl, supabasePublishableKey);
}
