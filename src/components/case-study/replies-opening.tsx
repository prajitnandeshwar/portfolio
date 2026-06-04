"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Small inline "Replies" pill that lives in the case study prose. On
// scroll into view the envelope auto-unfolds once from mail-01 (closed)
// to mail-04 (opened). Clicking the pill replays the transition by
// toggling state, so it doubles as the replay control without adding
// extra chrome. Under prefers-reduced-motion the open state shows
// directly with no animation.

const HOLD_BEFORE_OPEN_MS = 500;
const TRANSITION_DURATION = 0.45; // seconds, fast and small per "flair moment"
const EASE = [0.22, 1, 0.36, 1] as const;

const ICON_PX = 16;

export function RepliesOpening() {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { amount: 0.6, once: true });
  const reduceMotion = useReducedMotion();

  const [isOpen, setIsOpen] = useState(false);
  const autoPlayed = useRef(false);

  // Auto-play once when the pill scrolls into view.
  useEffect(() => {
    if (!inView || autoPlayed.current) return;
    autoPlayed.current = true;
    if (reduceMotion) {
      setIsOpen(true);
      return;
    }
    const timer = setTimeout(() => setIsOpen(true), HOLD_BEFORE_OPEN_MS);
    return () => clearTimeout(timer);
  }, [inView, reduceMotion]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setIsOpen((o) => !o)}
      aria-label={isOpen ? "Close replies" : "Open replies"}
      aria-pressed={isOpen}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border rounded-full text-[13px] text-[#1F1F1E] transition-colors duration-200 ease-out hover:border-[#D97706] cursor-pointer"
      style={{
        borderColor: "var(--border)",
        margin: "0.5rem 0",
      }}
    >
      <span
        aria-hidden
        className="relative inline-block"
        style={{ width: ICON_PX, height: ICON_PX, margin: 0 }}
      >
        {/* Closed envelope (mail-01) */}
        <motion.img
          src="/work/notice-tracker/replies-closed.svg"
          alt=""
          width={ICON_PX}
          height={ICON_PX}
          initial={false}
          animate={{
            opacity: isOpen ? 0 : 1,
            y: isOpen ? 1 : 0,
            scale: isOpen ? 0.92 : 1,
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: TRANSITION_DURATION, ease: EASE }
          }
          style={{ position: "absolute", inset: 0, margin: 0 }}
        />

        {/* Opened envelope (mail-04). Starts a touch above and small,
            slides down and scales up as it crossfades in. */}
        <motion.img
          src="/work/notice-tracker/replies-open.svg"
          alt=""
          width={ICON_PX}
          height={ICON_PX}
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -2,
            scale: isOpen ? 1 : 0.9,
          }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: TRANSITION_DURATION, ease: EASE }
          }
          style={{ position: "absolute", inset: 0, margin: 0 }}
        />
      </span>
      <span style={{ margin: 0 }}>Replies</span>
    </button>
  );
}
