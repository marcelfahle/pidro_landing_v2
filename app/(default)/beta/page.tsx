import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Join the Pidro Beta",
  description:
    "Play the new Pidro first. It sits next to Classic until launch, then replaces it.",
  openGraph: {
    title: "Join the Pidro Beta",
    description: "Play the new Pidro first. During the beta it installs next to Classic.",
    images: ["/logo-v3.png"],
  },
};

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

export default function BetaPage() {
  return (
    <div className={`${styles.page} ${bree.variable} mx-auto max-w-5xl pb-12`}>
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
          Beta · invite open
        </span>

        <h1 className={`${styles.display} ${styles.title}`}>Play the new Pidro first</h1>
        <p className={styles.lede}>
          For now it sits next to Classic on your phone. At launch it replaces Classic, and
          your account comes with you.
        </p>

        <div className={styles.heroActions}>
          <BevelLink href="#iphone" external={false}>
            <AppleIcon /> Get it on iPhone
          </BevelLink>
          <BevelLink href="#android" material="glass" external={false}>
            <AndroidIcon /> Get it on Android
          </BevelLink>
        </div>
      </header>

      <div className={styles.panels}>
        <section id="iphone" aria-labelledby="iphone-title" className={styles.panel}>
          <div className={styles.panelFace}>
            <div className={styles.panelHead}>
              <span className={styles.platformIcon}>
                <AppleIcon />
              </span>
              <div>
                <h2 id="iphone-title" className={`${styles.display} ${styles.panelTitle}`}>
                  iPhone &amp; iPad
                </h2>
                <p className={styles.panelSub}>Through TestFlight</p>
              </div>
            </div>
            <ol className={styles.steps}>
              <Step n="A">
                Install <strong>TestFlight</strong>, Apple&apos;s free app for test games.
                <div className={styles.stepAction}>
                  <BevelLink href="https://apps.apple.com/app/testflight/id899247664" material="glass">
                    Get TestFlight
                  </BevelLink>
                </div>
              </Step>
              <Step n="2">
                Open your invite on your iPhone. Tap <strong>Accept</strong>, then{" "}
                <strong>Install</strong>.
                {TESTFLIGHT_URL ? (
                  <div className={styles.stepAction}>
                    <BevelLink href={TESTFLIGHT_URL}>Join the beta</BevelLink>
                  </div>
                ) : (
                  <p className={styles.note}>
                    <span className={styles.pulse} aria-hidden="true" />
                    <span>Apple is checking the first build. The link goes live here soon.</span>
                  </p>
                )}
              </Step>
              <Step n="3">
                Open <strong>Pidro Beta</strong>. Classic stays installed.
              </Step>
            </ol>
          </div>
        </section>

        <section id="android" aria-labelledby="android-title" className={styles.panel}>
          <div className={styles.panelFace}>
            <div className={styles.panelHead}>
              <span className={styles.platformIcon}>
                <AndroidIcon />
              </span>
              <div>
                <h2 id="android-title" className={`${styles.display} ${styles.panelTitle}`}>
                  Android
                </h2>
                <p className={styles.panelSub}>Through Google Play</p>
              </div>
            </div>
            <ol className={styles.steps}>
              <Step n="A">
                Open your invite on your phone and tap <strong>Become a tester</strong>. Use
                the Google account we invited.
                <div className={styles.stepAction}>
                  <BevelLink href={PLAY_OPT_IN_URL}>Join on Google Play</BevelLink>
                </div>
              </Step>
              <Step n="2">
                Tap <strong>Download it on Google Play</strong>. Classic stays installed.
              </Step>
            </ol>
          </div>
        </section>
      </div>

      <section id="classic" aria-labelledby="classic-title" className={styles.plaque}>
        <div className={styles.plaqueFace}>
          <div className={styles.plaqueGrid}>
            <div>
              <h2 id="classic-title" className={`${styles.display} ${styles.plaqueTitle}`}>
                Played Classic? Bring your history.
              </h2>
              <p className="mb-5">
                In the app, tap <strong>Claim Classic</strong> and sign in like you always did.
              </p>
              <ul className={styles.perks}>
                <li className={styles.perk}>
                  <span className={styles.perkIcon} aria-hidden="true">✓</span>
                  <span>Your games, level and name come over.</span>
                </li>
                <li className={styles.perk}>
                  <span className={styles.perkIcon} aria-hidden="true">✓</span>
                  <span>Classic keeps working until launch day.</span>
                </li>
                <li className={styles.perk}>
                  <span className={styles.perkIcon} aria-hidden="true">✓</span>
                  <span>Your name is saved for you.</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-[#f3dcb0]">
                No button yet? Play as a guest and claim later. You keep your progress.
              </p>
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
        <h2 className={`${styles.display} ${styles.bugTitle}`}>Found a bug?</h2>
        <p>
          Take a screenshot in the app and send it, or write to{" "}
          <span className={styles.mono}>{SUPPORT_EMAIL}</span>.
        </p>
      </section>
    </div>
  );
}
