import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Define the expected structure STRICTLY based on GET /v3/self response
interface UserData {
  UserId: number;
  Username: string;
  Email?: string;
  premium?: boolean;
  is_premium?: boolean;
  Picture?: string;
  Bio?: string;
  level_progress?: number;
  current_level?: number;
  premium_until?: string;
  TotalGame?: number;
  WinPercent?: number;
  // Add other relevant fields
}

interface SelfProfileApiResponse {
  Response: {
    UserData: UserData;
    Error?: boolean;
    Message?: string;
    Status?: number;
  };
  // No top-level fields expected based on the API spec provided
}

// Define the type for the data structure used by the page component
interface ProfileData {
  UserId: number;
  Username: string;
  is_premium: boolean;
  Picture?: string;
  Bio?: string;
  level_progress?: number;
  current_level?: number;
  premium_until?: string;
  TotalGame?: number;
  WinPercent?: number;
}

async function getProfile(
  accessToken: string | undefined,
): Promise<ProfileData | null> {
  if (!accessToken) {
    console.error("getProfile called without access token");
    return null;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error("Missing API base URL configuration.");
  }

  try {
    console.log(
      "Fetching /v3/self with token:",
      accessToken.substring(0, 20) + "...",
    );
    const response = await fetch(`${apiBaseUrl}/v3/self`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    console.log("Profile API (/v3/self) Response Status:", response.status);

    if (!response.ok) {
      if (response.status === 401) {
        console.error(
          "Profile fetch failed: Unauthorized (401). Token likely expired or invalid.",
        );
        return null;
      }
      const errorText = await response.text();
      console.error(`Profile fetch failed: ${response.status}`, errorText);
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    // Parse with the stricter API response type
    const data: SelfProfileApiResponse = await response.json();
    console.log(
      "Profile API (/v3/self) Response Data:",
      JSON.stringify(data, null, 2),
    );

    if (data.Response?.Error || !data.Response?.UserData) {
      console.error(
        "Profile API returned an error or missing UserData:",
        data.Response?.Message,
      );
      return null;
    }

    // Now we know data.Response.UserData exists and has the UserData type
    const userData = data.Response.UserData;

    // Basic validation on the nested structure
    if (
      typeof userData.UserId !== "number" ||
      typeof userData.Username !== "string"
    ) {
      console.error("Invalid profile data structure in UserData:", userData);
      return null;
    }

    // Map API response to the ProfileData structure for the page
    const isPremium = userData.is_premium ?? userData.premium ?? false;
    const profileData: ProfileData = {
      UserId: userData.UserId,
      Username: userData.Username,
      is_premium: isPremium,
      Picture: userData.Picture,
      Bio: userData.Bio,
      level_progress: userData.level_progress,
      current_level: userData.current_level,
      premium_until: userData.premium_until,
      TotalGame: userData.TotalGame,
      WinPercent: userData.WinPercent,
    };
    return profileData;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

// This is now a Server Component
export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.accessToken) {
    console.log("No active session found, redirecting to login.");
    redirect("/login?callbackUrl=/profile");
  }

  // Fetch profile data using the access token from the session
  const profile = await getProfile(session.user.accessToken);

  if (!profile) {
    console.log("Profile fetch failed, redirecting to login.");
    redirect("/login?error=ProfileFetchFailed");
  }

  // Rest of the component rendering using the 'profile' object (type ProfileData)
  return (
    <div className="max-w-2xl mx-auto pt-12 pb-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#ffe230]">
        Your Profile
      </h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome, {profile.Username}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {profile.Picture && (
              <div className="md:col-span-1 flex flex-col items-center space-y-2">
                <Image
                  src={profile.Picture}
                  alt="Profile Avatar"
                  width={96}
                  height={96}
                  className="rounded-full border-2 border-accent/50 shadow-md"
                />
              </div>
            )}

            <div
              className={`space-y-4 ${profile.Picture ? "md:col-span-2" : "md:col-span-3"}`}
            >
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <label className="text-xs text-gray-400 uppercase">
                    User ID
                  </label>
                  <p className="font-medium text-white">{profile.UserId}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase">
                    Status
                  </label>
                  <p className="font-medium text-white">
                    {profile.is_premium ? (
                      <span className="text-yellow-400 font-bold">
                        Premium Member
                      </span>
                    ) : (
                      "Free Member"
                    )}
                    {profile.is_premium && profile.premium_until && (
                      <span className="text-xs text-gray-400 block mt-1">
                        (expires{" "}
                        {new Date(profile.premium_until).toLocaleDateString()})
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase">
                    Level
                  </label>
                  <p className="font-medium text-white">
                    Level {profile.current_level} (
                    {profile.level_progress !== undefined
                      ? Math.round(profile.level_progress)
                      : "N/A"}
                    %)
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase">
                    Games
                  </label>
                  <p className="font-medium text-white">
                    {profile.TotalGame ?? "N/A"} played (
                    {profile.WinPercent ?? "N/A"}% win)
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <label className="text-xs text-gray-400 uppercase block mb-1">
                Bio
              </label>
              {profile.Bio ? (
                <p className="text-white/90 whitespace-pre-wrap text-sm">
                  {profile.Bio}
                </p>
              ) : (
                <p className="text-gray-500 text-sm italic">No bio set.</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SignOutButton />
        </CardFooter>
      </Card>
    </div>
  );
}
