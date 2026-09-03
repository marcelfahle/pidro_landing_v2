export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/((?!j(?:/|$)|\\.well-known(?:/|$)|apple-app-site-association(?:/|$)|_next/static|_next/image|favicon\\.ico$).*)",
  ],
};
