"use client";

import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

interface RequestResetLinkFormProps {
  requestResetLinkAction: (formData: FormData) => Promise<void>;
}

export default function RequestResetLinkForm({
  requestResetLinkAction,
}: RequestResetLinkFormProps) {
  // We might not need useFormState if we rely solely on redirects + searchParams for feedback
  // but it can be useful for more complex state updates without full redirects.
  // For simplicity matching the previous structure, let's omit it for now.

  return (
    <form action={requestResetLinkAction} className="space-y-5 w-full">
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
          name="email" // Use name for FormData
          required
          autoComplete="email"
          className={`mt-1 block w-full px-3 py-2 bg-white/5 border rounded-md text-sm shadow-sm placeholder-gray-400 text-white
                    focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent border-white/20`}
        />
      </div>
      <SubmitButton className="w-full mt-2">Send Reset Link</SubmitButton>
    </form>
  );
}
