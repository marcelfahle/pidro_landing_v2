import type { ReactNode } from "react";

// All copy for /beta, in the three languages the invite emails go out in.
// The Swedish and Finnish strings are first drafts for Marcel to review.
// UI labels in quotes must match what the person sees on their screen: the
// app's first-screen button (`social.classic_question`; the app has no Finnish yet,
// so Finnish phones show the English label), TestFlight and Google Play.
// Players have never heard the word "Classic"; say "the Pidro you play now".

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
  android: { s1: ReactNode; install: string };
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
    lede: "This is the new Pidro, built from the same game. Your Pidro name, level and games come with you, and the Pidro app you play now keeps working.",
    stepsTitle: "Three steps",
    ios: {
      s1: (
        <>
          Install <strong>TestFlight</strong>. It&rsquo;s a free app from Apple that you need for test versions.
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
          Tap the button. Google Play opens. Tap <strong>Install</strong>.
        </>
      ),
      install: "Get Pidro Beta",
    },
    s3: (
      <>
        Open <strong>Pidro Beta</strong>. At the bottom, tap <strong>&ldquo;Already play Pidro?&rdquo;</strong>{" "}
        and sign in the way you always do.
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
    classic: "Your old Pidro app keeps working. Nothing there changes.",
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
    lede: "Det här är nya Pidro, byggt på samma spel. Ditt Pidro-namn, din nivå och dina spel följer med, och Pidro-appen du spelar nu fungerar som vanligt.",
    stepsTitle: "Tre steg",
    ios: {
      s1: (
        <>
          Installera <strong>TestFlight</strong>. Det är en gratis app från Apple som behövs för testversioner.
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
          Tryck på knappen. Google Play öppnas. Tryck <strong>Installera</strong>.
        </>
      ),
      install: "Hämta Pidro Beta",
    },
    s3: (
      <>
        Öppna <strong>Pidro Beta</strong>. Längst ner, tryck på <strong>&rdquo;Spelar du redan Pidro?&rdquo;</strong>{" "}
        och logga in som du alltid gör.
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
    classic: "Din gamla Pidro-app fungerar som vanligt. Där ändras ingenting.",
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
    lede: "Tämä on uusi Pidro, rakennettu samasta pelistä. Pidro-nimesi, tasosi ja pelisi tulevat mukana, ja nykyinen Pidro-sovelluksesi toimii edelleen.",
    stepsTitle: "Kolme vaihetta",
    ios: {
      s1: (
        <>
          Asenna <strong>TestFlight</strong>. Se on Applen ilmainen sovellus, jota testiversiot tarvitsevat.
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
          Napauta painiketta. Google Play avautuu. Napauta <strong>Asenna</strong>.
        </>
      ),
      install: "Hae Pidro Beta",
    },
    s3: (
      <>
        Avaa <strong>Pidro Beta</strong>. Napauta alareunasta <strong>&rdquo;Already play Pidro?&rdquo;</strong>{" "}
        ja kirjaudu sisään niin kuin aina.
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
    classic: "Vanha Pidro-sovelluksesi toimii kuten ennenkin. Siihen ei tule muutoksia.",
    switchTo: {
      android: { question: "Eikö sinulla ole iPhonea?", link: "Näytä Android-ohjeet" },
      ios: { question: "Eikö sinulla ole Android-puhelinta?", link: "Näytä iPhone-ohjeet" },
    },
  },
};
