import NextAuth from "next-auth/next";

//next-auth session object types


export interface User   {
  accountId: string;
  email: string;
  name: string;
  image?: string,
  role: string;
  gyms?: string[];
  id: string;
}

interface BackendTokens {
  accessToken: string;
  refreshToken: string;
}
interface Session {
  user: User;
  backendTokens: BackendTokens;
}


// type for next-auth session
declare module "next-auth" {
  interface Session {
    user: User;
    backendTokens: BackendTokens;
  }
}



// type for next-auth jwt token paylaod
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt"{
  interface JWT{
    user: User;
    backendTokens: BackendTokens;
  }
}

