import type { Metadata } from "next";

// Google Play links here from the Pidro Beta data safety form, so the steps
// and what is kept must match the app (Profile → Delete account) and the
// server's deletion recipe (Accounts.delete_user, the 30-day guest reaper).

export const metadata: Metadata = {
  title: "Delete your Pidro account",
  description:
    "How to delete your account in Pidro and Pidro Beta, and what is deleted.",
};

const PROSE = `mx-auto max-w-[640px]
  prose prose-invert lg:prose-xl
  prose-p:text-gray-200
  prose-headings:text-[#ffe230]
  prose-ul:list-disc prose-ol:list-decimal
  prose-li:marker:text-gray-400
  prose-strong:text-gray-100
  prose-a:text-[#ffe230] hover:prose-a:text-yellow-300`;

export default function DeleteAccountPage() {
  return (
    <div className="mx-auto font-sans py-8 px-4">
      <h1 className="text-5xl font-bold text-[#ffe230] mt-6 mb-8 text-center">
        Delete your Pidro account
      </h1>
      <div className={PROSE}>
        <p>
          This page explains how to delete your account in <strong>Pidro</strong>{" "}
          and <strong>Pidro Beta</strong>, the card game apps by Oneapps Ab Oy.
        </p>

        <h2>Delete it in the app</h2>
        <ol>
          <li>
            Open Pidro and tap <strong>Profile</strong>.
          </li>
          <li>
            Tap <strong>Delete account</strong>, below Sign out.
          </li>
          <li>Confirm. Your account is deleted straight away.</li>
        </ol>

        <h2>Can&apos;t open the app?</h2>
        <p>
          Email{" "}
          <a href="mailto:marcel@pidro.online?subject=Delete%20my%20Pidro%20account">
            marcel@pidro.online
          </a>{" "}
          from the address on your account, or tell us your player name, and
          write &ldquo;Delete my account&rdquo;. We delete it within 30 days and
          reply when it&apos;s done.
        </p>

        <h2>What gets deleted</h2>
        <ul>
          <li>Your player name, email address and sign-in (password, Apple or Facebook)</li>
          <li>Your profile photo and bio</li>
          <li>Your level, badges and progress in the new Pidro</li>
          <li>Your friends, blocks and invitations</li>
        </ul>
        <p>
          Guest players who never save their account are deleted automatically
          after 30 days without playing.
        </p>

        <h2>What we keep</h2>
        <ul>
          <li>
            Your <strong>Pidro Classic</strong> account is not touched. It stays
            in Classic, and you can claim it again later.
          </li>
          <li>
            Results of finished games you played with other people, so their
            history and statistics stay complete.
          </li>
        </ul>

        <hr />

        <h2>På svenska</h2>
        <p>
          Öppna Pidro, tryck på <strong>Profil</strong> och sedan{" "}
          <strong>Radera konto</strong>. Kommer du inte in i appen? Mejla{" "}
          <a href="mailto:marcel@pidro.online?subject=Radera%20mitt%20Pidro-konto">
            marcel@pidro.online
          </a>{" "}
          så raderar vi kontot inom 30 dagar. Ditt namn, din e-post, inloggning,
          profilbild, nivå och vänner raderas. Ditt Pidro Classic-konto påverkas
          inte.
        </p>
      </div>
    </div>
  );
}
