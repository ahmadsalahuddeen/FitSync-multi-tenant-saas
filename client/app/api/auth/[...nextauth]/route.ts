import axios from "@/lib/axios";
import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { toast } from "sonner";

export const authOptions: NextAuthOptions = {
  
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile){
        return ({
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.image
        })
      }
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
    async signIn({user,account, profile }){
if(account?.provider == "credentials"){
  return true
}
if(account?.provider == "google"){
  try {
    const googleAuthData = {
      email: profile?.email,
      image : profile?.image,
name: profile?.name
sf: profile.


    }


  } catch (error) {
    console.log("error in google provider callback nextauth",error)

  }
  
  return true
}
if(account?.provider == "github"){
  try {
    
  } catch (error) {
    console.log("error in github provider callback nextauth",error)

  }
  return true
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
