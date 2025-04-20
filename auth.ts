import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

// Helper function to decode JWT expiry
function parseJwt(token: string): { exp?: number; [key: string]: any } {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch (e) {
    console.error("Error parsing JWT:", e);
    return {};
  }
}

// Helper function to refresh access token - Use base JWT type
async function refreshAccessToken(token: JWT): Promise<JWT> {
  console.log("Attempting to refresh access token for user:", token.sub);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // Access custom properties carefully, checking existence if needed
  const currentRefreshToken = token.refreshToken as string | undefined;
  if (!apiBaseUrl || !currentRefreshToken) {
    console.error("Missing API base URL or refresh token for refresh attempt.");
    return { ...token, error: "RefreshConfigurationError" };
  }

  try {
    const response = await fetch(`${apiBaseUrl}/v3/token/renew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token: currentRefreshToken }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      console.error(
        "Failed to refresh access token, API response:",
        refreshedTokens,
      );
      throw new Error(refreshedTokens.message || "Refresh Token Error");
    }

    console.log("Access token refreshed successfully.");

    const newAccessToken =
      refreshedTokens.Response?.access_token || refreshedTokens.access_token;
    const newRefreshToken =
      refreshedTokens.Response?.refresh_token || refreshedTokens.refresh_token;
    const newExpiryTimestamp =
      refreshedTokens.Response?.token_expiry || refreshedTokens.token_expiry;

    if (!newAccessToken) {
      console.error("Refreshed token response missing access_token");
      throw new Error("Invalid refresh token response");
    }

    let newExpirySeconds: number | undefined;
    if (typeof newExpiryTimestamp === "number") {
      newExpirySeconds = newExpiryTimestamp;
    } else {
      const decoded = parseJwt(newAccessToken);
      newExpirySeconds = decoded.exp;
    }

    // Return updated JWT object - types should align with augmented JWT
    return {
      ...token,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken ?? currentRefreshToken,
      accessTokenExpires: newExpirySeconds,
      error: undefined,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
      accessTokenExpires: undefined,
    };
  }
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL environment variable");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "YourUsername",
        },
        password: { label: "Password", type: "password" },
      },
      // Use base User type - augmentation should apply
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password");
        }
        const username = String(credentials.username);
        const password = String(credentials.password);

        const fetchUrl = `${apiBaseUrl}/api/portal/sign_in`; // Define URL for logging
        console.log("Attempting portal sign-in for:", username);
        console.log("Fetching URL:", fetchUrl); // Log the exact URL

        try {
          const response = await fetch(fetchUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              Username: username,
              Password: password,
            }),
          });

          // Log raw response text for debugging
          const responseText = await response.text();
          console.log("API Response Status:", response.status);
          console.log(
            "API Response Headers:",
            Object.fromEntries(response.headers.entries()),
          );
          console.log("API Raw Response Text:", responseText);

          // Check content type before attempting JSON parse
          const contentType = response.headers.get("content-type");
          let data: any;
          if (contentType && contentType.includes("application/json")) {
            try {
              data = JSON.parse(responseText); // Parse the text we already read
              console.log("Portal sign-in API Parsed JSON:", data);
            } catch (jsonError) {
              console.error("Failed to parse API response as JSON:", jsonError);
              console.error("Raw text was:", responseText); // Log raw text again on JSON error
              throw new Error("API did not return valid JSON.");
            }
          } else {
            // Handle non-JSON responses (like HTML error pages)
            console.error(
              "API did not return JSON. Content-Type:",
              contentType,
            );
            // Provide a more specific error based on status if possible
            const statusMessage = `API returned status ${response.status} with non-JSON response.`;
            throw new Error(statusMessage);
          }

          // Existing checks on parsed data
          if (!response.ok || data.error || !data.data?.user_id) {
            const errorMessage = data.message || "Authentication failed";
            console.error("Portal sign-in failed (logic check):", errorMessage);
            // throw new Error(errorMessage);
            return null; // Return null for credential errors, NextAuth will handle it
          }

          console.log("Portal sign-in successful for user:", data.data.user_id);

          let accessTokenExpires: number | undefined;
          if (data.data.access_token) {
            const decoded = parseJwt(data.data.access_token);
            accessTokenExpires = decoded.exp;
          }

          const user: User = {
            id: String(data.data.user_id),
            name: username,
            email: null,
            image: null,
            accessToken: data.data.access_token,
            refreshToken: data.data.refresh_token,
            accessTokenExpires: accessTokenExpires,
          };
          return user;
        } catch (error: any) {
          // Catch fetch errors or errors thrown from response handling
          console.error("Error within authorize function catch block:", error);
          if (error instanceof Error) {
            throw error; // Re-throw known errors
          } else {
            throw new Error(
              "An unexpected error occurred during authorization.",
            );
          }
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Use base JWT and User types - augmentation should apply
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      // Initial sign in
      if (user) {
        console.log("JWT callback: Initial sign-in for user", user.id);
        // Assign properties from augmented User to augmented JWT
        token.sub = user.id;
        token.userId = user.id ? Number(user.id) : undefined;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
      }

      // Check if token needs refresh
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const expires = token.accessTokenExpires as number | undefined;
      if (expires && nowInSeconds > expires - 60) {
        console.log(
          "Access token expired or nearing expiry, attempting refresh...",
        );
        return refreshAccessToken(token);
      }

      console.log("Access token is valid.");
      return token;
    },

    // Use base Session and JWT types - augmentation should apply
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      console.log(
        "Session callback: Populating session using token sub:",
        token.sub,
      );

      // Assign properties from augmented JWT to augmented Session
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.accessToken = token.accessToken as string | undefined;
      }

      if (token.error) {
        session.error = token.error as string | undefined;
        console.warn("Session callback: Token has error:", token.error);
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
});
