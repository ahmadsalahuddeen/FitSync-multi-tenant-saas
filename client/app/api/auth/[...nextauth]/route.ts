import axios from "@/lib/axios";
import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "sonner";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        const response = await axios.post("/api/auth/users/signin", {
          email: credentials?.email,
          password: credentials?.password,
        });

        const user = response?.data;

        if (user) {
          return user;
        } else {
          throw new Error(
            JSON.stringify({ errors: response.data.errors, status: false }),
          );
        }
      },
    }),
  ],

  callbacks: {
    //callback to return both session and token with typsafe 
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
