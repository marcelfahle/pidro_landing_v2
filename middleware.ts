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
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes - except our validation one for now)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - /reset-password (the public page itself)
    // - /api/validate-reset-token (the specific API route)
    "/((?!api/validate-reset-token|_next/static|_next/image|favicon.ico|reset-password).*)",
    // Include specific API routes if they NEED auth, e.g.:
    // '/api/protected-route',
  ],
};
