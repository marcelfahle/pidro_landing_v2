import type { ReactNode } from "react";

// All copy for /beta, in the three languages the invite emails go out in.
// The Swedish and Finnish strings are first drafts for Marcel to review.
// UI labels in quotes must match what the person sees on their screen: the
// app's Classic button (`social.classic_question`; the app has no Finnish yet,
// so Finnish phones show the English label), TestFlight and Google Play.

export const LANGS = ["sv", "fi", "en"] as const;
export type Lang = (typeof LANGS)[number];
export type Platform = "ios" | "android" | "computer";

export interface BetaCopy {
  name: string;
  locale: string;
  langNav: string;
  metaDescription: string;
  headline: Record<Platform, string>;
  lede: string;
  stepsTitle: string;
  ios: { s1: ReactNode; getTestflight: string; s2: ReactNode; getBeta: string };
  android: { s1: ReactNode; joinBeta: string; s2: ReactNode; openPlay: string };
  s3: ReactNode;
  opens: (date: string | null) => string;
  video: { title: string; body: string; label: string };
  computer: { title: string; scan: string; pick: string; ios: string; android: string };
  notYet: { title: string; body: string };
  help: { title: string; body: (email: ReactNode) => ReactNode };
  classic: string;
  switchTo: Record<"ios" | "android", { question: string; link: string }>;
}

