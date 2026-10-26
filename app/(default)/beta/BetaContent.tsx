import Image from "next/image";
import Link from "next/link";
import { Bree_Serif } from "next/font/google";
import { COPY, LANGS, type Lang, type Platform } from "./copy";
import { InstallVideo, InviteOpened, IpadCheck, StoreButton } from "./BetaClient";
import styles from "./beta.module.css";
import logo from "@/public/logo-v3.png";

// The two beta doors. Empty means "not open yet": the page shows when it opens
// (NEXT_PUBLIC_BETA_OPENS, an ISO date) instead of a button. The iOS fallback is
// the TestFlight public link that has been live since September. Android is the
// Play listing itself (early access: no join step), set once Google approves it.
const IOS_URL = process.env.NEXT_PUBLIC_BETA_IOS_URL || "https://testflight.apple.com/join/2JR95b65";
const ANDROID_URL = process.env.NEXT_PUBLIC_BETA_ANDROID_URL || "";
const OPENS = process.env.NEXT_PUBLIC_BETA_OPENS || "";

const TESTFLIGHT_STORE = "https://apps.apple.com/app/testflight/id899247664";
const HELP_EMAIL = "marcel@pidro.online";

const bree = Bree_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bree",
  display: "swap",
});

function formatOpens(lang: Lang) {
  if (!OPENS) return null;
  const date = new Date(`${OPENS}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return OPENS;
  return new Intl.DateTimeFormat(COPY[lang].locale, { day: "numeric", month: "long", timeZone: "UTC" }).format(date);
}

// The invite code rides along when the reader switches language or platform.
function href(invite: string | null, lang: Lang, platform: Platform | null) {
  const query = new URLSearchParams({ lang });
  if (platform) query.set("platform", platform);
  if (invite) query.set("i", invite);
  return `/beta?${query}`;
}

const SUITS = [
  { glyph: "♠", red: false },
  { glyph: "♥", red: true },
  { glyph: "♦", red: true },
];

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  const suit = SUITS[n - 1];
  return (
    <li className={styles.step}>
      <span className={`${styles.pip} ${suit.red ? styles.red : ""}`} aria-hidden="true">
        <span>{n}</span>
        <small>{suit.glyph}</small>
      </span>
      <div className={styles.stepBody}>{children}</div>
    </li>
  );
}

function Opens({ text }: { text: string }) {
  return (
    <p className={styles.note}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="15.5" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span>{text}</span>
    </p>
  );
}

export function BetaContent({
  lang,
  platform,
  platformParam,
  maybeIpad,
  invite,
}: {
  lang: Lang;
  platform: Platform;
  platformParam: Platform | null;
  maybeIpad: boolean;
  invite: string | null;
}) {
  const c = COPY[lang];
  const opens = c.opens(formatOpens(lang));
  const email = (
    <a className={styles.email} href={`mailto:${HELP_EMAIL}`}>
      {HELP_EMAIL}
    </a>
  );

  return (
    <div lang={lang} className={`${styles.page} ${bree.variable}`}>
      {invite && <InviteOpened invite={invite} lang={lang} />}
      {maybeIpad && <IpadCheck href={href(invite, lang, "ios")} />}

      <header className={styles.top}>
        <Image src={logo} alt="Pidro" priority sizes="104px" className={styles.wordmark} />
        <nav aria-label={c.langNav}>
          <ul className={styles.langs}>
            {LANGS.map((l) => (
              <li key={l}>
                <Link
                  href={href(invite, l, platformParam)}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === lang ? "true" : undefined}
                  className={l === lang ? styles.langActive : styles.lang}
                >
                  {COPY[l].name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <h1 className={styles.title}>{c.headline[platform]}</h1>
      <p className={styles.lede}>{c.lede}</p>

      {platform === "computer" ? (
        <section className={`${styles.panel} ${styles.rise}`} aria-labelledby="open-on-phone">
          <div className={`${styles.panelFace} ${styles.computer}`}>
            <div className={styles.qr}>
              <Image src={`/beta/qr-${lang}.svg`} alt="" width={176} height={176} unoptimized />
            </div>
            <div>
              <h2 id="open-on-phone" className={styles.computerTitle}>
                {c.computer.title}
              </h2>
              <p className={styles.computerScan}>{c.computer.scan}</p>
              <p className={styles.pickLabel}>{c.computer.pick}</p>
              <div className={styles.pick}>
                <Link href={href(invite, lang, "ios")} className={styles.pickLink}>
                  {c.computer.ios}
                </Link>
                <Link href={href(invite, lang, "android")} className={styles.pickLink}>
                  {c.computer.android}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className={`${styles.panel} ${styles.rise}`} aria-labelledby="steps-title">
          <div className={styles.panelFace}>
            <h2 id="steps-title" className={styles.srOnly}>
              {c.stepsTitle}
            </h2>
            {platform === "ios" ? (
              <ol className={styles.steps}>
                <Step n={1}>
                  <p>{c.ios.s1}</p>
                  <StoreButton href={TESTFLIGHT_STORE} lang={lang}>
                    {c.ios.getTestflight}
                  </StoreButton>
                </Step>
                <Step n={2}>
                  <p>{c.ios.s2}</p>
                  {IOS_URL ? (
                    <StoreButton href={IOS_URL} event="beta_ios_tap" lang={lang} invite={invite}>
                      {c.ios.getBeta}
                    </StoreButton>
                  ) : (
                    <Opens text={opens} />
                  )}
                </Step>
                <Step n={3}>
                  <p>{c.s3}</p>
                </Step>
              </ol>
            ) : (
              <ol className={styles.steps}>
                <Step n={1}>
                  <p>{c.android.s1}</p>
                  {ANDROID_URL ? (
                    <StoreButton href={ANDROID_URL} event="beta_android_tap" lang={lang} invite={invite}>
                      {c.android.install}
                    </StoreButton>
                  ) : (
                    <Opens text={opens} />
                  )}
                </Step>
                <Step n={2}>
                  <p>{c.s3}</p>
                </Step>
              </ol>
            )}
          </div>
        </section>
      )}

      {platform === "ios" && (
        <InstallVideo lang={lang} title={c.video.title} body={c.video.body} label={c.video.label} />
      )}

      <div className={styles.boxes}>
        <section className={styles.box} aria-labelledby="not-yet">
          <h2 id="not-yet">{c.notYet.title}</h2>
          <p>{c.notYet.body}</p>
        </section>
        <section className={styles.box} aria-labelledby="help">
          <h2 id="help">{c.help.title}</h2>
          <p>{c.help.body(email)}</p>
        </section>
      </div>

      <p className={styles.classic}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="currentColor" />
          <path d="m7 12.5 3.2 3.2L17 9" stroke="#08243d" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>{c.classic}</span>
      </p>

      {platform !== "computer" && (
        <p className={styles.switch}>
          {c.switchTo[platform === "ios" ? "android" : "ios"].question}{" "}
          <Link href={href(invite, lang, platform === "ios" ? "android" : "ios")}>
            {c.switchTo[platform === "ios" ? "android" : "ios"].link}
          </Link>
        </p>
      )}
    </div>
  );
}
