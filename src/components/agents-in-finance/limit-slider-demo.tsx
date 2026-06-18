"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DemoFrame } from "./echo-demo";
import { DUR, NAVY, rule } from "./constants";

// Demo for primitive 04 (gates). The user sets an amount and the agent's
// freedom redistributes around it. Below the line, the agent acts.
// Above, the agent escalates to a person.
//
// 20 buckets of AED 2,500 across 0 to 50,000. Total 148 invoices. At
// the default 10,000 gate: 142 below (auto-resolved), 6 above
// (escalated). Drag the slider, watch the counts tween, the
// distribution shade, and the sample row flip state. Apply commits the
// gate with a settle animation.
//
// This is the only place on the entire page where amber appears.
// Amber here means: a person is needed.

const BUCKETS = [
  44, 39, 33, 26, 2, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
];
const BUCKET_SIZE = 2500;
const TOTAL = BUCKETS.reduce((a, b) => a + b, 0);
const SAMPLE_AMOUNT = 13750;
const MAX_BAR = Math.max(...BUCKETS);

function countBelow(threshold: number): number {
  let s = 0;
  BUCKETS.forEach((v, i) => {
    if ((i + 1) * BUCKET_SIZE <= threshold) s += v;
  });
  return s;
}

export function LimitSliderDemo() {
  const [gate, setGate] = useState(10000);
  const [displayBelow, setDisplayBelow] = useState(countBelow(10000));
  const [displayAbove, setDisplayAbove] = useState(
    TOTAL - countBelow(10000),
  );
  const [applied, setApplied] = useState(true);
  const [settling, setSettling] = useState(false);
  const reducedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const prevBelowRef = useRef(countBelow(10000));

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Tween the two counts on slider change so the user sees the
  // redistribution rather than a jump.
  const animateCounts = useCallback((nextBelow: number) => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    const from = prevBelowRef.current;
    const to = nextBelow;
    if (reducedRef.current) {
      setDisplayBelow(to);
      setDisplayAbove(TOTAL - to);
      prevBelowRef.current = to;
      return;
    }
    const t0 = performance.now();
    const duration = DUR.instant;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const v = Math.round(from + (to - from) * p);
      setDisplayBelow(v);
      setDisplayAbove(TOTAL - v);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
        prevBelowRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  const onSlide = (val: number) => {
    setGate(val);
    setApplied(false);
    animateCounts(countBelow(val));
  };

  const onApply = () => {
    if (applied) return;
    setApplied(true);
    setSettling(true);
    window.setTimeout(
      () => setSettling(false),
      reducedRef.current ? 1 : DUR.deliberate,
    );
  };

  const onReset = () => {
    setGate(10000);
    animateCounts(countBelow(10000));
    setApplied(true);
    setSettling(false);
  };

  const sampleAuto = SAMPLE_AMOUNT <= gate;

  return (
    <DemoFrame tag={`Rule 04 · ${rule(4)}`} onReplay={onReset}>
      <div
        className="rounded-[10px] p-5 md:p-6"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E2DC",
          transform: settling ? "scale(0.985)" : "scale(1)",
          transition: `transform ${DUR.deliberate}ms ease-in-out`,
        }}
      >
        <h4 className="text-[15px] font-semibold text-[#1F1F1E] mb-0.5">
          Auto-resolve threshold
        </h4>
        <div className="text-[13px] text-[#6B6B68] mb-4">
          Unmatched B2B invoices below this amount are resolved by the agent
          and logged.
        </div>

        <div className="font-mono text-[22px] font-semibold text-[#1F1F1E] mb-2.5">
          AED {gate.toLocaleString("en-US")}
        </div>

        <div
          className="flex items-end gap-[2px] h-[54px] my-1.5"
          aria-hidden="true"
        >
          {BUCKETS.map((v, i) => {
            const below = (i + 1) * BUCKET_SIZE <= gate;
            const height = v === 0 ? 3 : Math.max(4, Math.round((v / MAX_BAR) * 100));
            return (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-colors duration-[120ms]"
                style={{
                  height: `${height}%`,
                  backgroundColor: below ? NAVY.bg : "#E5E2DC",
                }}
              />
            );
          })}
        </div>

        <input
          type="range"
          min={0}
          max={50000}
          step={2500}
          value={gate}
          onChange={(e) => onSlide(parseInt(e.target.value, 10))}
          className="w-full my-2 cursor-pointer"
          style={{ accentColor: NAVY.bg }}
          aria-label="Auto-resolve threshold in AED"
        />

        <div className="grid grid-cols-2 gap-3">
          <ImpactCell num={displayBelow} label="exceptions auto-resolved" />
          <ImpactCell num={displayAbove} label="escalated for review" />
        </div>

        <div className="flex items-center gap-3.5 mt-4">
          <button
            type="button"
            onClick={onApply}
            disabled={applied}
            className="text-[13px] font-semibold px-4 py-2 rounded-[7px] disabled:opacity-35 disabled:cursor-default"
            style={{ backgroundColor: "#1F1F1E", color: "#FFFFFF" }}
          >
            Apply gate
          </button>
          <span
            className="text-[12.5px] text-[#6B6B68]"
            style={{
              opacity: applied && !settling ? 1 : 0,
              transition: `opacity ${DUR.standard}ms ease`,
            }}
            aria-live="polite"
          >
            Gate applied. The agent&rsquo;s autonomy just changed, and the
            trail recorded it.
          </span>
        </div>

        <div
          className="flex justify-between items-center rounded-lg px-3.5 py-2.5 mt-3.5 text-[13px]"
          style={{
            backgroundColor: "#FAFAF9",
            border: "1px solid #E5E2DC",
          }}
        >
          <span className="font-mono text-[12px] text-[#6B6B68]">
            INV-9120 · AED 13,750
          </span>
          {sampleAuto ? (
            <span
              className="text-[11px] font-semibold rounded px-2 py-0.5"
              style={{
                backgroundColor: "#EEF1F8",
                color: "#3C4A75",
                transition: `all ${DUR.standard}ms ease`,
              }}
            >
              Auto-resolve
            </span>
          ) : (
            <span
              className="text-[11px] font-semibold rounded px-2 py-0.5"
              style={{
                backgroundColor: "#FEF3E2",
                color: "#D97706",
                transition: `all ${DUR.standard}ms ease`,
              }}
            >
              Escalated
            </span>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}

function ImpactCell({ num, label }: { num: number; label: string }) {
  return (
    <div
      className="rounded-lg px-3.5 py-3"
      style={{
        backgroundColor: "#FAFAF9",
        border: "1px solid #E5E2DC",
      }}
    >
      <div
        className="text-[24px] font-bold tracking-[-0.01em] text-[#1F1F1E]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {num}
      </div>
      <div className="text-[12.5px] text-[#6B6B68]">{label}</div>
    </div>
  );
}
