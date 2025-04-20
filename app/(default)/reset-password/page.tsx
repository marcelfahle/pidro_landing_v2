"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for view mode: 'email' or 'password'
  const [viewMode, setViewMode] = useState<"email" | "password">("email");

  // State for the token itself
  const [token, setToken] = useState<string | null>(null);

  // State specifically for the email form
  const [email, setEmail] = useState<string>("");
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const [emailMessage, setEmailMessage] = useState<string>(""); // Separate message for email form
  const [emailMessageType, setEmailMessageType] = useState<
    "error" | "success" | "info"
  >("info");

  // State specifically for the password form
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordLoading, setIsPasswordLoading] = useState<boolean>(false);
  const [passwordMessage, setPasswordMessage] = useState<string>(""); // Separate message for password form
  const [passwordMessageType, setPasswordMessageType] = useState<
    "error" | "success" | "info"
  >("info");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]); // For inline password validation

  // General state
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null); // null initially, true/false after check
  const [initialCheckLoading, setInitialCheckLoading] = useState<boolean>(true); // Loading for initial token check
  const [tokenErrorMessage, setTokenErrorMessage] = useState<string>(""); // Error specifically from invalid token

  useEffect(() => {
    if (!searchParams) return;

    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      validateToken(tokenParam); // This will set viewMode and isValidToken
    } else {
      // No token found, show email form
      setViewMode("email");
      setIsValidToken(null); // No token to be valid/invalid
      setInitialCheckLoading(false);
    }
  }, [searchParams]);

  const validateToken = async (tokenToValidate: string) => {
    setInitialCheckLoading(true);
    setTokenErrorMessage(""); // Clear previous token error
    try {
      const response = await fetch("/api/validate-reset-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenToValidate }),
      });
      const data = await response.json();
      if (data.valid) {
        setIsValidToken(true);
        setViewMode("password"); // Token valid, show password form
      } else {
        setIsValidToken(false);
        setViewMode("email"); // Token invalid, show email form
        setTokenErrorMessage(
          "This password reset link is invalid or has expired. Please request a new one below.",
        );
      }
    } catch (error) {
      console.error("Token validation error:", error);
      setIsValidToken(false);
      setViewMode("email"); // Network or other error, show email form
      setTokenErrorMessage(
        "Could not validate the reset link. Please try again.",
      );
    }
    setInitialCheckLoading(false);
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }
    // Add more rules if needed
    return errors;
  };

  // Renamed handleSubmit to handlePasswordSubmit
  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordMessage(""); // Clear previous password message
    setPasswordErrors([]);

    const validationErrors = validatePassword(newPassword);
    if (validationErrors.length > 0) {
      setPasswordErrors(validationErrors);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage("Passwords do not match.");
      setPasswordMessageType("error");
      return;
    }

    if (!token) {
      setPasswordMessage("Missing reset token."); // Should not happen if viewMode is 'password'
      setPasswordMessageType("error");
      return;
    }

    setIsPasswordLoading(true);
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordMessage(
          "Password reset successful! You can now log in with your new password.",
        );
        setPasswordMessageType("success");
        // Consider redirecting or disabling the form further
      } else {
        setPasswordMessage(
          data.message || "Error resetting password. Please try again.",
        );
        setPasswordMessageType("error");
      }
    } catch (error) {
      console.error("Password reset submit error:", error);
      setPasswordMessage(
        "An unexpected error occurred. Please try again later.",
      );
      setPasswordMessageType("error");
    }
    setIsPasswordLoading(false);
  };

  // ADD NEW HANDLER for Email Form Submission
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEmailMessage("");
    if (!email) {
      setEmailMessage("Please enter your email address.");
      setEmailMessageType("error");
      return;
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      setEmailMessage("API configuration error. Please contact support.");
      setEmailMessageType("error");
      console.error("Missing NEXT_PUBLIC_API_BASE_URL");
      return;
    }

    setIsEmailLoading(true);
    try {
      // Construct the GET request URL with email as query parameter
      const url = `${apiBaseUrl}/v3/reset_password?Email=${encodeURIComponent(email)}`;
      console.log("Requesting password reset:", url); // Log the request URL

      const response = await fetch(url, { method: "GET" });

      console.log("Request Password Reset API Status:", response.status);

      // The API might return 400 for email not found, but we treat it as success for security
      // Or handle it based on actual API behavior if needed
      if (response.ok) {
        // Even if response.ok is true, parse to potentially get the specific message
        try {
          const data = await response.json();
          console.log("Request Password Reset Success Data:", data);
          // Use the specific success message from API if available, otherwise generic
          setEmailMessage(
            data?.Response?.Message ||
              "If an account exists for this email, a password reset link has been sent.",
          );
        } catch (parseError) {
          console.error("Error parsing success response:", parseError);
          setEmailMessage(
            "If an account exists for this email, a password reset link has been sent.",
          );
        }
        setEmailMessageType("success");
        setEmail(""); // Clear email field on success
      } else {
        // Handle specific errors like 400 (Email not found) or others
        let errorMessage = "Failed to send reset link. Please try again.";
        try {
          const errorData = await response.json();
          console.log("Request Password Reset Error Data:", errorData);
          if (
            response.status === 400 &&
            errorData.message === "Email not found"
          ) {
            // For security, show the same message as success to prevent email enumeration
            errorMessage =
              "If an account exists for this email, a password reset link has been sent.";
            setEmailMessageType("success"); // Treat as success UI-wise
            setEmail("");
          } else {
            errorMessage = errorData.message || errorMessage;
            setEmailMessageType("error");
          }
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
          setEmailMessageType("error");
        }
        setEmailMessage(errorMessage);
      }
    } catch (error) {
      console.error("Request password reset network error:", error);
      setEmailMessage(
        "An unexpected network error occurred. Please try again later.",
      );
      setEmailMessageType("error");
    }
    setIsEmailLoading(false);
  };

  // Common container styling
  const containerClasses =
    "flex flex-col items-center max-w-xs mx-auto pt-24 pb-12 px-4";

  // Initial loading state while checking token
  if (initialCheckLoading) {
    return (
      <div className={containerClasses}>
        <p className="text-gray-400">Loading...</p>{" "}
        {/* Or use a spinner component */}
      </div>
    );
  }

  // Render Password Form if token is valid
  if (viewMode === "password" && isValidToken === true) {
    return (
      <div className={containerClasses}>
        <h1 className="text-3xl font-bold mb-8 text-center text-[#ffe230]">
          Set New Password
        </h1>
        {/* Display success message for password reset */}
        {passwordMessage && passwordMessageType === "success" && (
          <p className="text-green-400 text-sm font-medium mb-4 text-center">
            {passwordMessage}
          </p>
        )}
        <form onSubmit={handlePasswordSubmit} className="space-y-5 w-full">
          {/* Disable form fields after successful password reset */}
          <fieldset disabled={passwordMessageType === "success"}>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordErrors(validatePassword(e.target.value));
                  if (
                    passwordMessage &&
                    passwordMessage === "Passwords do not match."
                  )
                    setPasswordMessage("");
                }}
                required
                className={`mt-1 block w-full px-3 py-2 bg-white/5 border rounded-md text-sm shadow-sm placeholder-gray-400 text-white
                  focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent 
                  ${passwordErrors.length > 0 || (passwordMessageType === "error" && passwordMessage === "Passwords do not match.") ? "border-red-500" : "border-white/20"}`}
              />
              {passwordErrors.map((error, index) => (
                <p key={index} className="text-red-400 text-xs mt-1">
                  {error}
                </p>
              ))}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1 text-gray-300"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (
                    passwordMessage &&
                    passwordMessage === "Passwords do not match."
                  )
                    setPasswordMessage("");
                }}
                required
                className={`mt-1 block w-full px-3 py-2 bg-white/5 border rounded-md text-sm shadow-sm placeholder-gray-400 text-white
                  focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent 
                  ${passwordMessageType === "error" && passwordMessage === "Passwords do not match." ? "border-red-500" : "border-white/20"}`}
              />
            </div>

            {/* Display general password errors (not password match) */}
            {passwordMessage &&
              passwordMessageType === "error" &&
              passwordMessage !== "Passwords do not match." && (
                <p className="text-red-400 text-sm font-medium pt-1">
                  {passwordMessage}
                </p>
              )}

            <Button
              type="submit"
              variant="glass"
              size="lg"
              className="w-full mt-2"
              loading={isPasswordLoading}
              disabled={isPasswordLoading || passwordMessageType === "success"} // Disable after success
            >
              Reset Password
            </Button>
          </fieldset>
        </form>
      </div>
    );
  }

  // Render Email Form if no token, invalid token, or network error during validation
  if (viewMode === "email") {
    return (
      <div className={containerClasses}>
        <h1 className="text-3xl font-bold mb-8 text-center text-[#ffe230]">
          Forgot Password
        </h1>
        {/* Display token error message if applicable */}
        {tokenErrorMessage && (
          <p className="text-red-400 text-sm font-medium mb-4 text-center">
            {tokenErrorMessage}
          </p>
        )}
        {/* Display email submission message */}
        {emailMessage && (
          <p
            className={`text-sm font-medium mb-4 text-center ${emailMessageType === "success" ? "text-green-400" : "text-red-400"}`}
          >
            {emailMessage}
          </p>
        )}
        <form onSubmit={handleEmailSubmit} className="space-y-5 w-full">
          {/* Disable form after successful email submission? Optional */}
          {/* <fieldset disabled={emailMessageType === 'success'}> */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-gray-300"
            >
              Enter your account email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className={`mt-1 block w-full px-3 py-2 bg-white/5 border rounded-md text-sm shadow-sm placeholder-gray-400 text-white
                        focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent border-white/20`}
            />
          </div>
          <Button
            type="submit"
            variant="glass"
            size="lg"
            className="w-full mt-2"
            loading={isEmailLoading}
            disabled={isEmailLoading}
          >
            Send Reset Link
          </Button>
          {/* </fieldset> */}
        </form>
      </div>
    );
  }

  // Fallback or generic error case (should ideally not be reached with current logic)
  return (
    <div className={containerClasses}>
      <p className="text-red-400">An unexpected error occurred.</p>
    </div>
  );
}
