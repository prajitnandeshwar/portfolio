"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Renames visual: struck-through old name (with a muted sub-label
// stating what the old name implied), a downward arrow, then the new
// name (with the amber accent character and a muted sub-label stating
// the narrower promise the new name encodes). Animates on scroll-in:
//   - strikethrough draws left to right (900 ms)
//   - arrow fades in at 700 ms
//   - new name lifts in at 1000 ms
//   - sub-labels fade in alongside their names

type PivotVisualProps = {
  oldName: string;
  newName: string;
  accentChar?: string;
  oldSubLabel?: string;
  newSubLabel?: string;
};

export function PivotVisual({
  oldName,
  newName,
  accentChar = "",
  oldSubLabel,
  newSubLabel,
}: PivotVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    amount: 0.4,
    once: true,
    margin: "0px 0px -80px 0px",
  });
  const reduceMotion = useReducedMotion();
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (inView) setPlayed(true);
  }, [inView]);

  const cls = reduceMotion ? "reduce" : played ? "played" : "";

  return (
    <figure ref={ref} style={{ margin: "2.5rem 0" }}>
      {/* Coded graphic, no wrapping panel. Sits open on the page with
          generous vertical spacing on the figure. */}
      <div
        className={`pivot-visual ${cls} flex flex-col items-center justify-center gap-5`}
        style={{ margin: 0 }}
      >
        {/* Old name + sub-label */}
        <div
          className="flex flex-col items-center"
          style={{ margin: 0, gap: "0.375rem" }}
        >
          <div className="relative inline-block" style={{ margin: 0 }}>
            <span
              className="block text-[24px] md:text-[26px] font-medium text-[#9C9C97] tracking-[-0.005em]"
              style={{ margin: 0 }}
            >
              {oldName}
            </span>
            {/* Strikethrough: neutral grey, not amber. */}
            <span
              aria-hidden
              className="strike absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                height: 2,
                backgroundColor: "#9C9C97",
                margin: 0,
              }}
            />
          </div>
          {oldSubLabel && (
            <p
              className="sub-label text-[12px] text-[#9C9C97]"
              style={{ margin: 0 }}
            >
              {oldSubLabel}
            </p>
          )}
        </div>

        {/* Down arrow */}
        <span
          aria-hidden
          className="arrow text-[18px] text-[#9C9C97] leading-none"
          style={{ margin: 0 }}
        >
          ↓
        </span>

        {/* New name + sub-label */}
        <div
          className="flex flex-col items-center"
          style={{ margin: 0, gap: "0.375rem" }}
        >
          <div
            className="new-name text-[28px] md:text-[32px] font-semibold text-[#1F1F1E] tracking-[-0.015em]"
            style={{ margin: 0 }}
          >
            {newName}
            {accentChar && <span className="text-[#D97706]">{accentChar}</span>}
          </div>
          {newSubLabel && (
            <p
              className="sub-label text-[12px] text-[#9C9C97]"
              style={{ margin: 0 }}
            >
              {newSubLabel}
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .pivot-visual .strike {
          width: 0%;
          transition: width 900ms cubic-bezier(0.65, 0, 0.35, 1);
        }
        .pivot-visual .arrow {
          opacity: 0;
          transition: opacity 500ms ease-out 700ms;
        }
        .pivot-visual .new-name {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 600ms ease-out 1000ms,
                      transform 600ms cubic-bezier(0.22, 1, 0.36, 1) 1000ms;
        }
        .pivot-visual .sub-label {
          opacity: 0;
          transition: opacity 600ms ease-out 1200ms;
        }
        .pivot-visual.played .strike { width: 100%; }
        .pivot-visual.played .arrow { opacity: 1; }
        .pivot-visual.played .new-name { opacity: 1; transform: translateY(0); }
        .pivot-visual.played .sub-label { opacity: 1; }

        .pivot-visual.reduce .strike,
        .pivot-visual.reduce .arrow,
        .pivot-visual.reduce .new-name,
        .pivot-visual.reduce .sub-label {
          transition: none;
        }
        .pivot-visual.reduce .strike { width: 100%; }
        .pivot-visual.reduce .arrow { opacity: 1; }
        .pivot-visual.reduce .new-name { opacity: 1; transform: translateY(0); }
        .pivot-visual.reduce .sub-label { opacity: 1; }
      `}</style>
    </figure>
  );
}
