"use client";

import { useEffect, useRef, useState } from "react";
import { DemoFrame, AgentLabel } from "./echo-demo";
import { DUR, NAVY, rule } from "./constants";

// Demo for primitive 07 (agent voice). Two surfaces are shown next to
// each other so the visual distinction is immediate: above, a regular
// chrome surface (white card, table). Below, the agent on its own
// navy surface. The agent's surface fades up a beat before its first
// line, and each line carries a small chiplet pointing at its source.
//
// Triggers when scrolled into view via IntersectionObserver. Plays
// once per page load (replayable from the demo's Replay control).

const LINES: { text: string; chiplet: string }[] = [
  {
    text: "Overnight: 38 new exceptions arrived from the ZATCA feed.",
    chiplet: "feed log",
  },
  {
    text: "2 high-value mismatches above your gate need review.",
    chiplet: "exceptions",
  },
  { text: "The March VAT return draft is ready to stage.", chiplet: "draft" },
];

export function AgentVoiceDemo() {
  const [agentOn, setAgentOn] = useState(false);
  const [shown, setShown] = useState(0);
  const reducedRef = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  const play = (force: boolean) => {
    if (playedRef.current && !force) return;
    playedRef.current = true;
    clearTimers();
    setAgentOn(false);
    setShown(0);
    const delay = reducedRef.current ? 0 : 160;
    timersRef.current.push(
      window.setTimeout(() => {
        setAgentOn(true);
        const lineDelay = reducedRef.current ? 0 : 480;
        for (let i = 0; i < LINES.length; i++) {
          timersRef.current.push(
            window.setTimeout(
              () => setShown(i + 1),
              420 + i * lineDelay,
            ),
          );
        }
      }, delay),
    );
  };

  useEffect(() => {
    if (!rootRef.current) return;
    const el = rootRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            play(false);
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.45 },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef}>
      <DemoFrame tag={`Rule 07 · ${rule(7)}`} onReplay={() => play(true)}>
        {/* Chrome surface above */}
        <div
          className="rounded-[10px] p-4"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E2DC",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <MetricCard label="Open exceptions" value="186" />
            <MetricCard label="Period exposure" value="AED 4.2M" />
          </div>
          <div
            className="grid grid-cols-[2fr_1fr_1fr] text-[11px] font-semibold tracking-[0.06em] uppercase text-[#9C9C97] px-1 py-2"
            style={{ borderBottom: "1px solid #E5E2DC" }}
          >
            <span>Reference</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          <TableRow ref_="INV-8841" amount="41,300" status="Unmatched" />
          <TableRow ref_="INV-9120" amount="13,750" status="Escalated" />
        </div>

        {/* Agent voice below */}
        <div className="mt-4">
          <div
            className="rounded-[10px] p-5"
            style={{
              backgroundColor: NAVY.bg,
              color: NAVY.fg,
              opacity: agentOn ? 1 : 0,
              transform: agentOn ? "translateY(0)" : "translateY(6px)",
              transition: `opacity ${DUR.standard}ms ease, transform ${DUR.standard}ms ease`,
            }}
          >
            <AgentLabel name="MORNING BRIEFING" />
            <div className="space-y-1.5">
              {LINES.map((line, i) => (
                <p
                  key={i}
                  className="text-[15px] leading-[1.6]"
                  style={{
                    color: NAVY.fg,
                    opacity: i < shown ? 1 : 0,
                    transform:
                      i < shown ? "translateY(0)" : "translateY(4px)",
                    transition: "opacity 300ms ease, transform 300ms ease",
                    margin: 0,
                  }}
                >
                  {line.text}
                  <span
                    className="inline-block font-mono text-[11px] rounded-full px-2 py-[2px] ml-2"
                    style={{
                      border: `1px solid ${NAVY.line}`,
                      backgroundColor: NAVY.soft,
                      color: NAVY.muted,
                    }}
                  >
                    {line.chiplet}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </DemoFrame>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-lg px-3.5 py-3"
      style={{ border: "1px solid #E5E2DC" }}
    >
      <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#9C9C97]">
        {label}
      </div>
      <div
        className="text-[20px] font-bold text-[#1F1F1E]"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </div>
    </div>
  );
}

function TableRow({
  ref_,
  amount,
  status,
}: {
  ref_: string;
  amount: string;
  status: string;
}) {
  return (
    <div
      className="grid grid-cols-[2fr_1fr_1fr] text-[13px] px-1 py-2 font-mono"
      style={{ borderBottom: "1px solid #FAFAF9" }}
    >
      <span>{ref_}</span>
      <span>{amount}</span>
      <span>{status}</span>
    </div>
  );
}
