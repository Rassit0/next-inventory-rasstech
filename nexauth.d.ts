// First, import the types from next-auth
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  // This is your backend user model
  interface User extends DefaultUser {
    id: string;
    full_name: string;
    email: string;
    role: {
      id: number;
      name: string;
      permissions: string[];
    };
    avatar: string | null;
    // NextAuth required fields
    emailVerified: Date | null;
    avatar?: string | null;

    // backend auth data
    access_token: string;
    token_type: string;
    expires_at: number;
  }

  interface Session extends DefaultSession {
    user: User;
    access_token: string;
    token_type: string;
    expires_at: number;
  }
}

import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: import("next-auth").User;
    access_token: string;
    expires_at: number;
  }
}
