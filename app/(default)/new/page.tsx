import type { Metadata } from "next";
import { headers } from "next/headers";
import { LaunchContent, type Platform } from "./LaunchContent";
import { COPY, LANGS, type Lang, type Phase } from "./copy";
import { isLaunched } from "./config";

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

function detectPlatform(userAgent: string | null): Platform {
  const ua = userAgent ?? "";
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return "computer";
}

async function resolve(searchParams: SearchParams) {
  const params = await searchParams;
  const h = await headers();
  const p = first(params.preview);
  const forced: Phase | null = p === "after" || p === "before" ? p : null;
  // The real switch is PIDRO_LAUNCHED (see config.ts). ?preview=after|before only
  // lets Marcel look at the other state before he flips it.
  const phase: Phase = forced ?? (isLaunched() ? "after" : "before");
  return {
    lang: pickLang(first(params.lang), h.get("accept-language")),
    phase,
    preview: forced,
    platform: detectPlatform(h.get("user-agent")),
    // Where the link came from (classic-banner, email, facebook). Kept when switching language.
    from: /^[a-z0-9-]{1,40}$/.test(first(params.from) ?? "") ? (first(params.from) as string) : null,
  };
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { lang, phase } = await resolve(searchParams);
  const c = COPY[lang];
  const title = c.headline[phase];
  const description = c.intro[phase];
  const image = { url: `/new/og/${lang}-${phase}`, width: 1200, height: 630, alt: title };
  return {
    // Absolute share URLs: the real domain in production, the deployment's own URL in previews.
    metadataBase: new URL(
      process.env.VERCEL_ENV === "production"
        ? "https://www.pidro.online"
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000",
    ),
    title,
    description,
    alternates: {
      canonical: `/new?lang=${lang}`,
      languages: { en: "/new?lang=en", sv: "/new?lang=sv" },
    },
    openGraph: {
      type: "website",
      siteName: "Pidro",
      url: `/new?lang=${lang}`,
      title,
      description,
      locale: lang === "sv" ? "sv_SE" : "en_GB",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function LaunchPage({ searchParams }: { searchParams: SearchParams }) {
  return <LaunchContent {...await resolve(searchParams)} />;
}
