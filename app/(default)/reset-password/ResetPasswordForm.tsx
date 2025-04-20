"use client";

import { useState, useEffect } from "react";
import SubmitButton from "./SubmitButton";

interface ResetPasswordFormProps {
  token: string;
  resetPasswordAction: (formData: FormData) => Promise<void>; // Server action
  // Pass initial error key (e.g., 'password_mismatch') from searchParams
  // to highlight fields correctly on first render after a server-side error redirect.
  initialErrorKey?: string;
}

// Basic client-side validation helper
const validatePasswordClientSide = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  // Add more rules if needed (e.g., uppercase, number, symbol)
  return errors;
};

export default function ResetPasswordForm({
  token,
  resetPasswordAction,
  initialErrorKey,
}: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  useEffect(() => {
    // If there was an initial mismatch error from server, reflect it
    if (initialErrorKey === "password_mismatch") {
      setPasswordsMatch(false);
    }
    // If there was an initial complexity error, run validation
    if (initialErrorKey === "password_too_short") {
      // Or other complexity keys
      setPasswordErrors(validatePasswordClientSide("")); // Show length error initially
    }
  }, [initialErrorKey]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentNewPassword = e.target.value;
    setNewPassword(currentNewPassword);
    const validationErrors = validatePasswordClientSide(currentNewPassword);
    setPasswordErrors(validationErrors);
    // Check match only if confirm password has been touched
    if (confirmPassword !== "") {
      setPasswordsMatch(currentNewPassword === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const currentConfirmPassword = e.target.value;
    setConfirmPassword(currentConfirmPassword);
    setPasswordsMatch(newPassword === currentConfirmPassword);
  };

  const isSubmitDisabled =
    passwordErrors.length > 0 ||
    !passwordsMatch ||
    !newPassword ||
    !confirmPassword;

  return (
    <form action={resetPasswordAction} className="space-y-5 w-full">
      {/* Hidden input for the token is crucial for the server action */}
      <input type="hidden" name="token" value={token} />

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
          name="newPassword" // Use name for FormData
          value={newPassword} // Controlled component
          onChange={handlePasswordChange}
          required
          className={`mt-1 block w-full px-3 py-2 bg-white/5 border rounded-md text-sm shadow-sm placeholder-gray-400 text-white
            focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
            ${passwordErrors.length > 0 || !passwordsMatch ? "border-red-500" : "border-white/20"}`}
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
          name="confirmPassword" // Use name for FormData
          value={confirmPassword} // Controlled component
          onChange={handleConfirmPasswordChange}
          required
          className={`mt-1 block w-full px-3 py-2 bg-white/5 border rounded-md text-sm shadow-sm placeholder-gray-400 text-white
            focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
            ${!passwordsMatch ? "border-red-500" : "border-white/20"}`}
        />
        {!passwordsMatch && confirmPassword !== "" && (
          <p className="text-red-400 text-xs mt-1">Passwords do not match.</p>
        )}
      </div>

      {/* Server errors (like 'reset_failed') will be displayed by the parent page component */}

      <SubmitButton className="w-full mt-2" disabled={isSubmitDisabled}>
        Reset Password
      </SubmitButton>
    </form>
  );
}
