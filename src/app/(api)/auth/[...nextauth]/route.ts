import NextAuth, { AuthOptions } from "next-auth";
import { authOptions } from "@/app/shared/lib/auth/auth";

const handler = NextAuth(authOptions as unknown as AuthOptions);  

export { handler as GET, handler as POST };