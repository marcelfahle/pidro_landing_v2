import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// Extend the built-in session types
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the
   * `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: {
      id?: string; // Keep ID from token.sub
      accessToken?: string;
    } & DefaultSession["user"]; // Keep default properties
    error?: string;
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   * Also returned by the Credentials provider's `authorize` callback.
   */
  interface User extends DefaultUser {
    // Add properties returned from your authorize callback
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    // Add properties stored in the JWT
    userId?: number; // Optional internal numeric ID
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}
