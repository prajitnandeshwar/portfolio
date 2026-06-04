"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 7 scattered notice cards. Each lands into place on scroll-in with a slight
// overshoot, in an out-of-order sequence (1, 5, 2, 6, 3, 7, 4) so the pile
// reads as chaotic rather than left-to-right sequential.

type Card = {
  label: "NOTICE" | "ORDER" | "INTIMATION";
  ref: string;
  amount: string;
  date: string;
  overdue?: boolean;
  stamp?: { text: string; color: "red" | "amber" };
  pos: { top: string; left: string; rotate: number };
  stampRotate: number;
};

const CARDS: Card[] = [
  {
    label: "NOTICE",
    ref: "ZD3311242421",
    amount: "₹2,23,99,808",
    date: "Due 12 Mar 2024",
    overdue: true,
    stamp: { text: "OVERDUE", color: "red" },
    pos: { top: "8%", left: "4%", rotate: -3 },
    stampRotate: 10,
  },
  {
    label: "ORDER",
    ref: "GST/2024/14563",
    amount: "₹45,67,123",
    date: "Due 28 Feb 2024",
    overdue: true,
    stamp: { text: "OVERDUE", color: "red" },
    pos: { top: "18%", left: "28%", rotate: 2 },
    stampRotate: -8,
  },
  {
    label: "INTIMATION",
    ref: "DRC-01/45678",
    amount: "₹12,45,890",
    date: "Due 30 Apr 2024",
    stamp: { text: "PENDING", color: "amber" },
    pos: { top: "30%", left: "52%", rotate: -2 },
    stampRotate: 12,
  },
  {
    label: "NOTICE",
    ref: "ZD33189401",
    amount: "₹89,23,456",
    date: "Due 15 May 2024",
    pos: { top: "12%", left: "70%", rotate: 4 },
    stampRotate: 0,
  },
  {
    label: "ORDER",
    ref: "GST/2024/22890",
    amount: "₹3,12,45,000",
    date: "Due 02 Mar 2024",
    overdue: true,
    stamp: { text: "OVERDUE", color: "red" },
    pos: { top: "48%", left: "16%", rotate: 3 },
    stampRotate: -10,
  },
  {
    label: "NOTICE",
    ref: "ZD33125028",
    amount: "₹56,78,234",
    date: "Due 20 Mar 2024",
    stamp: { text: "URGENT", color: "red" },
    pos: { top: "52%", left: "44%", rotate: -4 },
    stampRotate: 9,
  },
  {
    label: "INTIMATION",
    ref: "DRC-03/89102",
    amount: "₹78,90,123",
    date: "Due 18 Apr 2024",
    stamp: { text: "NEW", color: "amber" },
    pos: { top: "40%", left: "68%", rotate: 1 },
    stampRotate: -11,
  },
];

// Animation order (brief): 1, 5, 2, 6, 3, 7, 4. 1-indexed → 0-indexed.
const ANIM_ORDER = [0, 4, 1, 5, 2, 6, 3] as const;
// Map card index → its slot in the animation sequence.
const SLOT_OF_CARD: Record<number, number> = ANIM_ORDER.reduce(
  (acc, cardIdx, slot) => {
    acc[cardIdx] = slot;
    return acc;
  },
  {} as Record<number, number>,
);

const STAGGER = 0.22; // seconds between cards
const OVERSHOOT_EASE = [0.34, 1.56, 0.64, 1] as const;

// Per-card float timing. Each entry: [duration in seconds, negative delay in
// seconds]. Durations in the 8-14s range, deliberately long so the motion is
// peripheral, not foreground. Distinct values + negative delays ensure no two
// cards visit the same phase at the same moment.
const FLOAT_TIMING: ReadonlyArray<[number, number]> = [
  [9.2,  -1.4],
  [12.6, -5.8],
  [10.3, -2.7],
  [13.5, -7.5],
  [8.8,  -0.9],
  [11.7, -4.1],
  [14.1, -6.3],
];

export function ChaosNoticesPile() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const reduceMotion = useReducedMotion();

  // ?static=1 escape hatch so headless screenshots can verify the layout.
  const [forceStatic, setForceStatic] = useState(false);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("static") === "1"
    ) {
      setForceStatic(true);
    }
  }, []);

  const visible = inView || forceStatic || reduceMotion;
  const instant = reduceMotion || forceStatic;

  return (
    <div
      ref={ref}
      className="relative w-full my-8 h-[320px] md:h-[400px]"
      style={{ overflow: "visible" }}
      aria-hidden
    >
      {CARDS.map((card, i) => {
        const slot = SLOT_OF_CARD[i] ?? 0;
        const delay = slot * STAGGER;

        const dateColor = card.overdue ? "#DC2626" : "#6B6B68";

        const [floatDuration, floatDelay] = FLOAT_TIMING[i];

        return (
          // Outer wrapper carries the absolute position AND the continuous
          // float animation. CSS animation on this element composes with the
          // Framer Motion transform on the inner element (separate elements
          // → separate transform stacks).
          <div
            key={i}
            className="chaos-card-float"
            style={{
              position: "absolute",
              top: card.pos.top,
              left: card.pos.left,
              animationDuration: `${floatDuration}s`,
              animationDelay: `${floatDelay}s`,
            }}
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, rotate: 0 }}
            animate={
              visible
                ? { opacity: 1, scale: 1, y: 0, rotate: card.pos.rotate }
                : { opacity: 0, scale: 0.85, y: 20, rotate: 0 }
            }
            transition={
              instant
                ? { duration: 0 }
                : { duration: 0.5, delay, ease: OVERSHOOT_EASE }
            }
            className="w-[160px] md:w-[210px] bg-white border border-[#E5E2DC] rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-3 py-2.5 md:px-3.5 md:py-3"
          >
            {/* Stamp (top-right corner, slightly outside the card) */}
            {card.stamp && (
              <span
                className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded bg-white font-semibold uppercase"
                style={{
                  border: `1px solid ${
                    card.stamp.color === "red" ? "#DC2626" : "#D97706"
                  }`,
                  color:
                    card.stamp.color === "red" ? "#DC2626" : "#D97706",
                  fontSize: 9,
                  letterSpacing: "0.05em",
                  transform: `rotate(${card.stampRotate}deg)`,
                }}
              >
                {card.stamp.text}
              </span>
            )}

            {/* Label */}
            <div
              className="font-semibold uppercase text-[#9C9C97]"
              style={{ fontSize: 9, letterSpacing: "0.1em" }}
            >
              {card.label}
            </div>

            {/* Reference ID */}
            <div className="font-mono text-[10px] md:text-[11px] text-[#9C9C97] mt-0.5 mb-2">
              {card.ref}
            </div>

            {/* Demand amount */}
            <div className="text-[13px] md:text-[14px] font-semibold text-[#1F1F1E]">
              {card.amount}
            </div>

            {/* Due date */}
            <div
              className="text-[10px] md:text-[11px] mt-0.5"
              style={{ color: dateColor }}
            >
              {card.date}
            </div>
          </motion.div>
          </div>
        );
      })}
    </div>
  );
}
