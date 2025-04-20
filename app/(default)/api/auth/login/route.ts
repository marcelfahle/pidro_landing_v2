import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = "https://api.pidro.online";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 },
      );
    }

    const apiFormData = new URLSearchParams();
    apiFormData.append("Username", username.toString());
    apiFormData.append("Password", password.toString());
    apiFormData.append("DeviceId", "web-client");

    console.log("Attempting login for user:", username);

    const apiResponse = await fetch(`${API_BASE_URL}/v3/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: apiFormData.toString(),
    });

    const data = await apiResponse.json();
    console.log("Login API Response:", {
      status: apiResponse.status,
      error: data.Response.Error,
      message: data.Response.Message,
      userId: data.Response.UserId,
      tokenPreview: data.Response.access_token?.substring(0, 20) + "...",
    });

    if (!apiResponse.ok || data.Response.Error) {
      return NextResponse.json(
        { message: data.Response.Message || "Authentication failed" },
        { status: 401 },
      );
    }

    // Create response with cookies
    const response = NextResponse.json({
      userId: data.Response.UserId,
      message: "Login successful",
    });

    // Set cookies
    response.cookies.set({
      name: "access_token",
      value: data.Response.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    response.cookies.set({
      name: "refresh_token",
      value: data.Response.refresh_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // Store user ID in a cookie for profile fetching
    response.cookies.set({
      name: "user_id",
      value: data.Response.UserId.toString(),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    console.log("Login successful, cookies set");
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 },
    );
  }
}
