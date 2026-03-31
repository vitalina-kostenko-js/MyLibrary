import { headers } from "next/headers";

import { envClient } from "@/config/env";

// auth server (edge-safe: no server-only, no Node.js-only imports)
export const authServer = {
  getSession: async () => {
    try {
      const response = await fetch(
        `${envClient.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/get-session`,
        {
          headers: await headers(),
        },
      );

      return await response.json();
    } catch {
      return { user: null, session: null };
    }
  },
};
