const rawSupabaseUrl = process.env.SUPABASE_URL ?? "";
/** Always HTTPS in production to avoid mixed-content when the URL is used in the browser. */
export const SUPABASE_URL = rawSupabaseUrl.replace(/^http:\/\//i, "https://");
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
export const AUTH_SECRET = process.env.AUTH_SECRET ?? "";