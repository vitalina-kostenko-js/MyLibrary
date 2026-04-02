import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import { envServer } from "@/config/env";

import "server-only";

export const getCacheSession = async () => {
  try {
    const cookieStore = await cookies();

    const cacheToken =
      cookieStore.get("better-auth.session_data")?.value ||
      cookieStore.get("__Secure-better-auth.session_data")?.value;

    if (!cacheToken) {
      return { user: null, session: null };
    }

    const secret = new TextEncoder().encode(envServer.JWT_SECRET);
    const { payload } = await jwtVerify(cacheToken, secret);

    return payload;
  } catch (error) {
    console.error("[getCacheSession] session token verify failed:", error);
    return { user: null, session: null };
  }
};
