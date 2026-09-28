import Link from "next/link";
import { COPY, type Lang } from "./copy";
import Image from "next/image";
import { Bree_Serif } from "next/font/google";
import styles from "./beta.module.css";
import logo from "@/public/logo-v3.png";

// Store links for the side-by-side beta. Swap a value here when it changes;
// `null` shows the "almost ready" note instead of a button.
const TESTFLIGHT_URL: string | null = null; // public link, after Beta App Review
const PLAY_OPT_IN_URL = "https://play.google.com/apps/internaltest/4701258305664024339";
const SUPPORT_EMAIL = "support@pidro.net";

const bree = Bree_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bree",
  display: "swap",
});


function BevelLink({
  href,
  children,
  material = "wood",
  external = true,
}: {
  href: string;
  children: React.ReactNode;
  material?: "wood" | "glass";
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={`${styles.btn} ${styles[material]}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className={styles.btnFace}>{children}</span>
    </a>
  );
}

function Step({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <li className={styles.step}>
      <span className={styles.pip} aria-hidden="true">
        {n}
      </span>
      <div className={styles.stepBody}>{children}</div>
    </li>
  );
}

function AppleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.65c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.72-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.76.73 1.06 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.41 1.2-2.47-.03-.01-2.3-.88-2.32-3.5ZM14.2 6.19c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.3-.56.64-1.05 1.68-.92 2.67.97.08 1.96-.49 2.56-1.21Z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.6 9.48 19.44 6.3a.38.38 0 0 0-.66-.38l-1.87 3.23A11.5 11.5 0 0 0 12 8.1c-1.77 0-3.43.38-4.9 1.06L5.22 5.92a.38.38 0 1 0-.66.38L6.4 9.48C3.24 11.2 1.08 14.4.75 18.16h22.5c-.33-3.76-2.49-6.96-5.65-8.68ZM7 15.27a1.03 1.03 0 1 1 0-2.06 1.03 1.03 0 0 1 0 2.06Zm10 0a1.03 1.03 0 1 1 0-2.06 1.03 1.03 0 0 1 0 2.06Z" />
    </svg>
  );
}

export function BetaContent({ lang }: { lang: Lang }) {
  const c = COPY[lang];
  const other: Lang = lang === "en" ? "sv" : "en";
  const video = `/beta/pidro-beta-ios-${lang}.mp4`;
  const poster = `/beta/poster-${lang}.jpg`;

  return (
    <div lang={lang} className={`${styles.page} ${bree.variable} mx-auto max-w-5xl pb-12`}>
      <nav className={styles.langBar} aria-label={c.switchLabel}>
        <div className={styles.langCards}>
          {(["en", "sv"] as Lang[]).map((l) => {
            const active = l === lang;
            return (
              <Link
                key={l}
                href={l === "en" ? "/beta" : "/beta/sv"}
                hrefLang={l}
                aria-current={active ? "page" : undefined}
                aria-label={l === "en" ? "English" : "Svenska"}
                className={`${styles.langCard} ${active ? styles.langActive : styles.langIdle}`}
              >
                <small className={styles.tl}>{l === "en" ? "♠" : "♥"}</small>
                <span>{l.toUpperCase()}</span>
                <small>{l === "en" ? "♠" : "♥"}</small>
              </Link>
            );
          })}
        </div>
      </nav>

      <header className={styles.hero}>
        <div className={styles.spotlight} aria-hidden="true" />
        <div className={styles.logoStage}>
          <div className={styles.shimmer} aria-hidden="true" />
          <Image src={logo} alt="Pidro" priority className={styles.logo} sizes="(max-width: 640px) 88vw, 560px" />
        </div>

        <span className={styles.badge}>
          <span className={styles.badgeDot} aria-hidden="true">
            ♠
          </span>
          {c.badge}
        </span>

        <h1 className={`${styles.display} ${styles.title}`}>{c.title}</h1>
        <p className={styles.lede}>{c.lede}</p>

        <div className={styles.heroActions}>
          <BevelLink href="#iphone" external={false}>
            <AppleIcon /> {c.ctaIphone}
          </BevelLink>
          <BevelLink href="#android" material="glass" external={false}>
            <AndroidIcon /> {c.ctaAndroid}
          </BevelLink>
        </div>
      </header>

      <section className={`${styles.videoWrap} ${styles.deal}`} aria-labelledby="video-title">
        <div className={styles.videoCopy}>
          <h2 id="video-title" className={styles.display}>
            {c.videoTitle}
          </h2>
          <p>{c.videoBody}</p>
        </div>
        <div className={styles.phone}>
          <video controls playsInline preload="metadata" poster={poster} aria-label={c.videoLabel}>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </section>

      <div className={styles.panels}>
        <section id="iphone" aria-labelledby="iphone-title" className={`${styles.panel} ${styles.deal} ${styles.deal2}`}>
          <div className={styles.panelFace}>
            <div className={styles.panelHead}>
              <span className={styles.platformIcon}>
                <AppleIcon />
              </span>
              <div>
                <h2 id="iphone-title" className={`${styles.display} ${styles.panelTitle}`}>
                  iPhone &amp; iPad
                </h2>
                <p className={styles.panelSub}>{c.iphoneSub}</p>
              </div>
            </div>
            <ol className={styles.steps}>
              <Step n="A">
                {c.s1}
                <div className={styles.stepAction}>
                  <BevelLink href="https://apps.apple.com/app/testflight/id899247664" material="glass">
                    {c.getTestflight}
                  </BevelLink>
                </div>
              </Step>
              <Step n="2">
                {c.s2}
                {TESTFLIGHT_URL ? (
                  <div className={styles.stepAction}>
                    <BevelLink href={TESTFLIGHT_URL}>{c.joinBeta}</BevelLink>
                  </div>
                ) : (
                  <p className={styles.note}>
                    <span className={styles.pulse} aria-hidden="true" />
                    <span>{c.reviewNote}</span>
                  </p>
                )}
              </Step>
              <Step n="3">{c.s3}</Step>
            </ol>
          </div>
        </section>

        <section id="android" aria-labelledby="android-title" className={`${styles.panel} ${styles.deal} ${styles.deal3}`}>
          <div className={styles.panelFace}>
            <div className={styles.panelHead}>
              <span className={styles.platformIcon}>
                <AndroidIcon />
              </span>
              <div>
                <h2 id="android-title" className={`${styles.display} ${styles.panelTitle}`}>
                  Android
                </h2>
                <p className={styles.panelSub}>{c.androidSub}</p>
              </div>
            </div>
            <ol className={styles.steps}>
              <Step n="A">
                {c.a1}
                <div className={styles.stepAction}>
                  <BevelLink href={PLAY_OPT_IN_URL}>{c.joinPlay}</BevelLink>
                </div>
              </Step>
              <Step n="2">{c.a2}</Step>
            </ol>
          </div>
        </section>
      </div>

      <section id="classic" aria-labelledby="classic-title" className={styles.plaque}>
        <div className={styles.plaqueFace}>
          <div className={styles.plaqueGrid}>
            <div>
              <h2 id="classic-title" className={`${styles.display} ${styles.plaqueTitle}`}>
                {c.classicTitle}
              </h2>
              <p className="mb-5">{c.classicBody}</p>
              <ul className={styles.perks}>
                {c.perks.map((perk) => (
                  <li key={perk} className={styles.perk}>
                    <span className={styles.perkIcon} aria-hidden="true">
                      ✓
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[#f3dcb0]">{c.classicNote}</p>
            </div>
            <div className={styles.fan} aria-hidden="true">
              <div className={styles.fanCard}>
                A<span>♥</span>
              </div>
              <div className={styles.fanCard}>
                J<span>♥</span>
              </div>
              <div className={styles.fanCard}>
                5<span>♦</span>
              </div>
              <div className={`${styles.fanCard} ${styles.back}`} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bug}>
        <h2 className={`${styles.display} ${styles.bugTitle}`}>{c.bugTitle}</h2>
        <p>
          {c.bugBody} <span className={styles.mono}>{SUPPORT_EMAIL}</span>.
        </p>
      </section>
    </div>
  );
}
