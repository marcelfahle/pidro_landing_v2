import { redirect } from "next/navigation";
import RequestResetLinkForm from "./RequestResetLinkForm";
import ResetPasswordForm from "./ResetPasswordForm";

// --- Server-Side Utilities (Placeholders) ---
// Replace these with your actual server-side logic imports/implementations
async function validateResetTokenOnServer(token: string): Promise<boolean> {
  console.log("Server: Validating token directly via backend API:", token);

  // Directly use the backend API URL
  const backendUrl = process.env.PIDRO_API_VALIDATE_RESET_TOKEN_URL; // Use a specific env var
  // Or fallback to the hardcoded URL if the env var isn't set (adjust as needed)
  const effectiveBackendUrl =
    backendUrl || "https://api.pidro.online/v2/validate_reset_token";

  if (!effectiveBackendUrl) {
    console.error("Server: Backend token validation URL is not configured.");
    // Throw an error consistent with previous logic if URL is missing
    throw new Error("Server configuration error for token validation.");
  }

  console.log("Server: Calling backend URL:", effectiveBackendUrl);

  try {
    const response = await fetch(effectiveBackendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    // Check if the backend call was successful
    if (!response.ok) {
      console.error(
        `Server: Backend token validation API call failed (${response.status})`,
      );
      // Consider parsing the error from the backend if useful
      // For now, treat any non-ok response from backend as invalid token
      return false;
    }

    // Assuming the backend returns { "valid": true } or similar on success
    // Adapt this based on the actual backend response format
    const data = await response.json();
    console.log("Server: Backend token validation API response:", data);

    // Check for a specific success indicator from *your* backend API
    // This might be data.valid, data.success, or just a 200 OK status
    // Adjust this logic based on how api.pidro.online indicates a valid token
    // For example, if it *only* returns 200 OK for valid, and non-200 for invalid:
    return response.status === 200; // Or check data property like data.valid
  } catch (error) {
    console.error(
      "Server: Network or fetch error during *backend* token validation:",
      error,
    );
    // Re-throw the error so the calling code knows something went wrong
    throw new Error(
      "Could not validate the reset link due to a network or server error connecting to the backend.",
    );
  }
}

async function requestPasswordResetLink(email: string): Promise<void> {
  console.log("Server: Requesting reset link for:", email);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    console.error("Missing NEXT_PUBLIC_API_BASE_URL");
    throw new Error("API configuration error."); // Let the action catch this
  }
  const url = `${apiBaseUrl}/v3/reset_password?Email=${encodeURIComponent(email)}`;
  const response = await fetch(url, { method: "GET" });
  console.log("Server: Request Password Reset API Status:", response.status);
  // Handle non-OK status appropriately - throw an error for the action to catch?
  if (!response.ok && response.status !== 400) {
    // Treat 400 (not found) as success for security
    // Attempt to parse error, but throw a generic one if needed
    try {
      const errorData = await response.json();
      console.error("Server: API Error Data:", errorData);
      throw new Error(errorData.message || "Failed to send reset link.");
    } catch (e) {
      throw new Error("Failed to send reset link due to server error.");
    }
  }
  // If OK or 400, we proceed as if successful in the action's redirect
}

