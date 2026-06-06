"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Three beats, scroll-triggered, runs once:
//   1. Scattered (0.5 s, brief): six pills jumbled at varied heights,
//      out of order along the width. Hand-checked positions so no two
//      pills ever overlap, in scatter or in motion.
//   2. Threading (3.6 s, the slow centerpiece): pills snap one-by-one
//      onto the axis line in left-to-right order; for each pill that
//      lands, a thread segment draws from the previous node, so the
//      viewer literally sees the connection being made link by link.
//   3. Unify (0.8 s): the connected nodes converge to center and the
//      Case ID anchor scales up from that point as they merge in.
// The animation freezes on the unified state. It plays once per page
// view, triggered when the figure scrolls into the viewport via
// IntersectionObserver. Disabled entirely under prefers-reduced-motion.

type Pill = {
  id: string;
  scatter: { x: number; y: number };
  axisX: number;
};

// Hand-picked positions, verified against pill bounding box (~95 wide,
// 26 tall) so no two pills overlap statically or while another is in
// flight. Axis positions evenly spaced at +/- 275 with 110 px stride;
// pill width 95 leaves a 15 px gap between adjacent nodes when settled.
const PILLS: Pill[] = [
  { id: "ZD33112421", scatter: { x:  200, y:  45 }, axisX: -275 },
  { id: "ZD33122302", scatter: { x:  160, y: -50 }, axisX: -165 },
  { id: "ZD33125028", scatter: { x: -150, y: -40 }, axisX:  -55 },
  { id: "ZD33145671", scatter: { x:  -50, y:  55 }, axisX:   55 },
  { id: "ZD33167234", scatter: { x: -180, y:  50 }, axisX:  165 },
  { id: "ZD33189401", scatter: { x:   30, y: -60 }, axisX:  275 },
];

// Phase timing (seconds within a single 5.4 s play). Threading at 3.6 s
// is by far the longest beat so the connecting reads as the centerpiece.
const SCATTER_HOLD_END = 0.5;
const PER_PILL_DURATION = 0.6;
const SETTLE_END = SCATTER_HOLD_END + PILLS.length * PER_PILL_DURATION; // 4.1
const CONNECTED_HOLD_END = SETTLE_END + 0.5; // 4.6
const UNIFY_END = CONNECTED_HOLD_END + 0.8; // 5.4
const DURATION = UNIFY_END;

const EASE = "easeInOut" as const;

function pillSettleStart(i: number) {
  return SCATTER_HOLD_END + i * PER_PILL_DURATION;
}
function pillSettleEnd(i: number) {
  return pillSettleStart(i) + PER_PILL_DURATION;
}
// Segment i connects axis node i to axis node i+1; it draws while node
// i+1 is settling, so the segment lands precisely as the new pill does.
function segmentStart(i: number) {
  return pillSettleStart(i + 1);
}
function segmentEnd(i: number) {
  return pillSettleEnd(i + 1);
}

