import { readFile } from "node:fs/promises";
import { join } from "node:path";
/* eslint-disable @next/next/no-img-element -- Satori draws plain <img> */
import { ImageResponse } from "next/og";
import { COPY, LANGS, type Lang, type Phase } from "../../copy";
import { SCREENSHOT_PATHS } from "../../config";

// The 1200x630 share images for Facebook and friends: the headline and the table,
// one per language and state (/new/og/en-before, /new/og/sv-after, ...).
// Built once at build time from the screenshots in public/new.

export const dynamic = "force-static";
export const dynamicParams = false;

const PHASES: Phase[] = ["before", "after"];

export function generateStaticParams() {
  return LANGS.flatMap((lang) => PHASES.map((phase) => ({ variant: `${lang}-${phase}` })));
}

// Google serves TrueType to old browsers; Satori needs TrueType.
async function breeSerif(text: string) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Bree+Serif&text=${encodeURIComponent(text)}`, {
        headers: { "User-Agent": "Mozilla/4.0" },
      })
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

function pngSize(buf: Buffer) {
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const dataUri = (buf: Buffer) => `data:image/png;base64,${buf.toString("base64")}`;

export async function GET(_req: Request, { params }: { params: Promise<{ variant: string }> }) {
  const [lang, phase] = (await params).variant.split("-") as [Lang, Phase];
  const title = COPY[lang].headline[phase];

  const [shot, logo, font] = await Promise.all([
    readFile(join(process.cwd(), SCREENSHOT_PATHS[lang])),
    readFile(join(process.cwd(), "public/logo-v3.png")),
    breeSerif(`${title}`),
  ]);
  const size = pngSize(shot);
  const wide = size.width > size.height;

  const rim = "linear-gradient(180deg, #f6de9a 0%, #e2af45 35%, #c4892a 65%, #8f5e12 100%)";

  // Landscape: the whole table, hand included, under the headline.
  // Portrait: the phone stands on the right.
  const shotW = wide ? 820 : 300;
  const shotH = Math.round((shotW * size.height) / size.width);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "radial-gradient(circle at 50% 30%, #1c67a0 0%, #0d304b 100%)",
          fontFamily: font ? "Bree" : "serif",
        }}
      >
        <img
          src={dataUri(logo)}
          width={190}
          height={115}
          style={{ position: "absolute", top: 40, right: 50 }}
          alt=""
        />
        <div
          style={{
            position: "absolute",
            top: 52,
            left: 64,
            width: wide ? 880 : 700,
            display: "flex",
            fontSize: wide ? 74 : 84,
            lineHeight: 1.04,
            color: "#ffd447",
            textShadow: "0 4px 0 #8f5e12",
          }}
        >
          {title}
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            padding: 4,
            borderRadius: 34,
            background: rim,
            boxShadow: "0 0 60px rgba(63,208,255,0.35)",
            ...(wide ? { left: 177, top: 222 } : { right: 70, top: 170 }),
          }}
        >
          <div style={{ display: "flex", padding: 9, borderRadius: 30, background: "#050d17" }}>
            <img
              src={dataUri(shot)}
              width={shotW}
              height={shotH}
              style={{ borderRadius: 22 }}
              alt=""
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: font ? [{ name: "Bree", data: font, weight: 400, style: "normal" }] : [],
    },
  );
}
