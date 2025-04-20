"use client";

import Link from "next/link";
import SubmitButton from "../reset-password/SubmitButton"; // Adjust path if SubmitButton moved

interface LoginFormProps {
  loginAction: (formData: FormData) => Promise<void>;
  errorMessage?: string;
}

export default function LoginForm({
  loginAction,
  errorMessage,
}: LoginFormProps) {
  // useFormStatus is used within the SubmitButton component

  return (
    <form action={loginAction} className="space-y-5 w-full">
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
          name="username" // Name attribute is crucial for FormData
          required
          autoComplete="username"
          className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-sm shadow-sm placeholder-gray-400 text-white
            focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          aria-describedby={errorMessage ? "error-message" : undefined}
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
          name="password" // Name attribute is crucial for FormData
          required
          autoComplete="current-password"
          className="mt-1 block w-full px-3 py-2 bg-white/5 border border-white/20 rounded-md text-sm shadow-sm placeholder-gray-400 text-white
            focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          aria-describedby={errorMessage ? "error-message" : undefined}
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

      {/* Display error based on props passed from parent Server Component */}
      {errorMessage && (
        <p id="error-message" className="text-red-400 text-sm font-medium pt-1">
          {errorMessage}
        </p>
      )}

      {/* Use the SubmitButton which internally uses useFormStatus */}
      <SubmitButton className="w-full mt-2">Sign In</SubmitButton>
    </form>
  );
}
