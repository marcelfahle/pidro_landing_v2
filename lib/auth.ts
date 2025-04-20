import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = "https://api.pidro.online";

interface SignInResponse {
  Response: {
    DeviceId: string;
    Error: boolean;
    Message: string;
    RoomId: string;
    Status: number;
    UserId: number;
    access_token: string;
    refresh_token: string;
  };
}

interface UserProfile {
  id: number;
  username: string;
  premium?: boolean;
  avatar_url?: string;
  // Add more fields as needed
}

export async function signIn(username: string, password: string) {
  const formData = new URLSearchParams();
  formData.append("Username", username);
  formData.append("Password", password);
  formData.append("DeviceId", "web-client");

  const response = await fetch(`${API_BASE_URL}/v3/sign_in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  const data: SignInResponse = await response.json();

  if (data.Response.Error) {
    throw new Error(data.Response.Message);
  }

  // Create a new response to set cookies
  const nextResponse = new NextResponse(
    JSON.stringify({
      userId: data.Response.UserId,
      message: "Login successful",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  // Set cookies
  nextResponse.cookies.set({
    name: "access_token",
    value: data.Response.access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  nextResponse.cookies.set({
    name: "refresh_token",
    value: data.Response.refresh_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return {
    userId: data.Response.UserId,
    accessToken: data.Response.access_token,
  };
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return null;
  }

  try {
    // TODO: Update to v3 endpoint when bug is fixed
    const response = await fetch(`${API_BASE_URL}/v2/players/self`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function signOut() {
  const response = new NextResponse(
    JSON.stringify({ message: "Logged out successfully" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  response.cookies.delete("access_token");
  response.cookies.delete("refresh_token");

  return response;
}
