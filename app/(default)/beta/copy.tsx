import type { ReactNode } from "react";

export type Lang = "en" | "sv";

export interface BetaCopy {
  badge: string;
  title: string;
  lede: string;
  ctaIphone: string;
  ctaAndroid: string;
  videoTitle: string;
  videoBody: string;
  videoLabel: string;
  iphoneSub: string;
  s1: ReactNode;
  getTestflight: string;
  s2: ReactNode;
  joinBeta: string;
  reviewNote: string;
  s3: ReactNode;
  androidSub: string;
  a1: ReactNode;
  joinPlay: string;
  a2: ReactNode;
  classicTitle: string;
  classicBody: ReactNode;
  perks: string[];
  classicNote: string;
  bugTitle: string;
  bugBody: string;
  switchLabel: string;
}

export const COPY: Record<Lang, BetaCopy> = {
  en: {
    badge: "Beta · open",
    title: "Play the new Pidro first",
    lede: "For now it sits next to Classic on your phone. At launch it replaces Classic, and your account comes with you.",
    ctaIphone: "Get it on iPhone",
    ctaAndroid: "Get it on Android",
    videoTitle: "20 seconds. That's it.",
    videoBody: "Here's the whole iPhone install, start to finish. Sound on if you like a little music.",
    videoLabel: "How to install Pidro Beta on iPhone",
    iphoneSub: "Through TestFlight",
    s1: (
      <>
        Install <strong>TestFlight</strong>, Apple&apos;s free app for test games.
      </>
    ),
    getTestflight: "Get TestFlight",
    s2: (
      <>
        Open your invite on your iPhone. Tap <strong>Accept</strong>, then <strong>Install</strong>.
      </>
    ),
    joinBeta: "Join the beta",
    reviewNote: "Apple is checking the first build. The link goes live here soon.",
    s3: (
      <>
        Open <strong>Pidro Beta</strong>. Classic stays installed.
      </>
    ),
    androidSub: "Through Google Play",
    a1: (
      <>
        Open your invite on your phone and tap <strong>Become a tester</strong>. Use the Google
        account we invited.
      </>
    ),
    joinPlay: "Join on Google Play",
    a2: (
      <>
        Tap <strong>Download it on Google Play</strong>. Classic stays installed.
      </>
    ),
    classicTitle: "Played Classic? Bring your history.",
    classicBody: (
      <>
        In the app, tap <strong>Claim Classic</strong> and sign in like you always did.
      </>
    ),
    perks: [
      "Your games, level and name come over.",
      "Classic keeps working until launch day.",
      "Your name is saved for you.",
    ],
    classicNote: "No button yet? Play as a guest and claim later. You keep your progress.",
    bugTitle: "Found a bug?",
    bugBody: "Take a screenshot in the app and send it, or write to",
    switchLabel: "Language",
  },
  sv: {
    badge: "Beta · öppen",
    title: "Spela nya Pidro först",
    lede: "Just nu ligger den bredvid Classic i telefonen. När den lanseras ersätter den Classic, och ditt konto följer med.",
    ctaIphone: "Hämta på iPhone",
    ctaAndroid: "Hämta på Android",
    videoTitle: "20 sekunder. Klart.",
    videoBody: "Så här installerar du på iPhone, från början till slut. Slå på ljudet om du gillar lite musik.",
    videoLabel: "Så installerar du Pidro Beta på iPhone",
    iphoneSub: "Via TestFlight",
    s1: (
      <>
        Installera <strong>TestFlight</strong>, Apples gratisapp för testspel.
      </>
    ),
    getTestflight: "Hämta TestFlight",
    s2: (
      <>
        Öppna inbjudan på din iPhone. Tryck <strong>Acceptera</strong>, sedan{" "}
        <strong>Installera</strong>.
      </>
    ),
    joinBeta: "Gå med i betan",
    reviewNote: "Apple granskar den första versionen. Länken dyker upp här snart.",
    s3: (
      <>
        Öppna <strong>Pidro Beta</strong>. Classic finns kvar.
      </>
    ),
    androidSub: "Via Google Play",
    a1: (
      <>
        Öppna inbjudan i telefonen och tryck <strong>Bli testare</strong>. Använd Google-kontot vi
        bjöd in.
      </>
    ),
    joinPlay: "Gå med på Google Play",
    a2: (
      <>
        Tryck <strong>Ladda ned på Google Play</strong>. Classic finns kvar.
      </>
    ),
    classicTitle: "Spelat Classic? Ta med din historik.",
    classicBody: (
      <>
        Tryck på <strong>Claim Classic</strong> i appen och logga in som du alltid gjort.
      </>
    ),
    perks: [
      "Dina spel, din nivå och ditt namn följer med.",
      "Classic fungerar ända fram till lanseringen.",
      "Ditt namn är reserverat åt dig.",
    ],
    classicNote: "Ingen knapp än? Spela som gäst och flytta över senare. Du behåller allt du spelat.",
    bugTitle: "Hittat en bugg?",
    bugBody: "Ta en skärmbild i appen och skicka den, eller skriv till",
    switchLabel: "Språk",
  },
};
