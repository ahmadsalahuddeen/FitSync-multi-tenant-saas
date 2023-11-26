import axios from "@/lib/axios";
import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { toast } from "sonner";
import { CloudFog } from "lucide-react";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
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
     
    async signIn({ user, account, profile }) {
      
      if (account?.provider == "credentials") {
        return true;
      }

      if (account?.provider === "google" || account?.provider === "github") {


        const email = profile?.email;
        const image = profile?.image;
        const name = profile?.name;

        const response = await axios.post("/api/auth/oauth-signin", {
          email,
          image,
          name,
        });

        if (response.data.error) console.log("errro", response.data.error);
        const userData = response?.data;
        
     
         await  Object.assign(user, userData);
          return true;
        
      }
      
      return false;
    },
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
