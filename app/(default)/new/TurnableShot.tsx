"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import styles from "./new.module.css";

const TURN_MS = 420;
// Upright, the phone is this much taller than the column is wide.
const UPRIGHT_SCALE = 1.25;

// The table on a phone lying on its side. With a portrait screenshot, a small
// button turns the phone upright and back: the new app plays both ways.
export function TurnableShot({
  side,
  upright,
  alt,
  turnLabel,
}: {
  side: StaticImageData;
  upright: StaticImageData | null;
  alt: string;
  turnLabel: string;
}) {
  const [isUpright, setUpright] = useState(false);
  const [turning, setTurning] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  function turn() {
    const el = box.current;
    const f = frame.current;
    if (!el || !f || !upright || turning) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      setUpright(!isUpright);
      return;
    }
    // The box grows or shrinks to the phone's height after the turn, so the page
    // below moves along with it instead of jumping at the end.
    const from = el.offsetHeight;
    const target = isUpright ? (el.offsetWidth * side.height) / side.width + 6 : el.offsetWidth * UPRIGHT_SCALE;
    const scale = isUpright ? 1 / UPRIGHT_SCALE : UPRIGHT_SCALE;
    setTurning(true);
    el.animate([{ height: `${from}px` }, { height: `${target}px` }], {
      duration: TURN_MS,
      easing: "cubic-bezier(0.65, 0, 0.35, 1)",
      fill: "forwards",
    });
    const spin = f.animate(
      [{ transform: "none" }, { transform: `rotate(${isUpright ? 90 : -90}deg) scale(${scale})` }],
      { duration: TURN_MS, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" },
    );
    spin.onfinish = () => {
      setUpright(!isUpright);
      setTurning(false);
      requestAnimationFrame(() => {
        spin.cancel();
        el.getAnimations().forEach((a) => a.cancel());
        el.style.height = "";
      });
    };
  }

  const img = isUpright && upright ? upright : side;

  return (
    <figure className={styles.shot}>
      <div ref={box} className={styles.shotBox}>
        <div ref={frame} className={`${styles.bezel} ${isUpright ? styles.bezelTall : styles.bezelWide}`}>
          <Image
            key={isUpright ? "up" : "side"}
            src={img}
            alt={alt}
            placeholder="blur"
            sizes={isUpright ? "(max-width: 600px) 60vw, 300px" : "(max-width: 600px) 100vw, 560px"}
            quality={70}
          />
        </div>
      </div>
      {upright && (
        <button
          type="button"
          className={styles.turn}
          onClick={turn}
          aria-pressed={isUpright}
          aria-label={turnLabel}
          title={turnLabel}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="8" y="3" width="10" height="16" rx="2.2" stroke="currentColor" strokeWidth="2" />
            <path d="M3.5 13.5a8 8 0 0 0 5 6.6M3.2 17.6l.3 3.2 3-1.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </figure>
  );
}
