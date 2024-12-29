import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent")?.toLowerCase();

  if (userAgent?.includes("android")) {
    // Android device - redirect to Play Store
    return NextResponse.redirect(
      "https://play.google.com/store/apps/details?id=com.oneapps.pidro",
    );
  }

  if (userAgent?.includes("iphone") || userAgent?.includes("ipad")) {
    // iOS device - redirect to App Store
    return NextResponse.redirect(
      "https://apps.apple.com/app/pidro/id1137091987",
    );
  }

  // Desktop or unknown - maybe redirect to your website or app stores page
  return NextResponse.redirect("https://pidro.online");
}

export const config = {
  matcher: "/app/:path*", // This will only run the middleware on URLs that start with /app/
};
