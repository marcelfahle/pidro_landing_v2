import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    new URL(
      "/login",
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    ),
  );

  // Clear cookies
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");

  return response;
}
