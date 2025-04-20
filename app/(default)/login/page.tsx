import { signIn } from "@/auth"; // Assuming signIn is exported from here
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import LoginForm from "./LoginForm"; // Import the new client component

import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define error messages for known error codes
const errorMessages: { [key: string]: string } = {
  CredentialsSignin: "Invalid username or password. Please try again.",
  AuthenticationError: "Authentication failed. Please check logs.", // Added more specific error
  UnknownError: "An unexpected error occurred during login.",
  MissingCredentials: "Please enter both username and password.", // Added
  // Add other specific error codes from NextAuth if needed
};

// Define success messages
const successMessages: { [key: string]: string } = {
  password_reset_success:
    "Password reset successful! You can now log in with your new password.",
};

export default async function LoginPage({
  searchParams,
}: {
  // Update the type to be a Promise wrapping the object
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await the searchParams promise before accessing it
  const resolvedSearchParams = await searchParams;
  const errorKey = resolvedSearchParams?.error as string | undefined;
  const messageKey = resolvedSearchParams?.message as string | undefined; // Read message key

  // Determine which message to display (prioritize error?)
  const displayError = errorKey
    ? errorMessages[errorKey] || errorMessages.UnknownError
    : undefined;
  const displayMessage =
    !displayError && messageKey ? successMessages[messageKey] : undefined; // Show message only if no error

  async function loginAction(formData: FormData) {
    "use server"; // Mark this as a Server Action

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      // Basic validation, though HTML 'required' should handle most cases
      redirect("/login?error=MissingCredentials"); // Use specific error key
      return;
    }

    try {
      // Attempt sign in using server-side signIn
      await signIn("credentials", {
        username,
        password,
        redirectTo: "/profile", // Specify the redirect path on success
      });
      // If signIn doesn't throw and doesn't redirect automatically (depends on config),
      // redirect manually. However, `redirectTo` should handle this.
      // redirect('/profile'); // Usually not needed if redirectTo is set
    } catch (error) {
      // If it's an AuthError, handle specific cases and redirect
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return redirect("/login?error=CredentialsSignin");
          // Add cases for other specific AuthErrors you want to handle differently
          default:
            console.error("Unhandled Authentication Error:", error);
            return redirect("/login?error=AuthenticationError"); // Generic auth error
        }
      }

      // If it's the special redirect error, re-throw it so Next.js handles it
      if ((error as any)?.digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
      }

      // Otherwise, it's an unexpected server error
      console.error("Unexpected Login Action Error:", error);
      // Redirect to login with a generic unknown error
      redirect("/login?error=UnknownError");
    }
  }

  return (
    <div className="flex flex-col items-center max-w-xs mx-auto pt-24 pb-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#ffe230]">
        Player Sign In
      </h1>

      {/* Display Success Message if present */}
      {displayMessage && (
        <p className="text-green-400 text-sm font-medium mb-4 text-center">
          {displayMessage}
        </p>
      )}

      {/* Render the LoginForm client component, pass the error message */}
      {/* Note: We display the error inside the LoginForm now */}
      <LoginForm loginAction={loginAction} errorMessage={displayError} />
    </div>
  );
}
