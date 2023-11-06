import axios from "@/lib/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
 
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const res = await axios.post("/api/users/signin", {
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
});

export { handler as GET, handler as POST };