export const COPY: Record<Lang, BetaCopy> = {
  en: {
    name: "English",
    locale: "en-GB",
    langNav: "Language",
    metaDescription: "Install the new Pidro beta on your iPhone or Android phone in three steps.",
    headline: {
      ios: "Pidro beta for iPhone",
      android: "Pidro beta for Android",
      computer: "Pidro beta",
    },
    lede: "This is the new Pidro, built from the same game. Your Classic name, level and games come with you, and Classic keeps working.",
    stepsTitle: "Three steps",
    ios: {
      s1: (
        <>
          Install <strong>TestFlight</strong>, Apple&rsquo;s app for trying new apps.
        </>
      ),
      getTestflight: "Get TestFlight",
      s2: (
        <>
          Come back here and tap the button. TestFlight opens. Tap <strong>Accept</strong>, then{" "}
          <strong>Install</strong>.
        </>
      ),
      getBeta: "Get Pidro beta",
    },
    android: {
      s1: (
        <>
          Tap the button and choose <strong>Become a tester</strong>.
        </>
      ),
      joinBeta: "Join the beta",
      s2: <>Install Pidro Beta from Google Play.</>,
      openPlay: "Open Google Play",
    },
    s3: (
      <>
        Open <strong>Pidro Beta</strong>. Tap <strong>&ldquo;Played Pidro Classic?&rdquo;</strong> and
        sign in the way you did in Classic.
      </>
    ),
    opens: (date) => (date ? `Opens on ${date}. Check back then.` : "Opens soon. Check back then."),
    video: {
      title: "Watch it done",
      body: "The whole iPhone install in 20 seconds.",
      label: "How to install Pidro Beta on iPhone",
    },
    computer: {
      title: "Open this page on the phone you play on.",
      scan: "Point your phone’s camera at the code and tap the link that appears.",
      pick: "Or show the steps for",
      ios: "iPhone or iPad",
      android: "Android",
    },
    notYet: {
      title: "Not in the beta yet",
      body: "Chat and weekly leagues. They arrive while you play, without a new install.",
    },
    help: {
      title: "Something not working?",
      body: (email) => <>Reply to Marcel&rsquo;s email, or write to {email}.</>,
    },
    classic: "Your Pidro Classic app keeps working. Nothing there changes.",
    switchTo: {
      android: { question: "Not an iPhone?", link: "Show the Android steps" },
      ios: { question: "Not an Android phone?", link: "Show the iPhone steps" },
    },
  },
  sv: {
    name: "Svenska",
    locale: "sv-SE",
    langNav: "Språk",
    metaDescription: "Installera nya Pidro beta på din iPhone eller Android-telefon i tre steg.",
    headline: {
      ios: "Pidro beta för iPhone",
      android: "Pidro beta för Android",
      computer: "Pidro beta",
    },
    lede: "Det här är nya Pidro, byggt på samma spel. Ditt namn, din nivå och dina spel från Classic följer med, och Classic fortsätter att fungera.",
    stepsTitle: "Tre steg",
    ios: {
      s1: (
        <>
          Installera <strong>TestFlight</strong>, Apples app för att prova nya appar.
        </>
      ),
      getTestflight: "Hämta TestFlight",
      s2: (
        <>
          Kom tillbaka hit och tryck på knappen. TestFlight öppnas. Tryck <strong>Acceptera</strong>,
          sedan <strong>Installera</strong>.
        </>
      ),
      getBeta: "Hämta Pidro beta",
    },
    android: {
      s1: (
        <>
          Tryck på knappen och välj <strong>Bli testare</strong>.
        </>
      ),
      joinBeta: "Gå med i betan",
      s2: <>Installera Pidro Beta från Google Play.</>,
      openPlay: "Öppna Google Play",
    },
    s3: (
      <>
        Öppna <strong>Pidro Beta</strong>. Tryck på <strong>&rdquo;Har du spelat Pidro Classic?&rdquo;</strong>{" "}
        och logga in som du gjorde i Classic.
      </>
    ),
    opens: (date) => (date ? `Öppnar den ${date}. Titta in igen då.` : "Öppnar snart. Titta in igen då."),
    video: {
      title: "Se hur det går till",
      body: "Hela installationen på iPhone på 20 sekunder.",
      label: "Så installerar du Pidro Beta på iPhone",
    },
    computer: {
      title: "Öppna den här sidan i telefonen du spelar på.",
      scan: "Rikta telefonens kamera mot koden och tryck på länken som dyker upp.",
      pick: "Eller visa stegen för",
      ios: "iPhone eller iPad",
      android: "Android",
    },
    notYet: {
      title: "Inte med i betan än",
      body: "Chatt och veckoligor. De kommer medan du spelar, utan ny installation.",
    },
    help: {
      title: "Fungerar något inte?",
      body: (email) => <>Svara på Marcels mejl, eller skriv till {email}.</>,
    },
    classic: "Din Pidro Classic-app fungerar som vanligt. Där ändras ingenting.",
    switchTo: {
      android: { question: "Inte en iPhone?", link: "Visa stegen för Android" },
      ios: { question: "Inte en Android-telefon?", link: "Visa stegen för iPhone" },
    },
  },
  fi: {
    name: "Suomi",
    locale: "fi-FI",
    langNav: "Kieli",
    metaDescription: "Asenna uusi Pidro-beta iPhoneen tai Android-puhelimeen kolmessa vaiheessa.",
    headline: {
      ios: "Pidro-beta iPhonelle",
      android: "Pidro-beta Androidille",
      computer: "Pidro-beta",
    },
    lede: "Tämä on uusi Pidro, rakennettu samasta pelistä. Classicin nimesi, tasosi ja pelisi tulevat mukana, ja Classic toimii edelleen.",
    stepsTitle: "Kolme vaihetta",
    ios: {
      s1: (
        <>
          Asenna <strong>TestFlight</strong>, Applen sovellus uusien sovellusten kokeiluun.
        </>
      ),
      getTestflight: "Hae TestFlight",
      s2: (
        <>
          Palaa tälle sivulle ja napauta painiketta. TestFlight avautuu. Napauta{" "}
          <strong>Hyväksy</strong> ja sitten <strong>Asenna</strong>.
        </>
      ),
      getBeta: "Hae Pidro-beta",
    },
    android: {
      s1: (
        <>
          Napauta painiketta ja valitse <strong>Ryhdy testaajaksi</strong>.
        </>
      ),
      joinBeta: "Liity betaan",
      s2: <>Asenna Pidro Beta Google Playsta.</>,
      openPlay: "Avaa Google Play",
    },
    s3: (
      <>
        Avaa <strong>Pidro Beta</strong>. Napauta <strong>&rdquo;Played Pidro Classic?&rdquo;</strong> ja
        kirjaudu sisään samalla tavalla kuin Classicissa.
      </>
    ),
    opens: (date) =>
      date ? `Avautuu ${date}. Katso silloin uudelleen.` : "Avautuu pian. Katso myöhemmin uudelleen.",
    video: {
      title: "Katso, miten se tehdään",
      body: "Koko asennus iPhonelle 20 sekunnissa.",
      label: "Näin asennat Pidro Betan iPhonelle",
    },
    computer: {
      title: "Avaa tämä sivu puhelimella, jolla pelaat.",
      scan: "Osoita puhelimen kameralla koodia ja napauta näkyviin tulevaa linkkiä.",
      pick: "Tai näytä ohjeet:",
      ios: "iPhone tai iPad",
      android: "Android",
    },
    notYet: {
      title: "Ei vielä betassa",
      body: "Chatti ja viikkoliigat. Ne tulevat pelin aikana, ilman uutta asennusta.",
    },
    help: {
      title: "Eikö jokin toimi?",
      body: (email) => <>Vastaa Marcelin sähköpostiin tai kirjoita osoitteeseen {email}.</>,
    },
    classic: "Pidro Classic -sovelluksesi toimii kuten ennenkin. Siihen ei tule muutoksia.",
    switchTo: {
      android: { question: "Eikö sinulla ole iPhonea?", link: "Näytä Android-ohjeet" },
      ios: { question: "Eikö sinulla ole Android-puhelinta?", link: "Näytä iPhone-ohjeet" },
    },
  },
};
