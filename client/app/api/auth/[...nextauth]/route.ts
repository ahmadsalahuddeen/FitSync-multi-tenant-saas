import axios from "@/lib/axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";




export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        const res = await axios.post("/api/auth/users/signin", {
          email: credentials?.email,
          password: credentials?.password,
        });
        const user = res.data;
        console.log(res.data);

        if (user.status && user) {
          return user;
        }

        return null;
      },
    }),
  ],
};


const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}