async function resetPasswordWithToken(
  token: string,
  newPassword: string,
): Promise<void> {
  console.log(
    "Server: Attempting password reset directly via backend API:",
    token,
  );

  // Directly use the backend API URL
  const backendUrl = process.env.PIDRO_API_SET_NEW_PASSWORD_URL;
  const effectiveBackendUrl =
    backendUrl || "https://api.pidro.online/v2/set_new_password";

  if (!effectiveBackendUrl) {
    console.error("Server: Backend password reset URL is not configured.");
    throw new Error("Server configuration error for password reset.");
  }

  console.log("Server: Calling backend URL:", effectiveBackendUrl);

  try {
    const response = await fetch(effectiveBackendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!response.ok) {
      let errorMessage = "Error resetting password via backend.";
      try {
        // Attempt to parse error message from API response
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch (parseError) {
        // Ignore if response body isn't valid JSON or empty
        console.error(
          "Server: Could not parse error response from backend API:",
          parseError,
        );
      }
      console.error(
        `Server: Backend API call failed (${response.status}): ${errorMessage}`,
      );
      // Throw an error to be caught by the Server Action
      throw new Error(errorMessage);
    }

    // If response.ok, the password reset was successful via backend
    console.log("Server: Password reset successful via backend API.");
    // No need to return anything or redirect here; the Server Action handles it.
  } catch (error) {
    // Catch specific error type if possible, otherwise handle generic errors
    if (error instanceof Error) {
      console.error(
        "Server: Network or fetch error during backend password reset:",
        error.message,
      );
      // Re-throw the original error or a new tailored one
      throw new Error(
        error.message ||
          "An unexpected error occurred during backend password reset.",
      );
    } else {
      // Handle non-Error objects thrown
      console.error(
        "Server: An unexpected non-Error was thrown during backend password reset:",
        error,
      );
      throw new Error(
        "An unexpected error occurred during backend password reset.",
      );
    }
  }
}

// --- Basic Password Validation (Server-Side) ---
function validatePasswordServer(password: string): string | null {
  if (password.length < 6) {
    return "password_too_short";
  }
  // Add same rules as client-side if needed
  return null; // No error
}

// --- Message & Error Lookups ---
const messages: { [key: string]: string } = {
  reset_link_sent:
    "If an account exists for this email, a password reset link has been sent.",
  // Password reset success message is handled by redirecting to login
};

const errors: { [key: string]: string } = {
  invalid_token:
    "This password reset link is invalid or has expired. Please request a new one below.",
  token_validation_failed:
    "Could not validate the reset link. Please try again.",
  missing_email: "Please enter your email address.",
  api_error: "Failed to send reset link. Please try again later.",
  missing_token: "Reset token is missing. Please use the link from your email.",
  password_mismatch: "Passwords do not match.",
  password_too_short: "Password must be at least 6 characters long.",
  reset_failed: "Error resetting password. Please try again.",
  unknown_error: "An unexpected error occurred.",
};

// --- The Server Component ---
export default async function ResetPasswordPage({
  searchParams,
}: {
  // Updated searchParams type for Next.js 15+
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = (await searchParams) ?? {}; // Handle potential undefined promise
  const token = resolvedSearchParams?.token as string | undefined;
  const messageKey = resolvedSearchParams?.message as string | undefined;
  const errorKey = resolvedSearchParams?.error as string | undefined;

  let viewMode: "email" | "password" = "email";
  let initialTokenErrorKey: string | undefined;
  let isValidToken = false;

  // --- Server-Side Token Validation ---
  if (token) {
    try {
      isValidToken = await validateResetTokenOnServer(token);
      if (isValidToken) {
        viewMode = "password";
      } else {
        initialTokenErrorKey = "invalid_token";
        viewMode = "email"; // Stay on email form if token invalid
      }
    } catch (err) {
      console.error("Server: Token validation error:", err);
      initialTokenErrorKey = "token_validation_failed";
      viewMode = "email";
    }
  }

  const displayMessage = messageKey ? messages[messageKey] : undefined;
  // Prioritize token error over other errors if token was present but invalid
  const displayError = initialTokenErrorKey
    ? errors[initialTokenErrorKey]
    : errorKey
      ? errors[errorKey]
      : undefined;

  // --- Server Action: Request Reset Link ---
  async function requestResetLinkAction(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;

    if (!email) {
      redirect("/reset-password?error=missing_email");
    }

    try {
      await requestPasswordResetLink(email);
      // Treat 400 "Email not found" from API as success for security
      redirect("/reset-password?message=reset_link_sent");
    } catch (error) {
      // If it's the special redirect error, re-throw it so Next.js handles it
      if ((error as any)?.digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
      }

      // Otherwise, it's an unexpected server error from requestPasswordResetLink
      console.error("Server Action: Request password reset error:", error);
      // Redirect with a generic error
      redirect("/reset-password?error=api_error"); // Simplified error handling
    }
  }

  // --- Server Action: Reset Password ---
  async function resetPasswordAction(formData: FormData) {
    "use server";
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const resetToken = formData.get("token") as string; // From hidden input

    if (!resetToken) {
      redirect("/reset-password?error=missing_token");
      return;
    }

    // Re-validate token server-side before attempting reset
    try {
      const isTokenStillValid = await validateResetTokenOnServer(resetToken);
      if (!isTokenStillValid) {
        redirect("/reset-password?error=invalid_token");
        return;
      }
    } catch (err) {
      redirect(
        `/reset-password?token=${resetToken}&error=token_validation_failed`,
      );
      return;
    }

    const passwordValidationErrorKey = validatePasswordServer(newPassword);
    if (passwordValidationErrorKey) {
      redirect(
        `/reset-password?token=${resetToken}&error=${passwordValidationErrorKey}`,
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      redirect(`/reset-password?token=${resetToken}&error=password_mismatch`);
      return;
    }

    try {
      await resetPasswordWithToken(resetToken, newPassword);
      // Redirect to login page with a success message indicator
      redirect("/login?message=password_reset_success"); // Adjust if your login page handles this
    } catch (error) {
      // If it's the special redirect error, re-throw it so Next.js handles it
      if ((error as any)?.digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
      }

      // Otherwise, it's an unexpected error from resetPasswordWithToken or validation
      console.error("Server Action: Password reset action error:", error);
      // Redirect back to password form with error
      redirect(`/reset-password?token=${resetToken}&error=reset_failed`);
    }
  }

  // --- Render Logic ---
  const containerClasses =
    "flex flex-col items-center max-w-xs mx-auto pt-24 pb-12 px-4";

  return (
    <div className={containerClasses}>
      {viewMode === "password" && token ? (
        // --- Password Reset View ---
        <>
          <h1 className="text-3xl font-bold mb-8 text-center text-[#ffe230]">
            Set New Password
          </h1>
          {/* Display general server errors for this form */}
          {displayError &&
            errorKey !== "password_mismatch" &&
            errorKey !== "password_too_short" && (
              <p className="text-red-400 text-sm font-medium mb-4 text-center">
                {displayError}
              </p>
            )}
          {/* Render the client form, passing the action, token, and initial error key */}
          <ResetPasswordForm
            token={token}
            resetPasswordAction={resetPasswordAction}
            initialErrorKey={errorKey} // Pass error key for client form to potentially use
          />
        </>
      ) : (
        // --- Email Request View ---
        <>
          <h1 className="text-3xl font-bold mb-8 text-center text-[#ffe230]">
            Forgot Password
          </h1>
          {/* Display message or error for the email form */}
          {displayMessage && (
            <p className="text-green-400 text-sm font-medium mb-4 text-center">
              {displayMessage}
            </p>
          )}
          {displayError && (
            <p className="text-red-400 text-sm font-medium mb-4 text-center">
              {displayError}
            </p>
          )}
          {/* Render the client form, passing the action */}
          <RequestResetLinkForm
            requestResetLinkAction={requestResetLinkAction}
          />
        </>
      )}
    </div>
  );
}
