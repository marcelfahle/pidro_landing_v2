import { redirect } from "next/navigation";

// The Swedish page used to live here; links to it may still be in old emails.
export default function BetaSvPage() {
  redirect("/beta?lang=sv");
}
