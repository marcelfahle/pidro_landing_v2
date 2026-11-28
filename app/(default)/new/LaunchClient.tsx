"use client";

import type { ReactNode } from "react";
import type { Store } from "./config";
import styles from "./new.module.css";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

// One Plausible event per store tap: "Store tap" with store, lang and from.
export function StoreButton({
  href,
  store,
  lang,
  from,
  quiet,
  children,
}: {
  href: string;
  store: Store;
  lang: string;
  from: string | null;
  quiet?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`${styles.btn} ${quiet ? styles.btnQuiet : ""}`}
      rel="noopener"
      onClick={() =>
        window.plausible?.("Store tap", {
          props: { store: store === "ios" ? "app_store" : "google_play", lang, from: from ?? "none" },
        })
      }
    >
      <span className={styles.btnFace}>{children}</span>
    </a>
  );
}
