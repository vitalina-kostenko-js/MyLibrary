import { getServerSession } from "next-auth";

import { authOptions } from "@/app/shared/lib/auth/auth";

export const authServer = {
  getSession: () => getServerSession(authOptions),
};
