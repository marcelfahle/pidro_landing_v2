export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/((?!j(?:/|$)|play(?:/|$)|app(?:/|$)|get(?:/|$)|\\.well-known(?:/|$)|apple-app-site-association(?:/|$)|_next/static|_next/image|favicon\\.ico$).*)",
  ],
};
