"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Verbs the slot cycles through before it settles. Only the ones that fit
// the slot are used; the fit is measured at runtime in the page's font.
const VERBS = [
  "Pondering",
  "Noodling",
  "Brewing",
  "Musing",
  "Mulling",
  "Tinkering",
  "Simmering",
  "Marinating",
  "Percolating",
  "Cogitating",
  "Moseying",
];
const FINAL = "Now building";

const VERB_MS = 1400;
const FINAL_MS = 6000;
const SWAP_MS = 220;

type Mode = "thinking" | "final";
type Phase = "idle" | "leave" | "enter";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// The quiet line under Selected work. A ✻ sits before a word slot that
// thinks through three random verbs, then settles on "Now building" for
// six seconds, and loops. The slot is fixed to the width of "Now building"
// in medium weight, so the sentence after it never moves.
//
// Reduced motion: no loop, no spin, no shimmer. The ✻ rests at 85% and
// "Now building" is plain dark text.
export function NowBuilding() {
  const reduceMotion = useReducedMotion();
  const measureRef = useRef<HTMLSpanElement>(null);
  const [slotWidth, setSlotWidth] = useState<number | null>(null);
  const [fits, setFits] = useState<string[]>([]);
  const [text, setText] = useState(FINAL);
  const [mode, setMode] = useState<Mode>("final");
  const [phase, setPhase] = useState<Phase>("idle");

  // Measure "Now building" in medium weight, and keep only the verbs that,
  // with their ellipsis in regular weight, fit inside it.
  useLayoutEffect(() => {
    const m = measureRef.current;
    if (!m) return;
    const width = (t: string, weight: number) => {
      m.style.fontWeight = String(weight);
      m.textContent = t;
      return m.getBoundingClientRect().width;
    };
    const w = width(FINAL, 500);
    setSlotWidth(w);
    setFits(VERBS.filter((v) => width(`${v}…`, 400) <= w));
  }, []);

  useEffect(() => {
    if (reduceMotion || fits.length === 0) return;
    let cancelled = false;

    async function show(next: string, nextMode: Mode) {
      setPhase("leave");
      await sleep(SWAP_MS);
      if (cancelled) return;
      setText(next);
      setMode(nextMode);
      setPhase("enter");
      await sleep(30);
      if (cancelled) return;
      setPhase("idle");
    }

    async function loop() {
      await sleep(1200);
      while (!cancelled) {
        const pick = [...fits].sort(() => Math.random() - 0.5).slice(0, 3);
        for (const v of pick) {
          if (cancelled) return;
          await show(`${v}…`, "thinking");
          await sleep(VERB_MS);
        }
        if (cancelled) return;
        await show(FINAL, "final");
        await sleep(FINAL_MS);
      }
    }

    loop();
    return () => {
      cancelled = true;
      setText(FINAL);
      setMode("final");
      setPhase("idle");
    };
  }, [reduceMotion, fits]);

  const thinking = mode === "thinking";

  return (
    <p className="relative mt-10 max-w-2xl text-[14px] leading-relaxed text-muted-foreground md:mt-12">
      <span
        aria-hidden
        className={`now-building-mark${thinking ? " is-spinning" : ""}`}
      >
        ✻
      </span>
      <span
        className="inline-block whitespace-nowrap align-bottom"
        style={{
          width: slotWidth ? `${slotWidth}px` : undefined,
          marginRight: 2,
        }}
      >
        <span
          className={`now-building-word ${thinking ? "is-thinking" : "is-final"}${
            phase === "idle" ? "" : ` is-${phase}`
          }`}
        >
          {text}
        </span>
      </span>{" "}
      an AI design system that agents build with. Case study early 2027.
      {/* Off screen ruler for the slot width and the verb fit. */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none absolute whitespace-nowrap"
        style={{ visibility: "hidden", left: 0, top: 0 }}
      />
    </p>
  );
}
