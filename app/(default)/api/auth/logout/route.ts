import { NextResponse } from "next/server";

export async function POST() {
  const response = new NextResponse(
    JSON.stringify({ message: "Logged out successfully" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  // Clear cookies
  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");

  return response;
}
