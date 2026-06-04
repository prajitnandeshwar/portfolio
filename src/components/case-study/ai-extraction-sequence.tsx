"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useRef, useState } from "react";

// Three-beat AI extraction sequence for the Clear AI section.
//
//   1. PDF (about 2.0 s hold): the raw government PDF (ai-pdf) sits
//      on screen long enough to read as a messy input. As it leaves
//      it shrinks slightly and shifts right, as if being fed into
//      the Clear AI panel.
//   2. Loading (about 2.0 s hold), localised: the case view comes in
//      with the Clear AI panel in its loading state (ai-loading). The
//      left side (Case details, Activity Center) stays static for the
//      rest of the sequence. ONLY the right Clear AI panel area shows
//      loading: a clipped shimmer sweep over that panel.
//   3. Result (about 1.1 s reveal + 2.0 s hold): the right Clear AI
//      panel fills in top-to-bottom with the populated Case Summary
//      and Reasons (ai-result clipped to the panel area, animated via
//      clip-path). The left side does not move at all.
//
// Plays once on scroll-in. Replay re-keys the layers. Under
// prefers-reduced-motion the populated case view is shown directly.

// Beat boundaries in seconds within an ~7.7 s sequence.
const T_PDF_HOLD_END = 2.0;        // PDF held visible
const T_PDF_GONE = 2.5;            // PDF fully faded + shrunk
const T_LOADING_IN_END = 2.7;      // loading layer fully visible
const T_LOADING_HOLD_END = 4.7;    // ~2 s on the loading state
const T_RESULT_REVEAL_END = 5.85;  // right panel fully revealed (~1.15 s)
const T_END = 7.85;                // ~2 s hold on populated result

const TOTAL = T_END;

const EASE = [0.22, 1, 0.36, 1] as const;

// Right Clear AI panel coordinates (percent of frame). The result
// reveal and the loading shimmer are both clipped to this rectangle so
// only the right panel changes. Left side is untouched.
const PANEL_TOP = 12;
const PANEL_RIGHT = 4;
const PANEL_BOTTOM = 8;
const PANEL_LEFT = 70;
const PANEL_BOTTOM_HIDDEN = 100 - PANEL_TOP; // bottom inset that hides everything

