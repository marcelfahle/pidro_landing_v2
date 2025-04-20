import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    // Replace with the URL of your Elixir/Phoenix endpoint for password reset
    const backendUrl = "https://api.pidro.online/v2/set_new_password";

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    if (response.ok) {
      // Password reset successful
      return NextResponse.json({ message: "Password successfully reset." });
    } else {
      // Backend responded with an error
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || "Error resetting password." },
        { status: response.status },
      );
    }
  } catch (error) {
    // Server error
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
