import type { Metadata } from "next";
import { BetaContent } from "../BetaContent";

export const metadata: Metadata = {
  title: "Spela Pidro Beta",
  description: "Spela nya Pidro först. Den ligger bredvid Classic fram till lanseringen och ersätter den sedan.",
  alternates: { languages: { en: "/beta", sv: "/beta/sv" } },
  openGraph: {
    title: "Spela Pidro Beta",
    description: "Spela nya Pidro först.",
    images: ["/logo-v3.png"],
  },
};

export default function BetaPageSv() {
  return <BetaContent lang="sv" />;
}