export function AIExtractionSequence() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    amount: 0.4,
    once: true,
    margin: "0px 0px -80px 0px",
  });
  const reduceMotion = useReducedMotion();
  const [playId, setPlayId] = useState(0);

  const shouldPlay = inView || playId > 0;

  const frameStyle = {
    aspectRatio: "16 / 9",
    backgroundColor: "var(--surface)",
    borderColor: "var(--border)",
    boxShadow: "var(--frame-shadow)",
    margin: 0,
  } as const;

  if (reduceMotion) {
    return (
      <figure ref={ref as React.RefObject<HTMLElement>} style={{ margin: "1.5rem 0" }}>
        <div
          className="relative w-full overflow-hidden rounded-xl border"
          style={frameStyle}
          aria-label="Clear AI populated case view"
        >
          <FullBleedImage
            src="/work/notice-tracker/ai-result.png"
            alt="Case view with Clear AI populated case summary and reasons"
          />
        </div>
      </figure>
    );
  }

  return (
    <figure ref={ref as React.RefObject<HTMLElement>} style={{ margin: "1.5rem 0" }}>
      <div
        className="relative w-full overflow-hidden rounded-xl border"
        style={frameStyle}
        aria-label="AI extraction sequence: raw PDF, then Clear AI processes it, then populated case view"
      >
        {/* BEAT 1: Raw PDF. Held for ~2 s, then shrinks toward right
            and fades, suggesting it is being fed into Clear AI. */}
        <motion.div
          key={`pdf-${playId}`}
          initial={{ opacity: 1, scale: 1, x: "0%" }}
          animate={
            shouldPlay
              ? {
                  opacity: [1, 1, 0, 0],
                  scale: [1, 1, 0.78, 0.78],
                  x: ["0%", "0%", "15%", "15%"],
                }
              : { opacity: 1, scale: 1, x: "0%" }
          }
          transition={{
            duration: TOTAL,
            times: [
              0,
              T_PDF_HOLD_END / TOTAL,
              T_PDF_GONE / TOTAL,
              1,
            ],
            ease: EASE,
          }}
          className="absolute inset-0"
          style={{ margin: 0 }}
        >
          <FullBleedImage
            src="/work/notice-tracker/ai-pdf.png"
            alt="Raw government PDF, Form GST REG-05"
          />
        </motion.div>

        {/* BEAT 2 base: Loading case view. Fades in slightly before the
            PDF is gone, then stays at opacity 1 for the rest of the
            sequence. The result layer overlays its right panel area, so
            the left side of this image (Case details + Activity Center)
            is what stays static on screen throughout beats 2 and 3. */}
        <motion.div
          key={`loading-${playId}`}
          initial={{ opacity: 0 }}
          animate={
            shouldPlay
              ? { opacity: [0, 0, 1, 1] }
              : { opacity: 0 }
          }
          transition={{
            duration: TOTAL,
            times: [
              0,
              T_PDF_HOLD_END / TOTAL,
              T_LOADING_IN_END / TOTAL,
              1,
            ],
            ease: EASE,
          }}
          className="absolute inset-0"
          style={{ margin: 0 }}
        >
          <FullBleedImage
            src="/work/notice-tracker/ai-loading.png"
            alt="Case view with the Clear AI panel in the loading state"
          />
        </motion.div>

        {/* Shimmer, clipped to the right Clear AI panel only. Visible
            during the loading hold; fades out as the result starts
            revealing. */}
        <motion.div
          key={`shimmer-${playId}`}
          aria-hidden
          className="absolute pointer-events-none overflow-hidden"
          style={{
            top: `${PANEL_TOP}%`,
            bottom: `${PANEL_BOTTOM}%`,
            right: `${PANEL_RIGHT}%`,
            left: `${PANEL_LEFT}%`,
            borderRadius: "10px",
            margin: 0,
          }}
          initial={{ opacity: 0 }}
          animate={
            shouldPlay
              ? { opacity: [0, 0, 0.9, 0.9, 0, 0] }
              : { opacity: 0 }
          }
          transition={{
            duration: TOTAL,
            times: [
              0,
              T_PDF_HOLD_END / TOTAL,
              T_LOADING_IN_END / TOTAL,
              T_LOADING_HOLD_END / TOTAL,
              (T_LOADING_HOLD_END + 0.4) / TOTAL,
              1,
            ],
            ease: "easeOut",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "45%",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)",
              margin: 0,
            }}
            animate={{ x: ["-100%", "220%"] }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* BEAT 3: Result. Full ai-result image, but clip-path limits
            it to ONLY the right Clear AI panel area. The bottom inset
            animates from PANEL_BOTTOM_HIDDEN (which collapses the
            visible region to a zero-height strip at the top of the
            panel) down to PANEL_BOTTOM, revealing the summary and
            reasons top-to-bottom. The left side of ai-result is
            permanently clipped out, so the loading layer's left side
            stays untouched on screen. */}
        <motion.div
          key={`result-${playId}`}
          initial={{
            clipPath: `inset(${PANEL_TOP}% ${PANEL_RIGHT}% ${PANEL_BOTTOM_HIDDEN}% ${PANEL_LEFT}%)`,
          }}
          animate={
            shouldPlay
              ? {
                  clipPath: [
                    `inset(${PANEL_TOP}% ${PANEL_RIGHT}% ${PANEL_BOTTOM_HIDDEN}% ${PANEL_LEFT}%)`,
                    `inset(${PANEL_TOP}% ${PANEL_RIGHT}% ${PANEL_BOTTOM_HIDDEN}% ${PANEL_LEFT}%)`,
                    `inset(${PANEL_TOP}% ${PANEL_RIGHT}% ${PANEL_BOTTOM}% ${PANEL_LEFT}%)`,
                    `inset(${PANEL_TOP}% ${PANEL_RIGHT}% ${PANEL_BOTTOM}% ${PANEL_LEFT}%)`,
                  ],
                }
              : {
                  clipPath: `inset(${PANEL_TOP}% ${PANEL_RIGHT}% ${PANEL_BOTTOM_HIDDEN}% ${PANEL_LEFT}%)`,
                }
          }
          transition={{
            duration: TOTAL,
            times: [
              0,
              T_LOADING_HOLD_END / TOTAL,
              T_RESULT_REVEAL_END / TOTAL,
              1,
            ],
            ease: EASE,
          }}
          className="absolute inset-0"
          style={{ margin: 0 }}
        >
          <FullBleedImage
            src="/work/notice-tracker/ai-result.png"
            alt="Case view with Clear AI populated case summary and reasons"
          />
        </motion.div>

        {/* Replay control */}
        <button
          type="button"
          onClick={() => setPlayId((id) => id + 1)}
          aria-label="Replay AI extraction sequence"
          className="absolute bottom-3 right-3 z-10 inline-flex items-center justify-center size-8 rounded-full text-[#6B6B68] hover:text-[#D97706] transition-colors duration-200 ease-out"
          style={{
            margin: 0,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <RotateCcw className="size-3.5" />
        </button>
      </div>
    </figure>
  );
}

function FullBleedImage({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      draggable={false}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        margin: 0,
      }}
    />
  );
}
