// Everything about /new that Marcel changes by hand lives here.

// BEFORE or AFTER launch.
// Set PIDRO_LAUNCHED=1 in Vercel (Production) and redeploy to switch to "after".
// Unset it, or set it to anything else, for "before". Read at request time on the server.
export function isLaunched() {
  return process.env.PIDRO_LAUNCHED === "1";
}

// The two stores. The App Store link is the existing Pidro listing (the new app
// replaces it under the same id); confirm it before launch.
export const STORE_LINKS = {
  ios: "https://apps.apple.com/app/pidro/id1137091987",
  android: "https://play.google.com/store/apps/details?id=com.oneapps.pidro",
} as const;

export type Store = keyof typeof STORE_LINKS;

// The screenshots of the new table, one per language: public/new/table.png (English)
// and public/new/table-sv.png (Swedish). Replace the files (PNG, any size, landscape
// or portrait); the page and the share images size themselves from them at build time.
export const SCREENSHOT_PATHS = { en: "public/new/table.png", sv: "public/new/table-sv.png" } as const;
