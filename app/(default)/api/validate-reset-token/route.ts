import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // Replace with the URL of your Elixir/Phoenix endpoint for token validation
    const backendUrl = "https://api.pidro.online/v2/validate_reset_token";

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false });
    }
  } catch (error) {
    console.error("Error validating token:", error);
    return NextResponse.json({ valid: false });
  }
}
