import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function isSupabaseConfigured() {
  return Boolean(url && anon && !url.includes("your-project"));
}

export function createClient() {
  if (!isSupabaseConfigured()) return null;
  return createBrowserClient(url, anon);
}
