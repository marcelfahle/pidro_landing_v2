"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const initialError = searchParams.get("error");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError || "");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: username,
        password: password,
        callbackUrl: callbackUrl,
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError("Invalid username or password. Please try again.");
        } else {
          setError(result.error || "Login failed with an unknown error.");
        }
        setIsLoading(false);
      } else if (result?.ok) {
        console.log("Sign-in successful, redirecting...");
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError("An unexpected error occurred during login.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login Submit Error:", err);
      setError("An unexpected error occurred. Please try again later.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center max-w-xs mx-auto pt-24 pb-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#ffe230]">
        Player Sign In
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-sm shadow-sm placeholder-gray-400 text-white
              focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            aria-describedby={error ? "error-message" : undefined}
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-sm shadow-sm placeholder-gray-400 text-white
              focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            aria-describedby={error ? "error-message" : undefined}
            disabled={isLoading}
          />
          <div className="text-right">
            <Link
              href="/reset-password"
              className="text-xs text-gray-400 hover:text-accent hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {error && (
          <p
            id="error-message"
            className="text-red-400 text-sm font-medium pt-1"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="glass"
          size="lg"
          className="w-full mt-2"
          loading={isLoading}
          disabled={isLoading}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
