import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components/layout";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  useEffect(() => {
    if (router.isReady) {
      const tokenParam = router.query.token;
      const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

      if (token) {
        setToken(token);
        validateToken(token);
      } else {
        setIsLoading(false);
      }
    }
  }, [router.query.token, router.isReady]);

  const validateToken = async (token: string) => {
    const response = await fetch("/api/validate-reset-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    setIsValidToken(data.valid);
    setIsLoading(false);
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];

    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }

    // Optional: Add more validation rules here if needed in the future
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setPasswordErrors([]);

    // Validate password
    const errors = validatePassword(newPassword);
    if (errors.length > 0) {
      setPasswordErrors(errors);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      if (response.ok) {
        // Handle successful password reset (e.g., redirect to login page)
        setIsSuccess(true);
      } else {
        // Handle error
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error resetting password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while resetting the password.");
    }
  };

  if (isLoading) {
    return (
      <Layout barebones={true}>
        <p className="mb-4 strong text-center">
          <strong>Loading...</strong>
        </p>
      </Layout>
    );
  }

  if (isSuccess) {
    return (
      <Layout barebones={true}>
        <p className="mb-4 strong text-center">
          <strong>Password Reset Successful!</strong>
        </p>
        <p>
          You can now switch back to the Pidro app and use your new credentials.
        </p>
      </Layout>
    );
  }

  if (!isValidToken) {
    return (
      <Layout barebones={true}>
        <p className="mb-4 strong text-center">
          <strong>Invalid Link</strong>
        </p>
        <p>
          The Link to renew your password is either invalid or has expired.
          Please use the &quot;Forgot Credentials?&quot; button in the Pidro App
          to request a new link.
        </p>
      </Layout>
    );
  }

  return (
    <Layout barebones={true}>
      <div className="flex flex-col relative z-50 prose max-w-xs mx-auto">
        <p className="mb-4 strong">
          <strong>Here you can set a new password:</strong>{" "}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block">
              New Password:
            </label>
            <input
              className={`text-black text-xl px-2 py-0.5 ${
                passwordErrors.length > 0 ? "border-red-500 border-2" : ""
              }`}
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordErrors(validatePassword(e.target.value));
              }}
              required
            />
            {passwordErrors.map((error, index) => (
              <p key={index} className=" text-sm mt-1">
                <strong>{error}</strong>
              </p>
            ))}
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <input
              className="text-black text-xl px-2 py-0.5"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <button
            type="submit"
            className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
          >
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
}
