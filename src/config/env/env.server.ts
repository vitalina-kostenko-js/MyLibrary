import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    
    JWT_SECRET: z.string().min(32, "JWT_SECRET should be at least 32 characters"),
    AUTH_SECRET: z.string().min(1),
    
    REDIS_URL: z.string().url().optional(),
  },
  

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    REDIS_URL: process.env.REDIS_URL,
  },
  
  emptyStringAsUndefined: true,
});