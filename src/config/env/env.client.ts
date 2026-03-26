import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_API_BASE_URL: z
      .string()
      .nonempty({ message: "NEXT_PUBLIC_API_BASE_URL is required" }),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
});
