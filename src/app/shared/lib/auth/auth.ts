import NextAuth from "next-auth";
import type { AuthOptions, SessionStrategy } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { supabaseAuth } from "../supabase/client";

const authOptions = {
  basePath: "/entities/api/auth",
  secret:
    process.env.AUTH_SECRET ||
    (process.env.NODE_ENV === "development"
      ? "dev-secret-at-least-32-chars-long"
      : undefined),
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { data, error } = await supabaseAuth.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error) {
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email ?? undefined,
          name: data.user.user_metadata?.name ?? data.user.email ?? undefined,
          image: data.user.user_metadata?.avatar_url,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }: { token: { id?: string; email?: string; name?: string; picture?: string }; user?: { id: string; email?: string | null; name?: string | null; image?: string | null } }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? undefined;
        token.name = user.name ?? undefined;
        token.picture = user.image ?? undefined;
      }
      return token;
    },
    session(
      {
        session,
        token,
      }: {
        session: { user?: { id?: string; email?: string | null; name?: string | null; image?: string | null } };
        token: { id?: string; email?: string; name?: string; picture?: string };
      }
    ) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions as unknown as AuthOptions);

export { handler, authOptions };
