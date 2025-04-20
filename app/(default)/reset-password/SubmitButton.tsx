"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "glass"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  className?: string;
  // Add any other specific Button props you might need
}

export default function SubmitButton({
  children,
  variant = "glass",
  size = "lg",
  className,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={className}
      loading={pending} // Use loading prop if available
      disabled={pending || props.disabled} // Disable if pending or explicitly disabled
      aria-disabled={pending || props.disabled}
      {...props}
    >
      {children}
    </Button>
  );
}
