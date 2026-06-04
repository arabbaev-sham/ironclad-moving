import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
// Supports both old anon key name and new publishable key name
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

function isValidUrl(url: string) {
  try {
    new URL(url);
    return url.startsWith("https://") || url.startsWith("http://");
  } catch {
    return false;
  }
}

const configured = isValidUrl(supabaseUrl) && supabaseKey.length > 10;

export const supabase = configured
  ? createSupabaseClient(supabaseUrl, supabaseKey)
  : createSupabaseClient("https://placeholder.supabase.co", "placeholder_key_padding_padding_padding_padding");

export const supabaseAdmin = configured && serviceRoleKey.length > 10
  ? createSupabaseClient(supabaseUrl, serviceRoleKey)
  : supabase;

export { configured as supabaseConfigured };
