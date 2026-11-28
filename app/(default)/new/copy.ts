// All words on /new. Marcel's English; his Swedish where he gave it, the rest drafts
// for him to proofread. Besides his copy: store names, alt text, the language nav
// label and the turn button's label.

export const LANGS = ["en", "sv"] as const;
export type Lang = (typeof LANGS)[number];
export type Phase = "before" | "after";

export interface LaunchCopy {
  name: string;
  locale: string;
  langNav: string;
  headline: Record<Phase, string>;
  intro: Record<Phase, string>;
  todo: { title: string; answer: string; items: [string, string, string] };
  signIn: string;
  isNew: { title: string; items: [string, string, string, string] };
  update: string;
  signOff: string;
  screenshotAlt: string;
  turn: string;
}

export const COPY: Record<Lang, LaunchCopy> = {
  en: {
    name: "English",
    locale: "en-GB",
    langNav: "Language",
    headline: {
      before: "The new Pidro arrives on December 1",
      after: "The new Pidro is here",
    },
    intro: {
      before:
        "This year I built a new Pidro, together with the players who tested it. On Tuesday, December 1, the app on your phone becomes the new one.",
      after: "This year I built a new Pidro, together with the players who tested it. It is out today.",
    },
    todo: {
      title: "What do I have to do?",
      answer: "Just keep playing.",
      items: [
        "It is the same app. It updates like any other update.",
        "Sign in the way you always have. Your name, your games and your friends come with you.",
        "If you have Premium, it comes with you. You pay nothing new.",
      ],
    },
    signIn: "Sign in the way you always have. Your name, your games and your friends come with you.",
    isNew: {
      title: "What is new",
      items: [
        "Play with your phone upright or on its side.",
        "A game no longer dies when someone drops out. A bot holds the seat until they are back.",
        "Finnish rules and Louisiana rules, each with its own tables.",
        "Friends. Add your partner once and sit down together.",
      ],
    },
    update: "Already have Pidro on your phone? Open the store and tap Update.",
    signOff: "Marcel from Pidro",
    screenshotAlt: "A game at the table in the new Pidro",
    turn: "Turn the phone",
  },
  sv: {
    name: "Svenska",
    locale: "sv-SE",
    langNav: "Språk",
    headline: {
      before: "Nya Pidro kommer den 1 december",
      after: "Nya Pidro är här",
    },
    intro: {
      before:
        "I år har jag byggt ett nytt Pidro, tillsammans med spelarna som testade det. Tisdagen den 1 december blir appen på din telefon den nya.",
      after: "I år har jag byggt ett nytt Pidro, tillsammans med spelarna som testade det. Den nya versionen är ute i dag.",
    },
    todo: {
      title: "Vad behöver jag göra?",
      answer: "Bara spela vidare.",
      items: [
        "Det är samma app. Den uppdateras som vilken uppdatering som helst.",
        "Logga in som du alltid har gjort. Ditt namn, dina spel och dina vänner följer med.",
        "Har du Premium följer det också med. Du betalar inget nytt.",
      ],
    },
    signIn: "Logga in som du alltid har gjort. Ditt namn, dina spel och dina vänner följer med.",
    isNew: {
      title: "Det här är nytt",
      items: [
        "Spela med telefonen på höjden eller på bredden.",
        "Ett spel dör inte längre när någon faller bort. En bot håller platsen tills spelaren är tillbaka.",
        "Finländska regler och Louisiana-regler, med egna bord.",
        "Vänner. Lägg till din partner en gång och sätt er vid samma bord.",
      ],
    },
    update: "Har du redan Pidro på telefonen? Öppna butiken och tryck på Uppdatera.",
    signOff: "Marcel från Pidro",
    screenshotAlt: "En giv vid bordet i nya Pidro",
    turn: "Vänd telefonen",
  },
};

export const STORE_NAMES = { ios: "App Store", android: "Google Play" } as const;
