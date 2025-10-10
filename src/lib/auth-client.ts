import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Use relative URL to avoid CORS issues with www subdomain
  baseURL: process.env.NODE_ENV === "production"
    ? "" // Empty string = same domain as browser
    : "http://localhost:3000",
});

export const { signIn, signOut, signUp, useSession } = authClient;

