import type { Metadata } from "next";
import { headers } from "next/headers";
import { BetaContent } from "./BetaContent";
import { COPY, LANGS, type Lang, type Platform } from "./copy";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

// ?lang= wins, then the browser's languages in order, then English.
function pickLang(param: string | undefined, acceptLanguage: string | null): Lang {
  if (LANGS.includes(param as Lang)) return param as Lang;
  for (const part of (acceptLanguage ?? "").split(",")) {
    const code = part.trim().slice(0, 2).toLowerCase();
    if (LANGS.includes(code as Lang)) return code as Lang;
  }
  return "en";
}

// iPadOS sends a Mac user agent; IpadCheck corrects that in the browser.
function detectPlatform(userAgent: string | null): Platform {
  const ua = userAgent ?? "";
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return "computer";
}

async function resolve(searchParams: SearchParams) {
  const params = await searchParams;
  const h = await headers();
  const lang = pickLang(first(params.lang), h.get("accept-language"));
  const chosen = first(params.platform);
  const platformParam: Platform | null = chosen === "ios" || chosen === "android" ? chosen : null;
  const ua = h.get("user-agent");
  return {
    lang,
    platformParam,
    platform: platformParam ?? detectPlatform(ua),
    maybeIpad: !platformParam && /macintosh/i.test(ua ?? ""),
    // The invite code from the email; anything that isn't a short code is ignored.
    invite: /^[a-z0-9]{4,12}$/.test(first(params.i) ?? "") ? (first(params.i) as string) : null,
  };
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { lang } = await resolve(searchParams);
  const description = COPY[lang].metaDescription;
  return {
    title: "Pidro beta",
    description,
    // The invite email is the only way in; keep the page out of search.
    robots: { index: false, follow: false },
    openGraph: { title: "Pidro beta", description, images: ["/logo-v3.png"] },
  };
}

export default async function BetaPage({ searchParams }: { searchParams: SearchParams }) {
  return <BetaContent {...await resolve(searchParams)} />;
}
