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


declare module "next-auth"{ 
  interface Session {
    user: User;
    backendTokens: BackendTokens;
  }
  }
