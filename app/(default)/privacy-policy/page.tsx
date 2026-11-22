import type { Metadata } from "next";
import Link from "next/link";

// The app (Settings → Privacy), the invite pages and both store listings link
// here, and the App Store privacy labels and Play Data safety form are filled
// in from this page. Keep it in step with the code in pidro_backend and
// pidro_frontend (data inventory of 2026-11-22, PID-443) when either changes.

export const metadata: Metadata = {
  title: "Privacy Policy | Pidro",
  description:
    "What Pidro collects, why, who helps us run it, how long we keep it, and how to delete it.",
};

const PROSE = `mx-auto max-w-[640px]
  prose prose-invert lg:prose-xl
  prose-p:text-gray-200
  prose-headings:text-[#ffe230]
  prose-ul:list-disc prose-ol:list-decimal
  prose-li:marker:text-gray-400
  prose-strong:text-gray-100
  prose-a:text-[#ffe230] hover:prose-a:text-yellow-300
  prose-td:align-top`;

const CONTACT = "marcel@pidro.online";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto font-sans py-8 px-4">
      <h1 className="text-5xl font-bold text-[#ffe230] mt-6 mb-8 text-center">
        Privacy Policy
      </h1>
      <div className={PROSE}>
        <p>
          <em>Last updated 22 November 2026.</em>
        </p>
        <p>
          This policy covers the <strong>Pidro</strong> and{" "}
          <strong>Pidro Beta</strong> apps for iPhone, iPad and Android, and the
          website pidro.online. It explains what we collect, why, who helps us
          run the game, how long we keep it and what you can ask us to do. We
          don&apos;t sell your data, and we don&apos;t use it to show you
          personalised ads.
        </p>

        <h2>Who we are</h2>
        <p>
          Pidro is made by <strong>Oneapps Ab Oy</strong> (business ID
          2760418-9), Torparvägen 15, 64200 Närpes, Finland. We are the
          controller of your personal data. For anything about privacy, email{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>. You will get an answer
          from Marcel, who builds the game.
        </p>

        <h2>What we collect</h2>

        <h3>Your account</h3>
        <ul>
          <li>
            Your <strong>player name</strong>, and optionally a display name, a
            short bio and a profile photo. We re-save photos as JPEG and remove
            their metadata, such as location.
          </li>
          <li>
            Your <strong>email address</strong> and a scrambled (hashed) copy
            of your password, if you sign up with email.
          </li>
          <li>
            If you sign in with <strong>Apple</strong>: an account number from
            Apple and your email address, which may be a private relay address
            from Apple. We also keep an encrypted Apple token, so that we can
            tell Apple to disconnect Pidro when you delete your account. We
            don&apos;t ask Apple for your name.
          </li>
          <li>
            If you sign in with <strong>Facebook</strong>: your Facebook
            account number for Pidro and your email address. We use Facebook
            only for signing in. Pidro sends no app events or advertising data
            to Facebook.
          </li>
          <li>
            Your <strong>age group</strong> (13–17 or 18 and over), the date
            you chose it, and which version of the Terms you accepted. We
            don&apos;t ask for your birthday.
          </li>
          <li>
            If you play as a <strong>guest</strong>: a random number for your
            installation of the app, so that the guest account stays yours on
            that phone.
          </li>
        </ul>

        <h3>Playing</h3>
        <ul>
          <li>
            Your level, points, badges, rating, statistics, leagues and the
            results of games you play.
          </li>
          <li>
            A full record of each game, used to settle problems and complaints.
          </li>
          <li>
            Connection quality during games: when a seat drops or reconnects,
            the app version, platform and network type. We use it to find and
            fix disconnections.
          </li>
          <li>
            Game reports the app sends when something goes wrong at a table.
            These hold coded events only, never free text.
          </li>
          <li>Your friends, the players you block, and your invitations.</li>
        </ul>

        <h3>Table talk and reports</h3>
        <ul>
          <li>
            Faces and preset words you send at the table, and typed messages
            for registered players aged 18 and over, are shown to the players
            at that table and are <strong>not stored</strong>. They disappear
            when the game ends.
          </li>
          <li>
            If someone <strong>reports</strong> a player, we store the report:
            the reason, who reported whom, the game, and the reported
            player&apos;s recent messages at that table.
          </li>
        </ul>

        <h3>When you write to us</h3>
        <ul>
          <li>
            Messages you send with <strong>Tell us</strong> in the app, with
            the email address for our reply, and your app version, phone model
            and operating-system version, so that we can reproduce problems.
          </li>
          <li>Emails you send us, and our replies.</li>
        </ul>

        <h3>Purchases</h3>
        <p>
          Apple or Google handles payment. We never see your card details. We
          receive and keep what you bought (for example Premium), when it
          started and ends, and the store&apos;s purchase notices.
        </p>

        <h3>Your device</h3>
        <ul>
          <li>
            A <strong>push token</strong>, if you allow notifications, with
            your platform and app version.
          </li>
          <li>
            Your <strong>IP address</strong>, which we use briefly in memory
            to block abuse. We don&apos;t store it with your account.
          </li>
        </ul>

        <h2>Why we use it</h2>
        <table>
          <thead>
            <tr>
              <th>What for</th>
              <th>Legal basis (GDPR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Running your account, games, friends, leagues and purchases
              </td>
              <td>Contract: we need it to provide the game you asked for</td>
            </tr>
            <tr>
              <td>
                Keeping games fair, stopping cheating and abuse, handling
                reports
              </td>
              <td>Legitimate interests: a safe and fair game for everyone</td>
            </tr>
            <tr>
              <td>
                Crash reports, connection data and app usage statistics, to fix
                bugs and improve Pidro
              </td>
              <td>Legitimate interests: a game that works</td>
            </tr>
            <tr>
              <td>Account emails, such as password resets and sign-in codes</td>
              <td>Contract</td>
            </tr>
            <tr>
              <td>
                Occasional emails about Pidro news, with a one-click unsubscribe
                link in every one
              </td>
              <td>
                Legitimate interests (you are a player of Pidro); you can stop
                them at any time
              </td>
            </tr>
            <tr>
              <td>Push notifications</td>
              <td>Your consent, given in your phone&apos;s settings</td>
            </tr>
            <tr>
              <td>Rewarded ads</td>
              <td>
                Your choice to watch one; in the EEA, the UK and Switzerland,
                also the consent you give in Google&apos;s form
              </td>
            </tr>
            <tr>
              <td>Bookkeeping for purchases</td>
              <td>Legal obligation</td>
            </tr>
          </tbody>
        </table>

        <h2>Ads</h2>
        <p>
          Pidro shows <strong>rewarded video ads only</strong>, and only when
          you choose to watch one. Ads are shown only to players who said they
          are 18 or over and don&apos;t have Premium. There are no banners and
          no ads in the middle of a game.
        </p>
        <p>
          Ads come from <strong>Google AdMob</strong>. We ask for{" "}
          <strong>non-personalised ads</strong> only, and we don&apos;t ask to
          track you across other apps. Google still receives your
          device&apos;s advertising ID and IP address to deliver the ad, limit
          how often you see it, measure it and prevent fraud. In the EEA, the
          UK and Switzerland, Google&apos;s consent form appears before the
          first ad, and you can change your choice later under Settings →
          Privacy options. You can also reset or delete your advertising ID in
          your phone&apos;s settings.
        </p>

        <h2>Who helps us run Pidro</h2>
        <p>
          These companies process data for us under data processing terms.
          They may use it only to provide their service to us.
        </p>
        <ul>
          <li>
            <strong>Hetzner</strong> (Helsinki, Finland): our server and
            database, including backups.
          </li>
          <li>
            <strong>PostHog</strong> (EU): app usage statistics, such as which
            screens are opened and when games start and finish. It receives
            your account number, player name, account type, app language and
            device type. We don&apos;t record sessions.
          </li>
          <li>
            <strong>Sentry</strong> (USA): crash and error reports with your
            app version, device model and operating system. We remove names,
            emails and other personal details from server error reports before
            they are sent.
          </li>
          <li>
            <strong>Logflare</strong> (USA): server logs, which include your
            account number and the table you played at. Kept for 3 days.
          </li>
          <li>
            <strong>RevenueCat</strong> (USA): checks your purchases with Apple
            and Google. It receives your account number and your purchases.
          </li>
          <li>
            <strong>Expo</strong> (USA), with Apple Push Notification service
            and Google Firebase Cloud Messaging: delivers push notifications.
          </li>
          <li>
            <strong>Helo</strong>: sends our emails.
          </li>
          <li>
            <strong>Vercel</strong> (global): hosts this website and forwards
            invitation links to our server.
          </li>
        </ul>
        <p>
          <strong>Apple</strong>, <strong>Google</strong> and{" "}
          <strong>Meta</strong> (Facebook) are independent controllers when
          you buy in their stores, use their sign-in, or watch an ad from
          Google. Their own privacy policies apply.
        </p>
        <p>
          Where data goes outside the EEA, for example to the USA, it is
          protected by the EU–US Data Privacy Framework where the company is
          certified, or by the EU Standard Contractual Clauses.
        </p>
        <p>
          Other players see your player name, photo, bio, level, badges and
          statistics, and that you are online or at a table. We share data
          with authorities only when the law requires it.
        </p>

        <h2>Invitations</h2>
        <p>
          If you tap the app-store button on a Pidro invitation, Pidro may use
          your network address, mobile platform and operating-system major
          version, a broad screen-size category, language and time zone to
          take you to that invitation when you first open the installed app.
          On Android, the Play Store&apos;s install referrer is used for the
          same thing.
        </p>
        <p>
          This hint is kept only in our server&apos;s memory, in scrambled
          form. It is deleted when it is used, when the server restarts, or
          after 30 minutes at the latest. We don&apos;t send it to any
          attribution company, and we don&apos;t use your advertising ID for
          it.
        </p>

        <h2>Children</h2>
        <p>
          Pidro is for players aged <strong>13 and over</strong>. The app asks
          your age group when you first open it, and doesn&apos;t let anyone
          younger play. Players aged 13–17 see no ads and can&apos;t type
          messages at the table, only send faces and preset words. If you
          believe a child under 13 has an account, write to us and we will
          delete it.
        </p>

        <h2>How long we keep it</h2>
        <ul>
          <li>
            <strong>Your account</strong>: until you delete it. Guest accounts
            that haven&apos;t played for 30 days are deleted automatically.
          </li>
          <li>
            <strong>Full game records</strong> and{" "}
            <strong>game reports</strong>: 30 days after the game.
          </li>
          <li>
            <strong>Server logs</strong>: 3 days at Logflare; on our server
            until they rotate out, usually within weeks.
          </li>
          <li>
            <strong>Backups</strong>: 30 days.
          </li>
          <li>
            <strong>Feedback and reports</strong>: as long as we need them to
            handle the matter and improve the game. Ask us and we delete them.
          </li>
          <li>
            <strong>Purchase records</strong>: as long as bookkeeping law
            requires.
          </li>
        </ul>

        <h2>Deleting your account</h2>
        <p>
          In the app, open <strong>Profile</strong> and tap{" "}
          <strong>Delete account</strong>. It happens straight away. If you
          can&apos;t open the app, see{" "}
          <Link href="/delete-account">pidro.online/delete-account</Link>.
        </p>
        <p>
          We delete your player name, email, sign-in, photo, bio, progress,
          badges, friends, blocks, leagues and push tokens. If you used Apple
          sign-in, we tell Apple to disconnect Pidro.
        </p>
        <p>
          Some records stay without anything that leads back to you: the
          results and statistics of games you played with others (so their
          history stays complete), connection statistics, ad and purchase
          records, and feedback you sent (we remove your email from it). They
          keep only an account number that no longer belongs to anyone. Full
          game records are deleted after 30 days as usual, and the backups
          roll over within 30 days. To have your data removed from PostHog or
          RevenueCat as well, email us.
        </p>
        <p>
          If you signed in with Facebook, you can also remove Pidro in your
          Facebook settings. Facebook then tells us, and we delete your
          account.
        </p>

        <h2>Pidro Classic</h2>
        <p>
          The earlier Pidro app (Pidro Classic) keeps its accounts on its own
          server. If you bring your Classic account into the new Pidro, we
          copy your Classic player name, level, points, results, badges,
          friends, blocks and Premium status, and we use your Classic email or
          Facebook link to confirm it&apos;s yours. Deleting your new account
          leaves your Classic account untouched. To delete your Classic data,
          email us.
        </p>

        <h2>This website</h2>
        <p>
          pidro.online uses no analytics or advertising cookies. If you sign
          in on the website, it sets one cookie that keeps you signed in. Our
          host Vercel processes your IP address to deliver the pages.
        </p>

        <h2>Your rights</h2>
        <p>You can ask us to:</p>
        <ul>
          <li>give you a copy of your data;</li>
          <li>correct it;</li>
          <li>delete it;</li>
          <li>limit how we use it, or object to a use based on our interests;</li>
          <li>send your data to you or another service in a usable format.</li>
        </ul>
        <p>
          Email <a href={`mailto:${CONTACT}`}>{CONTACT}</a> from the address
          on your account, or tell us your player name. We may ask you to
          confirm the account is yours. We reply within one month.
        </p>
        <p>
          You can also complain to the Finnish Data Protection Ombudsman (
          <a href="https://tietosuoja.fi/en">tietosuoja.fi</a>) or the data
          protection authority where you live.
        </p>

        <h2>Changes</h2>
        <p>
          When we change this policy, we update the date at the top. If the
          change is important, we tell you in the app first.
        </p>

        <hr />

        <h2>På svenska, i korthet</h2>
        <p>
          Pidro görs av Oneapps Ab Oy i Närpes. Vi sparar ditt spelarnamn,
          e-post, inloggning, profilbild, åldersgrupp, framsteg, vänner och
          köp, för att spelet ska fungera. Vi säljer aldrig dina uppgifter.
          Reklam visas bara om du själv väljer att titta, bara för spelare
          över 18 utan Premium, och den är aldrig personanpassad.
          Chattmeddelanden sparas inte. Vår server finns i Helsingfors. Du
          raderar ditt konto under <strong>Profil → Radera konto</strong>.
          Frågor:{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>
      </div>
    </div>
  );
}
