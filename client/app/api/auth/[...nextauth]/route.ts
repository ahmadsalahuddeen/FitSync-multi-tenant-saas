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
          })

   
          const user = response?.data;
  
        if(user){

          return user;
        }else {
          throw new Error( JSON.stringify({ errors: response.data.errors, status: false }))
        }
        

      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
