import { createClient } from "@supabase/supabase-js";
import { envServer } from "@/config/env";

const supabaseOptions = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
};

// Anon-key client — used for user-facing auth (signInWithPassword)
export const supabaseAuth = createClient(
  envServer.SUPABASE_URL,
  envServer.SUPABASE_ANON_KEY,
  supabaseOptions,
);

// Service-role client — used for admin operations (createUser, etc.)
export const supabaseServer = createClient(
  envServer.SUPABASE_URL,
  envServer.SUPABASE_SERVICE_ROLE_KEY,
  supabaseOptions,
);