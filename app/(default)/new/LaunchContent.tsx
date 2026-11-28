import Image from "next/image";
import Link from "next/link";
import { Bree_Serif } from "next/font/google";
import { COPY, LANGS, STORE_NAMES, type Lang, type Phase } from "./copy";
import { STORE_LINKS, type Store } from "./config";
import { StoreButton } from "./LaunchClient";
import styles from "./new.module.css";
import logo from "@/public/logo-v3.png";
import { SCREENS } from "./screens";
import { TurnableShot } from "./TurnableShot";

export type Platform = "ios" | "android" | "computer";

const bree = Bree_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bree",
  display: "swap",
});

function href(lang: Lang, from: string | null, preview: Phase | null) {
  const query = new URLSearchParams({ lang });
  if (from) query.set("from", from);
  if (preview) query.set("preview", preview);
  return `/new?${query}`;
}

function Check() {
  return (
    <svg className={styles.check} width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="13" fill="currentColor" />
      <path d="m8.5 14.5 3.6 3.6L19.8 10" fill="none" stroke="#08243d" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SUITS = [
  { glyph: "♠", red: false },
  { glyph: "♥", red: true },
  { glyph: "♦", red: true },
  { glyph: "♣", red: false },
];

function StoreGlyph({ store }: { store: Store }) {
  // Shape cues, not the trademarked store logos: a phone, and a play triangle.
  return store === "ios" ? (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="2.5" width="12" height="19" rx="3" stroke="currentColor" strokeWidth="2.2" />
      <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 3.5v17l14-8.5-14-8.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

export function LaunchContent({
  lang,
  phase,
  preview,
  platform,
  from,
}: {
  lang: Lang;
  phase: Phase;
  preview: Phase | null;
  platform: Platform;
  from: string | null;
}) {
  const c = COPY[lang];
  const after = phase === "after";
  // The visitor's own store first. A computer gets both, App Store first.
  const stores: Store[] = platform === "android" ? ["android", "ios"] : ["ios", "android"];

  const whatIsNew = (
    <section className={styles.section} aria-labelledby="new-title">
      <h2 id="new-title" className={styles.label}>
        {c.isNew.title}
      </h2>
      <ul className={styles.news}>
        {c.isNew.items.map((item, i) => (
          <li key={i}>
            <span className={`${styles.pip} ${SUITS[i].red ? styles.red : ""}`} aria-hidden="true">
              {SUITS[i].glyph}
            </span>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </section>
  );

  const screenshot = (
    <TurnableShot
      side={SCREENS[lang].side}
      upright={SCREENS[lang].upright}
      alt={c.screenshotAlt}
      turnLabel={c.turn}
    />
  );

  return (
    <div lang={lang} className={`${styles.page} ${bree.variable}`}>
      <header className={styles.top}>
        <nav aria-label={c.langNav}>
          <ul className={styles.langs}>
            {LANGS.map((l) => (
              <li key={l}>
                <Link
                  href={href(l, from, preview)}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === lang ? "true" : undefined}
                  className={l === lang ? styles.langOn : styles.lang}
                  replace
                  scroll={false}
                >
                  {COPY[l].name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className={styles.hero}>
        <Link href="/" className={styles.home}>
          <Image src={logo} alt="Pidro" priority sizes="(max-width: 600px) 80vw, 400px" className={styles.logo} />
        </Link>
        <h1 className={styles.title}>{c.headline[phase]}</h1>
        <p className={styles.intro}>{c.intro[phase]}</p>
      </div>

      {after ? (
        <>
          <div className={styles.stores}>
            {stores.map((store, i) => (
              <StoreButton
                key={store}
                href={STORE_LINKS[store]}
                store={store}
                lang={lang}
                from={from}
                quiet={platform !== "computer" && i > 0}
              >
                <StoreGlyph store={store} />
                <span>{STORE_NAMES[store]}</span>
              </StoreButton>
            ))}
          </div>
          <p className={styles.update}>{c.update}</p>
          {screenshot}
          {whatIsNew}
          <p className={styles.signIn}>
            <Check />
            <span>{c.signIn}</span>
          </p>
        </>
      ) : (
        <>
          <section className={styles.panel} aria-labelledby="todo-title">
            <div className={styles.panelFace}>
              <h2 id="todo-title" className={styles.label}>
                {c.todo.title}
              </h2>
              <p className={styles.answer}>{c.todo.answer}</p>
              <ul className={styles.checks}>
                {c.todo.items.map((item, i) => (
                  <li key={i}>
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          {screenshot}
          {whatIsNew}
        </>
      )}

      <p className={styles.signOff}>
        <span aria-hidden="true">♠</span> {c.signOff}
      </p>
    </div>
  );
}
