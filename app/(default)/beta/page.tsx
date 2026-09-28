import type { Metadata } from "next";
import { BetaContent } from "./BetaContent";

export const metadata: Metadata = {
  title: "Join the Pidro Beta",
  description: "Play the new Pidro first. It sits next to Classic until launch, then replaces it.",
  alternates: { languages: { en: "/beta", sv: "/beta/sv" } },
  openGraph: {
    title: "Join the Pidro Beta",
    description: "Play the new Pidro first.",
    images: ["/logo-v3.png"],
  },
};

export default function BetaPage() {
  return <BetaContent lang="en" />;
}
