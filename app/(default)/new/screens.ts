import type { StaticImageData } from "next/image";
import type { Lang } from "./copy";
import table from "@/public/new/table.png";
import tableSv from "@/public/new/table-sv.png";

// The table screenshots, per language. Replace the PNGs in public/new to change them.
//
// Portrait: once public/new/table-portrait.png and table-portrait-sv.png exist,
// import them here and fill `upright`. The turn button on the screenshot appears
// by itself when there is a portrait image.
//   import tablePortrait from "@/public/new/table-portrait.png";
//   import tablePortraitSv from "@/public/new/table-portrait-sv.png";
export const SCREENS: Record<Lang, { side: StaticImageData; upright: StaticImageData | null }> = {
  en: { side: table, upright: null },
  sv: { side: tableSv, upright: null },
};
