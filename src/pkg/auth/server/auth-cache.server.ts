import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { envServer } from "@/config/env";

import "server-only";

// Node.js-only: uses envServer (JWT_SECRET) and jose — not edge-compatible.
// Do NOT import this file from middleware.ts.
export const getCacheSession = async () => {
  try {
    const cookieStore = await cookies();

    const cacheToken =
      cookieStore.get("better-auth.session_data")?.value ||
      cookieStore.get("__Secure-better-auth.session_data")?.value;

    const secret = new TextEncoder().encode(envServer.JWT_SECRET);
    const { payload } = await jwtVerify(cacheToken || "", secret);

    return payload;
  } catch {
    return { user: null, session: null };
  }
};
