"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import styles from "./beta.module.css";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

// Counts one open of an invite link. The code is random and means nothing on its own;
// only Marcel's invite list knows whose it is.
export function InviteOpened({ invite, lang }: { invite: string; lang: string }) {
  useEffect(() => {
    window.plausible?.("beta_invite_open", { props: { i: invite, lang } });
  }, [invite, lang]);
  return null;
}

// A store button. `event` counts the taps that matter: who got through the email.
export function StoreButton({
  href,
  event,
  lang,
  invite,
  children,
}: {
  href: string;
  event?: string;
  lang: string;
  invite?: string | null;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={styles.btn}
      rel="noopener"
      onClick={
        event
          ? () => window.plausible?.(event, { props: invite ? { lang, i: invite } : { lang } })
          : undefined
      }
    >
      <span className={styles.btnFace}>
        {children}
        <svg className={styles.btnArrow} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h13m-5-6 6 6-6 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

// iPadOS asks for the desktop site, so the server sees a Mac. A Mac with touch is an iPad.
export function IpadCheck({ href }: { href: string }) {
  const router = useRouter();
  useEffect(() => {
    if (navigator.maxTouchPoints > 1) router.replace(href);
  }, [href, router]);
  return null;
}

export function InstallVideo({
  lang,
  title,
  body,
  label,
}: {
  lang: string;
  title: string;
  body: string;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open) video.current?.play().catch(() => {});
  }, [open]);

  if (open) {
    return (
      <div className={styles.videoOpen}>
        <div className={styles.phone}>
          <video
            ref={video}
            controls
            playsInline
            preload="auto"
            poster={`/beta/poster-${lang}.jpg`}
            aria-label={label}
          >
            <source src={`/beta/pidro-beta-ios-${lang}.mp4`} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }

  return (
    <button type="button" className={styles.videoRow} onClick={() => setOpen(true)}>
      <span className={styles.videoThumb} style={{ backgroundImage: `url(/beta/poster-${lang}.jpg)` }}>
        <span className={styles.play} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
        </span>
      </span>
      <span className={styles.videoText}>
        <strong>{title}</strong>
        <span>{body}</span>
      </span>
    </button>
  );
}
