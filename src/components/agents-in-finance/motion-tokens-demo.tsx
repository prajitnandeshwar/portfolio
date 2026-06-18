"use client";

import { useRef, useState } from "react";
import { DemoFrame } from "./echo-demo";
import { DUR, NAVY } from "./constants";

// The motion-tokens visualisation. Three buttons, three durations,
// three meanings. The puck slides across the track at the chosen
// duration; the label below tells you what the duration represents.
//
// Press a button, feel the difference. That is the whole point.

type Token = 120 | 240 | 400;

const NAMES: Record<Token, string> = {
  120: "acknowledgment",
  240: "revelation",
  400: "commitment",
};

const EASINGS: Record<Token, string> = {
  120: "ease-out",
  240: "ease-in-out",
  400: "ease-in-out",
};

export function MotionTokensDemo() {
  const [active, setActive] = useState<Token | null>(null);
  const [transformValue, setTransformValue] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const puckRef = useRef<HTMLDivElement>(null);
  const reducedRef = useRef<boolean | null>(null);
  const animatingRef = useRef(false);

  const playToken = (ms: Token) => {
    if (animatingRef.current) return;
    if (reducedRef.current === null) {
      reducedRef.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    }
    setActive(ms);
    const track = trackRef.current;
    const puck = puckRef.current;
    if (!track || !puck) return;
    const dx = track.clientWidth - puck.clientWidth - 28;
    // Reset to start with no transition, then animate.
    animatingRef.current = true;
    puck.style.transition = "none";
    setTransformValue(0);
    // Force layout flush before applying the animated transition.
    void puck.offsetWidth;
    const dur = reducedRef.current ? 1 : ms;
    puck.style.transition = `transform ${dur}ms ${EASINGS[ms]}`;
    setTransformValue(dx);
    window.setTimeout(
      () => {
        animatingRef.current = false;
      },
      ms + 50,
    );
  };

  return (
    <DemoFrame tag="The whole motion system">
      <div className="flex gap-2.5 mb-4">
        {(Object.keys(NAMES) as unknown as string[]).map((k) => {
          const ms = Number(k) as Token;
          const isActive = ms === active;
          return (
            <button
              key={k}
              type="button"
              onClick={() => playToken(ms)}
              className="font-mono text-[13px] font-semibold px-4 py-2 rounded-[7px] cursor-pointer transition-[border-color] duration-[120ms]"
              style={{
                backgroundColor: isActive ? "#1F1F1E" : "#FFFFFF",
                color: isActive ? "#FFFFFF" : "#1F1F1E",
                border: `1px solid ${isActive ? "#1F1F1E" : "#E5E2DC"}`,
              }}
            >
              {ms}ms
            </button>
          );
        })}
      </div>

      <div
        ref={trackRef}
        className="relative h-[56px] rounded-lg overflow-hidden"
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E2DC",
        }}
      >
        <div
          className="absolute right-[14px] top-[12px] w-24 h-8 rounded-md"
          style={{ border: "1.5px dashed #E5E2DC" }}
          aria-hidden="true"
        />
        <div
          ref={puckRef}
          className="absolute left-[14px] top-[12px] w-24 h-8 rounded-md flex items-center justify-center text-[11px] font-semibold tracking-[0.04em]"
          style={{
            backgroundColor: NAVY.bg,
            color: NAVY.fg,
            transform: `translateX(${transformValue}px)`,
          }}
          aria-hidden="true"
        >
          CHIP
        </div>
      </div>

      <div className="text-[13px] italic text-[#6B6B68] mt-3 text-center">
        {active ? `${active}ms · ${NAMES[active]}` : "Pick a duration."}
      </div>
    </DemoFrame>
  );
}
