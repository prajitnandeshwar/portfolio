"use client";

import { useEffect, useRef, useState } from "react";
import { DUR, NAVY, rule } from "./constants";

// Demo for primitive 01 (restate-before-acting). The user presses Run,
// the agent restates the instruction in its own words, lays out its
// plan, and waits for the user to be the checkpoint. Confirm commits
// with a settle animation; Edit instruction resets.
//
// Motion uses the three shared tokens (instant 120, standard 240,
// deliberate 400). The stagger between lines lets the reader actually
// follow each beat. All durations collapse to ~0 under reduced motion.

const SAMPLE_INPUT =
  "Reclassify all unmatched B2B invoices under AED 10,000 to auto-resolve";

const LINES = [
  "I will reclassify unmatched B2B invoices below AED 10,000.",
  "Scope: current period, UAE entity. 142 invoices match.",
  "They move to auto-resolve. 6 invoices above the gate stay escalated.",
];

const PLAN_STEPS = [
  "Validate matches against the purchase register",
  "Reclassify 142 invoices to auto-resolve",
  "Log every change to the period trail",
];

type Phase = "idle" | "running" | "ready" | "confirming" | "done";

export function EchoDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [shownLines, setShownLines] = useState(0);
  const [shownSteps, setShownSteps] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const reducedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const wait = (ms: number) =>
    new Promise<void>((r) => {
      const id = window.setTimeout(r, reducedRef.current ? 0 : ms);
      timersRef.current.push(id);
    });

  const run = async () => {
    if (phase !== "idle") return;
    setPhase("running");
    await wait(DUR.standard); // agent surface fade up
    for (let i = 0; i < LINES.length; i++) {
      setShownLines(i + 1);
      await wait(420);
    }
    for (let i = 0; i < PLAN_STEPS.length; i++) {
      setShownSteps(i + 1);
      await wait(180);
    }
    await wait(DUR.instant);
    setShowActions(true);
    setPhase("ready");
  };

  const confirm = async () => {
    if (phase !== "ready") return;
    setPhase("confirming");
    await wait(DUR.deliberate);
    setPhase("done");
  };

  const reset = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    setShownLines(0);
    setShownSteps(0);
    setShowActions(false);
    setPhase("idle");
  };

  const showAgent = phase !== "idle" && phase !== "done";

  return (
    <DemoFrame tag={`Rule 01 · ${rule(1)}`} onReplay={reset}>
      <div className="flex gap-2.5 mb-4">
        <input
          readOnly
          value={SAMPLE_INPUT}
          className="flex-1 text-[14px] px-3.5 py-2.5 rounded-lg bg-white text-[#1F1F1E]"
          style={{ border: "1px solid #E5E2DC" }}
          aria-label="Instruction to the agent"
        />
        <button
          type="button"
          onClick={run}
          disabled={phase !== "idle"}
          className="text-[14px] font-semibold px-4 py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-default"
          style={{ backgroundColor: "#1F1F1E", color: "#FFFFFF" }}
        >
          Run
        </button>
      </div>

      {showAgent && (
        <div
          className="rounded-[10px] p-5"
          style={{
            backgroundColor: NAVY.bg,
            color: NAVY.fg,
            opacity: phase === "running" || phase === "ready" || phase === "confirming" ? 1 : 0,
            transform: phase === "confirming" ? "scale(0.985)" : "translateY(0)",
            transition: `opacity ${DUR.standard}ms ease-out, transform ${DUR.deliberate}ms ease-in-out`,
          }}
        >
          <AgentLabel name={`RECON AGENT · ${rule(1)}`} />
          <div className="space-y-1.5">
            {LINES.map((line, i) => (
              <p
                key={i}
                className="text-[15px] leading-[1.6]"
                style={{
                  opacity: i < shownLines ? 1 : 0,
                  transform: i < shownLines ? "translateY(0)" : "translateY(4px)",
                  transition: "opacity 300ms ease, transform 300ms ease",
                  margin: 0,
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div
            className="mt-3.5 pt-3"
            style={{ borderTop: `1px solid ${NAVY.line}` }}
          >
            {PLAN_STEPS.map((step, i) => (
              <div
                key={i}
                className="flex gap-2.5 text-[14px] mb-1.5"
                style={{
                  color: NAVY.muted,
                  opacity: i < shownSteps ? 1 : 0,
                  transform:
                    i < shownSteps ? "translateY(0)" : "translateY(4px)",
                  transition: "opacity 250ms ease, transform 250ms ease",
                }}
              >
                <span
                  className="font-mono text-[12px] font-semibold pt-0.5"
                  style={{ color: NAVY.fg }}
                >
                  {i + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div
            className="flex gap-2.5 mt-4"
            style={{
              opacity: showActions ? 1 : 0,
              transition: "opacity 250ms ease",
            }}
            aria-hidden={!showActions}
          >
            <button
              type="button"
              onClick={confirm}
              disabled={!showActions || phase !== "ready"}
              className="text-[13px] font-semibold px-4 py-2 rounded-[7px]"
              style={{
                border: `1px solid ${NAVY.line}`,
                backgroundColor: NAVY.fg,
                color: NAVY.bg,
              }}
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={!showActions}
              className="text-[13px] font-medium px-4 py-2 rounded-[7px]"
              style={{
                border: `1px solid ${NAVY.line}`,
                backgroundColor: "transparent",
                color: NAVY.muted,
              }}
            >
              Edit instruction
            </button>
          </div>
        </div>
      )}

      {phase === "done" && (
        <div
          className="flex items-center gap-2.5 rounded-[10px] px-4 py-3.5 text-[14px] font-medium"
          style={{
            backgroundColor: NAVY.bg,
            color: NAVY.fg,
            animation: "aif-settle 400ms ease-in-out",
          }}
        >
          <span
            className="rounded-full w-[18px] h-[18px] flex items-center justify-center text-[11px]"
            style={{ backgroundColor: "#3D5A3F", color: "#BFF0C2", flex: "none" }}
            aria-hidden="true"
          >
            ✓
          </span>
          <span>
            Confirmed · 142 invoices reclassified · Logged to the period trail
          </span>
        </div>
      )}

      <style jsx>{`
        @keyframes aif-settle {
          0% { transform: scale(1); }
          40% { transform: scale(0.985); }
          100% { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          :global([data-aif-demo]) * { transition-duration: 1ms !important; animation-duration: 1ms !important; }
        }
      `}</style>
    </DemoFrame>
  );
}

// Shared demo chrome: same tag styling, same Replay button. Pulled into
// a local helper so each demo can be wrapped without duplicating the
// markup.
export function DemoFrame({
  tag,
  onReplay,
  children,
}: {
  tag: string;
  onReplay?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      data-aif-demo
      className="rounded-xl p-7 relative"
      style={{
        backgroundColor: "#FAFAF9",
        border: "1px solid #E5E2DC",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#9C9C97]">
          {tag}
        </span>
        {onReplay && (
          <button
            type="button"
            onClick={onReplay}
            className="text-[12px] font-medium text-[#6B6B68] hover:text-[#1F1F1E] rounded-md px-2.5 py-1 transition-colors duration-[120ms]"
            style={{ border: "1px solid #E5E2DC", background: "transparent" }}
          >
            Replay
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export function AgentLabel({ name }: { name: string }) {
  return (
    <div
      className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.04em] mb-3"
      style={{ color: NAVY.muted }}
    >
      <span
        className="w-[7px] h-[7px] rounded-full"
        style={{ backgroundColor: "#7C93E8" }}
        aria-hidden="true"
      />
      {name}
    </div>
  );
}