export function CaseIdAnimation() {
  const reduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLDivElement>(null);
  // once:true means the animation plays a single time; subsequent
  // scrolls in and out of view do not replay it.
  const inView = useInView(triggerRef, { once: true, amount: 0.3 });

  if (reduceMotion) {
    return (
      <Frame>
        <div ref={triggerRef}>
          <Stage>
            <AxisLine />
            <Centered>
              <CaseIdAnchor />
            </Centered>
          </Stage>
        </div>
        <Caption />
      </Frame>
    );
  }

  return (
    <Frame>
      <div ref={triggerRef}>
        <Stage>
          <AxisLine />

          {/* Tick marks at the six final node slots, very subtle, hint at
              the ordered timeline even while pills are scattered. */}
          {PILLS.map((pill) => (
            <Tick key={`tick-${pill.id}`} x={pill.axisX} />
          ))}

          {/* Thread segments: five segments connect six nodes. Each
              segment starts when the next pill begins settling, so the
              viewer sees one link form at a time. */}
          {PILLS.slice(0, -1).map((pill, i) => {
            const next = PILLS[i + 1];
            const width = next.axisX - pill.axisX;
            const sStart = segmentStart(i);
            const sEnd = segmentEnd(i);

            return (
              <div
                key={`seg-${i}`}
                className="absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  translate: `${pill.axisX}px -0.75px`,
                  margin: 0,
                }}
                aria-hidden
              >
                <motion.div
                  style={{
                    width: `${width}px`,
                    height: "1.5px",
                    backgroundColor: "#9C9C97",
                    transformOrigin: "left center",
                    margin: 0,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={
                    inView
                      ? {
                          scaleX: [0, 0, 1, 1, 1],
                          opacity: [0, 0, 1, 1, 0],
                        }
                      : { scaleX: 0, opacity: 0 }
                  }
                  transition={{
                    duration: DURATION,
                    times: [
                      0,
                      sStart / DURATION,
                      sEnd / DURATION,
                      CONNECTED_HOLD_END / DURATION,
                      1,
                    ],
                    ease: EASE,
                  }}
                />
              </div>
            );
          })}

          {/* Pills */}
          {PILLS.map((pill, i) => {
            const tSettleStart = pillSettleStart(i);
            const tSettleEnd = pillSettleEnd(i);

            return (
              <motion.div
                key={pill.id}
                initial={{
                  opacity: 1,
                  x: pill.scatter.x,
                  y: pill.scatter.y,
                  scale: 1,
                }}
                animate={
                  inView
                    ? {
                        opacity: [1, 1, 1, 1, 0],
                        x: [
                          pill.scatter.x,
                          pill.scatter.x,
                          pill.axisX,
                          pill.axisX,
                          0,
                        ],
                        y: [pill.scatter.y, pill.scatter.y, 0, 0, 0],
                        scale: [1, 1, 1, 1, 0.35],
                      }
                    : {
                        opacity: 1,
                        x: pill.scatter.x,
                        y: pill.scatter.y,
                        scale: 1,
                      }
                }
                transition={{
                  duration: DURATION,
                  times: [
                    0,
                    tSettleStart / DURATION,
                    tSettleEnd / DURATION,
                    CONNECTED_HOLD_END / DURATION,
                    1,
                  ],
                  ease: EASE,
                }}
                className="absolute px-2.5 py-1 bg-white border rounded text-[12.5px] font-mono text-[#6B6B68] whitespace-nowrap"
                style={{
                  top: "50%",
                  left: "50%",
                  translate: "-50% -50%",
                  borderColor: "var(--border)",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                  margin: 0,
                }}
              >
                {pill.id}
              </motion.div>
            );
          })}

          {/* Case ID anchor: hidden through scatter and threading, scales
              up at the center as the chain converges into it. Holds on
              the unified state for the rest of the page session. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              inView
                ? { opacity: [0, 0, 1], scale: [0.85, 0.85, 1] }
                : { opacity: 0, scale: 0.85 }
            }
            transition={{
              duration: DURATION,
              times: [0, CONNECTED_HOLD_END / DURATION, 1],
              ease: EASE,
            }}
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              margin: 0,
              zIndex: 10,
            }}
          >
            <CaseIdAnchor />
          </motion.div>
        </Stage>
      </div>
      <Caption />
    </Frame>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  // Coded graphic, no wrapping panel. Sits open on the page with
  // generous vertical spacing so it still reads as a distinct figure.
  return (
    <figure style={{ margin: "2.5rem 0" }}>
      {children}
    </figure>
  );
}

function Stage({ children }: { children: React.ReactNode }) {
  // The inner pills and threads are positioned in absolute pixels
  // relative to a virtual 1080 x 354 stage (pills at +/- 275 from
  // center). On narrow viewports the container is smaller than 1080,
  // so the inner stage is scaled down proportionally via a ResizeObserver.
  // overflow-hidden on the outer prevents any residual overflow from
  // forcing horizontal page scroll on phones.
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!outerRef.current) return;
    const update = () => {
      const w = outerRef.current?.clientWidth ?? 1080;
      setScale(Math.min(1, w / 1080));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(outerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={outerRef}
      className="relative overflow-hidden"
      style={{ aspectRatio: "1080 / 354", margin: 0 }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 354,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          margin: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function AxisLine() {
  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        top: "50%",
        left: "6%",
        right: "6%",
        height: "1px",
        backgroundColor: "var(--border)",
        transform: "translateY(-0.5px)",
        margin: 0,
      }}
    />
  );
}

function Tick({ x }: { x: number }) {
  return (
    <div
      aria-hidden
      className="absolute"
      style={{
        top: "50%",
        left: "50%",
        width: "1px",
        height: "8px",
        backgroundColor: "var(--border)",
        translate: `${x}px -4px`,
        margin: 0,
      }}
    />
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
        margin: 0,
      }}
    >
      {children}
    </div>
  );
}

function CaseIdAnchor() {
  return (
    <div
      className="px-4 py-3 rounded-[10px] shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
      style={{ backgroundColor: "#1F1F1E", margin: 0 }}
    >
      <div
        className="text-[10.5px] uppercase tracking-[0.1em] font-medium text-[#D97706]"
        style={{ margin: 0, marginBottom: "0.25rem" }}
      >
        Case ID
      </div>
      <div
        className="text-[15px] font-mono text-white tracking-[0.02em]"
        style={{ margin: 0 }}
      >
        AD06032200247Q
      </div>
    </div>
  );
}

function Caption() {
  return (
    <figcaption
      className="text-[13px] text-[#9C9C97] text-center"
      style={{ margin: 0, marginTop: "0.75rem" }}
    >
      Multiple reference IDs collapse into a single, stable Case ID.
    </figcaption>
  );
}
