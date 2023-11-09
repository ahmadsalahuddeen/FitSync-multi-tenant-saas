import NextAuth from "next-auth/next";

//next-auth session object types
interface Gym {
  gymId: string;
  name: string;
  _id: string;
}
interface User {
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  gyms: Gym[];
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



// type for next-auth jwt token 
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt"{
  interface JWT{
    user: User;
    backendTokens: BackendTokens;
  }
}
