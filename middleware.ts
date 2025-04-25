import { auth } from "@/auth"; // Adjust the path if your auth.ts is located elsewhere

// This exports the Auth.js middleware.
// It will automatically protect pages if the session is invalid,
// redirecting to the login page defined in auth.ts (pages: { signIn: '/login' })
// By default, it runs on all paths.
export { auth as middleware } from "@/auth";

// Optional: Use the matcher to apply middleware only to specific paths.
// This can improve performance by avoiding middleware runs on static assets or public pages.
// Only run middleware on paths that potentially require authentication.
// Exclude API routes like token validation which don't rely on user sessions.
// export const config = {
//   matcher: [
//     "/profile/:path*", // Protect the profile page and any sub-paths
//     // Add other protected routes here, e.g., "/dashboard/:path*"
//   ],
// };
