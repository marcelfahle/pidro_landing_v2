import type { Metadata } from "next";

// Store links for the side-by-side beta. Swap a value here when it changes;
// `null` shows the "almost ready" note instead of a button.
const TESTFLIGHT_URL: string | null = null; // public link, after Beta App Review
const PLAY_OPT_IN_URL = "https://play.google.com/apps/internaltest/4701258305664024339";
const SUPPORT_EMAIL = "support@pidro.net";

export const metadata: Metadata = {
  title: "Join the Pidro Beta",
  description:
    "Try the new Pidro before everyone else. It installs next to Classic, so you keep playing both.",
};

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ffe230] font-bold text-[#0d304b]">
        {n}
      </span>
      <div className="pt-1">{children}</div>
    </li>
  );
}

function StoreButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-lg bg-[#ffe230] px-5 py-3 font-semibold !text-[#0d304b] hover:bg-yellow-300"
    >
      {label}
    </a>
  );
}

function Card({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
    >
      <h2 id={`${id}-title`} className="mb-6 text-2xl font-bold text-[#ffe230]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function BetaPage() {
  const mailAndroid = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    "Pidro Beta for Android",
  )}&body=${encodeURIComponent("My Google Play email is: ")}`;

  return (
    <div className="mx-auto max-w-3xl pt-16 pb-12">
      <header className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-300">
          Pidro Beta
        </p>
        <h1 className="mb-4 text-4xl font-bold text-[#ffe230] sm:text-5xl text-balance">
          Play the new Pidro first
        </h1>
        <p className="mx-auto max-w-xl text-lg text-gray-200">
          The new Pidro installs next to Classic, so you keep playing both. Your
          Classic account, games and friends stay exactly where they are.
        </p>
        <nav className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#iphone" className="rounded-full border border-white/20 px-4 py-2">
            iPhone and iPad
          </a>
          <a href="#android" className="rounded-full border border-white/20 px-4 py-2">
            Android
          </a>
          <a href="#classic" className="rounded-full border border-white/20 px-4 py-2">
            Your Classic account
          </a>
        </nav>
      </header>

      <div className="flex flex-col gap-8">
        <Card id="iphone" title="iPhone and iPad">
          <ol className="flex flex-col gap-5">
            <Step n={1}>
              Install <strong>TestFlight</strong> from the App Store. It is
              Apple&apos;s free app for trying games before they launch.
            </Step>
            <Step n={2}>
              Open the invite link on your iPhone and tap <strong>Accept</strong>,
              then <strong>Install</strong>.
              <div className="mt-4">
                {TESTFLIGHT_URL ? (
                  <StoreButton href={TESTFLIGHT_URL} label="Open the TestFlight invite" />
                ) : (
                  <p className="rounded-lg bg-white/10 px-4 py-3 text-sm text-gray-200">
                    The invite link goes live as soon as Apple approves the first
                    build, usually within a day. Check back here soon.
                  </p>
                )}
              </div>
            </Step>
            <Step n={3}>
              Look for <strong>Pidro Beta</strong> on your home screen. Classic
              stays installed as <strong>Pidro</strong>.
            </Step>
          </ol>
        </Card>

        <Card id="android" title="Android">
          <ol className="flex flex-col gap-5">
            <Step n={1}>
              Send us the email address you use for Google Play, so we can add
              you to the test.
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <StoreButton href={mailAndroid} label="Email us your Play address" />
                <span className="text-sm text-gray-300">
                  or write to <span className="select-all">{SUPPORT_EMAIL}</span>
                </span>
              </div>
            </Step>
            <Step n={2}>
              Once you are on the list, open the test link on your phone and tap{" "}
              <strong>Become a tester</strong>.
              <div className="mt-4">
                <StoreButton href={PLAY_OPT_IN_URL} label="Open the Play test link" />
              </div>
            </Step>
            <Step n={3}>
              Tap <strong>Download it on Google Play</strong> and install{" "}
              <strong>Pidro Beta</strong>. Classic stays installed next to it.
            </Step>
          </ol>
        </Card>

        <Card id="classic" title="Bring your Classic account">
          <p className="mb-4">
            Played Pidro for years? Your history comes with you. In the beta,
            open your profile and choose <strong>Claim Classic</strong>, then sign
            in the way you always did: username or email with your password, or
            Sign in with Apple, or Facebook.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-200">
            <li>Your games played, level and name come over. Nothing is deleted.</li>
            <li>Classic keeps working exactly as before.</li>
            <li>Your old name is reserved for you, so nobody else can take it.</li>
          </ul>
          <p className="mt-4 text-sm text-gray-300">
            Claiming is rolling out during the beta. If you don&apos;t see the
            button yet, play as a guest and claim later; your progress is kept.
          </p>
        </Card>

        <section className="text-center text-gray-300">
          <h2 className="mb-2 text-xl font-bold text-[#ffe230]">Found a bug?</h2>
          <p>
            On iPhone, take a screenshot and TestFlight asks if you want to send
            it to us. Anywhere else, write to{" "}
            <span className="select-all">{SUPPORT_EMAIL}</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
